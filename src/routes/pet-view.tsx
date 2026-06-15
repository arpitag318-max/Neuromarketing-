import React from "react";
import { 
  Brain, ShieldCheck, AlertTriangle, Heart, Database, TrendingUp, 
  Zap, Award, Activity, Sparkles, Scale, RefreshCw, BarChart2
} from "lucide-react";

export function PetStorytellingView({ tool, activeTheme }: { 
  tool: any; 
  activeTheme: any;
}) {
  // ═══════════════════════════════════════════
  // 1. BEHAVIORAL SIGNALS PET CAN POTENTIALLY DETECT (SECTION 2)
  // ═══════════════════════════════════════════
  const behavioralSignals = [
    {
      label: "NEUROCHEMICAL INDICATOR",
      indicator: "REWARD RESPONSE",
      signal: "Dopamine release increases during perceived gains and positive outcomes.",
      implication: "Products associated with anticipation and reward may trigger stronger consumer engagement.",
      badgeColor: "border-purple-500/40 text-purple-400 bg-purple-950/20",
      signalColor: "text-cyan-400 bg-cyan-950/20 border-cyan-800/30",
      insightColor: "text-emerald-400 bg-emerald-950/20 border-emerald-800/30",
      icon: TargetIndicator
    },
    {
      label: "MOTIVATION SIGNAL",
      indicator: "APPROACH BEHAVIOR",
      signal: "Mesolimbic activity indicates willingness to pursue desired outcomes.",
      implication: "Strong motivational activation may predict conversion likelihood.",
      badgeColor: "border-purple-500/40 text-purple-400 bg-purple-950/20",
      signalColor: "text-cyan-400 bg-cyan-950/20 border-cyan-800/30",
      insightColor: "text-emerald-400 bg-emerald-950/20 border-emerald-800/30",
      icon: Zap
    },
    {
      label: "RISK EVALUATION",
      indicator: "UNCERTAINTY PROCESSING",
      signal: "Altered dopamine-serotonin balance affects risk tolerance.",
      implication: "Complex financial products may trigger avoidance behaviors.",
      badgeColor: "border-purple-500/40 text-purple-400 bg-purple-950/20",
      signalColor: "text-cyan-400 bg-cyan-950/20 border-cyan-800/30",
      insightColor: "text-emerald-400 bg-emerald-950/20 border-emerald-800/30",
      icon: AlertTriangle
    },
    {
      label: "EMOTIONAL VALUATION",
      indicator: "AFFECTIVE RESPONSE",
      signal: "Serotonergic systems influence emotional interpretation.",
      implication: "Brand trust and emotional resonance can shape purchase decisions.",
      badgeColor: "border-purple-500/40 text-purple-400 bg-purple-950/20",
      signalColor: "text-cyan-400 bg-cyan-950/20 border-cyan-800/30",
      insightColor: "text-emerald-400 bg-emerald-950/20 border-emerald-800/30",
      icon: Heart
    },
    {
      label: "MEMORY FORMATION",
      indicator: "SYNAPTIC ENCODING",
      signal: "SV2A activity reflects long-term memory consolidation.",
      implication: "Highly memorable brand experiences may produce stronger retention.",
      badgeColor: "border-purple-500/40 text-purple-400 bg-purple-950/20",
      signalColor: "text-cyan-400 bg-cyan-950/20 border-cyan-800/30",
      insightColor: "text-emerald-400 bg-emerald-950/20 border-emerald-800/30",
      icon: Database
    },
    {
      label: "COGNITIVE CONTROL",
      indicator: "DECISION GOVERNANCE",
      signal: "Prefrontal-striatal pathways regulate impulse control.",
      implication: "Decision friction may emerge when cognitive demands exceed capacity.",
      badgeColor: "border-purple-500/40 text-purple-400 bg-purple-950/20",
      signalColor: "text-cyan-400 bg-cyan-950/20 border-cyan-800/30",
      insightColor: "text-emerald-400 bg-emerald-950/20 border-emerald-800/30",
      icon: Brain
    }
  ];

  // Helper custom icon component for Reward Response
  function TargetIndicator(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    );
  }

  // ═══════════════════════════════════════════
  // 2. POTENTIAL PET DEPLOYMENT SCENARIOS (SECTION 3)
  // ═══════════════════════════════════════════
  const deploymentScenarios = [
    {
      id: "SCENARIO 01",
      title: "CONSUMER REWARD ANALYSIS",
      challenge: "Understanding why some promotional offers generate stronger engagement than others.",
      reveals: "Dopamine displacement mapping may identify reward prediction signals.",
      insight: "Unexpected incentives may generate stronger neurochemical responses.",
      optimization: "Design campaigns around anticipation and variable reward structures.",
      impact: "Higher engagement and stronger emotional attachment.",
      image: "/images/pet_scenario1.png"
    },
    {
      id: "SCENARIO 02",
      title: "TRUST & FINANCIAL DECISION MAKING",
      challenge: "Consumers hesitate during high-value financial commitments.",
      reveals: "Serotonergic and dopaminergic activity may reveal uncertainty thresholds.",
      insight: "Trust indicators influence valuation and risk acceptance.",
      optimization: "Simplify trust communication and increase transparency.",
      impact: "Improved confidence and decision completion rates.",
      image: "/images/pet_scenario2.png"
    },
    {
      id: "SCENARIO 03",
      title: "LOYALTY & RETENTION ANALYSIS",
      challenge: "Understanding why customers remain loyal to certain brands.",
      reveals: "Reward circuitry and memory systems may explain preference persistence.",
      insight: "Repeated positive experiences strengthen neurochemical associations.",
      optimization: "Create consistent reinforcement experiences.",
      impact: "Higher retention and lifetime value.",
      image: "/images/pet_scenario3.png"
    }
  ];

  // ═══════════════════════════════════════════
  // 3. SCIENTIFIC OUTPUTS GENERATED BY PET (SECTION 4)
  // ═══════════════════════════════════════════
  const scientificOutputs = [
    { title: "METABOLIC MAPS", desc: "Measures regional glucose utilization and neural energy demand." },
    { title: "NEUROTRANSMITTER PROFILES", desc: "Tracks dopamine, serotonin, and other chemical systems." },
    { title: "RECEPTOR DISTRIBUTION MAPS", desc: "Visualizes receptor density and availability." },
    { title: "FUNCTIONAL NETWORKS", desc: "Maps synchronized molecular activity across brain systems." },
    { title: "REGIONAL ACTIVITY ANALYSIS", desc: "Quantifies activity within specific anatomical regions." },
    { title: "REWARD PROCESSING MAPS", desc: "Identifies neurochemical responses to positive outcomes." },
    { title: "EMOTIONAL VALUATION INSIGHTS", desc: "Maps affective processing and emotional significance." },
    { title: "MEMORY SYSTEM ANALYSIS", desc: "Measures synaptic density associated with learning and retention." }
  ];

  // ═══════════════════════════════════════════
  // 4. EXECUTIVE SCORECARD (SECTION 5)
  // ═══════════════════════════════════════════
  const executiveTakeaways = [
    {
      category: "DEPLOYMENT SETUP",
      title: "BEST ENVIRONMENT FOR PET",
      desc: "PET is optimally deployed in advanced research hospitals and academic imaging centers equipped with cyclotron infrastructure.",
      score: 90,
      label: "HIGH",
      color: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
    },
    {
      category: "OPERATIONAL FIT",
      title: "NEUROCHEMICAL PRECISION",
      desc: "Provides unmatched molecular specificity unavailable through EEG, fMRI, or fNIRS.",
      score: 98,
      label: "CRITICAL",
      color: "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
    },
    {
      category: "RESOURCE SCALE",
      title: "COST & SCALABILITY",
      desc: "High infrastructure and radiochemistry requirements limit deployment scale.",
      score: 35,
      label: "LOW",
      color: "bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"
    },
    {
      category: "SCIENTIFIC VALUE",
      title: "GROUND TRUTH VALIDATION",
      desc: "Acts as the gold standard for validating neurochemical theories.",
      score: 95,
      label: "EXCEPTIONAL",
      color: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
    },
    {
      category: "BUSINESS APPLICATION",
      title: "CONSUMER INSIGHT POTENTIAL",
      desc: "Can reveal reward, trust, and motivation mechanisms underlying decision-making.",
      score: 88,
      label: "HIGH",
      color: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
    },
    {
      category: "KEY LIMITATIONS",
      title: "TEMPORAL CONSTRAINTS",
      desc: "Cannot capture millisecond-level neural dynamics.",
      score: 40,
      label: "LIMITED",
      color: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
    },
    {
      category: "COMPLIANCE & ETHICS",
      title: "RADIATION SAFETY",
      desc: "Requires strict clinical governance, informed consent, and regulatory oversight.",
      score: 92,
      label: "MANAGED",
      color: "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
    }
  ];

  return (
    <div className="col-span-12 space-y-24 pb-12 relative font-sans text-foreground bg-background">
      {/* Subtle purple radial glow representing PET molecular tracer activity */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/2 via-background to-background pointer-events-none rounded-3xl -z-10 animate-fade-in" />
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] bg-radial from-purple-500/3 to-transparent pointer-events-none blur-3xl -z-10 animate-pulse" />

      {/* ─── PAGE 1: HERO SECTION ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#050505] border border-stone-850 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden select-none">
        <div className="absolute top-0 right-0 h-96 w-96 bg-radial from-purple-500/10 to-transparent pointer-events-none blur-3xl animate-pulse" />
        
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-[10px] font-black uppercase tracking-wider">
              <Brain className="h-3.5 w-3.5 text-purple-400" /> CENTRAL NERVOUS SYSTEM TECHNIQUE
            </div>
            <h1 className="font-display font-black text-3xl md:text-4xl text-white uppercase tracking-tight leading-tight">
              POSITRON EMISSION TOMOGRAPHY (PET)
            </h1>
            <p className="text-sm text-stone-300 font-medium leading-relaxed max-w-xl">
              PET reveals the brain's molecular and neurochemical architecture by tracking radioactive tracers that map metabolism, neurotransmitter activity, receptor occupancy, and reward circuitry in real time.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 border-t border-stone-850 pt-5">
            <div>
              <div className="text-[9px] uppercase font-black text-purple-450 tracking-wider">WHAT IT MEASURES</div>
              <div className="text-xs font-black text-white mt-1 uppercase tracking-wide">MOLECULAR ACTIVITY</div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-cyan-400 tracking-wider">BEST USE</div>
              <div className="text-xs font-black text-purple-300 mt-1 uppercase tracking-wide">NEUROCHEMICAL ANALYSIS</div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-emerald-400 tracking-wider">BUSINESS RELEVANCE</div>
              <div className="text-xs font-black text-white mt-1 uppercase tracking-wide leading-tight">CONSUMER REWARD SCIENCE</div>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl border border-stone-850 aspect-[4/3] group">
          <img 
            src="/images/pet_hero.png" 
            alt="Individual undergoing PET scan with glowing network overlay in enterprise research lab" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 filter brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-6">
            <span className="text-[9px] font-black uppercase text-purple-455 tracking-wider mb-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-ping" /> SIMULATED DEPLOYMENT SCENARIO
            </span>
            <h3 className="font-display font-black text-sm text-white uppercase tracking-wide">
              REWARD PATHWAY RESEARCH
            </h3>
            <p className="text-[11px] text-[#E5E7EB] mt-1 leading-normal font-medium max-w-md">
              PET may reveal dopamine-driven valuation patterns underlying financial decision-making, trust formation, and product preference.
            </p>
          </div>
        </div>
      </div>

      {/* ─── PAGE 2: BEHAVIORAL SIGNALS PET CAN POTENTIALLY DETECT ─── */}
      <div className="space-y-6 select-none">
        <div className="max-w-[1400px] w-full flex flex-col lg:flex-row gap-6 justify-between items-start">
          <div className="flex-1">
            <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
              Neurochemical Indicators
            </span>
            <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
              Behavioral Signals PET Can Potentially Detect
            </h2>
            <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
              Understanding the neurochemical drivers behind trust, reward, motivation, risk perception, emotional valuation, and consumer decision-making.
            </p>
          </div>
          
          <div className="w-full lg:w-[380px] bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/25 p-5 rounded-3xl backdrop-blur-sm shadow-xl">
            <span className="text-[8.5px] font-black uppercase text-purple-450 tracking-wider flex items-center gap-1.5 mb-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Scientific Signal Precision
            </span>
            <p className="text-[11px] text-[#243447] leading-relaxed font-semibold">
              PET enables tracing of active receptor dynamics at the synapse, providing direct observation of chemical changes like dopamine release during decision pathways.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans pt-2">
          {behavioralSignals.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-[#050505] border border-stone-850 hover:border-stone-750 transition-all duration-300 rounded-3xl p-5 flex flex-col justify-between min-h-[250px] shadow-2xl relative overflow-hidden group animate-fade-in text-white"
              >
                <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-white/2 to-transparent pointer-events-none" />
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center border-b border-stone-850 pb-2.5">
                    <span className={`text-[8.5px] font-black uppercase px-2.5 py-0.5 rounded border ${item.badgeColor}`}>
                      {item.label}
                    </span>
                    <div className={`p-1.5 rounded-lg border ${item.badgeColor} flex items-center justify-center`}>
                      <IconComp className="h-4 w-4" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-display font-black text-sm text-white uppercase tracking-wider">
                      {item.indicator}
                    </h3>
                    <div className="bg-[#121011] border border-stone-850 p-2.5 rounded-xl mt-2">
                      <span className="text-[7.5px] font-black uppercase text-cyan-400 tracking-wider block mb-0.5">PET SIGNAL</span>
                      <p className="text-[10.5px] text-[#E5E7EB] leading-normal font-semibold">
                        "{item.signal}"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-stone-850 relative z-10">
                  <span className="text-[7.5px] font-black uppercase text-emerald-400 tracking-widest block mb-1">BUSINESS IMPLICATION</span>
                  <p className="text-[10.5px] text-[#CBD5E1] leading-relaxed font-semibold">
                    {item.implication}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── PAGE 3: POTENTIAL PET DEPLOYMENT SCENARIOS ─── */}
      <div className="space-y-6 select-none border-t border-stone-200/20 pt-1">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            Hypothetical Frameworks
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            Potential PET Deployment Scenarios
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            Hypothetical frameworks demonstrating how PET could be used to investigate consumer neurochemistry and decision behavior.
          </p>
        </div>

        {/* 3-Column Grid of Scenarios */}
        <div className="grid grid-cols-12 gap-6 items-stretch font-sans pt-2">
          {deploymentScenarios.map((use, idx) => (
            <div 
              key={idx}
              className="bg-[#050505] border border-stone-850 rounded-3xl p-5 md:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between hover:border-stone-750 hover:bg-[#0c0c0c] transition-all duration-300 group col-span-12 lg:col-span-4 text-white"
            >
              <div className="absolute top-0 right-0 h-40 w-40 bg-radial from-purple-500/4 to-transparent pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-stone-850 pb-2.5">
                  <span className="text-[8.5px] font-black uppercase text-purple-400 bg-purple-950/20 px-2.5 py-0.5 rounded border border-purple-550/30">
                    {use.id}
                  </span>
                  <span className="text-[7.5px] font-mono text-stone-400 font-bold">FEASIBILITY STUDY</span>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-stone-850 shadow bg-[#121011] shrink-0 aspect-[16/9]">
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

                <div className="grid gap-4 pt-2 border-t border-stone-850 grid-cols-1">
                  <div className="bg-[#121011] p-3 rounded-xl border border-stone-850">
                    <span className="text-[8px] font-black text-rose-400 uppercase tracking-widest block">Marketing Challenge</span>
                    <p className="text-[10.5px] leading-relaxed text-[#E5E7EB] font-semibold mt-1">{use.challenge}</p>
                  </div>
                  <div className="bg-[#121011] p-3 rounded-xl border border-stone-850">
                    <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest block">What PET Reveals</span>
                    <p className="text-[10.5px] leading-relaxed text-[#E5E7EB] font-semibold mt-1">{use.reveals}</p>
                  </div>
                  <div className="bg-[#121011] p-3 rounded-xl border border-stone-850">
                    <span className="text-[8px] font-black text-cyan-400 uppercase tracking-widest block">Potential Behavioral Insight</span>
                    <p className="text-[10.5px] leading-relaxed text-[#E5E7EB] font-semibold mt-1">{use.insight}</p>
                  </div>
                  <div className="bg-[#121011] p-3 rounded-xl border border-stone-850">
                    <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest block">Strategic Optimization</span>
                    <p className="text-[10.5px] leading-relaxed text-[#E5E7EB] font-semibold mt-1">{use.optimization}</p>
                  </div>
                </div>
              </div>

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

      {/* ─── PAGE 4: SCIENTIFIC OUTPUTS GENERATED BY PET ─── */}
      <div className="space-y-6 select-none border-t border-stone-200/20 pt-1">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            Scientific Mapping
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            Scientific Outputs Generated by PET
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            A precise mapping of neural molecular metrics and metabolic outputs produced during high-fidelity PET scans.
          </p>
        </div>

        {/* 8 Premium output cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans pt-2">
          {scientificOutputs.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-[#050505] border border-stone-850 hover:border-stone-750 transition-all duration-300 rounded-3xl p-5 min-h-[140px] flex flex-col justify-between shadow-2xl relative overflow-hidden group text-white"
            >
              <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl from-white/2 to-transparent pointer-events-none" />
              <div className="space-y-2">
                <span className="text-[8.5px] font-black uppercase text-purple-400 tracking-widest block">OUTPUT {(idx + 1).toString().padStart(2, "0")}</span>
                <h4 className="font-display font-black text-xs text-white uppercase tracking-wide group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[10.5px] leading-relaxed text-[#CBD5E1] font-semibold mt-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── PAGE 5: EXECUTIVE SCORECARD ─── */}
      <div className="space-y-6 select-none border-t border-stone-200/20 pt-1">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            Executive Scorecard
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            ENTERPRISE STRATEGIC TAKEAWAYS
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            Executive evaluation framework for assessing real-world PET deployment feasibility, scalability, scientific value, and operational constraints.
          </p>
        </div>

        {/* Scorecards list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 font-sans pt-2">
          {executiveTakeaways.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-[#050505] border border-stone-850 hover:border-stone-750 transition-all duration-300 rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[200px] group animate-fade-in text-white"
            >
              <div className="space-y-2">
                <span className="text-[8px] font-black uppercase text-purple-400 tracking-widest block">{item.category}</span>
                <h4 className="font-display font-black text-xs text-white uppercase tracking-wide group-hover:text-purple-300 transition-colors">{item.title}</h4>
                <p className="text-[10.5px] leading-relaxed text-[#E5E7EB] font-medium">
                  {item.desc}
                </p>
              </div>
              <div className="space-y-1.5 mt-4">
                <div className="flex justify-between text-[7.5px] font-mono font-bold text-[#CBD5E1] uppercase">
                  <span>IMPACT RATING</span>
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
    </div>
  );
}
