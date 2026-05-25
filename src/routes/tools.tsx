import React, { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/neuro/AppLayout";
import { Card } from "@/components/neuro/Primitives";
import { 
  Eye, Brain, Activity, Smile, Zap, FileText, Heart, Award, 
  ChevronRight, X, Check, ShieldAlert, Sparkles, Shield, BarChart3, HelpCircle,
  EyeOff, Sliders, Fingerprint, Play, Pause, RefreshCw, Cpu, Layers, TrendingUp,
  Database, Gauge, Terminal, ArrowLeft, ShieldCheck, CheckCircle2
} from "lucide-react";

export const Route = createFileRoute("/tools")({ component: ToolsRedirectPage });

function ToolsRedirectPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/tools/$toolId", params: { toolId: "eeg" }, replace: true });
  }, [navigate]);
  return null;
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

// Helper functions for fMRI mobile device preview
function getMobileTitle(tone: "formal" | "reassuring" | "aspirational") {
  if (tone === "formal") return "Secured Vehicle Lending Facility";
  if (tone === "reassuring") return "Your Tractor Financing, With Local Guidance";
  return "Empower Your Farm's Future Today";
}

function getMobileCta(tone: "formal" | "reassuring" | "aspirational") {
  if (tone === "formal") return "Submit Loan Application";
  if (tone === "reassuring") return "Confirm with Safe Guidance";
  return "Secure Your Tractor Today";
}

function getMobileDescription(density: "simplified" | "moderate" | "dense") {
  if (density === "dense") {
    return "The borrower hereby covenants to pay the administrative processing fee of 2.75% amortized over a 36-month period, subject to compound interest accrual under Section 4(a).";
  }
  if (density === "moderate") {
    return "Interest rate: 12% p.a. Processing fee: 2% of loan amount. Repayment tenure options: 12 to 36 months.";
  }
  return "Single monthly installment. Zero hidden charges. Flexible payment periods to match your crop harvest.";
}

function getDynamicInsight(
  density: "simplified" | "moderate" | "dense", 
  tone: "formal" | "reassuring" | "aspirational", 
  layout: "cluttered" | "guided" | "progressive"
) {
  if (layout === "cluttered") {
    return "Cluttered structures increase cognitive load, siphoning attention away from execution buttons and increasing drop-off risks.";
  }
  if (density === "dense") {
    return "Dense technical disclosures trigger prefrontal stress signals, siphoning user emotional comfort and driving decision doubt.";
  }
  if (layout === "guided" && tone === "reassuring" && density === "simplified") {
    return "(Recommended) Simplified layouts with reassuring tone and guided structures reduce cognitive load and significantly lift emotional comfort.";
  }
  return "A clean, progressive layout combined with reassuring language reduces cognitive fatigue and sustains user trust during onboarding.";
}

export function EegStorytellingView({ tool, activeTheme }: EegStorytellingViewProps) {
  const neuroData = getDynamicNeuroData(tool);
  const waveKeys = Object.keys(neuroData.waveData);
  const [selectedWave, setSelectedWave] = useState<string>("");
  const [activeFrictionTab, setActiveFrictionTab] = useState<"before" | "after">("after");
  const [activeFrictionHotspot, setActiveFrictionHotspot] = useState<number | null>(null);

  // States for fMRI simulator
  const [density, setDensity] = useState<"simplified" | "moderate" | "dense">("simplified");
  const [tone, setTone] = useState<"formal" | "reassuring" | "aspirational">("reassuring");
  const [layout, setLayout] = useState<"cluttered" | "guided" | "progressive">("guided");

  // Dynamically calculate metrics for fMRI Simulator
  const calculateMetrics = () => {
    let comfort = 30;
    let attention = 25;
    let cognitive = 40;
    let trust = 30;

    // Density effects
    if (density === "simplified") { comfort += 40; attention += 30; cognitive -= 40; trust += 25; }
    else if (density === "moderate") { comfort += 15; attention += 40; cognitive -= 10; trust += 35; }
    else if (density === "dense") { comfort -= 20; attention -= 15; cognitive += 45; trust -= 10; }

    // Tone effects
    if (tone === "formal") { comfort += 10; attention += 15; cognitive += 15; trust += 10; }
    else if (tone === "reassuring") { comfort += 40; attention += 25; cognitive -= 15; trust += 45; }
    else if (tone === "aspirational") { comfort += 25; attention += 35; cognitive -= 5; trust += 30; }

    // Layout effects
    if (layout === "cluttered") { comfort -= 25; attention -= 35; cognitive += 40; trust -= 20; }
    else if (layout === "guided") { comfort += 35; attention += 45; cognitive -= 25; trust += 40; }
    else if (layout === "progressive") { comfort += 45; attention += 35; cognitive -= 35; trust += 35; }

    return {
      comfort: Math.min(98, Math.max(15, comfort)),
      attention: Math.min(98, Math.max(10, attention)),
      cognitive: Math.min(95, Math.max(15, cognitive)),
      trust: Math.min(98, Math.max(20, trust)),
    };
  };

  const metrics = calculateMetrics();

  useEffect(() => {
    if (waveKeys.length > 0) {
      setSelectedWave(waveKeys[0]);
    }
  }, [tool.id]);

  const activeWaveKey = selectedWave || waveKeys[0] || "";
  const activeWave = neuroData.waveData[activeWaveKey];

  const isFmri = tool.id === "fmri";

  return (
    <div className="col-span-12 space-y-12 pb-12 font-sans max-w-7xl mx-auto px-4 md:px-6">
      
      {/* ─── SECTION 1: HERO INTRO (Refined, Premium Strategic Layout) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-card border border-border/80 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden backdrop-blur-sm select-none">
        <div className="absolute top-0 right-0 h-96 w-96 bg-radial from-primary/5 to-transparent pointer-events-none blur-3xl" />
        
        {/* Left Content - 55% Text Area */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Subtle compact pill badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/5 dark:bg-purple-950/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-wider">
            {isFmri ? "DEEP EMOTIONAL RESPONSE RESEARCH" : "BEHAVIORAL RESEARCH TECHNIQUE"}
          </div>
          
          <div className="max-w-2xl space-y-4">
            <h1 className="font-display font-black text-2xl md:text-3xl lg:text-4xl text-foreground uppercase tracking-tight leading-tight max-w-2xl break-words">
              {tool.name}
            </h1>
            
            <div className="space-y-3 pt-1 text-xs md:text-sm text-stone-700 dark:text-stone-300 font-semibold leading-relaxed">
              <p>{neuroData.heroSubtitleLine1}</p>
              <p>{neuroData.heroSubtitleLine2}</p>
            </div>
          </div>
          
          {/* Quick Insight Row - 3 Clean Blocks */}
          <div className="grid grid-cols-3 gap-4 border-t border-border/40 pt-5">
            <div className="p-3.5 bg-secondary/25 rounded-xl border border-border/40 space-y-1">
              <div className="text-[8px] uppercase font-black text-muted-foreground tracking-wider leading-none">Measures</div>
              <div className="text-[9.5px] font-bold text-foreground uppercase tracking-wide leading-tight mt-1.5">
                {isFmri ? "Emotional engagement, stress response, and memory-related activation" : "Attention patterns, mental effort, and engagement shifts"}
              </div>
            </div>
            <div className="p-3.5 bg-secondary/25 rounded-xl border border-border/40 space-y-1">
              <div className="text-[8px] uppercase font-black text-muted-foreground tracking-wider leading-none">Best Used For</div>
              <div className="text-[9.5px] font-bold text-foreground uppercase tracking-wide leading-tight mt-1.5">
                {isFmri ? "Deep campaign testing and emotional-response analysis" : "Campaign testing and onboarding analysis"}
              </div>
            </div>
            <div className="p-3.5 bg-secondary/25 rounded-xl border border-border/40 space-y-1">
              <div className="text-[8px] uppercase font-black text-muted-foreground tracking-wider leading-none">Research Setting</div>
              <div className="text-[9.5px] font-bold text-foreground uppercase tracking-wide leading-tight mt-1.5">
                {isFmri ? "Controlled lab-based behavioral studies" : "Controlled behavioral research studies"}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - 45% Visual Area (Single Cinematic Grounded Image) */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow border border-border aspect-[4/3] group bg-secondary/10 shrink-0">
          <img 
            src={isFmri ? "/images/fmri_hero.png" : "/images/eeg_headset_participant.png"} 
            alt={`Mahindra Finance ${tool.name} illustrative research environment`} 
            className="w-full h-full object-cover"
          />
          {/* Dark gradient panel overlay at bottom-left */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent flex flex-col justify-end p-5 pt-16">
            <span className="text-[8px] font-black uppercase text-amber-500 tracking-wider mb-1 flex items-center gap-1.5">
              {isFmri ? "ILLUSTRATIVE RESEARCH ENVIRONMENT" : "ILLUSTRATIVE RESEARCH SCENARIO"}
            </span>
            <h3 className="font-display font-black text-[12px] text-white uppercase tracking-wide">
              {isFmri ? "UNDERSTANDING DEEP CUSTOMER EMOTIONS" : "UNDERSTANDING CUSTOMER RESPONSE PATTERNS"}
            </h3>
            <p className="text-[10px] text-stone-300 mt-1 leading-relaxed font-semibold">
              {isFmri 
                ? "Potential FMRI-based behavioral studies may help identify emotional comfort, stress triggers, trust formation, memory retention, and response patterns during financial experiences."
                : "Potential EEG-based research environments may help identify moments of attention loss, hesitation, overload, emotional engagement, and message recall during financial experiences."}
            </p>
          </div>
        </div>
      </div>

      {/* ─── SECTION 2: BEHAVIORAL SIGNALS / WHAT IT HELPS UNDERSTAND (Clean 3-Column Grid) ─── */}
      <div className="space-y-5 select-none">
        <div className="space-y-1">
          <span className="text-[9px] font-black uppercase text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
            {isFmri ? "Emotional-Behavior Interpretation Framework" : "Behavioral Insight Modules"}
          </span>
          <h2 className="font-display font-black text-xl md:text-2xl text-foreground uppercase tracking-wide mt-2">
            {isFmri ? "What FMRI Can Potentially Help Understand" : `What ${tool.name.split(" (")[0]} Can Potentially Detect`}
          </h2>
          <p className="text-xs text-muted-foreground max-w-xl font-semibold leading-relaxed">
            Mapping raw emotional markers helps financial teams understand how campaign copy, mobile journeys, and support environments perform at a subconscious level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {neuroData.signalsList.map((sig, idx) => (
            <div key={idx} className="group rounded-2xl border border-border bg-card overflow-hidden flex flex-col justify-between hover:border-primary/20 transition-all duration-300">
              
              {/* Image Container with Solid Top-Left Category Tag */}
              <div className="relative h-44 overflow-hidden bg-secondary/15 shrink-0">
                <img 
                  src={sig.image} 
                  alt={sig.title} 
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                
                {/* Category Tag Overlay (Solid background, compact uppercase, top-left) */}
                <div className="absolute top-3 left-3 z-10 shrink-0">
                  <span className="text-[7.5px] font-black uppercase text-primary bg-background border border-primary/20 px-2 py-0.5 rounded shadow-sm">
                    {sig.tag}
                  </span>
                </div>
              </div>

              {/* Card Details: Large Bold Heading and Three Structured Blocks */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-4 flex-1 flex flex-col justify-between font-sans">
                  <div>
                    <h3 className="font-display font-black text-base text-foreground uppercase tracking-wide">
                      {sig.title}
                    </h3>
                  </div>

                  <div className="space-y-3.5 text-[11px] leading-relaxed flex-1 pt-1">
                    <div>
                      <span className="text-muted-foreground tracking-wider text-[9px] font-black block mb-0.5">
                        {isFmri ? "What fMRI may be observing" : `WHAT ${tool.name.split(" (")[0].toUpperCase()} MAY BE MEASURING`}
                      </span>
                      <p className="text-stone-700 dark:text-stone-300 font-semibold leading-normal">
                        {sig.measuring}
                      </p>
                    </div>

                    <div className="border-t border-border/40 pt-3">
                      <span className="text-primary tracking-wider text-[9px] font-black block mb-0.5">
                        {isFmri ? "How it may be interpreted" : "HOW IT MAY BE INTERPRETED"}
                      </span>
                      <p className="text-stone-700 dark:text-stone-300 font-semibold leading-normal">
                        {sig.interpreted}
                      </p>
                    </div>

                    <div className="border-t border-border/40 pt-3">
                      <span className="text-emerald-600 dark:text-emerald-500 tracking-wider text-[9px] font-black block mb-0.5">
                        {isFmri ? "Potential business adaptation" : "POTENTIAL BUSINESS ADAPTATION"}
                      </span>
                      <p className="text-stone-800 dark:text-stone-200 font-bold leading-normal">
                        {sig.adaptation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION 3: INTERACTIVE SIGNAL GLOSSARY (Hiding for fMRI - Hemodynamic / Wave Decoupling) ─── */}
      {!isFmri && (
        <div className="bg-card border border-border rounded-3xl p-5 md:p-6 shadow-sm space-y-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between select-none gap-2">
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                Interactive Calibration
              </span>
              <h2 className="font-display font-black text-xl text-foreground uppercase tracking-wide mt-2">
                How {tool.name.split(" (")[0]} Signals Are Interpreted
              </h2>
              <p className="text-xs text-muted-foreground max-w-xl font-semibold leading-relaxed">
                Explore primary physiological variables in neuromarketing and how their fluctuations correspond to key customer behaviors.
              </p>
            </div>
            <div className="text-[8px] text-muted-foreground bg-secondary/40 px-3 py-1.5 rounded-lg border border-border/50 font-mono tracking-wide leading-none select-none">
              *Simulated interpretations based on physiological reference models.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Wave selector buttons */}
            <div className="lg:col-span-7 space-y-2 select-none">
              {Object.entries(neuroData.waveData).map(([key, data]) => {
                const active = activeWaveKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedWave(key)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-start gap-4 cursor-pointer ${
                      active 
                        ? "bg-primary/5 border-primary/45 shadow-sm scale-[1.005]" 
                        : "bg-secondary/15 border-border/50 hover:bg-secondary/30 hover:border-border"
                    }`}
                  >
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border text-[9.5px] font-black uppercase tracking-wider ${
                      active ? data.colorClass : "bg-muted text-muted-foreground border-border/80"
                    }`}>
                      {key.slice(0, 2)}
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-black text-[12.5px] uppercase tracking-wide text-foreground">{data.title}</span>
                        <span className="text-[8px] font-bold text-muted-foreground">{data.focus}</span>
                      </div>
                      <p className="text-[10.5px] text-muted-foreground font-semibold leading-normal">
                        {data.meaning}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Immersive Wave details panel */}
            <div className="lg:col-span-5 bg-stone-950 text-stone-200 rounded-2xl border border-border p-5 flex flex-col justify-between shadow-inner relative overflow-hidden select-none">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none" />
              
              {activeWave ? (
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                    <div>
                      <span className="text-[7.5px] font-black uppercase text-primary/80 tracking-widest block">Active Telemetry Calibration</span>
                      <span className="font-display font-black text-xs uppercase tracking-wide text-white mt-0.5 block">
                        {activeWave.title.split(" (")[0]}
                      </span>
                    </div>
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  </div>

                  {/* Animated Waveform Display */}
                  <div className="h-20 w-full bg-black/40 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden relative shadow-inner">
                    <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 300 50" preserveAspectRatio="none">
                      <path 
                        d={activeWave.simulatedPath} 
                        fill="none" 
                        stroke={activeWave.stroke} 
                        strokeWidth="2" 
                        strokeLinecap="round"
                        className="opacity-90"
                      />
                    </svg>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <span className="text-[7.5px] font-black uppercase text-primary/80 tracking-widest block mb-0.5">Behavioral Reveal</span>
                      <p className="text-[10.5px] leading-relaxed text-stone-200 font-semibold">{activeWave.meaning}</p>
                    </div>
                    
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <span className="text-[7.5px] font-black uppercase text-emerald-400 tracking-widest block mb-0.5">Business Adaptation</span>
                      <p className="text-[10.5px] leading-relaxed text-stone-300 font-medium italic">{activeWave.adaptation}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-xs text-muted-foreground py-8">Select a signal pattern from the left.</div>
              )}

              <div className="text-[8px] text-stone-500 border-t border-white/5 pt-3.5 mt-4 flex items-center gap-1.5 relative z-10">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>Simulated references for training and validation.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── SECTION 4: MAHINDRA FINANCE STRATEGIC USE CASES (fMRI specific scenarios) ─── */}
      <div className="space-y-5">
        <div className="space-y-1 select-none">
          <span className="text-[9px] font-black uppercase text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
            {isFmri ? "Potential FMRI-Inspired Research Scenarios" : "Strategic Use Cases"}
          </span>
          <h2 className="font-display font-black text-xl md:text-2xl text-foreground uppercase tracking-wide mt-2">
            {isFmri ? "Potential FMRI-Inspired Research Scenarios" : `Potential ${tool.name.split(" (")[0]} Deployment Scenarios`}
          </h2>
          <p className="text-xs text-muted-foreground max-w-xl font-semibold leading-relaxed">
            {isFmri 
              ? "Illustrative examples showing how emotional-response mapping could theoretically support financial communication design."
              : "Illustrative neuroscience case models designed for agricultural and semi-urban lending customer journeys."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {neuroData.useCases.map((use, idx) => (
            <div 
              key={idx} 
              className="rounded-2xl border border-border bg-card p-5 flex flex-col justify-between gap-4 shadow-sm hover:border-primary/20 transition-all duration-300 select-none"
            >
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="text-[7.5px] font-black uppercase text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                      {use.type}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-[13.5px] text-foreground uppercase tracking-wide">
                    {use.title}
                  </h3>
                </div>

                {use.image && (
                  <div className="relative rounded-xl overflow-hidden aspect-video border border-border/80 my-2 shrink-0">
                    <img 
                      src={use.image} 
                      alt={use.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-2.5 pt-2.5 border-t border-border/30 text-[10.5px] leading-relaxed flex-1 font-sans">
                  {isFmri ? (
                    <>
                      <div>
                        <span className="text-rose-500 tracking-wider text-[9px] font-black block mb-0.5">Business situation:</span>
                        <p className="text-stone-700 dark:text-stone-300 font-semibold">{use.challenge}</p>
                      </div>
                      <div>
                        <span className="text-primary tracking-wider text-[9px] font-black block mb-0.5">Potential insight:</span>
                        <p className="text-stone-700 dark:text-stone-300 font-semibold">{use.reveal}</p>
                      </div>
                      <div>
                        <span className="text-emerald-600 dark:text-emerald-500 tracking-wider text-[9px] font-black block mb-0.5">Potential adaptation:</span>
                        <p className="text-stone-800 dark:text-stone-200 font-bold">{use.pathway}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <span className="text-rose-500 uppercase tracking-widest text-[8px] font-black block mb-0.5">Marketing Challenge:</span>
                        <p className="text-stone-700 dark:text-stone-300 font-semibold">{use.challenge}</p>
                      </div>
                      <div>
                        <span className="text-primary uppercase tracking-widest text-[8px] font-black block mb-0.5">Potential Reveal:</span>
                        <p className="text-stone-700 dark:text-stone-300 font-semibold">{use.reveal}</p>
                      </div>
                      <div>
                        <span className="text-emerald-600 dark:text-emerald-500 uppercase tracking-widest text-[8px] font-black block mb-0.5">Optimization Pathway:</span>
                        <p className="text-stone-800 dark:text-stone-200 font-bold">{use.pathway}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {!isFmri && (
                <div className="bg-emerald-500/5 border border-emerald-500/10 px-3 py-1.5 rounded-xl flex justify-between items-center text-[10px] font-bold mt-2 shrink-0">
                  <span className="text-muted-foreground">Expected Implication:</span>
                  <span className="text-emerald-600 dark:text-emerald-500 font-black">{use.impact}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION 5: BEFORE VS AFTER VISUAL OPTIMIZATION / DECISION SIMULATION ─── */}
      {isFmri ? (
        <div className="bg-card border border-border rounded-3xl p-5 md:p-8 shadow-sm space-y-6">
          <div className="space-y-1 select-none">
            <span className="text-[9px] font-black uppercase text-purple-600 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
              Decision Simulation Experience
            </span>
            <h2 className="font-display font-black text-xl md:text-2xl text-foreground uppercase tracking-wide mt-2">
              INTERACTIVE DECISION RESPONSE SIMULATION
            </h2>
            <p className="text-xs text-muted-foreground max-w-xl font-semibold leading-relaxed">
              Explore how different financial communication styles may influence emotional comfort, cognitive load, and decision confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* LEFT PANEL: Controls & Interpretation */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              {/* Simulator Controls */}
              <div className="space-y-5 bg-secondary/10 p-5 rounded-2xl border border-border/40">
                
                {/* Toggle 1: Communication Density */}
                <div className="space-y-2">
                  <label className="text-[9.5px] font-black uppercase text-muted-foreground tracking-wider block">
                    Communication Density
                  </label>
                  <div className="grid grid-cols-3 gap-2 bg-background p-1 rounded-xl border border-border/60">
                    {(["simplified", "moderate", "dense"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setDensity(opt)}
                        className={`py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition cursor-pointer ${
                          density === opt
                            ? "bg-purple-600 text-white shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggle 2: Emotional Tone */}
                <div className="space-y-2">
                  <label className="text-[9.5px] font-black uppercase text-muted-foreground tracking-wider block">
                    Emotional Tone
                  </label>
                  <div className="grid grid-cols-3 gap-2 bg-background p-1 rounded-xl border border-border/60">
                    {(["formal", "reassuring", "aspirational"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setTone(opt)}
                        className={`py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition cursor-pointer ${
                          tone === opt
                            ? "bg-purple-600 text-white shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggle 3: Layout Structure */}
                <div className="space-y-2">
                  <label className="text-[9.5px] font-black uppercase text-muted-foreground tracking-wider block">
                    Layout Structure
                  </label>
                  <div className="grid grid-cols-3 gap-2 bg-background p-1 rounded-xl border border-border/60">
                    {(["cluttered", "guided", "progressive"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setLayout(opt)}
                        className={`py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition cursor-pointer ${
                          layout === opt
                            ? "bg-purple-600 text-white shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Dynamic Metrics Panel */}
              <div className="space-y-3.5 bg-secondary/15 p-5 rounded-2xl border border-border/40 select-none">
                <span className="text-[8px] font-black uppercase text-purple-600 tracking-wider block mb-1">
                  Dynamic Response Metrics
                </span>
                
                {/* Comfort metric */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase text-foreground">
                    <span>Estimated emotional comfort</span>
                    <span className="text-purple-600 font-black">{metrics.comfort}%</span>
                  </div>
                  <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-border/40">
                    <div 
                      className="h-full bg-purple-600 transition-all duration-500 rounded-full" 
                      style={{ width: `${metrics.comfort}%` }} 
                    />
                  </div>
                </div>

                {/* Attention stability metric */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase text-foreground">
                    <span>Attention stability</span>
                    <span className="text-purple-600 font-black">{metrics.attention}%</span>
                  </div>
                  <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-border/40">
                    <div 
                      className="h-full bg-purple-600 transition-all duration-500 rounded-full" 
                      style={{ width: `${metrics.attention}%` }} 
                    />
                  </div>
                </div>

                {/* Cognitive load metric */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase text-foreground">
                    <span>Cognitive load</span>
                    <span className="text-purple-600 font-black">{metrics.cognitive}%</span>
                  </div>
                  <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-border/40">
                    <div 
                      className="h-full bg-purple-600 transition-all duration-500 rounded-full" 
                      style={{ width: `${metrics.cognitive}%` }} 
                    />
                  </div>
                </div>

                {/* Trust confidence metric */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase text-foreground">
                    <span>Trust confidence</span>
                    <span className="text-purple-600 font-black">{metrics.trust}%</span>
                  </div>
                  <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-border/40">
                    <div 
                      className="h-full bg-purple-600 transition-all duration-500 rounded-full" 
                      style={{ width: `${metrics.trust}%` }} 
                    />
                  </div>
                </div>

              </div>

              {/* Interactive Insight Box */}
              <div className="p-4 bg-purple-500/5 dark:bg-purple-950/10 border border-purple-500/10 rounded-2xl space-y-1">
                <span className="text-[7.5px] font-black uppercase text-purple-600 tracking-widest block">
                  INTERPRETATION
                </span>
                <p className="text-[11px] leading-relaxed text-stone-700 dark:text-stone-300 font-bold">
                  {getDynamicInsight(density, tone, layout)}
                </p>
              </div>

            </div>

            {/* RIGHT PANEL: Dynamic Preview Experience */}
            <div className="lg:col-span-7 bg-stone-900 dark:bg-stone-950 text-white rounded-3xl border border-stone-850 p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-inner min-h-[460px]">
              {/* Subtle grid pattern background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
              
              {/* Header decoration representing high-end simulator view */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center border-b border-white/5 pb-2 pointer-events-none select-none">
                <span className="text-[7px] font-mono uppercase text-stone-500 tracking-widest">
                  SIMULATION ENGINE v1.2 // ADAPTIVE_INTERFACE_PREVIEW
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-ping" />
                  <span className="text-[7px] font-mono uppercase text-purple-400">ACTIVE RESPONSE</span>
                </div>
              </div>

              {/* Dynamic Mobile Device Mockup */}
              <div className="w-[280px] bg-stone-950 rounded-[36px] p-3 border-4 border-stone-800 shadow-2xl relative z-10 my-4 transform hover:scale-[1.01] transition-transform duration-300 select-none">
                {/* Speaker / Camera Notch */}
                <div className="absolute top-3.5 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-stone-800 rounded-full flex items-center justify-center z-20">
                  <div className="w-8 h-1 bg-stone-900 rounded-full" />
                </div>

                {/* Screen Content */}
                <div className="bg-background text-foreground rounded-[28px] overflow-hidden aspect-[9/18] flex flex-col justify-between p-4 pt-8 text-[11px] font-sans relative min-h-[380px]">
                  
                  {/* App Branding / Top Info */}
                  <div className="flex justify-between items-center border-b border-border/40 pb-2 mb-2 select-none">
                    <span className="font-display font-black text-[9px] uppercase tracking-wide text-primary">
                      Mahindra Finance
                    </span>
                    <span className="text-[8px] text-muted-foreground font-mono bg-secondary/50 px-1.5 py-0.5 rounded">
                      SECURE
                    </span>
                  </div>

                  {/* Mobile Form Layout */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    
                    {/* Headline Container */}
                    <div className="space-y-1 text-center">
                      <h4 className="font-display font-black text-[12px] uppercase text-foreground leading-tight tracking-tight">
                        {getMobileTitle(tone)}
                      </h4>
                      <p className="text-[8px] text-muted-foreground font-medium">
                        Approved & Trusted RBI Registered NBFC Partner
                      </p>
                    </div>

                    {/* Dynamic Body Layout */}
                    <div className="flex-1 my-3 flex flex-col justify-center">
                      {layout === "cluttered" ? (
                        /* CLUTTERED LAYOUT */
                        <div className="space-y-1.5 p-2 bg-stone-100 dark:bg-stone-900 rounded-lg border border-red-200 text-[8px] leading-normal font-medium">
                          <div className="grid grid-cols-2 gap-1 font-mono font-bold text-stone-600 dark:text-stone-400">
                            <div className="border p-0.5 bg-white dark:bg-black">CODE: MF-TRAC-99</div>
                            <div className="border p-0.5 bg-white dark:bg-black">RATE: amort. dynamic</div>
                            <div className="border p-0.5 bg-white dark:bg-black">FEES: 2.75% proc. fee</div>
                            <div className="border p-0.5 bg-white dark:bg-black">TENURE: 36m default</div>
                          </div>
                          <div className="text-[7px] text-muted-foreground bg-stone-200 dark:bg-stone-850 p-1 rounded font-semibold leading-tight max-h-[50px] overflow-y-auto">
                            {getMobileDescription(density)}
                          </div>
                          <div className="text-center font-bold text-red-500 uppercase tracking-widest text-[6.5px]">
                            *Penalty rates applicable for default events as per Annexure 4B
                          </div>
                        </div>
                      ) : layout === "guided" ? (
                        /* GUIDED LAYOUT */
                        <div className="space-y-2.5 p-3 bg-purple-500/5 border border-purple-500/10 rounded-xl">
                          <div className="text-center bg-background rounded-lg p-2 border border-border/80 shadow-sm space-y-0.5">
                            <span className="text-[7.5px] uppercase font-black text-muted-foreground block">Your Monthly Installment</span>
                            <span className="text-[15px] font-black text-purple-600 block">₹ 8,450 / month</span>
                            <span className="text-[7px] text-emerald-600 font-bold block">No Hidden Charges. Fully Transparent.</span>
                          </div>
                          <p className="text-[8.5px] text-stone-700 dark:text-stone-300 font-medium leading-relaxed text-center">
                            {getMobileDescription(density)}
                          </p>
                        </div>
                      ) : (
                        /* PROGRESSIVE LAYOUT */
                        <div className="space-y-2">
                          <div className="flex justify-between items-center px-1 text-[7.5px] font-mono text-muted-foreground">
                            <span>STEP 2 OF 3: PREVIEW DETAILS</span>
                            <span>66% COMPLETE</span>
                          </div>
                          <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-purple-600 rounded-full w-2/3" />
                          </div>
                          <div className="p-2.5 bg-secondary/35 rounded-xl border border-border/40 space-y-2">
                            <div className="flex justify-between items-center text-[9px] font-bold">
                              <span className="text-muted-foreground font-semibold">Tractor Funding</span>
                              <span className="text-foreground">₹ 4,50,000</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-bold border-t border-border/40 pt-1.5">
                              <span className="text-muted-foreground font-semibold">Installment Option</span>
                              <span className="text-purple-600 font-black">₹ 8,450 / mo</span>
                            </div>
                          </div>
                          <p className="text-[8px] text-stone-600 dark:text-stone-400 font-medium leading-normal italic text-center">
                            {getMobileDescription(density)}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Bottom Call to Action */}
                    <div className="space-y-1.5 select-none">
                      <button className="w-full py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white font-black uppercase text-[8.5px] tracking-wider rounded-xl shadow-sm transition-all duration-300 cursor-pointer text-center">
                        {getMobileCta(tone)}
                      </button>
                      <div className="flex items-center justify-center gap-1 text-[7px] text-muted-foreground font-medium">
                        <Shield className="h-2 w-2 text-emerald-500" />
                        <span>100% Secure RBI Authorized Lending Application</span>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

              {/* Footer simulation details */}
              <span className="text-[7.5px] font-mono text-stone-500 mt-2 select-none">
                Estimated BOLD signals modeled across subcortical prefrontal target profiles.
              </span>
            </div>

          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-3xl p-5 md:p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-5 select-none">
              <span className="text-[9px] font-black uppercase text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                Creative Optimization
              </span>
              <div>
                <h3 className="font-display font-black text-xl text-foreground uppercase tracking-wide leading-tight">
                  Subconscious Visual Calibration
                </h3>
                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed mt-2 font-semibold">
                  Text-heavy interest grids overwhelm working memory, causing decision hesitation. Transitioning layout architecture into clean progressive disclosures carries visual focus directly into core CTA pathways.
                </p>
              </div>

              <div className="flex bg-secondary/40 p-0.5 rounded-lg border border-border/40 w-fit">
                <button
                  onClick={() => {
                    setActiveFrictionTab("before");
                    setActiveFrictionHotspot(null);
                  }}
                  className={`h-7 px-3 rounded-md text-[9px] font-black uppercase tracking-wider transition cursor-pointer ${
                    activeFrictionTab === "before"
                      ? "bg-rose-600 text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  ❌ Complex Layout
                </button>
                <button
                  onClick={() => {
                    setActiveFrictionTab("after");
                    setActiveFrictionHotspot(null);
                  }}
                  className={`h-7 px-3 rounded-md text-[9px] font-black uppercase tracking-wider transition cursor-pointer ${
                    activeFrictionTab === "after"
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  ✔ Guided Experience
                </button>
              </div>

              {/* Custom Hotspot detail box */}
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 space-y-2 min-h-[110px] flex flex-col justify-between">
                <div>
                  <span className="text-[7.5px] font-black uppercase text-primary tracking-widest block mb-0.5">
                    Strategic Communication Insight
                  </span>
                  
                  {activeFrictionHotspot !== null ? (
                    <div className="space-y-0.5 font-sans">
                      <span className="text-xs font-black text-foreground uppercase block">
                        {neuroData.hotspots.find(h => h.id === activeFrictionHotspot)?.label}
                      </span>
                      <p className="text-[10.5px] leading-normal text-muted-foreground font-semibold">
                        {activeFrictionTab === "before" 
                          ? neuroData.hotspots.find(h => h.id === activeFrictionHotspot)?.beforeTip 
                          : neuroData.hotspots.find(h => h.id === activeFrictionHotspot)?.afterTip
                        }
                      </p>
                    </div>
                  ) : (
                    <p className="text-[10.5px] text-muted-foreground leading-normal font-semibold">
                      Click the glowing numeric hotspots on the layout visual to see how customer stress shifts.
                    </p>
                  )}
                </div>

                {activeFrictionHotspot !== null && (
                  <button 
                    onClick={() => setActiveFrictionHotspot(null)}
                    className="text-[8px] font-black uppercase tracking-wider text-primary text-left hover:underline w-fit mt-1 cursor-pointer"
                  >
                    ← Reset
                  </button>
                )}
              </div>
            </div>

            {/* Interactive Heatmap creative preview (Full color!) */}
            <div className="lg:col-span-7 relative rounded-xl overflow-hidden shadow-sm border border-border aspect-[4/3] flex items-center justify-center bg-white">
              <img 
                src="/images/eeg_before_after_creatives.png" 
                alt="Before vs After split dynamic financial creative mapping" 
                className="w-full h-full object-cover block"
              />
              
              {/* Split overlay effect based on tab */}
              {activeFrictionTab === "before" ? (
                <div className="absolute inset-0 bg-rose-950/5 flex flex-col justify-between p-4 pointer-events-none">
                  <span className="self-end bg-rose-600/90 text-white text-[8px] font-black px-2 py-0.5 rounded shadow uppercase tracking-wider">
                    ❌ Text Overload Friction Active
                  </span>
                </div>
              ) : (
                <div className="absolute inset-0 bg-emerald-950/5 flex flex-col justify-between p-4 pointer-events-none">
                  <span className="self-end bg-emerald-500/90 text-white text-[8px] font-black px-2 py-0.5 rounded shadow uppercase tracking-wider">
                    ✔ Calibrated Flow Active
                  </span>
                </div>
              )}

              {/* Glowing Hotspots */}
              {neuroData.hotspots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setActiveFrictionHotspot(spot.id)}
                  style={{ top: spot.y, left: spot.x }}
                  className={`absolute h-6.5 w-6.5 rounded-full flex items-center justify-center text-[9px] font-black text-white cursor-pointer shadow border transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 ${
                    activeFrictionHotspot === spot.id 
                      ? "bg-primary border-white scale-115 z-30 ring-4 ring-primary/30" 
                      : "bg-primary/95 border-primary/30 hover:scale-110 hover:bg-primary z-20 animate-pulse"
                  }`}
                >
                  {spot.id}
                </button>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* ─── SECTION 6: STRATEGIC CONSIDERATIONS (fMRI specific roadmaps) ─── */}
      <div className="space-y-5 select-none">
        <div className="space-y-1">
          <span className="text-[9px] font-black uppercase text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
            {isFmri ? "Strategic Considerations" : "Enterprise Feasibility Roadmap"}
          </span>
          <h2 className="font-display font-black text-xl md:text-2xl text-foreground uppercase tracking-wide mt-2">
            {isFmri ? "Strategic Considerations" : `${tool.name.split(" (")[0]} Deployment Feasibility for Mahindra Finance`}
          </h2>
          <p className="text-xs text-muted-foreground max-w-xl font-semibold leading-relaxed">
            {isFmri 
              ? "A corporate reference matrix detailing research settings, costs, scalability, and compliance boundaries."
              : "Practical guidelines detailing rural feasibility, branching complexity, scaling costs, and operational limits."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          
          {isFmri ? (
            <>
              <div className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between shadow-sm hover:border-primary/20 transition duration-300">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Sliders className="h-4.5 w-4.5" />
                    <h4 className="font-display font-black text-xs uppercase tracking-wide text-foreground">Research environment</h4>
                  </div>
                  <p className="text-[11px] text-stone-700 dark:text-stone-300 leading-relaxed font-semibold">
                    FMRI research typically requires highly controlled environments with limited movement, calibrated testing flows, and carefully structured participant sessions.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between shadow-sm hover:border-primary/20 transition duration-300">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Sliders className="h-4.5 w-4.5" />
                    <h4 className="font-display font-black text-xs uppercase tracking-wide text-foreground">Practical value</h4>
                  </div>
                  <p className="text-[11px] text-stone-700 dark:text-stone-300 leading-relaxed font-semibold">
                    Most useful for: emotional-response mapping, trust analysis, campaign sequencing studies, onboarding psychology research, long-form storytelling evaluation.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between shadow-sm hover:border-primary/20 transition duration-300">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Sliders className="h-4.5 w-4.5" />
                    <h4 className="font-display font-black text-xs uppercase tracking-wide text-foreground">Best fit research questions</h4>
                  </div>
                  <p className="text-[11px] text-stone-700 dark:text-stone-300 leading-relaxed font-semibold font-sans">
                    FMRI may help explore: which campaign moments emotionally resonate, where customers mentally disengage, how trust develops during financial journeys, which communication structures reduce emotional fatigue.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between shadow-sm hover:border-primary/20 transition duration-300">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Sliders className="h-4.5 w-4.5" />
                    <h4 className="font-display font-black text-xs uppercase tracking-wide text-foreground">Operational limitations</h4>
                  </div>
                  <p className="text-[11px] text-stone-700 dark:text-stone-300 leading-relaxed font-semibold">
                    FMRI studies are slower, infrastructure-heavy, and more selective than lightweight behavioral testing tools such as EEG or eye-tracking systems.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between shadow-sm hover:border-primary/20 transition duration-300">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Sliders className="h-4.5 w-4.5" />
                    <h4 className="font-display font-black text-xs uppercase tracking-wide text-foreground">Cost & deployment reality</h4>
                  </div>
                  <p className="text-[11px] text-stone-700 dark:text-stone-300 leading-relaxed font-semibold font-sans">
                    Due to specialized infrastructure requirements, FMRI is typically used for strategic research initiatives rather than continuous campaign monitoring.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between shadow-sm hover:border-primary/20 transition duration-300">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Sliders className="h-4.5 w-4.5" />
                    <h4 className="font-display font-black text-xs uppercase tracking-wide text-foreground">Ethical & privacy requirements</h4>
                  </div>
                  <p className="text-[11px] text-stone-700 dark:text-stone-300 leading-relaxed font-semibold font-sans">
                    All behavioral-response studies should maintain: informed participant consent, anonymized interpretation, secure data handling, responsible reporting practices.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between shadow-sm hover:border-primary/20 transition duration-300">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Sliders className="h-4.5 w-4.5" />
                    <h4 className="font-display font-black text-xs uppercase tracking-wide text-foreground">Best Environments</h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed font-semibold font-sans">
                    Quiet in-branch private cabins or low-noise advisory sandbox rooms. Shielding walk-ins from busy branch foot traffic secures high-quality testing metrics.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between shadow-sm hover:border-primary/20 transition duration-300">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Sliders className="h-4.5 w-4.5" />
                    <h4 className="font-display font-black text-xs uppercase tracking-wide text-foreground">Rural Feasibility</h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed font-semibold">
                    Highly feasible using lightweight wireless headbands. Field operators can calibrate comfortable dry sensors in under two minutes, with no clinical gels or skin prep needed.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between shadow-sm hover:border-primary/20 transition duration-300">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Sliders className="h-4.5 w-4.5" />
                    <h4 className="font-display font-black text-xs uppercase tracking-wide text-foreground">Scalability & Costs</h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed font-semibold">
                    Excellent cost-efficiency when utilized as a strategic campaign pre-launch validator rather than an ongoing daily transaction monitor.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between shadow-sm hover:border-primary/20 transition duration-300">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Sliders className="h-4.5 w-4.5" />
                    <h4 className="font-display font-black text-xs uppercase tracking-wide text-foreground">Customer Comfort</h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed font-semibold font-sans">
                    Dry-sensor wireless bands feel comfortable and light, keeping the borrower interaction completely non-intrusive and simple.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between shadow-sm hover:border-primary/20 transition duration-300">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Sliders className="h-4.5 w-4.5" />
                    <h4 className="font-display font-black text-xs uppercase tracking-wide text-foreground">Operational Limits</h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed font-semibold font-sans">
                    Captures pre-attentive focus and visual stress moments accurately, but does not predict long-term creditworthiness or credit risks.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between shadow-sm hover:border-primary/20 transition duration-300">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Sliders className="h-4.5 w-4.5" />
                    <h4 className="font-display font-black text-xs uppercase tracking-wide text-foreground">Ethical Integrity</h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed font-semibold font-sans">
                    Requires written vernacular consent, transparent verbal briefings, absolute data encryption, and complete decoupling from borrower credit profiles.
                  </p>
                </div>
              </div>
            </>
          )}

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
      <EegStorytellingView tool={tool} activeTheme={activeTheme} />
    </AppLayout>
  );
}
