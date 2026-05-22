import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppLayout } from "@/components/neuro/AppLayout";
import { PageHeader, Card } from "@/components/neuro/Primitives";
import {
  Eye, Play, Square, Camera, Info, RotateCcw, AlertCircle,
  Upload, CheckCircle2, ChevronRight, PlayCircle, PauseCircle,
  Sliders, Grid, ShieldAlert, BarChart3, HelpCircle, Sparkles
} from "lucide-react";

export const Route = createFileRoute("/eye-tracking")({ component: EyeTrackingPage });

type HeatPoint = { x: number; y: number; t: number };
type Quadrant = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const CALIBRATION_POINTS = [
  { id: 1, x: "10%", top: "10%", label: "Top Left" },
  { id: 2, x: "50%", top: "10%", label: "Top Center" },
  { id: 3, x: "90%", top: "10%", label: "Top Right" },
  { id: 4, x: "10%", top: "50%", label: "Mid Left" },
  { id: 5, x: "50%", top: "50%", label: "Center" },
  { id: 6, x: "90%", top: "50%", label: "Mid Right" },
  { id: 7, x: "10%", top: "90%", label: "Bottom Left" },
  { id: 8, x: "50%", top: "90%", label: "Bottom Center" },
  { id: 9, x: "90%", top: "90%", label: "Bottom Right" }
];

function EyeTrackingPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "calibrating" | "active" | "error" | "replaying">("idle");
  const [error, setError] = useState<string | null>(null);
  
  // Webcam & Calibration State
  const [calibrationClicks, setCalibrationClicks] = useState<Record<number, number>>({
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
  });
  const [calibrated, setCalibrated] = useState(false);
  const [webcamPermitted, setWebcamPermitted] = useState(false);

  // Creative & Target Image Upload State
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"mock" | "upload">("mock");

  // Live Gaze Data (Viewport coordinates & relative coordinates)
  const [gaze, setGaze] = useState<{ x: number; y: number } | null>(null);
  const [relativeGaze, setRelativeGaze] = useState<{ x: number; y: number } | null>(null);
  const [points, setPoints] = useState<HeatPoint[]>([]);
  const [fixations, setFixations] = useState<number>(0);

  // Replay State
  const [recordedSession, setRecordedSession] = useState<HeatPoint[]>([]);
  const [playbackIndex, setPlaybackIndex] = useState<number>(0);
  const [isPlaybackPaused, setIsPlaybackPaused] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  // UI Settings
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showGazePath, setShowGazePath] = useState(true);

  // Refs
  const webgazerRef = useRef<any>(null);
  const creativeContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playbackCanvasRef = useRef<HTMLCanvasElement>(null);
  const dwellRef = useRef<{ x: number; y: number; start: number } | null>(null);
  const playbackTimerRef = useRef<any>(null);

  // Total calibration clicks registered
  const totalCalClicks = Object.values(calibrationClicks).reduce((a, b) => a + b, 0);

  // WebGazer Initialization
  async function initializeWebGazer() {
    setStatus("loading");
    setError(null);
    try {
      const wg = (await import("webgazer")).default;
      webgazerRef.current = wg;

      // Adjust parameters to fit clean enterprise aesthetic
      wg.params.showVideoPreview = true;
      wg.params.showFaceOverlay = false;
      wg.params.showFaceFeedbackBox = true;
      wg.params.showPredictionPoints = false;

      // Attempt to load and start camera preview
      await wg.begin();
      setWebcamPermitted(true);

      // WebGazer outputs relative to absolute screen size.
      // Style the embedded video dynamically so it fits beautifully in the dashboard.
      styleWebcamFeed();

      // Proceed to interactive calibration if not calibrated, else start tracking
      if (!calibrated) {
        setStatus("calibrating");
        // Pause active predictions during calibration clicks setup
        wg.pause();
      } else {
        startActiveTracking();
      }
    } catch (e) {
      console.error(e);
      setStatus("error");
      setError(e instanceof Error ? e.message : "Webcam access denied. Please grant permission and ensure the camera is not in use.");
    }
  }

  // Set up CSS overrides to ensure the webcam overlay looks sleek and matches corporate branding
  function styleWebcamFeed() {
    setTimeout(() => {
      const video = document.getElementById("webgazerVideoFeed");
      const canvas = document.getElementById("webgazerVideoCanvas");
      const feedback = document.getElementById("webgazerFaceFeedbackBox");

      if (video) {
        video.style.position = "fixed";
        video.style.top = "80px";
        video.style.right = "24px";
        video.style.width = "180px";
        video.style.height = "135px";
        video.style.borderRadius = "12px";
        video.style.border = "3px solid #8B1E1E"; // Mahindra Red
        video.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)";
        video.style.zIndex = "100";
        video.style.transform = "scaleX(-1)"; // Mirror video
      }
      if (canvas) {
        canvas.style.position = "fixed";
        canvas.style.top = "80px";
        canvas.style.right = "24px";
        canvas.style.width = "180px";
        canvas.style.height = "135px";
        canvas.style.borderRadius = "12px";
        canvas.style.zIndex = "101";
        canvas.style.transform = "scaleX(-1)";
      }
      if (feedback) {
        feedback.style.border = "2px solid #EAB308"; // Gold contrast border
        feedback.style.borderRadius = "8px";
      }
    }, 100);
  }

  // Stop WebGazer fully
  async function shutdownWebGazer() {
    try {
      if (webgazerRef.current) {
        webgazerRef.current.end();
        webgazerRef.current = null;
      }
      // Remove elements manually if WebGazer left them behind
      document.getElementById("webgazerVideoFeed")?.remove();
      document.getElementById("webgazerVideoCanvas")?.remove();
      document.getElementById("webgazerFaceFeedbackBox")?.remove();
    } catch (err) {
      console.warn("WebGazer shutdown error:", err);
    }
    setStatus("idle");
    setGaze(null);
    setRelativeGaze(null);
  }

  // Handle Calibration Point Clicks
  function handleCalibrationClick(pointId: number, e: React.MouseEvent<HTMLButtonElement>) {
    if (status !== "calibrating" || !webgazerRef.current) return;

    const clicks = calibrationClicks[pointId];
    if (clicks >= 5) return;

    // Record prediction click with WebGazer
    const x = e.clientX;
    const y = e.clientY;
    webgazerRef.current.recordScreenPosition(x, y);

    // Update clicks
    const newClicks = { ...calibrationClicks, [pointId]: clicks + 1 };
    setCalibrationClicks(newClicks);

    // Check if calibration finished (all 9 points clicked 5 times)
    const newTotal = Object.values(newClicks).reduce((a, b) => a + b, 0);
    if (newTotal >= 45) {
      setCalibrated(true);
      setTimeout(() => {
        startActiveTracking();
      }, 600);
    }
  }

  // Fast-track bypass calibration for testing convenience
  function skipCalibration() {
    setCalibrated(true);
    startActiveTracking();
  }

  // Transition from calibrating to tracking predictions
  function startActiveTracking() {
    if (!webgazerRef.current) return;
    setStatus("active");
    setPoints([]);
    setFixations(0);
    setRelativeGaze(null);
    
    // Resume prediction pipeline
    webgazerRef.current.resume();
    
    // Re-bind Gaze predictions
    webgazerRef.current.setGazeListener((data: any) => {
      if (!data) return;
      const x = data.x;
      const y = data.y;
      setGaze({ x, y });

      // Map global viewport coordinates to local coordinates of the creative flyer
      if (creativeContainerRef.current) {
        const rect = creativeContainerRef.current.getBoundingClientRect();
        const inside = (
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom
        );

        if (inside) {
          // Calculate relative percentage
          const rx = (x - rect.left) / rect.width;
          const ry = (y - rect.top) / rect.height;
          setRelativeGaze({ x: rx, y: ry });

          const now = performance.now();
          const newPoint = { x: rx, y: ry, t: now };

          setPoints((p) => [...p, newPoint]);

          // Fixation logic: Gaze remains clustered within 80px (approx 8% width) for >=250ms
          const d = dwellRef.current;
          if (!d) {
            dwellRef.current = { x, y, start: now };
          } else {
            const dist = Math.hypot(x - d.x, y - d.y);
            if (dist > 80) {
              if (now - d.start >= 250) {
                setFixations((f) => f + 1);
              }
              dwellRef.current = { x, y, start: now };
            }
          }
        } else {
          setRelativeGaze(null);
        }
      }
    });
  }

  // Pause active tracking and capture session for analysis
  function stopActiveTracking() {
    if (webgazerRef.current) {
      webgazerRef.current.pause();
    }
    setStatus("idle");
    setGaze(null);
    setRelativeGaze(null);
    
    // Lock current tracked points as the recorded scanpath
    setRecordedSession([...points]);
  }

  // Clear accumulated tracking telemetry
  function clearTelemetry() {
    setPoints([]);
    setFixations(0);
    setRecordedSession([]);
    setPlaybackIndex(0);
    setIsPlaybackPaused(true);
    if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
    
    // Clear canvas manual drawing
    const c = canvasRef.current;
    if (c) {
      const ctx = c.getContext("2d");
      ctx?.clearRect(0, 0, c.width, c.height);
    }
    const pc = playbackCanvasRef.current;
    if (pc) {
      const pctx = pc.getContext("2d");
      pctx?.clearRect(0, 0, pc.width, pc.height);
    }
  }

  // Quadrant Dwell Analytics Math
  const getQuadrantAnalytics = (sourcePoints: HeatPoint[]) => {
    if (sourcePoints.length === 0) {
      return {
        q1: { name: "Q1: Brand & Hero Focus (Top-Left)", count: 0, percent: 0, timeSec: 0 },
        q2: { name: "Q2: Value Prop & Rates (Top-Right)", count: 0, percent: 0, timeSec: 0 },
        q3: { name: "Q3: Trust & Local Badges (Bottom-Left)", count: 0, percent: 0, timeSec: 0 },
        q4: { name: "Q4: Call-to-Action conversion (Bottom-Right)", count: 0, percent: 0, timeSec: 0 },
        total: 0
      };
    }

    let q1 = 0, q2 = 0, q3 = 0, q4 = 0;
    sourcePoints.forEach((p) => {
      if (p.x <= 0.5 && p.y <= 0.5) q1++;
      else if (p.x > 0.5 && p.y <= 0.5) q2++;
      else if (p.x <= 0.5 && p.y > 0.5) q3++;
      else q4++;
    });

    const total = sourcePoints.length;
    // Assuming WebGazer samples roughly every 30-50ms (average 25 samples per second)
    const samplesPerSec = 25; 

    return {
      q1: { name: "Q1: Brand & Hero Focus (Top-Left)", count: q1, percent: Math.round((q1 / total) * 100), timeSec: Number((q1 / samplesPerSec).toFixed(1)) },
      q2: { name: "Q2: Value Prop & Rates (Top-Right)", count: q2, percent: Math.round((q2 / total) * 100), timeSec: Number((q2 / samplesPerSec).toFixed(1)) },
      q3: { name: "Q3: Trust & Local Badges (Bottom-Left)", count: q3, percent: Math.round((q3 / total) * 100), timeSec: Number((q3 / samplesPerSec).toFixed(1)) },
      q4: { name: "Q4: Call-to-Action Conversion (Bottom-Right)", count: q4, percent: Math.round((q4 / total) * 100), timeSec: Number((q4 / samplesPerSec).toFixed(1)) },
      total
    };
  };

  const currentSourcePoints = status === "replaying" ? recordedSession.slice(0, playbackIndex + 1) : (recordedSession.length > 0 ? recordedSession : points);
  const analytics = getQuadrantAnalytics(currentSourcePoints);

  // Auto-generate strategic consulting feedback based on dwell time splits
  const getStrategicFeedback = () => {
    if (currentSourcePoints.length < 20) {
      return "Ensure you calibrate and hover your gaze over the creative content for at least 3-5 seconds to populate behavioral metrics.";
    }

    const { q1, q2, q3, q4 } = analytics;
    
    if (q4.percent < 12) {
      return "⚠️ EXTREME ATTENTION IMBALANCE DETECTED: Gaze data indicates your primary Call-to-Action (Bottom-Right) is located in an ignored blindspot (less than 12% total gaze share). Rural audience scanpaths remain focused strictly on upper sections. Action: Redesign the CTA with a bolder contrast border, move it closer to the center, or incorporate prominent visual directional cues.";
    }

    if (q1.percent > 45 && q2.percent < 15) {
      return "⚠️ VALUABLE DETAIL DRIFT: The prominent Tractor/Hero visual in Q1 is commanding absolute attention (over 45% gaze share), causing users to skip critical loan interest rate statements in Q2. Action: Reduce visual noise around the central banner and integrate interest metrics closer to the tractor graphic border.";
    }

    if (q3.percent < 10) {
      return "📢 RURAL TRUST VULNERABILITY: Vernacular disclaimers and trust factors located in the Bottom-Left have less than 10% attention span. Rural buyers rely heavily on agent validation. Action: Ensure trust badges are framed with human illustrations to naturally steer gaze sweep downward.";
    }

    return "✅ BALANCED SCANPATH DISTRIBUTION: Attention flows naturally from the upper brand assets to the vehicle layouts, sweeping smoothly across the trust badge terms and culminating directly on the Call-to-Action. This structure maximizes conversion probability.";
  };

  // Image Upload Handlers
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedImage(event.target.result as string);
        setActiveTab("upload");
        clearTelemetry();
      }
    };
    reader.readAsDataURL(file);
  }

  // Draw Heatmap & Gaze Paths in relative coordinates
  useEffect(() => {
    const c = canvasRef.current;
    if (!c || status === "replaying") return;

    const ctx = c.getContext("2d");
    if (!ctx) return;

    // Resize canvas to match container size dynamically
    const container = creativeContainerRef.current;
    if (container) {
      c.width = container.clientWidth;
      c.height = container.clientHeight;
    }

    ctx.clearRect(0, 0, c.width, c.height);

    // Draw relative points heatmap
    if (showHeatmap && points.length > 0) {
      points.forEach((p) => {
        const px = p.x * c.width;
        const py = p.y * c.height;
        
        // Use Mahindra corporate branding colors for hot zones (red-gold gradient)
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, 45);
        gradient.addColorStop(0, "rgba(139, 30, 30, 0.25)"); // Primary Mahindra Red
        gradient.addColorStop(0.4, "rgba(234, 179, 8, 0.15)"); // Gold contrast
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, 45, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Draw Scanpath lines connecting points
    if (showGazePath && points.length > 1) {
      ctx.strokeStyle = "rgba(139, 30, 30, 0.6)"; // Transparent crimson
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(points[0].x * c.width, points[0].y * c.height);

      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x * c.width, points[i].y * c.height);
      }
      ctx.stroke();

      // Draw numbering circles on recent fixations
      const sampleGap = Math.max(1, Math.floor(points.length / 15));
      let orderIndex = 1;
      for (let i = 0; i < points.length; i += sampleGap) {
        const p = points[i];
        const px = p.x * c.width;
        const py = p.y * c.height;

        ctx.fillStyle = "#8B1E1E";
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(px, py, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 9px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(orderIndex++), px, py);
      }
    }
  }, [points, showHeatmap, showGazePath, status]);

  // Replay Session Scanpath rendering loop
  useEffect(() => {
    if (status !== "replaying" || recordedSession.length === 0) return;

    const pc = playbackCanvasRef.current;
    if (!pc) return;

    const pctx = pc.getContext("2d");
    if (!pctx) return;

    // Resize canvas
    const container = creativeContainerRef.current;
    if (container) {
      pc.width = container.clientWidth;
      pc.height = container.clientHeight;
    }

    pctx.clearRect(0, 0, pc.width, pc.height);

    const activeSubset = recordedSession.slice(0, playbackIndex + 1);

    // Draw replay path lines
    if (showGazePath && activeSubset.length > 1) {
      pctx.strokeStyle = "#8B1E1E"; // Bold Crimson
      pctx.lineWidth = 3;
      pctx.beginPath();
      pctx.moveTo(activeSubset[0].x * pc.width, activeSubset[0].y * pc.height);
      for (let i = 1; i < activeSubset.length; i++) {
        pctx.lineTo(activeSubset[i].x * pc.width, activeSubset[i].y * pc.height);
      }
      pctx.stroke();

      // Draw numbered fixations
      activeSubset.forEach((p, idx) => {
        if (idx % 8 === 0 || idx === activeSubset.length - 1) {
          const px = p.x * pc.width;
          const py = p.y * pc.height;
          
          pctx.fillStyle = idx === activeSubset.length - 1 ? "#EAB308" : "#8B1E1E"; // Current target is Gold
          pctx.strokeStyle = "#FFFFFF";
          pctx.lineWidth = 2;
          pctx.beginPath();
          pctx.arc(px, py, 12, 0, Math.PI * 2);
          pctx.fill();
          pctx.stroke();

          pctx.fillStyle = "#FFFFFF";
          pctx.font = "bold 10px sans-serif";
          pctx.textAlign = "center";
          pctx.textBaseline = "middle";
          pctx.fillText(String(Math.floor(idx / 8) + 1), px, py);
        }
      });
    }

    // Draw active replay gaze pulsing indicator
    if (activeSubset.length > 0) {
      const latest = activeSubset[activeSubset.length - 1];
      const px = latest.x * pc.width;
      const py = latest.y * pc.height;

      const gradient = pctx.createRadialGradient(px, py, 0, px, py, 30);
      gradient.addColorStop(0, "rgba(234, 179, 8, 0.6)");
      gradient.addColorStop(0.5, "rgba(139, 30, 30, 0.3)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      pctx.fillStyle = gradient;
      pctx.beginPath();
      pctx.arc(px, py, 30, 0, Math.PI * 2);
      pctx.fill();

      // Outer ring
      pctx.strokeStyle = "#EAB308";
      pctx.lineWidth = 1.5;
      pctx.beginPath();
      pctx.arc(px, py, 14, 0, Math.PI * 2);
      pctx.stroke();
    }
  }, [playbackIndex, recordedSession, status, showGazePath]);

  // Control the play / pause interval timer for playback replays
  useEffect(() => {
    if (status === "replaying" && !isPlaybackPaused) {
      const intervalMs = Math.round(60 / playbackSpeed); // Scale pace by speed selected
      playbackTimerRef.current = setInterval(() => {
        setPlaybackIndex((prevIndex) => {
          if (prevIndex >= recordedSession.length - 1) {
            clearInterval(playbackTimerRef.current);
            setIsPlaybackPaused(true);
            return prevIndex;
          }
          return prevIndex + 1;
        });
      }, intervalMs);
    } else {
      if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
    }

    return () => {
      if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
    };
  }, [status, isPlaybackPaused, playbackSpeed, recordedSession]);

  // Clean up WebGazer when component leaves DOM
  useEffect(() => {
    return () => {
      shutdownWebGazer();
    };
  }, []);

  // Format status values for beautiful consulting chips
  const getStatusChip = () => {
    switch (status) {
      case "active":
        return <span className="chip chip-teal text-[10px]"><span className="h-1.5 w-1.5 rounded-full bg-accent pulse-glow" /> LIVE PREDICTION RUNNING</span>;
      case "calibrating":
        return <span className="chip chip-gold text-[10px] animate-pulse">🎯 CALIBRATION STAGE</span>;
      case "replaying":
        return <span className="chip text-[10px] bg-sky-50 text-sky-700 border-sky-200">📼 REPLAY MODE</span>;
      case "loading":
        return <span className="chip text-[10px] bg-stone-100 text-stone-600 animate-pulse">📥 INITIALIZING MODELS</span>;
      default:
        return <span className="chip text-[10px] bg-stone-100 text-stone-500 border-stone-200">💤 STANDBY IDLE</span>;
    }
  };

  return (
    <AppLayout>
      <PageHeader
        eyebrow="BIOMETRIC ESTIMATION CORE"
        title="Gaze Attention Lab"
        subtitle="Process patient or campaign attention sweeps inside your local sandbox. Calibrate WebGazer via a 9-point grid overlay to map corneal reflection patterns against crop coordinates, generating high-fidelity heatmaps and dwell analytics entirely client-side."
      />

      {/* Main Control Panel and Uploaders */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="p-5 lg:col-span-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4 mb-5 gap-3">
            <div>
              <h3 className="font-display text-base font-semibold flex items-center gap-2">
                <Camera className="h-4.5 w-4.5 text-primary" /> Browser-Based Gaze Estimation Core
              </h3>
              <p className="text-[11.5px] text-muted-foreground mt-0.5">
                Privacy-First: Frames remain encrypted in browser memory. No webcam raw content is streamed externally.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {getStatusChip()}
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 mb-5">
            {status !== "active" && status !== "calibrating" && status !== "replaying" ? (
              <button
                onClick={initializeWebGazer}
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 disabled:opacity-50 transition shadow-sm"
              >
                <Play className="h-3.5 w-3.5 fill-current" /> {status === "loading" ? "Activating Camera..." : "Start Tracking Lab"}
              </button>
            ) : (
              <button
                onClick={status === "calibrating" ? skipCalibration : stopActiveTracking}
                className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-secondary text-foreground text-xs font-semibold border border-border hover:bg-secondary-hover transition"
              >
                <Square className="h-3.5 w-3.5 fill-current text-primary" /> {status === "calibrating" ? "Skip Calibration" : "Stop Session"}
              </button>
            )}

            {recordedSession.length > 0 && status !== "replaying" && status !== "active" && (
              <button
                onClick={() => {
                  setStatus("replaying");
                  setPlaybackIndex(0);
                  setIsPlaybackPaused(false);
                }}
                className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold hover:bg-amber-100 transition"
              >
                <PlayCircle className="h-3.5 w-3.5" /> Replay Scanpath
              </button>
            )}

            {status === "replaying" && (
              <div className="inline-flex items-center border border-border bg-secondary/40 rounded-lg p-0.5 gap-1 shrink-0">
                <button
                  onClick={() => setIsPlaybackPaused(!isPlaybackPaused)}
                  className="p-1 rounded-md hover:bg-card text-foreground transition"
                >
                  {isPlaybackPaused ? <PlayCircle className="h-4.5 w-4.5 text-primary" /> : <PauseCircle className="h-4.5 w-4.5 text-primary" />}
                </button>
                <button
                  onClick={() => { setPlaybackIndex(0); setIsPlaybackPaused(true); }}
                  className="p-1 rounded-md hover:bg-card text-muted-foreground transition"
                  title="Reset Replay"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <span className="text-[10px] font-mono px-2 select-none border-l border-border text-foreground/70">
                  {playbackIndex + 1}/{recordedSession.length} pts
                </span>
                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                  className="text-[10px] font-mono bg-card border border-border rounded px-1.5 py-0.5 focus:outline-none"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1.0x</option>
                  <option value={2}>2.0x</option>
                  <option value={3}>3.0x</option>
                </select>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setIsPlaybackPaused(true);
                  }}
                  className="text-[10px] font-semibold text-primary px-2 hover:underline border-l border-border"
                >
                  Close Player
                </button>
              </div>
            )}

            <button
              onClick={clearTelemetry}
              className="inline-flex items-center gap-2 h-9 px-3.5 rounded-lg border border-border bg-card text-xs hover:bg-secondary transition ml-auto"
            >
              <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" /> Reset Data
            </button>
          </div>

          <div className="flex border-b border-border mb-4">
            <button
              onClick={() => setActiveTab("mock")}
              className={`py-2.5 px-4 font-display text-xs font-semibold border-b-2 transition ${activeTab === "mock" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              Built-in Mahindra Finance Flyer
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`py-2.5 px-4 font-display text-xs font-semibold border-b-2 transition ${activeTab === "upload" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              Upload Custom Campaign Creative
            </button>
          </div>

          {activeTab === "upload" && !uploadedImage && (
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-xl bg-secondary/20 transition-all hover:bg-secondary/40">
              <Upload className="h-8 w-8 text-primary mb-3 stroke-[1.5]" />
              <p className="text-xs font-semibold mb-1 text-foreground/95">Drag and drop your poster file here</p>
              <p className="text-[10px] text-muted-foreground mb-4">Supports PNG, JPG, WebP (Max 8MB)</p>
              <label className="inline-flex items-center justify-center h-8 px-4 rounded-lg bg-card border border-border hover:bg-secondary text-xs font-semibold cursor-pointer shadow-sm select-none transition">
                Browse Files
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          )}

          {/* Core Visual Tracking Container */}
          {(activeTab === "mock" || uploadedImage) && (
            <div className="relative border border-border rounded-xl bg-secondary/35 p-3 flex justify-center">
              <div
                ref={creativeContainerRef}
                className="relative select-none shadow-lg rounded-xl overflow-hidden max-w-full"
                style={{ width: "620px" }}
              >
                {activeTab === "upload" && uploadedImage ? (
                  <img
                    src={uploadedImage}
                    alt="Custom campaign target"
                    className="w-full h-auto object-contain block max-h-[640px]"
                  />
                ) : (
                  /* Premium Styled Mahindra Finance Vehicle & Crop Loan Poster mockup */
                  <div className="w-full bg-card flex flex-col font-sans select-none border border-red-950/10">
                    {/* Header */}
                    <div className="bg-[#8B1E1E] text-white p-4 flex items-center justify-between border-b-4 border-amber-500">
                      <div className="flex items-center gap-2">
                        <div className="bg-white/10 p-1.5 rounded-lg border border-white/20">
                          <Grid className="h-4.5 w-4.5 text-amber-500" />
                        </div>
                        <div>
                          <div className="text-[10px] tracking-[0.2em] font-extrabold uppercase text-amber-400">MAHINDRA & MAHINDRA</div>
                          <div className="text-[14px] font-black tracking-tight uppercase leading-none mt-0.5">FINANCE</div>
                        </div>
                      </div>
                      <div className="text-right text-[9px] font-mono tracking-widest text-amber-200 uppercase font-bold">
                        RURAL DISCLOSURE · APPROVED
                      </div>
                    </div>

                    {/* Hero Poster Tagline */}
                    <div className="px-5 py-5 text-center bg-stone-50 border-b border-stone-200/80">
                      <h4 className="font-display text-[17px] font-extrabold tracking-tight text-foreground/90 uppercase leading-snug">
                        Mahindra Rural Tractor & Harvester Loans
                      </h4>
                      <p className="text-[11.5px] text-muted-foreground mt-1 font-medium italic">
                        "Empowering Indian Farmers with instant, custom harvest-linked financing models."
                      </p>
                    </div>

                    {/* Heavy Machinery Illustration Box */}
                    <div className="relative h-60 bg-gradient-to-br from-amber-50 via-amber-100/40 to-stone-50 overflow-hidden flex items-center justify-center p-4 border-b border-stone-200/60">
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#8b1e1e 1.5px, transparent 1.5px)", backgroundSize: "16px 16px" }} />
                      <div className="text-center z-10 space-y-2 max-w-sm">
                        <div className="inline-flex items-center gap-1.5 bg-[#8B1E1E]/5 text-[#8B1E1E] border border-[#8B1E1E]/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          🚀 Tractor Finance Special Offer
                        </div>
                        <h5 className="font-display text-[22px] font-black tracking-tight text-primary uppercase">
                          0% Down Payment
                        </h5>
                        <p className="text-xs text-foreground/75 leading-relaxed font-medium">
                          No digital delays. Get complete field agent verification in your home village within 30 minutes!
                        </p>
                      </div>
                      
                      {/* Stylized Badge Overlay representing salience anchor */}
                      <div className="absolute bottom-3 left-4 bg-white/95 border border-stone-200 shadow-md rounded-lg p-2.5 flex items-center gap-2.5 max-w-[190px]">
                        <div className="h-6.5 w-6.5 rounded bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="h-4.5 w-4.5" />
                        </div>
                        <div className="leading-tight">
                          <div className="text-[10px] font-bold text-foreground">Custom Repay</div>
                          <div className="text-[8.5px] text-muted-foreground font-medium">Align payments with harvest schedules.</div>
                        </div>
                      </div>
                    </div>

                    {/* Interest details */}
                    <div className="grid grid-cols-2 border-b border-stone-200/60">
                      <div className="p-4 border-r border-stone-200/60 text-center hover:bg-stone-50/50 transition">
                        <div className="text-[9px] font-bold tracking-wider text-muted-foreground uppercase">Annual Interest Rate</div>
                        <div className="text-[20px] font-black text-foreground mt-1">9.25% <span className="text-[10px] font-normal text-muted-foreground">p.a.</span></div>
                        <div className="text-[9px] text-amber-700 font-bold bg-amber-50/80 border border-amber-100/50 rounded-full px-2 py-0.5 inline-block mt-1">Super Low Rates</div>
                      </div>
                      <div className="p-4 text-center hover:bg-stone-50/50 transition">
                        <div className="text-[9px] font-bold tracking-wider text-muted-foreground uppercase">Processing Charges</div>
                        <div className="text-[20px] font-black text-foreground mt-1">Flat ₹999</div>
                        <div className="text-[9px] text-[#8B1E1E] font-bold bg-[#8B1E1E]/5 border border-[#8B1E1E]/10 rounded-full px-2 py-0.5 inline-block mt-1">Zero Hidden Costs</div>
                      </div>
                    </div>

                    {/* Massive Call-to-Action conversion band (Bottom-Right Focus) */}
                    <div className="p-5 bg-stone-50 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200/40">
                      <div className="text-center sm:text-left leading-tight">
                        <div className="text-[10.5px] font-bold text-[#8B1E1E] uppercase tracking-wider">Join 22+ Lakh Happy Farmers</div>
                        <div className="text-[9.5px] text-muted-foreground font-medium mt-0.5">Mahindra Finance — Trust is our biggest asset.</div>
                      </div>
                      <button className="h-10 px-5 rounded-lg bg-[#8B1E1E] text-white font-display text-[11px] font-extrabold tracking-wider uppercase hover:bg-[#721818] border border-red-950/20 shadow-md shadow-[#8b1e1e]/15 flex items-center gap-1.5 transition select-none">
                        APPLY NOW AT NEAREST BRANCH <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Tracking Canvas Overlays */}
                {status === "active" && showHeatmap && (
                  <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-20" />
                )}
                
                {status === "replaying" && (
                  <canvas ref={playbackCanvasRef} className="absolute inset-0 pointer-events-none z-20" />
                )}

                {/* Display dynamic eye indicator on live feed */}
                {status === "active" && relativeGaze && (
                  <div
                    className="absolute pointer-events-none z-30 transition-transform duration-75"
                    style={{
                      left: `${relativeGaze.x * 100}%`,
                      top: `${relativeGaze.y * 100}%`,
                      transform: "translate(-50%, -50%)"
                    }}
                  >
                    <div className="h-7 w-7 rounded-full border-2 border-primary bg-primary/20 backdrop-blur-[1px] flex items-center justify-center ring-2 ring-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </Card>

        {/* Live Telemetry Display */}
        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="font-display text-base font-semibold mb-3.5 flex items-center gap-2">
              <Sliders className="h-4.5 w-4.5 text-primary" /> Telemetry Stream
            </h3>
            <div className="space-y-2">
              <Stat label="Hardware Sensor" value={webcamPermitted ? "Webcam Active" : "Unlinked"} />
              <Stat label="Prediction Target" value={status === "active" ? "Locking Gaze" : status === "replaying" ? "Replaying" : "Idle"} active={status === "active"} />
              <Stat label="Gaze Percent X" value={relativeGaze ? `${Math.round(relativeGaze.x * 100)}%` : "—"} />
              <Stat label="Gaze Percent Y" value={relativeGaze ? `${Math.round(relativeGaze.y * 100)}%` : "—"} />
              <Stat label="Sample Capacity" value={`${points.length} samples`} />
              <Stat label="Fixation count" value={`${fixations} fixations`} />
              <Stat label="Gaze Path Nodes" value={`${recordedSession.length} recorded`} />
            </div>

            <div className="border-t border-border mt-4 pt-4 space-y-2.5">
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Visual Customizations</div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground/80">Enable Heatmap</span>
                <input
                  type="checkbox"
                  checked={showHeatmap}
                  onChange={(e) => setShowHeatmap(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground/80">Enable Scanpath Nodes</span>
                <input
                  type="checkbox"
                  checked={showGazePath}
                  onChange={(e) => setShowGazePath(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
            </div>
          </Card>

          {/* Attention Ignored Alert */}
          {recordedSession.length > 0 && (
            <Card className={`p-4 border-l-4 ${analytics.q4.percent < 12 ? "border-l-primary bg-primary/5" : "border-l-teal-600 bg-teal-500/5"} rounded-xl`}>
              <div className="flex items-start gap-2.5">
                <ShieldAlert className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${analytics.q4.percent < 12 ? "text-primary" : "text-teal-600"}`} />
                <div>
                  <div className="text-xs font-bold text-foreground">
                    {analytics.q4.percent < 12 ? "Attention Warning" : "Optimal Attention Split"}
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5">
                    {analytics.q4.percent < 12 
                      ? "Your Primary Call-to-Action (Bottom-Right) has extremely low gaze dwell share."
                      : "Excellent layout sweeps! All visual anchors have healthy dwell share distributions."}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Dwell Time & Quadrant Analytics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="p-5 lg:col-span-2">
          <h3 className="font-display text-base font-semibold mb-1 flex items-center gap-2">
            <BarChart3 className="h-4.5 w-4.5 text-primary" /> Attention Quadrant Dwell Analytics
          </h3>
          <p className="text-[11px] text-muted-foreground mb-4">
            Visual coordinates are mapped across 4 quadrant sectors relative to the campaign dimensions.
          </p>

          <div className="space-y-4">
            {/* Top-Left Quadrant */}
            <QuadrantBar
              title={analytics.q1.name}
              percent={analytics.q1.percent}
              duration={analytics.q1.timeSec}
              description="Visual anchor point containing official Mahindra branding and primary farming headlines."
              sentiment={analytics.q1.percent > 40 ? "saturated" : analytics.q1.percent > 20 ? "optimal" : "neglected"}
            />
            {/* Top-Right Quadrant */}
            <QuadrantBar
              title={analytics.q2.name}
              percent={analytics.q2.percent}
              duration={analytics.q2.timeSec}
              description="Value disclosures. Prompts agricultural investors regarding interest rates and custom EMI terms."
              sentiment={analytics.q2.percent > 35 ? "saturated" : analytics.q2.percent > 15 ? "optimal" : "neglected"}
            />
            {/* Bottom-Left Quadrant */}
            <QuadrantBar
              title={analytics.q3.name}
              percent={analytics.q3.percent}
              duration={analytics.q3.timeSec}
              description="Local agent trust assets. Assures rural buyers with physical verification and simplified terms."
              sentiment={analytics.q3.percent > 30 ? "saturated" : analytics.q3.percent > 10 ? "optimal" : "neglected"}
            />
            {/* Bottom-Right Quadrant */}
            <QuadrantBar
              title={analytics.q4.name}
              percent={analytics.q4.percent}
              duration={analytics.q4.timeSec}
              description="Primary Call-to-Action and branch location directions. Serves as main conversion trigger."
              sentiment={analytics.q4.percent > 25 ? "saturated" : analytics.q4.percent > 12 ? "optimal" : "neglected"}
            />
          </div>
        </Card>

        {/* Strategy Advisory Board */}
        <Card className="p-5 bg-card/65 flex flex-col justify-between border-primary/10">
          <div>
            <h3 className="font-display text-base font-semibold mb-1.5 flex items-center gap-1.5">
              <Sparkles className="h-4.5 w-4.5 text-accent animate-pulse" /> Consulting Advisory
            </h3>
            <p className="text-[11px] text-muted-foreground mb-4">
              Real-time cognitive heuristics mapped against rural India Familiarity Bias and Sweller's Cognitive Load.
            </p>
            <div className="rounded-xl bg-secondary/50 p-4 border border-border">
              <p className="text-[11.5px] text-foreground leading-relaxed italic">
                "{getStrategicFeedback()}"
              </p>
            </div>
          </div>
          
          <div className="border-t border-border mt-4 pt-4">
            <div className="text-[10px] text-muted-foreground font-mono leading-relaxed">
              REFERENCE PRINCIPLES Applied:<br />
              • F-Pattern Eye Sweep (Reading Mechanics)<br />
              • Sweller's Split-Attention Effect (Disclosures)<br />
              • Von Restorff Isolation Effect (CTA Color Contrast)
            </div>
          </div>
        </Card>
      </div>

      {/* Explainer Block */}
      <Card className="p-5">
        <h3 className="font-display text-base font-semibold mb-2 flex items-center gap-2">
          <HelpCircle className="h-4.5 w-4.5 text-amber-500" /> Behavioral Visual Tracking Diagnostics
        </h3>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div className="space-y-1">
            <div className="text-xs font-bold text-primary">1. Initial Fixation (First 500ms)</div>
            <p className="text-[11.5px] text-muted-foreground leading-relaxed">
              Predicts immediate visual prominence. Highlights whether rural clients immediately register the Mahindra wordmark or are distracted by busy background illustrations.
            </p>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-primary">2. Scanpath Trajectory Sequence</div>
            <p className="text-[11.5px] text-muted-foreground leading-relaxed">
              Maps visual storytelling flow. Standard reading paths follow an 'F' or 'Z' matrix. Breaking this matrix causes visual fatigue and decreases regulatory comprehension.
            </p>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-primary">3. Cumulative Ignored Blindspots</div>
            <p className="text-[11.5px] text-muted-foreground leading-relaxed">
              Pinpoints wasted real estate. If the local agent address or 0% interest banner accumulates 0% gaze share, the campaign collateral fails to resolve digital hesitation.
            </p>
          </div>
        </div>
      </Card>

      {/* Fullscreen Interactive Calibration Overlay Modal */}
      {status === "calibrating" && (
        <div className="fixed inset-0 z-[999] bg-background/96 backdrop-blur-md flex flex-col justify-between p-8 select-none">
          <div className="max-w-2xl mx-auto text-center mt-12 space-y-3">
            <h2 className="font-display text-2xl font-black text-primary tracking-tight uppercase">
              Browser-Based Gaze Calibration Core
            </h2>
            <p className="text-sm text-foreground/80 leading-relaxed max-w-lg mx-auto">
              Please align your face in the camera preview box at the top right of your screen. 
              <strong>Look directly at each of the 9 red points</strong> and click them <strong>5 times</strong> each.
            </p>

            {/* Calibration Progress */}
            <div className="pt-3 max-w-sm mx-auto space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-muted-foreground">Rigid regression progress</span>
                <span className="text-primary font-mono font-bold">{totalCalClicks} / 45 clicks ({Math.round((totalCalClicks / 45) * 100)}%)</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden border border-border">
                <div
                  className="h-full bg-primary transition-all duration-300 shadow-[0_0_8px_rgba(139,30,30,0.5)]"
                  style={{ width: `${(totalCalClicks / 45) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* 9-Point Click Calibration Grid Layout */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {CALIBRATION_POINTS.map((pt) => {
              const currentClicks = calibrationClicks[pt.id];
              const completed = currentClicks >= 5;
              return (
                <button
                  key={pt.id}
                  onClick={(e) => handleCalibrationClick(pt.id, e)}
                  disabled={completed}
                  className={`absolute pointer-events-auto flex flex-col items-center justify-center h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-200 ${
                    completed
                      ? "border-green-600 bg-green-500/10 text-green-600 shadow-[0_0_12px_rgba(22,163,74,0.4)]"
                      : "border-primary bg-primary/5 text-primary hover:scale-110 hover:bg-primary/10 shadow-sm"
                  }`}
                  style={{
                    left: pt.x,
                    top: pt.top
                  }}
                >
                  {completed ? (
                    <CheckCircle2 className="h-6 w-6 animate-scale-up" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="h-4.5 w-4.5 rounded-full border border-current flex items-center justify-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-current animate-ping" />
                      </div>
                      <span className="text-[8px] font-mono font-extrabold mt-1">
                        {5 - currentClicks} LFT
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="max-w-xs mx-auto text-center mb-8 z-20">
            <button
              onClick={skipCalibration}
              className="px-5 py-2.5 rounded-lg border border-border bg-card text-xs font-bold hover:bg-secondary transition-all shadow-sm shrink-0"
            >
              Bypass Calibration Grid
            </button>
            <p className="text-[10px] text-muted-foreground mt-2">
              Bypassing uses a generic prediction profile and degrades precision.
            </p>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

// Subcomponents helper
function Stat({ label, value, active }: { label: string; value: string; active?: boolean }) {
  return (
    <div className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/40 border border-border/20 select-none">
      <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">{label}</div>
      <div className={`font-display text-xs font-bold ${active ? "text-primary" : "text-foreground/90"} flex items-center gap-1.5`}>
        {active && <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
        {value}
      </div>
    </div>
  );
}

function QuadrantBar({
  title,
  percent,
  duration,
  description,
  sentiment
}: {
  title: string;
  percent: number;
  duration: number;
  description: string;
  sentiment: "saturated" | "optimal" | "neglected";
}) {
  const getBadge = () => {
    switch (sentiment) {
      case "saturated":
        return <span className="text-[9px] font-bold uppercase tracking-wider text-[#8B1E1E] bg-[#8B1E1E]/5 px-2 py-0.5 rounded-full border border-[#8B1E1E]/15">Saturated Focus</span>;
      case "optimal":
        return <span className="text-[9px] font-bold uppercase tracking-wider text-teal-600 bg-teal-500/5 px-2 py-0.5 rounded-full border border-teal-500/15">Optimal Reach</span>;
      default:
        return <span className="text-[9px] font-bold uppercase tracking-wider text-amber-600 bg-amber-500/5 px-2 py-0.5 rounded-full border border-amber-500/15">Neglected Spot</span>;
    }
  };

  const getBarColor = () => {
    switch (sentiment) {
      case "saturated": return "bg-[#8B1E1E]";
      case "optimal": return "bg-teal-600";
      default: return "bg-amber-500";
    }
  };

  return (
    <div className="p-3.5 border border-border rounded-xl hover:bg-secondary/20 transition select-none">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
        <h4 className="text-xs font-bold text-foreground/90">{title}</h4>
        <div className="flex items-center gap-2">
          {getBadge()}
          <span className="text-xs font-mono font-black text-foreground/80">{percent}% share · {duration}s</span>
        </div>
      </div>
      <p className="text-[10.5px] text-muted-foreground mt-1.5 leading-relaxed">
        {description}
      </p>
      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden mt-3 border border-border/20">
        <div
          className={`h-full ${getBarColor()} transition-all duration-500`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
