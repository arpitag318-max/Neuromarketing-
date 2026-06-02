import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import {
  GEMINI_SYSTEM_PROMPT,
  parseGeminiResponse,
  applyWeightedScoring,
  getFallbackAuditResult,
  buildUserPrompt,
  extractImageParts,
} from "./ai.helpers";

const AnalysisSchema = z.object({
  imageDataUrl: z.string().min(50),
  context: z.string().max(500).optional(),
});

function getGeminiClient(): GoogleGenAI {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY not configured.");
  return new GoogleGenAI({ apiKey: key });
}

/**
 * Streaming event types sent as NDJSON (newline-delimited JSON).
 *
 * - { type: "progress", stage, chunksReceived? }  — heartbeat to keep connection alive
 * - { type: "result",   data }                    — final parsed + scored audit result
 * - { type: "error",    message }                 — something went wrong
 */
export type StreamEvent =
  | { type: "progress"; stage: string; chunksReceived?: number }
  | { type: "result"; data: unknown }
  | { type: "error"; message: string };

export const analyzeCreativeStream = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AnalysisSchema.parse(input))
  .handler(async ({ data }) => {
    const encoder = new TextEncoder();

    const enqueue = (controller: ReadableStreamDefaultController, event: StreamEvent) => {
      controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
    };

    return new ReadableStream({
      async start(controller) {
        // Immediate heartbeat — ensures Netlify sees bytes flowing right away
        enqueue(controller, { type: "progress", stage: "starting" });

        let currentStage = "connecting";

        // Keep connection alive with periodic heartbeats every 5 seconds.
        // This is critical because Gemini can take 30-40 seconds just to start
        // streaming the first chunk, which triggers Netlify's 30s idle timeout.
        const keepAliveInterval = setInterval(() => {
          console.log(`[Server Stream] Sending keep-alive heartbeat at: ${new Date().toISOString()}`);
          enqueue(controller, { type: "progress", stage: currentStage });
        }, 5000);

        try {
          const ai = getGeminiClient();
          const userPrompt = buildUserPrompt(data.context);
          const imageParts = extractImageParts(data.imageDataUrl);

          console.log(`[Server Stream] Triggering Gemini API at: ${new Date().toISOString()}`);
          enqueue(controller, { type: "progress", stage: currentStage });

          // Use streaming API — chunks arrive as Gemini generates
          const stream = await ai.models.generateContentStream({
            model: "gemini-2.5-flash",
            contents: [
              {
                role: "user",
                parts: [{ text: userPrompt }, imageParts],
              },
            ],
            config: {
              systemInstruction: GEMINI_SYSTEM_PROMPT,
              responseMimeType: "application/json",
            },
          });

          let accumulated = "";
          let chunkCount = 0;

          currentStage = "analyzing";
          console.log(`[Server Stream] Started receiving from Gemini at: ${new Date().toISOString()}`);
          enqueue(controller, { type: "progress", stage: currentStage });

          for await (const chunk of stream) {
            const text = chunk.text ?? "";
            accumulated += text;
            chunkCount++;
            
            console.log(`[Server Stream] Received Gemini chunk ${chunkCount} (size: ${text.length}) at ${new Date().toISOString()}`);

            // Send a progress heartbeat every 3 chunks to keep Netlify alive
            // without flooding the client with events
            if (chunkCount % 3 === 0) {
              console.log(`[Server Stream] Sending progress heartbeat for chunk ${chunkCount}`);
              enqueue(controller, {
                type: "progress",
                stage: currentStage,
                chunksReceived: chunkCount,
              });
            }
          }

          console.log(`[Server Stream] Finished receiving ${chunkCount} chunks from Gemini at: ${new Date().toISOString()}`);

          if (!accumulated.trim()) {
            enqueue(controller, { type: "error", message: "Empty response from AI." });
            return;
          }

          currentStage = "processing";
          enqueue(controller, { type: "progress", stage: currentStage });

          // Parse the accumulated JSON response
          const parsed = parseGeminiResponse(accumulated);
          if (!parsed) {
            enqueue(controller, { type: "error", message: "AI returned unparseable response." });
            return;
          }

          // Apply weighted scoring and verdict logic
          applyWeightedScoring(parsed);

          enqueue(controller, { type: "result", data: parsed });
        } catch (err) {
          if (err instanceof Error && err.message === "GEMINI_API_KEY not configured.") {
            // Fallback result for development/demo when no API key is set
            const fallback = getFallbackAuditResult();
            enqueue(controller, { type: "result", data: fallback });
          } else {
            enqueue(controller, {
              type: "error",
              message: err instanceof Error ? err.message : "Unknown error in streaming analysis",
            });
          }
        } finally {
          clearInterval(keepAliveInterval);
          controller.close();
        }
      },
    });
  });
