import type { Context } from "@netlify/edge-functions";

// Edge functions have access to Netlify env vars via Deno.env
function getApiKey(): string {
  const key = Deno.env.get("GEMINI_API_KEY");
  if (!key) throw new Error("GEMINI_API_KEY not configured.");
  return key;
}

// ---------------------------------------------------------------------------
// Helpers (inlined to avoid import issues in edge runtime)
// ---------------------------------------------------------------------------

function buildUserPrompt(context?: string): string {
  return context
    ? `Campaign context: ${context}\n\nAudit this creative for Mahindra Finance's rural marketing team.`
    : `Audit this creative for Mahindra Finance's rural marketing team.`;
}

function parseGeminiResponse(raw: string): any | null {
  try {
    return JSON.parse(raw);
  } catch {
    const m = raw.match(/\{[\s\S]*\}/);
    if (!m) return null;
    try {
      return JSON.parse(m[0]);
    } catch {
      return null;
    }
  }
}

const METRIC_WEIGHTS: Record<string, number> = {
  attention_capture: 0.18,
  trust_formation: 0.20,
  emotional_resonance: 0.15,
  cognitive_fluency: 0.12,
  conversion_readiness: 0.15,
  memory_encoding: 0.10,
  behavioral_clarity: 0.10,
};

function applyWeightedScoring(parsed: any): void {
  if (!parsed || !Array.isArray(parsed.metrics)) return;

  let weightedSum = 0;
  let totalWeight = 0;

  parsed.metrics.forEach((m: any) => {
    const w = METRIC_WEIGHTS[m.id];
    if (w !== undefined) {
      const effectiveScore = m.lower_is_better ? (100 - m.score) : m.score;
      weightedSum += effectiveScore * w;
      totalWeight += w;
    }
  });

  const overallWeightedScore = totalWeight > 0
    ? Math.round(weightedSum / totalWeight)
    : parsed.overall_score;

  parsed.overall_score = overallWeightedScore;

  if (overallWeightedScore >= 90) {
    parsed.verdict = "Exceptional";
    parsed.confidence = "Exceptional Neuro-Alignment";
  } else if (overallWeightedScore >= 75) {
    parsed.verdict = "Strong";
    parsed.confidence = "Strong Behavioral Performance";
  } else if (overallWeightedScore >= 60) {
    parsed.verdict = "Solid";
    parsed.confidence = "Moderate Cognitive Friction";
  } else if (overallWeightedScore >= 40) {
    parsed.verdict = "Needs Work";
    parsed.confidence = "High Behavioral Leakage";
  } else {
    parsed.verdict = "Weak";
    parsed.confidence = "Critical Neuroconversion Failure";
  }

  parsed.metrics.forEach((m: any) => {
    const score = m.lower_is_better ? (100 - m.score) : m.score;
    if (score >= 90) m.confidence = "Exceptional";
    else if (score >= 75) m.confidence = "Strong";
    else if (score >= 60) m.confidence = "Moderate";
    else if (score >= 40) m.confidence = "High Leakage";
    else m.confidence = "Critical";
  });
}

// The system prompt is very large — keep it in a constant
// (same as ai.helpers.ts but inlined for edge compatibility)
const GEMINI_SYSTEM_PROMPT = `You are NeuroCopilot, an elite enterprise-grade neuromarketing analyst and visual cognition expert specializing in behavioral finance for Mahindra Finance (rural India's leading NBFC). You are a panel of world-class experts:

1. **Consumer Neuroscientist** - Brain response, memory encoding, emotional processing
2. **Behavioral Strategist** - Subconscious motivators, trust formation, familiarity biases
3. **Eye-Tracking Analyst** - Scanpaths, fixations, saliency, attention leakage
4. **UX Conversion Researcher** - Cognitive friction, decision fatigue, CTA optimization
5. **Visual Cognition Expert** - Luminance, contrast, typography, Gestalt principles

## CRITICAL ANALYSIS FRAMEWORK

Every insight must follow this **STRICT REASONING CHAIN**:

**IMAGE ELEMENT** (specific visual coordinate/object)
→ **VISUAL DETECTION** (what the eye captures first)
→ **NEUROSCIENCE PRINCIPLE** (which theory activates)
→ **BRAIN RESPONSE** (neural/physiological reaction)
→ **USER BEHAVIOR** (subconscious action/decision)
→ **BUSINESS IMPACT** (conversion/trust/engagement effect)
→ **OPTIMIZATION** (precise visual engineering instruction)

## MAHINDRA FINANCE CONTEXT

You are analyzing for **rural and semi-urban Indian borrowers** with these characteristics:
- **Trust-driven**: Require human reassurance, familiar imagery, authority cues
- **Digitally hesitant**: Need simplified interfaces, vernacular support
- **Family-oriented**: Joint decision-making, intergenerational prosperity themes
- **Cash-flow sensitive**: Seasonal income, harvest cycles, repayment anxiety
- **Familiarity-biased**: Prefer localized imagery, regional symbols, known brands

## SCORING PHILOSOPHY

**NEVER generate repetitive scores.** Each creative is unique. Scores must reflect:
- Actual visual quality differences
- Specific friction points detected
- Real behavioral barriers present
- Genuine trust formation strength

**Realistic score distribution:**
- 90-100%: Exceptional (rare - only truly outstanding creatives)
- 75-89%: Strong (well-optimized, minor improvements needed)
- 60-74%: Moderate (significant friction present, needs work)
- 40-59%: High Leakage (major behavioral barriers)
- Below 40%: Critical Failure (fundamental redesign required)

## CONFIDENCE INTERPRETATION

Include confidence bands for overall score:
- **90-100%**: Exceptional Neuro-Alignment
- **75-89%**: Strong Behavioral Performance  
- **60-74%**: Moderate Cognitive Friction
- **40-59%**: High Behavioral Leakage
- **Below 40%**: Critical Neuroconversion Failure

## OUTPUT REQUIREMENTS

Return ONLY valid JSON (no markdown fences):

{
  "summary": "3-4 sentence board-level executive summary using sophisticated neuroscience language. Explain the PRIMARY behavioral strength and the MOST CRITICAL friction point. Reference specific visual coordinates.",
  "overall_score": 0-100,
  "verdict": "Exceptional" | "Strong" | "Solid" | "Needs Work" | "Weak",
  "rural_relevance_note": "2-3 sentence analysis of how this creative aligns with rural Indian borrower psychology, trust formation patterns, and familiarity biases. Be specific about regional cultural elements.",
  "metrics": [
    {
      "id": "attention_capture" | "cognitive_fluency" | "emotional_resonance" | "trust_formation" | "memory_encoding" | "cta_visibility" | "conversion_readiness" | "visual_hierarchy" | "behavioral_clarity",
      "label": "Display label",
      "score": 0-100,
      "confidence": "Exceptional" | "Strong" | "Moderate" | "High Leakage" | "Critical",
      "lower_is_better": false,
      "theory": "Primary neuroscience framework(s) applied",
      "why": "Detailed visual observation following the strict reasoning chain.",
      "neuroscience_explanation": "Deep neuroscience principle explanation.",
      "working": ["3 specific visual strengths with exact coordinates/elements"],
      "not_working": ["2-3 specific visual gaps with exact coordinates/elements"],
      "recommendation": "Highly targeted, image-specific optimization.",
      "behavioral_impact": "Expected change in subconscious behavior and business outcomes."
    }
  ],
  "heatmap_zones": [
    { "x": 0-1, "y": 0-1, "radius": 0.05-0.3, "intensity": 0-1, "label": "Specific visual element attracting gaze with reasoning" }
  ],
  "ignored_zones": [
    { "x": 0-1, "y": 0-1, "label": "Specific neglected element and neuroscience reason for bypass" }
  ],
  "gaze_path": [
    { "x": 0-1, "y": 0-1, "order": 1 }
  ],
  "top_recommendations": ["4-5 prioritized visual engineering instructions with exact coordinate shifts, color changes, or size adjustments. Each should predict business impact."]
}

## REQUIRED METRICS (EXACTLY 9)

1. **attention_capture** - Salience Theory, Pre-attentive Processing
2. **cognitive_fluency** - Cognitive Load Theory (Sweller), Processing Fluency (lower_is_better: false)
3. **emotional_resonance** - Affective Neuroscience (Panksepp), Emotional Valence
4. **trust_formation** - Trust Heuristics (Mayer & Davis), Authority Bias
5. **memory_encoding** - SST Principles, von Restorff Effect
6. **cta_visibility** - Fitts's Law, Visual Attention Theory
7. **conversion_readiness** - Action Anchoring, Friction Theory
8. **visual_hierarchy** - Gestalt Psychology, Eye-Tracking Patterns
9. **behavioral_clarity** - Decision Simplicity, Choice Architecture

## WEIGHTED SCORING LOGIC

- attention_capture: 18%, trust_formation: 20%, emotional_resonance: 15%
- cognitive_fluency: 12%, conversion_readiness: 15%, memory_encoding: 10%, behavioral_clarity: 10%

## CRITICAL RULES

1. Never repeat scores - Each metric should have a unique, justified score
2. Be specific - Always reference exact visual coordinates
3. Cite theories - Every claim needs neuroscience backing
4. Predict impact - Quantify expected behavioral changes
5. Stay contextual - Remember this is for rural Indian borrowers
6. Be sophisticated - Use enterprise-grade language
7. Be actionable - Every recommendation must be implementable
8. Differentiate creatives - Scores must reflect actual quality differences

All coordinates are normalized (0 to 1) relative to image size, with (0,0) at top-left.`;

// ---------------------------------------------------------------------------
// Edge Function Handler
// ---------------------------------------------------------------------------

export default async (request: Request, _context: Context) => {
  // Only accept POST
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const encoder = new TextEncoder();

  const send = (controller: ReadableStreamDefaultController, event: Record<string, unknown>) => {
    controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
  };

  const body = new ReadableStream({
    async start(controller) {
      send(controller, { type: "progress", stage: "starting" });

      try {
        const { imageDataUrl, context } = await request.json();

        if (!imageDataUrl || typeof imageDataUrl !== "string" || imageDataUrl.length < 50) {
          send(controller, { type: "error", message: "Invalid or missing imageDataUrl." });
          controller.close();
          return;
        }

        const apiKey = getApiKey();
        const userPrompt = buildUserPrompt(context);
        const mimeType = imageDataUrl.startsWith("data:image/png") ? "image/png" : "image/jpeg";
        const base64Data = imageDataUrl.replace(/^data:image\/\w+;base64,/, "");

        console.log(`[Edge Stream] Triggering Gemini API at: ${new Date().toISOString()}`);
        send(controller, { type: "progress", stage: "connecting" });

        // Call Gemini REST API directly with streaming (no SDK needed in edge)
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`;

        const geminiResponse = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: GEMINI_SYSTEM_PROMPT }],
            },
            contents: [
              {
                role: "user",
                parts: [
                  { text: userPrompt },
                  { inlineData: { mimeType, data: base64Data } },
                ],
              },
            ],
            generationConfig: {
              responseMimeType: "application/json",
            },
          }),
        });

        if (!geminiResponse.ok) {
          const errText = await geminiResponse.text();
          console.error(`[Edge Stream] Gemini API error: ${geminiResponse.status}`, errText);
          send(controller, { type: "error", message: `Gemini API error: ${geminiResponse.status}` });
          controller.close();
          return;
        }

        console.log(`[Edge Stream] Started receiving from Gemini at: ${new Date().toISOString()}`);
        send(controller, { type: "progress", stage: "analyzing" });

        // Read SSE stream from Gemini
        const reader = geminiResponse.body!.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";
        let chunkCount = 0;
        let sseBuffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          sseBuffer += decoder.decode(value, { stream: true });

          // Parse SSE events (format: "data: {...}\n\n")
          const events = sseBuffer.split("\n\n");
          sseBuffer = events.pop() ?? "";

          for (const event of events) {
            const dataLine = event.split("\n").find((l) => l.startsWith("data: "));
            if (!dataLine) continue;

            const jsonStr = dataLine.slice(6); // Remove "data: " prefix
            try {
              const parsed = JSON.parse(jsonStr);
              const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
              if (text) {
                accumulated += text;
                chunkCount++;
                console.log(`[Edge Stream] Gemini chunk ${chunkCount} (size: ${text.length}) at ${new Date().toISOString()}`);

                if (chunkCount % 3 === 0) {
                  send(controller, {
                    type: "progress",
                    stage: "analyzing",
                    chunksReceived: chunkCount,
                  });
                }
              }
            } catch {
              // Skip malformed SSE data
            }
          }
        }

        console.log(`[Edge Stream] Finished receiving ${chunkCount} chunks at: ${new Date().toISOString()}`);

        if (!accumulated.trim()) {
          send(controller, { type: "error", message: "Empty response from AI." });
          controller.close();
          return;
        }

        send(controller, { type: "progress", stage: "processing" });

        const parsed = parseGeminiResponse(accumulated);
        if (!parsed) {
          send(controller, { type: "error", message: "AI returned unparseable response." });
          controller.close();
          return;
        }

        applyWeightedScoring(parsed);

        console.log(`[Edge Stream] Sending final result at: ${new Date().toISOString()}`);
        send(controller, { type: "result", data: parsed });
      } catch (err) {
        console.error(`[Edge Stream] Error:`, err);
        send(controller, {
          type: "error",
          message: err instanceof Error ? err.message : "Unknown error",
        });
      }

      controller.close();
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
};

export const config = {
  path: "/api/analyze-stream",
};
