import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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

export const analyzeCreative = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AnalysisSchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) {
      return { ok: false as const, error: "AI gateway not configured." };
    }

    const userPrompt = data.context
      ? `Campaign context: ${data.context}\n\nAudit this creative for Mahindra Finance's rural marketing team.`
      : `Audit this creative for Mahindra Finance's rural marketing team.`;

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-pro",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: [
                { type: "text", text: userPrompt },
                { type: "image_url", image_url: { url: data.imageDataUrl } },
              ],
            },
          ],
          response_format: { type: "json_object" },
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        if (res.status === 429) return { ok: false as const, error: "Rate limit hit. Please retry in a moment." };
        if (res.status === 402) return { ok: false as const, error: "AI credits exhausted. Add credits in Workspace Settings → Usage." };
        return { ok: false as const, error: `AI error (${res.status}): ${txt.slice(0, 200)}` };
      }

      const json = await res.json();
      const content = json?.choices?.[0]?.message?.content;
      if (!content) return { ok: false as const, error: "Empty response from AI." };

      let parsed;
      try {
        parsed = JSON.parse(content);
      } catch {
        const m = content.match(/\{[\s\S]*\}/);
        if (!m) return { ok: false as const, error: "AI returned unparseable response." };
        parsed = JSON.parse(m[0]);
      }
      return { ok: true as const, result: parsed };
    } catch (err) {
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
    const key = process.env.LOVABLE_API_KEY;
    if (!key) return { ok: false as const, error: "AI gateway not configured." };

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [{ role: "system", content: COPILOT_SYSTEM }, ...data.messages],
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        if (res.status === 429) return { ok: false as const, error: "Rate limit. Try again shortly." };
        if (res.status === 402) return { ok: false as const, error: "AI credits exhausted." };
        return { ok: false as const, error: `AI error: ${txt.slice(0, 160)}` };
      }
      const json = await res.json();
      const reply = json?.choices?.[0]?.message?.content ?? "";
      return { ok: true as const, reply };
    } catch (err) {
      return { ok: false as const, error: err instanceof Error ? err.message : "Unknown error" };
    }
  });
