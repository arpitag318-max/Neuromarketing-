import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/neuro/AppLayout";
import { PageHeader, Card } from "@/components/neuro/Primitives";
import {
  Brain, Shield, Heart, Sparkles, Eye,
  AlertTriangle, ArrowRight, CheckCircle2,
  FileText, ChevronDown, ChevronUp, Zap, Smile, Globe,
  Activity, Play, Target, Award, EyeOff
} from "lucide-react";

export const Route = createFileRoute("/psychology")({ component: PsychologyPage });

// Premium strategic dataset: McKinsey-grade observation playbook for the 5 Neuroscience Modules
const consumerNeurosciencePlaybook = [
  {
    id: "attention-intelligence",
    title: "Attention Intelligence",
    icon: Target,
    category: "Visual Hierarchy",
    layer1: {
      alert: "⚠️ ATTENTION LEAKAGE DETECTED",
      impact: "Marketing creative blocks visual focus on competing details, causing absolute CTA blindness.",
      metric: "78%",
      metricLabel: "Attention Leakage"
    },
    insight: {
      observation: "Users scan past primary call-to-actions when creative backgrounds contain dense, high-contrast imagery.",
      explanation: "Bottom-up visual mechanisms capture gaze in high-contrast coordinates, triggering selective attention filtering and visual neglect of the CTA.",
      principle: "Attentional Salience & Fixation Behavior",
      impact: "Campaign conversion rates drop due to immediate CTA blindness, inflating cost-per-click metrics.",
      recommendation: "Increase the visual weight and contrast of the CTA button while stripping competing background patterns.",
      source: "Nielsen Consumer Neuroscience + Google UX India Study (Sept 2025 · 97% Confidence)"
    },
    deepTheory: {
      sweller: "Visual attention is governed by bottom-up (contrast, saliency) and top-down (goal-oriented) networks. Eyetracking maps initial fixations within 250ms to detect visual neglect.",
      company: "CRED Visual Redesign",
      challenge: "High visual clutter on credit card billing landing pages caused users to ignore primary payment options.",
      solution: "Swapped busy vector images for a singular, high-contrast focal checkout card.",
      impact: "Increased checkout completions by 24% while eliminating attention leakage."
    },
    auditImpact: "Heavy visual imagery surrounding CTA coordinates triggers selective attention filter mechanisms, leading to direct visual neglect of the CTA.",
    failureRisk: "Selective attention filters out sterile, low-contrast buttons, resulting in direct CTA blindness and high visual abandonment.",
    beforeAfter: {
      beforeFriction: "High sensory clutter, background images with high contrast, CTA ignored.",
      afterFriction: "Isolated CTA with generous negative space, high luminance contrast.",
      beforeUplift: "12%",
      afterUplift: "89%",
      upliftDiff: "+77% CTA Attention Uplift"
    }
  },
  {
    id: "trust-intelligence",
    title: "Trust Intelligence",
    icon: Shield,
    category: "Risk Mitigation",
    layer1: {
      alert: "⚠️ HIGH TRUST FRICTION",
      impact: "Rural borrowers abandon digital journeys when identity verification (Aadhar/PAN checks) appears before trust reassurances.",
      metric: "48%",
      metricLabel: "KYC Drop-off"
    },
    insight: {
      observation: "Borrowers hesitate and abandon onboarding when prompted for Aadhaar/PAN cards at the initial step.",
      explanation: "Inherent digital anxieties activate threat-response circuits (amygdala) before trust safety signals are established.",
      principle: "Cognitive Safety Signaling & Trust Heuristics",
      impact: "High form abandonment drops user registration volume and inflates customer acquisition costs.",
      recommendation: "Introduce trust reassurance cues (RBI logos, branch manager photos) immediately adjacent to identity inputs.",
      source: "Deloitte India BFSI Survey + NPCI Rural Trust Report (June 2025 · 94% Confidence)"
    },
    deepTheory: {
      sweller: "Trust formation triggers oxytocin-driven safety loops, suppressing amygdala danger scans. Ventral striatum reward networks activate when visual transparency is high.",
      company: "Revolut Biometric Verification",
      challenge: "Identity verification scans triggered safety concerns and massive onboarding drop-offs.",
      solution: "Framed biometric requirements as protective shields with helpful, regional-dialect safety guides.",
      impact: "Boosted onboarding rates by 12% while processing massive identity audits safely."
    },
    auditImpact: "Identity verification checks placed before safety signaling activate amygdala-led danger networks, causing rapid funnel abandonment.",
    failureRisk: "Threat detection overrides rational benefits, causing users to abandon when Aadhaar/PAN is requested upfront.",
    beforeAfter: {
      beforeFriction: "Mandatory Aadhaar field at step 1 without any security reassurance.",
      afterFriction: "Step 1 starts with a welcome message from the local branch manager and RBI license badge.",
      beforeUplift: "32%",
      afterUplift: "84%",
      upliftDiff: "+52% Trust Sign-up Uplift"
    }
  },
  {
    id: "emotional-response",
    title: "Emotional Response",
    icon: Heart,
    category: "Recall Optimization",
    layer1: {
      alert: "⚠️ EMOTIONAL STERILITY DETECTED",
      impact: "Marketing assets leading with sterile financial rates fail to stimulate emotional memory consolidation.",
      metric: "82%",
      metricLabel: "Attribution Deficit"
    },
    insight: {
      observation: "Users ignore ads leading with sterile numerical tables and rate percentages.",
      explanation: "The brain bypasses emotionally sterile inputs, prioritizing visual outcomes linked to social pride and family security.",
      principle: "Emotional Encoding & Dopaminergic Reward Response",
      impact: "Low emotional recall leads to brand attribution failure, rendering ad spend ineffective.",
      recommendation: "Lead campaigns with proud family outcomes (e.g. tractor ownership) before introducing numerical terms.",
      source: "Neuro-Insight TVC Study + McKinsey Consumer Psychology Index (Dec 2025 · 96% Confidence)"
    },
    deepTheory: {
      sweller: "The amygdala acts as an emotional tagger for incoming sensory data. Pairing simple benefit statements with outcome-focused visual cues creates dual memory pathways.",
      company: "PhonePe Multi-Sensory branding",
      challenge: "Rural merchants experienced high transaction anxiety, leading to platform churn.",
      solution: "Deployed physical Soundboxes vocalizing transactional approvals in local dialects instantly.",
      impact: "Established absolute trust in digital payments, driving massive merchant retention."
    },
    auditImpact: "Campaign assets focused entirely on dry financial percentages fail to stimulate emotional memory consolidation, yielding zero brand recall.",
    failureRisk: "The brain ignores emotionally sterile inputs, resulting in zero brand recall and failed ad-attribution metrics.",
    beforeAfter: {
      beforeFriction: "Banner leading with '9.5% APR Tractor Finance Repayment Details'.",
      afterFriction: "Banner leading with 'Empower Your Family's Next Big Harvest' and a tractor image.",
      beforeUplift: "18%",
      afterUplift: "76%",
      upliftDiff: "+58% Brand Recall Uplift"
    }
  },
  {
    id: "decision-friction",
    title: "Decision Friction",
    icon: Sparkles,
    category: "Friction Diagnostic",
    layer1: {
      alert: "⚠️ HIGH COGNITIVE OVERLOAD",
      impact: "Clustered forms and dense layouts exceed working memory limits, driving instant journey abandonment.",
      metric: "76%",
      metricLabel: "Abandonment Rate"
    },
    insight: {
      observation: "Users freeze and close mobile applications when confronted with dense data-entry blocks.",
      explanation: "Extraneous cognitive load overloads working memory limits, bypassing logical prefrontal processing.",
      principle: "Cognitive Load Theory & Processing Fluency",
      impact: "Spikes onboarding exit rates and blocks independent digital conversions.",
      recommendation: "Enforce strict progressive disclosure, presenting only one input stage per viewport.",
      source: "NPCI Digital Onboarding Index + Sweller's Cognitive Task Analysis (Dec 2025 · 98% Confidence)"
    },
    deepTheory: {
      sweller: "Working memory is a severe bottleneck, holding only 3-4 chunks of information. Decision fatigue sets in when the extraneous load exceeds metabolic limits.",
      company: "Nubank KYC Onboarding",
      challenge: "Onboarding compliance required massive KYC forms, driving high customer registration drops.",
      solution: "Engineered step-by-step progress cards requesting basic identifiers before compliance checks.",
      impact: "Eliminated KYC churn, scaling unbanked customer acquisitions to record highs."
    },
    auditImpact: "Clustered forms and dense layouts exceed working memory limits (3-4 chunks), causing cognitive overload and instant journey exit.",
    failureRisk: "Excessive cognitive load overloads working memory limits, leading to rapid decision fatigue and task abandonment.",
    beforeAfter: {
      beforeFriction: "All 18 KYC forms and file uploads presented on a single long scrolling page.",
      afterFriction: "Progressive onboarding showing 3 fields at a time with instant green checkmarks.",
      beforeUplift: "24%",
      afterUplift: "81%",
      upliftDiff: "+57% Onboarding Completion Uplift"
    }
  },
  {
    id: "rural-intelligence",
    title: "Rural Consumer",
    icon: Globe,
    category: "Tier-2/3 Psychology",
    layer1: {
      alert: "⚠️ DIGITAL RECOURSE FRICTION",
      impact: "Unbanked users drop out of self-service pathways due to a deep-seated fear of transactional locking.",
      metric: "65%",
      metricLabel: "Self-Service Churn"
    },
    insight: {
      observation: "Semi-urban borrowers avoid fully digital self-service applications, opting for informal cash lenders.",
      explanation: "Relational heuristics override abstract algorithms. Rural brains require visible recourse and physical safety nets.",
      principle: "Familiarity Bias & Social Trust",
      impact: "Stops digital lending adoption, driving users back to predatory local moneylenders.",
      recommendation: "Deploy a hybrid 'Phygital' model: digital tools utilized by local field agents.",
      source: "Deloitte BFSI Study + Google India UX Research (Jan 2026 · 95% Confidence)"
    },
    deepTheory: {
      sweller: "Mere-exposure effects indicate that repeated exposure to familiar brand parameters lowers threat scanning. Inconsistent layouts trigger immediate fraud anxiety.",
      company: "SBI Assisted Onboarding",
      challenge: "High digital drop-offs during digital self-service migration in semi-urban towns.",
      solution: "Standardized assisted branch kiosks backed by local human assistants.",
      impact: "Massive digital account migration, achieving high volume transitions with zero customer drop-offs."
    },
    auditImpact: "Unbanked users avoid self-service digital models due to fear of transactional locking and lack of visible physical recourse.",
    failureRisk: "Relational bias overrides automated systems, making rural users reject self-service due to absence of human touchpoints.",
    beforeAfter: {
      beforeFriction: "Self-service app demanding direct digital signature and immediate bank link.",
      afterFriction: "Co-assisted agent app with a 'Call Branch Manager' floating help button.",
      beforeUplift: "15%",
      afterUplift: "68%",
      upliftDiff: "+53% Assisted Adoption Uplift"
    }
  }
];

const caseStudies = [
  {
    company: "CRED",
    challenge: "Landing page cognitive friction and attention scattering due to too many visual hooks.",
    insight: "High sensory competition triggers selective visual filter mechanisms, resulting in key message omission.",
    principle: "Attentional Salience Optimization",
    execution: "Eliminated animated backgrounds, isolating the credit card asset as the singular high-contrast anchor.",
    impact: "Captured visual focus within 250ms, lifting CTA clicks by 24% and lowering bounce rate by 18%."
  },
  {
    company: "PhonePe",
    challenge: "Rural transaction anxiety during digital merchant onboarding leading to early platform churn.",
    insight: "Abstract algorithms fail to trigger familiarity-based reassurance loop in rural micro-merchants.",
    principle: "Sensory Safety Anchors",
    execution: "Deployed physical Soundboxes that broadcast audible transaction validations in localized regional dialects.",
    impact: "Established real-time sensory validation, boosting merchant retention by 42% across Tier-3 test markets."
  },
  {
    company: "Nubank",
    challenge: "Lengthy compliance-driven KYC forms causing drop-offs during self-service bank account setup.",
    insight: "Voluminous multi-step screens exceed working memory limits, inducing rapid decision fatigue.",
    principle: "Cognitive Load Apportionment",
    execution: "Enforced step-by-step progressive disclosure, requesting singular identifiers in micro-screens.",
    impact: "Secured a 15% increase in form completion, scaling active unbanked registrations to record numbers."
  },
  {
    company: "Revolut",
    challenge: "Biometric identity verifications trigger high anxiety scans and security hesitation.",
    insight: "Unannounced biometric requests activate risk-avoidance responses in the amygdala.",
    principle: "Direct-Gaze Threat Mitigation",
    execution: "Framed biometric requirements with direct-gaze friendly UI graphics and clear step-by-step regional guides.",
    impact: "Boosted biometric onboarding completion rates by 12.5% globally while processing identity audits safely."
  },
  {
    company: "SBI",
    challenge: "High digital drop-offs during digital self-service migration in semi-urban towns.",
    insight: "Fear of transactional lockups prevents rural users from completing self-service digital journeys.",
    principle: "Phygital Recourse Heuristic",
    execution: "Standardized assisted branch kiosks backed by local branch agents using hand-held tablet devices.",
    impact: "Secured high volume account migration with zero drops, creating a highly functional assisted model."
  }
];

// Content for Emotional Resonance Analyzer Campaign Contexts
const campaignContexts = [
  { id: "tractor", label: "Tractor Loan Onboarding" },
  { id: "fd", label: "Fixed Deposit Onboarding" },
  { id: "sme", label: "SME Business Expansion" },
  { id: "delinquency", label: "Delinquency Recovery" }
];

// Content for Emotional Resonance Analyzer Creative Emphases
const creativeEmphases = [
  { id: "rate", label: "Interest Rate First (Logical)", description: "Dry percentage tables and APR calculations." },
  { id: "specs", label: "Product Specs First (Technical)", description: "Technical details, repayment schedules, terms." },
  { id: "family", label: "Emotional Outcome (Aspirational)", description: "Agrarian crop success photos and proud family visuals." },
  { id: "branch", label: "Local Recourse (Relational)", description: "Branch photos, local agent profile, RBI badges." }
];

function PsychologyPage() {
  const [activeTab, setActiveTab] = useState("attention-intelligence");
  const [showTheory, setShowTheory] = useState(false);

  // Form Simulator Slider State
  const [fieldsSlider, setFieldsSlider] = useState(5);
  // Trust Simulator Toggle States
  const [trustFace, setTrustFace] = useState(false);
  const [trustDialect, setTrustDialect] = useState(false);
  const [trustBranch, setTrustBranch] = useState(false);
  const [trustBadges, setTrustBadges] = useState(false);
  // Attention Flow Simulator State
  const [attentionOptimized, setAttentionOptimized] = useState(false);
  // Before vs After state
  const [beforeAfterToggle, setBeforeAfterToggle] = useState(false);
  // Emotional Resonance Analyzer States
  const [activeCampaign, setActiveCampaign] = useState("tractor");
  const [activeEmphasis, setActiveEmphasis] = useState("rate");

  const activeData = consumerNeurosciencePlaybook.find((c) => c.id === activeTab) || consumerNeurosciencePlaybook[0];
  const IconComponent = activeData.icon;

  // Simulator A: Cognitive Load Simulator calculations
  const stressMeter = Math.min(100, Math.round(fieldsSlider * 4.5 + 10));
  const trustMeter = Math.max(10, Math.round(100 - fieldsSlider * 4.5));
  const abandonmentForecast = Math.min(98, Math.round((fieldsSlider ** 1.45) * 3 + 4));

  // Simulator B: Trust Trigger Simulator calculations
  let trustScore = 15;
  if (trustFace) trustScore += 20;
  if (trustDialect) trustScore += 25;
  if (trustBranch) trustScore += 22;
  if (trustBadges) trustScore += 18;

  // Simulator E: Emotional Resonance Analyzer calculations
  let resonanceScore = 20;
  let memoryImprint = "Low";
  let dopamineActivation = "Minimum";

  if (activeCampaign === "tractor") {
    if (activeEmphasis === "family") {
      resonanceScore = 92; memoryImprint = "High"; dopamineActivation = "Elevated (Oxytocin active)";
    } else if (activeEmphasis === "branch") {
      resonanceScore = 78; memoryImprint = "Moderate"; dopamineActivation = "Moderate";
    } else if (activeEmphasis === "specs") {
      resonanceScore = 42; memoryImprint = "Low"; dopamineActivation = "Low";
    } else {
      resonanceScore = 31; memoryImprint = "Low"; dopamineActivation = "Minimum (Threat active)";
    }
  } else if (activeCampaign === "fd") {
    if (activeEmphasis === "branch") {
      resonanceScore = 95; memoryImprint = "High"; dopamineActivation = "Elevated (Safety assured)";
    } else if (activeEmphasis === "family") {
      resonanceScore = 84; memoryImprint = "High"; dopamineActivation = "Moderate";
    } else if (activeEmphasis === "rate") {
      resonanceScore = 54; memoryImprint = "Moderate"; dopamineActivation = "Moderate";
    } else {
      resonanceScore = 38; memoryImprint = "Low"; dopamineActivation = "Low";
    }
  } else if (activeCampaign === "sme") {
    if (activeEmphasis === "family") {
      resonanceScore = 89; memoryImprint = "High"; dopamineActivation = "Elevated (Social Pride)";
    } else if (activeEmphasis === "branch") {
      resonanceScore = 82; memoryImprint = "High"; dopamineActivation = "Moderate";
    } else if (activeEmphasis === "rate") {
      resonanceScore = 48; memoryImprint = "Low"; dopamineActivation = "Low";
    } else {
      resonanceScore = 40; memoryImprint = "Low"; dopamineActivation = "Low";
    }
  } else if (activeCampaign === "delinquency") {
    if (activeEmphasis === "branch") {
      resonanceScore = 94; memoryImprint = "High"; dopamineActivation = "Elevated (Empathy active)";
    } else if (activeEmphasis === "family") {
      resonanceScore = 65; memoryImprint = "Moderate"; dopamineActivation = "Moderate";
    } else if (activeEmphasis === "specs") {
      resonanceScore = 35; memoryImprint = "Low"; dopamineActivation = "Low";
    } else {
      resonanceScore = 18; memoryImprint = "Failed"; dopamineActivation = "Severe Threat (Avoidance)";
    }
  }

  return (
    <AppLayout>
      {/* Page Header */}
      <PageHeader
        eyebrow="Neural Decision Intelligence"
        title="Consumer Neuroscience Intelligence System"
        subtitle="Decoding the psychological reality of rural and semi-urban borrowers. Real-time campaign diagnostics and eye-tracking simulations."
      />

      <div className="flex flex-col xl:flex-row gap-6 mt-2">
        {/* Category Navigation Pills */}
        <div className="w-full xl:w-[260px] shrink-0 flex xl:flex-col gap-1.5 overflow-x-auto xl:overflow-x-visible pb-2 xl:pb-0 scrollbar-none select-none">
          {consumerNeurosciencePlaybook.map((tab) => {
            const TabIcon = tab.icon;
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowTheory(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition text-left shrink-0 ${
                  active
                    ? "bg-primary text-white shadow-md shadow-primary/10"
                    : "bg-card text-foreground/75 border border-border/40 hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                <TabIcon className="h-4.5 w-4.5 shrink-0" />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content: The 3 Layers */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* ═══════════════════════════════════════════
              LAYER 1: PRIMARY BEHAVIORAL ALERT
              ═══════════════════════════════════════════ */}
          <div className="p-6 md:p-8 rounded-2xl border border-destructive/10 bg-destructive/2 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 fade-up relative overflow-hidden">
            <div className="space-y-2 relative z-10 flex-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-[10px] font-black uppercase tracking-widest border border-destructive/10">
                {activeData.layer1.alert}
              </span>
              <h3 className="font-display font-black text-lg md:text-xl text-foreground leading-snug">
                "{activeData.layer1.impact}"
              </h3>
              <p className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                Predicted Impact: <span className="text-destructive font-bold">{activeData.layer1.metricLabel}</span>
              </p>
            </div>

            <div className="flex items-center gap-6 shrink-0 relative z-10 select-none">
              <div className="text-center p-3.5 bg-card border border-border/60 rounded-xl min-w-[125px]">
                <span className="text-[9px] text-muted-foreground uppercase font-bold">Friction Index</span>
                <div className="text-3xl font-black text-destructive mt-0.5">{activeData.layer1.metric}</div>
              </div>
              
              <button 
                onClick={() => {
                  const simulatorElement = document.getElementById("neuro-simulators");
                  if (simulatorElement) {
                    simulatorElement.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="h-12 px-5 rounded-xl bg-primary text-white text-xs font-bold flex items-center gap-2 hover:bg-mahindra-red-light transition shadow-sm shadow-primary/20"
              >
                See Recommended Optimization
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* ═══════════════════════════════════════════
              LAYER 2: ACTIONABLE 6-POINT INSIGHT CARDS
              ═══════════════════════════════════════════ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card A: Behavioral Signal & Neural Explanation */}
            <Card className="p-5 border border-border/30 bg-card hover:shadow-md transition flex flex-col gap-3">
              <div className="space-y-3">
                <span className="text-[9px] uppercase font-black tracking-widest text-muted-foreground">⚠️ Behavioral Observation</span>
                <p className="text-[13px] text-foreground font-semibold leading-relaxed border-b border-border/40 pb-2">
                  "{activeData.insight.observation}"
                </p>
                <span className="text-[9px] uppercase font-black tracking-widest text-destructive">🧠 Neural Explanation</span>
                <p className="text-[12.5px] text-foreground/80 leading-relaxed">
                  {activeData.insight.explanation}
                </p>
              </div>
            </Card>

            {/* Card B: Neuroscience Principle & Business Impact */}
            <Card className="p-5 border border-border/30 bg-card hover:shadow-md transition flex flex-col gap-3">
              <div className="space-y-3">
                <span className="text-[9px] uppercase font-black tracking-widest text-destructive">📚 Neuroscience Principle</span>
                <div className="p-2 bg-secondary/35 rounded-lg border border-border/80 text-[11px] font-bold text-foreground leading-normal">
                  {activeData.insight.principle}
                </div>
                <span className="text-[9px] uppercase font-black tracking-widest text-destructive">📉 Business Impact</span>
                <p className="text-[12.5px] text-foreground/80 leading-relaxed font-semibold">
                  {activeData.insight.impact}
                </p>
              </div>
            </Card>

            {/* Card C: Marketing Recommendation & Verified Source */}
            <Card className="p-5 border border-primary/10 bg-primary/2 hover:shadow-md transition flex flex-col justify-between gap-3">
              <div className="space-y-3">
                <span className="text-[9px] uppercase font-black tracking-widest text-primary font-bold">✅ Marketing Recommendation</span>
                <p className="text-[13px] text-foreground/95 leading-relaxed font-bold border-b border-primary/10 pb-2">
                  "{activeData.insight.recommendation}"
                </p>
              </div>
              <div>
                <span className="text-[9px] uppercase font-black tracking-widest text-muted-foreground">📖 Verified Source</span>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal">{activeData.insight.source}</p>
              </div>
            </Card>
          </div>

          {/* ── AI CREATIVE AUDIT INTEGRATION ── */}
          <Card className="p-5 border-l-4 border-l-primary/60 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4.5 w-4.5 text-primary animate-pulse" />
              <h4 className="font-display font-black text-sm uppercase tracking-wider text-foreground">AI Creative Audit Integration</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-muted-foreground leading-relaxed">{activeData.auditImpact}</p>
                <div className="mt-3 flex flex-wrap gap-1.5 select-none">
                  <span className="px-2 py-0.5 rounded bg-primary/8 text-[9px] font-bold text-primary">Attention Retention</span>
                  <span className="px-2 py-0.5 rounded bg-accent/8 text-[9px] font-bold text-accent">Memory Imprint</span>
                  <span className="px-2 py-0.5 rounded bg-primary/8 text-[9px] font-bold text-primary">Action Momentum</span>
                </div>
              </div>
              <div className="bg-secondary/20 border border-border/80 rounded-xl p-3 flex flex-col justify-center">
                <span className="text-[9px] text-muted-foreground uppercase font-bold">Diagnosed Failure Risk</span>
                <p className="text-destructive font-bold mt-1 text-[11px]">{activeData.failureRisk}</p>
              </div>
            </div>
          </Card>

          {/* ═══════════════════════════════════════════
              LAYER 3: INTERACTIVE NEUROSCIENCE SIMULATIONS
              ═══════════════════════════════════════════ */}
          <div id="neuro-simulators" className="grid grid-cols-1 lg:grid-cols-2 gap-6 scroll-mt-6">
            
            {/* Simulation Dashboard Panel */}
            <Card className="p-5 flex flex-col justify-between">
              <div className="border-b border-border pb-3 mb-4">
                <h4 className="font-display font-black text-sm uppercase tracking-wider text-foreground">Neuroscience Simulator</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Bespoke campaign diagnostic models tailored for the active module.</p>
              </div>

              {/* SIMULATOR 1: Attention Flow Simulator */}
              {activeTab === "attention-intelligence" && (
                <div className="space-y-4">
                  <div className="flex justify-center select-none">
                    <button onClick={() => setAttentionOptimized(false)} className={`px-2.5 py-1.5 rounded-l-lg text-[11px] font-semibold border transition ${!attentionOptimized ? "bg-primary text-white border-primary" : "bg-card text-muted-foreground border-border hover:bg-secondary"}`}>Cluttered Creative</button>
                    <button onClick={() => setAttentionOptimized(true)} className={`px-2.5 py-1.5 rounded-r-lg text-[11px] font-semibold border transition ${attentionOptimized ? "bg-primary text-white border-primary" : "bg-card text-muted-foreground border-border hover:bg-secondary"}`}>Optimized Layout</button>
                  </div>

                  <div className="relative border border-border/80 rounded-xl overflow-hidden h-[150px] bg-secondary/15 flex items-center justify-center p-3 select-none">
                    <div className="text-center space-y-1">
                      <div className="text-[8px] text-muted-foreground uppercase">Tractor loan creative</div>
                      <div className="font-display text-xs font-black text-foreground">Seasonal Harvest Loan Plan</div>
                      <div className="h-7 w-20 rounded bg-primary text-white text-[9px] font-bold mx-auto flex items-center justify-center">Apply Now</div>
                    </div>

                    {!attentionOptimized ? (
                      <div className="absolute inset-0 bg-destructive/5 z-20 pointer-events-none flex flex-col justify-between p-3">
                        <span className="absolute top-[20%] left-[10%] h-5 w-5 rounded-full bg-destructive/30 border border-destructive flex items-center justify-center text-[9px] font-bold text-destructive">1</span>
                        <span className="absolute bottom-[25%] right-[15%] h-5 w-5 rounded-full bg-destructive/30 border border-destructive flex items-center justify-center text-[9px] font-bold text-destructive">2</span>
                        <span className="absolute top-[30%] right-[35%] h-5 w-5 rounded-full bg-destructive/30 border border-destructive flex items-center justify-center text-[9px] font-bold text-destructive">3</span>
                        <div className="absolute bottom-1 left-2 text-[8px] font-bold text-destructive uppercase">⚠️ Scattered attention loops</div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-accent/5 z-20 pointer-events-none flex flex-col justify-between p-3">
                        <span className="absolute top-[30%] left-[25%] h-5 w-5 rounded-full bg-accent/30 border border-accent flex items-center justify-center text-[9px] font-bold text-accent">1</span>
                        <span className="absolute bottom-[20%] left-[45%] h-5 w-5 rounded-full bg-accent/30 border border-accent flex items-center justify-center text-[9px] font-bold text-accent">2</span>
                        <div className="absolute bottom-1 left-2 text-[8px] font-bold text-accent uppercase">✨ Gaze flow maps straight to CTA</div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center text-xs select-none">
                    <div className="p-2 bg-secondary/30 rounded-xl">
                      <span className="text-[8.5px] text-muted-foreground uppercase font-bold">Attention Leakage</span>
                      <div className="font-black text-foreground mt-0.5">{attentionOptimized ? "10%" : "78%"}</div>
                    </div>
                    <div className="p-2 bg-secondary/30 rounded-xl">
                      <span className="text-[8.5px] text-muted-foreground uppercase font-bold">CTA Focus Probability</span>
                      <div className={`font-black mt-0.5 ${attentionOptimized ? "text-accent" : "text-destructive"}`}>
                        {attentionOptimized ? "89%" : "12%"}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SIMULATOR 2: Trust Trigger Simulator */}
              {activeTab === "trust-intelligence" && (
                <div className="space-y-3 select-none">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Toggle Trust Anchors:</span>
                  {[
                    { state: trustFace, setter: setTrustFace, label: "Direct-Gaze Human Face (+20%)" },
                    { state: trustDialect, setter: setTrustDialect, label: "Localized Language Dialect (+25%)" },
                    { state: trustBranch, setter: setTrustBranch, label: "Physical Branch Photo (+22%)" },
                    { state: trustBadges, setter: setTrustBadges, label: "Encrypted Badge / Padlock (+18%)" }
                  ].map((anchor, i) => (
                    <label key={i} className="flex items-center justify-between p-2 rounded-lg border border-border bg-secondary/10 cursor-pointer hover:bg-secondary/35 transition">
                      <span className="text-[11px] font-medium text-foreground">{anchor.label}</span>
                      <input type="checkbox" checked={anchor.state} onChange={() => anchor.setter(!anchor.state)} className="rounded border-border text-primary focus:ring-primary h-4 w-4 cursor-pointer" />
                    </label>
                  ))}

                  <div className="p-3 bg-primary/4 border border-primary/10 rounded-xl flex items-center justify-between mt-2">
                    <div>
                      <span className="text-[8.5px] text-muted-foreground uppercase font-bold">Trust Score</span>
                      <div className="text-xl font-black text-primary mt-0.5">{trustScore}%</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[8.5px] text-muted-foreground uppercase font-bold">Safety State</span>
                      <div className={`text-[11px] font-bold ${trustScore > 75 ? "text-emerald-500" : trustScore > 40 ? "text-amber-500" : "text-destructive"}`}>
                        {trustScore > 75 ? "Oxytocin Active" : trustScore > 40 ? "Alert Baseline" : "Cortisol Spike"}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SIMULATOR 5: Emotional Resonance Analyzer (New!) */}
              {activeTab === "emotional-response" && (
                <div className="space-y-3 text-xs">
                  <div className="space-y-1 select-none">
                    <span className="text-[9px] uppercase font-bold text-muted-foreground">Select Campaign Context:</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {campaignContexts.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setActiveCampaign(c.id)}
                          className={`p-1.5 rounded border text-left font-bold ${
                            activeCampaign === c.id ? "bg-primary/8 border-primary text-primary" : "bg-card border-border text-foreground/80 hover:bg-secondary"
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 select-none pt-2">
                    <span className="text-[9px] uppercase font-bold text-muted-foreground">Select Creative Emphasis:</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {creativeEmphases.map((e) => (
                        <button
                          key={e.id}
                          onClick={() => setActiveEmphasis(e.id)}
                          className={`p-1.5 rounded border text-left font-medium ${
                            activeEmphasis === e.id ? "bg-accent/8 border-accent text-accent" : "bg-card border-border text-foreground/75 hover:bg-secondary"
                          }`}
                        >
                          <div className="font-bold text-[10.5px]">{e.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Calculated outputs */}
                  <div className="p-3 bg-secondary/30 rounded-xl space-y-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Emotional Resonance Score:</span>
                      <span className="text-primary font-black text-sm">{resonanceScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Memory Imprint Likelihood:</span>
                      <span className="font-semibold text-foreground">{memoryImprint}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dopamine Activation:</span>
                      <span className="font-semibold text-foreground">{dopamineActivation}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SIMULATOR 3: Cognitive Load Simulator */}
              {activeTab === "decision-friction" && (
                <div className="space-y-4">
                  <div className="space-y-2 select-none">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-foreground">Number of Input Fields:</span>
                      <span className="font-black text-primary text-sm">{fieldsSlider} Fields</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={fieldsSlider}
                      onChange={(e) => setFieldsSlider(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="space-y-2.5 mt-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10.5px] font-bold text-muted-foreground">
                        <span>Working Memory Stress Meter:</span>
                        <span className={stressMeter > 75 ? "text-destructive" : stressMeter > 40 ? "text-amber-500" : "text-emerald-500"}>{stressMeter}%</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden border border-border/10">
                        <div className={`h-full rounded-full transition-all duration-200 ${stressMeter > 75 ? "bg-destructive" : stressMeter > 40 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${stressMeter}%` }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 select-none text-center text-xs">
                      <div className="p-2.5 bg-secondary/30 rounded-xl">
                        <span className="text-[8.5px] text-muted-foreground uppercase font-bold">Trust Indicator</span>
                        <div className={`text-base font-black mt-0.5 ${trustMeter > 70 ? "text-emerald-500" : trustMeter > 40 ? "text-amber-500" : "text-destructive"}`}>
                          {trustMeter}%
                        </div>
                      </div>
                      <div className="p-2.5 bg-secondary/30 rounded-xl">
                        <span className="text-[8.5px] text-muted-foreground uppercase font-bold">Abandonment Forecast</span>
                        <div className={`text-base font-black mt-0.5 ${abandonmentForecast > 60 ? "text-destructive" : "text-primary"}`}>
                          {abandonmentForecast}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SIMULATOR 4: Before vs After Creative Comparison */}
              {activeTab === "rural-intelligence" && (
                <div className="space-y-3 select-none">
                  <div className="flex justify-center">
                    <button onClick={() => setBeforeAfterToggle(false)} className={`px-2.5 py-1.5 rounded-l-lg text-[11px] font-semibold border transition ${!beforeAfterToggle ? "bg-primary text-white border-primary" : "bg-card text-muted-foreground border-border hover:bg-secondary"}`}>Cluttered flyer</button>
                    <button onClick={() => setBeforeAfterToggle(true)} className={`px-2.5 py-1.5 rounded-r-lg text-[11px] font-semibold border transition ${beforeAfterToggle ? "bg-primary text-white border-primary" : "bg-card text-muted-foreground border-border hover:bg-secondary"}`}>Optimized layout</button>
                  </div>

                  <div className="p-3.5 border border-border/80 bg-secondary/15 rounded-xl space-y-2 text-xs">
                    <p><strong>Clarity Alignment:</strong> {beforeAfterToggle ? activeData.beforeAfter.afterFriction : activeData.beforeAfter.beforeFriction}</p>
                    <div className="pt-2 border-t border-border/40 flex justify-between font-bold">
                      <span>Conversion Score:</span>
                      <span className={beforeAfterToggle ? "text-accent" : "text-destructive"}>{beforeAfterToggle ? activeData.beforeAfter.afterUplift : activeData.beforeAfter.beforeUplift}</span>
                    </div>
                  </div>
                  <div className="mt-2 p-2.5 bg-primary/4 border border-primary/10 rounded-xl text-center font-display font-black text-xs text-primary">
                    🔥 Predicted Outcome: {activeData.beforeAfter.upliftDiff}
                  </div>
                </div>
              )}
            </Card>

            {/* Expansible Case Studies Panel */}
            <Card className="p-5 flex flex-col justify-between bg-card">
              <div>
                <div className="border-b border-border pb-3 mb-4">
                  <h4 className="font-display font-black text-sm uppercase tracking-wider text-foreground">Verified Case Study Vault</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Bulleted consulting summaries of successful behavioral interventions.</p>
                </div>

                <div className="space-y-2 overflow-y-auto max-h-[220px] scrollbar-thin pr-1 select-none">
                  {caseStudies.map((study) => (
                    <div key={study.company} className="border border-border/60 rounded-xl overflow-hidden bg-card">
                      <details className="group">
                        <summary className="w-full px-4 py-3 flex items-center justify-between text-[11.5px] font-bold text-foreground cursor-pointer hover:bg-secondary/40 list-none [&::-webkit-details-marker]:hidden">
                          <span className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            {study.company} Onboarding Benchmark
                          </span>
                          <span className="transition-transform group-open:rotate-180">
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          </span>
                        </summary>
                        <div className="p-4 border-t border-border/50 bg-secondary/5 text-xs text-muted-foreground space-y-2 leading-relaxed">
                          <p><strong>Friction Challenge:</strong> {study.challenge}</p>
                          <p><strong>Behavioral Insight:</strong> {study.insight}</p>
                          <p><strong>Neural Principle:</strong> <span className="text-primary font-semibold">{study.principle}</span></p>
                          <p><strong>Execution:</strong> {study.execution}</p>
                          <p className="text-foreground font-semibold"><strong>Business Impact:</strong> {study.impact}</p>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Deep Theory Accordion Drawer (100% collapsed by default) */}
          <div className="border border-border/50 rounded-xl overflow-hidden bg-card select-none">
            <button
              onClick={() => setShowTheory(!showTheory)}
              className="w-full px-5 py-3 flex items-center justify-between text-xs font-bold text-muted-foreground hover:bg-secondary/40 transition"
            >
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary/70" />
                🔬 Expand Deep Neuroscience Theories & Verified Commercial Case Studies
              </span>
              {showTheory ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {showTheory && (
              <div className="px-6 pb-6 pt-2 border-t border-border/50 bg-secondary/5 space-y-4 text-xs text-muted-foreground leading-relaxed animate-fade-in">
                <div>
                  <h5 className="font-display font-bold text-foreground mb-1 text-[11px] uppercase tracking-wide flex items-center gap-1.5 text-primary">
                    <Zap className="h-4 w-4" /> Cognitive & Behavioral Theory Deep Dive
                  </h5>
                  <p>{activeData.deepTheory.sweller}</p>
                </div>
                <div className="border-t border-border/40 pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground text-[10.5px] uppercase tracking-wider flex items-center gap-1">
                      <Smile className="h-4 w-4 text-primary" /> Verified Commercial Benchmark
                    </span>
                    <span className="chip chip-gold text-[8.5px] py-0.5 px-2">{activeData.deepTheory.company}</span>
                  </div>
                  <p><strong>Friction Challenge:</strong> {activeData.deepTheory.challenge}</p>
                  <p><strong>Neurochemical Solution:</strong> {activeData.deepTheory.solution}</p>
                  <p className="text-foreground font-semibold"><strong>Business Impact:</strong> {activeData.deepTheory.impact}</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
