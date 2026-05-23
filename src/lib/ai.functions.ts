import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";

const AnalysisSchema = z.object({
  imageDataUrl: z.string().min(50),
  context: z.string().max(500).optional(),
});

const SYSTEM_PROMPT = `You are NeuroCopilot, a senior neuromarketing analyst for Mahindra Finance (rural India NBFC). Audit a marketing creative using REAL neuroscience and behavioral science theories. Be specific, evidence-grounded, and consulting-grade.

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

function getGeminiClient(): GoogleGenAI {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY not configured.");
  return new GoogleGenAI({ apiKey: key });
}

export const analyzeCreative = createServerFn({ method: "POST" })
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
          systemInstruction: SYSTEM_PROMPT,
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

      // Explainable deterministic scoring calculations matching Phase 6 guidelines
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
            // Lower cognitive load is better, so invert it for total positive scoring
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
