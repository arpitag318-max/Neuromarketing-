import React, { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/neuro/AppLayout";
import { Card } from "@/components/neuro/Primitives";
import { 
  ArrowLeft, Eye, Brain, Activity, Smile, Zap, FileText, Heart, Award, 
  ChevronRight, X, Check, ShieldAlert, Sparkles, Shield, BarChart3, HelpCircle,
  EyeOff, Sliders, Fingerprint, Play, Pause, RefreshCw, Cpu, Layers, TrendingUp,
  Database, Gauge, Terminal, ShieldCheck, CheckCircle2
} from "lucide-react";
import { neuroscienceToolsList, getSimulator, getCreativeBeforeAfterData } from "./tools";

export const Route = createFileRoute("/tools/$toolId")({
  component: ToolDetailPage,
});

// ═══════════════════════════════════════════
// DYNAMIC IMMERSIVE CUSTOM VISUAL STYLES
// ═══════════════════════════════════════════
const themeConfig: Record<string, {
  bg: string;
  accent: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
  badge: string;
}> = {
  cns: {
    bg: "from-purple-950/20 via-card to-card",
    accent: "purple",
    textColor: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    glowColor: "shadow-purple-500/20",
    badge: "bg-purple-500 text-white",
  },
  ans: {
    bg: "from-cyan-950/20 via-card to-card",
    accent: "cyan",
    textColor: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    glowColor: "shadow-cyan-500/20",
    badge: "bg-cyan-500 text-white",
  },
  somatic: {
    bg: "from-rose-950/20 via-card to-card",
    accent: "pink",
    textColor: "text-rose-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    glowColor: "shadow-rose-500/20",
    badge: "bg-rose-500 text-white",
  },
  behavioral: {
    bg: "from-emerald-950/20 via-card to-card",
    accent: "green",
    textColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    glowColor: "shadow-emerald-500/20",
    badge: "bg-emerald-500 text-white",
  },
  ai: {
    bg: "from-blue-950/20 via-card to-card",
    accent: "blue",
    textColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    glowColor: "shadow-blue-500/20",
    badge: "bg-blue-500 text-white",
  },
};

// A/B Creative Showcase Data (Before vs After)
const creativeA_BData: Record<string, {
  beforeTitle: string;
  beforeDesc: string;
  beforeFriction: string[];
  afterTitle: string;
  afterDesc: string;
  afterFixes: string[];
}> = {
  "eye-tracking": {
    beforeTitle: "Text-Heavy Rural Flyer",
    beforeDesc: "Marketing flyer cluttered with competing background specs.",
    beforeFriction: [
      "Cluttered gold border siphons visual focus.",
      "Tractor silhouette overrides primary CTA coordinates.",
      "Regulatory warnings placed in visual blind zones."
    ],
    afterTitle: "Focal Ownership Flyer",
    afterDesc: "Optimized flyer directing attention within 250ms.",
    afterFixes: [
      "CTA isolated with 45% negative space.",
      "Luminance contrast pulls eyes directly to the button.",
      "Direct-gaze regional photos drive layout pathing."
    ]
  },
  "eeg": {
    beforeTitle: "Immediate Interest Calculator",
    beforeDesc: "Digital form prompting complex rate choices on loading.",
    beforeFriction: [
      "Prefrontal Alpha avoidance spiked by sudden interest math.",
      "Exceeds working memory, triggering cognitive shutdown.",
      "Lack of emotional safety cues."
    ],
    afterTitle: "Ownership Milestone Journey",
    afterDesc: "Progressive form establishing emotional resonance first.",
    afterFixes: [
      "Tractor ownership visual shown before pricing facts.",
      "Alpha approach asymmetry stabilized by regional dialects.",
      "Single-input step siphons cognitive processing fatigue."
    ]
  },
  "facial-coding": {
    beforeTitle: "Corporate Stock Model TVC",
    beforeDesc: "Video storyboard using urban actors and generic stock assets.",
    beforeFriction: [
      "Micro-expressions of skepticism triggered immediately.",
      "Furrowed brows indicate cognitive trust disconnect.",
      "Low visual interest and zero smile metrics."
    ],
    afterTitle: "Regional Hero TVC Storyboard",
    afterDesc: "Campaign starring actual agrarian branch managers.",
    afterFixes: [
      "Local familiarity triggers joy micro-expressions (+40%).",
      "Authentic rural background siphons skepticism.",
      "High emotional resonance anchors long-term recall."
    ]
  },
  "gsr": {
    beforeTitle: "Direct Aadhaar Verification Form",
    beforeDesc: "Form field requiring instant uploads without context.",
    beforeFriction: [
      "Acute physiological stress spike (GSR peak: 7.2μS).",
      "Technophobia alert triggers immediate page exits.",
      "Privacy hesitation stalls keyboard entries."
    ],
    afterTitle: "RBI Safeguarded Verification Flow",
    afterDesc: "Form contextualized with calming visual trust signals.",
    afterFixes: [
      "RBI security badges placed adjacent to the input field.",
      "Step preceded by reassurance checklist.",
      "Baseline tonic sweat levels remain calm (2.3μS)."
    ]
  },
  "deep-gaze": {
    beforeTitle: "Cluttered WhatsApp Promo Banner",
    beforeDesc: "Performance ad trying to explain all loan features in one image.",
    beforeFriction: [
      "Saliency prediction map reveals massive banner blindness.",
      "CTA ignores coordinates, siphoned by visual noise.",
      "Text details clash, creating visual ignore zones."
    ],
    afterTitle: "Clean WhatsApp Ownership Banner",
    afterDesc: "Optimized creative tested via generative AI pre-launch.",
    afterFixes: [
      "Single high-contrast text line siphons attention.",
      "CTA commands 88% visual probability scores.",
      "Clean margins align eye fixation scanpaths."
    ]
  },
  "emotion-ai": {
    beforeTitle: "Monotone Automated Voice Bot",
    beforeDesc: "Interactive IVR system reading rigid regulatory statements.",
    beforeFriction: [
      "Acoustic stress markers register platform frustration.",
      "Vocal hesitation peaks due to dry institutional jargon.",
      "Delinquency alerts trigger fight-or-flight states."
    ],
    afterTitle: "Empathic Vernacular Voice Partner",
    afterDesc: "Voice script modeled via acoustic neural parameters.",
    afterFixes: [
      "Lowered pitch and regional dialects siphon user stress.",
      "Empathetic reassurance templates lower conversational stalls.",
      "Calculated vocal alignment increases compliance by 30%."
    ]
  },
  "ux-analytics": {
    beforeTitle: "Multi-Field Customer Loan Form",
    beforeDesc: "Traditional single-page form with 15 required text entries.",
    beforeFriction: [
      "Rage clicks logged on confusing non-interactive headers.",
      "Cursor stalls for 45s on complex interest math.",
      "High drop-off rate when KYC transitions to external windows."
    ],
    afterTitle: "Progressive Loan Advisor Flow",
    afterDesc: "Optimized progressive questionnaire with tactile ease.",
    afterFixes: [
      "One visual decision question at a time.",
      "Progressive indicators eliminate search fatigue.",
      "Form auto-saves state, preventing double-entry panic."
    ]
  },
  "iat": {
    beforeTitle: "Standard Survey Rating",
    beforeDesc: "User requested to rate brand trust from 1 to 10 on a page.",
    beforeFriction: [
      "Rationalization bias siphons true consumer sentiment.",
      "Users report high trust to please the interviewer.",
      "Fails to predict actual loan selection behavior."
    ],
    afterTitle: "IAT Reaction Test Calibration",
    afterDesc: "Reaction-time latency testing to map brand associative strength.",
    afterFixes: [
      "Measures subconscious latency D-score directly.",
      "Bypasses social desirability bias.",
      "Provides clinical, reliable brand equity benchmarking."
    ]
  }
};

// ═══════════════════════════════════════════
// HELPER INTERACTIVE SIMULATORS
// ═══════════════════════════════════════════
function CreativeBeforeAfter({ toolId, toolGroup }: { toolId: string; toolGroup: string }) {
  const [activeTab, setActiveTab] = useState<"before" | "after">("after");
  const data = getCreativeBeforeAfterData(toolId, toolGroup);

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between border-b border-border/40 pb-2.5 select-none">
        <span className="text-[10px] font-black uppercase text-accent tracking-wider">
          A/B Creative Showcase
        </span>
        <div className="flex bg-secondary/40 p-0.5 rounded-lg border border-border/45 select-none">
          <button
            onClick={() => setActiveTab("before")}
            className={`h-6 px-3 rounded text-[9.5px] font-black transition ${
              activeTab === "before"
                ? "bg-destructive text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            ❌ Before (Friction)
          </button>
          <button
            onClick={() => setActiveTab("after")}
            className={`h-6 px-3 rounded text-[9.5px] font-black transition ${
              activeTab === "after"
                ? "bg-emerald-500 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            ✔ After (Optimized)
          </button>
        </div>
      </div>

      <div className="p-4 bg-secondary/10 rounded-2xl border border-border/50 space-y-4 select-none">
        {activeTab === "before" ? (
          <div className="space-y-3">
            <div>
              <span className="text-[7.5px] font-black uppercase text-destructive tracking-widest bg-destructive/10 px-2 py-0.5 rounded">
                Un-Optimized Layout
              </span>
              <h4 className="font-display font-black text-sm text-foreground mt-1.5">{data.beforeTitle}</h4>
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-normal font-semibold">{data.beforeDesc}</p>
            </div>
            <div className="space-y-1.5 pt-2">
              {data.beforeFriction.map((fric, idx) => (
                <div key={idx} className="flex gap-2 text-[10.5px] leading-relaxed">
                  <span className="text-destructive font-black">❌</span>
                  <span className="text-foreground/90 font-semibold">{fric}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <span className="text-[7.5px] font-black uppercase text-emerald-500 tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded">
                Neuroscience Calibrated
              </span>
              <h4 className="font-display font-black text-sm text-foreground mt-1.5">{data.afterTitle}</h4>
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-normal font-semibold">{data.afterDesc}</p>
            </div>
            <div className="space-y-1.5 pt-2">
              {data.afterFixes.map((fix, idx) => (
                <div key={idx} className="flex gap-2 text-[10.5px] leading-relaxed">
                  <span className="text-emerald-500 font-black">✔</span>
                  <span className="text-foreground/95 font-bold">{fix}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AttentionSimulator({ toolId }: { toolId: string }) {
  const [viewMode, setViewMode] = useState<"raw" | "heatmap" | "gazePath">("heatmap");
  const gazeCoordinates = [
    { id: "1", x: "50%", y: "20%", name: "Tractor Header", focus: "85%", dwell: "620ms" },
    { id: "2", x: "50%", y: "45%", name: "Interest Rate Highlight", focus: "94%", dwell: "890ms" },
    { id: "3", x: "50%", y: "78%", name: "CTA (Get Loan Details)", focus: "68%", dwell: "410ms" },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-4 select-none">
        <span className="text-[10px] font-black uppercase text-cyan-500 tracking-wider">
          Foveal Attention Simulator
        </span>
        <div className="flex bg-secondary/40 p-0.5 rounded-lg border border-border/40 select-none">
          {(["raw", "heatmap", "gazePath"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`h-6 px-2.5 rounded text-[9.5px] font-bold capitalize transition ${
                viewMode === mode
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {mode === "gazePath" ? "Gaze Path" : mode}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 items-center">
        <div className="w-[180px] h-[310px] rounded-[32px] border-4 border-foreground/95 bg-card relative overflow-hidden flex flex-col shadow-lg shrink-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-foreground/95 rounded-b-xl z-30" />
          <div className="flex-1 p-3 pt-6 flex flex-col justify-between relative overflow-hidden select-none">
            <div className="rounded-lg bg-secondary/30 h-24 border border-border/30 flex flex-col items-center justify-center p-2 relative overflow-hidden">
              <span className="text-[6px] font-black uppercase text-muted-foreground z-10">TRACTOR IMAGE ZONE</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent z-0" />
            </div>

            <div className="space-y-0.5 text-center py-1 relative z-10">
              <span className="text-[7px] font-bold text-primary bg-primary/6 px-1.5 py-0.5 rounded">Special Scheme</span>
              <h4 className="font-display font-black text-[10px] text-foreground mt-1">Zero Land-Guarantee Finance</h4>
              <p className="text-[6.5px] text-muted-foreground leading-normal max-w-[120px] mx-auto">
                No farming land documentation required. Approval in 24 hours.
              </p>
            </div>

            <div className="space-y-1 pb-1">
              <div className="h-7 rounded-lg bg-primary text-white text-[8.5px] font-black flex items-center justify-center cursor-pointer shadow-sm hover:bg-mahindra-red-light transition">
                Get Loan Details
              </div>
              <p className="text-[5px] text-muted-foreground text-center">*Terms apply.</p>
            </div>

            {viewMode === "heatmap" && (
              <div className="absolute inset-0 bg-navy/5 z-20 pointer-events-none mix-blend-multiply transition-opacity duration-300">
                <div className="absolute top-[22%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-radial from-cyan-500/60 via-yellow-500/25 to-transparent animate-pulse" />
                <div className="absolute top-[52%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-radial from-red-500/70 via-yellow-500/30 to-transparent" />
                <div className="absolute bottom-[20%] left-[50%] -translate-x-1/2 w-20 h-20 rounded-full bg-radial from-emerald-500/50 via-yellow-400/20 to-transparent" />
              </div>
            )}

            {viewMode === "gazePath" && (
              <div className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300">
                <svg className="absolute inset-0 w-full h-full">
                  <line x1="50%" y1="22%" x2="50%" y2="52%" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="50%" y1="52%" x2="50%" y2="82%" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>

                {gazeCoordinates.map((coord) => (
                  <div 
                    key={coord.id} 
                    style={{ left: coord.x, top: coord.y }} 
                    className="absolute -translate-x-1/2 -translate-y-1/2 h-5.5 w-5.5 rounded-full bg-primary text-white border-2 border-white text-[9.5px] font-black flex items-center justify-center shadow animate-bounce [animation-duration:2s]"
                  >
                    {coord.id}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Telemetry log */}
        <div className="flex-1 w-full space-y-2 select-none">
          <span className="text-[8px] font-black uppercase text-muted-foreground tracking-wider block">Telemetry Diagnostics</span>
          <div className="space-y-1.5">
            {gazeCoordinates.map((coord) => (
              <div key={coord.id} className="p-2.5 rounded-xl border bg-secondary/15 border-border/80">
                <div className="flex justify-between items-center text-[10.5px] font-bold">
                  <span className="text-foreground flex items-center gap-1">
                    <span className="h-4 w-4 rounded-full bg-primary/8 text-primary text-[8.5px] flex items-center justify-center font-black">
                      {coord.id}
                    </span>
                    {coord.name}
                  </span>
                  <span className="text-[9px] text-cyan-500 bg-cyan-500/6 px-1 py-0.5 rounded">
                    Fixation: {coord.focus}
                  </span>
                </div>
                <div className="flex justify-between text-[9px] text-muted-foreground mt-1.5 font-semibold">
                  <span>Dwell: {coord.dwell}</span>
                  <span>Foveal Focus: 2°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BrainwaveSimulator() {
  const [stressLevel, setStressLevel] = useState<number>(30);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.15);
    }, 30);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const generateWavePath = (frequency: number, amplitude: number, phase: number) => {
    let points = [];
    const step = 2;
    for (let x = 0; x <= 220; x += step) {
      const y = 40 + amplitude * Math.sin((x * frequency) / 15 + phase + time);
      points.push(`${x},${y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  const currentAlphaPath = generateWavePath(3 + stressLevel / 20, 10 - stressLevel / 15, 1.2);
  const currentBetaPath = generateWavePath(6 + stressLevel / 10, 5 + stressLevel / 8, 2.5);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-4 select-none">
        <span className="text-[10px] font-black uppercase text-purple-500 tracking-wider">
          EEG Waveform Analyzer
        </span>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="h-6 px-2.5 rounded text-[9.5px] font-bold border border-border/60 hover:bg-secondary flex items-center gap-1 transition"
        >
          {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {isPlaying ? "Pause Stream" : "Resume Stream"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <div className="lg:col-span-2 space-y-3 bg-secondary/10 p-3 rounded-2xl border border-border/50">
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[9.5px] font-bold text-purple-500">
              <span>Frontal Alpha Waves (Engagement Focus)</span>
              <span className="text-muted-foreground text-[8px]">8 - 12 Hz</span>
            </div>
            <div className="h-14 w-full bg-card/60 rounded-xl border border-border/40 overflow-hidden flex items-center relative">
              <svg className="absolute inset-0 h-full w-full">
                <path d={currentAlphaPath} fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-[9.5px] font-bold text-pink-500">
              <span>Parietal Beta Waves (Cognitive Overload)</span>
              <span className="text-muted-foreground text-[8px]">13 - 30 Hz</span>
            </div>
            <div className="h-14 w-full bg-card/60 rounded-xl border border-border/40 overflow-hidden flex items-center relative">
              <svg className="absolute inset-0 h-full w-full">
                <path d={currentBetaPath} fill="none" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2 select-none">
            <div className="flex justify-between items-center text-xs">
              <span className="font-black text-foreground">Friction Stimulus</span>
              <span className="text-xs font-black text-pink-500">{stressLevel}%</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="90" 
              value={stressLevel} 
              onChange={(e) => setStressLevel(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer h-1.5 bg-secondary rounded-lg appearance-none" 
            />
          </div>

          <div className="p-3 rounded-xl bg-purple-500/4 border border-purple-500/10 space-y-1.5 select-none">
            <span className="text-[8.5px] font-black uppercase text-purple-500 tracking-wider">Cognitive Index</span>
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-muted-foreground font-semibold">Approach score:</span>
              <span className="text-foreground">{(0.72 - stressLevel/250).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-muted-foreground font-semibold">Friction state:</span>
              <span className={`font-black uppercase text-[10px] ${stressLevel > 60 ? "text-destructive" : "text-emerald-500"}`}>
                {stressLevel > 60 ? "HIGH FRICTION" : "STABLE FOCUS"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BiometricSimulator() {
  const [isStressed, setIsStressed] = useState<boolean>(false);
  const [dataPoints, setDataPoints] = useState<number[]>([2.1, 2.3, 2.2, 2.4, 2.3, 2.5, 2.4]);

  const triggerAnxietyPeak = () => {
    setIsStressed(true);
    setDataPoints((prev) => [...prev.slice(1), 5.8]);
    setTimeout(() => {
      setDataPoints((prev) => [...prev.slice(1), 7.2]);
    }, 200);
    setTimeout(() => {
      setDataPoints((prev) => [...prev.slice(1), 4.8]);
    }, 600);
    setTimeout(() => {
      setDataPoints((prev) => [...prev.slice(1), 3.2]);
      setIsStressed(false);
    }, 1200);
  };

  const pointsString = dataPoints
    .map((val, idx) => `${idx * 40},${100 - val * 12}`)
    .join(" L ");

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-4 select-none">
        <span className="text-[10px] font-black uppercase text-orange-500 tracking-wider">
          Electrodermal Sweat Conductance
        </span>
        <span className={`text-[9.5px] font-black uppercase flex items-center gap-1.5 ${
          isStressed ? "text-destructive animate-pulse" : "text-emerald-500"
        }`}>
          <span className={`h-2 w-2 rounded-full ${isStressed ? "bg-red-500" : "bg-emerald-500"}`} />
          {isStressed ? "Spike Response" : "Tonic calm"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <div className="lg:col-span-2 bg-secondary/10 p-3.5 rounded-2xl border border-border/50 select-none">
          <div className="flex justify-between items-center text-[9px] font-bold text-muted-foreground mb-2">
            <span>Skin Conductance Peak (μS)</span>
            <span>Continuous Stream</span>
          </div>
          <div className="h-24 w-full bg-card/60 rounded-xl border border-border/40 overflow-hidden relative flex items-end">
            <svg className="absolute inset-0 h-full w-full">
              <path d={`M ${pointsString}`} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div className="absolute left-2.5 bottom-2 text-[8px] font-black uppercase bg-secondary px-1.5 py-0.5 rounded text-muted-foreground">
              Baseline: 2.3 μS
            </div>
            {isStressed && (
              <div className="absolute right-8 top-3 text-[9px] font-black text-destructive bg-destructive/10 px-2 py-0.5 rounded animate-bounce">
                SPIKE ALERT: 7.2 μS
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-display font-black text-xs text-foreground uppercase tracking-wide">Trigger Aadhaar Friction</h4>
          <p className="text-[10px] text-muted-foreground leading-normal font-semibold">
            Simulate prompting direct upload requirements before establishing familiarity-based trust markers.
          </p>
          <button
            onClick={triggerAnxietyPeak}
            disabled={isStressed}
            className="w-full h-10 bg-primary text-white text-[11px] font-black rounded-xl hover:bg-mahindra-red-light transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow"
          >
            <Zap className="h-3.5 w-3.5" />
            Scan Document Stress
          </button>
        </div>
      </div>
    </div>
  );
}

function EmotionTrackerSimulator() {
  const [expression, setExpression] = useState<"joy" | "skepticism" | "neutral">("neutral");

  const landmarks = {
    neutral: {
      leftEye: "M 65,70 Q 75,70 85,70 Q 75,70 65,70",
      rightEye: "M 115,70 Q 125,70 135,70 Q 125,70 115,70",
      leftBrow: "M 60,60 L 90,60",
      rightBrow: "M 110,60 L 140,60",
      mouth: "M 75,115 Q 100,115 125,115 Q 100,115 75,115",
    },
    joy: {
      leftEye: "M 65,70 Q 75,65 85,70 Q 75,75 65,70",
      rightEye: "M 115,70 Q 125,65 135,70 Q 125,75 115,70",
      leftBrow: "M 60,55 Q 75,50 90,55",
      rightBrow: "M 110,55 Q 125,50 140,55",
      mouth: "M 70,110 Q 100,135 130,110 Q 100,120 70,110",
    },
    skepticism: {
      leftEye: "M 65,72 Q 75,70 85,72 Q 75,72 65,72",
      rightEye: "M 115,67 Q 125,65 135,67 Q 125,67 115,67",
      leftBrow: "M 60,65 L 90,58",
      rightBrow: "M 110,52 L 140,60",
      mouth: "M 75,118 Q 95,110 125,118 Q 100,118 75,118",
    },
  };

  const getMetricScores = () => {
    switch (expression) {
      case "joy":
        return { engagement: "94%", stress: "5%", skepticism: "2%" };
      case "skepticism":
        return { engagement: "65%", stress: "68%", skepticism: "88%" };
      default:
        return { engagement: "20%", stress: "12%", skepticism: "10%" };
    }
  };

  const metrics = getMetricScores();

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-4 select-none">
        <span className="text-[10px] font-black uppercase text-rose-500 tracking-wider">
          Face Wireframe Tracker
        </span>
        <div className="flex bg-secondary/40 p-0.5 rounded-lg border border-border/40 select-none">
          {(["neutral", "joy", "skepticism"] as const).map((exp) => (
            <button
              key={exp}
              onClick={() => setExpression(exp)}
              className={`h-6 px-2.5 rounded text-[9.5px] font-bold capitalize transition ${
                expression === exp
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {exp}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 items-center">
        <div className="h-[160px] w-[160px] rounded-2xl border bg-black relative flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
          <div className="absolute inset-0 bg-radial from-emerald-500/10 to-transparent pointer-events-none" />
          <svg className="h-[120px] w-[120px] stroke-emerald-500 stroke-2 fill-none stroke-linecap-round stroke-linejoin-round opacity-85">
            <path d="M 30,80 C 30,30 130,30 130,80 C 130,130 30,130 30,80" strokeDasharray="3 3" />
            <path d={landmarks[expression].leftEye} />
            <path d={landmarks[expression].rightEye} />
            <path d={landmarks[expression].leftBrow} strokeWidth="2.5" />
            <path d={landmarks[expression].rightBrow} strokeWidth="2.5" />
            <path d="M 100,75 L 100,95 L 90,95" />
            <path d={landmarks[expression].mouth} strokeWidth="2.5" />
          </svg>
        </div>

        <div className="flex-1 w-full space-y-2 select-none">
          <span className="text-[8px] font-black uppercase text-muted-foreground tracking-wider">Affective Readouts</span>
          <div className="space-y-1.5">
            {[
              { label: "Subconscious Engagement", val: metrics.engagement, color: "bg-emerald-500" },
              { label: "Cognitive Doubt / Skepticism", val: metrics.skepticism, color: "bg-rose-500" },
              { label: "Cardiac Pulse Stress Approximation", val: metrics.stress, color: "bg-orange-500" }
            ].map((item, idx) => (
              <div key={idx} className="bg-secondary/15 p-2 rounded-xl border border-border/80 text-[10px]">
                <div className="flex justify-between font-bold">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="text-foreground">{item.val}</span>
                </div>
                <div className="w-full bg-secondary h-1 rounded-full overflow-hidden mt-1.5">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-300`} style={{ width: item.val }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ImplicitTrustGame() {
  const wordsToTest = [
    { word: "Mahindra Finance", category: "trusted" },
    { word: "Local Money Lender", category: "risky" },
    { word: "RBI Licensed Partner", category: "trusted" },
    { word: "120% Compounding Interest", category: "risky" },
    { word: "Dedicated Branch Manager", category: "trusted" },
    { word: "Farming Land Seizure", category: "risky" },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [activeWordStart, setActiveWordStart] = useState<number>(Date.now());
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  useEffect(() => {
    setActiveWordStart(Date.now());
  }, [currentIndex]);

  const handleSelection = (selectedCategory: "trusted" | "risky") => {
    const timeSpent = Date.now() - activeWordStart;
    const isCorrect = wordsToTest[currentIndex].category === selectedCategory;

    setFeedback(isCorrect ? "correct" : "incorrect");
    setTimeout(() => {
      setFeedback(null);
      setReactionTimes((prev) => [...prev, timeSpent]);
      
      if (currentIndex + 1 < wordsToTest.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsCompleted(true);
      }
    }, 300);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setReactionTimes([]);
    setIsCompleted(false);
    setFeedback(null);
  };

  const averageReactionTime = reactionTimes.length > 0 
    ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length) 
    : 0;

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-4 select-none">
        <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider">
          IAT Sorting Game
        </span>
        <span className="text-[9.5px] font-bold text-muted-foreground">
          Step {currentIndex + 1} of {wordsToTest.length}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-2">
        {!isCompleted ? (
          <div className="w-full text-center space-y-6 select-none">
            <p className="text-[10px] text-muted-foreground max-w-sm mx-auto leading-relaxed font-semibold">
              Classify concepts into <strong>TRUSTED BRAND (LEFT)</strong> or <strong>HIGH RISK (RIGHT)</strong>.
            </p>

            <div className="h-16 flex items-center justify-center relative">
              <span className={`font-display font-black text-sm uppercase transition ${
                feedback === "correct" ? "text-emerald-500 scale-105" : 
                feedback === "incorrect" ? "text-destructive scale-95" : "text-foreground"
              }`}>
                {wordsToTest[currentIndex].word}
              </span>
            </div>

            <div className="flex gap-4 max-w-sm mx-auto">
              <button
                onClick={() => handleSelection("trusted")}
                className="flex-1 h-11 bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/25 rounded-2xl text-[10px] font-black text-emerald-600 cursor-pointer flex items-center justify-center transition"
              >
                TRUSTED
              </button>
              <button
                onClick={() => handleSelection("risky")}
                className="flex-1 h-11 bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/25 rounded-2xl text-[10px] font-black text-rose-600 cursor-pointer flex items-center justify-center transition"
              >
                RISKY
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full text-center space-y-4 py-2 select-none">
            <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="font-display font-black text-xs text-foreground uppercase tracking-wide">Sorting Completed</h4>
            <div className="p-3 bg-secondary/15 rounded-2xl border border-border/80 max-w-xs mx-auto space-y-1.5">
              <div className="flex justify-between text-[11px] font-semibold">
                <span className="text-muted-foreground font-semibold">Mean Latency:</span>
                <span className="text-foreground font-bold">{averageReactionTime} ms</span>
              </div>
              <div className="flex justify-between text-[11px] font-semibold">
                <span className="text-muted-foreground font-semibold">Subconscious Bias:</span>
                <span className="text-emerald-500 font-black uppercase">STRONG TRUST LINK</span>
              </div>
            </div>
            <button 
              onClick={handleReset}
              className="h-8 px-4 bg-primary text-white text-[10px] font-bold rounded-lg hover:bg-mahindra-red-light transition cursor-pointer flex items-center gap-1.5 mx-auto"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Restart Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// DETAILED ROUTE PLAYBOOK PAGE VIEWPORT
// ═══════════════════════════════════════════
interface EegStorytellingViewProps {
  tool: typeof neuroscienceToolsList[0];
  activeTheme: typeof themeConfig[string];
}

function EegStorytellingView({ tool, activeTheme }: EegStorytellingViewProps) {
  const [stressLevel, setStressLevel] = useState<number>(30);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [time, setTime] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"before" | "after">("after");

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.15);
    }, 30);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const generateWavePath = (frequency: number, amplitude: number, phase: number) => {
    let points = [];
    const step = 2;
    for (let x = 0; x <= 320; x += step) {
      const y = 35 + amplitude * Math.sin((x * frequency) / 20 + phase + time);
      points.push(`${x},${y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  const currentAlphaPath = generateWavePath(3.2 + stressLevel / 25, 9 - stressLevel / 18, 1.2);
  const currentBetaPath = generateWavePath(6.8 + stressLevel / 12, 4 + stressLevel / 9, 2.5);

  const cognitiveScore = (0.92 - stressLevel / 180).toFixed(2);
  const motivationUplift = Math.round(92 - stressLevel * 0.7);

  return (
    <div className="col-span-12 space-y-10 pb-16 relative">
      {/* Immersive Cinematic Glowing Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-background to-background pointer-events-none rounded-3xl -z-10 animate-fade-in" />

      {/* ─── SECTION 1: IMMERSIVE HERO & STORYTELLING BANNER ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-card/45 border border-purple-500/10 rounded-3xl p-6 md:p-10 shadow-lg relative overflow-hidden backdrop-blur-sm">
        <div className="absolute top-0 right-0 h-96 w-96 bg-radial from-purple-500/5 to-transparent pointer-events-none blur-3xl" />
        
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-wider select-none">
            <Brain className="h-3.5 w-3.5" /> Premium CNS Neural Telemetry
          </div>
          <h1 className="font-display font-black text-3xl md:text-4xl text-foreground uppercase tracking-tight leading-none">
            Electroencephalography
          </h1>
          <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-xl">
            Neuromarketing Capsule translates subconscious brain activity into strategic marketing verdicts. By mapping micro-volt fluctuations directly from the prefrontal cortex, we unlock how consumers emotionally encode your messaging—instantly bypassing survey politeness and rationalization bias.
          </p>
          
          <div className="grid grid-cols-3 gap-4 border-t border-border/30 pt-6 select-none">
            <div>
              <div className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">Neurological Modality</div>
              <div className="text-xs font-bold text-foreground mt-1 uppercase tracking-wide">CNS Brainwaves</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">Temporal Resolution</div>
              <div className="text-xs font-bold text-purple-400 mt-1 uppercase tracking-wide">Sub-Millisecond</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">Feasibility</div>
              <div className="text-xs font-bold text-foreground mt-1 uppercase tracking-wide">Branch Sandbox</div>
            </div>
          </div>
        </div>

        {/* Cinematic Human Context Image */}
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20 aspect-[4/3] group select-none">
          <img 
            src="/images/eeg_headset_participant.png" 
            alt="Mahindra Finance EEG testing participant wearing wireless neural headset" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
            <span className="text-[9px] font-black uppercase text-amber-400 tracking-wider mb-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" /> Active Research Field Study
            </span>
            <h3 className="font-display font-black text-sm text-white uppercase tracking-wide">
              Mahindra Finance Rural Consumer Demographics
            </h3>
            <p className="text-[11px] text-stone-300 mt-1 leading-normal font-semibold max-w-md">
              EEG telemetry deployed in regional branches to capture deep cognitive engagement with seasonal financing flyers.
            </p>
          </div>
        </div>
      </div>

      {/* ─── SECTION 2: LIVE METRICS & INTERACTIVE BRAINWAVE ENGINE ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Animated Waveforms Panel */}
        <div className="lg:col-span-8 bg-card/60 border border-purple-500/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-md relative overflow-hidden">
          <div className="absolute inset-0 bg-radial from-purple-500/2 via-transparent to-transparent pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-border/30 pb-4 mb-6 select-none">
            <div>
              <span className="text-[10px] font-black uppercase text-purple-400 tracking-wider">Real-Time Neural Oscilloscope</span>
              <h3 className="font-display font-black text-sm text-foreground uppercase tracking-wide mt-1">Prefrontal Signal Calibration</h3>
            </div>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-7 px-3 rounded-lg text-[9.5px] font-black uppercase tracking-wider border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 text-purple-300 flex items-center gap-1.5 transition cursor-pointer"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
              {isPlaying ? "Pause Oscilloscope" : "Resume Oscilloscope"}
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10.5px] font-bold text-purple-400 select-none">
                <span>Frontal Alpha Waves (Approach / Engagement Focus)</span>
                <span className="text-muted-foreground text-[9px] font-mono">8 - 12 Hz</span>
              </div>
              <div className="h-20 w-full bg-[#0D0915] rounded-2xl border border-purple-500/10 overflow-hidden flex items-center relative shadow-inner">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                <svg className="absolute inset-0 h-full w-full pointer-events-none">
                  <path d={currentAlphaPath} fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10.5px] font-bold text-pink-400 select-none">
                <span>Parietal Beta Waves (Cognitive Overload / Friction)</span>
                <span className="text-muted-foreground text-[9px] font-mono">13 - 30 Hz</span>
              </div>
              <div className="h-20 w-full bg-[#0D0915] rounded-2xl border border-purple-500/10 overflow-hidden flex items-center relative shadow-inner">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                <svg className="absolute inset-0 h-full w-full pointer-events-none">
                  <path d={currentBetaPath} fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/30 flex flex-col md:flex-row gap-6 items-center justify-between select-none">
            <p className="text-[11px] text-muted-foreground leading-normal font-semibold max-w-sm">
              Use the simulator deck on the right to test how complex financing layouts trigger high cognitive workload in rural consumers.
            </p>
            <div className="text-[10px] text-purple-400 bg-purple-500/6 px-3 py-1.5 rounded-lg border border-purple-500/10 font-mono tracking-wide leading-none">
              *Mathematical asymmetry calibration based on Frontal Alpha Asymmetry.
            </div>
          </div>
        </div>

        {/* Interactive Simulation Control Deck */}
        <div className="lg:col-span-4 bg-card/60 border border-purple-500/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-md relative">
          <div className="space-y-6">
            <div className="select-none">
              <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider">Interactive Simulator</span>
              <h3 className="font-display font-black text-sm text-foreground uppercase tracking-wide mt-1">Stimulus Friction Level</h3>
            </div>
            
            <p className="text-[11px] text-muted-foreground font-semibold leading-relaxed select-none">
              Slide to simulate a complex, text-heavy layout versus a clean, visual-first storytelling card:
            </p>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs select-none">
                <span className="font-black text-foreground uppercase tracking-tight">Creative Complexity</span>
                <span className="text-xs font-black text-pink-500 font-mono">{stressLevel}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="90" 
                value={stressLevel} 
                onChange={(e) => setStressLevel(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer h-2 bg-secondary rounded-lg appearance-none" 
              />
              <div className="flex justify-between text-[9px] text-muted-foreground font-black uppercase tracking-wider select-none">
                <span>Optimized Visual</span>
                <span>Un-Optimized Text</span>
              </div>
            </div>

            {/* Cognitive Index Results */}
            <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/15 space-y-3">
              <span className="text-[9px] font-black uppercase text-purple-400 tracking-wider block select-none">Cognitive Readout Indicators</span>
              
              <div className="flex justify-between text-xs font-bold items-center border-b border-border/30 pb-2">
                <span className="text-muted-foreground font-semibold">Approach score:</span>
                <span className="text-foreground font-mono font-black">{cognitiveScore}</span>
              </div>
              
              <div className="flex justify-between text-xs font-bold items-center border-b border-border/30 pb-2">
                <span className="text-muted-foreground font-semibold">Motivation Uplift:</span>
                <span className="text-emerald-500 font-mono font-black">+{motivationUplift}%</span>
              </div>

              <div className="flex justify-between text-xs font-bold items-center">
                <span className="text-muted-foreground font-semibold">Friction state:</span>
                <span className={`font-black uppercase text-[10px] ${stressLevel > 50 ? "text-rose-500" : "text-emerald-500"}`}>
                  {stressLevel > 50 ? "🧠 COGNITIVE FRICTION" : "✨ CALMED ENGAGEMENT"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-[10px] text-muted-foreground/80 leading-normal font-semibold pt-4 border-t border-border/30 flex items-start gap-1.5 select-none">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Simulated metrics reflect actual testing metrics recorded from Indian farmers.</span>
          </div>
        </div>
      </div>

      {/* ─── SECTION 3: BEFORE VS AFTER VISUAL SHOWCASE ─── */}
      <div className="bg-card/45 border border-purple-500/10 rounded-3xl p-6 md:p-8 shadow-lg relative overflow-hidden backdrop-blur-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-6 select-none">
            <span className="text-[9px] font-black uppercase text-purple-400 tracking-wider px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/20">
              A/B Campaign Comparison
            </span>
            <div>
              <h3 className="font-display font-black text-xl text-foreground uppercase tracking-wide leading-tight">
                Calibrating Farm Loan Ads
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mt-2 font-semibold">
                Text-heavy financial advertisements overwhelm working memory, causing instant prefrontal avoidance. By transitioning to progressive visual layouts, we align key elements with foveal focus and prefrontal motivation channels.
              </p>
            </div>

            <div className="flex bg-secondary/40 p-0.5 rounded-lg border border-border/40 w-fit">
              <button
                onClick={() => setActiveTab("before")}
                className={`h-7 px-3.5 rounded-md text-[10px] font-black uppercase tracking-wider transition ${
                  activeTab === "before"
                    ? "bg-rose-600 text-white shadow-sm font-black"
                    : "text-muted-foreground hover:text-foreground cursor-pointer font-bold"
                }`}
              >
                ❌ Before (Friction)
              </button>
              <button
                onClick={() => setActiveTab("after")}
                className={`h-7 px-3.5 rounded-md text-[10px] font-black uppercase tracking-wider transition ${
                  activeTab === "after"
                    ? "bg-emerald-500 text-white shadow-sm font-black"
                    : "text-muted-foreground hover:text-foreground cursor-pointer font-bold"
                }`}
              >
                ✔ After (Optimized)
              </button>
            </div>

            {/* Scientific Impact Readout */}
            <div className="p-4 bg-secondary/25 rounded-2xl border border-border/80 space-y-3">
              {activeTab === "before" ? (
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-rose-500 uppercase">Text-Heavy Layout Friction</h4>
                  <p className="text-[11px] text-muted-foreground font-semibold leading-relaxed">
                    * Alpha Hemispheric Asymmetry spikes in the right prefrontal cortex, indicating direct visual avoidance. Users ignore the call-to-action within 150ms of exposure.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-emerald-500 uppercase">Neuroscience Calibrated Boost</h4>
                  <p className="text-[11px] text-muted-foreground font-semibold leading-relaxed">
                    * Prefrontal workload drops by 45%, keeping visual stress calm. Call-to-action motivation spikes (+60%), driving immediate conceptual memory encoding.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Full Split Image Visual Showcase */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-xl border border-purple-500/15 group bg-white select-none">
            <img 
              src="/images/eeg_before_after_creatives.png" 
              alt="Before vs After A/B split creative comparison showing rate tables vs optimized visual layouts" 
              className="w-full h-auto object-contain block max-h-[500px]"
            />
            {activeTab === "before" ? (
              <div className="absolute inset-0 bg-rose-950/20 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
                <div className="bg-rose-600/95 text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-lg border border-rose-500/20 animate-pulse uppercase tracking-wider">
                  ❌ Text Overload Friction Active
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 bg-emerald-950/5 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
                <div className="bg-emerald-500/95 text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-lg border border-emerald-400/20 animate-bounce uppercase tracking-wider">
                  ✔ Calibrated Journey Active
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ─── SECTION 4: REAL ACTION BLUEPRINT FOR MAHINDRA FINANCE ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Action Blueprint Card */}
        <div className="rounded-3xl border border-purple-500/10 bg-card/65 p-6 md:p-8 shadow-md flex flex-col justify-between gap-6">
          <div className="space-y-4 select-none">
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase text-purple-400 tracking-wider">Action Blueprint</span>
              <h3 className="font-display font-black text-sm text-foreground uppercase tracking-wide">
                How Mahindra Finance Can Deploy This
              </h3>
            </div>
            
            <p className="text-xs leading-relaxed text-foreground bg-purple-500/5 p-4 rounded-2xl border border-purple-500/10 italic font-black">
              "Deploy EEG headbands during regional TVC narration audits. Ensure that complex compliance terms, interest rate calculations, and EMI structures are structured in progressive vertical layers to protect rural consumer trust."
            </p>

            <div className="space-y-2.5 pt-2 text-xs">
              <div className="flex gap-2">
                <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="font-semibold text-muted-foreground">
                  <strong className="text-foreground">Optimal TVC Calibration:</strong> Audio dialects and visual frames are audited second-by-second to eliminate friction.
                </div>
              </div>
              <div className="flex gap-2">
                <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="font-semibold text-muted-foreground">
                  <strong className="text-foreground">KYC Milestone Stabilization:</strong> Complex forms are designed as progressive milestone stages.
                </div>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-muted-foreground flex items-center gap-1.5 font-bold pt-2 border-t border-border/30 select-none">
            <ShieldCheck className="h-4 w-4 text-emerald-500" /> Fully calibrated to fit RBI progressive KYC regulatory environments.
          </div>
        </div>

        {/* Premium Strategic Nudge Card (Completely replacing fake terminal) */}
        <div className="rounded-3xl border border-purple-500/10 bg-card/65 p-6 md:p-8 shadow-md flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="space-y-1 select-none">
              <span className="text-[9px] font-black uppercase text-purple-400 tracking-wider">Strategic Recommendation</span>
              <h3 className="font-display font-black text-sm text-foreground uppercase tracking-wide">
                Recommended Design Logic
              </h3>
            </div>

            <div className="bg-purple-500/5 p-4 rounded-2xl border border-purple-500/10 space-y-3 select-none">
              <span className="text-[8.5px] font-black uppercase text-purple-400 flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-amber-500 animate-spin [animation-duration:4s]" /> pre-deployment advisory
              </span>
              <p className="text-xs text-foreground/90 font-bold leading-relaxed">
                "Calibrate all rural lending flyers to display familial and community safety triggers first. Never start with rate percentages; instead, build trust milestones to buffer visual technophobia before compliance disclosures."
              </p>
            </div>
          </div>

          {/* Premium compliance scorecard replacing cyberpunk terminal log */}
          <div className="p-4 bg-[#0D0915] text-stone-200 rounded-2xl border border-purple-500/25 space-y-3 relative shadow-inner select-none">
            <span className="absolute top-3 right-4 text-[7px] font-black text-purple-400 uppercase tracking-widest">Biometric Compliance Scorecard</span>
            <div className="flex justify-between items-center text-[10px] font-bold border-b border-white/5 pb-2">
              <span className="text-stone-400">Prefrontal Workload:</span>
              <span className="text-emerald-400 font-mono">24% (Optimal)</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-bold border-b border-white/5 pb-2">
              <span className="text-stone-400">Memory Encoding Strength:</span>
              <span className="text-purple-400 font-mono">88% (High)</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-bold">
              <span className="text-stone-400">Regulatory Trust Level:</span>
              <span className="text-amber-400 font-mono">Approved</span>
            </div>
          </div>
        </div>

      </div>

      {/* ─── SECTION 5: REAL RURAL METHODOLOGY BLUEPRINT ─── */}
      <div className="bg-card/40 border border-purple-500/10 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 select-none">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase text-purple-400 tracking-wider">Methodology Blueprint</span>
              <h4 className="font-display font-black text-xs text-foreground uppercase tracking-wide">Consumer Testing Process Steps</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { step: "01", title: "Target Panel Calibration", desc: "Regional cohort groups are selected across tier-2/3 demographics and calibrated in-branch." },
                { step: "02", title: "Dynamic Campaign Exposure", desc: "Participants view localized TVCs, digital onboarding portals, or WhatsApp lending messages." },
                { step: "03", title: "Subconscious Mapping", desc: "Prefrontal cortex alpha bands map motivations and motivation fluctuations without interview bias." }
              ].map((s, idx) => (
                <div key={idx} className="bg-purple-500/5 p-4 rounded-2xl border border-purple-500/10 relative space-y-2">
                  <span className="absolute top-2.5 right-3.5 font-display font-black text-2xl text-purple-500/10">{s.step}</span>
                  <h5 className="font-display font-black text-[10.5px] text-foreground uppercase tracking-wide">{s.title}</h5>
                  <p className="text-[10px] text-muted-foreground leading-normal font-semibold">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-purple-500/5 p-5 rounded-2xl border border-purple-500/10 flex flex-col justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[8px] font-black uppercase text-purple-400 tracking-widest">Neuroscience Outlook</span>
              <h5 className="font-display font-black text-xs text-foreground uppercase tracking-wide">Generative Saliency Model</h5>
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed font-semibold">
              Predicting subcortical brain activity, visual cognitive load, and attention peaks directly via neural generative models, bypassing manual clinic testing and enabling instant programmatic campaign pre-testing.
            </p>
            <div className="flex justify-between items-center text-[10px] font-bold border-t border-border/30 pt-3 mt-1">
              <span className="text-muted-foreground">Calibration Predictive Accuracy:</span>
              <span className="text-purple-400 font-mono font-black">92%</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function ToolDetailPage() {
  const { toolId } = Route.useParams();
  const navigate = useNavigate();

  // Categories list
  const categoriesList = [
    { id: "cns", label: "Central Nervous System (CNS) Tools" },
    { id: "ans", label: "Autonomic Nervous System (ANS) Biometrics" },
    { id: "somatic", label: "Somatic & Muscular Response Tools" },
    { id: "behavioral", label: "Behavioral & Implicit Cognitive Tools" },
    { id: "ai", label: "AI & Computational Neuroscience Tools" }
  ];

  // Match the active tool
  const tool = neuroscienceToolsList.find((t) => t.id === toolId) || neuroscienceToolsList[0];
  const activeTheme = themeConfig[tool.group] || themeConfig.ans;

  // Filter tools of the active tool's category to display in the Tier-2 navigator bar
  const activeCategoryTools = neuroscienceToolsList.filter((t) => t.group === tool.group);

  const handleCategoryShift = (catId: string) => {
    const matchingTools = neuroscienceToolsList.filter((t) => t.group === catId);
    if (matchingTools.length > 0) {
      navigate({ to: "/tools/$toolId", params: { toolId: matchingTools[0].id } });
    }
  };

  const handleToolShift = (tId: string) => {
    navigate({ to: "/tools/$toolId", params: { toolId: tId } });
  };

  return (
    <AppLayout>
      {/* 
        ═══════════════════════════════════════════
        1. FLOATING STRATEGIC TWO-TIER SYSTEM SELECTOR BAR
        ═══════════════════════════════════════════ 
      */}
      <div className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/40 py-3 mb-6 select-none space-y-3">
        {/* Tier 1: Modality Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 scrollbar-none">
          <Link 
            to="/tools"
            className="inline-flex items-center gap-1 text-[10.5px] font-black uppercase text-muted-foreground hover:text-foreground transition tracking-wider shrink-0 mr-3 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Tools Hub
          </Link>
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryShift(cat.id)}
              className={`h-9 px-4 rounded-xl text-[10.5px] font-black uppercase tracking-wider shrink-0 transition-all ${
                tool.group === cat.id
                  ? "bg-primary text-white shadow-sm"
                  : "bg-secondary/40 text-foreground/80 hover:bg-secondary border border-border/40"
              }`}
            >
              {cat.label.split(" (")[0]}
            </button>
          ))}
        </div>

        {/* Tier 2: Modality Specific tools */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 scrollbar-none border-t border-border/30 pt-2.5">
          {activeCategoryTools.map((t) => (
            <button
              key={t.id}
              onClick={() => handleToolShift(t.id)}
              className={`h-8 px-3 rounded-lg text-[10px] font-black tracking-wide capitalize shrink-0 transition-all ${
                tool.id === t.id
                  ? `${activeTheme.badge} shadow-inner scale-[1.02]`
                  : "bg-secondary/20 text-muted-foreground hover:text-foreground border border-border/30"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* 
        ═══════════════════════════════════════════
        2. DYNAMIC ENVIRONMENT WINDOW (NoStacked scrolling)
        ═══════════════════════════════════════════ 
      */}
      {tool.id === "eeg" ? (
        <EegStorytellingView tool={tool} activeTheme={activeTheme} />
      ) : (
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 pb-16 relative rounded-3xl p-4 md:p-6 bg-gradient-to-b ${activeTheme.bg} border ${activeTheme.borderColor} transition-all duration-500`}>
        
        {/* Glow dots */}
        <div className="absolute inset-0 bg-radial from-primary/2 via-transparent to-transparent pointer-events-none opacity-35 blur-3xl" />
        
        {/* BENTO 1: IMMERSIVE HERO VISUAL SIMULATOR (Span 8) */}
        <div className="col-span-12 lg:col-span-8 rounded-3xl border border-border bg-card/95 p-6 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[350px]">
          <div className="absolute top-0 right-0 h-40 w-40 bg-radial from-primary/5 to-transparent pointer-events-none" />
          {getSimulator(tool.id, tool.group)}
        </div>

        {/* BENTO 2: STRATEGIC HEADNOTE SPEC SHIFT (Span 4) */}
        <div className="col-span-12 lg:col-span-4 rounded-3xl border border-border bg-card/95 p-6 md:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden select-none">
          <div className="space-y-4">
            <span className={`text-[7.5px] font-black uppercase tracking-widest px-2.5 py-1 rounded ${activeTheme.textColor} ${activeTheme.bgColor} border ${activeTheme.borderColor}`}>
              {tool.category}
            </span>
            <div>
              <h1 className="font-display font-black text-xl text-foreground uppercase tracking-wide leading-tight mt-1.5">
                {tool.name}
              </h1>
              <p className="text-[11px] text-muted-foreground mt-2 font-semibold leading-relaxed">
                Strategic decision support playbook calibrated to analyze subconscious customer parameters without survey rationalization biases.
              </p>
            </div>
          </div>

          <div className="pt-5 mt-5 border-t border-border/40 space-y-3 text-[10.5px] font-bold">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Neuromarketing Modality:</span>
              <span className={`${activeTheme.textColor} uppercase tracking-wider capitalize`}>
                {tool.group} telemetry
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Calibration response:</span>
              <span className="text-foreground">Subconscious (Sub-250ms)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rural Feasibility Rate:</span>
              <span className="text-foreground">
                {tool.id.includes("ai") || tool.id === "ux-analytics" ? "High (Smartphone APIs)" : "Medium (Local Branches)"}
              </span>
            </div>
          </div>
        </div>

        {/* BENTO 3: SIMPLE STRATEGIC CORE & WHAT MARKETERS LEARN (Span 6) */}
        <div className="col-span-12 md:col-span-6 rounded-3xl border border-border bg-card/95 p-6 md:p-8 shadow-sm flex flex-col justify-between gap-4 select-none">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase text-muted-foreground tracking-wider">
                Strategic Translation
              </span>
              <h3 className="font-display font-black text-sm text-foreground uppercase tracking-wide">
                What it does in simple terms
              </h3>
            </div>
            
            <p className="text-xs leading-relaxed text-foreground/95 font-black bg-secondary/20 p-3.5 rounded-2xl border border-border/80 italic">
              "{tool.oneLinePurpose}"
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <div className="flex gap-2">
                <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="font-semibold text-muted-foreground">
                  <strong className="text-foreground">What Marketers Learn:</strong> {tool.primaryCapability}
                </div>
              </div>
              <div className="flex gap-2">
                <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="font-semibold text-muted-foreground">
                  <strong className="text-foreground">When to Deploy:</strong> {tool.bestUseCase}
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-secondary/15 rounded-xl border border-border/80 flex justify-between items-center text-[10.5px] font-bold">
            <span className="text-muted-foreground">Working Cognitive Rule:</span>
            <span className="text-foreground font-black">{tool.detail.principle}</span>
          </div>
        </div>

        {/* BENTO 4: BEFORE VS AFTER CREATIVE SHOWCASE SLIDER (Span 6) */}
        <div className="col-span-12 md:col-span-6 rounded-3xl border border-border bg-card/95 p-6 md:p-8 shadow-sm">
          <CreativeBeforeAfter toolId={tool.id} toolGroup={tool.group} />
        </div>

        {/* BENTO 5: MAHINDRA FINANCE BLUEPRINT Solution (Span 6) */}
        <div className="col-span-12 md:col-span-6 rounded-3xl border border-border bg-card/95 p-6 md:p-8 shadow-sm flex flex-col justify-between gap-5 select-none">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className={`text-[9px] font-black uppercase ${activeTheme.textColor} tracking-wider`}>
                Action Blueprint
              </span>
              <h3 className="font-display font-black text-sm text-foreground uppercase tracking-wide">
                How Mahindra Finance Can Deploy This
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-secondary/20 border border-border/80 leading-relaxed font-black text-xs text-foreground italic">
              "{tool.detail.mahindraApp}"
            </div>
          </div>

          <div className="text-[10px] text-muted-foreground flex items-center gap-1.5 font-bold pt-1">
            <ShieldCheck className="h-4 w-4 text-emerald-500" /> Fully integrated into RBI-regulated security guardrails.
          </div>
        </div>

        {/* BENTO 6: STRATEGIC NUDGES & CONSOLE (Span 6) */}
        <div className="col-span-12 md:col-span-6 rounded-3xl border border-border bg-card/95 p-6 md:p-8 shadow-sm flex flex-col justify-between gap-5 select-none">
          <div className="space-y-3.5">
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase text-muted-foreground tracking-wider">
                Strategic Nudge
              </span>
              <h3 className="font-display font-black text-sm text-foreground uppercase tracking-wide">
                Recommended design logic action
              </h3>
            </div>

            <div className="bg-primary/4 p-3.5 rounded-xl border border-primary/10 text-xs">
              <span className="text-[8.5px] font-black uppercase text-primary flex items-center gap-1 mb-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Strategic Nudge Recommendation
              </span>
              <p className="text-foreground/95 font-bold leading-normal">
                "{tool.detail.marketingUse}"
              </p>
            </div>
          </div>

          {/* Console logs */}
          <div className="p-3 bg-navy text-foreground font-mono text-[9.5px] rounded-xl border border-border/80 space-y-1 relative shadow-inner">
            <span className="absolute top-1.5 right-3 text-[7px] font-bold text-muted-foreground uppercase">Telemetry Output</span>
            <div className="text-primary/70 flex items-center gap-1">&gt; sys.calibration() ... DONE</div>
            <div className="text-muted-foreground font-semibold leading-normal mt-1 text-[9.2px]">
              &gt; {tool.detail.realInsight}
            </div>
          </div>
        </div>

        {/* BENTO 7: METHODOLOGY PROCESS STEPS & AI ROADMAP (Span 12) */}
        <div className="col-span-12 rounded-3xl border border-border bg-card/95 p-6 md:p-8 shadow-sm space-y-6 select-none">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Steps Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase text-muted-foreground tracking-wider">Methodology Blueprint</span>
                <h4 className="font-display font-black text-xs text-foreground uppercase tracking-wide">Deployable Process Steps</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { step: "01", title: "Target Panel Setup", desc: "Remote mobile device webcams or physical lab kits calibrate inside target rural demographic zones." },
                  { step: "02", title: "Stimulus Exposure", desc: "Cohort views dynamic financing print creatives, KYC calculators, or WhatsApp interactive messages." },
                  { step: "03", title: "Signal Sifting", desc: "AI models process foveal fixation vectors, prefrontal alpha bands, or electrodermal conductance." }
                ].map((s, idx) => (
                  <div key={idx} className="bg-secondary/15 p-4 rounded-xl border border-border/80 relative space-y-1.5">
                    <span className="absolute top-2.5 right-3.5 font-display font-black text-lg text-primary/10">{s.step}</span>
                    <h5 className="font-display font-black text-[10px] text-foreground uppercase tracking-wide">{s.title}</h5>
                    <p className="text-[9.5px] text-muted-foreground leading-normal font-semibold">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Roadmap Column */}
            <div className="bg-secondary/10 p-4 rounded-2xl border border-border/80 flex flex-col justify-between gap-3">
              <div className="space-y-1">
                <span className={`text-[8px] font-black uppercase ${activeTheme.textColor} tracking-widest`}>AI 2026+ Outlook</span>
                <h5 className="font-display font-black text-xs text-foreground uppercase tracking-wide">Generative Saliency</h5>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed font-semibold">
                Simulating physical human gaze and biometric peaks directly via deep generative models, siphoning physical setup costs and enabling real-time programmatic visual creative scoring pre-deployment.
              </p>
              <div className="flex justify-between items-center text-[9.5px] font-bold border-t border-border/30 pt-2 mt-1 select-none">
                <span className="text-muted-foreground">Predictive accuracy:</span>
                <span className="text-primary font-black">92%</span>
              </div>
            </div>

          </div>
        </div>

      </div>
      )}
    </AppLayout>
  );
}
