import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useCallback } from "react";
import { AppLayout } from "@/components/neuro/AppLayout";
import { PageHeader } from "@/components/neuro/Primitives";
import { 
  Upload, Sparkles, Loader2, FileImage, CheckCircle2, AlertCircle, 
  Lightbulb, Target, Brain, X, Download, HelpCircle, Activity, 
  ChevronDown, ChevronUp, ShieldCheck, Eye, Compass, Layers, 
  Zap, Award, RefreshCw 
} from "lucide-react";
import { analyzeCreativeStream } from "@/lib/ai.streaming";
import type { StreamEvent } from "@/lib/ai.streaming";

export const Route = createFileRoute("/audit")({ component: AuditPage });

type Metric = {
  id: string; 
  label: string; 
  score: number; 
  lower_is_better?: boolean;
  theory: string; 
  why: string; 
  neuroscience_explanation: string;
  working: string[]; 
  not_working: string[];
  recommendation: string; 
  behavioral_impact: string;
};

type Zone = { x: number; y: number; radius?: number; intensity?: number; label: string };
type GazePoint = { x: number; y: number; order: number };

type Result = {
  summary: string; 
  overall_score: number; 
  verdict: string;
  rural_relevance_note: string; 
  metrics: Metric[];
  heatmap_zones: Zone[]; 
  ignored_zones: Zone[]; 
  gaze_path: GazePoint[];
  top_recommendations: string[];
};

function scoreColor(score: number, lowerBetter = false) {
  const effective = lowerBetter ? 100 - score : score;
  if (effective >= 75) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
  if (effective >= 55) return "text-amber-400 bg-amber-500/10 border-amber-500/30";
  return "text-rose-400 bg-rose-500/10 border-rose-500/30";
}

function scoreProgressBar(score: number, lowerBetter = false) {
  const effective = lowerBetter ? 100 - score : score;
  if (effective >= 75) return "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]";
  if (effective >= 55) return "bg-gradient-to-r from-amber-500 to-yellow-400 shadow-[0_0_8px_rgba(245,158,11,0.5)]";
  return "bg-gradient-to-r from-rose-600 to-red-400 shadow-[0_0_8px_rgba(244,63,94,0.5)]";
}

const STREAM_STATUS_MESSAGES: Record<string, string> = {
  starting: "Initializing neural analysis engine…",
  connecting: "Connecting to Gemini cognitive processor…",
  analyzing: "AI is analyzing visual saliency patterns…",
  processing: "Computing weighted neuro-scores…",
};

function AuditPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [overlay, setOverlay] = useState<"heatmap" | "gaze" | "ignored" | "none">("heatmap");
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);
  const [streamStatus, setStreamStatus] = useState<string>("idle");
  const [chunksReceived, setChunksReceived] = useState(0);
  
  const fileRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) { 
      setError("Please upload a JPG, PNG, or WebP image."); 
      return; 
    }
    if (file.size > 8 * 1024 * 1024) { 
      setError("Image must be under 8MB."); 
      return; 
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setImageDataUrl(dataUrl);
      setImageUrl(dataUrl);
      setResult(null);
      setExpandedMetric(null);
    };
    reader.readAsDataURL(file);
  }, []);

  async function runAudit() {
    if (!imageDataUrl) return;
    setLoading(true); 
    setError(null); 
    setResult(null);
    setExpandedMetric(null);
    setStreamStatus("starting");
    setChunksReceived(0);

    try {
      // Call the streaming server function — returns a ReadableStream
      const stream = await analyzeCreativeStream({
        data: { imageDataUrl, context: context.trim() || undefined },
      });

      if (!stream || typeof (stream as any).getReader !== "function") {
        // Fallback: if the response is not a stream (e.g. direct result),
        // treat it as a non-streaming response for backwards compatibility
        const directResult = stream as any;
        if (directResult?.type === "result" && directResult.data) {
          const nextResult = directResult.data as Result;
          setResult(nextResult);
          applyOverlayDefaults(nextResult);
        } else {
          setError("Unexpected response format.");
        }
        setLoading(false);
        setStreamStatus("idle");
        return;
      }

      const reader = (stream as ReadableStream).getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      console.log("[Client Stream] Started reading stream at:", new Date().toISOString());

      while (true) {
        const { done, value } = await reader.read();
        
        if (value) {
          console.log(`[Client Stream] Received chunk of size: ${value.byteLength} bytes at ${new Date().toISOString()}`);
        }

        if (done) {
          console.log("[Client Stream] Stream reading complete at:", new Date().toISOString());
          break;
        }

        buffer += decoder.decode(value, { stream: true });

        // Process complete NDJSON lines
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? ""; // Keep incomplete line in buffer

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;

          try {
            const event: StreamEvent = JSON.parse(trimmed);
            console.log("[Client Stream] Parsed event:", event.type, event.type === 'progress' ? event.stage : '');

            if (event.type === "progress") {
              setStreamStatus(event.stage);
              if (event.chunksReceived) {
                setChunksReceived(event.chunksReceived);
              }
            } else if (event.type === "result") {
              const nextResult = event.data as Result;
              setResult(nextResult);
              applyOverlayDefaults(nextResult);
              if (nextResult.metrics?.length > 0) {
                setExpandedMetric(nextResult.metrics[0].id);
              }
            } else if (event.type === "error") {
              setError(event.message);
            }
          } catch (err) {
            console.error("[Client Stream] Failed to parse JSON line:", trimmed, err);
            // Skip malformed JSON lines
          }
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Audit failed.");
    } finally {
      setLoading(false);
      setStreamStatus("idle");
    }
  }

  function applyOverlayDefaults(nextResult: Result) {
    const hasHeatmap = (nextResult.heatmap_zones?.length ?? 0) > 0;
    const hasGaze = (nextResult.gaze_path?.length ?? 0) > 0;
    const hasIgnored = (nextResult.ignored_zones?.length ?? 0) > 0;
    setOverlay(hasHeatmap ? "heatmap" : hasGaze ? "gaze" : hasIgnored ? "ignored" : "none");
  }

  function reset() {
    setImageUrl(null); 
    setImageDataUrl(null); 
    setResult(null); 
    setError(null); 
    setContext("");
    setExpandedMetric(null);
  }

  const toggleMetric = (id: string) => {
    setExpandedMetric(expandedMetric === id ? null : id);
  };

  const hasHeatmapOverlay = (result?.heatmap_zones?.length ?? 0) > 0;
  const hasGazeOverlay = (result?.gaze_path?.length ?? 0) > 0;
  const hasIgnoredOverlay = (result?.ignored_zones?.length ?? 0) > 0;
  const hasAnyTelemetryOverlay = hasHeatmapOverlay || hasGazeOverlay || hasIgnoredOverlay;

  return (
    <AppLayout>
      {/* Immersive Light Capsule Container */}
      <div className="bg-background text-foreground p-6 lg:p-8 rounded-3xl border border-border shadow-2xl relative overflow-hidden backdrop-blur-xl">
        
        {/* Cyber Ambient Backdrop Grids */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-gradient-to-b from-[#8B1E1E]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-48 -left-48 w-[400px] h-[400px] bg-gradient-to-t from-teal-500/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10">
          <PageHeader
            eyebrow="Cognitive Visual Lab"
            title="AI Neuromarketing Creative Audit Engine"
            subtitle="Applied Neuroscience for Marketing Intelligence. Our engine dissects visual assets using pre-attentive Salience, Cognitive Load element interaction, SST temporal lobe encoding, and Fitts's Law CTA velocity to deliver high-density strategic blueprints."
          />

          {/* Interactive Form Controls Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8 mt-4">
            
            {/* Visual File Upload Container */}
            <div className="lg:col-span-3 bg-card rounded-2xl border border-border p-5 backdrop-blur flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#8B1E1E]/40 to-transparent" />
              
              {!imageUrl ? (
                <div
                  onDragOver={(e) => { e.preventDefault(); }}
                  onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f); }}
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-stone-800/80 rounded-xl py-20 px-8 text-center cursor-pointer hover:border-[#8B1E1E]/50 hover:bg-stone-900/30 transition duration-300 flex flex-col items-center justify-center min-h-[380px] group"
                >
                  <div className="h-16 w-16 rounded-2xl bg-secondary border border-border text-[#8B1E1E] group-hover:text-rose-400 group-hover:border-[#8B1E1E]/40 group-hover:scale-105 transition-all duration-300 grid place-items-center mb-5 shadow-inner">
                    <Upload className="h-7 w-7 text-stone-400 group-hover:text-[#8B1E1E] transition" />
                  </div>
                  <div className="font-display text-lg font-bold text-stone-200 mb-2 group-hover:text-white transition">Deploy Campaign Asset</div>
                  <p className="text-xs text-stone-400 max-w-xs leading-relaxed mb-6">Drop creatives inside this bounds. Supports JPG, PNG or WebP formats up to 8 megabytes.</p>
                  
                  <button className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-[#8B1E1E] hover:bg-rose-900 text-stone-100 text-xs font-semibold tracking-wider uppercase transition shadow-md shadow-black/40">
                    <FileImage className="h-4 w-4" /> Browse Workspace
                  </button>
                  <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
                </div>
              ) : (
                <div className="relative flex flex-col justify-between h-full min-h-[380px]">
                  
                  {/* Uploaded Creative Display Shield */}
                  <div className="relative rounded-xl overflow-hidden bg-secondary border border-border flex justify-center items-center h-[420px]">
                    <div className="relative h-full w-fit flex items-center justify-center">
                      <img ref={imgRef} src={imageUrl} alt="Campaign Creative" className="h-full w-auto object-contain" />
                      
                      {/* Interactive Attention Heatmap Overlay */}
                      {result && hasHeatmapOverlay && overlay === "heatmap" && (
                        <svg className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen">
                          <defs>
                            {result.heatmap_zones.map((z, i) => (
                              <radialGradient key={i} id={`hz-grad-${i}`}>
                                <stop offset="0%" stopColor="rgba(244, 63, 94, 0.85)" />
                                <stop offset="25%" stopColor="rgba(245, 158, 11, 0.6)" />
                                <stop offset="60%" stopColor="rgba(16, 185, 129, 0.3)" />
                                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                              </radialGradient>
                            ))}
                          </defs>
                          {result.heatmap_zones.map((z, i) => (
                            <circle key={i} cx={`${z.x * 100}%`} cy={`${z.y * 100}%`} r={`${(z.radius ?? 0.16) * 100}%`} fill={`url(#hz-grad-${i})`} />
                          ))}
                        </svg>
                      )}

                      {/* Interactive Numbered Saccadic Gaze Path Overlay */}
                      {result && hasGazeOverlay && overlay === "gaze" && (
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                          <defs>
                            <marker id="arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                              <path d="M 0 0 L 10 5 L 0 10 z" fill="#f97316" />
                            </marker>
                          </defs>
                          {result.gaze_path.sort((a,b) => a.order - b.order).map((p, i, arr) => {
                            if (i === 0) return null;
                            const prev = arr[i - 1];
                            return (
                              <line 
                                key={`line-${i}`} 
                                x1={`${prev.x * 100}%`} y1={`${prev.y * 100}%`} 
                                x2={`${p.x * 100}%`} y2={`${p.y * 100}%`} 
                                stroke="#f97316" strokeWidth="2.5" strokeDasharray="6,5" opacity="0.8"
                                markerEnd="url(#arrow)"
                              />
                            );
                          })}
                          {result.gaze_path.map((p) => (
                            <g key={p.order} className="transition-all duration-300">
                              <circle cx={`${p.x * 100}%`} cy={`${p.y * 100}%`} r="15" fill="#181413" stroke="#f97316" strokeWidth="2.5" className="shadow-lg" />
                              <circle cx={`${p.x * 100}%`} cy={`${p.y * 100}%`} r="18" fill="transparent" stroke="#f97316" strokeWidth="1" strokeDasharray="3,2" className="animate-spin" style={{ animationDuration: "12s" }} />
                              <text x={`${p.x * 100}%`} y={`${p.y * 100}%`} dy="4.5" textAnchor="middle" fontSize="11" fill="#f97316" fontWeight="800">{String(p.order).padStart(2, '0')}</text>
                            </g>
                          ))}
                        </svg>
                      )}

                      {/* Interactive Ignored/Friction Zones Overlay */}
                      {result && hasIgnoredOverlay && overlay === "ignored" && (
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                          {result.ignored_zones.map((z, i) => (
                            <g key={i}>
                              {/* Crosshair target mark */}
                              <circle cx={`${z.x * 100}%`} cy={`${z.y * 100}%`} r="24" fill="rgba(244,63,94,0.06)" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4,4" />
                              <line x1={`${z.x * 100 - 30}%`} y1={`${z.y * 100}%`} x2={`${z.x * 100 + 30}%`} y2={`${z.y * 100}%`} stroke="#f43f5e" strokeWidth="1" />
                              <line x1={`${z.x * 100}%`} y1={`${z.y * 100 - 30}%`} x2={`${z.x * 100}%`} y2={`${z.y * 100 + 30}%`} stroke="#f43f5e" strokeWidth="1" />
                              {/* Glowing tag label */}
                              <rect x={`${z.x * 100 + 20}%`} y={`${z.y * 100 - 10}%`} width="130" height="20" rx="4" fill="#0c0a0a" stroke="#f43f5e" strokeWidth="1" opacity="0.9" />
                              <text x={`${z.x * 100 + 26}%`} y={`${z.y * 100 + 4}%`} fontSize="8.5" fill="#fda4af" fontWeight="700" letterSpacing="0.05em" className="uppercase">Cognitive Blindness</text>
                            </g>
                          ))}
                        </svg>
                      )}

                      {/* Image Action Reset Button */}
                      <button onClick={reset} className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition duration-200 shadow-xl backdrop-blur-md">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Mode Toggles Horizontal Drawer */}
                  {result && hasAnyTelemetryOverlay && (
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 bg-secondary/60 p-2.5 rounded-xl border border-border">
                      <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
                        <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>TELEMETRY OVERLAYS:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {hasHeatmapOverlay && (
                          <button 
                            onClick={() => setOverlay("heatmap")} 
                            className={`text-xs font-semibold px-4 py-2 rounded-lg border flex items-center gap-1.5 transition-all duration-300 ${overlay === "heatmap" ? "bg-[#8B1E1E] text-white border-[#8B1E1E] shadow-[0_0_10px_rgba(139,30,30,0.5)]" : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                          >
                            <Activity className="h-3.5 w-3.5" /> Salience Heatmap
                          </button>
                        )}
                        {hasGazeOverlay && (
                          <button 
                            onClick={() => setOverlay("gaze")} 
                            className={`text-xs font-semibold px-4 py-2 rounded-lg border flex items-center gap-1.5 transition-all duration-300 ${overlay === "gaze" ? "bg-[#8B1E1E] text-white border-[#8B1E1E] shadow-[0_0_10px_rgba(139,30,30,0.5)]" : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                          >
                            <Eye className="h-3.5 w-3.5" /> Gaze Scanpath
                          </button>
                        )}
                        {hasIgnoredOverlay && (
                          <button 
                            onClick={() => setOverlay("ignored")} 
                            className={`text-xs font-semibold px-4 py-2 rounded-lg border flex items-center gap-1.5 transition-all duration-300 ${overlay === "ignored" ? "bg-[#8B1E1E] text-white border-[#8B1E1E] shadow-[0_0_10px_rgba(139,30,30,0.5)]" : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                          >
                            <Compass className="h-3.5 w-3.5" /> Blindness Risks
                          </button>
                        )}
                        <button 
                          onClick={() => setOverlay("none")} 
                          className={`text-xs font-semibold px-4 py-2 rounded-lg border flex items-center gap-1.5 transition-all duration-300 ${overlay === "none" ? "bg-secondary text-foreground border-border" : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                        >
                          Original
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Campaign Context & AI Operations Card */}
            <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-5 backdrop-blur flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-[#8B1E1E] pulse-glow" />
                  <h3 className="font-display text-base font-bold tracking-wide text-foreground uppercase">Input Context Matrix</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">Ground the visual neural networks with audience constraints and media properties to isolate specific regional cognitive biases.</p>
                
                {/* Command Line Input Wrapper */}
                <div className="relative bg-secondary rounded-xl border border-border p-3 mb-6 focus-within:border-[#8B1E1E]/50 focus-within:ring-1 focus-within:ring-[#8B1E1E]/30 transition-all">
                  <div className="absolute top-2.5 left-3 text-[10px] font-mono text-muted-foreground/70 flex items-center gap-1">
                    <Zap className="h-2.5 w-2.5" /> <span>SECURE_INPUT_SHELL //</span>
                  </div>
                  <textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="E.g., Rural farming tractor loan poster, targeted towards farmers in Central Maharashtra. Emotional theme: post-harvest prosperity. Primary channels: physical flyers & regional WhatsApp."
                    rows={6}
                    className="w-full mt-4 bg-transparent text-foreground placeholder:text-muted-foreground text-xs leading-relaxed resize-none focus:outline-none scrollbar-thin"
                  />
                  <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground/70 border-t border-border pt-2 mt-2">
                    <span>MODE: REGIONAL_TARGETING</span>
                    <span>MAX_CHARS: 500</span>
                  </div>
                </div>
              </div>

              <div>
                {/* Trigger Control Panel */}
                <button
                  onClick={runAudit}
                  disabled={!imageDataUrl || loading}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#8B1E1E] to-[#C62828] text-white font-bold text-xs uppercase tracking-widest inline-flex items-center justify-center gap-2 hover:from-rose-900 hover:to-rose-800 disabled:opacity-30 disabled:pointer-events-none transition duration-300 shadow-xl shadow-rose-950/20 active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-stone-200" /> 
                      <span className="font-mono">
                        {STREAM_STATUS_MESSAGES[streamStatus] || "Processing visual arrays…"}
                        {chunksReceived > 0 && streamStatus === "analyzing" && (
                          <span className="text-stone-400 ml-1">(chunk {chunksReceived})</span>
                        )}
                      </span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" /> 
                      <span>Execute Cognitive Audit</span>
                    </>
                  )}
                </button>

                {error && (
                  <div className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-pulse">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" /> 
                    <span className="font-mono">{error}</span>
                  </div>
                )}

                <div className="mt-6 pt-5 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground/70 font-mono">
                  <span>FRAMEWORKS ACTIVATED:</span>
                  <span>17 CORE SCHEMAS</span>
                </div>
                <div className="mt-2 text-[9px] text-muted-foreground/70 leading-relaxed font-mono">
                  SST EEG Consolidation · Sweller Elements · Panksepp Affective Path · Gestalt Common Region · Mayer Heuristics · Fitts Target Sizing · von Restorff Isolation.
                </div>
              </div>

            </div>

          </div>

          {/* Audit Results Dashboard */}
          {result && (
            <div className="space-y-8 fade-up mt-8">
              
              {/* Executive Summary & Overall Grade Card */}
              <div className="bg-card rounded-2xl border border-border p-6 backdrop-blur relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-500/40 via-[#8B1E1E]/40 to-teal-500/40" />
                
                <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-between">
                  
                  {/* Radial Performance Score Telemetry */}
                  <div className="flex items-center gap-6 shrink-0 bg-card/50 border border-border p-4 rounded-xl">
                    <div className={`h-24 w-24 rounded-2xl border-2 flex flex-col items-center justify-center font-display shadow-2xl relative overflow-hidden shrink-0 ${scoreColor(result.overall_score)}`}>
                      <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
                      <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground/70 -mt-1 font-bold">Grade</span>
                      <span className="text-3xl font-extrabold leading-none mt-1">{result.overall_score}</span>
                    </div>
                    <div>
                      <div className="text-[10px] tracking-widest font-mono text-muted-foreground/70 uppercase">COGNITIVE COMPLIANCE</div>
                      <div className="font-display text-2xl font-bold text-foreground mt-1">{result.verdict}</div>
                      <div className="text-xs text-muted-foreground mt-2 max-w-xs leading-relaxed">
                        <span className="text-teal-400 font-semibold font-mono">RURAL NOTE:</span> {result.rural_relevance_note}
                      </div>
                    </div>
                  </div>

                  {/* Summary Stack */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="font-display text-sm font-bold tracking-wider uppercase text-[#8B1E1E] flex items-center gap-2 mb-2.5">
                        <Brain className="h-4 w-4" /> Boardroom Neuroscience Audit
                      </h3>
                      <p className="text-sm text-foreground leading-relaxed font-sans max-w-3xl">{result.summary}</p>
                    </div>
                    
                    {result.top_recommendations?.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-border">
                        <h4 className="text-[10px] font-mono tracking-wider text-muted-foreground/70 uppercase mb-3 flex items-center gap-1.5">
                          <Target className="h-3.5 w-3.5 text-[#8B1E1E]" /> Primary Visual Tuning Instructions
                        </h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {result.top_recommendations.map((r, i) => (
                            <div key={i} className="flex gap-2.5 text-xs p-3 rounded-lg bg-secondary border border-border">
                              <Lightbulb className="h-4 w-4 text-amber-400 shrink-0" /> 
                              <span className="text-muted-foreground font-sans leading-relaxed">{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* Explainable Metrics Directory */}
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 border-b border-border pb-4">
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                      <Activity className="h-5 w-5 text-[#8B1E1E]" /> Advanced Cognitive Breakdown
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Rigorous, data-grounded metrics displaying how specific cortical sectors process this layout matrix.</p>
                  </div>
                  
                  <button 
                    onClick={() => window.print()} 
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase px-4 h-9 rounded-lg border border-border bg-card/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition duration-200"
                  >
                    <Download className="h-4 w-4" /> Export Report
                  </button>
                </div>

                {/* 14 Diagnostic Metric Grid Panels */}
                <div className="grid grid-cols-1 gap-4">
                  {result.metrics.map((m) => {
                    const isOpen = expandedMetric === m.id;
                    return (
                      <div 
                        key={m.id} 
                        className={`rounded-2xl border transition-all duration-300 ${isOpen ? "bg-card border-[#8B1E1E]/40 shadow-lg shadow-rose-950/5" : "bg-card/50 border-border hover:bg-card hover:border-border"}`}
                      >
                        {/* Header Drawer Bar */}
                        <div 
                          onClick={() => toggleMetric(m.id)}
                          className="p-5 flex items-center justify-between cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            {/* Visual Score Radial Gauge */}
                            <div className={`h-11 w-11 rounded-xl border flex items-center justify-center font-display font-extrabold shrink-0 ${scoreColor(m.score, m.lower_is_better)}`}>
                              {m.score}
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-sm font-bold text-foreground font-display tracking-wide">{m.label}</h3>
                              <p className="text-[10px] text-muted-foreground/70 font-mono mt-0.5 truncate uppercase">
                                theory matrix: <span className="text-muted-foreground">{m.theory}</span>
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className="hidden md:inline text-[10px] font-mono text-muted-foreground/70">
                              {isOpen ? "COLLAPSE PANEL" : "EXPAND ANALYTICAL BREAKDOWN"}
                            </span>
                            <div className={`h-8 w-8 rounded-lg bg-secondary border border-border grid place-items-center transition duration-300 ${isOpen ? "rotate-180 border-[#8B1E1E]/30 text-[#8B1E1E]" : "text-muted-foreground"}`}>
                              <ChevronDown className="h-4 w-4" />
                            </div>
                          </div>
                        </div>

                        {/* Expandable Analytical Content Drawer */}
                        {isOpen && (
                          <div className="px-5 pb-6 pt-1 border-t border-border">
                            
                            {/* Horizontal visual indicator meter */}
                            <div className="mb-6 bg-secondary/60 p-3 rounded-xl border border-border">
                              <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground/70 mb-1.5">
                                <span>COGNITIVE THRESHOLD CALIBRATION</span>
                                <span className="font-bold text-muted-foreground">{m.score}/100</span>
                              </div>
                              <div className="w-full h-1.5 rounded-full bg-card overflow-hidden relative">
                                <div 
                                  className={`h-full rounded-full transition-all duration-700 ease-out ${scoreProgressBar(m.score, m.lower_is_better)}`}
                                  style={{ width: `${m.score}%` }}
                                />
                              </div>
                            </div>

                            {/* Dense Diagnostic Telemetry Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                              
                              {/* Left Column: Diagnostics */}
                              <div className="lg:col-span-7 space-y-5">
                                
                                {/* Sector 1: Visual Observation */}
                                <div className="space-y-1">
                                  <div className="text-[9px] font-mono tracking-wider text-muted-foreground/70 uppercase flex items-center gap-1.5">
                                    <Eye className="h-3 w-3 text-[#8B1E1E]" /> Visual Detection Signal
                                  </div>
                                  <p className="text-xs text-muted-foreground leading-relaxed font-sans pl-4 border-l border-border">
                                    {m.why}
                                  </p>
                                </div>

                                {/* Sector 2: Strengths & Gaps Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {/* Strengths */}
                                  <div className="bg-secondary/40 border border-border p-3.5 rounded-xl">
                                    <div className="text-[9px] font-mono tracking-wider text-emerald-400 uppercase flex items-center gap-1.5 mb-2">
                                      <CheckCircle2 className="h-3.5 w-3.5" /> High Foveal Lock (Strengths)
                                    </div>
                                    <ul className="space-y-1.5 text-muted-foreground">
                                      {m.working?.map((w, i) => (
                                        <li key={i} className="text-xs leading-relaxed font-sans flex items-start gap-1.5">
                                          <span className="text-emerald-400 shrink-0 mt-0.5">•</span>
                                          <span>{w}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Gaps */}
                                  <div className="bg-secondary/40 border border-border p-3.5 rounded-xl">
                                    <div className="text-[9px] font-mono tracking-wider text-rose-400 uppercase flex items-center gap-1.5 mb-2">
                                      <AlertCircle className="h-3.5 w-3.5" /> Sensory Leakage (Weaknesses)
                                    </div>
                                    <ul className="space-y-1.5 text-muted-foreground">
                                      {m.not_working?.map((w, i) => (
                                        <li key={i} className="text-xs leading-relaxed font-sans flex items-start gap-1.5">
                                          <span className="text-rose-400 shrink-0 mt-0.5">•</span>
                                          <span>{w}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                                {/* Sector 3: Neuroscience Explanation */}
                                <div className="bg-secondary/60 border border-border p-3.5 rounded-xl">
                                  <div className="text-[9px] font-mono tracking-wider text-[#8B1E1E] uppercase flex items-center gap-1.5 mb-1.5">
                                    <Brain className="h-3.5 w-3.5" /> Cortical Framework Activation
                                  </div>
                                  <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                                    {m.neuroscience_explanation}
                                  </p>
                                </div>

                              </div>

                              {/* Right Column: Blueprints */}
                              <div className="lg:col-span-5 space-y-5 bg-secondary/30 border border-border p-4 rounded-xl flex flex-col justify-between">
                                
                                {/* Sector 4: Optimization Recommendation */}
                                <div className="space-y-1.5">
                                  <div className="text-[9px] font-mono tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
                                    <Lightbulb className="h-3.5 w-3.5" /> Neuro-Aligned Instruction
                                  </div>
                                  <div className="p-3.5 rounded-xl bg-secondary border border-border">
                                    <p className="text-xs font-semibold text-amber-300 leading-relaxed font-sans">
                                      {m.recommendation}
                                    </p>
                                  </div>
                                </div>

                                {/* Sector 5: Expected Behavioral Impact */}
                                <div className="space-y-1 pt-4 border-t border-border">
                                  <div className="text-[9px] font-mono tracking-wider text-teal-400 uppercase flex items-center gap-1.5">
                                    <Zap className="h-3 w-3" /> Predicted Impact Matrix
                                  </div>
                                  <p className="text-xs text-muted-foreground italic leading-relaxed font-sans">
                                    {m.behavioral_impact}
                                  </p>
                                </div>

                              </div>

                            </div>

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </AppLayout>
  );
}
