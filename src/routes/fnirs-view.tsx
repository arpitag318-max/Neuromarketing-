import React from "react";
import { 
  Brain, ShieldCheck, AlertTriangle, Heart, Database, TrendingUp, 
  Activity, Target, Zap, Eye, Award, Sliders, EyeOff, BarChart3, HelpCircle, Sparkles
} from "lucide-react";

export function FnirsStorytellingView({ tool, activeTheme }: { 
  tool: any; 
  activeTheme: any;
}) {
  // ═══════════════════════════════════════════
  // 1. HYPOTHETICAL BEHAVIORAL SIGNALS DATASET (SECTION 2)
  // ═══════════════════════════════════════════
  const hypotheticalSignals = [
    {
      title: "Cognitive Workload",
      tag: "Processing Strain",
      human: "Active prefrontal cortex oxygenation levels reflect mental strain and layout complexity.",
      marketing: "Simplifying interest grids and reducing multi-variable columns in financial calculators lowers cognitive processing burden.",
      color: "border-rose-500/40 text-rose-450 bg-rose-950/20",
      icon: Brain
    },
    {
      title: "Attention & Engagement",
      tag: "Focus Durability",
      human: "Persistent prefrontal blood flow shows sustained focus on campaign assets or forms.",
      marketing: "Placing key promotional CTAs in areas of high visual interest helps sustain primary focus pathways.",
      color: "border-indigo-500/40 text-indigo-300 bg-indigo-950/20",
      icon: Eye
    },
    {
      title: "Emotional Response",
      tag: "Motivation Valence",
      human: "Prefrontal hemispheric oxygenation asymmetry indicates positive approach vs avoidance bias.",
      marketing: "Empowering narratives showing family growth and agricultural achievements trigger early positive approach motivations.",
      color: "border-purple-500/40 text-purple-400 bg-purple-950/20",
      icon: Heart
    },
    {
      title: "Trust Formation",
      tag: "Subconscious Safety",
      human: "Cortical integration activity correlates with deep-seated brand trust and cooperation confidence.",
      marketing: "Visible relationship manager photos and localized security icons reinforce borrower trust and reduce onboarding stress.",
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-950/20",
      icon: ShieldCheck
    },
    {
      title: "Decision Fatigue",
      tag: "Metabolic Depletion",
      human: "Declining prefrontal oxygen levels indicate exhaustion during repetitive decision workflows.",
      marketing: "Progressive, single-task form steps prevent mental fatigue and reduce checkout abandonment rates.",
      color: "border-rose-500/40 text-rose-400 bg-rose-955/20",
      icon: Activity
    },
    {
      title: "Risk & Uncertainty Processing",
      tag: "Hesitation Marker",
      human: "Localized oxygenation spikes reveal subconscious uncertainty when evaluating complex terms.",
      marketing: "Transparent pricing disclaimers and simple interest rate calculations prevent decision hesitation.",
      color: "border-amber-500/40 text-amber-400 bg-amber-955/20",
      icon: AlertTriangle
    },
    {
      title: "Financial Confidence",
      tag: "Certainty Level",
      human: "Stable prefrontal blood oxygenation indicates borrower certainty and interface comfort.",
      marketing: "Real-time repayment calculator feedback helps users feel in control of their future commitments.",
      color: "border-blue-500/40 text-blue-300 bg-blue-950/20",
      icon: TrendingUp
    },
    {
      title: "Social Interaction Comfort",
      tag: "Relational Stress",
      human: "Prefrontal hemodynamic changes capture relational stress during face-to-face transactions.",
      marketing: "Quiet consultation spaces and assisted onboarding reduce physical branch cabin anxiety.",
      color: "border-stone-500/40 text-stone-300 bg-stone-900/20",
      icon: Award
    }
  ];

  // ═══════════════════════════════════════════
  // 2. HEMODYNAMIC SIGNAL INTERPRETATIONS (SECTION 3)
  // ═══════════════════════════════════════════
  const simulatedWaves = [
    {
      name: "OXYGENATED HEMOGLOBIN (HbO)",
      range: "650 - 900 nm",
      meaning: "Cerebral activation and focus.",
      interpretation: "Indicates a strong surge of oxygen-rich blood to active prefrontal regions, showing high engagement or task focus.",
      color: "#ef4444",
      signalPath: "M 0,35 Q 30,10 60,10 T 120,38 T 180,40 T 240,40 T 280,40"
    },
    {
      name: "DEOXYGENATED HEMOGLOBIN (HbR)",
      range: "650 - 900 nm",
      meaning: "Metabolic consumption.",
      interpretation: "Tracks oxygen depletion in active tissue, verifying that prefrontal clusters are actively processing complex decisions.",
      color: "#3b82f6",
      signalPath: "M 0,20 Q 30,42 60,40 T 120,22 T 180,20 T 240,20 T 280,20"
    },
    {
      name: "TOTAL HEMOGLOBIN (HbT)",
      range: "HbO + HbR",
      meaning: "Cerebral blood volume.",
      interpretation: "Reflects overall changes in local blood volume, indicating metabolic supply shifts in prefrontal cortex layers.",
      color: "#a855f7",
      signalPath: "M 0,30 Q 40,15 80,18 T 160,28 T 240,30 T 280,30"
    },
    {
      name: "HEMODYNAMIC DELAY",
      range: "4 - 6s Latency",
      meaning: "Physiological time lag.",
      interpretation: "The characteristic lag between conscious neural firing and the resulting oxygenated blood flow changes.",
      color: "#f59e0b",
      signalPath: "M 0,40 L 40,40 Q 80,15 120,15 T 200,38 T 280,40"
    }
  ];

  // ═══════════════════════════════════════════
  // 3. HYPOTHETICAL MAHINDRA SCENARIOS (SECTION 4)
  // ═══════════════════════════════════════════
  const hypotheticalScenarios = [
    {
      title: "Digital Loan Onboarding Optimization",
      tag: "UX Optimization",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fnirs_headset_participant.png",
      challenge: "Borrowers experience sudden prefrontal stress during complex form fields, leading to onboarding funnel abandonment.",
      reveal: "fNIRS telemetry maps real-time prefrontal oxygenation levels during each step of the mobile app flow.",
      insight: "Prefrontal oxygenation demand spikes by 45% during manual agricultural income calculations.",
      optimize: "Replace complex manual calculations with simple visual sliders and harvest-linked crop yield presets.",
      impact: "Reduced cognitive friction and higher completion rates."
    },
    {
      title: "Rural Consumer Research",
      tag: "Market Research",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fnirs_field_testing.png",
      challenge: "Traditional surveys struggle to capture the true, unstated concerns and cognitive barriers of rural consumers.",
      reveal: "Portable, lightweight fNIRS headsets map prefrontal engagement and trust levels in authentic village markets.",
      insight: "Rural borrowers demonstrate high prefrontal avoidance activation when presented with jargon-heavy terms.",
      optimize: "Redesign educational materials to use local colloquialisms, simple graphics, and clear, localized stories.",
      impact: "Stronger consumer insights and improved brand trust."
    },
    {
      title: "Field Agent Trust Assessment",
      tag: "Field Operations",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fnirs_field_testing.png",
      challenge: "Borrowers experience subconscious stress and skepticism during face-to-face field agent lending interactions.",
      reveal: "Mobile fNIRS headbands monitor customer trust response and comfort levels in authentic field consultation settings.",
      insight: "Frontal alpha and hemodynamic trust indices stabilize when agents present transparent, print-verified EMI tables.",
      optimize: "Equip field agents with simplified print visual aids and transparent, interactive lending dashboards.",
      impact: "Improved trust, transparency, and stronger relationships."
    },
    {
      title: "Branch Experience Evaluation",
      tag: "Physical Space",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eeg_branch_experience.png",
      challenge: "Customers show subtle anxiety, tension, or cognitive fatigue during long, formal branch consultation visits.",
      reveal: "Portable headbands measure ambient prefrontal stress and comfort levels across different physical cabin designs.",
      insight: "Loud branch offices and formal sales desks elevate stress indicators compared to quiet advisory corners.",
      optimize: "Redesign consultation spaces to include quiet seating zones, warm wooden accents, and soft branch lighting.",
      impact: "Better customer experience and higher closing rates."
    },
    {
      title: "Financial Literacy Program Testing",
      tag: "CSR & Education",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fmri_memory.png",
      challenge: "Standard financial literacy presentations fail to keep participants engaged or ensure long-term retention.",
      reveal: "fNIRS tracks prefrontal attention persistence and memory encoding metrics during training programs.",
      insight: "Story-driven regional narrative videos maintain high prefrontal engagement compared to bulleted text slides.",
      optimize: "Re-engineer literacy content into interactive, visual stories based on local household farming scenarios.",
      impact: "Higher digital adoption, deeper comprehension, and improved repayment discipline."
    },
    {
      title: "Loan Communication Effectiveness",
      tag: "Creative Strategy",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eeg_tvc_testing.png",
      challenge: "High-budget regional marketing campaigns experience visual ignore zones and fail to build emotional trust.",
      reveal: "fNIRS maps motivation and approach metrics during second-by-second exposure to localized creative concepts.",
      insight: "Subconscious motivation peaks during family-oriented community scenes, but declines during numerical pricing disclaimers.",
      optimize: "Seamlessly weave product specs and brand logos into high-engagement emotional storytelling peaks.",
      impact: "Enhanced communication effectiveness and increased brand recall."
    },
    {
      title: "Insurance Cross-Sell Evaluation",
      tag: "Product Bundling",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eeg_brain_engagement.png",
      challenge: "Loan applicants experience cognitive overload and immediate rejection biases when presented with cross-sell options.",
      reveal: "Prefrontal metabolic monitoring tracks decision fatigue and choice rejection parameters during the loan checkout phase.",
      insight: "Bundling insurance options at the final step exceeds the prefrontal processing limit, causing immediate avoidance.",
      optimize: "Introduce insurance options progressively as a protective value add earlier in the application journey.",
      impact: "Higher digital adoption and improved cross-sell attachment."
    },
    {
      title: "Customer Journey Friction Analysis",
      tag: "Journey Diagnostics",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eeg_kyc_friction.png",
      challenge: "Friction points in multi-stage loan applications cause drop-offs at various steps of the transaction journey.",
      reveal: "Continuous prefrontal oxygenation monitoring highlights exact layout screens that trigger mental blockages.",
      insight: "Document upload screens without immediate progress indicators trigger high cognitive stress events.",
      optimize: "Streamline forms, add real-time status bars, and place supportive customer care buttons near complex inputs.",
      impact: "Reduced cognitive friction and higher overall conversion rates."
    }
  ];

  // ═══════════════════════════════════════════
  // 4. OUTPUTS GENERATED (SECTION 5)
  // ═══════════════════════════════════════════
  const outputsGenerated = [
    {
      title: "Cognitive Load Score",
      description: "Measures active prefrontal processing load to detect visual/form layout strain.",
      score: 85,
      label: "HIGH LOAD DETECTED",
      color: "bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"
    },
    {
      title: "Trust Index",
      description: "Tracks prefrontal integration associated with cooperation, certainty, and emotional comfort.",
      score: 90,
      label: "CRITICAL MEASURE",
      color: "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]"
    },
    {
      title: "Attention Persistence Score",
      description: "Measures sustained hemodynamic activation during interactive tasks or video exposure.",
      score: 75,
      label: "STABLE FOCUS",
      color: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
    },
    {
      title: "Emotional Response Indicators",
      description: "Evaluates approach vs avoidance motivation using frontal hemispheric oxygenation asymmetry.",
      score: 80,
      label: "OPTIMIZED MOTIVATION",
      color: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
    },
    {
      title: "Decision Fatigue Assessment",
      description: "Identifies metabolic depletion cycles indicating task-induced exhaustion.",
      score: 65,
      label: "MANAGED DEBILIATION",
      color: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
    },
    {
      title: "Uncertainty Detection",
      description: "Traces prefrontal localized oxygenation drops during high-ambiguity decision points.",
      score: 85,
      label: "UNRESOLVED HESITATION",
      color: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]"
    },
    {
      title: "Behavioral Insights",
      description: "Contextual output translating hemodynamic response states into borrower behaviors.",
      score: 95,
      label: "HIGH FIDELITY",
      color: "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
    },
    {
      title: "Optimization Recommendations",
      description: "Actionable UX and communication edits driven by subconscious stress profiles.",
      score: 90,
      label: "DIRECTLY APPLICABLE",
      color: "bg-stone-500 shadow-[0_0_8px_rgba(120,120,120,0.4)]"
    }
  ];

  // ═══════════════════════════════════════════
  // 5. BUSINESS IMPACTS (SECTION 6)
  // ═══════════════════════════════════════════
  const businessImpacts = [
    {
      title: "Reduced Cognitive Friction",
      insight: "Eliminating complex input parameters in calculators prevents user abandonment.",
      icon: Target,
      color: "border-rose-500/40 text-rose-400 bg-rose-955/20"
    },
    {
      title: "Improved Trust & Transparency",
      insight: "Weaving supportive visual safeguards builds strong, cooperative relationships.",
      icon: ShieldCheck,
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-950/20"
    },
    {
      title: "Better Customer Experience",
      insight: "Redesigning physical offices and apps ensures stable comfort markers.",
      icon: Heart,
      color: "border-purple-500/40 text-purple-400 bg-purple-950/20"
    },
    {
      title: "Higher Digital Adoption",
      insight: "Guided vernacular flows ease onboarding anxiety for underserved demographics.",
      icon: TrendingUp,
      color: "border-blue-500/40 text-blue-300 bg-blue-950/20"
    },
    {
      title: "Enhanced Communication",
      insight: "Aligning creative reveals with attention peaks guarantees ad memorability.",
      icon: Zap,
      color: "border-cyan-500/40 text-cyan-400 bg-cyan-950/20"
    },
    {
      title: "Stronger Consumer Insights",
      insight: "Bypassing subjective survey responses uncovers real agricultural desires.",
      icon: Database,
      color: "border-amber-500/40 text-amber-400 bg-amber-955/20"
    }
  ];

  return (
    <div className="col-span-12 space-y-24 pb-12 relative font-sans text-[#E5E7EB] bg-background">
      {/* Soft crimson/infrared subtle radial glows representing prefrontal activity */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#dc2626]/2 via-background to-background pointer-events-none rounded-3xl -z-10 animate-fade-in" />
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] bg-radial from-red-500/2 to-transparent pointer-events-none blur-3xl -z-10 animate-pulse" />

      {/* ─── SECTION 1: ENTERPRISE HERO INTRO ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#090809]/95 border border-stone-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden select-none">
        <div className="absolute top-0 right-0 h-96 w-96 bg-radial from-[#dc2626]/10 to-transparent pointer-events-none blur-3xl animate-pulse" />
        
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/25 text-red-300 text-[10px] font-black uppercase tracking-wider">
              <Brain className="h-3.5 w-3.5 text-red-400" /> CNS Lightweight Imaging Technique
            </div>
            <h1 className="font-display font-black text-3xl md:text-4xl text-white uppercase tracking-tight leading-tight">
              Functional Near-Infrared Spectroscopy (fNIRS)
            </h1>
            <p className="text-sm text-[#E5E7EB] font-medium leading-relaxed max-w-xl">
              Functional Near-Infrared Spectroscopy (fNIRS) is a non-invasive neuroimaging technique that measures changes in blood oxygenation within the brain. By tracking oxygenated and deoxygenated blood flow, fNIRS provides insights into cognitive workload, attention, emotional processing, trust, and decision-making in real-world environments.
            </p>
          </div>

          {/* Business Relevance block incorporated */}
          <div className="bg-[#121011] border border-stone-850 p-4 rounded-2xl">
            <span className="text-[8.5px] font-black uppercase text-red-400 tracking-wider block mb-1">Business Relevance</span>
            <p className="text-[11.5px] text-[#CBD5E1] leading-relaxed font-semibold">
              fNIRS helps organizations understand how consumers process information beyond traditional surveys. It identifies moments of confusion, stress, trust, and engagement, enabling businesses to optimize communication, customer experiences, and decision-making journeys using neuroscience-backed insights.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 border-t border-stone-850 pt-5">
            <div>
              <div className="text-[9px] uppercase font-black text-[#FF758F] tracking-wider">What It Measures</div>
              <div className="text-xs font-black text-white mt-1 uppercase tracking-wide">Cerebral Oxygenation</div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-[#CBD5E1] tracking-wider">Best Use</div>
              <div className="text-xs font-black text-red-300 mt-1 uppercase tracking-wide">Real-world Testing</div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-[#CBD5E1] tracking-wider">Business Relevance</div>
              <div className="text-xs font-black text-white mt-1 uppercase tracking-wide leading-tight">Workload & Trust</div>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl border border-stone-850 aspect-[4/3] group">
          <img 
            src="/images/fnirs_headset_participant.png" 
            alt="Semi-urban consumer wearing lightweight fNIRS headband during mobile app usability testing" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 filter brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-6">
            <span className="text-[9px] font-black uppercase text-amber-400 tracking-wider mb-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" /> Simulated Deployment Scenario
            </span>
            <h3 className="font-display font-black text-sm text-white uppercase tracking-wide">
              Real-world Interface Diagnostics
            </h3>
            <p className="text-[11px] text-[#E5E7EB] mt-1 leading-normal font-medium max-w-md">
              fNIRS optical headbands enable research teams to map prefrontal hemodynamics during active borrower interactions directly inside branch settings.
            </p>
          </div>
        </div>
      </div>

      {/* ─── SECTION 2: WHAT IT MEASURES (BENTO GRID) ─── */}
      <div className="space-y-6 select-none">
        <div className="max-w-[1400px] w-full flex flex-col lg:flex-row gap-6 justify-between items-start">
          <div className="flex-1">
            <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
              Biometric Mapping
            </span>
            <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
              What fNIRS Potentially Measures
            </h2>
            <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[800px] mt-2 block font-sans">
              Analyzing cognitive workload, attention, stress, and trust metrics within the prefrontal cortex during actual consumer journeys.
            </p>
          </div>
          
          {/* Highlighted Insight Card (Key Advantage) */}
          <div className="w-full lg:w-[420px] bg-gradient-to-br from-[#dc2626]/10 to-transparent border border-red-500/25 p-5 rounded-3xl backdrop-blur-sm shadow-xl">
            <span className="text-[8.5px] font-black uppercase text-red-400 tracking-wider flex items-center gap-1.5 mb-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Key Advantage
            </span>
            <p className="text-[11px] text-[#CBD5E1] leading-relaxed font-semibold">
              Unlike traditional laboratory-based neuroimaging tools, fNIRS is portable and suitable for real-world environments, making it ideal for studying authentic consumer behavior in branches, field interactions, and rural markets.
            </p>
          </div>
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

      {/* ─── SECTION 3: HEMODYNAMIC SIGNAL INTERPRETATION ─── */}
      <div className="space-y-6 select-none border-t border-stone-200/20 pt-1">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            Hemodynamic Interpretation
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            fNIRS Hemodynamic Response Interpretation
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            How optical light scatter calculates oxygenated and deoxygenated hemoglobin ratios to identify subconscious user interest and mental strain.
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
                <span className="text-[9.5px] font-mono font-black text-red-400 bg-red-955 border border-red-500/25 px-2 py-0.5 rounded-md">{wave.range}</span>
              </div>

              {/* Wave SVG representation */}
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
                  <span className="text-[7.5px] font-black uppercase text-rose-500 tracking-widest block">Hemodynamic State</span>
                  <div className="text-xs font-black text-white mt-1">{wave.meaning}</div>
                </div>
                <div>
                  <span className="text-[7.5px] font-black uppercase text-[#94A3B8] tracking-widest block">Metabolic Diagnosis</span>
                  <p className="text-[10.5px] leading-relaxed text-[#CBD5E1] font-semibold mt-1">{wave.interpretation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION 4: MAHINDRA FINANCE USE CASES (DEPLOYMENT SCENARIOS) ─── */}
      <div className="space-y-6 select-none border-t border-stone-200/20 pt-1">
        <div className="max-w-[1400px] w-full flex flex-col lg:flex-row gap-6 justify-between items-start">
          <div className="flex-1">
            <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
              Deployment Scenarios
            </span>
            <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
              Potential fNIRS Deployment Scenarios<br className="hidden lg:inline" /> for Mahindra&nbsp;Finance
            </h2>
            <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
              Practical methodologies showing how lightweight prefrontal monitoring can optimize digital conversions and field agent trust across regional markets.
            </p>
          </div>

          {/* Best Use Cases summary row */}
          <div className="w-full lg:w-[480px] bg-[#0c0b0c] border border-stone-800 p-5 rounded-3xl shadow-xl flex flex-wrap gap-2">
            <span className="text-[8px] font-black uppercase text-stone-400 tracking-wider w-full mb-1">Method Best Use Cases</span>
            {["UX Testing", "Product Eval", "Field Agent Interactions", "Trust Studies", "Rural Research", "Onboarding Diagnostics", "Ad Campaigns"].map((tag, idx) => (
              <span key={idx} className="text-[8.5px] font-bold uppercase px-2.5 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-300">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 3-Column Grid representing scenario cards */}
        <div className="grid grid-cols-12 gap-6 items-stretch font-sans pt-2">
          {hypotheticalScenarios.map((use, idx) => (
            <div 
              key={idx}
              className={`bg-[#0c0b0c] border border-stone-855 rounded-3xl p-5 md:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between hover:border-stone-700 hover:bg-[#121011] transition-all duration-300 group ${use.style}`}
            >
              <div className="absolute top-0 right-0 h-40 w-40 bg-radial from-[#dc2626]/4 to-transparent pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-stone-850 pb-2.5">
                  <span className="text-[8.5px] font-black uppercase text-[#FF758F] bg-[#dc2626]/15 px-2.5 py-0.5 rounded border border-[#dc2626]/30">
                    {use.tag}
                  </span>
                  <span className="text-[7.5px] font-mono text-stone-400 font-bold">SCENARIO {(idx + 1).toString().padStart(2, "0")}</span>
                </div>

                {/* Aspect-controlled visual */}
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

                {/* Core Scenario Details */}
                <div className="grid gap-4 pt-2 border-t border-stone-850 grid-cols-1">
                  <div className="bg-[#121011] p-3 rounded-xl border border-stone-850">
                    <span className="text-[8px] font-black text-rose-450 uppercase tracking-widest block">Marketing Challenge</span>
                    <p className="text-[10.5px] leading-relaxed text-[#E5E7EB] font-semibold mt-1">{use.challenge}</p>
                  </div>
                  <div className="bg-[#121011] p-3 rounded-xl border border-stone-850">
                    <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest block">What fNIRS Telemetry Reveals</span>
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

              {/* Expected Business Impact Banner */}
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

      {/* ─── SECTION 5: OUTPUTS GENERATED SCORECARDS ─── */}
      <div className="space-y-6 select-none border-t border-stone-200/20 pt-1">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            Outputs Generated
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            Biometric telemetry outputs
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            Key indicators and scoring matrices derived from prefrontal oxygenation changes to evaluate layout success.
          </p>
        </div>

        {/* 8 Scorecards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 font-sans pt-2">
          {outputsGenerated.map((item, idx) => (
            <div key={idx} className="bg-[#0c0b0c] border border-stone-805 hover:border-stone-700 transition-all duration-300 rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[170px] group animate-fade-in">
              <div className="space-y-2">
                <span className="text-[8px] font-black uppercase text-[#FF758F] tracking-widest block">fNIRS Metric</span>
                <h4 className="font-display font-black text-xs text-white uppercase tracking-wide">{item.title}</h4>
                <p className="text-[10px] leading-relaxed text-[#E5E7EB] font-medium">
                  {item.description}
                </p>
              </div>
              <div className="space-y-1 mt-4">
                <div className="flex justify-between text-[7.5px] font-mono font-bold text-[#CBD5E1] uppercase">
                  <span>METRIC FIDELITY</span>
                  <span>{item.label} ({item.score}%)</span>
                </div>
                <div className="w-full h-1.5 bg-stone-900 border border-stone-800 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.score}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION 6: BUSINESS IMPACT KPI CARDS ─── */}
      <div className="space-y-6 select-none border-t border-stone-200/20 pt-1">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            Business Impact
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            Subconscious Business Optimization KPIs
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            Measurable organizational benefits gained by integrating prefrontal hemodynamic feedback loops into design pipelines.
          </p>
        </div>

        {/* 6 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans pt-2">
          {businessImpacts.map((takeaway, idx) => {
            const IconComp = takeaway.icon;
            return (
              <div 
                key={idx}
                className="bg-[#0c0b0c] border border-stone-800 rounded-3xl p-5 hover:border-stone-700 transition-all duration-300 shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-white/2 to-transparent pointer-events-none" />
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center border-b border-stone-850 pb-2.5">
                    <h3 className="font-display font-black text-sm text-white uppercase tracking-wider">
                      {takeaway.title}
                    </h3>
                    <div className={`p-1.5 rounded-lg border ${takeaway.color} flex items-center justify-center`}>
                      <IconComp className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-[10.5px] text-[#CBD5E1] leading-relaxed font-semibold">
                    {takeaway.insight}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
