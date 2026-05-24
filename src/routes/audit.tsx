import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useCallback } from "react";
import { AppLayout } from "@/components/neuro/AppLayout";
import { PageHeader, Card } from "@/components/neuro/Primitives";
import { Upload, Sparkles, Loader2, FileImage, CheckCircle2, AlertCircle, Lightbulb, Target, Brain, X, Download } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { analyzeCreativeGemini as analyzeCreative } from "@/lib/ai.functions";

export const Route = createFileRoute("/audit")({ component: AuditPage });

type Metric = {
  id: string; label: string; score: number; lower_is_better?: boolean;
  theory: string; why: string; working: string[]; not_working: string[];
  recommendation: string; behavioral_impact: string;
};
type Zone = { x: number; y: number; radius?: number; intensity?: number; label: string };
type GazePoint = { x: number; y: number; order: number };
type Result = {
  summary: string; overall_score: number; verdict: string;
  rural_relevance_note: string; metrics: Metric[];
  heatmap_zones: Zone[]; ignored_zones: Zone[]; gaze_path: GazePoint[];
  top_recommendations: string[];
};

function scoreColor(score: number, lowerBetter = false) {
  const effective = lowerBetter ? 100 - score : score;
  if (effective >= 75) return "text-emerald-700 bg-emerald-500/10";
  if (effective >= 55) return "text-accent bg-accent/15";
  return "text-primary bg-primary/10";
}

function AuditPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [overlay, setOverlay] = useState<"heatmap" | "gaze" | "none">("heatmap");
  const fileRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const analyze = useServerFn(analyzeCreative);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) { setError("Please upload a JPG, PNG, or WebP image."); return; }
    if (file.size > 8 * 1024 * 1024) { setError("Image must be under 8MB."); return; }
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setImageDataUrl(dataUrl);
      setImageUrl(dataUrl);
      setResult(null);
    };
    reader.readAsDataURL(file);
  }, []);

  async function runAudit() {
    if (!imageDataUrl) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await analyze({ data: { imageDataUrl, context: context.trim() || undefined } });
      if (res.ok) setResult(res.result as Result);
      else setError(res.error);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Audit failed.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setImageUrl(null); setImageDataUrl(null); setResult(null); setError(null); setContext("");
  }

  return (
    <AppLayout>
      <PageHeader
        eyebrow="AI Creative Audit Engine"
        title="Audit Creatives with Neuroscience"
        subtitle="Upload a marketing creative. Our explainable engine scores it across 10 neuroscience-backed axes — Salience, Cognitive Load, SST memory encoding, Trust Heuristics, Processing Fluency, and more."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
        {/* Upload zone */}
        <Card className="p-5 lg:col-span-3">
          {!imageUrl ? (
            <div
              onDragOver={(e) => { e.preventDefault(); }}
              onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f); }}
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/40 hover:bg-primary/[0.02] transition"
            >
              <div className="h-14 w-14 mx-auto rounded-2xl bg-primary/8 text-primary grid place-items-center mb-4">
                <Upload className="h-6 w-6" />
              </div>
              <div className="font-display text-lg font-semibold mb-1">Drop a creative here</div>
              <p className="text-xs text-muted-foreground mb-4">JPG, PNG or WebP · up to 8MB</p>
              <button className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-xs font-medium">
                <FileImage className="h-3.5 w-3.5" /> Choose file
              </button>
              <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            </div>
          ) : (
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden bg-secondary flex justify-center items-center h-[400px]">
                <div className="relative h-full w-fit">
                  <img ref={imgRef} src={imageUrl} alt="Creative" className="h-full w-auto object-contain" />
                  {result && overlay === "heatmap" && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <defs>
                        {result.heatmap_zones.map((z, i) => (
                          <radialGradient key={i} id={`hz${i}`}>
                            <stop offset="0%" stopColor={`rgba(239, 68, 68, ${0.6 * (z.intensity ?? 0.7)})`} />
                            <stop offset="40%" stopColor={`rgba(250, 204, 21, ${0.4 * (z.intensity ?? 0.7)})`} />
                            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                          </radialGradient>
                        ))}
                      </defs>
                      {result.heatmap_zones.map((z, i) => (
                        <circle key={i} cx={`${z.x * 100}%`} cy={`${z.y * 100}%`} r={`${(z.radius ?? 0.15) * 100}%`} fill={`url(#hz${i})`} />
                      ))}
                    </svg>
                  )}
                  {result && overlay === "gaze" && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      {result.gaze_path.sort((a,b)=>a.order-b.order).map((p, i, arr) => {
                        if (i === 0) return null;
                        const prev = arr[i - 1];
                        return (
                          <line 
                            key={`line-${i}`} 
                            x1={`${prev.x * 100}%`} y1={`${prev.y * 100}%`} 
                            x2={`${p.x * 100}%`} y2={`${p.y * 100}%`} 
                            stroke="oklch(0.46 0.18 25)" strokeWidth="3" strokeDasharray="6,4" opacity="0.7" 
                          />
                        );
                      })}
                      {result.gaze_path.map((p) => (
                        <g key={p.order}>
                          <circle cx={`${p.x * 100}%`} cy={`${p.y * 100}%`} r="14" fill="oklch(0.46 0.18 25)" opacity="0.85" />
                          <text x={`${p.x * 100}%`} y={`${p.y * 100}%`} dy="4.5" textAnchor="middle" fontSize="13" fill="white" fontWeight="700">{p.order}</text>
                        </g>
                      ))}
                    </svg>
                  )}
                  <button onClick={reset} className="absolute top-2 right-2 h-8 w-8 grid place-items-center rounded-lg bg-background/80 backdrop-blur hover:bg-background transition">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {result && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={() => setOverlay("heatmap")} className={`text-xs px-3 py-1.5 rounded-lg border ${overlay==="heatmap"?"bg-primary text-primary-foreground border-primary":"bg-card border-border hover:bg-secondary"}`}>Attention Heatmap</button>
                  <button onClick={() => setOverlay("gaze")} className={`text-xs px-3 py-1.5 rounded-lg border ${overlay==="gaze"?"bg-primary text-primary-foreground border-primary":"bg-card border-border hover:bg-secondary"}`}>Gaze Path</button>
                  <button onClick={() => setOverlay("none")} className={`text-xs px-3 py-1.5 rounded-lg border ${overlay==="none"?"bg-primary text-primary-foreground border-primary":"bg-card border-border hover:bg-secondary"}`}>Original</button>
                </div>
              )}
            </div>
          )}
        </Card>

        <Card className="p-5 lg:col-span-2 flex flex-col">
          <h3 className="font-display text-base font-semibold mb-1">Campaign Context</h3>
          <p className="text-xs text-muted-foreground mb-3">Optional — helps the engine ground its analysis.</p>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="e.g. Tractor loan TVC for Maharashtra Marathi audience, festive season, target age 28-45 farmers."
            rows={4}
            className="w-full p-3 rounded-lg bg-secondary text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
          />

          <button
            onClick={runAudit}
            disabled={!imageDataUrl || loading}
            className="mt-4 h-11 rounded-xl bg-primary text-primary-foreground font-medium text-sm inline-flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-40 transition"
          >
            {loading ? (<><Loader2 className="h-4 w-4 animate-spin" /> Analyzing neuroscience signals…</>) : (<><Sparkles className="h-4 w-4" /> Run Neuro Audit</>)}
          </button>

          {error && (
            <div className="mt-3 p-3 rounded-lg bg-primary/10 text-primary text-xs flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" /> <span>{error}</span>
            </div>
          )}

          <div className="mt-auto pt-4 text-[10.5px] text-muted-foreground leading-relaxed">
            <strong className="text-foreground/70">Theories applied:</strong> Salience Theory · Cognitive Load Theory · SST · Affective Neuroscience · Trust Heuristics · Social Cognition · Processing Fluency · Familiarity Bias · Eye Tracking Attention · von Restorff Effect.
          </div>
        </Card>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6 fade-up">
          {/* Overall verdict */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex items-center gap-5">
                <div className={`h-24 w-24 rounded-2xl grid place-items-center font-display ${scoreColor(result.overall_score)}`}>
                  <div className="text-3xl font-bold leading-none">{result.overall_score}</div>
                </div>
                <div>
                  <div className="chip mb-2">Overall Neuro Score</div>
                  <div className="font-display text-2xl font-semibold">{result.verdict}</div>
                  <div className="text-xs text-muted-foreground mt-1">{result.rural_relevance_note}</div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-sm font-semibold mb-2 flex items-center gap-2"><Brain className="h-4 w-4 text-primary" /> Executive Summary</h3>
                <p className="text-sm text-foreground/85 leading-relaxed">{result.summary}</p>
              </div>
            </div>

            {result.top_recommendations?.length > 0 && (
              <div className="mt-5 pt-5 border-t border-border">
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2"><Target className="h-3.5 w-3.5" /> Top Recommendations</h4>
                <ul className="grid md:grid-cols-2 gap-2">
                  {result.top_recommendations.map((r, i) => (
                    <li key={i} className="flex gap-2 text-sm p-2.5 rounded-lg bg-secondary/60">
                      <Lightbulb className="h-4 w-4 text-accent shrink-0 mt-0.5" /> <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>

          {/* Metrics grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold">Explainable Metrics</h2>
              <button onClick={() => window.print()} className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-secondary">
                <Download className="h-3.5 w-3.5" /> Export Report
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.metrics.map((m) => (
                <Card key={m.id} className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-display text-[15px] font-semibold">{m.label}</div>
                      <div className="text-[10.5px] text-muted-foreground mt-0.5">Theory: {m.theory}</div>
                    </div>
                    <div className={`h-14 w-14 rounded-xl grid place-items-center font-display ${scoreColor(m.score, m.lower_is_better)}`}>
                      <div className="text-xl font-bold leading-none">{m.score}</div>
                    </div>
                  </div>

                  <div className="space-y-3 text-[12.5px]">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Why this score</div>
                      <p className="text-foreground/85 leading-relaxed">{m.why}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-emerald-700 mb-1 flex items-center gap-1"><CheckCircle2 className="h-3 w-3"/> Working</div>
                        <ul className="space-y-1 text-foreground/80">
                          {m.working?.map((w, i) => <li key={i} className="text-[11.5px] leading-snug">• {w}</li>)}
                        </ul>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-primary mb-1 flex items-center gap-1"><AlertCircle className="h-3 w-3"/> Gaps</div>
                        <ul className="space-y-1 text-foreground/80">
                          {m.not_working?.map((w, i) => <li key={i} className="text-[11.5px] leading-snug">• {w}</li>)}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <div className="text-[10px] uppercase tracking-wider text-accent mb-1 flex items-center gap-1"><Lightbulb className="h-3 w-3"/> Recommendation</div>
                      <p className="text-foreground/85 leading-relaxed">{m.recommendation}</p>
                    </div>
                    <div className="text-[11.5px] text-muted-foreground italic">
                      Expected impact: {m.behavioral_impact}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Heatmap zone labels */}
          {result.heatmap_zones?.length > 0 && (
            <Card className="p-5">
              <h3 className="font-display text-base font-semibold mb-3">Predicted Attention Zones</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {result.heatmap_zones.map((z, i) => (
                  <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg bg-secondary/50">
                    <div className="h-6 w-6 rounded-full bg-primary/15 text-primary text-[11px] font-bold grid place-items-center shrink-0">{i+1}</div>
                    <div>
                      <div className="text-foreground/85">{z.label}</div>
                      <div className="text-[10.5px] text-muted-foreground">Intensity: {Math.round((z.intensity ?? 0.7) * 100)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}
    </AppLayout>
  );
}
