import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppLayout } from "@/components/neuro/AppLayout";
import { PageHeader, Card } from "@/components/neuro/Primitives";
import { Eye, Play, Square, Camera, Info, RotateCcw, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/eye-tracking")({ component: EyeTrackingPage });

type Heat = { x: number; y: number; t: number };

function EyeTrackingPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "active" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [gaze, setGaze] = useState<{ x: number; y: number } | null>(null);
  const [points, setPoints] = useState<Heat[]>([]);
  const [fixations, setFixations] = useState<number>(0);
  const [showHeat, setShowHeat] = useState(true);
  const webgazerRef = useRef<any>(null);
  const trailRef = useRef<Heat[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dwellRef = useRef<{ x: number; y: number; start: number } | null>(null);

  async function start() {
    setStatus("loading"); setError(null);
    try {
      const wg = (await import("webgazer")).default;
      webgazerRef.current = wg;
      wg.params.showVideoPreview = true;
      wg.params.showFaceOverlay = false;
      wg.params.showFaceFeedbackBox = false;
      wg.params.showPredictionPoints = false;
      await wg.setRegression("ridge").setGazeListener((data: any) => {
        if (!data) return;
        const x = data.x, y = data.y;
        setGaze({ x, y });
        const now = performance.now();
        trailRef.current = [...trailRef.current.slice(-200), { x, y, t: now }];
        setPoints((p) => [...p.slice(-400), { x, y, t: now }]);

        // simple fixation: stayed within 60px for 250ms
        const d = dwellRef.current;
        if (!d) { dwellRef.current = { x, y, start: now }; }
        else {
          const dist = Math.hypot(x - d.x, y - d.y);
          if (dist > 80) {
            if (now - d.start > 250) setFixations((f) => f + 1);
            dwellRef.current = { x, y, start: now };
          }
        }
      }).begin();
      setStatus("active");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Could not start eye tracking. Allow webcam access and retry.");
    }
  }

  async function stop() {
    try { webgazerRef.current?.pause(); webgazerRef.current?.end(); } catch {}
    setStatus("idle"); setGaze(null);
  }

  function clear() {
    setPoints([]); setFixations(0); trailRef.current = [];
  }

  // Draw heatmap on canvas
  useEffect(() => {
    if (!showHeat) return;
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    c.width = window.innerWidth; c.height = window.innerHeight;
    ctx.clearRect(0, 0, c.width, c.height);
    points.forEach((p) => {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 60);
      g.addColorStop(0, "rgba(239,68,68,0.18)");
      g.addColorStop(0.5, "rgba(250,204,21,0.10)");
      g.addColorStop(1, "rgba(59,130,246,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x, p.y, 60, 0, Math.PI * 2); ctx.fill();
    });
  }, [points, showHeat]);

  useEffect(() => () => { try { webgazerRef.current?.end(); } catch {} }, []);

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Live Eye Tracking Lab"
        title="Browser-Based Gaze Estimation"
        subtitle="WebGazer.js uses your webcam to estimate gaze direction in real time. Watch where your eyes go, accumulate a personal heatmap, and study your own fixation pattern across this very page."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-5 lg:col-span-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-base font-semibold flex items-center gap-2"><Camera className="h-4 w-4 text-primary"/> Gaze Estimation</h3>
            <div className="flex gap-2">
              {status !== "active" ? (
                <button onClick={start} disabled={status==="loading"} className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 disabled:opacity-50">
                  <Play className="h-3.5 w-3.5" /> {status==="loading"?"Loading model…":"Start"}
                </button>
              ) : (
                <button onClick={stop} className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-secondary text-foreground text-xs font-medium border border-border">
                  <Square className="h-3.5 w-3.5" /> Stop
                </button>
              )}
              <button onClick={clear} className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-card text-xs hover:bg-secondary">
                <RotateCcw className="h-3.5 w-3.5" /> Clear
              </button>
              <button onClick={() => setShowHeat(!showHeat)} className={`inline-flex items-center gap-2 h-9 px-3 rounded-lg border text-xs ${showHeat?"bg-primary text-primary-foreground border-primary":"bg-card border-border"}`}>
                Heatmap
              </button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Label this feature internally as <strong>Browser-Based Gaze Estimation</strong> — not medical-grade eye tracking. Calibrate by looking around the screen for 10–15 seconds before treating outputs as meaningful.</p>

          {error && (
            <div className="mb-3 p-3 rounded-lg bg-primary/10 text-primary text-xs flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" /><span>{error}</span>
            </div>
          )}

          <div className="rounded-xl bg-secondary/50 p-6 text-sm text-foreground/85 leading-relaxed">
            <p className="mb-3">👀 <strong>Look around this card</strong>. As you read, the system accumulates your fixations. Try to follow your eyes:</p>
            <ul className="list-disc ml-5 space-y-1 text-foreground/80">
              <li>First, your gaze lands on the largest, highest-contrast element (Salience Theory).</li>
              <li>Then it scans in an F-pattern across copy (Eye Tracking Attention Theory).</li>
              <li>Faces and red CTAs pull dwell time disproportionately.</li>
              <li>Whitespace and edges are systematically ignored.</li>
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">Tip: poor lighting and head movement degrade accuracy. Sit ~50cm from the camera, face evenly lit.</p>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-display text-base font-semibold mb-3">Live Telemetry</h3>
          <div className="space-y-3">
            <Stat label="Status" value={status === "active" ? "Tracking" : status === "loading" ? "Loading" : status === "error" ? "Error" : "Idle"} active={status==="active"} />
            <Stat label="Gaze X" value={gaze ? `${Math.round(gaze.x)}px` : "—"} />
            <Stat label="Gaze Y" value={gaze ? `${Math.round(gaze.y)}px` : "—"} />
            <Stat label="Samples" value={`${points.length}`} />
            <Stat label="Fixations" value={`${fixations}`} />
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="font-display text-base font-semibold mb-2 flex items-center gap-2"><Info className="h-4 w-4 text-accent" /> What this measures</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div><div className="text-xs font-semibold text-primary mb-1">First Fixation</div><p className="text-foreground/75 leading-relaxed">Where your eyes land first — predicts dominant visual hierarchy in a creative.</p></div>
          <div><div className="text-xs font-semibold text-primary mb-1">Dwell Time</div><p className="text-foreground/75 leading-relaxed">How long gaze remains on an area — proxy for emotional engagement.</p></div>
          <div><div className="text-xs font-semibold text-primary mb-1">Ignored Zones</div><p className="text-foreground/75 leading-relaxed">Where attention never reached — typically wasted ad real estate.</p></div>
        </div>
      </Card>

      {/* Overlay gaze cursor + heatmap canvas */}
      {status === "active" && (
        <>
          {showHeat && <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-30" />}
          {gaze && (
            <div
              className="fixed pointer-events-none z-40 transition-transform duration-75"
              style={{ left: gaze.x - 14, top: gaze.y - 14 }}
            >
              <div className="h-7 w-7 rounded-full border-2 border-primary bg-primary/20 backdrop-blur-sm" />
            </div>
          )}
        </>
      )}
    </AppLayout>
  );
}

function Stat({ label, value, active }: { label: string; value: string; active?: boolean }) {
  return (
    <div className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/60">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`font-display text-sm font-semibold ${active ? "text-primary" : ""} flex items-center gap-2`}>
        {active && <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-glow" />}
        {value}
      </div>
    </div>
  );
}
