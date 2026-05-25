import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import jsPDF from "jspdf";
import { AppLayout } from "@/components/neuro/AppLayout";
import { PageHeader, Card } from "@/components/neuro/Primitives";
import {
  Activity,
  AlertCircle,
  BarChart3,
  Camera,
  CheckCircle2,
  ChevronRight,
  Compass,
  Download,
  Eye,
  FileText,
  Flame,
  Info,
  Layers,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  ScanEye,
  Settings,
  ShieldAlert,
  SlidersHorizontal,
  Square,
  Target,
  Upload,
  X,
} from "lucide-react";

export const Route = createFileRoute("/eye-tracking")({ component: EyeTrackingPage });

type CreativeVersion = "A" | "B";
type ViewMode = "heatmap" | "fixations" | "aoi" | "replay" | "comparison";

type Aoi = {
  id: string;
  label: string;
  rect: { left: number; top: number; width: number; height: number };
  description: string;
  recommendation: string;
};

type Fixation = {
  id: number;
  x: number;
  y: number;
  start: number;
  duration: number;
  aoiId: string;
  element: string;
  strength: "Low" | "Medium" | "High";
  interpretation: string;
  suggestion: string;
};

type GazePoint = {
  x: number;
  y: number;
  t: number;
  weight: number;
};

const CALIBRATION_POINTS = [
  { id: 1, x: "18%", y: "18%" },
  { id: 2, x: "50%", y: "18%" },
  { id: 3, x: "82%", y: "18%" },
  { id: 4, x: "18%", y: "50%" },
  { id: 5, x: "50%", y: "50%" },
  { id: 6, x: "82%", y: "50%" },
  { id: 7, x: "18%", y: "82%" },
  { id: 8, x: "50%", y: "82%" },
  { id: 9, x: "82%", y: "82%" },
];

const REQUIRED_CALIBRATION_CLICKS = 2;
const TOTAL_REQUIRED_CLICKS = CALIBRATION_POINTS.length * REQUIRED_CALIBRATION_CLICKS;

const AOIS: Record<CreativeVersion, Aoi[]> = {
  A: [
    {
      id: "logo",
      label: "Logo",
      rect: { left: 5, top: 5, width: 18, height: 9 },
      description: "Brand identifier",
      recommendation: "Keep the logo visible but do not let nearby badges compete with it.",
    },
    {
      id: "headline",
      label: "Headline",
      rect: { left: 6, top: 17, width: 63, height: 15 },
      description: "Primary message",
      recommendation: "Shorten the headline and move supporting claims into a secondary line.",
    },
    {
      id: "pricing",
      label: "Pricing",
      rect: { left: 7, top: 38, width: 43, height: 15 },
      description: "Offer and rate details",
      recommendation: "Group price, rate, and tenure into one clean block.",
    },
    {
      id: "image",
      label: "Product Image",
      rect: { left: 57, top: 35, width: 36, height: 27 },
      description: "Emotional visual",
      recommendation: "Use one strong image rather than several small visual anchors.",
    },
    {
      id: "form",
      label: "Form Section",
      rect: { left: 7, top: 59, width: 50, height: 19 },
      description: "Input area",
      recommendation: "Reduce fields and show the next action clearly.",
    },
    {
      id: "cta",
      label: "CTA",
      rect: { left: 59, top: 70, width: 32, height: 11 },
      description: "Main action button",
      recommendation: "Increase contrast and place the button earlier in the reading path.",
    },
    {
      id: "disclaimer",
      label: "Disclaimer",
      rect: { left: 6, top: 84, width: 88, height: 10 },
      description: "Legal copy",
      recommendation: "Use progressive disclosure so required copy is still findable.",
    },
  ],
  B: [
    {
      id: "logo",
      label: "Logo",
      rect: { left: 6, top: 5, width: 18, height: 8 },
      description: "Brand identifier",
      recommendation: "The logo is noticed early without slowing the task.",
    },
    {
      id: "image",
      label: "Customer Image",
      rect: { left: 59, top: 13, width: 34, height: 26 },
      description: "Emotional anchor",
      recommendation: "Keep the face close to the value message to guide attention.",
    },
    {
      id: "headline",
      label: "Headline",
      rect: { left: 7, top: 18, width: 46, height: 14 },
      description: "Primary message",
      recommendation: "The headline is scannable and leads naturally to the offer.",
    },
    {
      id: "pricing",
      label: "Pricing",
      rect: { left: 8, top: 38, width: 47, height: 14 },
      description: "Offer and rate details",
      recommendation: "The compact offer block is easy to compare and remember.",
    },
    {
      id: "cta",
      label: "CTA",
      rect: { left: 9, top: 61, width: 43, height: 10 },
      description: "Main action button",
      recommendation: "The button is discovered quickly and receives enough dwell time.",
    },
    {
      id: "testimonial",
      label: "Trust Proof",
      rect: { left: 58, top: 47, width: 34, height: 18 },
      description: "Customer proof",
      recommendation: "Keep this concise so it supports rather than competes.",
    },
    {
      id: "disclaimer",
      label: "Disclaimer",
      rect: { left: 9, top: 83, width: 82, height: 8 },
      description: "Legal copy",
      recommendation: "The disclaimer is present but should remain collapsible on mobile.",
    },
  ],
};

const FIXATIONS: Record<CreativeVersion, Fixation[]> = {
  A: [
    {
      id: 1,
      x: 0.16,
      y: 0.1,
      start: 0.25,
      duration: 420,
      aoiId: "logo",
      element: "Logo",
      strength: "Medium",
      interpretation: "Users checked the brand but quickly left it.",
      suggestion: "Reduce nearby seals so the logo reads cleanly.",
    },
    {
      id: 2,
      x: 0.45,
      y: 0.22,
      start: 0.95,
      duration: 1180,
      aoiId: "headline",
      element: "Long Headline",
      strength: "High",
      interpretation: "Users paused while trying to understand the main promise.",
      suggestion: "Use one clear promise and move secondary details lower.",
    },
    {
      id: 3,
      x: 0.22,
      y: 0.46,
      start: 2.25,
      duration: 920,
      aoiId: "pricing",
      element: "Pricing Block",
      strength: "Medium",
      interpretation: "The offer received attention, but users had to compare too many figures.",
      suggestion: "Show the main price first and keep fees in a secondary row.",
    },
    {
      id: 4,
      x: 0.78,
      y: 0.47,
      start: 3.45,
      duration: 520,
      aoiId: "image",
      element: "Product Image",
      strength: "Low",
      interpretation: "The visual was noticed late and did not guide the next action.",
      suggestion: "Use a single human-centered visual that points toward the offer.",
    },
    {
      id: 5,
      x: 0.32,
      y: 0.67,
      start: 4.25,
      duration: 1560,
      aoiId: "form",
      element: "Form Section",
      strength: "High",
      interpretation: "Users hesitated around the form before reaching the button.",
      suggestion: "Reduce visible fields and explain why the form is needed.",
    },
    {
      id: 6,
      x: 0.18,
      y: 0.89,
      start: 6.15,
      duration: 1320,
      aoiId: "disclaimer",
      element: "Disclaimer",
      strength: "Medium",
      interpretation: "Users dropped into legal copy before deciding what to do next.",
      suggestion: "Move required copy behind a clear details link.",
    },
    {
      id: 7,
      x: 0.74,
      y: 0.75,
      start: 8.05,
      duration: 760,
      aoiId: "cta",
      element: "CTA Button",
      strength: "Medium",
      interpretation: "The main button was found late after several detours.",
      suggestion: "Move the button closer to the offer and increase contrast.",
    },
    {
      id: 8,
      x: 0.36,
      y: 0.62,
      start: 9.15,
      duration: 980,
      aoiId: "form",
      element: "Form Section",
      strength: "Medium",
      interpretation: "Users returned to the form, suggesting uncertainty.",
      suggestion: "Add a short reassurance line near the first field.",
    },
  ],
  B: [
    {
      id: 1,
      x: 0.17,
      y: 0.09,
      start: 0.22,
      duration: 430,
      aoiId: "logo",
      element: "Logo",
      strength: "Medium",
      interpretation: "Users confirmed the brand quickly.",
      suggestion: "Keep the logo position stable across campaign variants.",
    },
    {
      id: 2,
      x: 0.72,
      y: 0.24,
      start: 0.72,
      duration: 840,
      aoiId: "image",
      element: "Customer Image",
      strength: "High",
      interpretation: "The face attracted attention early and created a natural entry point.",
      suggestion: "Keep the customer image close to the value message.",
    },
    {
      id: 3,
      x: 0.28,
      y: 0.24,
      start: 1.45,
      duration: 1020,
      aoiId: "headline",
      element: "Headline",
      strength: "High",
      interpretation: "Users understood the main message without a long pause.",
      suggestion: "Retain this headline length for similar offers.",
    },
    {
      id: 4,
      x: 0.29,
      y: 0.45,
      start: 2.7,
      duration: 1180,
      aoiId: "pricing",
      element: "Pricing",
      strength: "High",
      interpretation: "Users compared the offer details and moved forward smoothly.",
      suggestion: "Keep the price and monthly value in one compact block.",
    },
    {
      id: 5,
      x: 0.31,
      y: 0.66,
      start: 4.3,
      duration: 2100,
      aoiId: "cta",
      element: "CTA Button",
      strength: "High",
      interpretation: "Users paused here before deciding whether to continue.",
      suggestion: "Increase CTA contrast slightly for faster recognition.",
    },
    {
      id: 6,
      x: 0.73,
      y: 0.56,
      start: 6.65,
      duration: 620,
      aoiId: "testimonial",
      element: "Trust Proof",
      strength: "Medium",
      interpretation: "Users briefly checked social proof after seeing the button.",
      suggestion: "Keep trust proof short and close to the action.",
    },
    {
      id: 7,
      x: 0.32,
      y: 0.66,
      start: 7.55,
      duration: 1340,
      aoiId: "cta",
      element: "CTA Button",
      strength: "High",
      interpretation: "Users returned to the main button with less hesitation.",
      suggestion: "This CTA placement is working well.",
    },
    {
      id: 8,
      x: 0.45,
      y: 0.87,
      start: 9.1,
      duration: 360,
      aoiId: "disclaimer",
      element: "Disclaimer",
      strength: "Low",
      interpretation: "The disclaimer was seen briefly but did not interrupt the task.",
      suggestion: "Keep required terms available without making them visually dominant.",
    },
  ],
};

function buildGazePoints(fixations: Fixation[]): GazePoint[] {
  const points: GazePoint[] = [];
  fixations.forEach((fixation, index) => {
    if (index > 0) {
      const prev = fixations[index - 1];
      for (let step = 1; step <= 3; step += 1) {
        const mix = step / 4;
        points.push({
          x: prev.x + (fixation.x - prev.x) * mix,
          y: prev.y + (fixation.y - prev.y) * mix,
          t: prev.start + (fixation.start - prev.start) * mix,
          weight: 0.35,
        });
      }
    }
    const samples = Math.max(3, Math.round(fixation.duration / 320));
    for (let sample = 0; sample < samples; sample += 1) {
      const angle = sample * 1.7 + index * 0.9;
      const drift = fixation.strength === "High" ? 0.012 : fixation.strength === "Medium" ? 0.018 : 0.024;
      points.push({
        x: Math.min(0.96, Math.max(0.04, fixation.x + Math.cos(angle) * drift)),
        y: Math.min(0.94, Math.max(0.05, fixation.y + Math.sin(angle) * drift)),
        t: fixation.start + (sample / samples) * (fixation.duration / 1000),
        weight: fixation.duration / 1000,
      });
    }
  });
  return points.sort((a, b) => a.t - b.t);
}

const GAZE_POINTS: Record<CreativeVersion, GazePoint[]> = {
  A: buildGazePoints(FIXATIONS.A),
  B: buildGazePoints(FIXATIONS.B),
};

const UPLOADED_AOIS: Aoi[] = [
  {
    id: "logo",
    label: "Brand Identity (Logo)",
    rect: { left: 8, top: 6, width: 22, height: 9 },
    description: "The primary brand identification area.",
    recommendation: "Ensure clear contrast against the background so users orient immediately.",
  },
  {
    id: "headline",
    label: "Value Prop (Headline)",
    rect: { left: 8, top: 18, width: 50, height: 16 },
    description: "The main value proposition or headline text.",
    recommendation: "Keep text under 8 words to maximize cognitive transmission speed.",
  },
  {
    id: "image",
    label: "Hero Anchor (Visual)",
    rect: { left: 60, top: 12, width: 32, height: 35 },
    description: "The emotional or product focus area.",
    recommendation: "Position high-contrast product details or faces here to guide gaze.",
  },
  {
    id: "pricing",
    label: "Core Offer (Pricing)",
    rect: { left: 8, top: 38, width: 48, height: 15 },
    description: "The price point or primary offer incentive.",
    recommendation: "Bold key numbers; reduce surrounding text labels for quick scanning.",
  },
  {
    id: "cta",
    label: "Primary CTA (Button)",
    rect: { left: 8, top: 58, width: 44, height: 12 },
    description: "The main conversion or action element.",
    recommendation: "Ensure a minimum 3:1 luminance contrast ratio against the parent frame.",
  },
  {
    id: "form",
    label: "Interaction Zone",
    rect: { left: 8, top: 72, width: 44, height: 10 },
    description: "Form input fields or secondary options.",
    recommendation: "Reduce form friction by asking only for essential entry parameters.",
  },
  {
    id: "disclaimer",
    label: "Compliance (Footer)",
    rect: { left: 8, top: 85, width: 84, height: 10 },
    description: "Legal disclosures and compliance terms.",
    recommendation: "Keep disclosures accessible but secondary to prevent conversion exit.",
  },
];

const UPLOADED_FIXATIONS: Fixation[] = [
  {
    id: 1,
    x: 0.19,
    y: 0.11,
    start: 0.15,
    duration: 380,
    aoiId: "logo",
    element: "Brand Identity (Logo)",
    strength: "Medium",
    interpretation: "Initial brand verification happens within the first 200ms.",
    suggestion: "Ensure the brand logo has adequate white space.",
  },
  {
    id: 2,
    x: 0.76,
    y: 0.28,
    start: 0.65,
    duration: 980,
    aoiId: "image",
    element: "Hero Anchor (Visual)",
    strength: "High",
    interpretation: "Strong human face or emotional visual instantly captures attention.",
    suggestion: "Make sure the visual subject's line of sight points toward the headline.",
  },
  {
    id: 3,
    x: 0.33,
    y: 0.24,
    start: 1.85,
    duration: 1250,
    aoiId: "headline",
    element: "Value Prop (Headline)",
    strength: "High",
    interpretation: "Users spend significant cognitive effort reading the main header copy.",
    suggestion: "Group your value proposition with a bold, legible font hierarchy.",
  },
  {
    id: 4,
    x: 0.32,
    y: 0.45,
    start: 3.25,
    duration: 1100,
    aoiId: "pricing",
    element: "Core Offer (Pricing)",
    strength: "High",
    interpretation: "Focus shifts immediately down to evaluate financial terms or pricing numbers.",
    suggestion: "Use large numbers for the core rate and keep secondary details smaller.",
  },
  {
    id: 5,
    x: 0.30,
    y: 0.64,
    start: 4.55,
    duration: 1450,
    aoiId: "cta",
    element: "Primary CTA (Button)",
    strength: "High",
    interpretation: "High contrast active action button discovered with rapid Time-to-First-Fixation.",
    suggestion: "Maintain generous contrast and padding around the button.",
  },
  {
    id: 6,
    x: 0.30,
    y: 0.77,
    start: 6.25,
    duration: 850,
    aoiId: "form",
    element: "Interaction Zone",
    strength: "Medium",
    interpretation: "Subconscious hesitation occurs when users face form fields or secondary fields.",
    suggestion: "Pre-fill form values where possible to ease conversion.",
  },
  {
    id: 7,
    x: 0.50,
    y: 0.90,
    start: 7.45,
    duration: 480,
    aoiId: "disclaimer",
    element: "Compliance (Footer)",
    strength: "Low",
    interpretation: "Final compliance confirmation is briefly checked at the very end.",
    suggestion: "Keep font size small but legible to fulfill regulatory requirements.",
  },
];

const UPLOADED_AOIS_A: Aoi[] = [
  {
    id: "logo",
    label: "Logo",
    rect: { left: 5, top: 5, width: 18, height: 9 },
    description: "Brand identifier",
    recommendation: "Keep the logo visible but do not let nearby badges compete with it.",
  },
  {
    id: "headline",
    label: "Headline",
    rect: { left: 6, top: 17, width: 63, height: 15 },
    description: "Primary message",
    recommendation: "Shorten the headline and move supporting claims into a secondary line.",
  },
  {
    id: "pricing",
    label: "Pricing",
    rect: { left: 7, top: 38, width: 43, height: 15 },
    description: "Offer and rate details",
    recommendation: "Group price, rate, and tenure into one clean block.",
  },
  {
    id: "image",
    label: "Product Image",
    rect: { left: 57, top: 35, width: 36, height: 27 },
    description: "Emotional visual",
    recommendation: "Use one strong image rather than several small visual anchors.",
  },
  {
    id: "form",
    label: "Form Section",
    rect: { left: 7, top: 59, width: 50, height: 19 },
    description: "Input area",
    recommendation: "Reduce fields and show the next action clearly.",
  },
  {
    id: "cta",
    label: "CTA",
    rect: { left: 59, top: 70, width: 32, height: 11 },
    description: "Main action button",
    recommendation: "Increase contrast and place the button earlier in the reading path.",
  },
  {
    id: "disclaimer",
    label: "Disclaimer",
    rect: { left: 6, top: 84, width: 88, height: 10 },
    description: "Legal copy",
    recommendation: "Use progressive disclosure so required copy is still findable.",
  },
];

const UPLOADED_AOIS_B: Aoi[] = [
  {
    id: "logo",
    label: "Logo",
    rect: { left: 6, top: 5, width: 18, height: 8 },
    description: "Brand identifier",
    recommendation: "The logo is noticed early without slowing the task.",
  },
  {
    id: "image",
    label: "Customer Image",
    rect: { left: 59, top: 13, width: 34, height: 26 },
    description: "Emotional anchor",
    recommendation: "Keep the face close to the value message to guide attention.",
  },
  {
    id: "headline",
    label: "Headline",
    rect: { left: 7, top: 18, width: 46, height: 14 },
    description: "Primary message",
    recommendation: "The headline is scannable and leads naturally to the offer.",
  },
  {
    id: "pricing",
    label: "Pricing",
    rect: { left: 8, top: 38, width: 47, height: 14 },
    description: "Offer and rate details",
    recommendation: "The compact offer block is easy to compare and remember.",
  },
  {
    id: "cta",
    label: "CTA",
    rect: { left: 9, top: 61, width: 43, height: 10 },
    description: "Main action button",
    recommendation: "The button is discovered quickly and receives enough dwell time.",
  },
  {
    id: "testimonial",
    label: "Trust Proof",
    rect: { left: 58, top: 47, width: 34, height: 18 },
    description: "Customer proof",
    recommendation: "Keep this concise so it supports rather than competes.",
  },
  {
    id: "disclaimer",
    label: "Disclaimer",
    rect: { left: 9, top: 83, width: 82, height: 8 },
    description: "Legal copy",
    recommendation: "The disclaimer is present but should remain collapsible on mobile.",
  },
];

const UPLOADED_FIXATIONS_A: Fixation[] = [
  {
    id: 1,
    x: 0.16,
    y: 0.1,
    start: 0.25,
    duration: 420,
    aoiId: "logo",
    element: "Logo",
    strength: "Medium",
    interpretation: "Users checked the brand but quickly left it.",
    suggestion: "Reduce nearby seals so the logo reads cleanly.",
  },
  {
    id: 2,
    x: 0.45,
    y: 0.22,
    start: 0.95,
    duration: 1180,
    aoiId: "headline",
    element: "Long Headline",
    strength: "High",
    interpretation: "Users paused while trying to understand the main promise.",
    suggestion: "Use one clear promise and move secondary details lower.",
  },
  {
    id: 3,
    x: 0.22,
    y: 0.46,
    start: 2.25,
    duration: 920,
    aoiId: "pricing",
    element: "Pricing Block",
    strength: "Medium",
    interpretation: "The offer received attention, but users had to compare too many figures.",
    suggestion: "Show the main price first and keep fees in a secondary row.",
  },
  {
    id: 4,
    x: 0.78,
    y: 0.47,
    start: 3.45,
    duration: 520,
    aoiId: "image",
    element: "Product Image",
    strength: "Low",
    interpretation: "The visual was noticed late and did not guide the next action.",
    suggestion: "Use a single human-centered visual that points toward the offer.",
  },
  {
    id: 5,
    x: 0.32,
    y: 0.67,
    start: 4.25,
    duration: 1560,
    aoiId: "form",
    element: "Form Section",
    strength: "High",
    interpretation: "Users hesitated around the form before reaching the button.",
    suggestion: "Reduce visible fields and explain why the form is needed.",
  },
  {
    id: 6,
    x: 0.18,
    y: 0.89,
    start: 6.15,
    duration: 1320,
    aoiId: "disclaimer",
    element: "Disclaimer",
    strength: "Medium",
    interpretation: "Users dropped into legal copy before deciding what to do next.",
    suggestion: "Move required copy behind a clear details link.",
  },
  {
    id: 7,
    x: 0.74,
    y: 0.75,
    start: 8.05,
    duration: 760,
    aoiId: "cta",
    element: "CTA Button",
    strength: "Medium",
    interpretation: "The main button was found late after several detours.",
    suggestion: "Move the button closer to the offer and increase contrast.",
  },
  {
    id: 8,
    x: 0.36,
    y: 0.62,
    start: 9.15,
    duration: 980,
    aoiId: "form",
    element: "Form Section",
    strength: "Medium",
    interpretation: "Users returned to the form, suggesting uncertainty.",
    suggestion: "Add a short reassurance line near the first field.",
  },
];

const UPLOADED_FIXATIONS_B: Fixation[] = [
  {
    id: 1,
    x: 0.17,
    y: 0.09,
    start: 0.22,
    duration: 430,
    aoiId: "logo",
    element: "Logo",
    strength: "Medium",
    interpretation: "Users confirmed the brand quickly.",
    suggestion: "Keep the logo position stable across campaign variants.",
  },
  {
    id: 2,
    x: 0.72,
    y: 0.24,
    start: 0.85,
    duration: 980,
    aoiId: "image",
    element: "Customer Image",
    strength: "High",
    interpretation: "The face visual captured attention early and guided gaze down.",
    suggestion: "Ensure the visual's eyes look slightly toward the value proposition.",
  },
  {
    id: 3,
    x: 0.26,
    y: 0.23,
    start: 2.15,
    duration: 1250,
    aoiId: "headline",
    element: "Short Headline",
    strength: "High",
    interpretation: "The simplified headline was read quickly with high comprehension.",
    suggestion: "Maintain the 8-word count to prevent cognitive overload.",
  },
  {
    id: 4,
    x: 0.28,
    y: 0.44,
    start: 3.55,
    duration: 1100,
    aoiId: "pricing",
    element: "EMI Box",
    strength: "High",
    interpretation: "Users focused heavily on the bold ₹8,450 rate display.",
    suggestion: "Position other monthly details right next to this focal number.",
  },
  {
    id: 5,
    x: 0.72,
    y: 0.54,
    start: 4.85,
    duration: 860,
    aoiId: "testimonial",
    element: "Trust proof",
    strength: "High",
    interpretation: "The customer quote was noticed early, reinforcing trust.",
    suggestion: "Use testimonials spoken in regional dialects for semi-urban lending.",
  },
  {
    id: 6,
    x: 0.26,
    y: 0.72,
    start: 5.95,
    duration: 1450,
    aoiId: "cta",
    element: "EMI Options CTA",
    strength: "High",
    interpretation: "The button was discovered quickly under 1.2s and read fully.",
    suggestion: "Maintain the bright background contrast to protect visual prominence.",
  },
  {
    id: 7,
    x: 0.44,
    y: 0.88,
    start: 7.65,
    duration: 480,
    aoiId: "disclaimer",
    element: "Disclaimer",
    strength: "Low",
    interpretation: "Users briefly scanned the legal disclosures without getting distracted.",
    suggestion: "Allow disclosures to be expanded on demand for dynamic screen formats.",
  },
];

function isInsideAoi(point: { x: number; y: number }, aoi: Aoi) {
  const x = point.x * 100;
  const y = point.y * 100;
  return x >= aoi.rect.left && x <= aoi.rect.left + aoi.rect.width && y >= aoi.rect.top && y <= aoi.rect.top + aoi.rect.height;
}

function formatSeconds(value: number | null) {
  return value === null ? "-" : `${value.toFixed(1)}s`;
}

function getAoiMetrics(version: CreativeVersion | "uploaded_a" | "uploaded_b", visibleFixations?: Fixation[]) {
  const isUploadedA = version === "uploaded_a";
  const isUploadedB = version === "uploaded_b";
  const isUploaded = isUploadedA || isUploadedB;
  
  const aois = isUploadedA ? UPLOADED_AOIS_A : isUploadedB ? UPLOADED_AOIS_B : AOIS[version as CreativeVersion];
  const defaultFixations = isUploadedA ? UPLOADED_FIXATIONS_A : isUploadedB ? UPLOADED_FIXATIONS_B : FIXATIONS[version as CreativeVersion];
  const fixs = visibleFixations || defaultFixations;
  const totalDwell = Math.max(1, fixs.reduce((sum: number, fixation: Fixation) => sum + fixation.duration, 0));

  const gp = isUploadedA 
    ? buildGazePoints(UPLOADED_FIXATIONS_A) 
    : isUploadedB 
    ? buildGazePoints(UPLOADED_FIXATIONS_B) 
    : GAZE_POINTS[version as CreativeVersion];

  return aois.map((aoi: Aoi) => {
    const relatedFixations = fixs.filter((fixation: Fixation) => fixation.aoiId === aoi.id);
    const first = relatedFixations[0];
    const dwellMs = relatedFixations.reduce((sum: number, fixation: Fixation) => sum + fixation.duration, 0);
    let visits = 0;
    let previousInside = false;
    gp.forEach((point: GazePoint) => {
      const inside = isInsideAoi(point, aoi);
      if (inside && !previousInside) visits += 1;
      previousInside = inside;
    });

    return {
      ...aoi,
      fixations: relatedFixations.length,
      dwellMs,
      dwell: `${(dwellMs / 1000).toFixed(1)}s`,
      share: Math.round((dwellMs / totalDwell) * 100),
      revisits: Math.max(0, visits - 1),
      ttff: first ? first.start : null,
      firstDuration: first ? `${first.duration}ms` : "-",
      avgDuration: relatedFixations.length ? `${Math.round(dwellMs / relatedFixations.length)}ms` : "-",
    };
  });
}

function getSummary(version: CreativeVersion | "uploaded_a" | "uploaded_b") {
  if (version === "uploaded_a") {
    return [
      "CTA was discovered late after several visual detours.",
      "Dense copy caused long prefrontal pauses around the headline.",
      "Users loop back repeatedly to compare scattered price parameters.",
      "Regulatory disclaimer siphoned attention away from the core action.",
      "The layout needs cleaner, progressive cognitive focus guides.",
    ];
  }
  if (version === "uploaded_b") {
    return [
      "Brand identity zone captures focus instantly under 200ms.",
      "Gaze transitions smoothly from the headline to the hero Visual.",
      "Clean visual anchors guide visual focus without friction loops.",
      "The starting monthly EMI block retains comfortable, clear attention.",
      "The Primary CTA receives high focus share and rapid TTFF.",
    ];
  }
  return version === "A"
    ? [
        "CTA was discovered late after several detours.",
        "Dense copy caused long pauses around the headline and form.",
        "Users revisited the form, which signals uncertainty.",
        "Disclaimer copy pulled attention away from the action.",
        "The creative needs a cleaner reading path.",
      ]
    : [
        "Users noticed the CTA quickly.",
        "The customer visual improved early engagement.",
        "Pricing was easy to compare before action.",
        "Disclaimer section was available but did not distract.",
        "The scanpath shows a smoother decision flow.",
      ];
}

function getReportInsight(version: CreativeVersion | "uploaded_a" | "uploaded_b") {
  if (version === "uploaded_a") {
    return "What happened: users scanned headline, prices, visual noise, and compliance terms before discovering the main action button. Why it matters: delayed CTA discovery decreases conversions. Adaptation: group primary pricing together and keep the CTA isolated from competing graphic borders.";
  }
  if (version === "uploaded_b") {
    return "What happened: users transitioned cleanly from brand branding to headline, pricing, and CTA without chaotic back-and-forth gaze loops. Why it matters: a highly structured cognitive flow lowers visual friction. Adaptation: maintain this design and test only tiny text variations.";
  }
  return version === "A"
    ? "What happened: users moved between headline, price, form, and disclaimer before finding the main button. Why it matters: delayed CTA discovery can reduce completion. Improve by simplifying the message, reducing visible fields, and moving the CTA closer to the offer."
    : "What happened: users moved from brand and face to headline, pricing, and CTA with fewer detours. Why it matters: a clear visual path helps people decide faster. Improve by keeping this structure and testing only small CTA contrast changes.";
}

function CreativeMockup({ version, compact = false }: { version: CreativeVersion; compact?: boolean }) {
  if (version === "A") {
    return (
      <div className={`relative overflow-hidden rounded-lg bg-white text-stone-900 shadow-sm ${compact ? "h-[360px]" : "h-[430px]"} w-full min-w-[260px] border border-stone-200`}>
        <div className="absolute inset-x-0 top-0 h-3 bg-[#8B1E1E]" />
        <div className="p-5 pt-7 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="font-display text-sm font-black text-[#8B1E1E]">Mahindra Finance</div>
            <div className="grid grid-cols-2 gap-1 text-[6.5px] font-black uppercase text-stone-600">
              <span className="rounded border px-1 py-0.5">Low EMI</span>
              <span className="rounded border px-1 py-0.5">Fast OK</span>
              <span className="rounded border px-1 py-0.5">Offer</span>
              <span className="rounded border px-1 py-0.5">Terms</span>
            </div>
          </div>
          <h2 className="font-display text-xl font-black leading-[1.02] tracking-normal">
            Upgrade your business vehicle with flexible finance, fast approval, seasonal rates and special processing benefits
          </h2>
          <div className="grid grid-cols-3 gap-2 text-[8px] font-bold">
            <div className="rounded-md bg-stone-100 p-2">Rate from<br /><b className="text-base">8.9%</b></div>
            <div className="rounded-md bg-stone-100 p-2">Tenure<br /><b className="text-base">60 mo</b></div>
            <div className="rounded-md bg-stone-100 p-2">Fee waiver<br /><b className="text-base">T&C</b></div>
          </div>
          <div className="grid grid-cols-[1fr_0.85fr] gap-3">
            <div className="space-y-2 text-[8px] leading-snug font-semibold text-stone-700">
              <p>Includes selected models, location rules, underwriting checks, identity verification, income validation, and dealer confirmation.</p>
              <p>Upload documents, choose repayment date, compare plans, call branch, or request callback.</p>
              <div className="grid grid-cols-2 gap-1">
                {["PAN", "Aadhaar", "GST", "Bank", "Invoice", "Photo"].map((item) => (
                  <span key={item} className="rounded border border-stone-200 bg-stone-50 px-1.5 py-1">{item}</span>
                ))}
              </div>
            </div>
            <div className="relative rounded-lg bg-stone-200 p-2">
              <div className="absolute left-4 top-5 h-16 w-16 rounded-full bg-[#6CA6A6]/45" />
              <div className="absolute right-4 top-10 h-16 w-20 rounded-md bg-[#8B1E1E]/20" />
              <div className="absolute bottom-5 left-5 right-5 h-10 rounded bg-stone-700/20" />
            </div>
          </div>
          <div className="grid grid-cols-[1fr_0.75fr] gap-3">
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-3 space-y-1">
              <div className="text-[9px] font-black uppercase">Start application</div>
              <div className="grid grid-cols-2 gap-1">
                <div className="h-6 rounded bg-white border" />
                <div className="h-6 rounded bg-white border" />
                <div className="h-6 rounded bg-white border" />
                <div className="h-6 rounded bg-white border" />
              </div>
            </div>
            <button className="self-end rounded-lg bg-stone-500 px-3 py-3 text-[10px] font-black uppercase text-white shadow">Apply / Upload / Call</button>
          </div>
          <p className="text-[6.5px] leading-tight text-stone-500">
            Terms and conditions apply. Rate shown is indicative and depends on applicant profile, geography, asset category, dealer confirmation, documentation, and credit checks. Processing timelines may vary.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-lg bg-white text-stone-900 shadow-sm ${compact ? "h-[360px]" : "h-[430px]"} w-full min-w-[260px] border border-stone-200`}>
      <div className="absolute inset-x-0 top-0 h-3 bg-[#8B1E1E]" />
      <div className="p-5 pt-7">
        <div className="flex items-center justify-between">
          <div className="font-display text-sm font-black text-[#8B1E1E]">Mahindra Finance</div>
          <span className="rounded-full bg-[#6CA6A6]/12 px-2 py-1 text-[8px] font-black uppercase text-[#426f6f]">Pre-check in 2 min</span>
        </div>
        <div className="mt-5 grid grid-cols-[1fr_0.8fr] gap-4 items-start">
          <div>
            <h2 className="font-display text-2xl font-black leading-[1.02] tracking-normal">Finance your next vehicle with a clear EMI plan</h2>
            <p className="mt-2 text-[10px] leading-snug font-semibold text-stone-600">Check eligibility, compare monthly cost, and continue only when the plan feels right.</p>
          </div>
          <div className="relative h-28 rounded-xl bg-[#6CA6A6]/16 overflow-hidden border border-[#6CA6A6]/25">
            <div className="absolute left-7 top-5 h-12 w-12 rounded-full bg-[#8B1E1E]/18" />
            <div className="absolute left-10 top-8 h-9 w-9 rounded-full bg-stone-100 border" />
            <div className="absolute bottom-0 left-5 right-5 h-10 rounded-t-xl bg-[#243447]/20" />
            <div className="absolute right-5 bottom-5 h-10 w-14 rounded bg-white/80 shadow" />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-stone-50 border border-stone-200 p-3">
            <div className="text-[8px] uppercase font-black text-stone-500">Starting EMI</div>
            <div className="mt-1 font-display text-2xl font-black text-[#8B1E1E]">Rs 8,450</div>
            <div className="text-[8px] font-semibold text-stone-500">Indicative monthly plan</div>
          </div>
          <div className="rounded-xl bg-stone-50 border border-stone-200 p-3 space-y-1.5 text-[9px] font-bold text-stone-700">
            <div className="flex justify-between"><span>Approval</span><b>Fast</b></div>
            <div className="flex justify-between"><span>Documents</span><b>3 items</b></div>
            <div className="flex justify-between"><span>Support</span><b>Branch + dealer</b></div>
          </div>
        </div>
        <button className="mt-5 w-full rounded-xl bg-[#8B1E1E] px-4 py-3 text-[12px] font-black uppercase tracking-wide text-white shadow">
          Check my EMI options
        </button>
        <div className="mt-4 rounded-xl border border-[#6CA6A6]/25 bg-[#6CA6A6]/10 p-3 text-[9px] font-bold text-stone-700">
          "The plan was simple to compare before visiting the dealership."
        </div>
        <p className="mt-5 text-[7px] leading-tight text-stone-500">
          Final eligibility, rate, and terms depend on customer profile, selected asset, location, and verification.
        </p>
      </div>
    </div>
  );
}

function EyeTrackingPage() {
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3 | 4>(1);
  const [calibrationClicks, setCalibrationClicks] = useState<Record<number, number>>({});
  const [activeVersion, setActiveVersion] = useState<CreativeVersion>("B");
  const [viewMode, setViewMode] = useState<ViewMode>("heatmap");
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showFixations, setShowFixations] = useState(true);
  const [showScanpath, setShowScanpath] = useState(true);
  const [showAois, setShowAois] = useState(true);
  const [heatmapOpacity, setHeatmapOpacity] = useState(78);
  const [minFixationDuration, setMinFixationDuration] = useState(0);
  const [playhead, setPlayhead] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFixation, setSelectedFixation] = useState<Fixation | null>(null);
  const [hoveredAoi, setHoveredAoi] = useState<string | null>(null);
  
  // Custom multi-creative upload states
  const [uploadedImageA, setUploadedImageA] = useState<string | null>(null);
  const [uploadedImageB, setUploadedImageB] = useState<string | null>(null);
  const [activeUploadSlot, setActiveUploadSlot] = useState<"A" | "B">("A");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "analyzing" | "generating" | "complete">("idle");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const [reportOpen, setReportOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);

  const handleCalibrationClick = (pointId: number) => {
    setCalibrationClicks((prev) => {
      const current = prev[pointId] || 0;
      if (current >= REQUIRED_CALIBRATION_CLICKS) return prev;
      return {
        ...prev,
        [pointId]: current + 1
      };
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent, slot: "A" | "B") => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    
    // File validation
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Image too large. Maximum supported file size is 10MB.");
      return;
    }
    if (!["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type)) {
      setUploadError("Unsupported format. Please upload JPG, PNG, JPEG, or WebP.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => triggerMockAnalysis(String(reader.result), slot);
    reader.readAsDataURL(file);
  };

  const totalClicks = Object.values(calibrationClicks).reduce((sum: number, clicks: number) => sum + clicks, 0);
  const calibrated = totalClicks >= TOTAL_REQUIRED_CLICKS;
  
  // Connect activeVersion slot ("A" or "B") directly to the uploaded image state
  const uploadedImage = activeVersion === "A" ? uploadedImageA : uploadedImageB;

  const sequence = useMemo(() => {
    if (uploadedImage) {
      return activeVersion === "A" ? UPLOADED_FIXATIONS_A : UPLOADED_FIXATIONS_B;
    }
    return FIXATIONS[activeVersion];
  }, [uploadedImage, activeVersion]);

  const visibleFixations = useMemo(() => {
    const maxTime = viewMode === "replay" ? playhead : 10;
    return sequence.filter((fixation: Fixation) => fixation.start <= maxTime && fixation.duration >= minFixationDuration);
  }, [sequence, minFixationDuration, playhead, viewMode]);

  const gazePoints = useMemo(() => {
    const maxTime = viewMode === "replay" ? playhead : 10;
    let pointsList = GAZE_POINTS[activeVersion];
    if (uploadedImage) {
      pointsList = buildGazePoints(activeVersion === "A" ? UPLOADED_FIXATIONS_A : UPLOADED_FIXATIONS_B);
    }
    return pointsList.filter((point) => point.t <= maxTime);
  }, [uploadedImage, activeVersion, playhead, viewMode]);

  const metrics = useMemo(() => {
    return getAoiMetrics(uploadedImage ? (activeVersion === "A" ? "uploaded_a" : "uploaded_b") : activeVersion, visibleFixations);
  }, [uploadedImage, activeVersion, visibleFixations]);

  const ctaMetric = metrics.find((metric: any) => metric.id === "cta");
  const headlineMetric = metrics.find((metric: any) => metric.id === "headline");
  const totalDwell = visibleFixations.reduce((sum: number, fixation: Fixation) => sum + fixation.duration, 0);
  const avgFixation = visibleFixations.length ? Math.round(totalDwell / visibleFixations.length) : 0;

  useEffect(() => {
    if (!isPlaying || viewMode !== "replay") return;
    const timer = window.setInterval(() => {
      setPlayhead((current) => {
        if (current >= 10) {
          setIsPlaying(false);
          return 10;
        }
        return Math.min(10, current + 0.12);
      });
    }, 90);
    return () => window.clearInterval(timer);
  }, [isPlaying, viewMode]);

  useEffect(() => {
    if (viewMode !== "replay") {
      setIsPlaying(false);
      setPlayhead(10);
    } else {
      setPlayhead(0);
    }
  }, [viewMode, activeVersion, uploadedImage]);

  function triggerMockAnalysis(fileData: string, slot: "A" | "B") {
    setUploadError(null);
    setUploadProgress(0);
    setUploadState("uploading");
    
    let currentProgress = 0;
    const interval = window.setInterval(() => {
      currentProgress += 10;
      setUploadProgress(currentProgress);
      if (currentProgress >= 100) {
        window.clearInterval(interval);
        setUploadState("analyzing");
        
        window.setTimeout(() => {
          setUploadState("generating");
          
          window.setTimeout(() => {
            setUploadState("complete");
            if (slot === "A") {
              setUploadedImageA(fileData);
            } else {
              setUploadedImageB(fileData);
            }
            window.setTimeout(() => {
              setUploadState("idle");
              setUploadProgress(0);
            }, 600);
          }, 600);
        }, 600);
      }
    }, 35);
  }

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>, slot: "A" | "B" = activeUploadSlot) {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // File validation
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Image too large. Maximum supported file size is 10MB.");
      return;
    }
    if (!["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type)) {
      setUploadError("Unsupported format. Please upload JPG, PNG, JPEG, or WebP.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => triggerMockAnalysis(String(reader.result), slot);
    reader.readAsDataURL(file);
  }

  async function generateReport() {
    setExporting(true);
    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const isUploaded = !!uploadedImage;

      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(36, 52, 71);
      pdf.setFontSize(16);
      pdf.text("Visual Attention Research Report", 10, 14);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(80, 80, 80);
      pdf.setFontSize(9);
      pdf.text(isUploaded ? "Creative: Custom Uploaded Creative" : `Creative version: ${activeVersion === "A" ? "A - Cluttered" : "B - Optimized"}`, 10, 20);

      pdf.setFillColor(250, 250, 250);
      pdf.roundedRect(10, 28, pageWidth - 20, 135, 3, 3, "F");
      pdf.setDrawColor(230, 230, 230);
      pdf.roundedRect(10, 28, pageWidth - 20, 135, 3, 3, "S");
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(139, 30, 30);
      pdf.text("Heatmap & Fixation Snapshot", 16, 38);

      const box = { x: 37, y: 47, w: 136, h: 104 };
      pdf.setFillColor(255, 255, 255);
      pdf.roundedRect(box.x, box.y, box.w, box.h, 2, 2, "F");
      pdf.setDrawColor(210, 210, 210);
      pdf.roundedRect(box.x, box.y, box.w, box.h, 2, 2, "S");
      pdf.setFontSize(8);
      pdf.setTextColor(36, 52, 71);
      pdf.text(isUploaded ? "Uploaded client creative" : (activeVersion === "A" ? "Cluttered campaign layout" : "Optimized campaign layout"), box.x + 5, box.y + 8);

      const reportGazePoints = isUploaded ? buildGazePoints(UPLOADED_FIXATIONS) : GAZE_POINTS[activeVersion];
      reportGazePoints.forEach((point) => {
        const x = box.x + point.x * box.w;
        const y = box.y + point.y * box.h;
        const radius = point.weight > 1.3 ? 9 : point.weight > 0.7 ? 7 : 5;
        if (point.weight > 1.3) pdf.setFillColor(220, 38, 38);
        else if (point.weight > 0.7) pdf.setFillColor(245, 158, 11);
        else pdf.setFillColor(34, 197, 94);
        pdf.circle(x, y, radius, "F");
      });

      pdf.setDrawColor(139, 30, 30);
      pdf.setLineWidth(0.4);
      const reportFixations = isUploaded ? UPLOADED_FIXATIONS : FIXATIONS[activeVersion];
      reportFixations.forEach((fixation, index) => {
        const x = box.x + fixation.x * box.w;
        const y = box.y + fixation.y * box.h;
        if (index > 0) {
          const previous = reportFixations[index - 1];
          pdf.line(box.x + previous.x * box.w, box.y + previous.y * box.h, x, y);
        }
        pdf.setFillColor(139, 30, 30);
        pdf.circle(x, y, 3.4, "F");
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(7);
        pdf.text(String(fixation.id), x - 1.2, y + 2);
      });

      pdf.addPage();
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(36, 52, 71);
      pdf.setFontSize(13);
      pdf.text("Executive Summary", 10, 16);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(60, 60, 60);
      pdf.setFontSize(10);
      pdf.text(pdf.splitTextToSize(getReportInsight(isUploaded ? (activeVersion === "A" ? "uploaded_a" : "uploaded_b") : activeVersion), 185), 10, 26);
      pdf.setFont("helvetica", "bold");
      pdf.text("AOI Metrics", 10, 54);
      pdf.setFont("helvetica", "normal");
      metrics.forEach((metric: any, index: number) => {
        const y = 64 + index * 9;
        pdf.text(`${metric.label}: ${metric.fixations} fixations, ${metric.dwell} dwell, ${metric.share}% share, TTFF ${formatSeconds(metric.ttff)}`, 10, y);
      });
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(139, 30, 30);
      pdf.text("Business Recommendations", 10, pageHeight - 54);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(60, 60, 60);
      pdf.text(pdf.splitTextToSize(metrics.map((metric: any) => `${metric.label}: ${metric.recommendation}`).join("  "), 185), 10, pageHeight - 44);
      pdf.save(isUploaded ? "visual-attention-report-uploaded-creative.pdf" : `visual-attention-report-version-${activeVersion}.pdf`);
      setReportOpen(false);
    } finally {
      setExporting(false);
    }
  }

  const activeAoiMetric = hoveredAoi ? metrics.find((metric: any) => metric.id === hoveredAoi) : null;
  const bestVersionMetrics = getAoiMetrics("B");
  const weakVersionMetrics = getAoiMetrics("A");

  return (
    <AppLayout>
      <PageHeader
        eyebrow="BIOMETRIC ESTIMATION CORE"
        title="Gaze Attention Lab"
        subtitle="Enterprise eye tracking and visual attention analysis for campaign creatives, onboarding journeys, disclosures, and conversion flows."
      />

      {wizardStep === 1 && (
        <div className="max-w-5xl mx-auto space-y-6">
          <Card className="p-8 border-t-4 border-t-primary space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-md">
                <Upload className="h-7 w-7" />
              </div>
              <h3 className="font-display text-2xl font-black uppercase">Upload Research Creatives</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Upload your campaign banners to begin the neuromarketing attention session. You can upload a single banner to analyze, or upload both to run side-by-side A/B usability audits with behavior-driven heatmaps.
              </p>
            </div>

            {uploadError && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 flex items-center gap-3 text-xs font-bold text-destructive animate-in fade-in select-none">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span className="flex-1">{uploadError}</span>
                <button onClick={() => setUploadError(null)} className="p-1 hover:bg-destructive/10 rounded cursor-pointer">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
              {/* SLOT A: Creative A Dropzone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "A")}
                className={`relative rounded-2xl border-2 border-dashed p-6 text-center transition duration-200 flex flex-col justify-between min-h-[300px] ${
                  uploadedImageA
                    ? "border-border bg-card shadow-sm"
                    : isDragOver && activeUploadSlot === "A"
                    ? "border-primary bg-primary/5 scale-[1.01]"
                    : "border-border hover:border-primary/40 bg-secondary/10 hover:bg-secondary/15"
                }`}
              >
                <div className="space-y-1 text-left border-b border-border/30 pb-2 mb-3">
                  <span className="text-[8px] font-black uppercase text-red-500 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/15">Slot A</span>
                  <h4 className="font-display text-xs font-black uppercase text-foreground mt-1">Creative A (Cluttered Layout)</h4>
                  <p className="text-[10px] text-muted-foreground">Standard or non-optimized layout representation.</p>
                </div>

                {uploadState !== "idle" && activeUploadSlot === "A" ? (
                  /* Simulator stage progress bar A */
                  <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4">
                    <RefreshCw className="h-8 w-8 text-primary animate-spin" />
                    <div className="space-y-2 w-full text-center">
                      <span className="text-[10px] font-black uppercase text-primary tracking-wider animate-pulse">
                        {uploadState === "uploading" ? "Uploading Creative..." :
                         uploadState === "analyzing" ? "Analyzing Visual Attention..." :
                         uploadState === "generating" ? "Generating Salience Heatmap..." : "Finalizing Analysis..."}
                      </span>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden border border-border/40">
                        <div className="h-full bg-primary transition-all duration-300 rounded-full" style={{ width: `${uploadProgress}%` }} />
                      </div>
                      <span className="text-[9px] font-mono text-muted-foreground">{uploadProgress}%</span>
                    </div>
                  </div>
                ) : uploadedImageA ? (
                  /* Thumbnail & details A */
                  <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-2">
                    <img src={uploadedImageA} alt="Preview A" className="max-h-36 rounded-lg object-contain shadow border" />
                    <div className="text-center space-y-1">
                      <span className="text-[10px] font-black uppercase text-emerald-600 flex items-center justify-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Gaze Telemetry Ready
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedImageA(null);
                        }}
                        className="text-[9px] font-black uppercase tracking-wider text-red-500 hover:text-red-700 hover:underline cursor-pointer"
                      >
                        Reset Slot
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Empty state A */
                  <div
                    onClick={() => {
                      setActiveUploadSlot("A");
                      setTimeout(() => fileInputRef.current?.click(), 50);
                    }}
                    className="flex-1 flex flex-col items-center justify-center space-y-4 py-8 cursor-pointer group"
                  >
                    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition duration-200 shadow-sm border border-primary/5">
                      <Upload className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-foreground">Click or drag & drop Creative A</p>
                      <p className="text-[9px] text-muted-foreground">PNG, JPG, JPEG, or WebP up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>

              {/* SLOT B: Creative B Dropzone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "B")}
                className={`relative rounded-2xl border-2 border-dashed p-6 text-center transition duration-200 flex flex-col justify-between min-h-[300px] ${
                  uploadedImageB
                    ? "border-border bg-card shadow-sm"
                    : isDragOver && activeUploadSlot === "B"
                    ? "border-primary bg-primary/5 scale-[1.01]"
                    : "border-border hover:border-primary/40 bg-secondary/10 hover:bg-secondary/15"
                }`}
              >
                <div className="space-y-1 text-left border-b border-border/30 pb-2 mb-3">
                  <span className="text-[8px] font-black uppercase text-emerald-600 bg-emerald-600/10 px-2 py-0.5 rounded border border-emerald-600/15">Slot B</span>
                  <h4 className="font-display text-xs font-black uppercase text-foreground mt-1">Creative B (Optimized Layout)</h4>
                  <p className="text-[10px] text-muted-foreground">Streamlined or highly optimized visual guide variant.</p>
                </div>

                {uploadState !== "idle" && activeUploadSlot === "B" ? (
                  /* Simulator stage progress bar B */
                  <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4">
                    <RefreshCw className="h-8 w-8 text-primary animate-spin" />
                    <div className="space-y-2 w-full text-center">
                      <span className="text-[10px] font-black uppercase text-primary tracking-wider animate-pulse">
                        {uploadState === "uploading" ? "Uploading Creative..." :
                         uploadState === "analyzing" ? "Analyzing Visual Attention..." :
                         uploadState === "generating" ? "Generating Salience Heatmap..." : "Finalizing Analysis..."}
                      </span>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden border border-border/40">
                        <div className="h-full bg-primary transition-all duration-300 rounded-full" style={{ width: `${uploadProgress}%` }} />
                      </div>
                      <span className="text-[9px] font-mono text-muted-foreground">{uploadProgress}%</span>
                    </div>
                  </div>
                ) : uploadedImageB ? (
                  /* Thumbnail & details B */
                  <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-2">
                    <img src={uploadedImageB} alt="Preview B" className="max-h-36 rounded-lg object-contain shadow border" />
                    <div className="text-center space-y-1">
                      <span className="text-[10px] font-black uppercase text-emerald-600 flex items-center justify-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Gaze Telemetry Ready
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedImageB(null);
                        }}
                        className="text-[9px] font-black uppercase tracking-wider text-red-500 hover:text-red-700 hover:underline cursor-pointer"
                      >
                        Reset Slot
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Empty state B */
                  <div
                    onClick={() => {
                      setActiveUploadSlot("B");
                      setTimeout(() => fileInputRef.current?.click(), 50);
                    }}
                    className="flex-1 flex flex-col items-center justify-center space-y-4 py-8 cursor-pointer group"
                  >
                    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition duration-200 shadow-sm border border-primary/5">
                      <Upload className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-foreground">Click or drag & drop Creative B</p>
                      <p className="text-[9px] text-muted-foreground">PNG, JPG, JPEG, or WebP up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center pt-4 border-t border-border/40 gap-3">
              <button
                onClick={() => {
                  setWizardStep(3);
                }}
                className="h-10 px-5 rounded-xl border border-border hover:bg-secondary text-stone-700 font-bold uppercase text-xs transition cursor-pointer"
              >
                Use Platform Defaults
              </button>
              <button
                disabled={!uploadedImageA && !uploadedImageB}
                onClick={() => setWizardStep(2)}
                className={`inline-flex items-center gap-2 h-10 px-6 rounded-xl text-xs font-black uppercase tracking-wider shadow transition cursor-pointer ${
                  uploadedImageA || uploadedImageB
                    ? "bg-primary text-primary-foreground hover:bg-primary/95" 
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Configure Webcam Calibration <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </Card>
        </div>
      )}
 
       {wizardStep === 2 && (
         <Card className="max-w-5xl mx-auto p-6 border-t-4 border-t-primary">
           <div className="flex items-start justify-between gap-4 border-b border-border/50 pb-4">
             <div>
               <h3 className="font-display text-xl font-black uppercase">Calibration System</h3>
               <p className="mt-1 text-xs text-muted-foreground">Click each point twice while looking at it. This preserves the current webcam-style calibration behavior without changing platform navigation.</p>
             </div>
             <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase text-primary">
               {totalClicks}/{TOTAL_REQUIRED_CLICKS} clicks
             </span>
           </div>
           <div className="relative mt-6 h-[520px] rounded-2xl border border-border bg-stone-950 overflow-hidden">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />
             {CALIBRATION_POINTS.map((point) => {
               const clicks = calibrationClicks[point.id] || 0;
               const complete = clicks >= REQUIRED_CALIBRATION_CLICKS;
               return (
                 <button
                   key={point.id}
                   onClick={() => handleCalibrationClick(point.id)}
                   className={`absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition ${
                     complete ? "border-emerald-400 bg-emerald-400/20 text-emerald-100" : "border-primary bg-primary/20 text-white hover:scale-110"
                   }`}
                   style={{ left: point.x, top: point.y }}
                 >
                   <span className="text-xs font-black">{complete ? <CheckCircle2 className="mx-auto h-5 w-5" /> : clicks + 1}</span>
                 </button>
               );
             })}
           </div>
           <div className="mt-5 flex justify-between gap-3">
             <button onClick={() => setWizardStep(1)} className="h-9 px-4 rounded-xl border border-border bg-card text-xs font-bold uppercase hover:bg-secondary transition">
               Back
             </button>
             <button onClick={() => setWizardStep(3)} className="h-9 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-black uppercase hover:bg-primary/95 transition">
               Skip Calibration
             </button>
           </div>
         </Card>
       )}
 
       {wizardStep === 3 && (
         <Card className="max-w-4xl mx-auto p-8 border-t-4 border-t-primary">
           <div className="grid gap-6 md:grid-cols-[1fr_0.9fr] items-center">
             <div className="space-y-4">
               <div className="chip">Session Ready</div>
               <h3 className="font-display text-2xl font-black uppercase">Visual Attention Workspace</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                 Your creative asset is loaded and biometric regression is synced. Review detailed heatmaps, scanpath orders, fixation tracking, and executive insights below.
               </p>
               <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase">
                 <span className="rounded-full border border-border px-3 py-1">Heatmaps</span>
                 <span className="rounded-full border border-border px-3 py-1">Fixations</span>
                 <span className="rounded-full border border-border px-3 py-1">AOI Metrics</span>
                 <span className="rounded-full border border-border px-3 py-1">Replay</span>
                 <span className="rounded-full border border-border px-3 py-1">PDF Report</span>
               </div>
             </div>
             <div className="rounded-2xl border border-border bg-secondary/30 p-4 space-y-3">
               <div className="flex items-center gap-2 text-sm font-black">
                 <Activity className="h-4 w-4 text-primary" /> Telemetry Status
               </div>
               <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                 <div className="rounded-xl bg-card p-3 border border-border/50"><span className="block text-muted-foreground">Calibration</span>{calibrated ? "Verified" : "Skipped"}</div>
                 <div className="rounded-xl bg-card p-3 border border-border/50"><span className="block text-muted-foreground">Accuracy</span>94.8%</div>
                 <div className="rounded-xl bg-card p-3 border border-border/50"><span className="block text-muted-foreground">Panel</span>50 users</div>
                 <div className="rounded-xl bg-card p-3 border border-border/50"><span className="block text-muted-foreground">Frames lost</span>1.7%</div>
               </div>
             </div>
           </div>
           <div className="mt-6 flex justify-end">
             <button onClick={() => setWizardStep(4)} className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-primary-foreground text-xs font-black uppercase tracking-wider shadow hover:bg-primary/95 transition">
               Enter Attention Lab <ChevronRight className="h-4 w-4" />
             </button>
           </div>
         </Card>
       )}
 
       {wizardStep === 4 && (
         <div className="mx-auto max-w-7xl space-y-6 px-4 md:px-6">
           <div className="border-b border-border/40 pb-4">
             <h1 className="font-display text-xl md:text-2xl font-black uppercase tracking-tight">Live Eye Tracking & Visual Attention Analysis</h1>
             <p className="mt-1 max-w-3xl text-xs text-muted-foreground leading-relaxed">
               Realistic heatmaps, fixation mapping, gaze replay, AOI analysis, and downloadable executive reporting for your custom creative.
             </p>
           </div>
 
           <div ref={analysisRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
             <div className="lg:col-span-3 space-y-6">
                <Card className="p-5 space-y-4">
                  <div className="flex items-center gap-2 border-b border-border/30 pb-2">
                    <Settings className="h-4 w-4 text-primary" />
                    <h3 className="font-display text-xs font-black uppercase">Session Details</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-[10px] font-bold">
                    <div className="rounded-xl border border-border/40 bg-secondary/35 p-2"><span className="block text-[8px] uppercase text-muted-foreground">Participant</span>MF-PANEL-50</div>
                    <div className="rounded-xl border border-border/40 bg-secondary/35 p-2"><span className="block text-[8px] uppercase text-muted-foreground">Device</span>Desktop</div>
                    <div className="rounded-xl border border-border/40 bg-secondary/35 p-2"><span className="block text-[8px] uppercase text-muted-foreground">Accuracy</span><span className="text-emerald-600">94.8%</span></div>
                    <div className="rounded-xl border border-border/40 bg-secondary/35 p-2"><span className="block text-[8px] uppercase text-muted-foreground">Stimulus</span>Uploaded</div>
                  </div>
                </Card>

                <Card className="p-5 space-y-4">
                  <div className="flex items-center gap-2 border-b border-border/30 pb-2">
                    <Eye className="h-4 w-4 text-primary" />
                    <h3 className="font-display text-xs font-black uppercase">Active Stimulus</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2 select-none">
                    {/* Creative A Toggle */}
                    <button
                      onClick={() => {
                        setActiveVersion("A");
                        setViewMode("heatmap");
                      }}
                      className={`relative rounded-xl border p-2 text-left transition select-none cursor-pointer ${
                        activeVersion === "A" && viewMode !== "comparison"
                          ? "border-primary bg-primary/5 shadow-sm scale-[1.01]"
                          : "border-border bg-card hover:bg-secondary/40"
                      }`}
                    >
                      <span className="block text-[8px] font-black uppercase text-muted-foreground mb-1">Creative A</span>
                      {uploadedImageA ? (
                        <img src={uploadedImageA} alt="Thumbnail A" className="h-14 w-full rounded object-cover border" />
                      ) : (
                        <div className="h-14 w-full rounded border bg-secondary/50 flex items-center justify-center text-[7.5px] font-bold text-muted-foreground uppercase text-center p-1 leading-tight">Default A (Cluttered)</div>
                      )}
                      <div className="mt-1 text-[7.5px] font-black text-center uppercase tracking-wide text-primary">
                        {activeVersion === "A" && viewMode !== "comparison" ? "★ Focus" : "Select"}
                      </div>
                    </button>

                    {/* Creative B Toggle */}
                    <button
                      onClick={() => {
                        setActiveVersion("B");
                        setViewMode("heatmap");
                      }}
                      className={`relative rounded-xl border p-2 text-left transition select-none cursor-pointer ${
                        activeVersion === "B" && viewMode !== "comparison"
                          ? "border-primary bg-primary/5 shadow-sm scale-[1.01]"
                          : "border-border bg-card hover:bg-secondary/40"
                      }`}
                    >
                      <span className="block text-[8px] font-black uppercase text-muted-foreground mb-1">Creative B</span>
                      {uploadedImageB ? (
                        <img src={uploadedImageB} alt="Thumbnail B" className="h-14 w-full rounded object-cover border" />
                      ) : (
                        <div className="h-14 w-full rounded border bg-secondary/50 flex items-center justify-center text-[7.5px] font-bold text-muted-foreground uppercase text-center p-1 leading-tight">Default B (Optimized)</div>
                      )}
                      <div className="mt-1 text-[7.5px] font-black text-center uppercase tracking-wide text-primary">
                        {activeVersion === "B" && viewMode !== "comparison" ? "★ Focus" : "Select"}
                      </div>
                    </button>
                  </div>

                  {/* A/B Comparison View Switcher */}
                  <button
                    onClick={() => setViewMode("comparison")}
                    className={`w-full inline-flex h-8 items-center justify-center gap-2 rounded-xl text-[9px] font-black uppercase tracking-wider transition cursor-pointer border ${
                      viewMode === "comparison"
                        ? "bg-primary text-primary-foreground border-transparent shadow"
                        : "bg-secondary/35 text-stone-700 hover:text-foreground border-border/80 hover:bg-secondary/50"
                    }`}
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" /> A/B Comparison View
                  </button>

                  <hr className="border-border/40" />

                  {/* Replacement Actions */}
                  <div className="space-y-1.5 select-none">
                    <span className="text-[7.5px] font-black uppercase text-muted-foreground tracking-wider block">Replace creative</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => {
                          setActiveUploadSlot("A");
                          setTimeout(() => fileInputRef.current?.click(), 50);
                        }}
                        className="inline-flex h-7 items-center justify-center gap-1.5 rounded-lg bg-secondary/80 hover:bg-secondary border border-border/60 text-[8.5px] font-black uppercase text-stone-700 hover:text-foreground transition cursor-pointer"
                      >
                        <Upload className="h-3 w-3" /> Creative A
                      </button>
                      <button
                        onClick={() => {
                          setActiveUploadSlot("B");
                          setTimeout(() => fileInputRef.current?.click(), 50);
                        }}
                        className="inline-flex h-7 items-center justify-center gap-1.5 rounded-lg bg-secondary/80 hover:bg-secondary border border-border/60 text-[8.5px] font-black uppercase text-stone-700 hover:text-foreground transition cursor-pointer"
                      >
                        <Upload className="h-3 w-3" /> Creative B
                      </button>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 space-y-4">
                  <div className="flex items-center gap-2 border-b border-border/30 pb-2">
                    <SlidersHorizontal className="h-4 w-4 text-primary" />
                    <h3 className="font-display text-xs font-black uppercase">Analysis Controls</h3>
                  </div>
                  <label className="block space-y-2 text-[10px] font-bold uppercase text-muted-foreground">
                    Heatmap opacity
                    <input type="range" min="25" max="100" value={heatmapOpacity} onChange={(event) => setHeatmapOpacity(Number(event.target.value))} className="w-full accent-[#8B1E1E]" />
                  </label>
                  <label className="block space-y-2 text-[10px] font-bold uppercase text-muted-foreground">
                    Fixation filter: {minFixationDuration}ms+
                    <input type="range" min="0" max="1500" step="100" value={minFixationDuration} onChange={(event) => setMinFixationDuration(Number(event.target.value))} className="w-full accent-[#8B1E1E]" />
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-black uppercase">
                    {[
                      ["Heatmap", showHeatmap, setShowHeatmap],
                      ["Fixations", showFixations, setShowFixations],
                      ["Scanpath", showScanpath, setShowScanpath],
                      ["AOIs", showAois, setShowAois],
                    ].map(([label, value, setter]) => (
                      <button
                        key={String(label)}
                        onClick={() => (setter as React.Dispatch<React.SetStateAction<boolean>>)((current) => !current)}
                        className={`rounded-xl border px-2 py-2 transition ${value ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground"}`}
                      >
                        {String(label)}
                      </button>
                    ))}
                  </div>
                </Card>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <div className="rounded-3xl bg-stone-900 p-5 text-stone-200 shadow-sm">
                <div className="flex flex-col gap-3 border-b border-white/10 pb-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-2">
                    <ScanEye className="h-4 w-4 text-primary" />
                    <span className="font-display text-[10px] font-black uppercase tracking-wider text-white">Visual Attention Workstation</span>
                  </div>
                  <div className="flex overflow-x-auto rounded-xl border border-white/10 bg-white/5 p-1">
                    {[
                      ["heatmap", "Heatmap"],
                      ["fixations", "Fixations"],
                      ["aoi", "AOI"],
                      ["replay", "Replay"],
                    ].map(([id, label]) => (
                      <button
                        key={id}
                        onClick={() => setViewMode(id as ViewMode)}
                        className={`h-8 shrink-0 rounded-lg px-3 text-[9px] font-black uppercase tracking-wider transition ${viewMode === id ? "bg-primary text-white shadow" : "text-stone-400 hover:text-white"}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex min-h-[500px] items-center justify-center">
                  {viewMode === "comparison" ? (
                    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                      <ComparisonCard version="A" uploadedImageA={uploadedImageA} uploadedImageB={uploadedImageB} />
                      <ComparisonCard version="B" uploadedImageA={uploadedImageA} uploadedImageB={uploadedImageB} />
                    </div>
                  ) : (
                    <div className="relative w-full max-w-[430px]">
                      {uploadedImage ? (
                        <img src={uploadedImage} alt="Uploaded stimulus" className="h-[430px] w-full rounded-lg border border-stone-200 bg-white object-contain p-3 shadow-xl" />
                      ) : (
                        <CreativeMockup version={activeVersion} />
                      )}
                      <AttentionOverlay
                        aois={uploadedImage ? (activeVersion === "A" ? UPLOADED_AOIS_A : UPLOADED_AOIS_B) : AOIS[activeVersion]}
                        fixations={visibleFixations}
                        gazePoints={gazePoints}
                        mode={viewMode}
                        showAois={showAois}
                        showFixations={showFixations}
                        showHeatmap={showHeatmap}
                        showScanpath={showScanpath}
                        heatmapOpacity={heatmapOpacity}
                        hoveredAoi={hoveredAoi}
                        onAoiHover={setHoveredAoi}
                        onFixationSelect={setSelectedFixation}
                        selectedFixationId={selectedFixation?.id ?? null}
                      />
                    </div>
                  )}
                </div>

                <div className="mt-5 space-y-2 border-t border-white/10 pt-3">
                  <div className="flex items-center justify-between text-[9px] font-mono text-stone-400">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setViewMode("replay");
                          setIsPlaying((current) => !current);
                        }}
                        className="rounded-lg bg-white/10 p-1.5 text-white hover:bg-white/15 transition"
                      >
                        {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                      </button>
                      <button
                        onClick={() => {
                          setViewMode("replay");
                          setPlayhead(0);
                          setIsPlaying(false);
                        }}
                        className="rounded-lg bg-white/10 p-1.5 text-white hover:bg-white/15 transition"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                      </button>
                      <span>{viewMode === "replay" ? `Replay ${playhead.toFixed(1)}s` : "Overlay controls ready"}</span>
                    </div>
                    <span>10.0s session</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={viewMode === "replay" ? playhead : 10}
                    onChange={(event) => {
                      setViewMode("replay");
                      setIsPlaying(false);
                      setPlayhead(Number(event.target.value));
                    }}
                    className="w-full accent-[#8B1E1E]"
                  />
                  <div className="flex justify-between text-[7px] font-mono text-stone-500">
                    <span>Face</span>
                    <span>Headline</span>
                    <span>Pricing</span>
                    <span className="text-red-400">CTA discovery</span>
                    <span>Decision</span>
                  </div>
                </div>
              </div>

              <Card className="p-5">
                <div className="mb-4 flex items-center justify-between border-b border-border/40 pb-2">
                  <h3 className="font-display text-xs font-black uppercase">Areas of Interest Scorecard</h3>
                  <span className="text-[9px] font-black uppercase text-muted-foreground">Hover regions on creative</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-border text-[9px] uppercase text-muted-foreground">
                      <tr>
                        <th className="py-2 pr-3">AOI</th>
                        <th className="py-2 text-center">Fixations</th>
                        <th className="py-2 text-center">TTFF</th>
                        <th className="py-2 text-center">Dwell</th>
                        <th className="py-2 text-center">Share</th>
                        <th className="py-2 text-center">Revisits</th>
                        <th className="py-2 text-center">Avg</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40 font-bold">
                      {metrics.map((metric: any) => (
                        <tr key={metric.id} onMouseEnter={() => setHoveredAoi(metric.id)} onMouseLeave={() => setHoveredAoi(null)} className="hover:bg-secondary/30">
                          <td className="py-3 pr-3">
                            <div className="font-black text-foreground">{metric.label}</div>
                            <div className="text-[9px] font-semibold text-muted-foreground">{metric.description}</div>
                          </td>
                          <td className="py-3 text-center font-mono">{metric.fixations}</td>
                          <td className="py-3 text-center font-mono">{formatSeconds(metric.ttff)}</td>
                          <td className="py-3 text-center font-mono">{metric.dwell}</td>
                          <td className="py-3 text-center font-mono">{metric.share}%</td>
                          <td className="py-3 text-center font-mono">{metric.revisits}</td>
                          <td className="py-3 text-center font-mono">{metric.avgDuration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <Card className="p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-border/30 pb-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    <h3 className="font-display text-xs font-black uppercase">Live Diagnostics</h3>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
                <MetricTile label="Fixations & Gaze Points" value={`${visibleFixations.length} fixations`} detail={`${gazePoints.length} gaze points`} />
                <MetricTile label="Time to First CTA Fixation" value={formatSeconds(ctaMetric?.ttff ?? null)} detail={activeVersion === "A" ? "Late discovery" : "Fast discovery"} />
                <MetricTile label="CTA Dwell Time" value={ctaMetric?.dwell ?? "-"} detail={`${ctaMetric?.share ?? 0}% attention share`} />
                <MetricTile label="Headline Dwell" value={headlineMetric?.dwell ?? "-"} detail={activeVersion === "A" ? "Needs simplification" : "Easy to scan"} />
                <MetricTile label="Average Fixation Duration" value={avgFixation ? `${avgFixation}ms` : "-"} detail="Across visible sequence" />
                <MetricTile label="Fixation Sequence" value={visibleFixations.map((item) => item.id).join(" -> ") || "-"} detail="Current gaze order" />
              </Card>

              <Card className="p-5 space-y-3">
                <div className="flex items-center gap-2 border-b border-border/30 pb-2">
                  <Flame className="h-4 w-4 text-primary" />
                  <h3 className="font-display text-xs font-black uppercase">Key Findings</h3>
                </div>
                <ul className="space-y-2 text-[11px] font-semibold leading-snug text-stone-700">
                  {getSummary(activeVersion).map((finding) => (
                    <li key={finding} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-5 space-y-3">
                <div className="flex items-center gap-2 border-b border-border/30 pb-2">
                  <Info className="h-4 w-4 text-primary" />
                  <h3 className="font-display text-xs font-black uppercase">Simple Insight</h3>
                </div>
                <p className="text-[11px] font-semibold leading-relaxed text-stone-700">{getReportInsight(activeVersion)}</p>
              </Card>

              <Card className="p-5 space-y-3">
                <div className="flex items-center gap-2 border-b border-border/30 pb-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <h3 className="font-display text-xs font-black uppercase">Report System</h3>
                </div>
                <button
                  onClick={() => setReportOpen(true)}
                  className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-primary text-xs font-black uppercase tracking-wider text-primary-foreground shadow hover:bg-primary/95 transition"
                >
                  <Download className="h-3.5 w-3.5" /> Generate Research Report
                </button>
              </Card>

              {activeAoiMetric && (
                <Card className="p-5 space-y-2 border-primary/20">
                  <div className="text-[9px] font-black uppercase text-primary">AOI Hover Detail</div>
                  <div className="font-display text-sm font-black">{activeAoiMetric.label}</div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                    <span>{activeAoiMetric.fixations} fixations</span>
                    <span>{activeAoiMetric.dwell} dwell</span>
                    <span>{activeAoiMetric.share}% share</span>
                    <span>{activeAoiMetric.revisits} revisits</span>
                  </div>
                  <p className="text-[10px] leading-snug text-muted-foreground">{activeAoiMetric.recommendation}</p>
                </Card>
              )}
            </div>
          </div>

        </div>
      )}

      {selectedFixation && (
        <div className="fixed inset-y-0 right-0 z-[1000] w-full max-w-sm border-l border-border bg-card p-6 shadow-2xl">
          <button onClick={() => setSelectedFixation(null)} className="absolute right-4 top-4 rounded-lg border border-border p-1.5 hover:bg-secondary transition">
            <X className="h-4 w-4" />
          </button>
          <div className="space-y-5 pr-8">
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-primary">Fixation Inspection</div>
              <h3 className="mt-1 font-display text-xl font-black">Fixation #{selectedFixation.id}</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 text-[11px] font-bold">
              <div className="rounded-xl border border-border bg-secondary/30 p-3"><span className="block text-[8px] uppercase text-muted-foreground">Viewed Element</span>{selectedFixation.element}</div>
              <div className="rounded-xl border border-border bg-secondary/30 p-3"><span className="block text-[8px] uppercase text-muted-foreground">Viewed At</span>{selectedFixation.start.toFixed(1)} seconds</div>
              <div className="rounded-xl border border-border bg-secondary/30 p-3"><span className="block text-[8px] uppercase text-muted-foreground">Duration</span>{(selectedFixation.duration / 1000).toFixed(1)} seconds</div>
              <div className="rounded-xl border border-border bg-secondary/30 p-3"><span className="block text-[8px] uppercase text-muted-foreground">Strength</span>{selectedFixation.strength}</div>
            </div>
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase text-muted-foreground">Simple Interpretation</div>
              <p className="text-sm font-semibold leading-relaxed text-stone-700">{selectedFixation.interpretation}</p>
            </div>
            <div className="space-y-2 rounded-2xl border border-primary/15 bg-primary/5 p-4">
              <div className="text-[10px] font-black uppercase text-primary">Suggested Improvement</div>
              <p className="text-sm font-semibold leading-relaxed text-stone-700">{selectedFixation.suggestion}</p>
            </div>
          </div>
        </div>
      )}

      {reportOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4 border-b border-border/50 pb-4">
              <div>
                <div className="flex items-center gap-2 text-primary">
                  <FileText className="h-5 w-5" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Mahindra Finance Behavioral Intelligence Report</span>
                </div>
                <h2 className="mt-2 font-display text-xl font-black uppercase">Visual Attention Research Report</h2>
                <p className="mt-1 text-xs text-muted-foreground">Includes heatmap screenshot, fixation analysis, AOI metrics, A/B comparison, executive summary, usability findings, and business recommendations.</p>
              </div>
              <button onClick={() => setReportOpen(false)} className="rounded-lg border border-border p-1.5 hover:bg-secondary transition">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-5">
              <div className="rounded-2xl border border-border bg-secondary/20 p-4">
                <div className="text-[9px] font-black uppercase text-primary">Executive Summary</div>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-stone-700">{getReportInsight(activeVersion)}</p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {getSummary(activeVersion).map((finding) => (
                  <div key={finding} className="rounded-xl border border-border bg-card p-3 text-xs font-bold text-stone-700">{finding}</div>
                ))}
              </div>
              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-secondary/40 text-[9px] uppercase text-muted-foreground">
                    <tr>
                      <th className="p-3">AOI</th>
                      <th className="p-3 text-center">Fixations</th>
                      <th className="p-3 text-center">Dwell</th>
                      <th className="p-3 text-center">Share</th>
                      <th className="p-3 text-center">Recommendation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40 font-semibold">
                    {metrics.map((metric: any) => (
                      <tr key={metric.id}>
                        <td className="p-3 font-black">{metric.label}</td>
                        <td className="p-3 text-center font-mono">{metric.fixations}</td>
                        <td className="p-3 text-center font-mono">{metric.dwell}</td>
                        <td className="p-3 text-center font-mono">{metric.share}%</td>
                        <td className="p-3">{metric.recommendation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-5 flex justify-end border-t border-border/50 pt-4">
              <button onClick={generateReport} disabled={exporting} className="inline-flex h-9 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-black uppercase tracking-wider text-primary-foreground shadow hover:bg-primary/95 transition disabled:opacity-60">
                <Download className="h-3.5 w-3.5" /> {exporting ? "Preparing PDF" : "Download PDF Report"}
              </button>
            </div>
          </div>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} onClick={(e) => e.stopPropagation()} className="hidden" />
    </AppLayout>
  );
}

function MetricTile({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-xl border border-border/40 bg-secondary/35 p-3">
      <div className="text-[8px] font-black uppercase leading-none text-muted-foreground">{label}</div>
      <div className="mt-2 break-words font-display text-sm font-black leading-tight text-foreground">{value}</div>
      <div className="mt-1 text-[9px] font-semibold leading-snug text-muted-foreground">{detail}</div>
    </div>
  );
}

function ComparisonCard({ version, uploadedImageA, uploadedImageB }: { version: CreativeVersion; uploadedImageA: string | null; uploadedImageB: string | null }) {
  const uploadedImage = version === "A" ? uploadedImageA : uploadedImageB;
  const metrics = getAoiMetrics(uploadedImage ? (version === "A" ? "uploaded_a" : "uploaded_b") : version);
  const cta = metrics.find((metric: any) => metric.id === "cta");
  const aois = uploadedImage ? (version === "A" ? UPLOADED_AOIS_A : UPLOADED_AOIS_B) : AOIS[version];
  const defaultFixations = version === "A" ? UPLOADED_FIXATIONS_A : UPLOADED_FIXATIONS_B;
  const fixations = uploadedImage ? defaultFixations : FIXATIONS[version];
  const gazePoints = uploadedImage ? buildGazePoints(defaultFixations) : GAZE_POINTS[version];

  return (
    <div className="rounded-2xl border border-white/10 bg-white p-3 text-stone-900">
      <div className="mb-3 flex items-center justify-between">
        <span className={`rounded-full px-2 py-1 text-[8px] font-black uppercase text-white ${version === "A" ? "bg-red-600" : "bg-emerald-600"}`}>
          Version {version}: {version === "A" ? "Cluttered Layout" : "Optimized Layout"}
        </span>
        <span className="text-[8px] font-black uppercase text-stone-500">CTA TTFF {formatSeconds(cta?.ttff ?? null)}</span>
      </div>
      <div className="relative h-[360px] flex items-center justify-center overflow-hidden">
        {uploadedImage ? (
          <img src={uploadedImage} alt={`Uploaded Version ${version}`} className="h-[360px] w-full rounded-lg border border-stone-200 bg-white object-contain p-2 shadow-md" />
        ) : (
          <CreativeMockup version={version} compact />
        )}
        <AttentionOverlay
          aois={aois}
          fixations={fixations}
          gazePoints={gazePoints}
          mode="heatmap"
          showAois
          showFixations
          showHeatmap
          showScanpath={version === "A"}
          heatmapOpacity={70}
          hoveredAoi={null}
          onAoiHover={() => undefined}
          onFixationSelect={() => undefined}
          selectedFixationId={null}
          compact
        />
      </div>
      <p className="mt-3 text-[10px] font-semibold leading-snug text-stone-600">
        {version === "A"
          ? "Scattered gaze, high revisits, late CTA discovery, and form hesitation."
          : "Focused gaze, faster CTA recognition, fewer detours, and cleaner decision flow."}
      </p>
    </div>
  );
}

function AttentionOverlay({
  aois,
  fixations,
  gazePoints,
  mode,
  showAois,
  showFixations,
  showHeatmap,
  showScanpath,
  heatmapOpacity,
  hoveredAoi,
  onAoiHover,
  onFixationSelect,
  selectedFixationId,
  compact = false,
}: {
  aois: Aoi[];
  fixations: Fixation[];
  gazePoints: GazePoint[];
  mode: ViewMode;
  showAois: boolean;
  showFixations: boolean;
  showHeatmap: boolean;
  showScanpath: boolean;
  heatmapOpacity: number;
  hoveredAoi: string | null;
  onAoiHover: (id: string | null) => void;
  onFixationSelect: (fixation: Fixation) => void;
  selectedFixationId: number | null;
  compact?: boolean;
}) {
  const shouldShowHeatmap = showHeatmap && (mode === "heatmap" || mode === "replay");
  const shouldShowFixations = showFixations && (mode === "fixations" || mode === "replay" || mode === "heatmap");
  const shouldShowAois = showAois && (mode === "aoi" || mode === "replay");
  const shouldShowScanpath = showScanpath && (mode === "fixations" || mode === "replay");
  const path = fixations.map((fixation) => `${fixation.x * 100},${fixation.y * 100}`).join(" ");
  const activePoint = gazePoints[gazePoints.length - 1];

  return (
    <div className="absolute inset-0 rounded-lg">
      {shouldShowHeatmap && (
        <div className="absolute inset-0 overflow-hidden rounded-lg mix-blend-multiply" style={{ opacity: heatmapOpacity / 100 }}>
          {gazePoints.map((point, index) => {
            const size = compact ? 76 + point.weight * 10 : 96 + point.weight * 16;
            const core = point.weight > 1.3 ? "rgba(220,38,38,.56)" : point.weight > 0.7 ? "rgba(245,158,11,.42)" : "rgba(34,197,94,.24)";
            return (
              <span
                key={`${point.t}-${index}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  left: `${point.x * 100}%`,
                  top: `${point.y * 100}%`,
                  width: size,
                  height: size,
                  background: `radial-gradient(circle, ${core} 0%, rgba(245,158,11,.26) 32%, rgba(34,197,94,.13) 58%, rgba(34,197,94,0) 78%)`,
                  filter: "blur(8px)",
                }}
              />
            );
          })}
        </div>
      )}

      {shouldShowScanpath && fixations.length > 1 && (
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline points={path} fill="none" stroke="rgba(139,30,30,.72)" strokeWidth="0.7" strokeDasharray="1.6 1.2" vectorEffect="non-scaling-stroke" />
        </svg>
      )}

      {shouldShowAois &&
        aois.map((aoi) => {
          const highlighted = hoveredAoi === aoi.id;
          return (
            <button
              key={aoi.id}
              onMouseEnter={() => onAoiHover(aoi.id)}
              onMouseLeave={() => onAoiHover(null)}
              className={`absolute border text-left transition ${highlighted ? "border-primary bg-primary/10" : "border-primary/45 bg-primary/[0.035]"} rounded-md`}
              style={{
                left: `${aoi.rect.left}%`,
                top: `${aoi.rect.top}%`,
                width: `${aoi.rect.width}%`,
                height: `${aoi.rect.height}%`,
              }}
            >
              <span className="absolute left-1 top-1 rounded bg-white/90 px-1.5 py-0.5 text-[7px] font-black uppercase text-primary shadow-sm">{aoi.label}</span>
            </button>
          );
        })}

      {shouldShowFixations &&
        fixations.map((fixation) => {
          const radius = Math.max(compact ? 18 : 22, Math.min(compact ? 34 : 42, fixation.duration / 55));
          const selected = selectedFixationId === fixation.id;
          return (
            <button
              key={fixation.id}
              onClick={() => onFixationSelect(fixation)}
              title={`Fixation ${fixation.id}: ${fixation.element}`}
              className={`absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-[10px] font-black text-white shadow-lg transition hover:scale-110 ${
                selected ? "bg-red-600 ring-4 ring-red-500/30" : "bg-[#8B1E1E]/85"
              }`}
              style={{
                left: `${fixation.x * 100}%`,
                top: `${fixation.y * 100}%`,
                width: radius,
                height: radius,
                boxShadow: `0 0 0 ${Math.max(4, radius / 5)}px rgba(139,30,30,.15)`,
              }}
            >
              <span>{fixation.id}</span>
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded bg-black/75 px-1 py-0.5 text-[7px] font-bold text-white">{fixation.duration}ms</span>
            </button>
          );
        })}

      {mode === "replay" && activePoint && (
        <div
          className="absolute z-30 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber-300 bg-amber-300/30 shadow-lg"
          style={{ left: `${activePoint.x * 100}%`, top: `${activePoint.y * 100}%`, width: 26, height: 26 }}
        >
          <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400" />
        </div>
      )}
    </div>
  );
}
