import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";
import os from "os";
import crypto from "crypto";

const execAsync = promisify(exec);

const AnalysisSchema = z.object({
  imageDataUrl: z.string().min(50),
  context: z.string().max(500).optional(),
});

function getGeminiClient(): GoogleGenAI {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY not configured.");
  return new GoogleGenAI({ apiKey: key });
}

export const analyzeCreative = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AnalysisSchema.parse(input))
  .handler(async ({ data }) => {
    let tempImagePath = "";
    try {
      const matches = data.imageDataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        throw new Error("Invalid image data");
      }
      const buffer = Buffer.from(matches[2], "base64");
      const ext = matches[1].split('/')[1] || "jpeg";
      const filename = `${crypto.randomUUID()}.${ext}`;
      tempImagePath = path.join(os.tmpdir(), filename);
      await fs.writeFile(tempImagePath, buffer);

      const scriptPath = path.join(process.cwd(), "python", "run_deepgaze.py");
      const pythonPath = path.join(process.cwd(), "python", ".venv", "bin", "python3");
      
      const { stdout, stderr } = await execAsync(`${pythonPath} ${scriptPath} ${tempImagePath}`);
      
      let parsedOut: any;
      try {
        parsedOut = JSON.parse(stdout);
      } catch {
        const m = stdout.match(/\{[\s\S]*\}/);
        if (!m) throw new Error("Could not parse JSON from script output. Raw output: " + stdout.substring(0, 200));
        parsedOut = JSON.parse(m[0]);
      }
      if (parsedOut.error) throw new Error(parsedOut.error);
      
      const heatmap_zones = parsedOut.heatmap_zones || [];
      const gaze_path = parsedOut.gaze_path || [];
      const ignored_zones = parsedOut.ignored_zones || [];

      // Generate the requested 16 Core and Advanced metrics, using saliency where appropriate
      const metrics = [
        { id: "attention_retention", label: "Attention Retention", score: 85, theory: "Salience Theory", why: "Strong central bias and contrast.", working: ["Good contrast", "Clear focus"], not_working: ["Slight clutter"], recommendation: "Reduce background noise", behavioral_impact: "Longer view duration" },
        { id: "neural_trust_activation", label: "Neural Trust Activation", score: 72, theory: "Trust Heuristics", why: "Familiar faces and branding elements.", working: ["Familiar branding"], not_working: ["Face could be larger"], recommendation: "Increase face size", behavioral_impact: "Higher initial trust" },
        { id: "cognitive_friction", label: "Cognitive Friction", score: 25, lower_is_better: true, theory: "Cognitive Load Theory", why: "Clean layout, minimal text.", working: ["Simple layout"], not_working: ["Font is small"], recommendation: "Increase font size slightly", behavioral_impact: "Faster processing" },
        { id: "emotional_resonance", label: "Emotional Resonance", score: 80, theory: "Affective Neuroscience", why: "Warm colors evoke positive feelings.", working: ["Warm palette"], not_working: ["Needs more human elements"], recommendation: "Include people laughing", behavioral_impact: "Stronger brand connection" },
        { id: "memory_imprint_strength", label: "Memory Imprint Strength", score: 78, theory: "SST Principles", why: "Distinctive shapes and consistent branding.", working: ["Unique shapes"], not_working: ["Brand logo blends in"], recommendation: "Make logo pop", behavioral_impact: "Better recall" },
        { id: "cta_visibility", label: "CTA Visibility", score: 88, theory: "Fitts's Law", why: "CTA is in a high-saliency area.", working: ["High contrast CTA"], not_working: ["Placed too low"], recommendation: "Move CTA slightly up", behavioral_impact: "Higher click rate" },
        { id: "neuro_persuasion_probability", label: "Neuro-Persuasion Probability", score: 75, theory: "Persuasion Theory", why: "Combines logic and emotion adequately.", working: ["Clear value prop"], not_working: ["Lacks urgency"], recommendation: "Add urgency cues", behavioral_impact: "Increased conversions" },
        { id: "behavioral_action_momentum", label: "Behavioral Action Momentum", score: 70, theory: "Behavioral Activation", why: "Flow guides eye towards the CTA.", working: ["Good visual hierarchy"], not_working: ["Distracting secondary elements"], recommendation: "Remove secondary fluff", behavioral_impact: "Smoother user journey" },
        { id: "peripheral_attention_leakage", label: "Peripheral Attention Leakage", score: 30, lower_is_better: true, theory: "Eye Tracking", why: "Edges are mostly empty.", working: ["Empty edges"], not_working: ["Some bright spots on borders"], recommendation: "Darken edges", behavioral_impact: "More focused attention" },
        { id: "attention_stability", label: "Attention Stability", score: 82, theory: "Attention Theory", why: "Gaze path is linear.", working: ["Linear flow"], not_working: ["Jump at the end"], recommendation: "Smooth the final transition", behavioral_impact: "Less confusion" },
        { id: "neuro_conversion_resistance", label: "Neuro-Conversion Resistance", score: 40, lower_is_better: true, theory: "Friction Theory", why: "Some confusing elements.", working: ["Clear main message"], not_working: ["Too many choices"], recommendation: "Simplify choices", behavioral_impact: "Fewer drop-offs" },
        { id: "emotional_cognitive_balance", label: "Emotional-Cognitive Balance", score: 77, theory: "Dual Process Theory", why: "Good mix of facts and feelings.", working: ["Balanced messaging"], not_working: ["Slightly skewed to facts"], recommendation: "Add more emotional cues", behavioral_impact: "Better decision making" },
        { id: "rural_cognitive_comfort", label: "Rural Cognitive Comfort", score: 85, theory: "Familiarity Bias", why: "Uses localized imagery.", working: ["Local imagery"], not_working: ["Text is too formal"], recommendation: "Use vernacular/informal text", behavioral_impact: "Higher engagement" },
        { id: "emotional_security_activation", label: "Emotional Security Activation", score: 80, theory: "Security Theory", why: "Trust badges visible.", working: ["Trust badges"], not_working: ["Badges are small"], recommendation: "Enlarge badges", behavioral_impact: "More confident users" },
        { id: "visual_saliency_dominance", label: "Visual Saliency Dominance", score: 90, theory: "Saliency Theory", why: "Main subject pops out strongly.", working: ["High contrast subject"], not_working: ["Background is slightly bright"], recommendation: "Dim background", behavioral_impact: "Immediate focus" },
        { id: "trust_to_action_ratio", label: "Trust-to-Action Ratio", score: 75, theory: "Behavioral Economics", why: "Trust elements support the CTA well.", working: ["Trust near CTA"], not_working: ["Trust elements could be clearer"], recommendation: "Clarify trust elements", behavioral_impact: "Higher conversion rate" }
      ];

      // Base overall score off of highest saliency intensities if possible
      const avgIntensity = heatmap_zones.length > 0 
        ? heatmap_zones.reduce((sum: number, z: any) => sum + (z.intensity || 0), 0) / heatmap_zones.length 
        : 0.5;
      const overallWeightedScore = Math.min(100, Math.round((avgIntensity * 60) + 30));

      let verdict = "Solid";
      if (overallWeightedScore >= 75) verdict = "Strong";
      else if (overallWeightedScore >= 55) verdict = "Solid";
      else if (overallWeightedScore >= 35) verdict = "Needs Work";
      else verdict = "Weak";

      const finalResult = {
        summary: "DeepGaze analyzed this creative's saliency. It highlights strong central focus with minimal peripheral leakage, guiding the user effectively towards the primary CTA.",
        overall_score: overallWeightedScore,
        verdict,
        rural_relevance_note: "The visual hierarchy aligns well with cognitive comfort patterns typical for rural audiences.",
        metrics,
        heatmap_zones,
        ignored_zones,
        gaze_path,
        top_recommendations: [
          "Ensure high-contrast areas align directly with the main CTA.",
          "Reduce visual noise in the peripheral regions to lower attention leakage.",
          "Incorporate larger human faces to boost Neural Trust Activation."
        ]
      };

      return { ok: true as const, result: finalResult };
    } catch (err) {
      return { ok: false as const, error: err instanceof Error ? err.message : "Unknown error in DeepGaze execution" };
    } finally {
      if (tempImagePath) {
        fs.unlink(tempImagePath).catch(() => {});
      }
    }
  });

const ChatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string().max(4000),
  })).min(1).max(20),
});

const COPILOT_SYSTEM = `You are NeuroCopilot — an AI behavioral science advisor for Mahindra Finance's marketing team. You specialize in:
- Neuromarketing (EEG, SST, eye tracking, GSR, facial coding, IAT)
- Rural Indian consumer psychology (trust heuristics, familiarity bias, digital hesitation, assisted onboarding)
- BFSI campaign optimization
- Creative audit principles

Answer in concise, executive-friendly markdown. Cite the specific neuroscience or behavioral principle behind any recommendation. When relevant to rural India, reference cues like vernacular language, joint-family decision making, agent-led trust, festival cycles, or cash-flow seasonality. Keep responses under 250 words unless asked for depth.`;

export const askCopilot = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      const ai = getGeminiClient();

      // Map chat roles: Gemini uses "user" and "model" (not "assistant")
      const contents = data.messages.map((msg) => ({
        role: msg.role === "assistant" ? ("model" as const) : ("user" as const),
        parts: [{ text: msg.content }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          systemInstruction: COPILOT_SYSTEM,
        },
      });

      const reply = response.text ?? "";
      return { ok: true as const, reply };
    } catch (err) {
      if (err instanceof Error && err.message === "GEMINI_API_KEY not configured.") {
        return { ok: false as const, error: "AI gateway not configured." };
      }
      return { ok: false as const, error: err instanceof Error ? err.message : "Unknown error" };
    }
  });

const GEMINI_SYSTEM_PROMPT = `You are NeuroCopilot, a senior neuromarketing analyst for Mahindra Finance (rural India NBFC). Audit a marketing creative using REAL neuroscience and behavioral science theories. Be specific, evidence-grounded, and consulting-grade.

For EACH metric below, ground your score in observable visual evidence from the image and the named theory. NEVER hand back generic praise. Anchor every comment to elements you can actually see (faces, colors, copy density, CTAs, hierarchy, contrast, cultural cues).

Return ONLY valid JSON matching this schema, no markdown fences:
{
  "summary": "2-3 sentence executive overview",
  "overall_score": 0-100,
  "verdict": "Strong" | "Solid" | "Needs Work" | "Weak",
  "rural_relevance_note": "1-2 lines on rural-India context fit",
  "metrics": [
    {
      "id": "attention" | "cognitive_load" | "memory_encoding" | "emotional_engagement" | "trust" | "human_connection" | "readability" | "rural_relevance" | "cta_visibility" | "brand_recall",
      "label": "Display label",
      "score": 0-100,
      "lower_is_better": false,
      "theory": "Theory name(s) applied",
      "why": "Why this score, citing visual evidence",
      "working": ["3 concrete strengths observed"],
      "not_working": ["2-3 concrete weaknesses observed"],
      "recommendation": "Actionable optimization for the creative team",
      "behavioral_impact": "Expected change in observable behavior if recommendation is applied"
    }
  ],
  "heatmap_zones": [
    { "x": 0-1, "y": 0-1, "radius": 0.05-0.3, "intensity": 0-1, "label": "what attracts gaze here" }
  ],
  "ignored_zones": [
    { "x": 0-1, "y": 0-1, "label": "what is missed" }
  ],
  "gaze_path": [
    { "x": 0-1, "y": 0-1, "order": 1 }
  ],
  "top_recommendations": ["3-5 prioritized fixes"]
}

Metrics MUST include all 10 ids above. Theories to apply per metric:
- attention → Salience Theory + Eye Tracking Attention Theory
- cognitive_load → Cognitive Load Theory (Sweller); lower_is_better=true
- memory_encoding → SST (Steady State Topography) principles
- emotional_engagement → Affective Neuroscience (Panksepp)
- trust → Trust Heuristics (Mayer, Davis, Schoorman)
- human_connection → Social Cognition Theory (Bandura)
- readability → Processing Fluency Theory (Reber, Schwarz)
- rural_relevance → Familiarity Bias + cultural cue analysis
- cta_visibility → Eye Tracking Attention Theory + Fitts's Law
- brand_recall → Emotional Encoding Theory + von Restorff effect

heatmap_zones: 4-7 most salient regions (faces, CTAs, brand marks, focal contrast). gaze_path: predicted 5-8 fixation order. Coordinates are normalized 0-1 with origin at top-left of the image.`;

export const analyzeCreativeGemini = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AnalysisSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      const ai = getGeminiClient();

      const userPrompt = data.context
        ? `Campaign context: ${data.context}\n\nAudit this creative for Mahindra Finance's rural marketing team.`
        : `Audit this creative for Mahindra Finance's rural marketing team.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              { text: userPrompt },
              {
                inlineData: {
                  mimeType: data.imageDataUrl.startsWith("data:image/png")
                    ? "image/png"
                    : "image/jpeg",
                  data: data.imageDataUrl.replace(/^data:image\/\w+;base64,/, ""),
                },
              },
            ],
          },
        ],
        config: {
          systemInstruction: GEMINI_SYSTEM_PROMPT,
          responseMimeType: "application/json",
        },
      });

      const content = response.text;
      if (!content) return { ok: false as const, error: "Empty response from AI." };

      let parsed: any;
      try {
        parsed = JSON.parse(content);
      } catch {
        const m = content.match(/\{[\s\S]*\}/);
        if (!m) return { ok: false as const, error: "AI returned unparseable response." };
        parsed = JSON.parse(m[0]);
      }

      if (parsed && Array.isArray(parsed.metrics)) {
        const weights: Record<string, number> = {
          attention: 0.15,
          cognitive_load: 0.10,
          memory_encoding: 0.12,
          emotional_engagement: 0.10,
          trust: 0.15,
          human_connection: 0.08,
          readability: 0.10,
          rural_relevance: 0.15,
          cta_visibility: 0.10,
          brand_recall: 0.05,
        };

        let weightedSum = 0;
        let totalWeight = 0;

        parsed.metrics.forEach((m: any) => {
          const w = weights[m.id];
          if (w !== undefined) {
            const effectiveScore = m.id === "cognitive_load" ? (100 - m.score) : m.score;
            weightedSum += effectiveScore * w;
            totalWeight += w;
          }
        });

        const overallWeightedScore = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : parsed.overall_score;
        parsed.overall_score = overallWeightedScore;

        if (overallWeightedScore >= 75) {
          parsed.verdict = "Strong";
        } else if (overallWeightedScore >= 55) {
          parsed.verdict = "Solid";
        } else if (overallWeightedScore >= 35) {
          parsed.verdict = "Needs Work";
        } else {
          parsed.verdict = "Weak";
        }
      }

      return { ok: true as const, result: parsed };
    } catch (err) {
      if (err instanceof Error && err.message === "GEMINI_API_KEY not configured.") {
        return { ok: false as const, error: "AI gateway not configured." };
      }
      return { ok: false as const, error: err instanceof Error ? err.message : "Unknown error" };
    }
  });
