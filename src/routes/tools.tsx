import React, { useState, useEffect } from "react";
import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import { AppLayout } from "@/components/neuro/AppLayout";
import { Card } from "@/components/neuro/Primitives";
import { 
  Eye, Brain, Activity, Smile, Zap, FileText, Heart, Award, 
  ChevronRight, X, Check, ShieldAlert, Sparkles, Shield, BarChart3, HelpCircle,
  EyeOff, Sliders, Fingerprint, Play, Pause, RefreshCw, Cpu, Layers, TrendingUp,
  Database, Gauge, Terminal, ArrowLeft, ShieldCheck, CheckCircle2, AlertTriangle, Workflow
} from "lucide-react";
import { FmriStorytellingView } from "./fmri-view";
import { GsrStorytellingView } from "./gsr-view";

export const Route = createFileRoute("/tools")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/tools") {
      throw redirect({ to: "/tools/$toolId", params: { toolId: "eeg" }, replace: true });
    }
  },
  component: ToolsLayoutRoute,
});

function ToolsLayoutRoute() {
  return <Outlet />;
}

// ═══════════════════════════════════════════
// 1. COMPREHENSIVE DATASET (26 NEUROSCIENCE TOOLS CALIBRATED FOR MARKETING)
// ═══════════════════════════════════════════
export const neuroscienceToolsList = [
  // ─── CNS TOOLS (5 Tools) ───
  {
    id: "eeg",
    name: "EEG (Electroencephalography)",
    group: "cns",
    icon: Brain,
    category: "CNS Neural telemetry",
    color: "text-purple-500 bg-purple-50 border-purple-100 dark:bg-purple-950/20 dark:border-purple-900/30",
    accent: "purple",
    oneLinePurpose: "Measures scalp micro-voltage fluctuations to track active processing fatigue.",
    primaryCapability: "Detects subconscious engagement states, cognitive fatigue, and motivation shifts.",
    bestUseCase: "Testing second-by-second narrative peaks and voiceover edits in regional video campaigns.",
    detail: {
      whatItMeasures: "Frontal Alpha Asymmetry (approach vs avoidance bias) and prefrontal theta frequency load.",
      howItWorks: "Monitors scalp electrical micro-fluctuations to evaluate prefrontal cortex hemispheric stress responses.",
      principle: "Frontal Alpha Hemispheric Asymmetry",
      marketingUse: "Validating that complex financing rate tables do not trigger instant prefrontal avoidance.",
      mahindraApp: "Testing rural tractor loan TVCs to ensure interest rate displays trigger engagement rather than panic.",
      campaignExample: "PhonePe multi-sensory soundbox: Proved that regional sound triggers lowered alpha wave avoidance.",
      bestFor: "Vernacular TVC narration audits, digital landing page milestone triggers.",
      limitations: "Requires laboratory participant calibration; sensitive to physical head adjustments.",
      team: "Brand Strategy, Creative Production, Agency Partners",
      related: ["BCI Analytics", "Memory Encoding Analysis"],
      realInsight: "Prefrontal cognitive workload spiked by 80% when repayment terms were presented before familial safety anchors."
    }
  },
  {
    id: "fmri",
    name: "fMRI (Functional MRI)",
    group: "cns",
    icon: Brain,
    category: "CNS Brain Imaging",
    color: "text-purple-500 bg-purple-50 border-purple-100 dark:bg-purple-950/20 dark:border-purple-900/30",
    accent: "purple",
    oneLinePurpose: "Maps deep brain oxygenated blood flows to reveal raw subconscious reward and desire.",
    primaryCapability: "Measures metabolic activation inside reward hubs (Nucleus Accumbens) and trust zones.",
    bestUseCase: "Validating primary corporate positioning statements and core visual brand assets pre-launch.",
    detail: {
      whatItMeasures: "Blood Oxygen Level Dependent (BOLD) signals in subcortical brain layers.",
      howItWorks: "High-field magnetic resonance scanners trace local hemoglobin shifts during advertising exposure.",
      principle: "Subcortical Mesolimbic Dopaminergic Valuation",
      marketingUse: "Verifying if corporate trust claims trigger deep-seated emotional reward or amygdala threat warnings.",
      mahindraApp: "Pre-testing rural branding icons to ensure the Mahindra Finance symbol triggers trust and safety.",
      campaignExample: "Nubank corporate rebranding: verified subcortical emotional safety coordinates before global shift.",
      bestFor: "Corporate equity tracking, sensory asset audit, trust validation.",
      limitations: "High laboratory setup costs; requires participant placement in MRI machines.",
      team: "Market Research, Executive Division, Agency Lead",
      related: ["EEG (Brainwaves)", "Memory Encoding Analysis"],
      realInsight: "Deep mesolimbic reward pathways lit up 2.4x stronger when campaigns depicted community empowerment compared to dry financing percentages."
    }
  },
  {
    id: "fnirs",
    name: "fNIRS (Functional Near-Infrared)",
    group: "cns",
    icon: Activity,
    category: "CNS Lightweight Imaging",
    color: "text-purple-500 bg-purple-50 border-purple-100 dark:bg-purple-950/20 dark:border-purple-900/30",
    accent: "purple",
    oneLinePurpose: "Uses near-infrared light boundaries to map real-time prefrontal oxygenation.",
    primaryCapability: "Measures prefrontal metabolic activity in natural field testing environments.",
    bestUseCase: "Auditing branch staff software tools and customer self-service kiosk workflows.",
    detail: {
      whatItMeasures: "Oxygenated and deoxygenated hemoglobin ratios inside prefrontal cortex layers.",
      howItWorks: "Flexible light sensors on a headband emit near-infrared light, calculating biological scatter rates.",
      principle: "Prefrontal Metabolic Hemodynamics",
      marketingUse: "Stripping visual friction blocks from branch kiosks to maintain cognitive comfort.",
      mahindraApp: "Testing branch manager dealer portals to streamline KYC processing fields.",
      campaignExample: "Banca Widiba kiosk audit: redesigned entry fields after identifying prefrontal stress events.",
      bestFor: "Operational efficiency, branch software audit, transactional stress mapping.",
      limitations: "Limited to cortical layers; cannot measure subcortical reward mechanisms.",
      team: "UX Engineering, Digital Product Operations, CRM Team",
      related: ["EEG (Brainwaves)", "Cognitive Load Analysis"],
      realInsight: "Prefrontal oxygenation demands dropped by 32% when dealer tables consolidated multiple columns into a progressive vertical flow."
    }
  },
  {
    id: "meg",
    name: "MEG (Magnetoencephalography)",
    group: "cns",
    icon: Brain,
    category: "CNS Magnetic Telemetry",
    color: "text-purple-500 bg-purple-50 border-purple-100 dark:bg-purple-950/20 dark:border-purple-900/30",
    accent: "purple",
    oneLinePurpose: "Traces magnetic fields produced by active neural currents with millisecond precision.",
    primaryCapability: "Pinpoints exactly when and where the brain processes layout structures.",
    bestUseCase: "Evaluating millisecond-level cognitive triggers in dynamic mobile checkouts and sound alerts.",
    detail: {
      whatItMeasures: "Extremely weak magnetic field oscillations induced by synaptic electrical flows.",
      howItWorks: "Superconducting Quantum Interference Devices (SQUIDs) measure active brain magnetic cycles.",
      principle: "High-Temporal Resolution Magnetic Localization",
      marketingUse: "Finetuning payment notification sounds to confirm transaction success instantly.",
      mahindraApp: "Acoustic calibration of regional collections voice bots to prevent customer panic signals.",
      campaignExample: "CRED checkout sound audit: aligned audio tone to secure immediate relief waves.",
      bestFor: "Sonic branding, millisecond interface transitions, warning banner calibration.",
      limitations: "Highly specialized; requires insulated laboratory setups.",
      team: "Sonic Branding, UX Engineering, Product Lead",
      related: ["EEG (Brainwaves)", "Memory Encoding Analysis"],
      realInsight: "Sonic approval tones triggered primary relief markers within 180ms when pitch sweeps rose in clean major scales."
    }
  },
  {
    id: "pet",
    name: "PET (Positron Emission Tomography)",
    group: "cns",
    icon: Zap,
    category: "CNS Metabolic Mapping",
    color: "text-purple-500 bg-purple-50 border-purple-100 dark:bg-purple-950/20 dark:border-purple-900/30",
    accent: "purple",
    oneLinePurpose: "Evaluates brain glucose metabolization to track baseline chemical receptor trends.",
    primaryCapability: "Traces neurotransmitter receptor binding density mapping (e.g. dopamine, serotonin).",
    bestUseCase: "Deep academic benchmarking of sensory and emotional brand triggers.",
    detail: {
      whatItMeasures: "Positron-emitting radiotracer concentrations mapping brain tissue metabolic rates.",
      howItWorks: "Scans gamma photon pairs released by positron collisions to plot 3D metabolic activity grids.",
      principle: "Dopaminergic Synaptic Transmission Mapping",
      marketingUse: "Validating that long-term branding assets construct sustainable equity over short-term offers.",
      mahindraApp: "Validating the long-term trust equity of our customer relationship templates.",
      campaignExample: "Global Finance brand benchmark: verified chemical trust triggers across decades.",
      bestFor: "Academic brand equity validation, sensory asset auditing.",
      limitations: "Requires clinical environment and radiotracer injections; high cost.",
      team: "Academic Research Partners, Brand Strategy Team",
      related: ["fMRI (Functional MRI)", "Implicit Association (IAT)"],
      realInsight: "Familiar brand identifiers buffer stress-response centers, keeping amygdala signals stable during difficult compliance requests."
    }
  },

  // ─── ANS BIOMETRICS (5 Tools) ───
  {
    id: "gsr",
    name: "GSR / EDA (Galvanic Skin Response)",
    group: "ans",
    icon: Activity,
    category: "ANS Sympathetic Arousal",
    color: "text-cyan-500 bg-cyan-50 border-cyan-100 dark:bg-cyan-950/20 dark:border-cyan-900/30",
    accent: "cyan",
    oneLinePurpose: "Measures sympathetic micro-sweat changes to track immediate stress.",
    primaryCapability: "Detects acute subconscious anxiety events and overall physiological arousal.",
    bestUseCase: "Pinpointing the exact inputs driving form abandonment in digital KYC and loan applications.",
    detail: {
      whatItMeasures: "Sympathetic nervous system skin conductance response (SCR) event spikes.",
      howItWorks: "Passes tiny currents between electrodes on fingers or wrists to record micro-sweat conductance.",
      principle: "Sympathetic Nervous Sweat Arousal",
      marketingUse: "Diagnosing emotional stress barriers during Aadhaar or document upload checkpoints.",
      mahindraApp: "Identifying which fields in digital loan calculators trigger user hesitation or panic.",
      campaignExample: "Revolut biometric KYC: Mapped fear alerts, prompting reassuring badges to lift completions.",
      bestFor: "Form friction diagnostics, KYC flow optimization, trust calibration.",
      limitations: "Measures emotional intensity (arousal) but not valence (excitement vs fear).",
      team: "UX Research, Customer Journey Design, Risk Compliance",
      related: ["Pupillometry", "HRV & ECG"],
      realInsight: "An acute sweat spike occurred precisely when users were prompted for document uploads before trust symbols appeared."
    }
  },
  {
    id: "eye-tracking",
    name: "Eye Tracking",
    group: "ans",
    icon: Eye,
    category: "ANS Visual Attention",
    color: "text-cyan-500 bg-cyan-50 border-cyan-100 dark:bg-cyan-950/20 dark:border-cyan-900/30",
    accent: "cyan",
    oneLinePurpose: "Tracks gaze coordinates and visual fixation duration to map visual attention.",
    primaryCapability: "Identifies what users notice, ignore, and read within 250ms of exposure.",
    bestUseCase: "Optimizing print poster CTA visibility and mobile landing page layouts.",
    detail: {
      whatItMeasures: "Focal gaze coordinates, pupil coordinates, saccade paths, and dwell durations.",
      howItWorks: "Infrared cameras or calibrated webcam computer vision algorithms process pupil coordinates.",
      principle: "Visual Salience & Foveal Focus Hierarchy",
      marketingUse: "Ensuring tractor loan print ad terms are readable and focus paths flow naturally.",
      mahindraApp: "Redesigning branch mobile loan KYC forms to locate crucial terms in focal start-zones.",
      campaignExample: "CRED CTA: Isolated visual clutter, siphoning background noise to lift conversions by 24%.",
      bestFor: "CTA visibility, poster scanning audits, page layout audits.",
      limitations: "Indicates precisely where a user looks, but cannot measure emotional trust.",
      team: "UX Design, Conversion Optimization, Agency Creative Audits",
      related: ["DeepGaze AI", "Predictive Attention AI"],
      realInsight: "42% of rural branch customers ignored the primary mobile financing CTA because it sat in a visual neglect zone below high-contrast tractor imagery."
    }
  },
  {
    id: "pupillometry",
    name: "Pupillometry",
    group: "ans",
    icon: Eye,
    category: "ANS Cognitive Load",
    color: "text-cyan-500 bg-cyan-50 border-cyan-100 dark:bg-cyan-950/20 dark:border-cyan-900/30",
    accent: "cyan",
    oneLinePurpose: "Measures subconscious pupil dilation changes to track cognitive effort.",
    primaryCapability: "Detects emotional arousal levels and working memory processing limits.",
    bestUseCase: "Simplifying difficult pricing calculators and loan selection screens.",
    detail: {
      whatItMeasures: "Sub-millimeter pupil diameter expansions, siphoning light reflex variations.",
      howItWorks: "High-resolution camera tracking streams measure continuous pupil expansion in real-time.",
      principle: "Locus Coeruleus-Norepinephrine Autonomic Dilation",
      marketingUse: "Stripping complex visual formatting to prevent mental exhaustion.",
      mahindraApp: "Auditing regional EMI selectors to ensure rural buyers are not overwhelmed by terms.",
      campaignExample: "SBI loan portal audit: normalized pricing grids after spotting pupil dilation spikes.",
      bestFor: "Calculator layout testing, onboarding complexity checks.",
      limitations: "Highly sensitive to background screen luminance fluctuations.",
      team: "UX Design, Digital Product, Analytics Division",
      related: ["Eye Tracking", "GSR / EDA (Galvanic Skin)"],
      realInsight: "Pupils expanded by 45% when borrowers faced more than three distinct dynamic variables simultaneously."
    }
  },
  {
    id: "hrv-ecg",
    name: "HRV & ECG",
    group: "ans",
    icon: Activity,
    category: "ANS Autonomic Arousal",
    color: "text-cyan-500 bg-cyan-50 border-cyan-100 dark:bg-cyan-950/20 dark:border-cyan-900/30",
    accent: "cyan",
    oneLinePurpose: "Tracks Heart Rate Variability and cardiac cycles to analyze stress shifts.",
    primaryCapability: "Measures somatic stress peaks and cardiac acceleration.",
    bestUseCase: "Testing dynamic video advertising narrative arcs and branch environment comfort.",
    detail: {
      whatItMeasures: "R-R heart wave intervals, baseline heart rate, and low-frequency heart oscillations.",
      howItWorks: "ECG sensors or high-resolution photoplethysmography (PPG) track continuous blood volume pulse.",
      principle: "Autonomic Cardiac Vagal Tone",
      marketingUse: "Ensuring collections and CRM calls maintain a comforting, stress-reducing pace.",
      mahindraApp: "Optimizing automated IVR scripts and agent talking paces for rural borrowers.",
      campaignExample: "PhonePe regional IVR audit: mapped heart rate stabilization with warm, local dialects.",
      bestFor: "Acoustic stress diagnostics, TVC storyboard pacing, customer care scripting.",
      limitations: "Requires sensor contact; complex to deploy at scale without smart wearables.",
      team: "CRM Operations, Brand Strategy, Customer Experience",
      related: ["Respiration Rate", "GSR / EDA (Galvanic Skin)"],
      realInsight: "Customer heart rate variance stabilized and stress indicators dropped 30% when IVR assistants swapped formal corporate jargon for warm local guidance."
    }
  },
  {
    id: "respiration",
    name: "Respiration Rate Tracking",
    group: "ans",
    icon: Activity,
    category: "ANS Autonomic Stress",
    color: "text-cyan-500 bg-cyan-50 border-cyan-100 dark:bg-cyan-950/20 dark:border-cyan-900/30",
    accent: "cyan",
    oneLinePurpose: "Monitors breathing cadence and depth to track sudden cognitive blocks.",
    primaryCapability: "Highlights sudden breath-holding events indicating confusion or surprise.",
    bestUseCase: "Evaluating usability friction in complex web and mobile sign-up flows.",
    detail: {
      whatItMeasures: "Breathing rate, inhalation amplitude, and micro-hesitation breath-holds.",
      howItWorks: "Chest belts or high-precision computer vision cameras track micro-shoulder displacement.",
      principle: "Sympathetic Respiration Resynchronization",
      marketingUse: "Redesigning multi-stage forms to ensure breathing patterns remain calm and regular.",
      mahindraApp: "Testing online vehicle finance applications to identify high-friction compliance fields.",
      campaignExample: "Nubank KYC progressive flow: stripped form steps to protect user breathing stability.",
      bestFor: "Usability diagnostics, digital layout check, compliance testing.",
      limitations: "Requires stable camera visuals or wearable straps.",
      team: "UX Design, Usability Analytics, Product Operations",
      related: ["HRV & ECG", "GSR / EDA (Galvanic Skin)"],
      realInsight: "Users commonly hold their breath for 2-3 seconds when confronted with unexpected interest calculations."
    }
  },

  // ─── SOMATIC & MUSCULAR RESPONSE TOOLS (3 Tools) ───
  {
    id: "facial-coding",
    name: "Facial Coding (Emotion AI)",
    group: "somatic",
    icon: Smile,
    category: "Somatic Emotional Valence",
    color: "text-rose-500 bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30",
    accent: "pink",
    oneLinePurpose: "Maps webcam micro-muscle movements to analyze authentic emotional sentiment.",
    primaryCapability: "Categorizes micro-expressions into joy, skepticism, surprise, and confusion.",
    bestUseCase: "Testing creative drafts and video thumbnails across decentralized consumer panels.",
    detail: {
      whatItMeasures: "Facial landmark vectors, skeletal action units, and positive/negative emotional direction.",
      howItWorks: "Computer vision algorithms map webcam video feeds to analyze micro-expression movements.",
      principle: "Ekman's Universal Emotion Expressions",
      marketingUse: "Auditing draft storyboard pacing to ensure brand reveals evoke excitement.",
      mahindraApp: "Testing rural panel emotional reactions to draft tractor loan marketing flyer designs.",
      campaignExample: "Realeyes thumbnail pre-testing: selected high-joy creatives to lift ad clicks by 18%.",
      bestFor: "Creative layout audits, unmoderated panel feedback, video editing checks.",
      limitations: "Vulnerable to poor room lighting and participant facial angles.",
      team: "Creative Production, Growth Marketing, Agency Lead",
      related: ["fEMG (Facial Muscle)", "Voice Pitch Analysis"],
      realInsight: "Webcam panels in rural towns registered high micro-expressions of skepticism when flyers claimed '0% dynamic rates' without contextual clarity."
    }
  },
  {
    id: "femg",
    name: "fEMG (Facial electromyography)",
    group: "somatic",
    icon: Smile,
    category: "Somatic Micro-muscular",
    color: "text-rose-500 bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30",
    accent: "pink",
    oneLinePurpose: "Measures sub-sensory facial muscle activity to detect early skepticism.",
    primaryCapability: "Detects microscopic frowns (skepticism) invisible to standard cameras.",
    bestUseCase: "Testing highly sensitive pricing tables and trust-critical legal claims.",
    detail: {
      whatItMeasures: "Action potentials inside corrugator (frown) and zygomaticus (smile) muscles.",
      howItWorks: "Surface electrodes on key facial muscle nodes capture micro-voltage adjustments.",
      principle: "Sub-sensory Facial Electromyographic Activity",
      marketingUse: "Isolating complex rate tables that trigger micro-skepticism before user rationalization.",
      mahindraApp: "Auditing vehicle financing print flyer statements to confirm zero-interest statements feel secure.",
      campaignExample: "Global insurer trust audit: changed complex clauses to lift user trust levels by 35%.",
      bestFor: "Compliance copy auditing, trust validation, disclaimer layout checks.",
      limitations: "Requires physical electrode attachment, limiting field scalability.",
      team: "Risk Management, Legal Compliance, Creative Strategy",
      related: ["Facial Coding", "Implicit Association (IAT)"],
      realInsight: "Micro-frowning was detected in the corrugator muscles 150ms before users verbally confirmed they trusted a pricing statement."
    }
  },
  {
    id: "voice-pitch",
    name: "Voice Pitch & Vocal Prosody",
    group: "somatic",
    icon: Activity,
    category: "Somatic Vocal Sentiment",
    color: "text-rose-500 bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30",
    accent: "pink",
    oneLinePurpose: "Monitors speech cadence and pitch variability to capture call frustration.",
    primaryCapability: "Detects customer stress and conversational blocks in audio streams.",
    bestUseCase: "Auditing call-center collections loops to optimize helpful customer care.",
    detail: {
      whatItMeasures: "Fundamental vocal frequency pitch (F0), speech pacing, and conversational pauses.",
      howItWorks: "Processes spoken audio signals using acoustic neural networks to map pitch variance.",
      principle: "Acoustic Prosody & Affective Classification",
      marketingUse: "Refining voice bot templates to reduce customer stress during payment reminders.",
      mahindraApp: "Optimizing regional dialect collections scripts to maintain supportive relationships with borrowers.",
      campaignExample: "PhonePe acoustic soundbox: calibrated tone sweeps to confirm successful transactions.",
      bestFor: "Collections script audits, customer support training, voice bot calibration.",
      limitations: "Subject to environmental background noise levels.",
      team: "Collections Division, Customer Support, CRM Operations",
      related: ["Facial Coding", "HRV & ECG"],
      realInsight: "Warm, slow regional dialect speech templates with a lower average pitch reduced user vocal stress indices by 25%."
    }
  },

  // ─── BEHAVIORAL & IMPLICIT COGNITIVE TOOLS (4 Tools) ───
  {
    id: "iat",
    name: "Implicit Association (IAT)",
    group: "behavioral",
    icon: Fingerprint,
    category: "Implicit Association Latency",
    color: "text-emerald-500 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30",
    accent: "green",
    oneLinePurpose: "Measures millisecond sorting latency to map subconscious brand associations.",
    primaryCapability: "Bypasses rationalization bias to reveal raw, authentic consumer trust alignment.",
    bestUseCase: "Quarterly tracking of subconscious brand associations in rural markets.",
    detail: {
      whatItMeasures: "Subconscious conceptual strength (D-score indices) and word-to-category latency.",
      howItWorks: "Users classify concepts across concepts using rapid click choices, measuring latency trends.",
      principle: "Semantic Priming & Reaction Time Latency",
      marketingUse: "Confirming if local campaigns successfully associate our brand with 'Security'.",
      mahindraApp: "Comparing subconscious brand associations against local lenders in Tier-2/3 regions.",
      campaignExample: "Google Brand strategy: used implicit latency diagnostics to shape secure logo transitions.",
      bestFor: "Brand equity tracking, positioning audits, trust audits.",
      limitations: "Requires digital screen testing; does not isolate situational internet delay noise.",
      team: "Market Research, Strategy Lead, Brand Division",
      related: ["Fast Response Testing", "Mouse Tracking"],
      realInsight: "Subconscious trust associations fell by 50% when digital layouts omitted recognizable local branch details."
    }
  },
  {
    id: "frt",
    name: "FRT (Fast Response Testing)",
    group: "behavioral",
    icon: Fingerprint,
    category: "Implicit forced-choice",
    color: "text-emerald-500 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30",
    accent: "green",
    oneLinePurpose: "Uses sub-second forced choice loops to capture raw brand validation.",
    primaryCapability: "Differentiates true conviction from polite survey answers.",
    bestUseCase: "Validating primary creative benefit claims (e.g. speed vs low interest).",
    detail: {
      whatItMeasures: "Sub-750ms forced choices, item validation accuracy, and response delays.",
      howItWorks: "Displays rapid claims, forcing active clicks within tight time constraints.",
      principle: "Dual-Process Cognitive Reasoning Loop",
      marketingUse: "Identifying the single most trusted marketing claim in target states.",
      mahindraApp: "Testing rural ad taglines to identify if users believe loans are easy to acquire.",
      campaignExample: "PhonePe ad tagline audit: prioritized speed benefits, lifting ad recall by 28%.",
      bestFor: "Tagline optimization, ad copy validation, value proposition checks.",
      limitations: "Strict time limits can stress elderly or low-literacy panels.",
      team: "Performance Copywriting, Brand Management, Research Lead",
      related: ["Implicit Association (IAT)", "Keystroke Dynamics"],
      realInsight: "Taglines focusing on 'Direct Branch Manager Support' achieved 40% faster sub-second trust scores than 'Easy Online Approval'."
    }
  },
  {
    id: "mouse-tracking",
    name: "Mouse Tracking",
    group: "behavioral",
    icon: FileText,
    category: "Implicit Cursor Flow",
    color: "text-emerald-500 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30",
    accent: "green",
    oneLinePurpose: "Tracks continuous cursor paths to identify layout confusion and hesitation.",
    primaryCapability: "Reveals exact layout coordinates where decision doubt triggers pointer stalls.",
    bestUseCase: "Improving mobile and web lending funnel stages and rate sliders.",
    detail: {
      whatItMeasures: "Cursor velocity maps, angular direction shifts, coordinate drift, and hover durations.",
      howItWorks: "Logs continuous browser coordinate streams to analyze spatial tracking trajectories.",
      principle: "Motor-Cognitive Coordination Alignment",
      marketingUse: "Redesigning menu lists to ensure users scan layout options in a logical flow.",
      mahindraApp: "Auditing dealer financing portals to locate and remove form entry friction.",
      campaignExample: "CRED dynamic checkout: replaced complex slider paths with focal cards to streamline clicks.",
      bestFor: "Funnel checkout optimization, landing page clarity, portal layout audits.",
      limitations: "Applies to desktop pointer coordinates only (not mobile touchscreen taps).",
      team: "UX Design, Conversion Optimization, Digital Funnel Lead",
      related: ["Implicit Association (IAT)", "Keystroke Dynamics"],
      realInsight: "Erratic cursor paths ('bird's nesting') rose by 70% when menus displayed competing, non-integrated loan codes."
    }
  },
  {
    id: "keystroke",
    name: "Keystroke Dynamics",
    group: "behavioral",
    icon: FileText,
    category: "Implicit Tap Dynamics",
    color: "text-emerald-500 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30",
    accent: "green",
    oneLinePurpose: "Monitors typing rhythms to spot user confusion during forms.",
    primaryCapability: "Maps micro-hesitation and keystroke delays indicating input stress.",
    bestUseCase: "Evaluating onboarding flow simplicity on mobile self-service portals.",
    detail: {
      whatItMeasures: "Flight time (dwell between keys) and press durations across form input fields.",
      howItWorks: "Passively tracks keyboard typing rhythm metrics during document submission fields.",
      principle: "Psychomotor Input Fluency",
      marketingUse: "Detecting fields where personal information prompts drive user hesitation.",
      mahindraApp: "Auditing fixed deposit sign-up portals to streamline address entries.",
      campaignExample: "Banca Widiba portal: optimized form entry fields after mapping user typing pauses.",
      bestFor: "Form usability optimization, technophobia audits, KYC streamlining.",
      limitations: "Dwell calculations are relative to device keyboard specifications.",
      team: "Usability Testing, Product Operations, Analytics Lead",
      related: ["Mouse Tracking", "UX Behavioral Analytics"],
      realInsight: "Typing speeds decelerated by 60% when users entered compliance fields lacking simple, helpful micro-copy explanations."
    }
  },

  // ─── AI & COMPUTATIONAL TOOLS (9 Tools) ───
  {
    id: "predictive-behavior",
    name: "Predictive Behavior AI",
    group: "ai",
    icon: Cpu,
    category: "Computational choice mapping",
    color: "text-blue-500 bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30",
    accent: "blue",
    oneLinePurpose: "Uses generative deep learning to predict choice timelines and campaign success.",
    primaryCapability: "Calculates cohort conversion probabilities and dropout risks pre-deployment.",
    bestUseCase: "Sifting ad layouts and pricing options before investing in media buying.",
    detail: {
      whatItMeasures: "Simulated cohort conversions, choice timelines, and attrition probabilities.",
      howItWorks: "Runs agent-based models simulating biological consumer preferences over visual variables.",
      principle: "Agent-Based Generative Behavioral Simulation",
      marketingUse: "Recommending personalized loan repayment terms that align with local farming harvests.",
      mahindraApp: "Simulating campaign benefit combinations (e.g. low EMI vs fast processing) before launch.",
      campaignExample: "SBI loan portal simulation: selected optimal benefit structures via AI prior to pilot testing.",
      bestFor: "Pre-launch ad checks, benefit combinations, conversion optimization.",
      limitations: "Simulated predictions require local cohort surveys to stay aligned with market shifts.",
      team: "Performance Marketing, Strategy Lead, Data Engineering",
      related: ["DeepGaze AI", "Predictive Attention AI"],
      realInsight: "Simulated buyer cohorts chose 'Zero Land-Guarantee' benefits 3x faster than '0.5% lower interest' statements."
    }
  },
  {
    id: "deep-gaze",
    name: "DeepGaze AI",
    group: "ai",
    icon: Zap,
    category: "Computational Visual Saliency",
    color: "text-blue-500 bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30",
    accent: "blue",
    oneLinePurpose: "Uses generative deep learning to predict human attention maps instantly.",
    primaryCapability: "Generates visual focus heatmaps and ignore zone maps instantly without live cohorts.",
    bestUseCase: "Rapidly auditing visual layouts and social media ad creatives during design stages.",
    detail: {
      whatItMeasures: "Predicted eye fixation density, salience percentages, and layout clarity indexes.",
      howItWorks: "Deep convolutional neural networks process contrast, color, and structure to predict human gaze patterns.",
      principle: "Bottom-Up Attention Saliency Emulation",
      marketingUse: "Providing performance marketing teams with instant feedback on CTA visibility.",
      mahindraApp: "Iterating localized WhatsApp promotional creatives to prevent visual ignore zones.",
      campaignExample: "SBI branch kiosks: optimized dynamic layouts using predicted attention maps pre-launch.",
      bestFor: "A/B visual testing, creative saliency checks, layout clarity audits.",
      limitations: "Does not evaluate copy comprehension or deep emotional trust.",
      team: "Creative Designers, Growth Marketing, Agency Lead",
      related: ["Eye Tracking", "Predictive Attention AI"],
      realInsight: "Generative AI analysis predicted that placing a dark tractor silhouette directly next to the CTA would siphon off 50% of visual focus."
    }
  },
  {
    id: "predictive-attention",
    name: "Predictive Attention AI",
    group: "ai",
    icon: Award,
    category: "Computational Feed Simulation",
    color: "text-blue-500 bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30",
    accent: "blue",
    oneLinePurpose: "Simulates visual attention across competitive social media and digital feeds.",
    primaryCapability: "Calculates brand noticeability and visual weight of details within 3s.",
    bestUseCase: "Auditing social media creative assets to ensure branding stands out.",
    detail: {
      whatItMeasures: "Branding visibility score, visual weight distribution, and layout clarity metrics.",
      howItWorks: "Simulates how eye sweeps scan busy feeds, comparing the visual capture of competing assets.",
      principle: "Pre-attentive Visual Capture",
      marketingUse: "Ensuring the Mahindra Finance wordmark commands attention before users scroll past.",
      mahindraApp: "Testing YouTube bumper and Facebook feed thumbnails for instant brand recall.",
      campaignExample: "PhonePe merchant codes: pre-tested dynamic visual designs to maximize recall.",
      bestFor: "Social media visual audits, display banner calibration, thumbnail testing.",
      limitations: "Cannot measure long-term brand affinity or conceptual trust.",
      team: "Performance Marketing, Social Media Creative, Growth Lead",
      related: ["DeepGaze AI", "Eye Tracking"],
      realInsight: "Branding visibility fell to 3% when enclosed in a thick, high-contrast gold border box, as the frame siphoned visual focus."
    }
  },
  {
    id: "bci",
    name: "BCI Analytics (Brain-Computer Interface)",
    group: "ai",
    icon: Cpu,
    category: "Computational neuro-interfaces",
    color: "text-blue-500 bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30",
    accent: "blue",
    oneLinePurpose: "Synthesizes multi-sensor neural signals to track operational efficiency.",
    primaryCapability: "Monitors real-time fatigue levels and cognitive transitions in digital workspaces.",
    bestUseCase: "Improving workflows for high-volume enterprise systems.",
    detail: {
      whatItMeasures: "P300 cognitive potentials, sensory-motor neural patterns, and work stress ratios.",
      howItWorks: "Processes neural datasets through machine learning to map active cognitive focus states.",
      principle: "Operational Cognitive Interface Sync",
      marketingUse: "Refining branch dealer portals to lower administrative friction for field officers.",
      mahindraApp: "Designing responsive progressive steps in branch dealer systems to prevent entry fatigue.",
      campaignExample: "Global financial portal: optimized layout after mapping user BCI fatigue thresholds.",
      bestFor: "Operational efficiency, branch software audit, dashboard layout checks.",
      limitations: "Requires highly specialized neural headband systems.",
      team: "UX Engineering, Digital Product, Systems Division",
      related: ["Cognitive Load Analysis", "fNIRS (Functional Near-Infrared)"],
      realInsight: "Branch manager processing speed rose by 25% when dealer forms automated calculations, preventing mental calculation blocks."
    }
  },
  {
    id: "heatmap-analytics",
    name: "Heatmap Analytics",
    group: "ai",
    icon: BarChart3,
    category: "Computational focus aggregation",
    color: "text-blue-500 bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30",
    accent: "blue",
    oneLinePurpose: "Aggregates visual focus points across large panel coordinate matrices.",
    primaryCapability: "Displays macro-level visual focus trends and ignore zones in production.",
    bestUseCase: "Auditing fixed deposit and dynamic loan calculator portals.",
    detail: {
      whatItMeasures: "Focal density hotspots, scroll boundaries, and hover focus indexes.",
      howItWorks: "Aggregates absolute pixel coordinate dwell points across user cohorts to construct a thermal gradient map.",
      principle: "Aggregated Visual Salience",
      marketingUse: "Highlighting whether users focus on tax-saving disclaimers or scroll past blindly.",
      mahindraApp: "Auditing fixed deposit onboarding portals to ensure key rates command visual focus.",
      campaignExample: "Nubank KYC progressive layout: siphoned layout noise, raising conversions.",
      bestFor: "UX layouts, conversion rate optimization, layout hierarchy check.",
      limitations: "Requires high-volume user cohorts to generate clean focus clusters.",
      team: "UX Design, Conversion Optimization, Web Analytics",
      related: ["Eye Tracking", "UX Behavioral Analytics"],
      realInsight: "64% of users hovered on the interest rate calculator for over 15 seconds before reading terms, indicating strong math-driven intent."
    }
  },
  {
    id: "ux-analytics",
    name: "UX Behavioral Analytics",
    group: "ai",
    icon: FileText,
    category: "Computational UX Dynamics",
    color: "text-blue-500 bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30",
    accent: "blue",
    oneLinePurpose: "Analyzes rage clicks, touchscreen stalls, and navigation loops to map friction.",
    primaryCapability: "Identifies digital technophobia barriers and input confusion in real-time.",
    bestUseCase: "Auditing self-service loan portals for unbanked Tier-2/3 users.",
    detail: {
      whatItMeasures: "Rage click coordinates, rapid erratic pointer movements, and input hesitation duration.",
      howItWorks: "Tracks scroll pacing, hover points, and input stalling in the active web session.",
      principle: "Psychomotor Fluency & Usability Hesitation",
      marketingUse: "Spotting fields where users freeze, alerting customer support to assist.",
      mahindraApp: "Auditing mobile financing flows to prevent user exits on verification screens.",
      campaignExample: "SBI branch kiosks: standardized tactile interfaces to reduce entry stress in rural areas.",
      bestFor: "Funnel drop audits, KYC layout simplification, mobile form design.",
      limitations: "Logs behavioral data but requires user surveys to clarify systemic drop causes.",
      team: "Digital Product, Usability Testing, Web Analytics Lead",
      related: ["Mouse Tracking", "Cognitive Load Analysis"],
      realInsight: "52% of regional users stalled on the OTP verification screen due to confusion regarding automated messaging folders."
    }
  },
  {
    id: "cognitive-load",
    name: "Cognitive Load Analysis",
    group: "ai",
    icon: Sliders,
    category: "Computational memory load",
    color: "text-blue-500 bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30",
    accent: "blue",
    oneLinePurpose: "Theta/beta frequency approximations quantifying active informational burden.",
    primaryCapability: "Highlights specific layout sections where text complexity triggers task exits.",
    bestUseCase: "Streamlining complex loan disclaimers and multi-step applications.",
    detail: {
      whatItMeasures: "Working memory capacity limits, processing hesitation, and mental fatigue thresholds.",
      howItWorks: "Analyzes prefrontal theta-to-beta frequency ratio benchmarks to map cognitive processing effort.",
      principle: "Sweller's Cognitive Load Theory",
      marketingUse: "Ensuring compliance layouts remain below the processing threshold of rural buyers.",
      mahindraApp: "Redesigning addresses and calculator fields to prevent decision exhaustion.",
      campaignExample: "Nubankprogressive KYC: slashes mental load, raising active digital registrations by 15%.",
      bestFor: "KYC funnel design, calculator design, mobile layout checking.",
      limitations: "Subject to environmental noise and screen size variation.",
      team: "UX Design, Digital Product, Analytics Division",
      related: ["BCI Analytics", "UX Behavioral Analytics"],
      realInsight: "Borrowers hold their breath and exit mobile forms when confronted with more than three simultaneous decisions."
    }
  },
  {
    id: "memory-encoding",
    name: "Memory Encoding Analysis",
    group: "ai",
    icon: Brain,
    category: "Computational memory commit",
    color: "text-blue-500 bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30",
    accent: "blue",
    oneLinePurpose: "Evaluates long-term memory commit rates using steady state visual triggers.",
    primaryCapability: "Identifies exactly which frames of an advertisement are stored in memory.",
    bestUseCase: "Ensuring corporate branding assets are encoded within the first 5 seconds of ads.",
    detail: {
      whatItMeasures: "Long-term memory commit levels, emotional valence spikes, and detail retrieval.",
      howItWorks: "Tracks neural phase variations in response to visual triggers to calculate memory storage events.",
      principle: "Steady State Visual Evoked Potential (SSVEP)",
      marketingUse: "Positioning the brand logo adjacent to direct-gaze portraits to secure recall.",
      mahindraApp: "Auditing rural vehicle financing flyers to ensure branch contact details are encoded.",
      campaignExample: "Spotify sonic ad-recall: proved that audio brand reveals trigger 30% higher memory commit.",
      bestFor: "Brand equity tracking, TVC final edits, sonic branding audits.",
      limitations: "Specialized laboratory methodology.",
      team: "Brand Strategy, Advertising Design, Media lead",
      related: ["EEG (Brainwaves)", "Predictive Attention AI"],
      realInsight: "The corporate brand logo committed to long-term memory 4x faster when placed adjacent to warm, direct-gaze human faces."
    }
  },
  {
    id: "emotional-salience",
    name: "Emotional Salience Mapping",
    group: "ai",
    icon: Sliders,
    category: "Computational affective mapping",
    color: "text-blue-500 bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30",
    accent: "blue",
    oneLinePurpose: "Blends attention gaze tracks with emotional valence grids to index visual triggers.",
    primaryCapability: "Highlights visual layout features driving positive/negative emotional responses.",
    bestUseCase: "Optimizing print poster designs and promotional ad thumbnails pre-launch.",
    detail: {
      whatItMeasures: "Attention salience coordinates mapped against facial action emotional valence grids.",
      howItWorks: "Synthesizes eye scanpath coordinates with facial coding micro-expression vectors.",
      principle: "Multimodal Affective Visual Processing",
      marketingUse: "Confirming that regional customer photos command high visual focus and trigger joy.",
      mahindraApp: "Testing rural print flyers to verify rates do not command focus while furrowing brows.",
      campaignExample: "Coca-Cola Share a Coke: confirmed that layout designs drove high emotional salience.",
      bestFor: "Thumbnail design, visual layout check, benefit mapping.",
      limitations: "Complex calibration required; requires synchronized gaze and facial camera inputs.",
      team: "Performance Marketing, Social Media Creative, Brand Lead",
      related: ["DeepGaze AI", "Facial Coding"],
      realInsight: "Visual joy metrics rose by 40% when vehicle flyers featured real regional agrarian settings rather than generic stock models."
    }
  }
];

export const bentoGoalSelector = [
  {
    goal: "Improve Creative Attention",
    desc: "Ensure the visual hierarchy siphons focus directly to the call-to-action.",
    recommendations: ["DeepGaze AI", "Eye Tracking", "Predictive Attention AI"],
    cause: "Bottom-up visual contrast siphons attention loops away from the button coordinates.",
    nudge: "Isolate the CTA with 40% negative space and high-luminance color contrast.",
    primaryToolId: "eye-tracking"
  },
  {
    goal: "Increase Consumer Trust",
    desc: "Lower sympathetic nervous system threat states during document submissions.",
    recommendations: ["GSR (Skin Conductance)", "Implicit Association (IAT)"],
    cause: "Identity inputs placed before trust triggers activate danger scans in the amygdala.",
    nudge: "Introduce direct-gaze team photos and RBI licensed regulatory badges adjacent to forms.",
    primaryToolId: "gsr"
  },
  {
    goal: "Reduce Onboarding Friction",
    desc: "Diagnose and eliminate mobile onboarding confusion and tech-hesitation.",
    recommendations: ["UX Body Language", "Eye Tracking"],
    cause: "Sustained input hesitations indicate lack of digital fluency and technophobia fear.",
    nudge: "Deploy progressive disclosure, requesting single identifiers in simple vertical stages.",
    primaryToolId: "ux-analytics"
  },
  {
    goal: "Improve Emotional Engagement",
    desc: "Audit the authentic positive/negative valence responses to creative layouts.",
    recommendations: ["Facial Coding", "Emotion AI", "Voice Emotion AI"],
    cause: "Vocal and facial micro-stalls reveal skepticism or confusion that focus groups cover up.",
    nudge: "Test draft storyboards remotely using unmoderated webcam panels across target districts.",
    primaryToolId: "facial-coding"
  },
  {
    goal: "Improve Memory Recall",
    desc: "Secure long-term memory encoding rather than short-lived visual capture.",
    recommendations: ["EEG (Brainwaves)", "Steady State Topography", "Predictive Attention AI"],
    cause: "Dry numerical interest grids bypass the amygdala's memory tagging networks.",
    nudge: "Lead campaigns with tractor ownership photos before interest facts.",
    primaryToolId: "eeg"
  },
  {
    goal: "Understand Rural Consumers",
    desc: "Decode local hesitation parameters and WhatsApp assisted communication cues.",
    recommendations: ["UX Body Language", "Facial Coding", "GSR (Skin Conductance)"],
    cause: "Familiarity bias overrides abstract visual grids; users require relationship-based safety loops.",
    nudge: "Standardize assisted branch kiosks backed by local field agents using regional templates.",
    primaryToolId: "ux-analytics"
  },
  {
    goal: "Predict Attention Before Launch",
    desc: "Verify layout clarity and saliency metrics instantly without live human testing.",
    recommendations: ["DeepGaze AI", "Predictive Attention AI"],
    cause: "Aesthetic visual clutter siphons gaze loops, causing immediate banner blindness.",
    nudge: "Batch process localized programmatic social ads through generative neural visual models.",
    primaryToolId: "deep-gaze"
  },
  {
    goal: "Optimize CTA Visibility",
    desc: "Ensure the visual hierarchy commands visual focus within 250ms of exposure.",
    recommendations: ["Eye Tracking", "DeepGaze AI", "Heatmap Analytics"],
    cause: "Sensory competition siphons eye scanpaths away from conversion coordinates.",
    nudge: "Consolidate visual layouts into a single high-contrast focal card with high CTA luminance.",
    primaryToolId: "eye-tracking"
  },
  {
    goal: "Reduce Cognitive Overload",
    desc: "Quantify and strip away informational bottlenecks on mobile screens.",
    recommendations: ["Cognitive Load Analysis", "Mouse Tracking", "Scroll Tracking"],
    cause: "Exceeding 3-4 visual chunks triggers immediate search fatigue and visual ignore zones.",
    nudge: "Enforce strict progressive disclosure, presenting singular details per page fold.",
    primaryToolId: "cognitive-load"
  }
];

export const comparisonPairs = [
  {
    id: "eye-vs-deepgaze",
    title: "Eye Tracking vs DeepGaze AI",
    toolA: {
      name: "Eye Tracking (Human)",
      speed: 60, scalability: 45, cost: 75, depth: 50, accuracy: 95, remote: 80
    },
    toolB: {
      name: "DeepGaze AI (Predictive)",
      speed: 100, scalability: 98, cost: 10, depth: 30, accuracy: 88, remote: 100
    },
    insight: "DeepGaze offers instant visual audit checks during design stages, while Eye Tracking provides clinical, post-creative validation with live cohorts."
  },
  {
    id: "eeg-vs-emotion",
    title: "EEG Brainwaves vs Emotion AI",
    toolA: {
      name: "EEG (Brainwaves)",
      speed: 25, scalability: 20, cost: 95, depth: 98, accuracy: 92, remote: 15
    },
    toolB: {
      name: "Emotion AI (Facial/Voice)",
      speed: 85, scalability: 90, cost: 45, depth: 75, accuracy: 80, remote: 95
    },
    insight: "EEG detects deep cognitive effort and long-term memory commit, while Emotion AI measures surface expressions and spoken sentiment scales remotely."
  },
  {
    id: "ux-vs-facial",
    title: "UX Analytics vs Facial Coding",
    toolA: {
      name: "UX Body Language",
      speed: 95, scalability: 100, cost: 25, depth: 65, accuracy: 85, remote: 100
    },
    toolB: {
      name: "Facial Coding",
      speed: 80, scalability: 85, cost: 50, depth: 80, accuracy: 88, remote: 95
    },
    insight: "UX Analytics continuous tracks navigation rage clicks in production models, whereas Facial Coding maps specific skeletal visual smiles during prototype testing."
  }
];

export const brandCaseStudies = [
  {
    company: "CRED payment CTA",
    tool: "Eye Tracking & DeepGaze",
    problem: "Landing page clutter siphoned attention loops away from checkout.",
    insight: "High background contrast siphons attention, creating direct CTA blindness.",
    outcome: "+24% CTA Clicks",
    details: "Swapped busy vector images for a singular, high-contrast visual focus card."
  },
  {
    company: "PhonePe soundbox",
    tool: "GSR & Emotion AI",
    problem: "Rural transaction anxiety during digital merchant onboarding led to churn.",
    insight: "Abstract algorithms fail to trigger familiarity-based security loops.",
    outcome: "+42% Retention",
    details: "Deployed soundboxes that broadcast transaction approvals in localized regional dialects."
  },
  {
    company: "Nubank progressive KYC",
    tool: "UX Analytics & Eye Tracking",
    problem: "Lengthy compliance KYC forms drove massive user registration drop-offs.",
    insight: "Voluminous multi-step screens exceed working memory limits, driving fatigue.",
    outcome: "+15% Onboarding",
    details: "Enforced progressive disclosure, requesting single identifiers in micro-screens."
  },
  {
    company: "Google trust logo",
    tool: "Implicit Association Test",
    problem: "Implicit branding disconnects in search layout siphoned click intent.",
    insight: "Subconscious trust links drop by 50% when layouts violate schema symmetry.",
    outcome: "Unified Trust",
    details: "Standardized visual layout parameters to protect cognitive familiarity rules."
  }
];

export const recommendedStacks = [
  {
    name: "Creative Testing Stack",
    tools: ["Eye Tracking", "DeepGaze AI", "Emotion AI"],
    why: "Audits visual attention hotspots and maps raw emotional valence to ensure the brand logo commands attention within 3 seconds of scroll exposure.",
    goal: "Social & Digital Ad Uplift"
  },
  {
    name: "Rural Trust Stack",
    tools: ["Facial Coding", "UX Body Language", "GSR (Skin Conductance)"],
    why: "Triangulates tech-hesitation, physiological anxiety events, and emotional skepticism in unbanked consumer journeys without verbal language bias.",
    goal: "Tier-2/3 KYC Optimization"
  },
  {
    name: "Onboarding Optimization Stack",
    tools: ["Mouse Tracking", "Scroll Tracking", "Cognitive Load Analysis"],
    why: "Maps visual cursor stalls, rapid erratic pointer zig-zags, and scroll drops to systematically streamline high-friction onboarding fields.",
    goal: "KYC Funnel Drop Reduction"
  }
];

// ═══════════════════════════════════════════
// DYNAMIC IMMERSIVE CUSTOM VISUAL STYLES & BENCHMARKS
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
  attention: {
    bg: "from-cyan-950/20 via-card to-card",
    accent: "cyan",
    textColor: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    glowColor: "shadow-cyan-500/20",
    badge: "bg-cyan-500 text-white",
  }
};

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
// HELPER WORKFLOW SIMULATORS
// ═══════════════════════════════════════════
export function getCreativeBeforeAfterData(toolId: string, group: string) {
  // If explicitly defined, return it
  if (creativeA_BData[toolId]) {
    return creativeA_BData[toolId];
  }

  // Custom Category-based Dynamic Fallbacks
  if (group === "cns") {
    return {
      beforeTitle: "Complex Technical Rate Tables",
      beforeDesc: "Presenting multiple interest formulas and bullet points upon landing.",
      beforeFriction: [
        "Prefrontal avoidance waves (Alpha asymmetry) spike instantly.",
        "High mental fatigue triggers session termination.",
        "Absence of safety anchors or visual relief points."
      ],
      afterTitle: "Agrarian Narrative Hero Flow",
      afterDesc: "Optimized storyline anchoring customer safety before financing detail disclosure.",
      afterFixes: [
        "Prefrontal engagement stabilized via direct-gaze regional photos.",
        "Alpha approach waves elevated by warm localized voiceovers.",
        "Repayment milestones simplified into vertical stages."
      ]
    };
  }

  if (group === "ans") {
    return {
      beforeTitle: "Lengthy Verification Input Grid",
      beforeDesc: "Demanding high-volume documents and uploads on step one.",
      beforeFriction: [
        "Sympathetic sweat spikes indicate acute user technophobia.",
        "Visual neglect zones siphon attention away from key disclaimers.",
        "Pupil dilation shows working memory overload."
      ],
      afterTitle: "Progressive Reassured Path",
      afterDesc: "Onboarding flow structured to prevent cognitive fatigue and trust panic.",
      afterFixes: [
        "RBI authorized badges located in direct focal view.",
        "Calming trust indicators reduce physiological arousal peaks.",
        "Onboarding broken down into simple, single-input screens."
      ]
    };
  }

  if (group === "somatic") {
    return {
      beforeTitle: "Monotone Institutional Video Ad",
      beforeDesc: "Video advertising creative featuring high-cost urban stock footage.",
      beforeFriction: [
        "Micro-expressions of skepticism and confusion registered.",
        "Low smile activity and lack of emotional resonance.",
        "Vocal stress spikes during interest rate disclosures."
      ],
      afterTitle: "Warm Vernacular Storytelling",
      afterDesc: "Video advertising starring local farmers and active branch managers.",
      afterFixes: [
        "Agrarian familiarity triggers high joy expressions (+45%).",
        "Skepticism and frowning drop to absolute baseline.",
        "Vocal prosody sweeps confirm positive brand trust."
      ]
    };
  }

  if (group === "behavioral") {
    return {
      beforeTitle: "Desirability-Biased Survey Forms",
      beforeDesc: "Interviews prompting users if they trust the brand on a scale of 1-10.",
      beforeFriction: [
        "Rationalization bias siphons true, immediate consumer conviction.",
        "Politeness bias obscures actual loan drop-off factors.",
        "Erratic pointer trajectories indicate decision paralysis."
      ],
      afterTitle: "Implicit Latency Validation",
      afterDesc: "Forced-choice testing measuring subconscious conceptual association.",
      afterFixes: [
        "Calculates exact latency D-score sorting parameters.",
        "Bypasses cognitive filtering and interview politeness.",
        "Reveals subconscious brand-to-trust links within 700ms."
      ]
    };
  }

  // Fallback for AI / Computational tools
  return {
    beforeTitle: "Cluttered WhatsApp Promo Layout",
    beforeDesc: "Social media performance banners overloaded with multiple competing text specs.",
    beforeFriction: [
      "AI saliency map predicts direct banner blindness.",
      "Primary call-to-action commands less than 15% visual probability.",
      "High visual clutter prevents successful message encoding."
    ],
    afterTitle: "Saliency-Scored Visual Creative",
    afterDesc: "Bento-style layout pre-tested and calibrated via generative attention models.",
    afterFixes: [
      "Focal visual draws attention directly to the central offer.",
      "Branding visibility commands 85%+ predictive noticeability.",
      "Isolated call-to-action siphons maximum attention."
    ]
  };
}

export function getSimulator(toolId: string, group: string) {
  // 1. Brainwave / EEG / Neural wave simulator
  if (
    toolId === "eeg" || 
    toolId === "fmri" || 
    toolId === "fnirs" || 
    toolId === "meg" || 
    toolId === "pet" || 
    toolId === "bci" || 
    toolId === "cognitive-load" || 
    toolId === "memory-encoding" || 
    group === "cns"
  ) {
    return <BrainwaveSimulator />;
  }

  // 2. Biometric Sweat / GSR / Cardiovascular simulator
  if (
    toolId === "gsr" || 
    toolId === "hrv-ecg" || 
    toolId === "respiration"
  ) {
    return <BiometricSimulator />;
  }

  // 3. Emotion / Facial wireframe tracker
  if (
    toolId === "facial-coding" || 
    toolId === "femg" || 
    toolId === "voice-pitch" || 
    toolId === "emotional-salience" || 
    group === "somatic"
  ) {
    return <EmotionTrackerSimulator />;
  }

  // 4. Implicit sorting game
  if (
    toolId === "iat" || 
    toolId === "frt" || 
    toolId === "mouse-tracking" || 
    toolId === "keystroke" || 
    toolId === "predictive-behavior" || 
    group === "behavioral"
  ) {
    return <ImplicitTrustGame />;
  }

  // 5. Focal attention maps (fallback)
  return <AttentionSimulator toolId={toolId} />;
}

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
              {data.beforeFriction.map((fric: string, idx: number) => (
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
              {data.afterFixes.map((fix: string, idx: number) => (
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
        {/* Smartphone Mockup */}
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
              <span>Calm Engagement & Trust Response (Frontal Alpha Asymmetry)</span>
              <span className="text-muted-foreground text-[8px]">Approach Valence</span>
            </div>
            <div className="h-14 w-full bg-card/60 rounded-xl border border-border/40 overflow-hidden flex items-center relative">
              <svg className="absolute inset-0 h-full w-full">
                <path d={currentAlphaPath} fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-[9.5px] font-bold text-pink-500">
              <span>Cognitive Overload & Attention Fatigue (Parietal Beta Activity)</span>
              <span className="text-muted-foreground text-[8px]">Processing Workload</span>
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
              <span className="text-muted-foreground font-semibold">Trust Response:</span>
              <span className="text-foreground">{(88 - stressLevel/3.5).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-muted-foreground font-semibold">Emotional Resistance:</span>
              <span className="text-foreground">{(10 + stressLevel/2.5).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-muted-foreground font-semibold">Memory Encoding Strength:</span>
              <span className="text-foreground">{(78 - stressLevel/5).toFixed(0)}%</span>
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


export function getDynamicNeuroData(tool: typeof neuroscienceToolsList[0]) {
  const isCns = tool.group === "cns";
  const isAns = tool.group === "ans";
  const isSomatic = tool.group === "somatic";
  const isBehavioral = tool.group === "behavioral";
  const isAi = tool.group === "ai";
  const isFmri = tool.id === "fmri";

  // HERO SUBTITLES - COMPLETELY DYNAMIC & JARGON-FREE
  const subName = tool.name.split(" (")[0];
  let heroSubtitleLine1 = `${subName} measures behavioral activity patterns linked to attention, mental effort, emotional engagement, and cognitive processing during customer experiences.`;
  let heroSubtitleLine2 = `In behavioral research environments, this technique may help teams understand how customers subconsciously respond to campaigns, onboarding journeys, financial communication, and digital interactions.`;

  if (isFmri) {
    heroSubtitleLine1 = "FMRI studies changes in blood-flow activity linked to emotional processing, reward response, memory formation, and deep cognitive engagement.";
    heroSubtitleLine2 = "In behavioral research environments, FMRI may help teams understand how customers emotionally respond to campaigns, financial messaging, onboarding journeys, and trust-building experiences.";
  }

  // METADATA BLOCKS - BUSINESS HIERARCHY
  const metadataBlocks = {
    measures: tool.detail?.principle || "Subconscious Comfort",
    bestUse: tool.detail?.bestFor || "Creative & Form Audits",
    relevance: tool.detail?.marketingUse || "Campaign & Workflow Optimization"
  };

  // 1. SIGNAL GLOSSARY DATA - DE-JARGONIZED & STRATEGIC
  let waveData: Record<string, { title: string; focus: string; meaning: string; adaptation: string; simulatedPath: string; stroke: string; colorClass: string }> = {};

  if (isCns) {
    waveData = {
      alpha: {
        title: "Trust Signals & Mental Ease",
        focus: "Measures customer reassurance and ease",
        meaning: "Reflects relaxed visual alertness and cognitive comfort. Higher levels indicate the customer feels safe and confident.",
        adaptation: "Verifies if localized branch imagery or familiar advisor presence puts rural consumers at ease.",
        simulatedPath: "M 0,25 C 20,5 40,45 60,25 C 80,5 100,45 120,25 C 140,5 160,45 180,25 C 200,5 220,45 240,25 C 260,5 280,45 300,25",
        stroke: "#a855f7",
        colorClass: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20"
      },
      beta: {
        title: "Visual Overload & Confusion",
        focus: "Measures customer stress and workload",
        meaning: "Reflects analytical struggle and high mental effort. Spikes indicate that the layout is difficult to parse.",
        adaptation: "Highlights points of confusion. Ideal for identifying when complex loan pricing charts overwhelm the borrower.",
        simulatedPath: "M 0,25 L 10,10 L 20,40 L 30,15 L 40,35 L 50,10 L 60,40 L 70,12 L 80,38 L 90,15 L 100,35 L 110,12 L 120,38 L 130,10 L 140,40 L 150,15 L 160,35 L 170,10 L 180,40 L 190,12 L 200,38 L 210,15 L 220,35 L 230,12 L 240,38 L 250,10 L 260,40 L 270,15 L 280,35 L 290,12 L 300,25",
        stroke: "#ec4899",
        colorClass: "text-pink-600 dark:text-pink-400 bg-pink-500/10 border-pink-500/20"
      },
      theta: {
        title: "Narrative Comfort & Interest",
        focus: "Measures story retention and recall",
        meaning: "Reflects subconscious emotional connection and story synchronization. Indicates when a message resonates personally.",
        adaptation: "Confirms that regional dialect scripting spoken in conversational tones builds deep personal connection.",
        simulatedPath: "M 0,25 C 30,0 60,50 90,25 C 120,0 150,50 180,25 C 210,0 240,50 270,25 C 300,0 330,50 360,25",
        stroke: "#f59e0b",
        colorClass: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20"
      },
      gamma: {
        title: "Attention Focus & Clarity Peaks",
        focus: "Measures understanding and decision moments",
        meaning: "Tracks visual binding and sudden cognitive comprehension. Captures the exact moment the customer gains complete clarity.",
        adaptation: "Verifies the exact layout zones or frames where interest terms align with borrower expectations.",
        simulatedPath: "M 0,25 L 5,15 L 10,35 L 15,10 L 20,40 L 25,12 L 30,38 L 35,15 L 40,35 L 45,12 L 50,38 L 55,10 L 60,40 L 65,15 L 70,35 L 75,10 L 80,40 L 85,12 L 90,38 L 95,15 L 100,35 L 105,12 L 110,38 L 115,10 L 120,40 L 125,15 L 130,35 L 135,10 L 140,40 L 145,12 L 150,38 L 155,15 L 160,35 L 165,12 L 170,38 L 175,10 L 180,40 L 185,15 L 190,35 L 195,10 L 200,40 L 205,12 L 210,38 L 215,15 L 220,35 L 225,12 L 230,38 L 235,10 L 240,40 L 245,15 L 250,35 L 255,10 L 260,40 L 265,12 L 270,38 L 275,15 L 280,35 L 285,12 L 290,38 L 295,10 L 300,25",
        stroke: "#10b981",
        colorClass: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      }
    };
  } else if (isAns) {
    waveData = {
      fixations: {
        title: "Focal Ownership Points",
        focus: "Tracks exact visual landing zones",
        meaning: "Maps coordinates where visual attention locks to absorb critical figures or instructions.",
        adaptation: "Ensures primary EMI numbers and action buttons capture attention rather than background graphics.",
        simulatedPath: "M 0,25 H 40 V 10 H 80 V 40 H 120 V 10 H 160 V 40 H 200 V 25 H 300",
        stroke: "#3b82f6",
        colorClass: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20"
      },
      saccades: {
        title: "Visual Path Clarity",
        focus: "Maps reading rhythm and flow",
        meaning: "Eye movements between foveal stops. Confirms if visual design guides the customer smoothly.",
        adaptation: "Erratic jumps suggest heavy visual confusion, indicating the visual layout lacks logical order.",
        simulatedPath: "M 0,25 L 30,10 L 40,40 L 80,10 L 90,40 L 130,10 L 140,40 L 180,10 L 190,40 L 230,10 L 240,40 L 280,25 L 300,25",
        stroke: "#ec4899",
        colorClass: "text-pink-600 dark:text-pink-400 bg-pink-500/10 border-pink-500/20"
      },
      pupil: {
        title: "Mental Focus & Stress Signals",
        focus: "Measures visual engagement effort",
        meaning: "Pupil fluctuations triggered by sudden emotional stress or complex calculation steps.",
        adaptation: "Identifies points where high-tension rates cause immediate subconscious visual stress.",
        simulatedPath: "M 0,25 C 50,5 100,5 150,25 C 200,45 250,45 300,25",
        stroke: "#f59e0b",
        colorClass: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20"
      },
      microExpressions: {
        title: "Affective Responses (Facial Valence)",
        focus: "Tracks positive vs negative comfort reactions",
        meaning: "Second-by-second micro-muscle configurations revealing customer delight or skepticism.",
        adaptation: "Helps verify if friendly, community-based imagery evokes immediate visual comfort.",
        simulatedPath: "M 0,25 Q 75,50 150,25 Q 225,0 300,25",
        stroke: "#10b981",
        colorClass: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      }
    };
  } else if (isSomatic) {
    waveData = {
      emg: {
        title: "Brow & Jaw Tension",
        focus: "Measures sub-conscious stress responses",
        meaning: "Micro-tension markers in facial muscles. Spikes indicate subconscious skepticism or irritation.",
        adaptation: "Flags confusing dynamic rate structures where ambiguous fees trigger jaw clenching.",
        simulatedPath: "M 0,25 L 15,15 L 30,35 L 45,20 L 60,30 L 75,25 H 150 L 165,10 L 180,40 L 195,12 L 210,38 L 225,25 H 300",
        stroke: "#ef4444",
        colorClass: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20"
      },
      posture: {
        title: "Lean-In Interest",
        focus: "Measures active visual engagement",
        meaning: "Physical movement toward the screen or paper ad, signaling high motivation and interest.",
        adaptation: "Verifies when transparent loan terms successfully encourage customers to lean forward.",
        simulatedPath: "M 0,25 C 75,5 150,5 225,45 L 300,25",
        stroke: "#3b82f6",
        colorClass: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20"
      },
      pitch: {
        title: "Voice Tension Tremor",
        focus: "Measures collections communication comfort",
        meaning: "Speech pitch fluctuations indicating high borrower stress or confusion during phone support.",
        adaptation: "Helps design supportive vernacular collection support bots to ensure customer reassurance.",
        simulatedPath: "M 0,25 L 10,12 L 20,38 L 30,10 L 40,40 L 50,25 H 250 L 260,15 L 270,35 L 280,20 L 290,30 L 300,25",
        stroke: "#ec4899",
        colorClass: "text-pink-600 dark:text-pink-400 bg-pink-500/10 border-pink-500/20"
      },
      respiratory: {
        title: "Breathing Ratios & Calmness",
        focus: "Measures customer relaxation level",
        meaning: "Stable breathing cycles indicating mental ease, confidence, and lack of visual panic.",
        adaptation: "Indicates when clear monthly installment diagrams reduce customer anxiety.",
        simulatedPath: "M 0,25 C 37,0 75,50 112,25 C 150,0 187,50 225,25 C 262,0 300,50 300,25",
        stroke: "#10b981",
        colorClass: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      }
    };
  } else if (isBehavioral) {
    waveData = {
      latency: {
        title: "Decision Hesitation Delay",
        focus: "Measures sub-conscious doubt",
        meaning: "Millisecond-level action delays when borrowers face conflicting terms or lack trust.",
        adaptation: "Confirms trust strength. Processing delays signal conceptual doubt or security anxiety.",
        simulatedPath: "M 0,25 H 100 V 10 H 120 V 40 H 140 V 25 H 300",
        stroke: "#a855f7",
        colorClass: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20"
      },
      association: {
        title: "Automatic System 1 Trust",
        focus: "Measures immediate security association",
        meaning: "Rapid, intuitive pairing of secure brand feelings without active calculations.",
        adaptation: "Verifies if visual layouts trigger automatic trust and emotional comfort.",
        simulatedPath: "M 0,25 C 50,15 100,15 150,25 C 200,35 250,35 300,25",
        stroke: "#10b981",
        colorClass: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      },
      microSaccades: {
        title: "Choice Preference Indicators",
        focus: "Tracks choice selection pre-click",
        meaning: "Sub-visual micro-eye movements tracking decision selection before clicking.",
        adaptation: "Helps reveal favorite options seconds before the borrower makes their final choice.",
        simulatedPath: "M 0,25 L 5,20 L 10,30 L 15,22 L 20,28 L 25,25 H 300",
        stroke: "#ec4899",
        colorClass: "text-pink-600 dark:text-pink-400 bg-pink-500/10 border-pink-500/20"
      },
      schemaFriction: {
        title: "Conceptual Friction Peaks",
        focus: "Measures visual conflict factors",
        meaning: "Momentary visual friction siphoned when ad designs mismatch customer expectations.",
        adaptation: "Highlights if urban-style ad graphics create cognitive gaps with rural audiences.",
        simulatedPath: "M 0,25 L 50,15 L 100,35 L 150,20 L 200,30 L 250,25 H 300",
        stroke: "#f59e0b",
        colorClass: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20"
      }
    };
  } else {
    // AI / Computational Family
    waveData = {
      saliencyAI: {
        title: "Predictive Visual Density",
        focus: "Measures pre-attentive scan paths",
        meaning: "AI predictions of visual flow matching human pre-attentive focus priorities.",
        adaptation: "Enables design teams to pre-test button noticeability before writing code.",
        simulatedPath: "M 0,25 C 25,5 50,45 75,25 C 100,5 125,45 150,25 C 175,5 200,45 225,25 C 250,5 275,45 300,25",
        stroke: "#a855f7",
        colorClass: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20"
      },
      voiceProsodyAI: {
        title: "Simulated Speech Rhythm",
        focus: "Measures vocal stress reduction",
        meaning: "Computational modeling of tone and supportive support bot phrasing.",
        adaptation: "Aligns automated support calls to ensure reassurance and prevent hang-ups.",
        simulatedPath: "M 0,25 L 10,12 L 20,38 L 30,10 L 40,40 L 50,25 H 250 L 260,15 L 270,35 L 280,20 L 290,30 L 300,25",
        stroke: "#3b82f6",
        colorClass: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20"
      },
      pricingElasticityAI: {
        title: "Repayment Stress Thresholds",
        focus: "Predicts budget stress comfort zones",
        meaning: "Models visual threshold comfort levels based on automated anxiety checks.",
        adaptation: "Helps design dynamic loan products that respect agricultural income cycles.",
        simulatedPath: "M 0,25 L 50,10 L 100,40 L 150,15 L 200,35 L 250,25 H 300",
        stroke: "#f59e0b",
        colorClass: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20"
      },
      digitalTwinAI: {
        title: "Simulated App Onboarding Flow",
        focus: "Predicts digital user drop-offs",
        meaning: "Pre-tests dynamic smartphone KYC application steps to find friction zones.",
        adaptation: "Spots complex input steps to improve layout paths before deployment.",
        simulatedPath: "M 0,25 Q 75,50 150,25 Q 225,0 300,25",
        stroke: "#10b981",
        colorClass: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      }
    };
  }

  // 2. BEHAVIORAL SIGNALS (6 HIGH-IMPACT ENTERPRISE CARDS)
  let signalsList = [
    {
      tag: "EMOTIONAL SAFETY",
      title: "TRUST SIGNALS",
      image: "/images/eeg_female_rural_trust.png",
      measuring: "Potential frontal attention stability and relaxed engagement patterns when customers view familiar people, branch environments, or localized communication.",
      interpreted: "Customers may feel more mentally comfortable when communication feels familiar and community-oriented.",
      adaptation: "Use recognizable branch advisors, regional storytelling, and reassuring onboarding language."
    },
    {
      tag: "COGNITIVE LOAD",
      title: "VISUAL OVERLOAD",
      image: "/images/eeg_kyc_friction.png",
      measuring: "Potential increases in mental processing effort when customers view dense EMI charts, financial disclosures, or cluttered layouts.",
      interpreted: "Customers may feel mentally overloaded and stop processing important information clearly.",
      adaptation: "Replace dense financial comparison grids with simplified repayment journeys and guided layouts."
    },
    {
      tag: "ATTENTION RESPONSE",
      title: "ATTENTION LOSS",
      image: "/images/eeg_attention_leakage.png",
      measuring: "Potential drops in sustained visual attention during complex onboarding or information-heavy experiences.",
      interpreted: "Important actions or financing details may get ignored when layouts compete for attention.",
      adaptation: "Improve spacing, visual hierarchy, and CTA visibility across digital journeys."
    },
    {
      tag: "EMOTIONAL ENGAGEMENT",
      title: "EMOTIONAL REASSURANCE",
      image: "/images/eeg_brain_engagement.png",
      measuring: "Potential emotional engagement shifts during aspiration-led storytelling and family-centered campaign moments.",
      interpreted: "Emotionally relatable narratives may increase comfort and long-term message connection.",
      adaptation: "Use human-centered stories instead of specification-heavy communication."
    },
    {
      tag: "MEMORY RESPONSE",
      title: "MEMORY RECALL",
      image: "/images/eeg_tvc_testing.png",
      measuring: "Potential memory-related engagement during emotionally meaningful or visually distinctive moments.",
      interpreted: "Customers may remember emotionally connected campaign moments more strongly than technical information.",
      adaptation: "Place important brand messaging near emotional storytelling moments."
    },
    {
      tag: "DECISION FRICTION",
      title: "DECISION HESITATION",
      image: "/images/eeg_branch_experience.png",
      measuring: "Potential hesitation patterns during application stages, verification requests, or compliance-heavy interfaces.",
      interpreted: "Customers may pause before taking action when confidence or clarity drops.",
      adaptation: "Reduce friction near application steps and simplify action-oriented communication."
    }
  ];

  // Tailor signals based on other families with identical clean structures
  if (isFmri) {
    signalsList = [
      {
        tag: "EMOTIONAL SAFETY",
        title: "TRUST COMFORT",
        image: "/images/fmri_trust_comfort.png",
        measuring: "Potential emotional comfort patterns when customers view familiar people, reassuring environments, or community-centered communication.",
        interpreted: "Customers may emotionally trust experiences that feel familiar, human, and locally relatable.",
        adaptation: "Use branch-led storytelling, reassuring onboarding communication, and localized campaign narratives."
      },
      {
        tag: "COGNITIVE STRESS",
        title: "FINANCIAL ANXIETY",
        image: "/images/fmri_anxiety.png",
        measuring: "Potential emotional stress responses during exposure to dense EMI calculations, compliance-heavy screens, or technical repayment structures.",
        interpreted: "Customers may emotionally disengage when financial information feels intimidating or mentally exhausting.",
        adaptation: "Simplify repayment communication and reduce visual complexity during comparison journeys."
      },
      {
        tag: "ATTENTION ENGAGEMENT",
        title: "ATTENTION DROP",
        image: "/images/fmri_attention_drop.png",
        measuring: "Potential reductions in sustained engagement during cluttered or information-heavy digital experiences.",
        interpreted: "Important actions and financing information may lose emotional relevance when layouts compete for attention.",
        adaptation: "Improve visual hierarchy, spacing, and focus around important actions."
      },
      {
        tag: "EMOTIONAL CONNECTION",
        title: "NARRATIVE ENGAGEMENT",
        image: "/images/fmri_narrative.png",
        measuring: "Potential emotional activation during aspiration-led stories, family-centered journeys, and success-oriented campaign moments.",
        interpreted: "Emotionally relatable storytelling may create stronger long-term engagement than technical product communication.",
        adaptation: "Use human-centered narratives instead of specification-heavy messaging."
      },
      {
        tag: "MEMORY FORMATION",
        title: "MEMORY RETENTION",
        image: "/images/fmri_memory.png",
        measuring: "Potential memory-related activation during emotionally meaningful campaign experiences and recognizable visual moments.",
        interpreted: "Customers may retain emotionally connected messaging more strongly than detailed financial information.",
        adaptation: "Place key trust-building and product messaging near emotionally engaging campaign moments."
      },
      {
        tag: "DECISION FRICTION",
        title: "APPLICATION HESITATION",
        image: "/images/fmri_hesitation.png",
        measuring: "Potential emotional hesitation during verification requests, onboarding stages, or document-upload experiences.",
        interpreted: "Customers may pause when confidence, clarity, or emotional reassurance drops.",
        adaptation: "Introduce reassurance messaging before verification-heavy stages."
      }
    ];
  } else if (isAns) {
    signalsList = [
      {
        tag: "FOCAL ATTENTION",
        title: "TRUST SIGNALS",
        image: "/images/eeg_female_rural_trust.png",
        measuring: "Potential gaze stabilization on direct-gaze personnel and familiar branch icons.",
        interpreted: "Visual safety is highest when layout guides focus toward friendly regional imagery.",
        adaptation: "Anchor primary message banners with clean customer relationship officer photos."
      },
      {
        tag: "COGNITIVE LOAD",
        title: "VISUAL CONFUSION",
        image: "/images/eeg_kyc_friction.png",
        measuring: "Potential saccadic eye movements jumping erratically across dense tables.",
        interpreted: "Erratic paths reveal that the layout lacks clean grid structure or logical reading order.",
        adaptation: "Structure lending portals into single-column progressive disclosures."
      },
      {
        tag: "ATTENTION PATH",
        title: "ATTENTION LOSS",
        image: "/images/eeg_attention_leakage.png",
        measuring: "Potential visual bypass of key rate disclaimers or dynamic slider prompts.",
        interpreted: "Visual attention gets siphoned away by gold-gilded borders and massive background imagery.",
        adaptation: "Apply generous blank margins to make the application button the visual focal point."
      },
      {
        tag: "ENGAGEMENT RATE",
        title: "INTEREST PEAKS",
        image: "/images/eeg_brain_engagement.png",
        measuring: "Potential pupil dilation spikes during interactive payment options.",
        interpreted: "Momentary arousal can signal excitement, but excessive dilations reveal pricing stress.",
        adaptation: "Guide pricing calculators with micro-reassurances to stabilize attention."
      },
      {
        tag: "EMOTIONAL VALENCE",
        title: "COMFORT RESPONSES",
        image: "/images/eeg_tvc_testing.png",
        measuring: "Potential second-by-second facial micro-valence smiles or corrugator cheek ease.",
        interpreted: "Micro-smiles indicate relaxed visual comfort during the borrower journey.",
        adaptation: "Pre-test ad creative concepts to verify approach motivations."
      },
      {
        tag: "DECISION STALL",
        title: "HOVER FRICTION",
        image: "/images/eeg_branch_experience.png",
        measuring: "Potential visual dwell cycles locked on buttons without clicking action.",
        interpreted: "Visual interest is captured, but the adjacent jargon prevents decision completion.",
        adaptation: "Ensure legal copy is separate from the primary execution CTA buttons."
      }
    ];
  } else if (isSomatic) {
    signalsList = [
      {
        tag: "SKEPTICISM CHECK",
        title: "TRUST SIGNALS",
        image: "/images/eeg_female_rural_trust.png",
        measuring: "Potential muscular relaxation and calm posture lean-in parameters during branch briefings.",
        interpreted: "Physical calm suggests high confidence in transaction transparency.",
        adaptation: "Conduct lending onboarding in quiet, comfortable cabin discussion rooms."
      },
      {
        tag: "MUSCULAR TENSION",
        title: "VISUAL OVERLOAD",
        image: "/images/eeg_kyc_friction.png",
        measuring: "Potential muscular clenching in brow or jaw areas during calculator sliders.",
        interpreted: "Physical tension flags momentary confusion or anxiety over hidden pricing terms.",
        adaptation: "Standardize clean interface margins with clear vernacular descriptions."
      },
      {
        tag: "AROUSAL MODULATION",
        title: "ATTENTION LOSS",
        image: "/images/eeg_attention_leakage.png",
        measuring: "Potential drops in respiration and posture shifts when visual designs trigger boredom.",
        interpreted: "Important details get ignored when text-heavy pages fail to prompt active posture lean-in.",
        adaptation: "Insert interactive EMI dials to sustain visual interest."
      },
      {
        tag: "VIBRANT RESPONSE",
        title: "EMOTIONAL REASSURANCE",
        image: "/images/eeg_brain_engagement.png",
        measuring: "Potential relaxed breathing rates and positive lean-in during family milestone ad scenes.",
        interpreted: "Grounded agrarian narratives keep physical anxiety levels low and stable.",
        adaptation: "Craft tractor campaigns centered on local farm community stories."
      },
      {
        tag: "VOCAL PROSODY",
        title: "MEMORY RECALL",
        image: "/images/eeg_tvc_testing.png",
        measuring: "Potential pitch stabilization when customers describe brand messaging.",
        interpreted: "Strong recall is anchored by easy-to-understand conversational brand voiceovers.",
        adaptation: "Deploy slow, supportive regional dialects in phone support bot configurations."
      },
      {
        tag: "ACTION FRICTION",
        title: "DECISION HESITATION",
        image: "/images/eeg_branch_experience.png",
        measuring: "Potential micro-stalls in manual interaction during loan applications.",
        interpreted: "Physical action delays reveal visual doubt and processing exhaustion.",
        adaptation: "Reduce dynamic checklist screens to visual progress gates."
      }
    ];
  } else if (isBehavioral) {
    signalsList = [
      {
        tag: "SCHEMA INTEGRITY",
        title: "TRUST SIGNALS",
        image: "/images/eeg_female_rural_trust.png",
        measuring: "Potential association pairing speed between the brand and secure terms under 300ms limits.",
        interpreted: "Fast, intuitive associations indicate strong System 1 brand security trust.",
        adaptation: "Keep the corporate shield logo consistently visible near key branch portals."
      },
      {
        tag: "CONCEPT CONFLATION",
        title: "VISUAL OVERLOAD",
        image: "/images/eeg_kyc_friction.png",
        measuring: "Potential delays siphoned when pairing confusing loan tables with trust terms.",
        interpreted: "Visual complexity leaks into conceptual doubt, slowing down decision comfort.",
        adaptation: "Replace academic rate definitions with transparent, flat installment schedules."
      },
      {
        tag: "CHOICE PREFERENCE",
        title: "ATTENTION LOSS",
        image: "/images/eeg_attention_leakage.png",
        measuring: "Potential visual scan path drift away from primary loan action cards.",
        interpreted: "Choice focus gets divided when too many options compete for priority.",
        adaptation: "Standardize clean, single-focus visual layouts for WhatsApp banners."
      },
      {
        tag: "SYSTEM 1 ALIGNMENT",
        title: "EMOTIONAL REASSURANCE",
        image: "/images/eeg_brain_engagement.png",
        measuring: "Potential schema congruence during household prosperity stories.",
        interpreted: "Family-centered campaigns trigger intuitive security feelings.",
        adaptation: "Design ad visuals featuring regional farm family tractor harrows."
      },
      {
        tag: "IMPLICIT RETENTION",
        title: "MEMORY RECALL",
        image: "/images/eeg_tvc_testing.png",
        measuring: "Potential memory associations linked to regional conversational narration.",
        interpreted: "Vernacular narration anchors ad messages more strongly than spec sheets.",
        adaptation: "Place important brand milestones adjacent to regional dialog hooks."
      },
      {
        tag: "ACTION FRICTION",
        title: "DECISION HESITATION",
        image: "/images/eeg_branch_experience.png",
        measuring: "Potential implicit delays before clicking verification checkmarks.",
        interpreted: "Hesitation spikes when verification requests are presented without trust context.",
        adaptation: "Simplify action buttons with friendly, supportive guidance copy."
      }
    ];
  } else if (isAi) {
    signalsList = [
      {
        tag: "SALIENCY SCORE",
        title: "TRUST SIGNALS",
        image: "/images/eeg_female_rural_trust.png",
        measuring: "AI-predicted visual saliency scores locking cleanly on the official security badges.",
        interpreted: "Bottom-up visual flow immediately isolates the trust anchors within 200ms.",
        adaptation: "Position licensed partner badges at high-saliency visual positions."
      },
      {
        tag: "WORKLOAD PROJECTION",
        title: "VISUAL OVERLOAD",
        image: "/images/eeg_kyc_friction.png",
        measuring: "Digital twin twin simulation mapping visual processing fatigue in multi-step menus.",
        interpreted: "Heavy information density projects steep drop-offs in Dynamic calculator portals.",
        adaptation: "Simplify onboarding paths into visual 1-input progressive gates."
      },
      {
        tag: "GAZE SIMULATION",
        title: "ATTENTION LOSS",
        image: "/images/eeg_attention_leakage.png",
        measuring: "AI gaze simulations bypassing primary rate specifications on landing pages.",
        interpreted: "Visual focus gets siphoned away by excessive graphics and heavy Tractor cliparts.",
        adaptation: "Structure landing pages with generous negative blank margins."
      },
      {
        tag: "PROSODY ANALYZER",
        title: "EMOTIONAL REASSURANCE",
        image: "/images/eeg_brain_engagement.png",
        measuring: "Speech parameter AI models analyzing bot tones for supportive pacing.",
        interpreted: "Conversational speed parameters help reassure walk-in borrowers.",
        adaptation: "Align phone support bot dialers to friendly regional conversational flows."
      },
      {
        tag: "RETENTION PREDICTOR",
        title: "MEMORY RECALL",
        image: "/images/eeg_tvc_testing.png",
        measuring: "Neural networks predicting message retention based on visual flow priorities.",
        interpreted: "Key branding elements get remembered more strongly when placed near narrative peaks.",
        adaptation: "Ensure corporate assets are visually active at the climax of TV ads."
      },
      {
        tag: "FRICTION DIAGNOSTICS",
        title: "DECISION HESITATION",
        image: "/images/eeg_branch_experience.png",
        measuring: "AI simulation logs tracking click-delay factors near input gates.",
        interpreted: "Onboarding hesitation points map directly to complex visual terms.",
        adaptation: "Simplify button labeling and replace complex actions with clear steps."
      }
    ];
  }

  // 3. 6 MODULAR BUSINESS USE CASES - PERFECTLY SYMMETRICAL & GROUNDED
  let useCases = [
    {
      title: "EMI Calculator Overload",
      type: "Lending Onboarding Flow",
      image: "/images/eeg_tvc_testing.png",
      challenge: "Rural borrowers experience heavy mental effort and drop off when facing interest tables.",
      reveal: "Displaying compound equations and tenures concurrently causes customer stress.",
      pathway: "Simplify the dynamic calculator page into a single installment dial slider.",
      impact: "Potential reduction in customer confusion"
    },
    {
      title: "KYC Upload Hesitation",
      type: "Digital Onboarding Journeys",
      image: "/images/eeg_attention_leakage.png",
      challenge: "High mid-funnel drop-offs occur at dynamic document upload gates.",
      reveal: "Prompting Aadhaar uploads before establishing brand trust triggers customer stress.",
      pathway: "Present secure RBI credentials and direct-gaze advisor photos before the prompt.",
      impact: "May resolve document drop-offs"
    },
    {
      title: "WhatsApp Attention Loss",
      type: "Regional Marketing Campaigns",
      image: "/images/eeg_before_after_creatives.png",
      challenge: "Low click-through rates on vernacular messaging ad banners.",
      reveal: "Attention is siphoned away by gold-gilded borders and multi-column bullet grids.",
      pathway: "Standardize clean layout spacing featuring a single-focus farm family visual.",
      impact: "Could improve campaign engagement"
    },
    {
      title: "TVC Narrative Testing",
      type: "Creative Ad Reviews",
      image: "/images/eeg_kyc_friction.png",
      challenge: "Traditional survey panels fail to capture second-by-second narrative interest drops.",
      reveal: "Visual disengagement spikes during scientific specification displays in commercials.",
      pathway: "Swap rate grids with warm regional storytelling of tractor deliveries.",
      impact: "Could improve long-term ad recall"
    },
    {
      title: "Female Co-Signer Trust",
      type: "Rural Credit Journeys",
      image: "/images/eeg_female_rural_trust.png",
      challenge: "Survey forms fail to represent female rural co-signers who guide purchasing.",
      reveal: "Visual trust markers rise when marketing displays family-wide farm prosperity.",
      pathway: "Design ad layouts focused on joint family ownership and regional advisors.",
      impact: "Potential lift in joint applications"
    },
    {
      title: "Branch Waiting Anxiety",
      type: "Branch Customer Interactions",
      image: "/images/eeg_branch_experience.png",
      challenge: "Walk-in borrowers show high decision hesitation during cabin loan briefings.",
      reveal: "Ambiguous compliance disclaimers next to calculators trigger visual avoidance.",
      pathway: "Re-arrange desk tables and simplify flyers with generous negative space.",
      impact: "May improve walk-in closing comfort"
    }
  ];

  if (isFmri) {
    useCases = [
      {
        title: "Campaign Testing",
        type: "Creative Strategy",
        image: "/images/fmri_narrative.png",
        challenge: "Long-form campaigns lose emotional engagement midway through the customer journey.",
        reveal: "Emotionally familiar storytelling may sustain engagement longer than technical product narration.",
        pathway: "Introduce aspiration-led storytelling before financing details.",
        impact: "Sustained customer interest"
      },
      {
        title: "EMI Disclosure Simplification",
        type: "Repayment Journeys",
        image: "/images/fmri_anxiety.png",
        challenge: "Users abandon repayment journeys during calculation stages.",
        reveal: "High information density may increase emotional fatigue.",
        pathway: "Present repayment structures progressively instead of displaying all variables simultaneously.",
        impact: "Reduced visual fatigue"
      },
      {
        title: "KYC Experience Analysis",
        type: "Onboarding Funnels",
        image: "/images/fmri_hesitation.png",
        challenge: "Customers hesitate during verification and upload stages.",
        reveal: "Immediate exposure to document-heavy screens may reduce emotional confidence.",
        pathway: "Introduce reassurance and trust-building communication before upload prompts.",
        impact: "Higher verification confidence"
      },
      {
        title: "Branch Experience Research",
        type: "In-Branch Experience",
        image: "/images/fmri_trust_comfort.png",
        challenge: "Formal branch environments may feel intimidating for first-time customers.",
        reveal: "Human-centered environments may reduce emotional stress and increase comfort.",
        pathway: "Create conversational onboarding spaces and guided assistance experiences.",
        impact: "Enhanced borrower comfort"
      },
      {
        title: "Regional Communication Testing",
        type: "Campaign Auditing",
        image: "/images/fmri_memory.png",
        challenge: "Translated campaigns perform differently across regions.",
        reveal: "Localized emotional storytelling may perform better than direct translation structures.",
        pathway: "Use conversational regional narratives and community-centered communication.",
        impact: "Resonant emotional trust"
      }
    ];
  }

  // 4. HOTSPOT OVERLAYS - STRATEGIC QUALIFIERS
  const hotspots = [
    {
      id: 1,
      x: "15%",
      y: "30%",
      label: "Visual Overload Block",
      beforeTip: "Dense rate grids trigger visual overload and prefrontal avoidance.",
      afterTip: "Customer stress could decline when terms are displayed inside progressive tabs."
    },
    {
      id: 2,
      x: "50%",
      y: "40%",
      label: "Focal Path Calibration",
      beforeTip: "Attention is siphoned away by cluttered golden borders and tractor cliparts.",
      afterTip: "Clean margins help carry focus smoothly to the core installment benefit."
    },
    {
      id: 3,
      x: "82%",
      y: "75%",
      label: "CTA Decision Ease",
      beforeTip: "Decision hesitation spikes due to adjacent compliance jargon.",
      afterTip: "A clean button layout with reassuring checkmarks makes execution simple."
    }
  ];

  return {
    heroSubtitleLine1,
    heroSubtitleLine2,
    metadataBlocks,
    waveData,
    signalsList,
    useCases,
    hotspots
  };
}


export interface EegStorytellingViewProps {
  tool: typeof neuroscienceToolsList[0];
  activeTheme: typeof themeConfig[string];
}


export function EegStorytellingView({ tool, activeTheme }: EegStorytellingViewProps) {
  // ═══════════════════════════════════════════
  // 1. HYPOTHETICAL BEHAVIORAL SIGNALS DATASET (SECTION 2)
  // ═══════════════════════════════════════════
  const hypotheticalSignals = [
    {
      title: "Trust Response",
      tag: "Affiliation Indicator",
      human: "Customers feel subconsciously safe, secure, and receptive.",
      marketing: "Strategic displays of localized agricultural storytelling and official security trust indicators may increase loan confidence.",
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-950/20",
      icon: ShieldCheck
    },
    {
      title: "Cognitive Overload",
      tag: "Workload Indicator",
      human: "Mental capacity is stretched, driving visual fatigue.",
      marketing: "Presenting multiple interest rate variables simultaneously siphons focus; progressive disclosure sliders could prevent abandonment.",
      color: "border-rose-500/40 text-rose-450 bg-rose-950/20",
      icon: Brain
    },
    {
      title: "Attention Drop",
      tag: "Visual Engagement",
      human: "Eye gaze drifts away from key interface coordinates.",
      marketing: "Cluttered banners sidetrack visual focus; isolating call-to-actions with 40% breathing room could help retain primary gaze focus.",
      color: "border-indigo-500/40 text-indigo-300 bg-indigo-950/20",
      icon: EyeOff
    },
    {
      title: "Emotional Engagement",
      tag: "Approach Motivation",
      human: "Subconscious approach bias and positive resonance.",
      marketing: "Ad creative storyboards depicting community growth or family empowerment may trigger early positive approach milestones.",
      color: "border-purple-500/40 text-purple-400 bg-purple-950/20",
      icon: Heart
    },
    {
      title: "Memory Encoding",
      tag: "Long-Term Retention",
      human: "Visual information is saved into long-term mental storage.",
      marketing: "Placing corporate brand assets directly adjacent to high-appeal family moments may strengthen permanent recall.",
      color: "border-amber-500/40 text-amber-400 bg-amber-955/20",
      icon: Database
    },
    {
      title: "CTA Hesitation",
      tag: "Decision Pause",
      human: "Foveal gaze lingers on button coordinates without clicking.",
      marketing: "Borderless buttons blend into the background, siphoning attention; highly tactile, elevated borders might reduce action lag.",
      color: "border-blue-500/40 text-blue-300 bg-blue-950/20",
      icon: Sliders
    },
    {
      title: "Financial Anxiety",
      tag: "Stress Trigger",
      human: "Autonomic fear response spikes, triggering defensive blocks.",
      marketing: "Demanding government document uploads too early siphons confidence; localized safety reassurance may soothe threat-aversion.",
      color: "border-rose-500/40 text-rose-400 bg-rose-955/20",
      icon: AlertTriangle
    },
    {
      title: "Narrative Retention",
      tag: "Workload Indicator",
      human: "Information sequence is fully parsed and understood.",
      marketing: "Hurried voiceover advisories on phone channels trigger hang-ups; slower paced, conversational voiceovers drop anxiety.",
      color: "border-stone-500/40 text-stone-300 bg-stone-900/20",
      icon: Workflow
    }
  ];

  // ═══════════════════════════════════════════
  // 2. EDUCATIONAL WAVE CALIBRATIONS (SECTION 3)
  // ═══════════════════════════════════════════
  const simulatedWaves = [
    {
      name: "ALPHA WAVES",
      range: "8 - 12 Hz",
      meaning: "Calm attention and trust.",
      interpretation: "Indicates a state where users feel mentally safe and highly receptive to detailed finance disclosures.",
      color: "#10b981",
      signalPath: "M 0,25 Q 20,40 40,25 T 80,25 T 120,25 T 160,25 T 200,25 T 240,25 T 280,25"
    },
    {
      name: "BETA WAVES",
      range: "12 - 30 Hz",
      meaning: "High cognitive effort.",
      interpretation: "Suggests heavy information processing, often triggered by complex, multi-row calculation sheets.",
      color: "#A11D33",
      signalPath: "M 0,25 L 5,10 L 10,40 L 15,15 L 20,35 L 25,10 L 30,40 L 35,15 L 40,35 L 45,10 L 50,40 L 55,15 L 60,35 L 65,10 T 280,25"
    },
    {
      name: "THETA WAVES",
      range: "4 - 8 Hz",
      meaning: "Emotional memory engagement.",
      interpretation: "Possible indicator of connection to stories, where regional narration and folk animations build resonance.",
      color: "#818cf8",
      signalPath: "M 0,25 Q 30,10 60,25 T 120,25 T 180,25 T 240,25 T 300,25"
    },
    {
      name: "GAMMA WAVES",
      range: "30 - 100 Hz",
      meaning: "Intense cognitive integration.",
      interpretation: "Simulated concentration spikes showing active decision-making focus during key conversion steps.",
      color: "#f59e0b",
      signalPath: "M 0,25 L 3,10 L 6,40 L 9,15 L 12,35 L 15,10 L 18,40 L 21,15 L 24,35 L 27,10 L 30,40 L 33,15 L 36,35 T 280,25"
    }
  ];

  // ═══════════════════════════════════════════
  // 3. HYPOTHETICAL MAHINDRA SCENARIOS (SECTION 4)
  // ═══════════════════════════════════════════
  const hypotheticalScenarios = [
    {
      title: "Tractor Loan TVC Testing",
      tag: "Creative Production",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eeg_tvc_testing.png",
      challenge: "Television commercial campaigns risk losing regional audience attention during technical spec disclosures.",
      reveal: "EEG testing may help identify second-by-second changes in prefrontal approach and motivation metrics.",
      insight: "Subconscious indicators suggest engagement remains high during farming scenes, but falls during spec tables.",
      optimize: "Edit the ad narrative to weave the corporate logo and tractor advantages directly into emotional peak moments.",
      impact: "Expected increase in regional ad recall and brand affinity."
    },
    {
      title: "EMI Disclosure Simplification",
      tag: "Funnel Conversion",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eeg_fintech_onboarding.png",
      challenge: "Borrowers experience subconscious visual anxiety when viewing complex interest rates and calculation rows.",
      reveal: "Parietal beta and theta mapping could potentially detect excessive cognitive processing thresholds.",
      insight: "Simulated telemetry shows showing too many dynamic figures simultaneously spikes customer stress markers.",
      optimize: "Re-architect interest grids into clear, progressive repayment milestones with visual, single-variable sliders.",
      impact: "Target reduction in applicant drop-offs on compliance pages."
    },
    {
      title: "KYC Journey Friction Analysis",
      tag: "Onboarding Experience",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eeg_kyc_friction.png",
      challenge: "Prospects abandon self-service mobile loan applications at Aadhaar and government document upload gates.",
      reveal: "Prefrontal telemetry may identify sudden sympathetic nervous system stress events during identity upload requests.",
      insight: "Demanding personal government documentation before establishing brand security can trigger avoidance.",
      optimize: "Position prominent security trust badges and real relationship advisor photos adjacent to the upload prompt.",
      impact: "Expected increase in KYC completion rates."
    },
    {
      title: "WhatsApp Campaign Testing",
      tag: "Mobile Communication",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eeg_brain_engagement.png",
      challenge: "Conversational WhatsApp campaign banners generate low click-through rates and high opt-outs.",
      reveal: "Visual scanpaths and prefrontal alpha synchrony might reveal initial cognitive reading resistance.",
      insight: "Subconscious metrics suggest dense bulleted lists on chat graphics trigger quick cognitive blocks.",
      optimize: "Redesign graphics to present single-sentence benefit callouts paired with clear, friendly rural imagery.",
      impact: "Expected rise in click-through rates and drop in subscriber opt-outs."
    },
    {
      title: "CTA Optimization",
      tag: "UI Layout Saliency",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eeg_branch_experience.png",
      challenge: "Users scroll past primary call-to-action buttons without registering visual notice.",
      reveal: "Gaze tracking overlays may pinpoint click-decision lag and low visual focus levels on flat buttons.",
      insight: "Flat, borderless buttons blend into the background graphics, failing to draw pre-attentive brain notice.",
      optimize: "Calibrate primary mobile buttons with high-contrast glowing borders and a clear tactile outline.",
      impact: "Expected lift in visual click actions."
    },
    {
      title: "Branch Experience Calibration",
      tag: "Physical Space",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eeg_female_rural_trust.png",
      challenge: "Walk-in agricultural borrowers show subtle hesitation and defensive posture during face-to-face cabin consultations.",
      reveal: "Simulated prefrontal indicators may identify ambient stress factors during branch visits.",
      insight: "Stiff sales cabins with loud product flyers might trigger subconscious defensive anxiety.",
      optimize: "Introduce quiet advisory corners featuring warm wood textures, comfortable seating, and soft branch lighting.",
      impact: "Target increase in closing rates on walk-in applications."
    },
    {
      title: "Female Rural Borrower Trust Research",
      tag: "Inclusive Design",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eeg_attention_leakage.png",
      challenge: "Traditional surveys underestimate the massive guiding influence of female family co-signers in farm financing.",
      reveal: "Frontal alpha asymmetry tracking could map approach motivation levels in female decision-makers.",
      insight: "Ad flyers depicting sole male owners may trigger subconscious avoidance markers in co-signing wives.",
      optimize: "Revise agricultural brochures to depict collaborative family farming activities and joint ownership.",
      impact: "Expected increase in joint family loan applications."
    },
    {
      title: "Festival Campaign Attention Testing",
      tag: "Seasonal Visuals",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fmri_trust_comfort.png",
      challenge: "High-budget seasonal festival ad campaigns blend into visual noise in crowded media markets.",
      reveal: "Prefrontal visual salience and memory encoding indexes may measure ad habituation levels.",
      insight: "Generic festive assets (diyas, gold ribbons) fail to stand out, siphoning visual notice away from brand assets.",
      optimize: "Artistically weave the Mahindra Finance emblem into custom, high-salience regional folk-art decorations.",
      impact: "Expected boost in long-term brand recall during seasonal campaigns."
    },
    {
      title: "Regional Language Ad Calibration",
      tag: "Localization Strategy",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fmri_memory.png",
      challenge: "Direct literal translations of original assets perform poorly in local regional territories.",
      reveal: "EEG telemetry could measure semantic processing workload during localized ad exposure.",
      insight: "Word-for-word translation creates structural linguistic mismatches, driving cognitive strain.",
      optimize: "Calibrate regional copy with authentic local colloquialisms and warm branch advisory expressions.",
      impact: "Expected boost in localized ad click engagement."
    },
    {
      title: "Audio Narration Testing",
      tag: "Acoustic Customer Care",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fmri_anxiety.png",
      challenge: "Hurrying automated telephone advisory voices trigger swift collection hang-ups and customer resentment.",
      reveal: "Prefrontal acoustic stress and sympathetic nervous system markers may track voice-over stress triggers.",
      insight: "Rapid, mechanical corporate speech structures trigger subconscious customer threat avoidance.",
      optimize: "Record customer loop audio scripts using slow, conversational regional voice actors and reassuring tones.",
      impact: "Target reduction in customer anxiety and higher supportive resolution rates."
    },
    {
      title: "Loan Application Cognitive Load Mapping",
      tag: "Self-Service Mobile",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fmri_hesitation.png",
      challenge: "Mobile application users abandon portals when asked to calculate dynamic farm income projections.",
      reveal: "EEG beta-to-theta ratios could monitor working memory capacity levels during math input steps.",
      insight: "Requiring manual calculations triggers instant prefrontal cognitive fatigue.",
      optimize: "Replace complex numeric entry boxes with intuitive, single-tap income sliders and range dials.",
      impact: "Expected lift in self-service application completions."
    },
    {
      title: "Landing Page Attention Mapping",
      tag: "Digital Experience",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eeg_attention_leakage.png",
      challenge: "High web traffic generates few loan applications; borrowers exit the portal before scrolling.",
      reveal: "Foveal gaze scanpath and attention duration overlays may map gaze siphoning vectors.",
      insight: "Cluttered borders and large background graphics compete with the primary calculator widget, siphoning visual attention.",
      optimize: "Clean visual pathways and isolate key loan input boxes using 40% breathing space margins.",
      impact: "Targeted increase in first-scroll conversion submissions."
    }
  ];

  return (
    <div className="col-span-12 space-y-24 pb-12 relative font-sans text-[#E5E7EB] bg-background">
      {/* Soft warm/lavender subtle radial glows representing prefrontal activity */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#A11D33]/2 via-background to-background pointer-events-none rounded-3xl -z-10 animate-fade-in" />
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] bg-radial from-indigo-500/2 to-transparent pointer-events-none blur-3xl -z-10 animate-pulse" />

      {/* ─── SECTION 1: ENTERPRISE HERO INTRO (McKinsey + Apple + Rural Intelligence) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#090809]/95 border border-stone-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden select-none">
        <div className="absolute top-0 right-0 h-96 w-96 bg-radial from-[#A11D33]/10 to-transparent pointer-events-none blur-3xl animate-pulse" />
        
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-[10px] font-black uppercase tracking-wider">
              <Brain className="h-3.5 w-3.5 text-indigo-400" /> Central Nervous System Technique
            </div>
            <h1 className="font-display font-black text-3xl md:text-4xl text-white uppercase tracking-tight leading-tight">
              Electroencephalography (EEG)
            </h1>
            <p className="text-sm text-[#E5E7EB] font-medium leading-relaxed max-w-xl">
              EEG helps decode subconscious attention, cognitive overload, trust response, and emotional engagement during financial experiences. By observing micro-voltage fluctuations, marketing and design teams can map potential customer friction points without survey bias.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 border-t border-stone-850 pt-5">
            <div>
              <div className="text-[9px] uppercase font-black text-[#FF758F] tracking-wider">What It Measures</div>
              <div className="text-xs font-black text-white mt-1 uppercase tracking-wide">Brainwave Activity</div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-[#CBD5E1] tracking-wider">Best Use</div>
              <div className="text-xs font-black text-indigo-300 mt-1 uppercase tracking-wide">Attention & Load</div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-[#CBD5E1] tracking-wider">Business Relevance</div>
              <div className="text-xs font-black text-white mt-1 uppercase tracking-wide leading-tight">Journey Optimization</div>
            </div>
          </div>
        </div>

        {/* Realistic Aspirational Visual */}
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl border border-stone-850 aspect-[4/3] group">
          <img 
            src="/images/eeg_headset_participant.png" 
            alt="Rural/semi-urban consumer participant wearing wireless EEG headset during simulated campaign testing" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 filter brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-6">
            <span className="text-[9px] font-black uppercase text-amber-400 tracking-wider mb-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" /> Simulated Deployment Scenario
            </span>
            <h3 className="font-display font-black text-sm text-white uppercase tracking-wide">
              Behavioral Branch Interface Research
            </h3>
            <p className="text-[11px] text-[#E5E7EB] mt-1 leading-normal font-medium max-w-md">
              EEG headsets could potentially help calibrate rural customer reactions to regional financing brochures and mobile calculators in branch zones.
            </p>
          </div>
        </div>
      </div>

      {/* ─── SECTION 2: WHAT EEG ACTUALLY HELPS UNDERSTAND (BENTO GRID) ─── */}
      <div className="space-y-6 select-none">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            Behavioral Indicators
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            Behavioral Signals EEG Can Potentially Detect
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            Understanding the subconscious customer triggers that direct brand trust, visual confusion, and loan decisions during the financial onboarding journey.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans pt-2">
          {hypotheticalSignals.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-[#0c0b0c] border border-stone-800 hover:border-stone-700 transition-all duration-300 rounded-3xl p-5 flex flex-col justify-between min-h-[250px] shadow-2xl relative overflow-hidden group animate-fade-in"
              >
                <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-white/2 to-transparent pointer-events-none" />
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center border-b border-stone-850 pb-2.5">
                    <span className={`text-[8.5px] font-black uppercase px-2.5 py-0.5 rounded border ${item.color}`}>
                      {item.tag}
                    </span>
                    <div className={`p-1.5 rounded-lg border ${item.color} flex items-center justify-center`}>
                      <IconComp className="h-4 w-4" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-display font-black text-sm text-white uppercase tracking-wider">
                      {item.title}
                    </h3>
                    <div className="bg-[#121011] border border-stone-850 p-2.5 rounded-xl mt-2">
                      <span className="text-[7.5px] font-black uppercase text-[#94A3B8] tracking-wider block mb-0.5">Neuroscience Signal</span>
                      <p className="text-[10.5px] text-[#E5E7EB] leading-normal font-semibold">
                        “{item.human}”
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-stone-850 relative z-10">
                  <span className="text-[7.5px] font-black uppercase text-[#94A3B8] tracking-widest block mb-1">Marketing Implication</span>
                  <p className="text-[10.5px] text-[#CBD5E1] leading-relaxed font-semibold">
                    {item.marketing}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── SECTION 3: SIMPLE EEG EXPLANATION (HORIZONTAL VISUAL SIGNAL INTERPRETATION) ─── */}
      <div className="space-y-6 select-none border-t border-stone-200/20 pt-1">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            EEG Signal Interpretation
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            How EEG Signals Are Interpreted
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            A clean look at simulated prefrontal wave oscillations and what they potentially indicate about borrower decision-making.
          </p>
        </div>

        {/* Horizontal Mini Signal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans pt-2">
          {simulatedWaves.map((wave, idx) => (
            <div 
              key={idx}
              className="bg-[#0c0b0c] border border-stone-800 rounded-3xl p-5 space-y-4 hover:border-stone-700 transition-all duration-300 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-white/1 to-transparent pointer-events-none" />
              <div className="flex justify-between items-center border-b border-stone-850 pb-2 relative z-10">
                <span className="font-display font-black text-xs text-white uppercase tracking-wider">{wave.name}</span>
                <span className="text-[9.5px] font-mono font-black text-cyan-400 bg-cyan-955 border border-cyan-500/25 px-2 py-0.5 rounded-md">{wave.range}</span>
              </div>

              {/* Medical-grade wave SVG representation with diagnostic grid */}
              <div className="h-16 w-full bg-[#050405] border border-stone-900 rounded-xl flex items-center relative overflow-hidden px-3 shadow-inner group-hover:border-stone-800 transition-colors">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:8px_8px] pointer-events-none" />
                <svg className="absolute inset-0 h-full w-full pointer-events-none">
                  <defs>
                    <filter id={`glow-${idx}`} x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="1.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <path d={wave.signalPath} fill="none" stroke={wave.color} strokeWidth="2.5" strokeLinecap="round" filter={`url(#glow-${idx})`} className="opacity-95" />
                </svg>
              </div>

              <div className="space-y-3.5 relative z-10">
                <div className="bg-[#121011] p-2.5 rounded-xl border border-stone-850">
                  <span className="text-[7.5px] font-black uppercase text-rose-500 tracking-widest block">Neural Signal State</span>
                  <div className="text-xs font-black text-white mt-1">{wave.meaning}</div>
                </div>
                <div>
                  <span className="text-[7.5px] font-black uppercase text-[#94A3B8] tracking-widest block">Behavioral Diagnosis</span>
                  <p className="text-[10.5px] leading-relaxed text-[#CBD5E1] font-semibold mt-1">{wave.interpretation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION 4: POTENTIAL EEG DEPLOYMENT SCENARIOS FOR MAHINDRA FINANCE ─── */}
      <div className="space-y-6 select-none border-t border-stone-200/20 pt-1">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            Deployment Scenarios
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            Potential EEG Deployment Scenarios<br className="hidden lg:inline" /> for Mahindra&nbsp;Finance
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            Hypothetical frameworks detailing how neuromarketing could potentially replace subjective branch surveys with structured prefrontal diagnostics.
          </p>
        </div>

        {/* 3-Column Grid representing EEG intelligence grid */}
        <div className="grid grid-cols-12 gap-6 items-stretch font-sans pt-2">
          {hypotheticalScenarios.map((use, idx) => (
            <div 
              key={idx}
              className={`bg-[#0c0b0c] border border-stone-855 rounded-3xl p-5 md:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between hover:border-stone-700 hover:bg-[#121011] transition-all duration-300 group ${use.style}`}
            >
              <div className="absolute top-0 right-0 h-40 w-40 bg-radial from-[#A11D33]/4 to-transparent pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-stone-850 pb-2.5">
                  <span className="text-[8.5px] font-black uppercase text-[#FF758F] bg-[#A11D33]/15 px-2.5 py-0.5 rounded border border-[#A11D33]/30">
                    {use.tag}
                  </span>
                  <span className="text-[7.5px] font-mono text-stone-400 font-bold">SCENARIO {(idx + 1).toString().padStart(2, "0")}</span>
                </div>

                {/* Aspect-controlled visual placeholder */}
                <div className="relative rounded-2xl overflow-hidden border border-stone-850 shadow bg-secondary/15 shrink-0 transition-all duration-500 group-hover:border-stone-750 aspect-[16/9]">
                  <img 
                    src={use.image} 
                    alt={use.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 filter brightness-[0.8]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex items-end p-4">
                    <h3 className="font-display font-black text-xs md:text-sm text-white uppercase tracking-wide">
                      {use.title}
                    </h3>
                  </div>
                </div>

                {/* 4 Core Hypothetical Fields */}
                <div className="grid gap-4 pt-2 border-t border-stone-850 grid-cols-1">
                  <div className="bg-[#121011] p-3 rounded-xl border border-stone-850">
                    <span className="text-[8px] font-black text-rose-450 uppercase tracking-widest block">Marketing Challenge</span>
                    <p className="text-[10.5px] leading-relaxed text-[#E5E7EB] font-semibold mt-1">{use.challenge}</p>
                  </div>
                  <div className="bg-[#121011] p-3 rounded-xl border border-stone-850">
                    <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest block">What EEG Telemetry Reveals</span>
                    <p className="text-[10.5px] leading-relaxed text-[#E5E7EB] font-semibold mt-1">{use.reveal}</p>
                  </div>
                  <div className="bg-[#121011] p-3 rounded-xl border border-stone-850">
                    <span className="text-[8px] font-black text-[#F5E6CC] uppercase tracking-widest block">Possible Behavioral Insight</span>
                    <p className="text-[10.5px] leading-relaxed text-[#E5E7EB] font-semibold mt-1">{use.insight}</p>
                  </div>
                  <div className="bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/15">
                    <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest block">Targeted Visual Optimization</span>
                    <p className="text-[10.5px] leading-relaxed text-white font-bold mt-1">"{use.optimize}"</p>
                  </div>
                </div>
              </div>

              {/* 5th Field: Expected Business Impact Banner */}
              <div className="bg-[#050405] border border-stone-855 px-3.5 py-2.5 rounded-xl flex justify-between items-center text-[10px] font-bold mt-4 shrink-0 transition-colors group-hover:bg-[#121011]">
                <span className="text-stone-300 flex items-center gap-1.5 uppercase text-[7.5px] tracking-widest font-black">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-400" /> Expected Business Impact:
                </span>
                <span className="text-emerald-400 font-black text-right tracking-wide">{use.impact}</span>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION 6: EXECUTIVE STRATEGIC TAKEAWAYS (ENTERPRISE SCORECARDS) ─── */}
      <div className="space-y-6 select-none pb-4 border-t border-stone-200/20 pt-1">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            Executive Scorecards
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            Enterprise Strategic Takeaways
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            Enterprise-grade evaluation guidelines to calibrate real-world branch deployment feasibility, scalability, and ethical safeguards.
          </p>
        </div>

        {/* 7 Enterprise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 font-sans pt-2">
          
          <div className="bg-[#0c0b0c] border border-stone-805 hover:border-stone-700 transition-all duration-300 rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[170px] group animate-fade-in">
            <div className="space-y-2">
              <span className="text-[8px] font-black uppercase text-[#FF758F] tracking-widest block">Deployment Setup</span>
              <h4 className="font-display font-black text-xs text-white uppercase tracking-wide">Best Environments for EEG</h4>
              <p className="text-[10px] leading-relaxed text-[#E5E7EB] font-medium">
                EEG is optimally deployed within dedicated, quiet mobile UX research laboratories or branch-specific cluster panels during campaign creation phases.
              </p>
            </div>
            <div className="space-y-1 mt-4">
              <div className="flex justify-between text-[7.5px] font-mono font-bold text-[#CBD5E1] uppercase">
                <span>IMPACT SCORE</span>
                <span>HIGH (85%)</span>
              </div>
              <div className="w-full h-1.5 bg-stone-900 border border-stone-800 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
              </div>
            </div>
          </div>

          <div className="bg-[#0c0b0c] border border-stone-800 hover:border-stone-750 transition-all duration-300 rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[170px] group animate-fade-in">
            <div className="space-y-2">
              <span className="text-[8px] font-black uppercase text-[#CBD5E1] tracking-widest block">Operational Fit</span>
              <h4 className="font-display font-black text-xs text-white uppercase tracking-wide">Rural Feasibility</h4>
              <p className="text-[10px] leading-relaxed text-[#E5E7EB] font-medium">
                Dry-node wireless telemetry eliminates medical gels, making semi-urban branch focus groups highly feasible with negligible participant physical stress.
              </p>
            </div>
            <div className="space-y-1 mt-4">
              <div className="flex justify-between text-[7.5px] font-mono font-bold text-[#CBD5E1] uppercase">
                <span>IMPACT SCORE</span>
                <span>CRITICAL (90%)</span>
              </div>
              <div className="w-full h-1.5 bg-stone-900 border border-stone-800 rounded-full overflow-hidden">
                <div className="h-full w-[90%] bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]" />
              </div>
            </div>
          </div>

          <div className="bg-[#0c0b0c] border border-stone-800 hover:border-stone-750 transition-all duration-300 rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[170px] group animate-fade-in">
            <div className="space-y-2">
              <span className="text-[8px] font-black uppercase text-emerald-400 tracking-widest block">Resource Scale</span>
              <h4 className="font-display font-black text-xs text-white uppercase tracking-wide">Cost & Scalability</h4>
              <p className="text-[10px] leading-relaxed text-[#E5E7EB] font-medium">
                High upfront equipment and moderation fees are offset downstream by key improvements in digital application drop-offs and WhatsApp campaign response.
              </p>
            </div>
            <div className="space-y-1 mt-4">
              <div className="flex justify-between text-[7.5px] font-mono font-bold text-[#CBD5E1] uppercase">
                <span>IMPACT SCORE</span>
                <span>MEDIUM (65%)</span>
              </div>
              <div className="w-full h-1.5 bg-stone-900 border border-stone-800 rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              </div>
            </div>
          </div>

          <div className="bg-[#0c0b0c] border border-stone-800 hover:border-stone-750 transition-all duration-300 rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[170px] group animate-fade-in">
            <div className="space-y-2">
              <span className="text-[8px] font-black uppercase text-amber-400 tracking-widest block">Branch Mechanics</span>
              <h4 className="font-display font-black text-xs text-white uppercase tracking-wide">Branch Complexity</h4>
              <p className="text-[10px] leading-relaxed text-[#E5E7EB] font-medium">
                Requires certified behavioral observers to manage testing nodes; recommended as localized, central branch cohort research cycles.
              </p>
            </div>
            <div className="space-y-1 mt-4">
              <div className="flex justify-between text-[7.5px] font-mono font-bold text-[#CBD5E1] uppercase">
                <span>IMPACT SCORE</span>
                <span>MANAGED (75%)</span>
              </div>
              <div className="w-full h-1.5 bg-stone-900 border border-stone-800 rounded-full overflow-hidden">
                <div className="h-full w-[75%] bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
              </div>
            </div>
          </div>

          <div className="bg-[#0c0b0c] border border-stone-805 hover:border-stone-750 transition-all duration-300 rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[170px] group animate-fade-in">
            <div className="space-y-2">
              <span className="text-[8px] font-black uppercase text-blue-300 tracking-widest block">Digital Focus</span>
              <h4 className="font-display font-black text-xs text-white uppercase tracking-wide">Digital Research</h4>
              <p className="text-[10px] leading-relaxed text-[#E5E7EB] font-medium">
                Substantial opportunity exists to pre-test self-service tractor finance calculators and regional mobile onboarding screens to prevent UI friction before launching.
              </p>
            </div>
            <div className="space-y-1 mt-4">
              <div className="flex justify-between text-[7.5px] font-mono font-bold text-[#CBD5E1] uppercase">
                <span>IMPACT SCORE</span>
                <span>OPTIMIZED (85%)</span>
              </div>
              <div className="w-full h-1.5 bg-stone-900 border border-stone-800 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
              </div>
            </div>
          </div>

          <div className="bg-[#0c0b0c] border border-stone-800 hover:border-stone-750 transition-all duration-300 rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[170px] group animate-fade-in">
            <div className="space-y-2">
              <span className="text-[8px] font-black uppercase text-rose-455 tracking-widest block">Method Limitations</span>
              <h4 className="font-display font-black text-xs text-white uppercase tracking-wide">Key Limitations</h4>
              <p className="text-[10px] leading-relaxed text-[#E5E7EB] font-medium">
                EEG captures immediate working memory strain and prefrontal motivation biases, but does not record complex subjective linguistic opinions.
              </p>
            </div>
            <div className="space-y-1 mt-4">
              <div className="flex justify-between text-[7.5px] font-mono font-bold text-[#CBD5E1] uppercase">
                <span>IMPACT SCORE</span>
                <span>LOW (35%)</span>
              </div>
              <div className="w-full h-1.5 bg-stone-900 border border-stone-800 rounded-full overflow-hidden">
                <div className="h-full w-[35%] bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
              </div>
            </div>
          </div>

          <div className="bg-[#0c0b0c] border border-stone-800 hover:border-stone-750 transition-all duration-300 rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[170px] group lg:col-span-2 xl:col-span-1 animate-fade-in">
            <div className="space-y-2">
              <span className="text-[8px] font-black uppercase text-stone-300 tracking-widest block">Compliance Safeguards</span>
              <h4 className="font-display font-black text-xs text-white uppercase tracking-wide">Ethical Compliance</h4>
              <p className="text-[10px] leading-relaxed text-[#E5E7EB] font-medium">
                Deployments require explicit consent from all tested agricultural cohorts, complete biometric database encryption, and compliance with personal privacy standards.
              </p>
            </div>
            <div className="space-y-1 mt-4">
              <div className="flex justify-between text-[7.5px] font-mono font-bold text-[#CBD5E1] uppercase">
                <span>IMPACT SCORE</span>
                <span>SECURED (95%)</span>
              </div>
              <div className="w-full h-1.5 bg-stone-900 border border-stone-800 rounded-full overflow-hidden">
                <div className="h-full w-[95%] bg-stone-500 shadow-[0_0_8px_rgba(120,120,120,0.4)]" />
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}


function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("cns");
  const [activeToolId, setActiveToolId] = useState<string>("eeg");

  // Category parameters
  const categoriesList = [
    { id: "cns", label: "Central Nervous System (CNS) Tools" },
    { id: "ans", label: "Autonomic Nervous System (ANS) Biometrics" },
    { id: "somatic", label: "Somatic & Muscular Response Tools" },
    { id: "behavioral", label: "Behavioral & Implicit Cognitive Tools" },
    { id: "ai", label: "AI & Computational Neuroscience Tools" }
  ];

  // Filter tools of selected category
  const activeCategoryTools = neuroscienceToolsList.filter((t) => t.group === activeCategory);

  // Sync activeToolId when category shifts to ensure it loads a valid tool of that category
  useEffect(() => {
    if (activeCategoryTools.length > 0) {
      // Find if activeToolId belongs to new category, otherwise load first tool
      const isValid = activeCategoryTools.some((t) => t.id === activeToolId);
      if (!isValid) {
        setActiveToolId(activeCategoryTools[0].id);
      }
    }
  }, [activeCategory]);

  const tool = neuroscienceToolsList.find((t) => t.id === activeToolId) || neuroscienceToolsList[0];
  const activeTheme = themeConfig[tool.group] || themeConfig.attention;

  return (
    <AppLayout>
      {/* 
        ═══════════════════════════════════════════
        TWO-TIER FIGMA-STYLE NEURO PLATFORM NAVIGATOR
        ═══════════════════════════════════════════ 
      */}
      <div className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/40 py-3 mb-6 select-none space-y-3">
        {/* Tier 1: Modality Category selectors */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 scrollbar-none">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`h-9 px-4 rounded-xl text-[10.5px] font-black uppercase tracking-wider shrink-0 transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-white shadow-sm"
                  : "bg-secondary/40 text-foreground/80 hover:bg-secondary border border-border/40"
              }`}
            >
              {cat.label.split(" (")[0]}
            </button>
          ))}
        </div>

        {/* Tier 2: Modality Specific subpage triggers */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 scrollbar-none border-t border-border/30 pt-2.5">
          {activeCategoryTools.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveToolId(t.id)}
              className={`h-8 px-3 rounded-lg text-[10px] font-black tracking-wide capitalize shrink-0 transition-all ${
                activeToolId === t.id
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
        DYNAMIC ENVIRONMENT VIEWPORT (Single active technique)
        ═══════════════════════════════════════════ 
      */}
      {tool.id === 'fmri' ? (
        <FmriStorytellingView tool={tool} activeTheme={activeTheme} />
      ) : tool.id === 'gsr' ? (
        <GsrStorytellingView tool={tool} activeTheme={activeTheme} />
      ) : (
        <EegStorytellingView tool={tool} activeTheme={activeTheme} />
      )}
    </AppLayout>
  );
}
