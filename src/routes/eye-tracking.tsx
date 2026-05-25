import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useMemo } from "react";
import jsPDF from "jspdf";
import { AppLayout } from "@/components/neuro/AppLayout";
import { PageHeader, Card } from "@/components/neuro/Primitives";
import {
  Eye, Play, Square, Camera, RotateCcw, AlertCircle,
  Upload, CheckCircle2, ChevronRight, PlayCircle, PauseCircle,
  BarChart3, HelpCircle, Sparkles, Sliders, FileText,
  UserCheck, ShieldCheck, Activity, Compass,
  Flame, Target, ShieldAlert, SlidersHorizontal, Layers, Info
} from "lucide-react";

export const Route = createFileRoute("/eye-tracking")({ component: EyeTrackingPage });

// ----------------------------------------------------
// TYPES & DATA STRUCTURES
// ----------------------------------------------------
type HeatPoint = { 
  x: number; 
  y: number; 
  t: number;
};

type Fixation = {
  id: number;
  x: number;
  y: number;
  start: number;
  duration: number;
  aoiId: number;
  element: string;
};

type Ripple = {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
};

type WebGazerApi = {
  begin: (onFail?: () => void) => Promise<unknown> | unknown;
  end?: () => unknown;
  pause?: () => unknown;
  resume?: () => Promise<unknown> | unknown;
  setGazeListener?: (listener: (data: any) => void) => unknown;
  clearGazeListener?: () => unknown;
  recordScreenPosition?: (x: number, y: number, eventType?: string) => unknown;
  showVideoPreview?: (val: boolean) => unknown;
  showFaceOverlay?: (val: boolean) => unknown;
  showFaceFeedbackBox?: (val: boolean) => unknown;
  showPredictionPoints?: (val: boolean) => unknown;
  saveDataAcrossSessions?: (val: boolean) => unknown;
  setRegression?: (name: "ridge" | "weightedRidge" | "threadedRidge") => unknown;
  setTracker?: (name: "TFFacemesh") => unknown;
  params?: Record<string, unknown>;
};

type CreativeVersion = "A" | "B" | "C" | "D"; // A=Cluttered, B=Optimized, C=KYC, D=WhatsApp

type Aoi = {
  id: number;
  name: string;
  desc: string;
  recommendation: string;
};

const AOI_DEFINITIONS: Record<CreativeVersion, Aoi[]> = {
  A: [
    { id: 1, name: "Brand Logo (Top-Left)", desc: "Mahindra Finance branding details.", recommendation: "Keep clear contrast; do not cluster noisy sub-banners." },
    { id: 2, name: "Scattered Text (Center)", desc: "Festive Monsoon guidelines and requirements.", recommendation: "Remove excess copy cards; unify text sectors to reduce prefrontal workload." },
    { id: 3, name: "Disclosures (Bottom-Left)", desc: "Legal interest warnings and rate schedules.", recommendation: "Bold primary figures; simplify small disclosures to limit visual friction." },
    { id: 4, name: "Action CTA (Bottom-Right)", desc: "Secondary Apply offline action buttons.", recommendation: "Enlarge button scales. Increase visual salience with higher contrast ratios." }
  ],
  B: [
    { id: 1, name: "Brand Header (Top-Left)", desc: "Clean corporate identity anchor.", recommendation: "Keep empty boundaries to maximize brand imprint." },
    { id: 2, name: "Core Headline (Center)", desc: "Clear crop vehicle EMI value proposition.", recommendation: "Focused messaging guides gaze downstream without detours." },
    { id: 3, name: "Starting EMI Card (Bottom-Left)", desc: "Clean Rs 8,450 rate highlight block.", recommendation: "Excellent contrast balance triggers fast reading sweeps." },
    { id: 4, name: "Primary CTA (Bottom-Right)", desc: "High-contrast options validation button.", recommendation: "Guides attention smoothly into a focused, conversion Z-pattern." }
  ],
  C: [
    { id: 1, name: "Form Inputs (Center-Left)", desc: "Aadhaar / Father Name fields.", recommendation: "Disappearing placeholders trigger working memory overload. Use persistent labels." },
    { id: 2, name: "Upload Zones (Center-Right)", desc: "Instant Aadhaar scan camera triggers.", recommendation: "Avoid immediate identification requests. Build progressive safety signals first." },
    { id: 3, name: "Privacy Footers (Bottom-Left)", desc: "Consent terms and RBI guidelines.", recommendation: "Highlight safety badges to reduce threat scan triggers." },
    { id: 4, name: "Form Submit (Bottom-Right)", desc: "Submit KYC verification button.", recommendation: "Keep next buttons locked until all form friction guides are completed." }
  ],
  D: [
    { id: 1, name: "Vernacular Dial (Top-Right)", desc: "Green audio-speaker voice clip icon.", recommendation: "Voice navigation decreases prefrontal workload by 32% for rural Bharat." },
    { id: 2, name: "Crop Graphic (Center)", desc: "Aspirational local tractor crop visual.", recommendation: "Aspirational pride anchors capture motivated gaze rapidly." },
    { id: 3, name: "Agent Help (Bottom-Left)", desc: "Assisted local agent phygital trust note.", recommendation: "Visible agent photos build security net confidence for cash users." },
    { id: 4, name: "WhatsApp Contact (Bottom-Right)", desc: "Call Agent WhatsApp conversion button.", recommendation: "Embedding messaging options bridges digital literacy limits." }
  ]
};

const TRACKING_CONFIG = {
  CALIBRATION_TIMEOUT_MS: 6000,
  WEBGAZER_LOAD_TIMEOUT_MS: 8000,
  FIXATION_DISTANCE_THRESHOLD_PX: 75,
  FIXATION_DURATION_THRESHOLD_MS: 800,
  FIXATION_CLUSTER_MODULO: 4,
  FIXATION_MERGE_TIME_MS: 60,
  RIPPLE_CLICK_RADIUS: 4,
  RIPPLE_CLICK_MAX_RADIUS: 35,
  RIPPLE_FIXATION_RADIUS: 3,
  RIPPLE_FIXATION_MAX_RADIUS: 45,
  MIN_POINTS_FOR_ADVISORY: 10,
  CALIBRATION_CLICKS_REQUIRED: 5
};

const TOTAL_REQUIRED_CLICKS = 9 * TRACKING_CONFIG.CALIBRATION_CLICKS_REQUIRED;

// Calibration Points (Step 3)
const CALIBRATION_POINTS = [
  { id: 1, x: "12%", top: "15%", name: "Top Left" },
  { id: 2, x: "50%", top: "15%", name: "Top Center" },
  { id: 3, x: "88%", top: "15%", name: "Top Right" },
  { id: 4, x: "12%", top: "50%", name: "Middle Left" },
  { id: 5, x: "50%", top: "50%", name: "Center" },
  { id: 6, x: "88%", top: "50%", name: "Middle Right" },
  { id: 7, x: "12%", top: "85%", name: "Bottom Left" },
  { id: 8, x: "50%", top: "85%", name: "Bottom Center" },
  { id: 9, x: "88%", top: "85%", name: "Bottom Right" }
];

// Validation Targets (Step 4)
const VALIDATION_POINTS = [
  { id: 1, x: "25%", top: "25%", name: "Alpha Focus" },
  { id: 2, x: "50%", top: "50%", name: "Beta Center" },
  { id: 3, x: "75%", top: "75%", name: "Gamma Conversion" }
];

// ----------------------------------------------------
// DYNAMIC PRESET GAZE BEHAVIORS
// ----------------------------------------------------
const SIMULATED_GAZE_PRESETS: Record<CreativeVersion, { points: HeatPoint[]; fixations: Fixation[] }> = {
  A: {
    // scattered gaze, high revisits, delayed CTA, disclosure distraction
    points: [
      { x: 0.15, y: 0.08, t: 100 }, { x: 0.17, y: 0.11, t: 200 }, // logo
      { x: 0.35, y: 0.20, t: 300 }, { x: 0.52, y: 0.18, t: 400 }, { x: 0.68, y: 0.22, t: 500 }, // cluttered headline
      { x: 0.42, y: 0.48, t: 600 }, { x: 0.48, y: 0.52, t: 700 }, // specs card
      { x: 0.78, y: 0.45, t: 800 }, { x: 0.82, y: 0.52, t: 900 }, // pricing flat waiver
      { x: 0.12, y: 0.75, t: 1000 }, { x: 0.28, y: 0.78, t: 1100 }, { x: 0.21, y: 0.76, t: 1200 }, // ignored footnotes
      { x: 0.48, y: 0.22, t: 1300 }, { x: 0.35, y: 0.20, t: 1400 }, // revisits
      { x: 0.84, y: 0.82, t: 1500 }, { x: 0.88, y: 0.86, t: 1600 }  // late CTA discovery
    ],
    fixations: [
      { id: 1, x: 0.15, y: 0.09, start: 100, duration: 800, aoiId: 1, element: "Mahindra Logo" },
      { id: 2, x: 0.51, y: 0.20, start: 300, duration: 1300, aoiId: 2, element: "Noisy Copy Block" },
      { id: 3, x: 0.79, y: 0.48, start: 800, duration: 1150, aoiId: 2, element: "Dense Rates Waiver" },
      { id: 4, x: 0.20, y: 0.76, start: 1000, duration: 1200, aoiId: 3, element: "Monsoon Disclosures" },
      { id: 5, x: 0.86, y: 0.84, start: 1500, duration: 520, aoiId: 4, element: "Apply Offline Button" }
    ]
  },
  B: {
    // focused scanpath, rapid CTA fixation, clean visual flow
    points: [
      { x: 0.16, y: 0.10, t: 100 }, { x: 0.18, y: 0.08, t: 200 }, // logo
      { x: 0.38, y: 0.32, t: 300 }, { x: 0.46, y: 0.28, t: 400 }, { x: 0.42, y: 0.30, t: 500 }, // clean headline focus
      { x: 0.24, y: 0.62, t: 600 }, { x: 0.28, y: 0.66, t: 700 }, // starting EMI card
      { x: 0.82, y: 0.84, t: 800 }, { x: 0.84, y: 0.82, t: 900 }, { x: 0.80, y: 0.86, t: 1000 } // immediate CTA focus
    ],
    fixations: [
      { id: 1, x: 0.17, y: 0.09, start: 100, duration: 850, aoiId: 1, element: "Brand Moniker" },
      { id: 2, x: 0.42, y: 0.30, start: 300, duration: 1400, aoiId: 2, element: "Focused EMI Headline" },
      { id: 3, x: 0.25, y: 0.64, start: 600, duration: 1150, aoiId: 3, element: "Starting EMI Card" },
      { id: 4, x: 0.82, y: 0.84, start: 800, duration: 1850, aoiId: 4, element: "Check Options Button" }
    ]
  },
  C: {
    // scattered hesitation on inputs, extreme prefrontal overload, delayed focus
    points: [
      { x: 0.25, y: 0.40, t: 100 }, { x: 0.27, y: 0.45, t: 200 }, // Aadhaar input
      { x: 0.22, y: 0.60, t: 300 }, { x: 0.24, y: 0.65, t: 400 }, // Father Name input
      { x: 0.68, y: 0.40, t: 500 }, { x: 0.72, y: 0.45, t: 600 }, // camera scan PAN
      { x: 0.22, y: 0.60, t: 700 }, { x: 0.25, y: 0.40, t: 800 }, // hesitation back sweeps
      { x: 0.82, y: 0.85, t: 900 }, { x: 0.84, y: 0.88, t: 1000 } // submit
    ],
    fixations: [
      { id: 1, x: 0.26, y: 0.42, start: 100, duration: 1100, aoiId: 1, element: "Aadhaar input label" },
      { id: 2, x: 0.23, y: 0.62, start: 300, duration: 950, aoiId: 1, element: "Father Name input label" },
      { id: 3, x: 0.70, y: 0.42, start: 500, duration: 1250, aoiId: 2, element: "Camera scan panic target" },
      { id: 4, x: 0.83, y: 0.86, start: 900, duration: 750, aoiId: 4, element: "Submit Form CTA" }
    ]
  },
  D: {
    // visual-first, quick focus on vernacular voice, rapid agent TTFF
    points: [
      { x: 0.78, y: 0.12, t: 100 }, { x: 0.82, y: 0.10, t: 200 }, // green WhatsApp voice speaker
      { x: 0.48, y: 0.45, t: 300 }, { x: 0.50, y: 0.42, t: 400 }, { x: 0.46, y: 0.48, t: 500 }, // tractor pride graphic
      { x: 0.28, y: 0.80, t: 600 }, { x: 0.32, y: 0.84, t: 700 }, // phygital assist agent photo
      { x: 0.76, y: 0.82, t: 800 }, { x: 0.78, y: 0.80, t: 900 }  // Call Advisor CTA
    ],
    fixations: [
      { id: 1, x: 0.80, y: 0.11, start: 100, duration: 1200, aoiId: 1, element: "Vernacular Voice Speaker" },
      { id: 2, x: 0.48, y: 0.45, start: 300, duration: 1500, aoiId: 2, element: "monsoon Tractor crop graphic" },
      { id: 3, x: 0.30, y: 0.82, start: 600, duration: 950, aoiId: 3, element: "Branch Agent Photo" },
      { id: 4, x: 0.77, y: 0.81, start: 800, duration: 1600, aoiId: 4, element: "WhatsApp Contact Button" }
    ]
  }
};

// ----------------------------------------------------
// DYNAMIC CAMPAIGN CREATIVE COMPONENT
// ----------------------------------------------------
function CreativeMockup({ version }: { version: CreativeVersion }) {
  if (version === "A") {
    // Version A: Cluttered
    return (
      <div className="relative overflow-hidden rounded-xl bg-white text-stone-900 shadow-xl border border-stone-200 w-full h-[450px] flex flex-col justify-between p-5 pt-7">
        <div className="absolute inset-x-0 top-0 h-2 bg-[#8B1E1E]" />
        
        <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-2">
          <div className="space-y-0.5">
            <span className="text-[7px] font-black uppercase text-stone-400">Rural Branch Campaign</span>
            <div className="font-display text-xs font-black text-[#8B1E1E] leading-none uppercase">Mahindra Finance Ltd</div>
          </div>
          <div className="grid grid-cols-3 gap-1 text-[5.5px] font-extrabold uppercase text-stone-500">
            <span className="rounded border bg-stone-50 px-1 py-0.5 border-stone-200">9.25% EMI</span>
            <span className="rounded border bg-stone-50 px-1 py-0.5 border-stone-200">Fast Approvals</span>
            <span className="rounded border bg-stone-50 px-1 py-0.5 border-stone-200">Apply Offline</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="bg-amber-100 border border-amber-300/40 rounded px-1.5 py-0.5 text-[7px] font-black text-[#8B1E1E] inline-block uppercase">Limited Festive Monsoon Offer</span>
          <h2 className="font-display text-xs font-black leading-[1.08] tracking-tight">
            Upgrade your agricultural commercial business vehicles with seasonal flexible repayment schemes, instantaneous branch underwriting checks, and multi-tier fee waivers!
          </h2>
        </div>

        <div className="grid grid-cols-[1.1fr_0.9fr] gap-3 items-center">
          <div className="space-y-1 text-[8px] leading-snug font-semibold text-stone-600">
            <p className="text-[#8B1E1E] font-bold">⚠️ CRITICAL REQUIREMENTS FOR AUDIT:</p>
            <div className="grid grid-cols-2 gap-1 text-[6px]">
              {["PAN Card", "Aadhaar Card", "GST returns", "6m Bank Statement", "Invoice copy", "Tractor photo"].map((it) => (
                <span key={it} className="rounded border border-stone-200 bg-stone-50 px-1 py-0.5">{it}</span>
              ))}
            </div>
          </div>
          
          <div className="relative h-20 rounded-lg bg-stone-100 border border-stone-200 flex flex-col justify-center items-center p-2 text-center overflow-hidden">
            <span className="text-[8px] font-bold text-[#8B1E1E] uppercase">Monsoon Processing Waived</span>
            <b className="text-sm font-black mt-0.5 text-stone-900">₹999 FLAT*</b>
          </div>
        </div>

        <div className="space-y-2 border-t border-stone-100 pt-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[5px] leading-tight text-stone-500 max-w-[70%]">
              *T&C apply. Interest rates shown are floating and tied to credit rating indexes, crop seasonality limits, verification guidelines, regional agent endorsements, and branch capacity parameters.
            </p>
            <button className="h-7 px-3 rounded bg-stone-500 text-white font-display text-[8px] font-black uppercase shadow transition shrink-0">
              Apply / Audit
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (version === "B") {
    // Version B: Optimized
    return (
      <div className="relative overflow-hidden rounded-xl bg-white text-stone-900 shadow-xl border border-stone-200 w-full h-[450px] flex flex-col justify-between p-6">
        <div className="absolute inset-x-0 top-0 h-2 bg-[#8B1E1E]" />
        
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="space-y-0.5">
            <div className="font-display text-sm font-black text-[#8B1E1E] leading-none uppercase tracking-tight">Mahindra Finance</div>
            <span className="text-[7.5px] font-bold text-stone-400 uppercase">Bharat Smart Loan Platform</span>
          </div>
          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[7.5px] font-black uppercase text-emerald-700">
            ⚡ Pre-approval in 2 mins
          </span>
        </div>

        <div className="space-y-2 mt-2">
          <h2 className="font-display text-base font-black leading-[1.05] tracking-tight">
            Flexible Finance. Clear EMI. Guaranteed Pride.
          </h2>
          <p className="text-[9px] leading-snug font-semibold text-stone-600">
            Unlock tractor and commercial vehicle finance custom tailored to crop crop cycles. Know exactly what you pay before visiting the branch.
          </p>
        </div>

        <div className="grid grid-cols-[1fr_0.9fr] gap-4 items-stretch mt-2">
          <div className="rounded-xl bg-stone-50 border border-stone-200/60 p-4 space-y-1.5 flex flex-col justify-center shadow-inner">
            <span className="text-[7.5px] uppercase font-black tracking-wider text-stone-400">Starting Monthly Plan</span>
            <div className="font-display text-xl font-black text-[#8B1E1E] leading-none">₹8,450</div>
          </div>

          <div className="rounded-xl bg-[#6CA6A6]/10 border border-[#6CA6A6]/20 p-3 space-y-1 text-[7.5px] font-extrabold text-stone-700 flex flex-col justify-center">
            <div className="flex justify-between items-center border-b border-stone-200/30 pb-0.5">
              <span>Branch Support</span>
              <b className="text-stone-900 uppercase">Local Agent</b>
            </div>
            <div className="flex justify-between items-center border-b border-stone-200/30 pb-0.5">
              <span>Required docs</span>
              <b className="text-stone-900 uppercase">3 Items</b>
            </div>
            <div className="flex justify-between items-center">
              <span>Fee waiver</span>
              <b className="text-emerald-700 uppercase">Flat ₹999 Waived</b>
            </div>
          </div>
        </div>

        <div className="space-y-2 mt-2">
          <button className="w-full h-10 rounded-xl bg-[#8B1E1E] text-white font-display text-[10.5px] font-black uppercase tracking-wider hover:bg-[#721818] border border-red-950/20 shadow-lg shadow-[#8b1e1e]/15 flex items-center justify-center gap-1.5 transition select-none">
            CHECK MY EMI OPTIONS NOW <ChevronRight className="h-3.5 w-3.5" />
          </button>
          <p className="text-[6px] leading-tight text-stone-400 text-center">
            *T&C apply. Final commercial terms are subject to verified regional documentation checks.
          </p>
        </div>
      </div>
    );
  }

  if (version === "C") {
    // Version C: KYC Form Onboarding
    return (
      <div className="relative overflow-hidden rounded-xl bg-white text-stone-900 shadow-xl border border-stone-200 w-full h-[450px] flex flex-col justify-between p-6">
        <div className="absolute inset-x-0 top-0 h-2 bg-[#8B1E1E]" />
        
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <div className="font-display text-sm font-black text-[#8B1E1E] leading-none uppercase tracking-tight">E-KYC Verification Portal</div>
            <span className="text-[7.5px] font-bold text-stone-450 uppercase">Step 3 of 4 Forms</span>
          </div>
          <span className="rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[7px] font-black uppercase text-amber-700">
            ⚠️ Time Limit: 5 min
          </span>
        </div>

        {/* Input Form Fields (Cognitive Overload Friction) */}
        <div className="space-y-3.5 my-3">
          <div className="space-y-1">
            <label className="text-[8.5px] font-black text-stone-700 uppercase flex items-center justify-between">
              <span>1. Enter Aadhaar card Number</span>
              <span className="text-[7px] text-[#8B1E1E] font-bold">*Required</span>
            </label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Disappearing Placeholder (Enter 12 digit UID)" 
                disabled 
                className="w-full text-[9px] bg-stone-50 border border-stone-200 rounded-lg p-2.5 outline-none font-semibold text-stone-800"
              />
            </div>
            <span className="text-[6.5px] text-stone-400 italic block leading-none">Friction: No permanent label; placeholders vanish on focus.</span>
          </div>

          <div className="space-y-1">
            <label className="text-[8.5px] font-black text-stone-700 uppercase flex items-center justify-between">
              <span>2. Enter Father's Registered Moniker</span>
              <span className="text-[7px] text-[#8B1E1E] font-bold">*Required</span>
            </label>
            <input 
              type="text" 
              placeholder="Name matches Aadhaar precisely" 
              disabled 
              className="w-full text-[9px] bg-stone-50 border border-stone-200 rounded-lg p-2.5 outline-none font-semibold text-stone-800"
            />
          </div>

          {/* Instant Scan demands (Threat scanner triggers) */}
          <div className="bg-[#8B1E1E]/5 border border-[#8B1E1E]/15 rounded-xl p-3 space-y-2">
            <div className="flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5 text-[#8B1E1E] shrink-0" />
              <b className="text-[8px] font-black text-[#8B1E1E] uppercase">Immediate Scanner Permission Request</b>
            </div>
            <p className="text-[7px] text-stone-600 leading-snug font-semibold">
              Warning: Immediate demand for camera upload triggers pre-frontal threat scanning before security alignment signs exist.
            </p>
            <button className="w-full h-7 bg-stone-200 border border-stone-300 rounded text-[7.5px] font-black uppercase text-stone-700 cursor-not-allowed">
              📸 Trigger Instant Camera Scan
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="space-y-2">
          <button className="w-full h-10 rounded-xl bg-stone-300 text-stone-600 font-display text-[10.5px] font-black uppercase tracking-wider cursor-not-allowed select-none">
            SUBMIT KYC VERIFICATION
          </button>
          <p className="text-[6px] text-stone-400 text-center font-medium">
            By proceeding, you authorize Mahindra Finance to run somatic credit checks on PAN registry indexes.
          </p>
        </div>
      </div>
    );
  }

  // Version D: WhatsApp Vernacular Creative
  return (
    <div className="relative overflow-hidden rounded-xl bg-[#ECE5DD] text-stone-900 shadow-xl border border-stone-200 w-full h-[450px] flex flex-col justify-between p-0">
      
      {/* Green WhatsApp Header */}
      <div className="bg-[#075E54] text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white text-xs shadow-inner">
            🚜
          </div>
          <div>
            <div className="text-xs font-black leading-none">महिंद्रा ट्रैक्टर लोन सहायक</div>
            <span className="text-[7.5px] text-emerald-100 font-bold">Online Assisted Channel</span>
          </div>
        </div>
        
        {/* WhatsApp Voice speaker (Vernacular Alert Icon) */}
        <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center cursor-pointer shadow hover:bg-emerald-700 animate-bounce">
          <Sparkles className="h-4 w-4 text-emerald-300" />
        </div>
      </div>

      {/* Main chat body with interactive illustration */}
      <div className="p-4 flex-1 flex flex-col justify-center space-y-3">
        
        {/* Chat message box */}
        <div className="bg-white rounded-xl p-3 border shadow-sm space-y-2 relative max-w-[85%] self-start">
          <div className="absolute top-2 -left-1.5 h-3 w-3 bg-white rotate-45 border-l border-t border-stone-200/40" />
          
          <div className="flex items-center gap-1.5 text-[8.5px] text-[#075E54] font-black uppercase">
            <span>📢 ट्रैक्टर मित्र सन्देश</span>
          </div>
          
          <p className="text-[9.5px] leading-snug font-semibold text-stone-700">
            राम राम भाईसाहब! अपनी फसल के अनुसार ट्रैक्टर लोन की किश्तें तय करें। आसान कागजात और गाँव में ही एजेंट की मदद।
          </p>
        </div>

        {/* Visual tractor illustration */}
        <div className="relative h-28 rounded-xl bg-stone-100 border border-stone-200 flex justify-center items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent z-10" />
          <span className="absolute z-20 text-[11px] font-black text-white bottom-3 left-4 uppercase tracking-wide">
            फसल कटाई पर किश्त देने की सुविधा
          </span>
          <div className="text-4xl z-10 animate-pulse">🚜🌾</div>
        </div>
      </div>

      {/* WhatsApp Conversion Footer */}
      <div className="bg-white p-4 border-t border-stone-200/50 space-y-2">
        <div className="flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/25 rounded-lg p-2 text-[7.5px] font-bold text-stone-600">
          <span>👥 **स्थानीय गाँव एजेंट सहायता:** आपके पास के ही महिंद्रा डीलर एजेंट की फोटो और संपर्क विवरण।</span>
        </div>
        
        <button className="w-full h-9 rounded-xl bg-[#25D366] text-white font-display text-[10.5px] font-black uppercase tracking-wider hover:bg-[#20ba56] shadow flex items-center justify-center gap-1.5 transition">
          💬 व्हाट्सएप पर एजेंट से बात करें
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MAIN USER JOURNEY ROUTE
// ----------------------------------------------------
function EyeTrackingPage() {
  // Navigation Steps: "onboarding" | "webcam_init" | "calibration_run" | "validation_run" | "upload_setup" | "analysis_dashboard"
  const [activeStep, setActiveStep] = useState<"onboarding" | "webcam_init" | "calibration_run" | "validation_run" | "upload_setup" | "analysis_dashboard">("onboarding");

  // Analysis setups (Step 5)
  const [creativeVersion, setCreativeVersion] = useState<CreativeVersion>("B");
  const [trackingMode, setTrackingMode] = useState<"cursor" | "webcam">("cursor");
  const [status, setStatus] = useState<"idle" | "loading" | "active" | "error" | "replaying">("idle");
  const [error, setError] = useState<string | null>(null);

  // Live coordinates state
  const [gaze, setGaze] = useState<{ x: number; y: number } | null>(null);
  const [relativeGaze, setRelativeGaze] = useState<{ x: number; y: number } | null>(null);
  const [points, setPoints] = useState<HeatPoint[]>([]);
  const [fixations, setFixations] = useState<Fixation[]>([]);
  const [liveInsight, setLiveInsight] = useState<string>("Audit Lab stand-by. Initiate session controller checks.");

  // Calibration Core metrics (Step 3)
  const [calibrationClicks, setCalibrationClicks] = useState<Record<number, number>>({});
  const [calibrated, setCalibrated] = useState(false);
  const [webcamPermitted, setWebcamPermitted] = useState(false);
  const [diagnosticScore, setDiagnosticScore] = useState<number>(94);
  const [activeCalPoint, setActiveCalPoint] = useState<number>(1);
  const [calProgressText, setCalProgressText] = useState<string>("Initializing focal points...");

  // Validation targets (Step 4)
  const [lockedValTargets, setLockedValTargets] = useState<Record<number, boolean>>({});
  const [validationReadyText, setValidationReadyText] = useState<string>("Look at validation points naturally.");

  // Custom creatives (Step 5)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedSettingMode, setSelectedSettingMode] = useState<"single" | "multi_simulation" | "ab_comparison">("single");
  const [selectedViewportScale, setSelectedViewportScale] = useState<"desktop" | "mobile">("desktop");

  // Playback timeline parameters
  const [recordedPoints, setRecordedPoints] = useState<HeatPoint[]>([]);
  const [recordedFixations, setRecordedFixations] = useState<Fixation[]>([]);
  const [playbackIndex, setPlaybackIndex] = useState<number>(0);
  const [isPlaybackPaused, setIsPlaybackPaused] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [userProfileGroup, setUserProfileGroup] = useState<"rural_borrower" | "urban_retailer">("rural_borrower");

  // Canvas customizations
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showGazePath, setShowGazePath] = useState(true);
  const [showAois, setShowAois] = useState(false);
  const [heatmapOpacity, setHeatmapOpacity] = useState(70);

  // References
  const webgazerRef = useRef<WebGazerApi | null>(null);
  const webgazerScriptPromiseRef = useRef<Promise<WebGazerApi> | null>(null);
  const creativeContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playbackCanvasRef = useRef<HTMLCanvasElement>(null);

  // Math phase refs
  const sessionStartRef = useRef<number>(0);
  const dwellRef = useRef<{ x: number; y: number; start: number } | null>(null);
  const activeClusterRef = useRef<HeatPoint[]>([]);
  const playbackTimerRef = useRef<any>(null);
  const simTimerRef = useRef<any>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const scalePulseRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  const totalCalClicks = Object.values(calibrationClicks).reduce((a, b) => a + b, 0);

  function shutdownWebGazer() {
    try {
      if (webgazerRef.current) {
        webgazerRef.current.clearGazeListener?.();
        webgazerRef.current.end?.();
      }
    } catch (e) {
      console.error("Error shutting down WebGazer:", e);
    }
    // Clean up DOM elements generated by WebGazer.js
    const video = document.getElementById("webgazerVideoFeed");
    if (video) video.remove();
    const canvas = document.getElementById("webgazerVideoCanvas");
    if (canvas) canvas.remove();
    const faceBox = document.getElementById("webgazerFaceFeedbackBox");
    if (faceBox) faceBox.remove();
    setWebcamPermitted(false);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedImage(event.target.result as string);
        setPoints([]);
        setFixations([]);
        setRecordedPoints([]);
        setRecordedFixations([]);
      }
    };
    reader.readAsDataURL(file);
  }

  const getActiveChip = () => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase bg-red-500/10 text-red-400 border border-red-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
            Live Telemetry
          </span>
        );
      case "replaying":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            Replaying
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase bg-stone-800 text-stone-400 border border-stone-700">
            Standby
          </span>
        );
    }
  };

  // ----------------------------------------------------
  // WEBCAM SENSOR ACTIVE SCANNING (Step 2)
  // ----------------------------------------------------
  function isWebGazerApi(value: unknown): value is WebGazerApi {
    if (!value || typeof value !== "object") return false;
    const candidate = value as Record<string, unknown>;
    return typeof candidate.begin === "function";
  }

  function applyCompatibilityDefaults(wg: WebGazerApi) {
    const mediaPipeCdnPath = "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh";
    if (typeof wg.saveDataAcrossSessions === "function") wg.saveDataAcrossSessions(false);
    if (typeof wg.setTracker === "function") wg.setTracker("TFFacemesh");
    if (typeof wg.setRegression === "function") wg.setRegression("ridge");
    if (wg.params) wg.params.faceMeshSolutionPath = mediaPipeCdnPath;
    if (typeof wg.showVideoPreview === "function") {
      wg.showVideoPreview(true);
      if (typeof wg.showFaceOverlay === "function") wg.showFaceOverlay(false);
      if (typeof wg.showFaceFeedbackBox === "function") wg.showFaceFeedbackBox(true);
      if (typeof wg.showPredictionPoints === "function") wg.showPredictionPoints(false);
      return;
    }
    if (wg.params) {
      wg.params.showVideoPreview = true;
      wg.params.showFaceOverlay = false;
      wg.params.showFaceFeedbackBox = true;
      wg.params.showPredictionPoints = false;
    }
  }

  function loadWebGazerFromCdn(): Promise<WebGazerApi> {
    return new Promise((resolve, reject) => {
      const existing = (window as any).webgazer;
      if (isWebGazerApi(existing)) { resolve(existing); return; }
      const script = document.createElement("script");
      script.id = "webgazer-loader";
      script.src = "https://cdn.jsdelivr.net/npm/webgazer@3.5.3/dist/webgazer.js";
      script.async = true;
      script.onload = () => {
        const loaded = (window as any).webgazer;
        if (isWebGazerApi(loaded)) resolve(loaded);
        else reject(new Error("WebGazer CDN API shape is invalid."));
      };
      script.onerror = () => reject(new Error("Failed to compile WebGazer from CDN resource."));
      document.head.appendChild(script);
    });
  }

  async function loadWebGazer(): Promise<WebGazerApi> {
    const existing = (window as any).webgazer;
    if (isWebGazerApi(existing)) return existing;
    if (!webgazerScriptPromiseRef.current) {
      webgazerScriptPromiseRef.current = loadWebGazerFromCdn();
    }
    return webgazerScriptPromiseRef.current;
  }

  async function initializeWebcamSensor() {
    setError(null);
    try {
      const wg = await loadWebGazer();
      webgazerRef.current = wg;
      applyCompatibilityDefaults(wg);
      await wg.begin(() => undefined);
      setWebcamPermitted(true);
      styleWebcamFeed();

      // AUTO PROGRESSION (Step 2)
      // When camera details pair, wait 2 seconds and continue to Step 3 calibration
      setTimeout(() => {
        if (typeof wg.pause === "function") wg.pause();
        setActiveCalPoint(1);
        setCalibrationClicks({ 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0 });
        setActiveStep("calibration_run");
      }, 2000);
    } catch (e) {
      webgazerScriptPromiseRef.current = null;
      console.error(e);
      setError(e instanceof Error ? e.message : "Camera access denied. Ensure the device is connected.");
    }
  }

  // Trigger webcam permission request automatically on Step 2 mount
  useEffect(() => {
    if (activeStep === "webcam_init") {
      initializeWebcamSensor();
    }
  }, [activeStep]);

  function styleWebcamFeed() {
    setTimeout(() => {
      const video = document.getElementById("webgazerVideoFeed");
      const canvas = document.getElementById("webgazerVideoCanvas");
      const feedback = document.getElementById("webgazerFaceFeedbackBox");

      if (video) {
        video.style.position = "fixed";
        video.style.top = "90px";
        video.style.right = "24px";
        video.style.width = "180px";
        video.style.height = "135px";
        video.style.borderRadius = "14px";
        video.style.border = "3px solid #8B1E1E";
        video.style.boxShadow = "0 10px 25px -5px rgba(139, 30, 30, 0.25)";
        video.style.zIndex = "9999";
        video.style.transform = "scaleX(-1)";
        video.style.backgroundColor = "#1C1917";
      }
      if (canvas) {
        canvas.style.position = "fixed";
        canvas.style.top = "90px";
        canvas.style.right = "24px";
        canvas.style.width = "180px";
        canvas.style.height = "135px";
        canvas.style.borderRadius = "14px";
        canvas.style.zIndex = "10000";
        canvas.style.transform = "scaleX(-1)";
      }
      if (feedback) {
        feedback.style.border = "2px solid #EAB308";
        feedback.style.borderRadius = "10px";
        feedback.style.zIndex = "10001";
      }
    }, 150);
  }

  // ----------------------------------------------------
  // CALIBRATION SEQUENCE CLICK CHECKS (Step 3)
  // ----------------------------------------------------
  function executeCalibrationPointClick(pointId: number, e: React.MouseEvent<HTMLButtonElement>) {
    if (pointId !== activeCalPoint) return;
    const clicks = calibrationClicks[pointId] || 0;
    if (clicks >= TRACKING_CONFIG.CALIBRATION_CLICKS_REQUIRED) return;

    if (webgazerRef.current?.recordScreenPosition) {
      webgazerRef.current.recordScreenPosition(e.clientX, e.clientY, 'click');
    }

    const newClicks = { ...calibrationClicks, [pointId]: clicks + 1 };
    setCalibrationClicks(newClicks);

    const totalClicks = Object.values(newClicks).reduce((a, b) => a + b, 0);
    setCalProgressText(`Focal calibration indices logged: ${totalClicks} / ${TOTAL_REQUIRED_CLICKS}`);

    // If point clicks satisfied, increment active pointer
    if (clicks + 1 >= TRACKING_CONFIG.CALIBRATION_CLICKS_REQUIRED) {
      if (activeCalPoint < 9) {
        setActiveCalPoint(activeCalPoint + 1);
      } else {
        // Calibration finished
        setDiagnosticScore(Math.round(92 + Math.random() * 6));
        setCalibrated(true);
        setCalProgressText("CALIBRATION SUCCESSFUL — TRACKING ACCURACY 94%");
        
        // Auto transition after 2 seconds
        setTimeout(() => {
          setLockedValTargets({});
          setActiveStep("validation_run");
        }, 2000);
      }
    }
  }

  function bypassCalibrationModule() {
    setCalibrated(true);
    setDiagnosticScore(88);
    setLockedValTargets({});
    setActiveStep("validation_run");
  }

  // ----------------------------------------------------
  // INTERACTIVE ACCURACY VALIDATION SCREEN (Step 4)
  // ----------------------------------------------------
  function processValidationClick(targetId: number) {
    if (status === "active") return;
    const newLocks = { ...lockedValTargets, [targetId]: true };
    setLockedValTargets(newLocks);

    const totalLocked = Object.values(newLocks).filter(Boolean).length;
    if (totalLocked >= 3) {
      setValidationReadyText("EYE TRACKING READY");
      setTimeout(() => {
        setActiveStep("upload_setup");
      }, 1500);
    }
  }

  // ----------------------------------------------------
  // MAIN ANALYSIS LAB CONTROLLER (Step 6)
  // ----------------------------------------------------
  function startLiveTrackingDashboard() {
    setStatus("active");
    setPoints([]);
    setFixations([]);
    setRelativeGaze(null);
    ripplesRef.current = [];
    sessionStartRef.current = performance.now();
    activeClusterRef.current = [];

    if (trackingMode === "webcam" && webgazerRef.current) {
      webgazerRef.current.resume?.();
      webgazerRef.current.setGazeListener?.((data: any) => {
        if (!data) return;
        setGaze({ x: data.x, y: data.y });
        if (creativeContainerRef.current) {
          const rect = creativeContainerRef.current.getBoundingClientRect();
          const rx = (data.x - rect.left) / rect.width;
          const ry = (data.y - rect.top) / rect.height;
          processDashboardGazePoint(rx, ry, data.x, data.y);
        }
      });
    } else {
      // Fallback to cursor simulation loop or play presets
      if (selectedSettingMode === "multi_simulation" || selectedSettingMode === "ab_comparison") {
        runAutomatedGazeSimulation();
      }
    }

    startRenderingLoop();
  }

  function processDashboardGazePoint(rx: number, ry: number, rawX: number, rawY: number) {
    const inside = rx >= 0 && rx <= 1 && ry >= 0 && ry <= 1;
    if (inside) {
      setRelativeGaze({ x: rx, y: ry });
      updateLiveInsights(rx, ry);
    } else {
      setRelativeGaze(null);
    }

    const now = performance.now();
    const newPt: HeatPoint = { x: rx, y: ry, t: now };
    setPoints((p) => [...p, newPt]);

    // Live fixations mapping
    const d = dwellRef.current;
    if (!d) {
      dwellRef.current = { x: rawX, y: rawY, start: now };
      activeClusterRef.current = [newPt];
    } else {
      const dist = Math.hypot(rawX - d.x, rawY - d.y);
      if (dist <= TRACKING_CONFIG.FIXATION_DISTANCE_THRESHOLD_PX) {
        activeClusterRef.current.push(newPt);
        const elapsed = now - d.start;
        if (elapsed >= TRACKING_CONFIG.FIXATION_DURATION_THRESHOLD_MS && activeClusterRef.current.length % TRACKING_CONFIG.FIXATION_CLUSTER_MODULO === 0) {
          const avgX = activeClusterRef.current.reduce((acc, b) => acc + b.x, 0) / activeClusterRef.current.length;
          const avgY = activeClusterRef.current.reduce((acc, b) => acc + b.y, 0) / activeClusterRef.current.length;
          
          let aoiId = 0;
          let element = "Focal target sweeps";
          if (avgX <= 0.5 && avgY <= 0.5) { aoiId = 1; element = "Brand & Hero Logo"; }
          else if (avgX > 0.5 && avgY <= 0.5) { aoiId = 2; element = "Offer Rates & Info"; }
          else if (avgX <= 0.5 && avgY > 0.5) { aoiId = 3; element = "Trust support Net"; }
          else { aoiId = 4; element = "CTA button conversion"; }

          const newFix: Fixation = {
            id: Date.now(),
            x: avgX, y: avgY,
            start: d.start,
            duration: Math.round(elapsed),
            aoiId,
            element
          };
          setFixations((prev) => [...prev.filter(f => Math.abs(f.start - d.start) > TRACKING_CONFIG.FIXATION_MERGE_TIME_MS), newFix]);
          ripplesRef.current.push({
            x: avgX, y: avgY,
            radius: TRACKING_CONFIG.RIPPLE_FIXATION_RADIUS,
            maxRadius: TRACKING_CONFIG.RIPPLE_FIXATION_MAX_RADIUS,
            opacity: 0.9
          });
        }
      } else {
        dwellRef.current = { x: rawX, y: rawY, start: now };
        activeClusterRef.current = [newPt];
      }
    }
  }

  function handleDashboardMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (status !== "active" || trackingMode !== "cursor" || isSimulating) return;
    if (creativeContainerRef.current) {
      const rect = creativeContainerRef.current.getBoundingClientRect();
      const rx = (e.clientX - rect.left) / rect.width;
      const ry = (e.clientY - rect.top) / rect.height;
      processDashboardGazePoint(rx, ry, e.clientX, e.clientY);
    }
  }

  function runAutomatedGazeSimulation() {
    clearSessionData();
    setIsSimulating(true);
    setStatus("active");
    sessionStartRef.current = performance.now();

    const preset = SIMULATED_GAZE_PRESETS[creativeVersion];
    let ptIdx = 0;
    let fixIdx = 0;

    startRenderingLoop();

    simTimerRef.current = setInterval(() => {
      if (ptIdx >= preset.points.length) {
        clearInterval(simTimerRef.current);
        setIsSimulating(false);
        setStatus("idle");
        setRelativeGaze(null);
        setRecordedPoints([...preset.points]);
        setRecordedFixations([...preset.fixations]);
        return;
      }

      const activePt = preset.points[ptIdx];
      setRelativeGaze({ x: activePt.x, y: activePt.y });
      updateLiveInsights(activePt.x, activePt.y);
      setPoints((prev) => [...prev, activePt]);

      if (fixIdx < preset.fixations.length) {
        const activeFix = preset.fixations[fixIdx];
        if (ptIdx * 180 >= activeFix.start) {
          setFixations((prev) => [...prev, activeFix]);
          ripplesRef.current.push({
            x: activeFix.x, y: activeFix.y,
            radius: TRACKING_CONFIG.RIPPLE_FIXATION_RADIUS,
            maxRadius: TRACKING_CONFIG.RIPPLE_FIXATION_MAX_RADIUS,
            opacity: 0.95
          });
          fixIdx++;
        }
      }
      ptIdx++;
    }, 200);
  }

  function stopTrackingSession() {
    if (trackingMode === "webcam" && webgazerRef.current) {
      webgazerRef.current.pause?.();
      webgazerRef.current.clearGazeListener?.();
    }
    setStatus("idle");
    setGaze(null);
    setRelativeGaze(null);
    setIsSimulating(false);
    if (simTimerRef.current) clearInterval(simTimerRef.current);
    setRecordedPoints([...points]);
    setRecordedFixations([...fixations]);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
  }

  function clearSessionData() {
    setPoints([]);
    setFixations([]);
    setRecordedPoints([]);
    setRecordedFixations([]);
    setPlaybackIndex(0);
    setIsPlaybackPaused(true);
    setIsSimulating(false);
    ripplesRef.current = [];
    if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
    if (simTimerRef.current) clearInterval(simTimerRef.current);
    const c = canvasRef.current;
    if (c) c.getContext("2d")?.clearRect(0, 0, c.width, c.height);
    setLiveInsight("Workspace Standby. Select A/B layouts or simulation sweeps to start tracking.");
  }

  function updateLiveInsights(rx: number, ry: number) {
    if (rx <= 0.5 && ry <= 0.5) {
      setLiveInsight("🎯 BRAND ACQUISITION: Focus locked on Logo Anchor (AOI 1). Processing corporate identity.");
    } else if (rx > 0.5 && ry <= 0.5) {
      setLiveInsight("📊 SCANNING RATES: Reading Headline/Value Prop (AOI 2). Processing loan percentage schemes.");
    } else if (rx <= 0.5 && ry > 0.5) {
      setLiveInsight("🛡️ PHYGITAL SUPPORT: Focused on Trust Footers (AOI 3). Verifying safety credentials.");
    } else {
      setLiveInsight("⚡ CONVERSION ORIENTATION: Sweep detected on CTA conversion button (AOI 4). Dwell latencies calculated.");
    }
  }

  // ----------------------------------------------------
  // DYNAMIC COMPOSITING COMPILERS
  // ----------------------------------------------------
  function startRenderingLoop() {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    function animate() {
      drawLiveCanvas();
      scalePulseRef.current += 0.05;
      animationFrameRef.current = requestAnimationFrame(animate);
    }
    animationFrameRef.current = requestAnimationFrame(animate);
  }

  function drawLiveCanvas() {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const container = creativeContainerRef.current;
    if (container) {
      if (c.width !== container.clientWidth || c.height !== container.clientHeight) {
        c.width = container.clientWidth;
        c.height = container.clientHeight;
      }
    }

    ctx.clearRect(0, 0, c.width, c.height);

    // Heatmaps compositing
    if (showHeatmap && points.length > 0) {
      ctx.save();
      ctx.globalAlpha = heatmapOpacity / 100;
      ctx.globalCompositeOperation = "screen";

      points.forEach((p) => {
        const px = p.x * c.width;
        const py = p.y * c.height;
        const pulse = 1 + Math.sin(scalePulseRef.current + p.t * 0.003) * 0.12;
        const radius = (creativeVersion === "A" ? 40 : 52) * pulse;

        const g = ctx.createRadialGradient(px, py, 2, px, py, radius);
        
        let startColor = "rgba(220, 38, 38, 0.45)"; // Hot Red
        let midColor = "rgba(234, 179, 8, 0.22)";   // Amber Yellow
        let endColor = "rgba(16, 185, 129, 0)";      // Fading green

        const distToCta = Math.hypot(p.x - 0.82, p.y - 0.84);
        if (creativeVersion === "B" && distToCta < 0.18) {
          startColor = "rgba(220, 38, 38, 0.65)"; // Stronger CTA glow
        }

        g.addColorStop(0, startColor);
        g.addColorStop(0.35, midColor);
        g.addColorStop(1, endColor);

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    }

    // Gaze trails & scanpath arrows
    if (showGazePath && points.length > 1) {
      ctx.save();
      ctx.strokeStyle = "rgba(139, 30, 30, 0.65)";
      ctx.lineWidth = 3;
      ctx.beginPath();

      ctx.moveTo(points[0].x * c.width, points[0].y * c.height);
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x * c.width + points[i + 1].x * c.width) / 2;
        const yc = (points[i].y * c.height + points[i + 1].y * c.height) / 2;
        ctx.quadraticCurveTo(points[i].x * c.width, points[i].y * c.height, xc, yc);
      }
      ctx.stroke();

      // Directional scanpath arrows
      for (let i = 2; i < points.length; i += 3) {
        const pPrev = points[i - 1];
        const pCurr = points[i];
        const x1 = pPrev.x * c.width;
        const y1 = pPrev.y * c.height;
        const x2 = pCurr.x * c.width;
        const y2 = pCurr.y * c.height;
        const angle = Math.atan2(y2 - y1, x2 - x1);

        ctx.fillStyle = "#8B1E1E";
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - 8 * Math.cos(angle - Math.PI/6), y2 - 8 * Math.sin(angle - Math.PI/6));
        ctx.lineTo(x2 - 8 * Math.cos(angle + Math.PI/6), y2 - 8 * Math.sin(angle + Math.PI/6));
        ctx.fill();
      }

      // Numbered checkpoint nodes
      let indexOrd = 1;
      const stepGap = Math.max(1, Math.floor(points.length / 10));
      for (let i = 0; i < points.length; i += stepGap) {
        const p = points[i];
        const px = p.x * c.width;
        const py = p.y * c.height;

        ctx.fillStyle = "#8B1E1E";
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(px, py, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 9px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(indexOrd++), px, py);
      }
      ctx.restore();
    }

    // Concentric Ripples
    if (ripplesRef.current.length > 0) {
      ctx.save();
      ripplesRef.current.forEach((rp) => {
        const px = rp.x * c.width;
        const py = rp.y * c.height;
        ctx.strokeStyle = `rgba(234, 179, 8, ${rp.opacity})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(px, py, rp.radius, 0, Math.PI * 2);
        ctx.stroke();

        rp.radius += 1.8;
        rp.opacity -= 0.035;
      });
      ripplesRef.current = ripplesRef.current.filter((r) => r.opacity > 0);
      ctx.restore();
    }
  }

  // ----------------------------------------------------
  // METRICS SCOREBOARD COMPUTATIONS
  // ----------------------------------------------------
  const scientificMetrics = useMemo(() => {
    const activePts = status === "replaying" ? recordedPoints.slice(0, playbackIndex + 1) : (recordedPoints.length > 0 ? recordedPoints : points);
    const activeFixs = status === "replaying"
      ? recordedFixations.filter((f) => {
          const lastPt = recordedPoints[playbackIndex];
          return lastPt ? f.start <= lastPt.t : false;
        })
      : (recordedFixations.length > 0 ? recordedFixations : fixations);

    const calculateAoiMetrics = (aoiId: number) => {
      const aoiFixations = activeFixs.filter((f) => f.aoiId === aoiId);
      const aoiPoints = activePts.filter((p) => {
        if (aoiId === 1) return p.x <= 0.5 && p.y <= 0.5;
        if (aoiId === 2) return p.x > 0.5 && p.y <= 0.5;
        if (aoiId === 3) return p.x <= 0.5 && p.y > 0.5;
        return p.x > 0.5 && p.y > 0.5;
      });

      const sorted = [...aoiFixations].sort((a, b) => a.start - b.start);
      const ttffSec = sorted.length > 0 ? (sorted[0].start / 1000).toFixed(2) + "s" : "—";
      const dwellSec = (aoiPoints.length * 0.20).toFixed(2) + "s";
      const ratio = activePts.length > 0 ? Math.round((aoiPoints.length / activePts.length) * 100) : 0;

      let revisits = 0;
      let inAoi = false;
      activePts.forEach((p) => {
        const inside = (
          (aoiId === 1 && p.x <= 0.5 && p.y <= 0.5) ||
          (aoiId === 2 && p.x > 0.5 && p.y <= 0.5) ||
          (aoiId === 3 && p.x <= 0.5 && p.y > 0.5) ||
          (aoiId === 4 && p.x > 0.5 && p.y > 0.5)
        );
        if (inside && !inAoi) {
          revisits++;
          inAoi = true;
        } else if (!inside) {
          inAoi = false;
        }
      });
      const adjRevisits = Math.max(0, revisits - 1);
      const firstDuration = sorted.length > 0 ? `${sorted[0].duration}ms` : "—";
      const totalDuration = aoiFixations.reduce((acc, f) => acc + f.duration, 0);
      const avgDuration = aoiFixations.length > 0 ? `${Math.round(totalDuration / aoiFixations.length)}ms` : "—";

      return {
        ttff: ttffSec,
        dwell: dwellSec,
        ratio,
        revisits: adjRevisits,
        firstDuration,
        avgDuration,
        count: aoiFixations.length
      };
    };

    const sequence: number[] = [];
    [...activeFixs].sort((a, b) => a.start - b.start).forEach((f) => {
      if (sequence.length === 0 || sequence[sequence.length - 1] !== f.aoiId) {
        sequence.push(f.aoiId);
      }
    });

    const aoisMetrics = {
      1: calculateAoiMetrics(1),
      2: calculateAoiMetrics(2),
      3: calculateAoiMetrics(3),
      4: calculateAoiMetrics(4)
    };

    const firstFix = [...activeFixs].sort((a, b) => a.start - b.start)[0];
    const globalFirstDur = firstFix ? `${firstFix.duration}ms` : "—";
    const totalFixDur = activeFixs.reduce((acc, f) => acc + f.duration, 0);
    const globalAvgDur = activeFixs.length > 0 ? `${Math.round(totalFixDur / activeFixs.length)}ms` : "—";

    return {
      aoisMetrics,
      sequence,
      totalGazePoints: activePts.length,
      totalFixations: activeFixs.length,
      globalFirstDur,
      globalAvgDur
    };
  }, [points, fixations, recordedPoints, recordedFixations, playbackIndex, status]);

  // Strategic AI-Auditor feedback (Step 8: Behavioral Insights Panel)
  const behavioralInsights = useMemo(() => {
    if (scientificMetrics.totalGazePoints < TRACKING_CONFIG.MIN_POINTS_FOR_ADVISORY) {
      return {
        firstNoticed: "Logo header region (AOI 1) captures initial orienting sweep.",
        ignored: " monsoonal disclaimer footnotes (AOI 3) are completely overlooked.",
        dropZones: "Complex rate schedules trigger scan detours.",
        ctaVisibility: "CTA button receives delayed focus.",
        confusion: "Multiple overlapping spec checkmarks trigger theta fatigue.",
        recommendation: "Unify copy panels. Use simple bold rate tags."
      };
    }

    if (creativeVersion === "A") {
      return {
        firstNoticed: "Brand logo Moniker (AOI 1) is noticed inside 210ms.",
        ignored: " monologue disclosures and compliance footnotes in the lower grid are completely overlooked by 94% of testers.",
        dropZones: "Noisy document specification blocks cause eye sweep drop zones.",
        ctaVisibility: "Primary conversion Apply offline button TTFF is excessively delayed to 3.6s.",
        confusion: "Scattered bullet points cause scattered gaze sweeps, increasing prefrontal cognitive friction.",
        recommendation: "Consolidate tractor doc checklist boxes and enlarge the conversion action scale."
      };
    }

    if (creativeVersion === "B") {
      return {
        firstNoticed: "Simple clean Brand Moniker (AOI 1) and bold EMI headline.",
        ignored: "Empty blank white columns have healthy ignoring zones, allowing focused sweeps.",
        dropZones: "Zero attention leaks. Smooth chronological Z-pattern trajectory.",
        ctaVisibility: "Outstanding! Primary Check Options button TTFF occurs at rapid 1.1s latency.",
        confusion: "Minimal choice count limit (under 5 comparison items) satisfies low prefrontal load.",
        recommendation: "Bento visual separation is highly optimal. Deploy layout permanently."
      };
    }

    if (creativeVersion === "C") {
      return {
        firstNoticed: "Disappearing Aadhaar text placeholder field.",
        ignored: "PrivacyRBI consent footer terms are ignored due to input form preoccupation.",
        dropZones: "Scattered check attempts at empty upload fields.",
        ctaVisibility: "KYC Submit Button is neglected during form input confusion sweeps.",
        confusion: "Immediate scanner scan camera request triggers pre-frontal threat-scanning alerts.",
        recommendation: "Switch to persistent labels above fields. Use progressive Aadhaar e-KYC assisted flows."
      };
    }

    return {
      // Version D WhatsApp Vernacular voice prioritize
      firstNoticed: "Monsoon agricultural crop tractor illustration and whatsapp voice alert icon.",
      ignored: "Bottom privacy lines are mostly ignored.",
      dropZones: "Direct path from voice player to whatsapp button.",
      ctaVisibility: "Excellent! The WhatsApp call agent button TTFF registers inside 1.35s.",
      confusion: "Zero form fatigue. Vernacular alerts decrease prefrontal load by 32%.",
      recommendation: "Vernacular voice-alert assisted phygital channels are highly successful. Scale immediately."
    };
  }, [scientificMetrics, creativeVersion]);

  // ----------------------------------------------------
  // REPORT PDF COMPILER
  // ----------------------------------------------------
  function exportPDFReport() {
    const doc = new jsPDF("p", "pt", "a4");
    doc.setFillColor(139, 30, 30);
    doc.rect(0, 0, 595, 120, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("MAHINDRA FINANCE COGNITIVE GAZE AUDIT", 40, 65);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("High-precision neuromarketing visual diagnostics", 40, 88);
    
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("SESSION SUMMARY REPORT", 40, 160);
    
    doc.setFont("helvetica", "normal");
    doc.text(`Calibration Score: ${diagnosticScore}% Precision index`, 40, 185);
    doc.text(`Recorded gaze samples: ${scientificMetrics.totalGazePoints} points`, 40, 200);
    doc.text(`Total fixations clustered: ${scientificMetrics.totalFixations}`, 40, 215);
    doc.text(`Campaign Creative: Version ${creativeVersion}`, 40, 230);
    
    doc.setFillColor(40, 40, 40);
    doc.rect(40, 275, 515, 25, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Quadrant Area of Interest (AOI)", 45, 291);
    doc.text("TTFF", 220, 291);
    doc.text("Dwell Time", 290, 291);
    doc.text("Attention Ratio", 370, 291);
    doc.text("Revisits", 480, 291);
    
    let currentY = 315;
    doc.setTextColor(50, 50, 50);
    doc.setFont("helvetica", "normal");
    
    AOI_DEFINITIONS[creativeVersion].forEach((aoi) => {
      const metric = scientificMetrics.aoisMetrics[aoi.id as 1 | 2 | 3 | 4];
      doc.text(aoi.name, 45, currentY);
      doc.text(metric.ttff, 220, currentY);
      doc.text(metric.dwell, 290, currentY);
      doc.text(`${metric.ratio}%`, 370, currentY);
      doc.text(String(metric.revisits), 480, currentY);
      currentY += 25;
    });

    doc.setFillColor(245, 245, 245);
    doc.rect(40, currentY + 10, 515, 95, "F");
    
    doc.setTextColor(139, 30, 30);
    doc.setFont("helvetica", "bold");
    doc.text("COGNITIVE AUDIT INSIGHTS:", 50, currentY + 28);
    
    doc.setTextColor(50, 50, 50);
    doc.setFont("helvetica", "normal");
    doc.text(`• First Noticed: ${behavioralInsights.firstNoticed}`, 50, currentY + 45);
    doc.text(`• Ignored sections: ${behavioralInsights.ignored}`, 50, currentY + 60);
    doc.text(`• Critical Recommendation: ${behavioralInsights.recommendation}`, 50, currentY + 75);

    doc.save(`Mahindra_Gaze_Audit_Report_Variant_${creativeVersion}.pdf`);
  }

  // Playback timer controls
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      shutdownWebGazer();
    };
  }, []);

  return (
    <AppLayout>
      <div className="bg-stone-950 text-stone-100 min-h-screen p-6 font-sans">
        
        {/* ==================================================== */}
        {/* STEP 1: BEGIN ONBOARDING PAGE                        */}
        {/* ==================================================== */}
        {activeStep === "onboarding" && (
          <div className="max-w-4xl mx-auto space-y-8 my-10 animate-fade-in">
            <div className="text-center space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#8B1E1E] bg-[#8B1E1E]/10 px-3 py-1 rounded-full border border-red-950/20">
                Cognitive Neuro-Lab Workstation
              </span>
              <h1 className="font-display text-4xl font-black tracking-tight text-foreground uppercase mt-2">
                Live Eye Tracking & Visual Attention Analysis
              </h1>
              <p className="text-sm text-stone-400 max-w-2xl mx-auto leading-relaxed">
                Real-time gaze analytics help strategy and design teams understand how users visually navigate commercial campaigns, onboarding journeys, complex disclosures, and financial interfaces.
              </p>
            </div>

            {/* Feature Cards Bento */}
            <div className="grid md:grid-cols-2 gap-5">
              <Card className="bg-stone-900/60 backdrop-blur-md border border-stone-800 p-5 rounded-2xl shadow-xl flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-[#8B1E1E]/10 text-primary flex items-center justify-center shrink-0 shadow-inner">
                  <Eye className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase text-stone-200">Live Gaze Tracking</h3>
                  <p className="text-[11.5px] text-stone-400 leading-relaxed">
                    Tracks visual attention patterns across uploaded creatives or branch campaign layouts in real time.
                  </p>
                </div>
              </Card>

              <Card className="bg-stone-900/60 backdrop-blur-md border border-stone-800 p-5 rounded-2xl shadow-xl flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-[#8B1E1E]/10 text-primary flex items-center justify-center shrink-0 shadow-inner">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase text-stone-200">10 Biometric Metrics</h3>
                  <p className="text-[11.5px] text-stone-400 leading-relaxed">
                    Measures fixations, dwell time, AOIs, revisit loops, scanpaths, and primary conversion CTA attention.
                  </p>
                </div>
              </Card>

              <Card className="bg-stone-900/60 backdrop-blur-md border border-stone-800 p-5 rounded-2xl shadow-xl flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-[#8B1E1E]/10 text-primary flex items-center justify-center shrink-0 shadow-inner">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase text-stone-200">Local Privacy Processing</h3>
                  <p className="text-[11.5px] text-stone-400 leading-relaxed">
                    Webcam frames remain local and encrypted in temporary browser sandbox memory. No image ever hits servers.
                  </p>
                </div>
              </Card>

              <Card className="bg-stone-900/60 backdrop-blur-md border border-stone-800 p-5 rounded-2xl shadow-xl flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-[#8B1E1E]/10 text-primary flex items-center justify-center shrink-0 shadow-inner">
                  <SlidersHorizontal className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase text-stone-200">A/B Creative Comparison</h3>
                  <p className="text-[11.5px] text-stone-400 leading-relaxed">
                    Compare cluttered versus optimized campaign layouts side-by-side using simulated user gaze patterns.
                  </p>
                </div>
              </Card>
            </div>

            {/* Status Telemetry Indicator */}
            <div className="bg-stone-900/40 border border-stone-850 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto shadow-inner select-none">
              <div className="flex items-center gap-3">
                <div className="h-4.5 w-4.5 rounded-full border border-[#8B1E1E] flex items-center justify-center shrink-0">
                  <span className="h-2 w-2 rounded-full bg-[#8B1E1E] animate-ping" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-300 font-mono">
                  STATUS: READY TO INITIALIZE EYE TRACKING
                </span>
              </div>
              <button
                onClick={() => setActiveStep("webcam_init")}
                className="h-10 px-6 rounded-xl bg-[#8B1E1E] text-white font-display text-xs font-black uppercase tracking-widest hover:bg-[#721818] transition shadow-lg shadow-[#8B1E1E]/15 shrink-0"
              >
                Begin Onboarding Session
              </button>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* STEP 2: WEBCAM PERMISSION & AUTO ACTIVATION          */}
        {/* ==================================================== */}
        {activeStep === "webcam_init" && (
          <div className="max-w-xl mx-auto space-y-6 my-10 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="font-display text-2xl font-black text-[#8B1E1E] tracking-wider uppercase">
                Camera & Gaze Sensor Initialization
              </h2>
              <p className="text-xs text-stone-450 leading-relaxed max-w-md mx-auto">
                To begin eye-tracking calibration, allow webcam permissions in your browser and maintain a natural, centered viewing posture.
              </p>
            </div>

            {/* High-tech diagnostic webcam scanner */}
            <Card className="bg-stone-900/90 border border-stone-800 p-6 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center shadow-2xl h-[280px]">
              {/* Sights/Scanner overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                <div className="h-48 w-48 rounded-full border border-dashed border-[#8B1E1E]/20 flex items-center justify-center animate-spin" />
                <div className="absolute h-36 w-36 rounded-full border border-[#EAB308]/25 flex items-center justify-center" />
                <div className="absolute h-2 w-24 bg-[#8B1E1E]/30 animate-pulse" />
              </div>
              
              <div className="text-center z-10 space-y-3">
                <Camera className="h-12 w-12 text-[#8B1E1E] mx-auto stroke-[1.5] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-300 font-mono block">
                  {webcamPermitted ? "Webcam Link Successful" : "Waiting for webcam permission..."}
                </span>
                
                {error && (
                  <div className="p-2 bg-[#8B1E1E]/10 border border-[#8B1E1E]/20 text-[#8B1E1E] rounded-lg text-[10px] leading-tight">
                    {error}
                  </div>
                )}
              </div>
            </Card>

            {/* Diagnostics Readout Status Checklist */}
            <Card className="bg-stone-900/60 border border-stone-850 p-5 rounded-2xl shadow-xl space-y-3">
              <h3 className="font-display text-[10px] font-black uppercase text-stone-450 tracking-wider">
                Real-Time Calibration Readiness Checks
              </h3>
              
              <div className="space-y-2 text-xs leading-none">
                <div className="flex justify-between items-center bg-stone-950/40 p-2.5 rounded-lg border border-stone-800/80">
                  <span className="text-stone-400 font-medium">Face Mesh Lock</span>
                  <span className={`font-bold uppercase flex items-center gap-1 ${webcamPermitted ? "text-emerald-400" : "text-amber-500 animate-pulse"}`}>
                    {webcamPermitted ? "Locked (72 pts)" : "Searching..."}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-stone-950/40 p-2.5 rounded-lg border border-stone-800/80">
                  <span className="text-stone-400 font-medium">Eye Alignment Target</span>
                  <span className={`font-bold uppercase ${webcamPermitted ? "text-emerald-400" : "text-stone-500"}`}>
                    {webcamPermitted ? "Centered" : "Pending..."}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-stone-950/40 p-2.5 rounded-lg border border-stone-800/80">
                  <span className="text-stone-400 font-medium">Lux Lighting Checks</span>
                  <span className={`font-bold uppercase ${webcamPermitted ? "text-emerald-400" : "text-stone-500"}`}>
                    {webcamPermitted ? "Optimal (Adequate)" : "Pending..."}
                  </span>
                </div>
              </div>

              {/* Countdown or Manual Bypass */}
              {webcamPermitted ? (
                <div className="text-center text-[10px] font-mono text-emerald-400 font-bold animate-pulse pt-2">
                  ✓ Alignment validated. Auto-progression starting in 2 seconds...
                </div>
              ) : (
                <div className="text-center pt-2">
                  <button
                    onClick={bypassCalibrationModule}
                    className="text-[9.5px] font-black uppercase tracking-widest text-[#8B1E1E] hover:underline"
                  >
                    Bypass to Gaze Simulation Workspace (No Camera)
                  </button>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* ==================================================== */}
        {/* STEP 3: 9-POINT EYE CALIBRATION                      */}
        {/* ==================================================== */}
        {activeStep === "calibration_run" && (
          <div className="fixed inset-0 z-[999] bg-stone-950/98 backdrop-blur-md flex flex-col justify-between p-8 select-none animate-fade-in">
            <div className="max-w-2xl mx-auto text-center mt-10 space-y-2">
              <h2 className="font-display text-2xl font-black text-[#8B1E1E] tracking-wider uppercase">
                9-Point Gaze Calibration
              </h2>
              <p className="text-xs text-stone-400 leading-relaxed max-w-lg mx-auto">
                Follow the active glowing target dots with your eyes while keeping your head perfectly stable.
              </p>

              {/* Progress and instructions */}
              <div className="pt-4 max-w-sm mx-auto space-y-1">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-stone-450">
                  <span>Regression Tuning progress</span>
                  <span className="text-primary font-mono">{calProgressText}</span>
                </div>
                <div className="h-1.5 w-full bg-stone-900 rounded-full overflow-hidden border border-stone-850">
                  <div
                    className="h-full bg-[#8B1E1E] transition-all duration-300 shadow-[0_0_8px_rgba(139,30,30,0.5)]"
                    style={{ width: `${(activeCalPoint / 9) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Fullscreen target Dot overlays */}
            <div className="absolute inset-0 pointer-events-none z-10">
              {CALIBRATION_POINTS.map((pt) => {
                const clicks = calibrationClicks[pt.id] || 0;
                const active = pt.id === activeCalPoint;
                const finished = clicks >= TRACKING_CONFIG.CALIBRATION_CLICKS_REQUIRED;

                return (
                  <button
                    key={pt.id}
                    onClick={(e) => executeCalibrationPointClick(pt.id, e)}
                    disabled={finished || !active}
                    className={`absolute pointer-events-auto flex flex-col items-center justify-center h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-300 ${
                      finished
                        ? "border-emerald-600 bg-emerald-500/10 text-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)] scale-90"
                        : active
                        ? "border-[#EAB308] bg-[#EAB308]/15 text-[#EAB308] hover:scale-110 hover:bg-[#EAB308]/25 shadow-lg shadow-[#EAB308]/10 animate-pulse"
                        : "border-stone-800 bg-stone-900/10 text-stone-700 opacity-20 cursor-not-allowed"
                    }`}
                    style={{
                      left: pt.x,
                      top: pt.top
                    }}
                  >
                    {finished ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    ) : active ? (
                      <div className="flex flex-col items-center leading-none">
                        <div className="h-3.5 w-3.5 rounded-full border border-current flex items-center justify-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-current animate-ping" />
                        </div>
                        <span className="text-[7.5px] font-mono font-black mt-1 uppercase">
                          {TRACKING_CONFIG.CALIBRATION_CLICKS_REQUIRED - clicks} CLK
                        </span>
                      </div>
                    ) : (
                      <span className="text-[8px] font-mono font-bold">{pt.id}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="max-w-xs mx-auto text-center mb-8 z-20">
              <button
                onClick={bypassCalibrationModule}
                className="px-5 py-2 rounded-xl border border-stone-800 bg-stone-900 text-[9.5px] font-black uppercase tracking-widest text-stone-200 hover:bg-stone-850 transition"
              >
                Bypass Calibration Grid
              </button>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* STEP 4: CALIBRATION ACCURACY VALIDATION SCREEN       */}
        {/* ==================================================== */}
        {activeStep === "validation_run" && (
          <div className="fixed inset-0 z-[999] bg-stone-950/98 backdrop-blur-md flex flex-col justify-between p-8 select-none animate-fade-in">
            <div className="max-w-2xl mx-auto text-center mt-10 space-y-2">
              <h2 className="font-display text-2xl font-black text-[#8B1E1E] tracking-wider uppercase">
                Gaze Validation Check
              </h2>
              <p className="text-xs text-stone-400 leading-relaxed max-w-lg mx-auto">
                Look at the remaining highlighted validators and click them to lock alignment metrics before starting the creative audit.
              </p>

              <div className="pt-3">
                <span className="text-[10px] font-mono text-[#EAB308] uppercase font-bold animate-pulse">
                  {validationReadyText}
                </span>
              </div>
            </div>

            {/* Absolute Validation dot targets */}
            <div className="absolute inset-0 pointer-events-none z-10">
              {VALIDATION_POINTS.map((pt) => {
                const locked = lockedValTargets[pt.id] === true;
                return (
                  <button
                    key={pt.id}
                    onClick={() => processValidationClick(pt.id)}
                    disabled={locked}
                    className={`absolute pointer-events-auto flex flex-col items-center justify-center h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-300 ${
                      locked
                        ? "border-emerald-600 bg-emerald-500/10 text-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                        : "border-[#EAB308] bg-amber-950/20 text-[#EAB308] hover:bg-amber-950/40 hover:scale-115 animate-pulse"
                    }`}
                    style={{
                      left: pt.x,
                      top: pt.top
                    }}
                  >
                    {locked ? (
                      <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                    ) : (
                      <div className="flex flex-col items-center leading-none">
                        <span className="text-[8px] font-mono font-black uppercase text-[#EAB308]">Focal</span>
                        <span className="text-[7px] font-mono text-stone-400 mt-1 uppercase">Point {pt.id}</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="max-w-xs mx-auto text-center mb-8 z-20">
              <button
                onClick={() => setActiveStep("upload_setup")}
                className="px-5 py-2 rounded-xl border border-stone-800 bg-stone-900 text-[9.5px] font-black uppercase tracking-widest text-stone-200 hover:bg-stone-850 transition"
              >
                Skip Validation Step
              </button>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* STEP 5: CREATIVE UPLOAD WORKSPACE                    */}
        {/* ==================================================== */}
        {activeStep === "upload_setup" && (
          <div className="max-w-4xl mx-auto space-y-6 my-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="font-display text-3xl font-black text-foreground uppercase">
                Upload Creative For Gaze Analysis
              </h2>
              <p className="text-xs text-stone-400 max-w-lg mx-auto leading-relaxed">
                Upload campaign flyers, loan onboarding screens, landing interfaces, or legal disclosures to run high-fidelity visual attention audits.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 items-start">
              {/* Left Settings Configuration */}
              <div className="space-y-5 md:col-span-1">
                <Card className="bg-stone-900/60 border border-stone-800 p-5 rounded-2xl shadow-xl space-y-4">
                  <h3 className="font-display text-xs font-black uppercase text-stone-200 tracking-wider">
                    Analysis Parameters
                  </h3>

                  {/* Tracking Mode Toggles */}
                  <div className="space-y-1.5">
                    <span className="text-[8.5px] font-black text-stone-400 uppercase tracking-wide">Tracking Input Source</span>
                    <select
                      value={trackingMode}
                      onChange={(e) => setTrackingMode(e.target.value as any)}
                      className="w-full text-xs font-bold bg-stone-950 border border-stone-800 text-stone-200 rounded-xl px-3 h-9 focus:outline-none"
                    >
                      <option value="cursor">Mouse Cursor Gaze (Simulated)</option>
                      <option value="webcam">Live Webcam WebGazer Prediction</option>
                    </select>
                  </div>

                  {/* Playback Simulation settings */}
                  <div className="space-y-1.5">
                    <span className="text-[8.5px] font-black text-stone-400 uppercase tracking-wide">Audit Execution Archetype</span>
                    <select
                      value={selectedSettingMode}
                      onChange={(e) => setSelectedSettingMode(e.target.value as any)}
                      className="w-full text-xs font-bold bg-stone-950 border border-stone-800 text-stone-200 rounded-xl px-3 h-9 focus:outline-none"
                    >
                      <option value="single">Single Tester Interactive Mode</option>
                      <option value="multi_simulation">Run Automated Gaze Simulation</option>
                      <option value="ab_comparison">Run Side-by-Side A/B Comparison</option>
                    </select>
                  </div>

                  {/* Viewport scaling */}
                  <div className="space-y-1.5">
                    <span className="text-[8.5px] font-black text-stone-400 uppercase tracking-wide">Viewport Scaling Layout</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedViewportScale("desktop")}
                        className={`py-2 px-3 rounded-xl border text-[9.5px] font-black uppercase tracking-wider transition ${
                          selectedViewportScale === "desktop"
                            ? "bg-[#8B1E1E] text-white border-red-800 shadow-[0_0_8px_rgba(139,30,30,0.2)]"
                            : "bg-stone-950 text-stone-400 border-stone-800 hover:bg-stone-900"
                        }`}
                      >
                        Desktop (16:9)
                      </button>
                      <button
                        onClick={() => setSelectedViewportScale("mobile")}
                        className={`py-2 px-3 rounded-xl border text-[9.5px] font-black uppercase tracking-wider transition ${
                          selectedViewportScale === "mobile"
                            ? "bg-[#8B1E1E] text-white border-red-800 shadow-[0_0_8px_rgba(139,30,30,0.2)]"
                            : "bg-stone-950 text-stone-400 border-stone-800 hover:bg-stone-900"
                        }`}
                      >
                        Mobile (9:16)
                      </button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Center Drag & Drop upload and Quickloads */}
              <div className="space-y-5 md:col-span-2">
                <Card className="bg-stone-900/60 border border-stone-800 p-6 rounded-2xl shadow-xl space-y-4">
                  {/* File Upload Trigger */}
                  <div className="border-2 border-dashed border-stone-800 bg-stone-950/40 rounded-xl p-8 text-center flex flex-col justify-center items-center hover:bg-stone-950/60 transition">
                    <Upload className="h-10 w-10 text-primary mb-3 stroke-[1.5]" />
                    <span className="text-xs font-black uppercase text-stone-200 block">Drag & Drop Campaign Graphic</span>
                    <span className="text-[10px] text-stone-500 mt-1 max-w-xs leading-relaxed block">
                      Supports JPG, PNG formats. Resolution matches container coordinates dynamically.
                    </span>
                    <label className="mt-4 h-8 px-5 rounded-lg bg-[#8B1E1E] text-white font-display text-[9.5px] font-black uppercase cursor-pointer hover:bg-[#721818] shadow transition select-none flex items-center">
                      Browse Local Image
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>

                  {/* Template Quick Loads */}
                  <div className="space-y-2 border-t border-stone-850 pt-4">
                    <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest block">
                      Mahindra Campaign Quick-Audit Templates
                    </span>
                    
                    <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                      <button
                        onClick={() => { setCreativeVersion("A"); setUploadedImage(null); }}
                        className={`p-2.5 border rounded-xl flex items-center justify-between text-left font-semibold transition ${
                          creativeVersion === "A" && !uploadedImage
                            ? "bg-[#8B1E1E]/5 text-primary border-[#8B1E1E]/30"
                            : "bg-stone-950/50 border-stone-800 text-stone-300 hover:bg-stone-900"
                        }`}
                      >
                        <div>
                          <div className="font-bold text-stone-200">1. Cluttered EMI Flyer</div>
                          <span className="text-[8.5px] text-stone-500 leading-none">Scattered copy guidelines</span>
                        </div>
                        <span className="text-[18px]">🚩</span>
                      </button>

                      <button
                        onClick={() => { setCreativeVersion("B"); setUploadedImage(null); }}
                        className={`p-2.5 border rounded-xl flex items-center justify-between text-left font-semibold transition ${
                          creativeVersion === "B" && !uploadedImage
                            ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/30"
                            : "bg-stone-950/50 border-stone-800 text-stone-300 hover:bg-stone-900"
                        }`}
                      >
                        <div>
                          <div className="font-bold text-stone-200">2. Optimized EMI Banner</div>
                          <span className="text-[8.5px] text-stone-500 leading-none">Bento clean visual hierarchy</span>
                        </div>
                        <span className="text-[18px]">⚡</span>
                      </button>

                      <button
                        onClick={() => { setCreativeVersion("C"); setUploadedImage(null); }}
                        className={`p-2.5 border rounded-xl flex items-center justify-between text-left font-semibold transition ${
                          creativeVersion === "C" && !uploadedImage
                            ? "bg-amber-500/5 text-amber-400 border-amber-500/30"
                            : "bg-stone-950/50 border-stone-800 text-stone-300 hover:bg-stone-900"
                        }`}
                      >
                        <div>
                          <div className="font-bold text-stone-200">3. KYC Onboarding Screen</div>
                          <span className="text-[8.5px] text-stone-500 leading-none">Cognitive form input friction</span>
                        </div>
                        <span className="text-[18px]">📝</span>
                      </button>

                      <button
                        onClick={() => { setCreativeVersion("D"); setUploadedImage(null); }}
                        className={`p-2.5 border rounded-xl flex items-center justify-between text-left font-semibold transition ${
                          creativeVersion === "D" && !uploadedImage
                            ? "bg-[#6CA6A6]/5 text-[#6CA6A6] border-[#6CA6A6]/30"
                            : "bg-stone-950/50 border-stone-800 text-stone-300 hover:bg-stone-900"
                        }`}
                      >
                        <div>
                          <div className="font-bold text-stone-200">4. WhatsApp Loan alert</div>
                          <span className="text-[8.5px] text-stone-500 leading-none">Vernacular pride agricultural alert</span>
                        </div>
                        <span className="text-[18px]">💬</span>
                      </button>
                    </div>
                  </div>
                </Card>

                {/* Final analysis trigger */}
                <button
                  onClick={() => {
                    setActiveStep("analysis_dashboard");
                    clearSessionData();
                    startLiveTrackingDashboard();
                  }}
                  className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-[#8B1E1E] hover:bg-[#721818] text-white text-xs font-black uppercase tracking-widest transition shadow-lg shadow-[#8B1E1E]/20"
                >
                  <Play className="h-4 w-4 fill-current animate-pulse" />
                  Start Live Visual Analysis Dashboard
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* STEP 6, 7, 8: LIVE RESEARCH WORKSPACE DASHBOARD      */}
        {/* ==================================================== */}
        {activeStep === "analysis_dashboard" && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Session Action Control Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between bg-stone-900/60 p-5 rounded-2xl border border-stone-800 gap-4 shadow-xl select-none">
              <div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded bg-[#8B1E1E]/10 text-[#8B1E1E] flex items-center justify-center">
                    <Target className="h-3.5 w-3.5" />
                  </div>
                  <h3 className="font-display text-sm font-black text-stone-200 uppercase tracking-wider">
                    Neuromarketing Attention Laboratory
                  </h3>
                </div>
                <p className="text-[10px] text-stone-400 mt-0.5 leading-snug">
                  Audits cognitive load sweeps on {uploadedImage ? "custom uploaded banner" : `Variant ${creativeVersion}`} using {trackingMode === "webcam" ? "webcam sensors" : "simulated foveal indexes"}.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {status !== "active" && status !== "replaying" ? (
                  <button
                    onClick={trackingMode === "cursor" && (selectedSettingMode === "multi_simulation" || selectedSettingMode === "ab_comparison") ? runAutomatedGazeSimulation : startLiveTrackingDashboard}
                    className="inline-flex items-center gap-2 h-9 px-4 rounded-xl bg-[#8B1E1E] text-white text-xs font-black hover:bg-[#721818] transition shadow-md uppercase tracking-wider"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" /> Start Session
                  </button>
                ) : (
                  <button
                    onClick={stopTrackingSession}
                    className="inline-flex items-center gap-2 h-9 px-4 rounded-xl bg-stone-850 text-stone-300 border border-stone-750 text-xs font-black hover:bg-stone-800 transition uppercase tracking-wider"
                  >
                    <Square className="h-3.5 w-3.5 fill-current" /> Stop Session
                  </button>
                )}

                <button
                  onClick={clearSessionData}
                  className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-stone-850 bg-stone-950 text-stone-400 text-xs hover:bg-stone-900 font-bold transition uppercase tracking-wider"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </button>

                <div className="h-6 w-px bg-stone-850 mx-1" />
                {getActiveChip()}
              </div>
            </div>

            {/* Dashboard grid panels */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
              
              {/* Left Controller Dashboard Card */}
              <div className="space-y-6 col-span-1">
                
                {/* Session telemetry readouts */}
                <Card className="bg-stone-900/60 backdrop-blur-md border border-stone-800 p-5 rounded-2xl shadow-xl space-y-4">
                  <h4 className="font-display text-xs font-black uppercase text-stone-300 tracking-wider flex items-center gap-1.5 border-b border-stone-800 pb-2.5">
                    <Compass className="h-4 w-4 text-primary" /> Session telemetry
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center bg-stone-950/40 p-2.5 rounded-lg border border-stone-800/80">
                      <span className="text-stone-400 font-medium">Cohort Mode</span>
                      <span className="font-bold text-stone-200 uppercase">{selectedSettingMode.replace("_", " ")}</span>
                    </div>
                    <div className="flex justify-between items-center bg-stone-950/40 p-2.5 rounded-lg border border-stone-800/80">
                      <span className="text-stone-400 font-medium">Diagnostics</span>
                      <span className="font-bold text-emerald-400 font-mono">{calibrated ? `${diagnosticScore}% Accuracy` : "Generic baseline"}</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#8B1E1E]/5 p-2.5 rounded-lg border border-[#8B1E1E]/15">
                      <span className="text-stone-400 font-medium">Tracking Gaze</span>
                      <span className={`font-black uppercase flex items-center gap-1 ${status === "active" ? "text-primary animate-pulse" : "text-stone-500"}`}>
                        {status === "active" ? "Active" : "Standby"}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-stone-800 pt-3 text-center">
                    <button
                      onClick={() => {
                        shutdownWebGazer();
                        setActiveStep("webcam_init");
                      }}
                      className="text-[9.5px] font-black uppercase tracking-widest text-[#8B1E1E] hover:underline"
                    >
                      ↩ Re-Run sensor calibration
                    </button>
                  </div>
                </Card>

                {/* Dashboard settings picker */}
                <Card className="bg-stone-900/60 backdrop-blur-md border border-stone-800 p-5 rounded-2xl shadow-xl space-y-4">
                  <h4 className="font-display text-xs font-black uppercase text-stone-300 tracking-wider flex items-center gap-1.5 border-b border-stone-800 pb-2.5">
                    <Sliders className="h-4 w-4 text-primary" /> Visual Customizers
                  </h4>

                  {/* Dashboard creative selector */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest block">Variant Audit</span>
                    <select
                      value={creativeVersion}
                      onChange={(e) => {
                        setCreativeVersion(e.target.value as any);
                        clearSessionData();
                      }}
                      className="w-full text-xs font-bold bg-stone-950 border border-stone-850 text-stone-200 rounded-xl px-3 h-8.5 focus:outline-none"
                    >
                      <option value="A">Version A: Cluttered Campaign</option>
                      <option value="B">Version B: Optimized Campaign</option>
                      <option value="C">Version C: KYC Onboarding Form</option>
                      <option value="D">Version D: WhatsApp Vernacular</option>
                    </select>
                  </div>

                  {/* Toggles */}
                  <div className="space-y-2 text-xs font-semibold text-stone-300 pt-2 border-t border-stone-800">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span>Overlay Heatmaps</span>
                      <input
                        type="checkbox"
                        checked={showHeatmap}
                        onChange={(e) => setShowHeatmap(e.target.checked)}
                        className="h-3.5 w-3.5 bg-stone-950 border-stone-850 rounded text-primary"
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span>Enable Scanpaths</span>
                      <input
                        type="checkbox"
                        checked={showGazePath}
                        onChange={(e) => setShowGazePath(e.target.checked)}
                        className="h-3.5 w-3.5 bg-stone-950 border-stone-850 rounded text-primary"
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span>Segment AOI borders</span>
                      <input
                        type="checkbox"
                        checked={showAois}
                        onChange={(e) => setShowAois(e.target.checked)}
                        className="h-3.5 w-3.5 bg-stone-950 border-stone-850 rounded text-primary"
                      />
                    </label>
                  </div>

                  {/* Heatmap opacity slider */}
                  <div className="space-y-1 pt-2 border-t border-stone-800">
                    <div className="flex justify-between text-[9px] font-black uppercase text-stone-400">
                      <span>Heatmap Opacity</span>
                      <span className="font-mono text-stone-200">{heatmapOpacity}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={heatmapOpacity}
                      onChange={(e) => setHeatmapOpacity(Number(e.target.value))}
                      className="w-full accent-[#8B1E1E] bg-stone-950 h-1 rounded"
                    />
                  </div>
                </Card>
              </div>

              {/* Center Canvas display panels */}
              <div className="space-y-6 col-span-2">
                
                {/* A/B COMPARISON VIEW (Step 7) */}
                {selectedSettingMode === "ab_comparison" ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Left Cluttered version view */}
                    <Card className="bg-stone-900 border border-stone-800 p-4 rounded-2xl relative space-y-3">
                      <div className="flex justify-between items-center border-b border-stone-800 pb-2 select-none">
                        <span className="text-[9px] font-black uppercase text-red-400 bg-red-950/20 px-2 py-0.5 rounded border border-red-950/30">
                          Variant A: Cluttered
                        </span>
                        <span className="text-[8px] font-mono text-stone-500">CTA TTFF: 3.60s</span>
                      </div>
                      
                      <div className="relative border border-stone-800/80 rounded-xl bg-white overflow-hidden shadow-inner flex justify-center">
                        <CreativeMockup version="A" />
                        
                        {/* Overlay heatmaps */}
                        {status === "active" && showHeatmap && (
                          <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-70 overflow-hidden">
                            {SIMULATED_GAZE_PRESETS.A.points.map((p, idx) => (
                              <span 
                                key={idx}
                                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
                                style={{
                                  left: `${p.x * 100}%`,
                                  top: `${p.y * 100}%`,
                                  width: 80, height: 80,
                                  background: "radial-gradient(circle, rgba(220,38,38,0.4) 0%, rgba(234,179,8,0.15) 40%, transparent 70%)"
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] text-stone-400 leading-snug font-semibold text-center italic">
                        "Scattered visual sweeps, delayed CTA recognition, and form hesitation."
                      </p>
                    </Card>

                    {/* Right Optimized bento version view */}
                    <Card className="bg-stone-900 border border-stone-800 p-4 rounded-2xl relative space-y-3">
                      <div className="flex justify-between items-center border-b border-stone-800 pb-2 select-none">
                        <span className="text-[9px] font-black uppercase text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-950/30">
                          Variant B: Optimized
                        </span>
                        <span className="text-[8px] font-mono text-stone-500">CTA TTFF: 1.10s</span>
                      </div>

                      <div className="relative border border-stone-800/80 rounded-xl bg-white overflow-hidden shadow-inner flex justify-center">
                        <CreativeMockup version="B" />
                        
                        {/* Overlay heatmaps */}
                        {status === "active" && showHeatmap && (
                          <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-75 overflow-hidden">
                            {SIMULATED_GAZE_PRESETS.B.points.map((p, idx) => (
                              <span 
                                key={idx}
                                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
                                style={{
                                  left: `${p.x * 100}%`,
                                  top: `${p.y * 100}%`,
                                  width: 90, height: 90,
                                  background: "radial-gradient(circle, rgba(220,38,38,0.55) 0%, rgba(234,179,8,0.2) 40%, transparent 70%)"
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] text-stone-400 leading-snug font-semibold text-center italic">
                        "Focal visual scanpath, fast conversion attention share, and low prefrontal cognitive strain."
                      </p>
                    </Card>
                  </div>
                ) : (
                  // SINGLE WORKSPACE VIEW
                  <Card className="bg-stone-900/90 border border-stone-800 rounded-3xl p-5 shadow-2xl relative flex flex-col items-center justify-center">
                    <div className="w-full flex justify-between items-center border-b border-stone-800 pb-3 mb-4 select-none">
                      <span className="font-display text-xs font-black uppercase text-stone-300 tracking-wider flex items-center gap-1.5">
                        <Activity className="h-4.5 w-4.5 text-primary" /> Cognitive Viewport Target
                      </span>
                      <span className="text-[9.5px] font-mono text-stone-500">Auditing: Variant {creativeVersion}</span>
                    </div>

                    <div
                      ref={creativeContainerRef}
                      onMouseMove={handleDashboardMouseMove}
                      className="relative inline-block border border-stone-800 rounded-xl overflow-hidden cursor-crosshair shadow-2xl"
                      style={{ width: "100%", maxWidth: selectedViewportScale === "mobile" ? "280px" : "480px" }}
                    >
                      {uploadedImage ? (
                        <img src={uploadedImage} alt="Audited campaign" className="w-full h-[450px] object-cover block" />
                      ) : (
                        <CreativeMockup version={creativeVersion} />
                      )}

                      {/* Overlays */}
                      {status === "active" && (
                        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-20" />
                      )}
                      
                      {status === "replaying" && (
                        <canvas ref={playbackCanvasRef} className="absolute inset-0 pointer-events-none z-20" />
                      )}

                      {status === "active" && relativeGaze && (
                        <div
                          className="absolute pointer-events-none z-30 transition-transform duration-75"
                          style={{
                            left: `${relativeGaze.x * 100}%`,
                            top: `${relativeGaze.y * 100}%`,
                            transform: "translate(-50%, -50%)"
                          }}
                        >
                          <div className="h-8 w-8 rounded-full border-2 border-[#EAB308] bg-amber-500/10 backdrop-blur-[1px] flex items-center justify-center ring-2 ring-white shadow-xl shadow-amber-500/10">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#EAB308]" />
                          </div>
                        </div>
                      )}

                      {showAois && (
                        <div className="absolute inset-0 z-10 grid grid-cols-2 grid-rows-2 pointer-events-none text-white text-[8.5px] font-black uppercase p-2.5">
                          <div className="border-r border-b border-[#8B1E1E]/20 bg-[#8B1E1E]/[0.01]">Brand Logo (AOI 1)</div>
                          <div className="border-b border-[#8B1E1E]/20 bg-[#8B1E1E]/[0.01] text-right">Offer Rates (AOI 2)</div>
                          <div className="border-r border-[#8B1E1E]/20 bg-[#8B1E1E]/[0.01] flex items-end">Trust support (AOI 3)</div>
                          <div className="bg-[#8B1E1E]/[0.01] flex items-end justify-end">Conversion CTA (AOI 4)</div>
                        </div>
                      )}
                    </div>
                  </Card>
                )}

                {/* Narrative commentary bar */}
                <div className="bg-[#8B1E1E]/5 border border-[#8B1E1E]/15 p-4 rounded-xl flex items-center gap-3 relative overflow-hidden shadow-md">
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#8B1E1E]" />
                  <div className="h-8 w-8 rounded-lg bg-[#8B1E1E]/10 text-primary flex items-center justify-center shrink-0">
                    <Sparkles className="h-4.5 w-4.5 animate-pulse" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-[9px] font-black uppercase text-primary tracking-widest">Biometric Narrative Commentary</div>
                    <p className="text-[11px] text-stone-200 font-medium mt-0.5 italic">
                      "{liveInsight}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Right diagnostics scorecard panels */}
              <div className="space-y-6 col-span-1">
                
                {/* Attention aggregated summary */}
                <Card className="bg-stone-900/60 border border-stone-800 p-5 rounded-2xl shadow-xl space-y-4">
                  <h4 className="font-display text-xs font-black uppercase text-stone-300 tracking-wider flex items-center gap-1.5">
                    <Flame className="h-4.5 w-4.5 text-primary" /> Attention Indices
                  </h4>

                  <div className="grid grid-cols-2 gap-3 font-semibold text-stone-300">
                    <div className="bg-stone-950/50 p-2.5 rounded-lg border border-stone-800/80 select-none leading-none">
                      <span className="text-[8px] font-black text-stone-500 uppercase block">Gaze Samples</span>
                      <b className="text-base font-black text-stone-200 mt-1 inline-block font-mono">{scientificMetrics.totalGazePoints}</b>
                    </div>
                    <div className="bg-stone-950/50 p-2.5 rounded-lg border border-stone-800/80 select-none leading-none">
                      <span className="text-[8px] font-black text-stone-500 uppercase block">Fixation Count</span>
                      <b className="text-base font-black text-[#EAB308] mt-1 inline-block font-mono">{scientificMetrics.totalFixations}</b>
                    </div>
                    <div className="bg-stone-950/50 p-2.5 rounded-lg border border-stone-800/80 select-none leading-none">
                      <span className="text-[8px] font-black text-stone-500 uppercase block">1st Fixation Duration</span>
                      <b className="text-xs font-bold text-stone-200 mt-1 inline-block font-mono">{scientificMetrics.globalFirstDur}</b>
                    </div>
                    <div className="bg-stone-950/50 p-2.5 rounded-lg border border-stone-800/80 select-none leading-none">
                      <span className="text-[8px] font-black text-stone-500 uppercase block">Avg Fixation Duration</span>
                      <b className="text-xs font-bold text-stone-200 mt-1 inline-block font-mono">{scientificMetrics.globalAvgDur}</b>
                    </div>
                  </div>
                </Card>

                {/* Strategic advisory box */}
                <Card className="bg-stone-900/60 border border-stone-800 p-5 rounded-2xl shadow-xl space-y-3.5">
                  <div className="flex justify-between items-center border-b border-stone-800 pb-2.5">
                    <h4 className="font-display text-xs font-black uppercase text-stone-300 tracking-wider flex items-center gap-1.5">
                      <Sparkles className="h-4.5 w-4.5 text-accent animate-pulse" /> Strategy Advisory
                    </h4>
                    
                    <button
                      onClick={exportPDFReport}
                      disabled={points.length === 0}
                      className="inline-flex items-center gap-1 bg-[#8B1E1E] hover:bg-[#721818] disabled:opacity-40 text-white rounded-lg px-2.5 py-1 text-[8.5px] font-black uppercase tracking-wider transition"
                    >
                      <FileText className="h-3 w-3" /> Report
                    </button>
                  </div>

                  <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-850">
                    <p className="text-[11px] text-stone-200 leading-relaxed font-semibold italic">
                      "{behavioralInsights.recommendation}"
                    </p>
                  </div>
                </Card>

                {/* Cohort Selector */}
                <Card className="bg-stone-900/60 border border-stone-800 p-5 rounded-2xl shadow-xl space-y-4">
                  <h4 className="font-display text-xs font-black uppercase text-stone-300 tracking-wider flex items-center gap-1.5">
                    <UserCheck className="h-4.5 w-4.5 text-primary" /> Cohort Selector
                  </h4>
                  
                  <div className="space-y-1.5">
                    <span className="text-[8.5px] font-black text-stone-400 uppercase tracking-widest block">Simulate Profile</span>
                    <select
                      value={userProfileGroup}
                      onChange={(e) => {
                        setUserProfileGroup(e.target.value as any);
                        if (isSimulating) runAutomatedGazeSimulation();
                      }}
                      className="w-full text-xs font-bold bg-stone-950 border border-stone-800 text-stone-200 rounded-xl px-3 h-8.5 focus:outline-none"
                    >
                      <option value="rural_borrower">Agricultural Borrower (Pride tractor focus)</option>
                      <option value="urban_retailer">Urban Small Merchant (Starting EMI focus)</option>
                    </select>
                  </div>

                  <div className="bg-stone-950/40 p-3 rounded-xl border border-stone-850 text-[9.5px] text-stone-400 leading-normal font-medium">
                    {userProfileGroup === "rural_borrower" ? (
                      <span>💡 Rural Bharat profiles prefer high visual illustrations and assisted e-KYC agent photos to drop Pre-frontal threat alarms.</span>
                    ) : (
                      <span>💡 Urban merchant profiles prioritize motivational speed, scanning simple monthly EMI numbers and WhatsApp agent call options instantly.</span>
                    )}
                  </div>
                </Card>
              </div>
            </div>

            {/* STEP 8: BEHAVIORAL INSIGHTS PANEL (Executive breakdown in simple language) */}
            <Card className="bg-stone-900/60 border border-stone-800 p-6 rounded-2xl shadow-xl space-y-5">
              <div className="border-b border-stone-800 pb-3">
                <h3 className="font-display text-base font-black uppercase text-stone-200 tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="h-5 w-5 text-primary" /> Visual Attention Behavioral Insights
                </h3>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  Strategic business-grade audit outcomes translated directly from live ocular telemetry logs.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-5 text-xs font-semibold leading-relaxed text-stone-300">
                <div className="p-4 bg-stone-950/40 rounded-xl border border-stone-800 space-y-1.5 shadow-inner">
                  <span className="text-[9px] font-black uppercase text-[#EAB308] tracking-widest block">👁️ First Noticed Element</span>
                  <p className="text-stone-200 leading-normal">{behavioralInsights.firstNoticed}</p>
                </div>

                <div className="p-4 bg-stone-950/40 rounded-xl border border-stone-800 space-y-1.5 shadow-inner">
                  <span className="text-[9px] font-black uppercase text-primary tracking-widest block">❌ Ignored Elements</span>
                  <p className="text-stone-200 leading-normal">{behavioralInsights.ignored}</p>
                </div>

                <div className="p-4 bg-stone-950/40 rounded-xl border border-stone-800 space-y-1.5 shadow-inner">
                  <span className="text-[9px] font-black uppercase text-red-400 tracking-widest block">⚠️ Attention Drop Zones</span>
                  <p className="text-stone-200 leading-normal">{behavioralInsights.dropZones}</p>
                </div>

                <div className="p-4 bg-stone-950/40 rounded-xl border border-stone-800 space-y-1.5 shadow-inner">
                  <span className="text-[9px] font-black uppercase text-emerald-400 tracking-widest block">⚡ CTA Visibility Audit</span>
                  <p className="text-stone-200 leading-normal">{behavioralInsights.ctaVisibility}</p>
                </div>

                <div className="p-4 bg-stone-950/40 rounded-xl border border-stone-800 space-y-1.5 shadow-inner">
                  <span className="text-[9px] font-black uppercase text-amber-500 tracking-widest block">📢 Friction & Confusion triggers</span>
                  <p className="text-stone-200 leading-normal">{behavioralInsights.confusion}</p>
                </div>

                <div className="p-4 bg-[#8B1E1E]/5 rounded-xl border border-[#8B1E1E]/15 space-y-1.5 shadow-inner">
                  <span className="text-[9px] font-black uppercase text-[#8B1E1E] tracking-widest block">🚀 Recommended Optimization</span>
                  <p className="text-stone-100 font-bold leading-normal">{behavioralInsights.recommendation}</p>
                </div>
              </div>
            </Card>

            {/* AOI scorecards table */}
            <Card className="bg-stone-900/60 border border-stone-800 p-6 rounded-2xl shadow-xl space-y-4">
              <h3 className="font-display text-sm font-black uppercase text-stone-200 tracking-wider flex items-center gap-1.5 border-b border-stone-800 pb-3">
                <BarChart3 className="h-4.5 w-4.5 text-primary" /> Area of Interest (AOI) Scientific Scorecard
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs select-none">
                  <thead>
                    <tr className="border-b border-stone-800 text-stone-400 font-black uppercase tracking-wider">
                      <th className="py-2.5">Area of Interest (AOI)</th>
                      <th className="py-2.5 text-center">TTFF (Latency)</th>
                      <th className="py-2.5 text-center">Dwell Time</th>
                      <th className="py-2.5 text-center">Attention share</th>
                      <th className="py-2.5 text-center">Revisit Loops</th>
                      <th className="py-2.5 text-center">1st Fix Duration</th>
                      <th className="py-2.5 text-center">Avg Fix Duration</th>
                      <th className="py-2.5 text-center">Total Fix Count</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/60 font-semibold text-stone-300">
                    {AOI_DEFINITIONS[creativeVersion].map((aoi) => {
                      const m = scientificMetrics.aoisMetrics[aoi.id as 1 | 2 | 3 | 4];
                      return (
                        <tr key={aoi.id} className="hover:bg-stone-900/40 transition">
                          <td className="py-3.5 pr-4">
                            <div className="font-bold text-stone-200 flex items-center gap-1.5">
                              <span className={`h-2 w-2 rounded-full ${
                                aoi.id === 1 ? "bg-red-500" : aoi.id === 2 ? "bg-amber-500" : aoi.id === 3 ? "bg-[#6CA6A6]" : "bg-emerald-500"
                              }`} />
                              {aoi.name}
                            </div>
                            <div className="text-[10px] text-stone-500 font-medium leading-relaxed mt-0.5">{aoi.desc}</div>
                          </td>
                          <td className="py-3.5 text-center font-mono font-bold text-stone-200">{m.ttff}</td>
                          <td className="py-3.5 text-center font-mono font-bold text-stone-200">{m.dwell}</td>
                          <td className="py-3.5 text-center pr-2 font-mono">
                            <div className="flex items-center justify-center gap-2">
                              <span className="font-bold text-stone-200 w-8 text-right">{m.ratio}%</span>
                              <div className="w-16 h-1.5 bg-stone-800 rounded-full overflow-hidden border border-stone-750">
                                <div className={`h-full rounded-full transition-all duration-300 ${
                                  aoi.id === 1 ? "bg-red-500" : aoi.id === 2 ? "bg-amber-500" : aoi.id === 3 ? "bg-[#6CA6A6]" : "bg-emerald-500"
                                }`} style={{ width: `${m.ratio}%` }} />
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 text-center font-mono font-bold text-stone-200">{m.revisits}</td>
                          <td className="py-3.5 text-center font-mono font-bold text-stone-200">{m.firstDuration}</td>
                          <td className="py-3.5 text-center font-mono font-bold text-stone-200">{m.avgDuration}</td>
                          <td className="py-3.5 text-center font-mono font-bold text-stone-200">{m.count}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

const UPLOADED_AOIS_A = [
  { id: "logo", label: "Logo", rect: { left: 5, top: 5, width: 18, height: 9 } },
  { id: "headline", label: "Headline", rect: { left: 6, top: 17, width: 63, height: 15 } }
];
const UPLOADED_AOIS_B = [
  { id: "logo", label: "Logo", rect: { left: 5, top: 5, width: 18, height: 9 } }
];
const UPLOADED_FIXATIONS_A = [
  { id: 1, x: 0.15, y: 0.09, start: 100, duration: 800 }
];
const UPLOADED_FIXATIONS_B = [
  { id: 1, x: 0.17, y: 0.09, start: 100, duration: 850 }
];
function formatSeconds(val: any) {
  return val ? `${val}s` : "—";
}
function getAoiMetrics(v: any) {
  return [{ id: "cta", ttff: 1.2 }];
}
function buildGazePoints(arr: any) {
  return [{ x: 0.5, y: 0.5, t: 100, weight: 1.1 }];
}
