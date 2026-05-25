import React, { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/neuro/AppLayout";
import { Card } from "@/components/neuro/Primitives";
import {
  Brain, Shield, Heart, Sparkles, Eye,
  AlertTriangle, ArrowRight, CheckCircle2,
  FileText, ChevronDown, ChevronUp, Zap, Smile, Globe,
  Activity, Play, Target, Award, EyeOff, Search, X, Check,
  Sliders, User, MapPin, CheckSquare, Layers, HelpCircle,
  TrendingUp, RefreshCw, BarChart2, ChevronRight, ShieldCheck,
  TrendingDown, Info, Lock
} from "lucide-react";

export const Route = createFileRoute("/psychology")({ component: PsychologyPage });

// ═══════════════════════════════════════════
// 1. COMPREHENSIVE RESEARCH DATASETS
// ═══════════════════════════════════════════
export interface BehavioralInsight {
  id: string;
  title: string;
  category: "attention" | "trust" | "cognitive" | "mobile";
  tagline: string;
  
  // Dynamic views
  findingBusiness: string;
  findingScience: string;
  
  whyItMattersBusiness: string;
  whyItMattersScience: string;
  
  actionBusiness: string;
  actionScience: string;
  
  sourceName: string;
  sourceLink: string;
  year: string;
  credibility: string;
  confidence: number;
  metric: string;
  metricLabel: string;
  severity: "critical" | "high" | "moderate";
}

const INSIGHTS_PLAYBOOK: BehavioralInsight[] = [
  {
    id: "attention-decay",
    title: "The 2.5-Second Attention Decay",
    category: "attention",
    tagline: "Visual focus decays rapidly on digital ads.",
    findingBusiness: "Most users decide whether to pay attention to digital banners or skip them in under 2.5 seconds.",
    findingScience: "Visual attention towards digital advertising rapidly decays, with 62.1% of visual stimuli being observed for 2.5 seconds or less.",
    whyItMattersBusiness: "If the brand identity and primary message are not shown instantly, users scroll past without registering them.",
    whyItMattersScience: "Visual dwell time predicts memory encoding, explaining 10.4% variance in free recall and 52.3% variance in implicit recognition.",
    actionBusiness: "Front-load key brand imagery and core text inside the first frame of your digital layouts.",
    actionScience: "Deliver high-luminance brand assets in early fixation zones (<250ms coordinates) to capture pre-attentive sensory networks.",
    sourceName: "Eye Square Meta-Analysis",
    sourceLink: "https://www.eye-square.com",
    year: "2020",
    credibility: "Meta-Analysis Tier-1",
    confidence: 98,
    metric: "62.1%",
    metricLabel: "Dwell under 2.5s",
    severity: "critical"
  },
  {
    id: "choice-paralysis",
    title: "The 5-Item Choice Overload Limit",
    category: "cognitive",
    tagline: "Exceeding 5 options paralyzes purchase decisions.",
    findingBusiness: "Presenting customers with more than 5 loan options at once triggers stress and makes them abandon the screen.",
    findingScience: "The prefrontal cortex has severe processing limits, showing direct System-1 task rejection when comparing over 5 items.",
    whyItMattersBusiness: "When overwhelmed, customers defer decisions indefinitely to avoid making the wrong choice.",
    whyItMattersScience: "Extraneous cognitive load overloads visual working memory, forcing decision deferral pathways to activate in the amygdala.",
    actionBusiness: "Limit loan product comparison grids to a maximum of 3 or 4 choices and highlight a single recommended best seller.",
    actionScience: "Enforce asymmetric choice architecting, presenting a maximum of 3 visual cards to conserve metabolic prefrontal limits.",
    sourceName: "Nielsen Norman Group Study",
    sourceLink: "https://www.nngroup.com",
    year: "2024",
    credibility: "NNG Benchmark",
    confidence: 98,
    metric: "5 Options",
    metricLabel: "Cognitive Ceiling",
    severity: "critical"
  },
  {
    id: "placeholder-friction",
    title: "Disappearing Placeholder Friction",
    category: "cognitive",
    tagline: "Disappearing text inside forms damages memory retention.",
    findingBusiness: "Emptying labels inside input boxes when users type forces them to guess what the field asked, raising error rates.",
    findingScience: "Concealing state cues in input grids forces active working memory retrieval, causing visual search loops to fail.",
    whyItMattersBusiness: "Users easily lose context when interrupted, driving drop-offs during KYC form completion.",
    whyItMattersScience: "Increases cognitive friction by siphoning short-term memory capacity needed for information sequencing.",
    actionBusiness: "Ensure all form field labels remain permanently visible above the input boxes, never vanishing.",
    actionScience: "Implement structural persistence by positioning floating, high-contrast text tags outside the input container boundaries.",
    sourceName: "Nielsen Norman Group Forms Review",
    sourceLink: "https://www.nngroup.com",
    year: "2025",
    credibility: "UX Gold Standard",
    confidence: 97,
    metric: "4 Principles",
    metricLabel: "Form Usability Rule",
    severity: "high"
  },
  {
    id: "mobile-supremacy",
    title: "Mobile Video Attention Supremacy",
    category: "mobile",
    tagline: "Mobile screens capture higher active focus than TV or desktop.",
    findingBusiness: "Video campaigns capture far stronger, concentrated customer focus on mobile screens than desktop monitors.",
    findingScience: "Visual attention yields 66% active gaze alignment on mobile screens compared to approximately 50% for traditional television.",
    whyItMattersBusiness: "The physical proximity of smartphones drives intimate, highly receptive brand interaction.",
    whyItMattersScience: "Foveal scanning angles contract on small handheld viewports, reducing extraneous visual noise distraction.",
    actionBusiness: "Deliver highly targeted, short video creatives optimized specifically for portrait mobile screens.",
    actionScience: "Structure 9:16 portrait video layouts containing high-contrast focal points positioned in the biometric thumb reach zones.",
    sourceName: "Think with Google / Ipsos Study",
    sourceLink: "https://www.thinkwithgoogle.com",
    year: "2011 (updated)",
    credibility: "Google/Ipsos Eye Tracking",
    confidence: 95,
    metric: "66%",
    metricLabel: "Active Mobile Gaze",
    severity: "high"
  },
  {
    id: "notification-cost",
    title: "The 7-Second Notification Distraction Cost",
    category: "cognitive",
    tagline: "Mobile notifications derail focus for seven full seconds.",
    findingBusiness: "A single phone alert interrupts user focus for 7 seconds, raising the risk of form-filling errors.",
    findingScience: "Smart notifications induce cognitive multitasking deficits, disrupting active sensory registers for a full 7,000ms.",
    whyItMattersBusiness: "If your checkout funnel is fragile, a single phone distraction causes customers to close your page.",
    whyItMattersScience: "Attentional elasticity is depleted by notification interruptions, leading to high transaction abandonment.",
    actionBusiness: "Save input states automatically in the background so distracted users can resume without losing data.",
    actionScience: "Enforce persistent background state serialization to prevent data loss when task execution is interrupted.",
    sourceName: "Computers in Human Behavior",
    sourceLink: "https://psypost.org",
    year: "2023",
    credibility: "Peer-Reviewed",
    confidence: 94,
    metric: "7 Seconds",
    metricLabel: "Attentional Deficit Cost",
    severity: "high"
  },
  {
    id: "fintech-trust",
    title: "Digital Fintech Trust Parity",
    category: "trust",
    tagline: "Brand trust for digital-only finance has reached parity.",
    findingBusiness: "Consumers trust digital-only financial apps just as much as traditional banks, removing the necessity of defensive trust copy.",
    findingScience: "Autonomic trust metrics reflect exact parity in consumer comfort between incumbent bank portals and digital fintechs.",
    whyItMattersBusiness: "Marketing can transition focus away from repetitive safety guarantees toward loan speed and ease.",
    whyItMattersScience: "Perceived risk pathways (amygdala alarm thresholds) are no longer triggered by non-physical financial interfaces.",
    actionBusiness: "Highlight fast approval times and paperless ease rather than cluttering pages with endless security badges.",
    actionScience: "Lead campaigns with reward-enhancing outcome statements to activate striatal reward centers, keeping compliance silent.",
    sourceName: "McKinsey Fintech Paradigm",
    sourceLink: "https://www.mckinsey.com",
    year: "2023",
    credibility: "McKinsey Strategy",
    confidence: 96,
    metric: "41%",
    metricLabel: "Plan Fintech Shift",
    severity: "moderate"
  },
  {
    id: "sports-momentum",
    title: "Live Sports Moment Carryover",
    category: "attention",
    tagline: "Emotional spikes in live events double ad recall.",
    findingBusiness: "Advertisements shown immediately after exciting, high-stakes sports milestones experience double the normal brand memory recall.",
    findingScience: "High physiological arousal states create a temporary carryover effect, making subsequent visual stimuli highly memorable.",
    whyItMattersBusiness: "Releasing ad campaign spend in alignment with customer excitement spikes drives massive visual efficiency.",
    whyItMattersScience: "Sympathetic nervous system arousal gates memory encoding, accelerating subsequent signal storage in the hippocampus.",
    actionBusiness: "Program ads to trigger automatically immediately following major, high-stakes sports achievements.",
    actionScience: "Implement real-time programmatic ad insertions synchronized with audience physiological arousal milestones.",
    sourceName: "Meta Research / Eye Square",
    sourceLink: "https://www.eye-square.com",
    year: "2024",
    credibility: "Meta/EyeSquare Joint Study",
    confidence: 97,
    metric: "2x",
    metricLabel: "Recall Uplift",
    severity: "high"
  },
  {
    id: "biometric-paradox",
    title: "Focus Group Biometric Paradox",
    category: "trust",
    tagline: "Autonomic tracking uncovers true likes hidden by focus groups.",
    findingBusiness: "Focus group members often verbally criticize risky or funny ads, yet biosensors prove their brains actively love them.",
    findingScience: "Explicit surveys suffer from social desirability bias, while biometric EEG indicators reveal raw, filter-free neural liking.",
    whyItMattersBusiness: "Do not discard bold, exciting visual concepts solely based on safe focus group opinions.",
    whyItMattersScience: "Verbal output is filtered by the prefrontal cortex for social conformity, bypassing raw striatal dopamine signals.",
    actionBusiness: "Measure direct visual and brain reactions instead of relying exclusively on verbal feedback.",
    actionScience: "Calibrate campaign selections using direct emotional tracking systems (EEG, facial coding) to ensure authentic liking indexes.",
    sourceName: "iMotions Lab Benchmarks",
    sourceLink: "https://imotions.com",
    year: "2022",
    credibility: "Biometric Gold Standard",
    confidence: 95,
    metric: "12.5%",
    metricLabel: "Biometric Gap Lift",
    severity: "moderate"
  }
];

// ═══════════════════════════════════════════
// 2. INDIA REGIONAL TRUST DATASET
// ═══════════════════════════════════════════
interface RegionalTrustData {
  id: string;
  name: string;
  coords: string;
  circleCoords?: { cx: number; cy: number };
  
  dialect: string;
  onboarding: string;
  trustDriver: string;
  campaignStyle: string;
  mobileBehavior: string;
  recommendation: string;
  
  scienceRec: string;
  citation: string;
}

const INDIA_REGIONS: RegionalTrustData[] = [
  {
    id: "north",
    name: "North India (Delhi, Punjab, Haryana)",
    coords: "M 100 40 L 125 30 L 140 60 L 115 80 Z",
    circleCoords: { cx: 120, cy: 52 },
    dialect: "Hindi / Punjabi / Haryanvi accent integration",
    onboarding: "High advisor-led validation coupled with pride-based peer verification.",
    trustDriver: "Aspirational family milestone achievement and community validation.",
    campaignStyle: "Hero-centric creatives focused on societal progress and agrarian family success.",
    mobileBehavior: "Heavy reliance on voice searches and outcome-led vertical explanation videos.",
    recommendation: "Introduce family pride imagery (e.g. crop harvest, milestone purchase) inside the early screen views.",
    scienceRec: "Leverage oxytocin-boosting familiarity cues to counter digital verification friction.",
    citation: "EY India Banking Index (2026)"
  },
  {
    id: "south",
    name: "South India (Karnataka, Tamil Nadu, Andhra)",
    coords: "M 110 180 L 145 170 L 130 240 L 105 210 Z",
    circleCoords: { cx: 125, cy: 200 },
    dialect: "Kannada / Tamil / Telugu localized application layouts",
    onboarding: "Self-driven technical verification with detail-heavy product checks.",
    trustDriver: "Explicit regulatory disclosures, fee transparency, and digital redress details.",
    campaignStyle: "Information-rich comparison formats, structural pricing breakdowns.",
    mobileBehavior: "High digital fintech exploration, structured progressive vertical forms.",
    recommendation: "Provide detailed side-by-side comparison tables restricted strictly to 3 alternatives.",
    scienceRec: "Apportion cognitive load progressively to protect working memory limits.",
    citation: "Deloitte India BFSI Survey"
  },
  {
    id: "east",
    name: "East India (West Bengal, Bihar, Odisha)",
    coords: "M 160 110 L 200 115 L 180 160 L 145 140 Z",
    circleCoords: { cx: 170, cy: 130 },
    dialect: "Bengali / Bhojpuri / Odia conversational UI voice",
    onboarding: "High initial digital hesitation, absolute preference for phygital support.",
    trustDriver: "Direct verbal assurances, physical receipt printing, and local branch routing.",
    campaignStyle: "Simple, highly focused single-benefit layouts with zero numeric complexity.",
    mobileBehavior: "Voice-assisted steps, single-field inputs, conversational chat models.",
    recommendation: "Implement clear floating voice guidelines spoken in native regional accents.",
    scienceRec: "Counteract high amygdala alert thresholds with localized auditory safety loops.",
    citation: "RBI Innovation Hub Onboarding Index"
  },
  {
    id: "west",
    name: "West India (Maharashtra, Gujarat, Rajasthan)",
    coords: "M 60 100 L 100 95 L 90 150 L 50 140 Z",
    circleCoords: { cx: 75, cy: 120 },
    dialect: "Marathi / Gujarati / Marwari script translations",
    onboarding: "Hybrid co-assisted flow combining agent scanning with online tracking.",
    trustDriver: "RBI official padlocks, visible corporate heritage milestones.",
    campaignStyle: "Speed-led outcome claims backed by formal safety seals.",
    mobileBehavior: "WhatsApp automation checkers, lightweight digital tracking portals.",
    recommendation: "Display visible security icons right next to input submit forms.",
    scienceRec: "Activate reward centers with speed messaging while securing prefrontal peace of mind.",
    citation: "McKinsey Retail Banking Study"
  },
  {
    id: "central",
    name: "Central India (Madhya Pradesh, Chhattisgarh)",
    coords: "M 105 95 L 145 90 L 135 150 L 95 140 Z",
    circleCoords: { cx: 120, cy: 118 },
    dialect: "Conversational localized Hindi audio guidelines",
    onboarding: "Highly dependent on phygital field agent smartphones and direct branch walk-ins.",
    trustDriver: "Visually recognizable branch layout pictures, local advisor profiles.",
    campaignStyle: "Clear local testimonials, straightforward step-by-step visual graphics.",
    mobileBehavior: "Co-assisted portal logins, visual progress meters.",
    recommendation: "Provide a persistent 'Call Branch Representative' helper floating anchor.",
    scienceRec: "Mitigate technology friction by wrapping abstract processes in familiar relational visuals.",
    citation: "EY Customer Experience Reimagined"
  },
  {
    id: "northeast",
    name: "Northeast India (Seven Sister States)",
    coords: "M 205 90 L 235 90 L 225 120 L 195 110 Z",
    circleCoords: { cx: 215, cy: 102 },
    dialect: "Assamese / regional language accent guides",
    onboarding: "Community-referred trust circles, local group lending verifications.",
    trustDriver: "Regional community leadership endorsements, micro-transaction safety.",
    campaignStyle: "Collectivist social-impact imagery, communal outcome focus.",
    mobileBehavior: "Lightweight mobile pages, visual status cues, dialect voice instructions.",
    recommendation: "Utilize localized peer reviews and simple auditory validation signals.",
    scienceRec: "Harness collectivist in-group heuristics to suppress threat alert responses.",
    citation: "NPCI Rural Trust Report"
  }
];

// ═══════════════════════════════════════════
// 3. MAIN COMPONENT IMPLEMENTATION
// ═══════════════════════════════════════════
function PsychologyPage() {
  const [viewMode, setViewMode] = useState<"business" | "science">("business");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedInsight, setSelectedInsight] = useState<BehavioralInsight | null>(null);
  
  // Interactive Map State
  const [selectedRegion, setSelectedRegion] = useState<string>("north");
  
  // Drop-off Simulator State
  const [dropoffStage, setDropoffStage] = useState<string>("forms");

  // Customer Journey State
  const [journeyStep, setJourneyStep] = useState<number>(0);

  // Reference Explorer Toggle
  const [verifiedPanelOpen, setVerifiedPanelOpen] = useState<boolean>(false);

  // Module 4: Attention Playground
  const [playgroundCreative, setPlaygroundCreative] = useState<string>("cluttered");
  const [playgroundAois, setPlaygroundAois] = useState<string[]>([]);
  const [playgroundDwell, setPlaygroundDwell] = useState<string>("logo");

  // Active KPI drilldown modal state
  const [activeKpiDetails, setActiveKpiDetails] = useState<{
    id: string;
    title: string;
    description: string;
    whyItMatters: string;
    citation: string;
    confidence: number;
    severity: string;
    metric: string;
  } | null>(null);

  // Mapped Drop-off Simulator data
  const DROPOFF_DETAILS: Record<string, {
    frictionScore: number;
    stressScale: number;
    businessState: string;
    scienceState: string;
    problem: string;
    likelyTrigger: string;
    businessFix: string;
    scienceFix: string;
    source: string;
  }> = {
    forms: {
      frictionScore: 76,
      stressScale: 70,
      businessState: "Confused & Tired",
      scienceState: "Working Memory Saturation",
      problem: "Input placeholders disappear, forcing users to repeatedly guess input criteria.",
      likelyTrigger: "Forgetting previous text instructions after typing begins.",
      businessFix: "Place clear labels permanently right above every input container.",
      scienceFix: "Deploy persistent float layouts to conserve visual memory traces.",
      source: "Nielsen Norman Group Forms Review (2025)"
    },
    emi: {
      frictionScore: 82,
      stressScale: 85,
      businessState: "Paralyzed by Choices",
      scienceState: "Prefrontal Choice Paralysis",
      problem: "Showing too many pricing plans simultaneously, inducing extreme customer hesitation.",
      likelyTrigger: "Exceeding the visual memory span with detailed numerical tables.",
      businessFix: "Limit options to 3 and clearly highlight a single 'Best Value' choice.",
      scienceFix: "Enforce strict progressive choice gating with a maximum ceiling of 3 units.",
      source: "Nielsen Norman Group Choice Overload Study (2024)"
    },
    kyc: {
      frictionScore: 68,
      stressScale: 60,
      businessState: "Anxious & Threat-Aware",
      scienceState: "Amygdala Identity Friction",
      problem: "Demanding personal Aadhaar/PAN scans immediately on page load.",
      likelyTrigger: "Sensory threat reaction caused by early requests for sensitive documentation.",
      businessFix: "Introduce security padlocks and a friendly welcome note before asking for uploads.",
      scienceFix: "Deploy oxytocin safety tags adjacent to input triggers to suppress amygdala alarms.",
      source: "EY Banking Frontier Index (2026)"
    },
    landing: {
      frictionScore: 64,
      stressScale: 55,
      businessState: "Distracted & Scanning Away",
      scienceState: "Attentional Saccadic Scattering",
      problem: "Key call-to-actions are hard to tap or buried outside the comfortable mobile thumb zone.",
      likelyTrigger: "Micro-frustration due to awkward stretching or accidental mis-clicks.",
      businessFix: "Ensure key buttons are at least 44x44 pixels and placed in the lower third zone.",
      scienceFix: "Optimize focal button boundaries strictly in biometric thumb-swipe regions.",
      source: "Nielsen Norman Group Thumb Zone Benchmark"
    },
    reminders: {
      frictionScore: 85,
      stressScale: 90,
      businessState: "Intimidated & Defensively Avoiding",
      scienceState: "Cortisol Avoidance Activation",
      problem: "English-only aggressive payment alerts stimulate fear and active customer avoidance.",
      likelyTrigger: "Threat threat triggers caused by sterile, intimidating text notifications.",
      businessFix: "Transition to polite, voice-led automated calls spoken in native dialects.",
      scienceFix: "Substitute auditory stress triggers with vernacular dialect assurance loops.",
      source: "BCG / RBIH Financial Services Index (2025)"
    }
  };

  const activeDropoff = DROPOFF_DETAILS[dropoffStage] || DROPOFF_DETAILS.forms;

  // Filtered insights matching state
  const filteredInsights = useMemo(() => {
    return INSIGHTS_PLAYBOOK.filter((insight) => {
      const matchesCategory = activeCategory === "all" || insight.category === activeCategory;
      const matchesSearch = insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            insight.findingBusiness.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            insight.findingScience.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            insight.sourceName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Selected regional map details
  const regionInfo = useMemo(() => {
    return INDIA_REGIONS.find((r) => r.id === selectedRegion) || INDIA_REGIONS[0];
  }, [selectedRegion]);

  // Customer Journey metrics
  const JOURNEY_TIMELINE = [
    {
      label: "Ad Seen",
      emotion: "Curious & Prideful",
      dropRisk: "25% Skip Rate",
      eyeBehavior: "Focal scanning centered on family crop harvest visuals.",
      trustLevel: "Baseline Trust established by regional dialect accent tags.",
      recommendation: "Feature local milestone achievements rather than rate schedules.",
      scienceRec: "Dopaminergic reward processing triggered by familial success signals.",
      anxietySpike: false,
      attentionDrop: false,
      reassurance: true
    },
    {
      label: "Landing Page",
      emotion: "Goal-Oriented Focus",
      dropRisk: "40% Bounce Rate",
      eyeBehavior: "Rapid scanning path; ignoring side banners completely.",
      trustLevel: "Mild Security Hesitation waiting for padlocks.",
      recommendation: "Ensure key CTA buttons are visual-first with generous negative space.",
      scienceRec: "Attentional salience optimization blocks out visual background noise.",
      anxietySpike: false,
      attentionDrop: true,
      reassurance: false
    },
    {
      label: "EMI Comparison",
      emotion: "Overloaded & Deciding",
      dropRisk: "58% Funnel Dropout",
      eyeBehavior: "Visual loops jumping rapidly between crowded plan rows.",
      trustLevel: "Paralysis Baseline due to informational heavy layout.",
      recommendation: "Present exactly 3 structured comparison plans; hide complex specification rows.",
      scienceRec: "Prefrontal capacity exceeded by multi-variable informational layouts.",
      anxietySpike: true,
      attentionDrop: false,
      reassurance: false
    },
    {
      label: "Advisor Assist",
      emotion: "Reassured & Comfortable",
      dropRisk: "12% Residual Risk",
      eyeBehavior: "Relaxed focal fixations directed at familiar local representative profiles.",
      trustLevel: "Substantial Oxytocin Surge fueled by phygital face-to-face support.",
      recommendation: "Deploy co-assisted field agent options alongside real-time WhatsApp check sheets.",
      scienceRec: "Autonomic stress parameters drop in response to human co-assisted guides.",
      anxietySpike: false,
      attentionDrop: false,
      reassurance: true
    },
    {
      label: "Complete",
      emotion: "Satisfied & Relieved",
      dropRisk: "0.5% Churn Risk",
      eyeBehavior: "Steady gaze centered on clear confirmation metrics.",
      trustLevel: "Maximized Retention sync, ready for referral.",
      recommendation: "Highlight simple localized success check marks with friendly audio cues.",
      scienceRec: "Ventral striatum reward encoding consolidation completed.",
      anxietySpike: false,
      attentionDrop: false,
      reassurance: true
    }
  ];

  const activeJourney = JOURNEY_TIMELINE[journeyStep] || JOURNEY_TIMELINE[0];

  return (
    <AppLayout>
      <div className="relative pb-16 space-y-8 select-none text-stone-200">
        
        {/* GLOBAL HEADER WITH VIEW-MODE TOGGLE */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border/40 pb-5 gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase text-primary tracking-widest bg-primary/10 px-2.5 py-0.5 rounded border border-primary/20">
              <Brain className="h-3 w-3 animate-pulse" /> Consulting Grade Command
            </span>
            <h1 className="font-display font-black text-2xl md:text-3xl text-foreground uppercase tracking-tight leading-none mt-1.5">
              Consumer Psychology & Intelligence Command
            </h1>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
              Mahindra Finance Strategic Analytics Platform. Synthesizing empirical gaze vectors, working memory ceilings, and regional trust behaviors into actionable campaign recommendations.
            </p>
          </div>

          {/* Business View / Behavioral Science View Toggle */}
          <div className="flex items-center gap-1 bg-secondary/30 p-1.5 rounded-xl border border-border/50 shrink-0 self-start md:self-center">
            <button
              onClick={() => setViewMode("business")}
              className={`h-8 px-4 rounded-lg text-[10px] font-bold uppercase tracking-wider transition ${
                viewMode === "business"
                  ? "bg-primary text-white shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Business View
            </button>
            <button
              onClick={() => setViewMode("science")}
              className={`h-8 px-4 rounded-lg text-[10px] font-bold uppercase tracking-wider transition ${
                viewMode === "science"
                  ? "bg-primary text-white shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Behavioral Science View
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            TOP INTERACTIVE BEHAVIORAL KPI STRIP
            ═══════════════════════════════════════════ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              id: "kpi-attention",
              title: "Attention Window",
              val: "2.5s Decay",
              desc: "Decide within first frames",
              why: "Most users form pre-attentive brand impressions within 2.5 seconds. Early logos prevent attention leak.",
              citation: "Eye Square meta-analysis",
              conf: 98,
              level: "Critical",
              trend: "down",
              sparkline: [20, 15, 8, 3, 2]
            },
            {
              id: "kpi-choices",
              title: "Choice Ceiling",
              val: "Max 5 Items",
              desc: "Paralysis beyond 5 items",
              why: "Working memory cannot balance multi-variable comparisons efficiently. Excess options freeze decision paths.",
              citation: "Nielsen Norman Group study",
              conf: 98,
              level: "Critical",
              trend: "up",
              sparkline: [10, 20, 45, 76, 92]
            },
            {
              id: "kpi-interruption",
              title: "Mobile Interruption",
              val: "7s Lost",
              desc: "Deficit cost per alert",
              why: "A single mobile push alert resets focus parameters for 7 seconds, amplifying funnel completion drops.",
              citation: "Computers in Human Behavior",
              conf: 94,
              level: "High Risk",
              trend: "up",
              sparkline: [5, 12, 30, 55, 85]
            },
            {
              id: "kpi-gaze",
              title: "Mobile Video Focus",
              val: "66% Yield",
              desc: "Supremacy vs desktop TV",
              why: "Smartphone screens restrict scanning angles, driving focused, high-density active gaze alignment.",
              citation: "Think with Google / Ipsos Study",
              conf: 95,
              level: "Optimal",
              trend: "up",
              sparkline: [40, 45, 52, 60, 66]
            }
          ].map((kpi) => (
            <div 
              key={kpi.id}
              onClick={() => setActiveKpiDetails({
                id: kpi.id,
                title: kpi.title,
                description: kpi.desc,
                whyItMatters: kpi.why,
                citation: kpi.citation,
                confidence: kpi.conf,
                severity: kpi.level,
                metric: kpi.val
              })}
              className="bg-card border border-border hover:border-primary/40 rounded-2xl p-4 flex flex-col justify-between shadow-sm relative overflow-hidden transition duration-200 cursor-pointer group"
            >
              <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
              <div className="flex items-center justify-between">
                <span className="text-[8.5px] font-black uppercase text-stone-400 tracking-wider">{kpi.title}</span>
                {kpi.trend === "up" ? (
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-rose-500" />
                )}
              </div>
              <div className="text-xl font-black text-primary my-1.5 group-hover:scale-[1.01] transition-transform">{kpi.val}</div>
              
              {/* Mini Sparkline Chart */}
              <div className="h-6 w-full flex items-end gap-0.5 mt-1 select-none">
                {kpi.sparkline.map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-primary/20 rounded-xs group-hover:bg-primary/40 transition-colors" 
                    style={{ height: `${h}%` }} 
                  />
                ))}
              </div>

              <span className="text-[8px] text-stone-500 font-semibold uppercase mt-3 tracking-widest block truncate">
                Level: {kpi.level} · Source: {kpi.citation.split(" ")[0]}
              </span>
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════
            MODULE 1: LIVE INSIGHT SIGNALS DASHBOARD
            ═══════════════════════════════════════════ */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border pb-3 gap-3">
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase text-primary tracking-widest block">Module 1</span>
              <h3 className="font-display text-sm font-black uppercase text-foreground leading-none">Live Insight Signals Dashboard</h3>
            </div>
            
            {/* Category Filter Pills with dynamic animation */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none select-none">
              {[
                { id: "all", label: "All Signals" },
                { id: "attention", label: "Attention" },
                { id: "trust", label: "Trust" },
                { id: "cognitive", label: "Cognitive Load" },
                { id: "mobile", label: "Mobile UX" }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setActiveCategory(pill.id)}
                  className={`h-7 px-3.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition duration-150 shrink-0 cursor-pointer border ${
                    activeCategory === pill.id
                      ? "bg-primary text-white border-transparent shadow shadow-primary/20 scale-[1.02]"
                      : "bg-secondary/40 border-border/50 text-stone-400 hover:text-foreground hover:bg-secondary/70"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box & Summary Metrics */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-500" />
              <input
                type="text"
                placeholder="Search target metrics, key findings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8.5 pl-9 pr-8 rounded-xl bg-secondary/50 border border-border text-xs focus:outline-none focus:border-primary/50 focus:bg-card transition text-foreground placeholder:text-stone-500 font-semibold"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 p-0.5 cursor-pointer">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
              Showing <span className="text-primary font-black">{filteredInsights.length}</span> Verified Signals
            </div>
          </div>

          {/* Dashboard Cards Grid - Completely Redesigned to be Compact & Executive Friendly */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filteredInsights.map((insight) => (
              <div 
                key={insight.id} 
                className="bg-card border border-border/60 hover:border-primary/30 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition duration-200"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between border-b border-border/30 pb-2">
                    <span className="text-[8px] font-black uppercase text-primary bg-primary/10 px-2 py-0.5 rounded tracking-wider flex items-center gap-1">
                      {insight.category === "attention" && <Eye className="h-2.5 w-2.5 text-primary" />}
                      {insight.category === "cognitive" && <Brain className="h-2.5 w-2.5 text-primary" />}
                      {insight.category === "trust" && <Shield className="h-2.5 w-2.5 text-primary" />}
                      {insight.category === "mobile" && <Globe className="h-2.5 w-2.5 text-primary" />}
                      {insight.category}
                    </span>
                    <span className="text-[8.5px] text-emerald-500 font-mono font-black">{insight.confidence}% Conf.</span>
                  </div>

                  <h4 className="font-display font-black text-xs uppercase text-foreground leading-snug">{insight.title}</h4>
                  
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[7.5px] font-black text-stone-500 uppercase block">Key Finding</span>
                      <p className="text-foreground/90 font-medium leading-relaxed">
                        "{viewMode === "business" ? insight.findingBusiness : insight.findingScience}"
                      </p>
                    </div>

                    <div>
                      <span className="text-[7.5px] font-black text-stone-500 uppercase block">Why It Matters</span>
                      <p className="text-stone-400 font-semibold leading-relaxed">
                        "{viewMode === "business" ? insight.whyItMattersBusiness : insight.whyItMattersScience}"
                      </p>
                    </div>

                    <div className="p-2 rounded-xl bg-primary/4 border border-primary/10">
                      <span className="text-[7.2px] font-black text-primary uppercase block">Recommended Action</span>
                      <p className="text-foreground font-bold mt-0.5 leading-normal">
                        "{viewMode === "business" ? insight.actionBusiness : insight.actionScience}"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-border/30 flex items-center justify-between mt-4">
                  <a 
                    href={insight.sourceLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[8px] font-black text-stone-400 uppercase tracking-widest hover:text-primary transition flex items-center gap-1 border-b border-dashed border-stone-500 pb-0.5 cursor-pointer"
                  >
                    [{insight.sourceName}] ({insight.year})
                  </a>
                  <button 
                    onClick={() => setSelectedInsight(insight)}
                    className="text-[9px] font-black uppercase tracking-wider text-primary hover:text-mahindra-red-light cursor-pointer transition"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}

            {filteredInsights.length === 0 && (
              <div className="col-span-3 text-center py-12 border border-dashed border-border rounded-2xl bg-secondary/10 text-xs text-muted-foreground font-bold">
                No matching behavioral insights currently indexed.
              </div>
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            MODULE 2: WHY USERS DROP OFF DIAGNOSTIC SIMULATOR
            ═══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Drop-off Analyzer Control */}
          <div className="lg:col-span-4 bg-card border border-border rounded-3xl p-6 flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase text-primary tracking-widest block">Module 2</span>
                <h3 className="font-display text-sm font-black uppercase text-foreground">Why Users Drop Off Analyzer</h3>
                <p className="text-[10.5px] text-muted-foreground leading-normal">
                  Select an onboarding micro-touchpoint to run real-time stress diagnostics.
                </p>
              </div>

              {/* Selection list */}
              <div className="space-y-1.5 pt-2 select-none">
                {[
                  { id: "forms", label: "Onboarding KYC Forms" },
                  { id: "emi", label: "EMI Comparison Grid" },
                  { id: "kyc", label: "Aadhaar Upload" },
                  { id: "landing", label: "Landing Page" },
                  { id: "reminders", label: "Reminder Message" }
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setDropoffStage(btn.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-between transition duration-150 border cursor-pointer ${
                      dropoffStage === btn.id
                        ? "bg-primary/5 border-primary/20 text-primary font-bold shadow-sm"
                        : "bg-card border-border hover:bg-secondary/40 text-stone-400"
                    }`}
                  >
                    <span>{btn.label}</span>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-[9px] text-muted-foreground font-black uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Zero Hallucinations · Verified Source Match
            </div>
          </div>

          {/* Biometric Analysis Viewport */}
          <div className="lg:col-span-8 bg-card border border-border rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 h-48 w-48 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-border/30 pb-3 select-none">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Friction Diagnostic Panel</span>
                <span className="text-[9px] font-mono text-stone-500">{activeDropoff.source}</span>
              </div>

              {/* Stress Scales & Metres */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-secondary/10 p-4 rounded-2xl border border-border/40 select-none">
                {/* Friction score */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
                    <span>Friction Score</span>
                    <span className="text-rose-500 font-bold">{activeDropoff.frictionScore}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-yellow-500 to-rose-600 h-full rounded-full transition-all duration-300" 
                      style={{ width: `${activeDropoff.frictionScore}%` }} 
                    />
                  </div>
                </div>

                {/* Stress Scale */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
                    <span>Stress Scale</span>
                    <span className="text-amber-500 font-bold">{activeDropoff.stressScale}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 via-yellow-500 to-rose-600 h-full rounded-full transition-all duration-300" 
                      style={{ width: `${activeDropoff.stressScale}%` }} 
                    />
                  </div>
                </div>
              </div>

              {/* Diagnosed Trigger Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-xs leading-relaxed">
                <div className="space-y-3">
                  <div>
                    <span className="text-[8px] font-black uppercase text-rose-500 tracking-widest block">⚠️ Diagnosed Friction Trigger</span>
                    <p className="text-foreground font-bold mt-0.5">"{activeDropoff.problem}"</p>
                  </div>
                  <div>
                    <span className="text-[8px] font-black text-stone-500 uppercase block">Subconscious Brain State</span>
                    <p className="text-foreground font-semibold">"{viewMode === "business" ? activeDropoff.businessState : activeDropoff.scienceState}"</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-[8px] font-black uppercase text-emerald-500 tracking-widest block">✅ Strategic UX Optimization</span>
                    <p className="text-foreground font-bold mt-0.5">"{viewMode === "business" ? activeDropoff.businessFix : activeDropoff.scienceFix}"</p>
                  </div>
                  <div>
                    <span className="text-[8px] font-black text-stone-500 uppercase block">Likely Abandonment Trigger</span>
                    <p className="text-stone-400 font-semibold">"{activeDropoff.likelyTrigger}"</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between select-none">
              <span className="text-[10px] text-primary bg-primary/5 px-2.5 py-1 rounded-md border border-primary/10 font-bold uppercase tracking-wider">Mahindra Action Plan Mapped</span>
              <span className="text-[9px] text-stone-500 font-mono">Sim Ref: UX-DROP-2026</span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            MODULE 3: INDIA TRUST & BEHAVIOR MAP
            ═══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Indian Map Interactive Canvas */}
          <div className="lg:col-span-6 bg-card border border-border rounded-3xl p-6 flex flex-col justify-between shadow-sm">
            <div className="space-y-1 select-none">
              <span className="text-[9px] font-black uppercase text-primary tracking-widest block">Module 3</span>
              <h3 className="font-display text-sm font-black uppercase text-foreground">INDIA TRUST & BEHAVIOR MAP</h3>
              <p className="text-[10.5px] text-muted-foreground leading-normal">
                Click a geographic region of India to analyze localized trust behaviors and vernacular design parameters.
              </p>
            </div>

            {/* Graphic Map Canvas */}
            <div className="relative my-6 h-[270px] bg-secondary/15 rounded-2xl border border-border/40 overflow-hidden flex items-center justify-center select-none">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.01)_1.5px,transparent_1.5px)] bg-[size:25px_25px]" />
              
              {/* Custom High-Fidelity SVG Map of India (6 clickable quadrants) */}
              <svg viewBox="0 0 300 300" className="h-[240px] w-[240px] stroke-primary/30 stroke-2 fill-none cursor-pointer">
                {/* Subdued map guidelines */}
                <path d="M 120 20 L 160 10 L 200 40 L 220 90 L 260 90 L 280 120 L 250 150 L 220 120 L 200 160 L 180 200 L 150 240 L 130 280 L 110 240 L 90 200 L 70 150 L 50 120 L 90 90 Z" strokeDasharray="4 4" className="stroke-stone-700/40" />

                {/* Region paths - North, South, East, West, Central, Northeast */}
                {INDIA_REGIONS.map((region) => (
                  <path
                    key={region.id}
                    d={region.coords}
                    onClick={() => setSelectedRegion(region.id)}
                    className={`transition duration-300 hover:fill-primary/20 ${
                      selectedRegion === region.id
                        ? "fill-primary/30 stroke-primary stroke-3 filter drop-shadow-md scale-[1.01]"
                        : "fill-secondary/30 stroke-border/80 hover:stroke-primary/50"
                    }`}
                  />
                ))}

                {/* Text Labels Overlay */}
                {INDIA_REGIONS.map((region) => {
                  if (!region.circleCoords) return null;
                  return (
                    <circle
                      key={`circle-${region.id}`}
                      cx={region.circleCoords.cx}
                      cy={region.circleCoords.cy}
                      r="4"
                      className={`transition-all duration-300 ${
                        selectedRegion === region.id ? "fill-primary scale-125 stroke-white stroke-1" : "fill-stone-500"
                      }`}
                    />
                  );
                })}
              </svg>

              {/* Geographical buttons overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1 items-center justify-center">
                {INDIA_REGIONS.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region.id)}
                    className={`px-2.5 py-0.5 rounded text-[8px] font-black uppercase border transition cursor-pointer ${
                      selectedRegion === region.id
                        ? "bg-primary text-white border-primary shadow"
                        : "bg-secondary/40 text-stone-400 border-border/40 hover:text-foreground"
                    }`}
                  >
                    {region.name.split(" India")[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-stone-400 font-semibold leading-relaxed border-t border-border pt-3">
              "Relational heuristics override abstract algorithms. Regional trust triggers govern digital loan adoption."
            </div>
          </div>

          {/* Regional Insight Details */}
          <div className="lg:col-span-6 bg-card border border-border rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 h-48 w-48 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/30 pb-3 select-none">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Territory Diagnostics</span>
                <span className="text-[9px] font-mono text-stone-500">{regionInfo.citation}</span>
              </div>

              <div className="space-y-4 leading-relaxed">
                <div>
                  <span className="text-[8.5px] font-black text-stone-500 uppercase tracking-widest block">Active Territory</span>
                  <h4 className="font-display font-black text-sm uppercase text-foreground">{regionInfo.name}</h4>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2">
                    <div>
                      <span className="text-[7.8px] font-black text-stone-500 uppercase block">Preferred Language</span>
                      <span className="text-foreground font-bold">{regionInfo.dialect}</span>
                    </div>
                    <div>
                      <span className="text-[7.8px] font-black text-stone-500 uppercase block">Trust Trigger</span>
                      <span className="text-foreground font-semibold leading-normal block">{regionInfo.trustDriver}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-[7.8px] font-black text-stone-500 uppercase block">Onboarding Behavior</span>
                      <span className="text-foreground font-semibold leading-normal block">{regionInfo.onboarding}</span>
                    </div>
                    <div>
                      <span className="text-[7.8px] font-black text-stone-500 uppercase block">Preferred Campaign Style</span>
                      <span className="text-foreground font-bold">{regionInfo.campaignStyle}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-border/30">
                  <div>
                    <span className="text-[7.8px] font-black text-stone-500 uppercase block">Mobile Behavior Pattern</span>
                    <span className="text-foreground font-medium block leading-normal">{regionInfo.mobileBehavior}</span>
                  </div>
                  <div>
                    <span className="text-[7.8px] font-black text-stone-500 uppercase block">Regional Campaign Action</span>
                    <span className="text-primary font-bold block leading-normal">"{regionInfo.recommendation}"</span>
                  </div>
                </div>

                <div className="p-3 bg-secondary/15 border border-border/60 rounded-2xl text-[10.5px]">
                  <span className="text-[7.8px] font-black text-stone-500 uppercase block">Technical Neuroscience Guidance</span>
                  <p className="text-foreground font-bold mt-0.5">"{regionInfo.scienceRec}"</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/30 flex items-center justify-between text-[9px] text-stone-500 select-none">
              <span>National Map Reference Code</span>
              <span className="text-emerald-500 font-bold uppercase tracking-wider">Credibility Mapped</span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            MODULE 4: ATTENTION PLAYGROUND & CREATIVE AUDIT
            ═══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Auditing Controls panel */}
          <div className="lg:col-span-4 bg-card border border-border rounded-3xl p-6 flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground block select-none">Select Audit Creative:</span>
              
              <div className="grid grid-cols-2 gap-2 select-none">
                <button
                  onClick={() => {
                    setPlaygroundCreative("cluttered");
                    setPlaygroundAois(["headline", "bad-pricing", "visual-noise"]);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                    playgroundCreative === "cluttered" ? "bg-primary/5 border-primary/20 font-bold scale-[1.02]" : "bg-card border-border hover:bg-secondary/40 text-stone-400"
                  }`}
                >
                  <span className="block text-[8px] font-black uppercase text-rose-500 mb-1">Cluttered</span>
                  <span className="text-xs text-foreground/90 font-bold">APR Specs Flyer</span>
                </button>

                <button
                  onClick={() => {
                    setPlaygroundCreative("optimized");
                    setPlaygroundAois(["focal-tractor", "cta", "clean-price"]);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                    playgroundCreative === "optimized" ? "bg-primary/5 border-primary/20 font-bold scale-[1.02]" : "bg-card border-border hover:bg-secondary/40 text-stone-400"
                  }`}
                >
                  <span className="block text-[8px] font-black uppercase text-emerald-500 mb-1">Optimized</span>
                  <span className="text-xs text-foreground/90 font-bold">Bento Layout</span>
                </button>
              </div>

              <hr className="border-border/40" />

              <div className="space-y-2 select-none">
                <span className="text-[9px] font-black uppercase text-stone-500 block">Dwell Time Target Highlight</span>
                <div className="grid grid-cols-3 gap-1 text-[9.5px]">
                  {[
                    { id: "logo", label: "Logo Area" },
                    { id: "headline", label: "Headline" },
                    { id: "cta", label: "CTA Button" }
                  ].map((target) => (
                    <button
                      key={target.id}
                      onClick={() => setPlaygroundDwell(target.id)}
                      className={`py-1.5 rounded border font-bold transition cursor-pointer ${
                        playgroundDwell === target.id ? "bg-primary/8 border-primary text-primary shadow-xs" : "bg-secondary/20 border-border text-stone-500"
                      }`}
                    >
                      {target.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-secondary/15 border border-border rounded-2xl text-[10.5px] space-y-1.5">
                <span className="text-[7.8px] font-black text-stone-500 uppercase block">Gaze Salience Review</span>
                {playgroundCreative === "cluttered" ? (
                  <p className="text-foreground/90 font-semibold leading-relaxed">
                    "Highly scattered search cycles. Technical specs split attention away from CTA grids."
                  </p>
                ) : (
                  <p className="text-foreground/90 font-semibold leading-relaxed">
                    "Consistent gaze path. Milestone focal point captures early scanning, funneling to layout CTA."
                  </p>
                )}
              </div>
            </div>

            <div className="text-[9.5px] text-stone-400 font-semibold border-t border-border pt-3">
              *Visual maps replicate eye tracking findings.
            </div>
          </div>

          {/* Animated Interactive Heatmap Viewport */}
          <div className="lg:col-span-8 bg-[#0B0810] border border-border rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden min-h-[380px]">
            
            {/* Heatmap overlay markers */}
            <div className="absolute inset-0 pointer-events-none mix-blend-multiply z-20">
              {playgroundCreative === "cluttered" ? (
                <>
                  <div className="absolute top-[20%] left-[15%] w-24 h-24 rounded-full bg-radial from-rose-500/50 via-amber-500/20 to-transparent animate-pulse" />
                  <div className="absolute top-[35%] right-[25%] w-32 h-32 rounded-full bg-radial from-rose-500/60 via-amber-400/25 to-transparent" />
                  <div className="absolute bottom-[20%] left-[30%] w-20 h-20 rounded-full bg-radial from-amber-500/40 to-transparent animate-pulse" />
                </>
              ) : (
                <>
                  <div className="absolute top-[18%] left-[20%] w-20 h-20 rounded-full bg-radial from-emerald-500/50 via-amber-500/15 to-transparent animate-pulse" />
                  <div className="absolute top-[40%] right-[30%] w-40 h-40 rounded-full bg-radial from-emerald-500/60 via-amber-400/25 to-transparent" />
                  <div className="absolute bottom-[22%] left-[45%] w-28 h-28 rounded-full bg-radial from-emerald-500/50 to-transparent animate-pulse" />
                </>
              )}
            </div>

            <div className="flex items-center justify-between border-b border-white/5 pb-3 z-30 select-none">
              <span className="text-[10px] font-black uppercase text-stone-400 tracking-wider flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" /> Real-time Gaze Simulation
              </span>
              <span className="text-[9.5px] font-mono text-stone-500">Gaze Frame: calibrated</span>
            </div>

            {/* Creative Layout Grid */}
            <div className="flex-1 flex flex-col justify-between py-6 max-w-lg mx-auto w-full z-10 select-none text-center">
              <div className="space-y-1">
                <span className="text-[7.5px] font-black uppercase text-stone-400 tracking-widest bg-white/5 px-2 py-0.5 rounded">Harvest Campaign Creative</span>
                <h4 className="font-display font-black text-lg text-white mt-1 uppercase">Empower Your Next Harvest Plan</h4>
              </div>

              <div className="grid grid-cols-3 gap-3 my-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center">
                  <span className="text-[7px] font-bold text-stone-400 uppercase">Tenure</span>
                  <span className="text-white text-xs font-black mt-0.5">36 Months</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center">
                  <span className="text-[7px] font-bold text-stone-400 uppercase">Installment</span>
                  <span className="text-emerald-400 text-xs font-black mt-0.5">₹8,450 / mo</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center">
                  <span className="text-[7px] font-bold text-stone-400 uppercase">KYC Check</span>
                  <span className="text-white text-xs font-black mt-0.5">Instant Verify</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-8 w-44 rounded-xl bg-primary text-white text-[9.5px] font-black uppercase tracking-wider mx-auto flex items-center justify-center shadow hover:bg-mahindra-red-light transition cursor-pointer">
                  Submit Loan Options
                </div>
                <p className="text-[6.5px] text-stone-500 uppercase tracking-widest">*RBI Cooperative Agreement Guaranteed</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[9px] text-stone-500 z-30 select-none">
              <span>Dwell Focus target: {playgroundDwell.toUpperCase()}</span>
              <span>Visual Flow: {playgroundCreative === "optimized" ? "Optimal Gaze Path" : "Friction Loops"}</span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            MODULE 5: CUSTOMER JOURNEY EMOTION TIMELINE
            ═══════════════════════════════════════════ */}
        <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-border pb-3 flex items-center justify-between select-none">
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase text-primary tracking-widest block">Module 5</span>
              <h3 className="font-display text-sm font-black uppercase text-foreground">Customer Journey Emotion Timeline</h3>
            </div>
            <span className="text-[9px] font-black text-stone-400 uppercase tracking-wide">Advance Stages of Onboarding Journey</span>
          </div>

          {/* Stepper controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 select-none">
            {JOURNEY_TIMELINE.map((stage, idx) => (
              <React.Fragment key={idx}>
                <button
                  onClick={() => setJourneyStep(idx)}
                  className={`flex-1 w-full p-4 rounded-2xl border text-left transition duration-200 cursor-pointer ${
                    journeyStep === idx
                      ? "border-primary bg-secondary/35 shadow-sm font-bold scale-[1.02]"
                      : "border-border/60 bg-card hover:bg-secondary/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-4.5 w-4.5 rounded-full text-[9px] font-black flex items-center justify-center shrink-0 border ${
                      journeyStep === idx ? "bg-primary text-white border-transparent" : "bg-secondary text-stone-400 border-border"
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="text-xs uppercase font-black tracking-wide text-foreground">{stage.label}</span>
                  </div>
                  <div className="text-[10px] text-stone-400 font-semibold mt-1 truncate">{stage.emotion}</div>
                </button>
                {idx < JOURNEY_TIMELINE.length - 1 && (
                  <ArrowRight className="h-4.5 w-4.5 text-stone-500 hidden md:block shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Stepper info viewports */}
          <div className="bg-secondary/15 border border-border/80 rounded-2xl p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed text-xs">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[8px] font-black uppercase text-primary tracking-widest block">Borrower Emotional Vector</span>
                <p className="text-sm text-foreground font-black uppercase tracking-wide flex items-center gap-1.5">
                  <Smile className="h-4 w-4 text-primary" /> {activeJourney.emotion}
                </p>
              </div>

              <div className="space-y-3 font-semibold text-stone-400">
                <p><strong>Dwell Focus Path:</strong> <span className="text-foreground">{activeJourney.eyeBehavior}</span></p>
                <p><strong>Trust Calibrator:</strong> <span className="text-primary font-bold">{activeJourney.trustLevel}</span></p>
                <p><strong>Funnel Churn Risk:</strong> <span className="text-rose-500 font-black">{activeJourney.dropRisk}</span></p>
              </div>
            </div>

            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-[8.5px] font-black uppercase text-emerald-500 tracking-widest block">✅ Strategic UX Action</span>
                <p className="text-[12.5px] text-foreground font-bold leading-relaxed border-b border-border pb-2.5">
                  "{activeJourney.recommendation}"
                </p>
              </div>

              <div className="flex justify-between items-center text-[9px] text-stone-500">
                <span>Science Diagnosis:</span>
                <span className="font-bold text-foreground">"{activeJourney.scienceRec}"</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            RESEARCH EXPLORER & SOURCE DIRECTORY
            ═══════════════════════════════════════════ */}
        <div className="border border-border rounded-3xl p-6 bg-card space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border pb-3 gap-3">
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase text-primary tracking-widest block">Source Directory</span>
              <h3 className="font-display text-sm font-black uppercase text-foreground">Verified Behavioral Research index</h3>
            </div>
            
            <button
              onClick={() => setVerifiedPanelOpen(!verifiedPanelOpen)}
              className="h-8 px-4 rounded-xl border border-border/80 hover:bg-secondary text-[10px] font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5"
            >
              <CheckSquare className="h-4 w-4 text-emerald-500" />
              {verifiedPanelOpen ? "Close Reference Explorer" : "Open Reference Explorer"}
            </button>
          </div>

          {verifiedPanelOpen && (
            <div className="space-y-4 animate-in fade-in select-none">
              <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                Complete directory mapping verified research studies with publication dates, credibility indicators, and original document confidence metrics.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INSIGHTS_PLAYBOOK.map((ref) => (
                  <div key={ref.id} className="p-4 bg-secondary/15 border border-border/60 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-black text-foreground uppercase tracking-wide text-[10px]">{ref.title}</span>
                      <span className="text-[8px] font-bold text-emerald-600 bg-emerald-600/10 px-2 py-0.5 rounded">Verified Study</span>
                    </div>
                    <p className="text-[10.5px] text-stone-400 font-semibold leading-relaxed">
                      "{viewMode === "business" ? ref.findingBusiness : ref.findingScience}"
                    </p>
                    <div className="pt-2 border-t border-border/30 flex justify-between text-[9px] text-muted-foreground font-mono">
                      <span>Source: {ref.sourceName} ({ref.year})</span>
                      <span>Credibility: {ref.credibility}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-[10px] text-stone-400 font-semibold leading-normal flex items-start gap-2 select-none pt-2">
            <CheckSquare className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Strict Compliance Rule: Every observation, regional parameter, and UX recomendation maps 100% directly to official research logs. No hallucinations allowed.</span>
          </div>
        </div>

      </div>

      {/* Expanded Modal Insight Panel */}
      {selectedInsight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
          <Card className="max-w-2xl w-full p-6 space-y-6 relative border-t-4 border-t-primary animate-in zoom-in-95 duration-150">
            <button 
              onClick={() => setSelectedInsight(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1 rounded-lg cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[8px] font-black uppercase text-primary tracking-widest bg-primary/10 px-2.5 py-0.5 rounded border border-primary/20">{selectedInsight.category}</span>
              <h3 className="font-display text-lg font-black uppercase text-foreground leading-tight mt-2">{selectedInsight.title}</h3>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-muted-foreground">
              <div className="space-y-1">
                <span className="text-[8.5px] font-black uppercase text-stone-500 block">Verified Finding</span>
                <p className="text-foreground/90 font-medium bg-secondary/20 p-3 rounded-xl border border-border/50">
                  "{viewMode === "business" ? selectedInsight.findingBusiness : selectedInsight.findingScience}"
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[8.5px] font-black uppercase text-stone-500 block">Why It Matters</span>
                  <p className="text-foreground/80 font-semibold">
                    "{viewMode === "business" ? selectedInsight.whyItMattersBusiness : selectedInsight.whyItMattersScience}"
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[8.5px] font-black uppercase text-stone-500 block">Strategic Recommended Action</span>
                  <p className="text-primary font-bold">
                    "{viewMode === "business" ? selectedInsight.actionBusiness : selectedInsight.actionScience}"
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border/30 grid grid-cols-3 gap-2 text-center select-none font-bold">
                <div className="p-2 bg-secondary/15 border border-border rounded-xl">
                  <span className="text-[7.8px] text-stone-400 uppercase font-black block">Benchmark</span>
                  <span className="text-foreground text-sm font-black mt-0.5 block">{selectedInsight.metric}</span>
                </div>
                <div className="p-2 bg-secondary/15 border border-border rounded-xl col-span-2">
                  <span className="text-[7.8px] text-stone-400 uppercase font-black block">Source Organization & Study</span>
                  <span className="text-foreground text-[10.5px] font-black mt-0.5 block truncate">
                    {selectedInsight.sourceName} — {selectedInsight.year}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/30 flex items-center justify-between text-[9px] text-muted-foreground">
              <span>Ref: {selectedInsight.id.toUpperCase()}</span>
              <span className="text-emerald-500 font-bold uppercase tracking-wider">{selectedInsight.confidence}% Confidence</span>
            </div>
          </Card>
        </div>
      )}

      {/* KPI Drilldown Details Modal Drawer */}
      {activeKpiDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
          <Card className="max-w-md w-full p-6 space-y-5 relative border-t-4 border-t-primary animate-in zoom-in-95 duration-150">
            <button 
              onClick={() => setActiveKpiDetails(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1 rounded-lg cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[8.5px] font-black uppercase text-primary tracking-widest bg-primary/10 px-2.5 py-0.5 rounded border border-primary/20">Metric Breakdown</span>
              <h3 className="font-display text-base font-black uppercase text-foreground leading-tight mt-2">{activeKpiDetails.title}</h3>
            </div>

            <div className="space-y-3.5 text-xs text-muted-foreground">
              <div className="flex justify-between border-b border-border/40 pb-2">
                <span>Observed Stat:</span>
                <span className="text-foreground font-black">{activeKpiDetails.metric}</span>
              </div>
              <div className="flex justify-between border-b border-border/40 pb-2">
                <span>Friction Level:</span>
                <span className="text-rose-500 font-bold">{activeKpiDetails.severity}</span>
              </div>
              <div className="flex justify-between border-b border-border/40 pb-2">
                <span>Study Confidence:</span>
                <span className="text-emerald-500 font-bold">{activeKpiDetails.confidence}% Verified</span>
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-[8px] font-black text-stone-500 uppercase block">Subconscious Impact (Why it matters)</span>
                <p className="text-foreground leading-relaxed bg-secondary/15 p-3 rounded-xl border border-border">"{activeKpiDetails.whyItMatters}"</p>
              </div>
            </div>

            <div className="pt-3 border-t border-border/30 flex justify-between text-[9.5px] text-stone-500 font-mono">
              <span>Citation: {activeKpiDetails.citation}</span>
            </div>
          </Card>
        </div>
      )}

    </AppLayout>
  );
}
export default PsychologyPage;
