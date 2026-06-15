import React from "react";
import { 
  Brain, ShieldCheck, AlertTriangle, Heart, Database, TrendingUp, 
  Zap, Award, Activity, Sparkles, Scale, RefreshCw, BarChart2, Eye, Gauge, Sliders
} from "lucide-react";

export function HrvStorytellingView({ tool, activeTheme }: { 
  tool: any; 
  activeTheme: any;
}) {
  // ═══════════════════════════════════════════
  // 1. BEHAVIORAL SIGNALS HRV CAN POTENTIALLY DETECT (SECTION 2)
  // ═══════════════════════════════════════════
  const behavioralSignals = [
    {
      label: "AUTONOMIC BALANCE",
      tag: "STRESS REGULATION",
      signal: "High HRV reflects adaptive autonomic flexibility and effective physiological regulation.",
      implication: "Consumers may experience greater comfort and confidence during interactions.",
      badgeColor: "border-emerald-500/40 text-emerald-450 bg-emerald-950/20",
      icon: Heart
    },
    {
      label: "EMOTIONAL REGULATION",
      tag: "AFFECTIVE CONTROL",
      signal: "Stronger vagal activity supports emotional stability under challenging conditions.",
      implication: "Emotionally balanced experiences may improve long-term engagement.",
      badgeColor: "border-purple-500/40 text-purple-400 bg-purple-950/20",
      icon: Sliders
    },
    {
      label: "COGNITIVE CONTROL",
      tag: "EXECUTIVE FUNCTION",
      signal: "Higher HRV is associated with stronger prefrontal regulatory control.",
      implication: "Reduced friction may improve consumer decision efficiency.",
      badgeColor: "border-amber-500/40 text-amber-550 bg-amber-955/20",
      icon: Brain
    },
    {
      label: "STRESS RESPONSE",
      tag: "AUTONOMIC ACTIVATION",
      signal: "Acute stress reduces vagal influence and alters autonomic balance.",
      implication: "Complex interfaces may increase physiological stress.",
      badgeColor: "border-rose-500/40 text-rose-450 bg-rose-955/20",
      icon: AlertTriangle
    },
    {
      label: "TRUST FORMATION",
      tag: "SAFETY RESPONSE",
      signal: "Stable HRV patterns may indicate reduced threat perception and increased trust.",
      implication: "Trust-building experiences can improve conversion outcomes.",
      badgeColor: "border-emerald-500/40 text-emerald-400 bg-emerald-950/20",
      icon: ShieldCheck
    },
    {
      label: "RESILIENCE",
      tag: "ADAPTIVE RECOVERY",
      signal: "Rapid autonomic recovery reflects higher resilience and adaptability.",
      implication: "Positive customer experiences may strengthen long-term brand relationships.",
      badgeColor: "border-blue-500/40 text-blue-400 bg-blue-950/20",
      icon: Activity
    },
    {
      label: "DECISION PRESSURE",
      tag: "COGNITIVE STRAIN",
      signal: "Reduced HRV often emerges during uncertainty and decision conflict.",
      implication: "Complicated purchasing processes may increase hesitation.",
      badgeColor: "border-amber-500/40 text-amber-550 bg-amber-955/20",
      icon: Gauge
    },
    {
      label: "RECOVERY CAPACITY",
      tag: "PHYSIOLOGICAL RESTORATION",
      signal: "Efficient recovery patterns indicate healthy autonomic regulation.",
      implication: "Reduced stress experiences may improve retention and loyalty.",
      badgeColor: "border-cyan-500/40 text-cyan-400 bg-cyan-950/20",
      icon: Zap
    }
  ];

  // ═══════════════════════════════════════════
  // 2. POTENTIAL HRV DEPLOYMENT SCENARIOS (SECTION 3)
  // ═══════════════════════════════════════════
  const deploymentScenarios = [
    {
      id: "SCENARIO 01",
      title: "FINANCIAL DECISION STRESS ANALYSIS",
      challenge: "Consumers experience uncertainty when making financial commitments.",
      reveals: "Autonomic stress responses during complex financial evaluations.",
      insight: "Low HRV patterns may indicate elevated risk perception and hesitation.",
      optimization: "Simplify financial communication and reinforce trust signals.",
      impact: "Higher completion rates and increased customer confidence.",
      image: "/images/hrv_scenario1.png"
    },
    {
      id: "SCENARIO 02",
      title: "E-COMMERCE FRICTION DETECTION",
      challenge: "Consumers abandon carts despite strong purchase intent.",
      reveals: "Physiological stress accumulation across the shopping journey.",
      insight: "Checkout complexity may increase autonomic strain.",
      optimization: "Reduce unnecessary form fields and simplify checkout.",
      impact: "Higher conversions and lower abandonment rates.",
      image: "/images/hrv_scenario2.png"
    },
    {
      id: "SCENARIO 03",
      title: "BRAND TRUST & LOYALTY RESEARCH",
      challenge: "Understanding why consumers remain loyal to specific brands.",
      reveals: "Autonomic signatures associated with comfort, familiarity, and trust.",
      insight: "Trusted brands often generate lower physiological threat responses.",
      optimization: "Strengthen consistency, transparency, and customer reassurance.",
      impact: "Higher retention and stronger customer lifetime value.",
      image: "/images/hrv_scenario3.png"
    }
  ];

  // ═══════════════════════════════════════════
  // 3. SCIENTIFIC OUTPUTS GENERATED BY HRV (SECTION 4)
  // ═══════════════════════════════════════════
  const scientificOutputs = [
    { title: "RMSSD", desc: "Primary indicator of vagal activity and recovery capacity." },
    { title: "SDNN", desc: "Measures overall autonomic variability and flexibility." },
    { title: "LF POWER", desc: "Reflects autonomic regulatory dynamics across slower oscillations." },
    { title: "HF POWER", desc: "Indexes parasympathetic nervous system activity." },
    { title: "LF/HF RATIO", desc: "Evaluates shifts in autonomic balance." },
    { title: "VAGAL ACTIVITY INDEX", desc: "Measures physiological self-regulation capacity." },
    { title: "STRESS PROFILES", desc: "Maps autonomic responses to environmental demands." },
    { title: "RECOVERY PROFILES", desc: "Evaluates restoration following stress exposure." },
    { title: "EMOTIONAL REGULATION METRICS", desc: "Assesses physiological control over emotional states." },
    { title: "RESILIENCE SCORES", desc: "Measures adaptive recovery and stress tolerance." },
    { title: "FATIGUE INDICATORS", desc: "Detects autonomic exhaustion and performance decline." },
    { title: "AUTONOMIC STATE PROFILES", desc: "Visualizes dynamic changes in physiological regulation." },
    { title: "LONGITUDINAL WELLBEING TRACKING", desc: "Monitors changes across extended periods." },
    { title: "BEHAVIORAL PREDICTION MODELS", desc: "Forecasts likely behavioral outcomes using autonomic signals." }
  ];

  // ═══════════════════════════════════════════
  // 4. ENTERPRISE STRATEGIC TAKEAWAYS (SECTION 5)
  // ═══════════════════════════════════════════
  const executiveTakeaways = [
    {
      category: "DEPLOYMENT SETUP",
      title: "BEST ENVIRONMENT FOR HRV",
      desc: "Wearables and ambulatory monitoring enable continuous real-world measurement.",
      score: 96,
      label: "EXCELLENT",
      color: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
    },
    {
      category: "OPERATIONAL FIT",
      title: "ENTERPRISE FEASIBILITY",
      desc: "Easy deployment across laboratories, field studies, and consumer research.",
      score: 94,
      label: "HIGH",
      color: "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
    },
    {
      category: "RESOURCE SCALE",
      title: "COST & SCALABILITY",
      desc: "Low-cost sensors support large-scale behavioral studies.",
      score: 97,
      label: "VERY HIGH",
      color: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
    },
    {
      category: "SCIENTIFIC VALUE",
      title: "AUTONOMIC INSIGHT",
      desc: "Provides validated physiological markers of stress, resilience, and regulation.",
      score: 98,
      label: "CRITICAL",
      color: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]"
    },
    {
      category: "BUSINESS APPLICATION",
      title: "CONSUMER EXPERIENCE OPTIMIZATION",
      desc: "Reveals hidden stress and trust dynamics influencing decision-making.",
      score: 92,
      label: "HIGH",
      color: "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]"
    },
    {
      category: "DATA QUALITY",
      title: "PHYSIOLOGICAL RELIABILITY",
      desc: "Strong evidence base across neuroscience and psychophysiology.",
      score: 95,
      label: "EXCEPTIONAL",
      color: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
    },
    {
      category: "KEY LIMITATIONS",
      title: "INTERPRETATION COMPLEXITY",
      desc: "Autonomic signals may require multimodal validation for precise attribution.",
      score: 58,
      label: "MODERATE",
      color: "bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"
    },
    {
      category: "COMPLIANCE SAFEGUARDS",
      title: "BIOMETRIC PRIVACY",
      desc: "Requires secure handling of physiological and wearable-derived data.",
      score: 93,
      label: "MANAGED",
      color: "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]"
    }
  ];

  return (
    <div className="col-span-12 space-y-24 pb-12 relative font-sans text-foreground bg-[#F7F7F7] rounded-3xl p-2">
      {/* Subtle emerald radial glow representing autonomic baseline rhythms */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/2 via-[#F7F7F7] to-[#F7F7F7] pointer-events-none rounded-3xl -z-10 animate-fade-in" />
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] bg-radial from-emerald-550/3 to-transparent pointer-events-none blur-3xl -z-10 animate-pulse" />

      {/* ─── PAGE 1: HERO SECTION ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#050505] border border-stone-850 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden select-none">
        <div className="absolute top-0 right-0 h-96 w-96 bg-radial from-emerald-500/10 to-transparent pointer-events-none blur-3xl animate-pulse" />
        
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
              <Activity className="h-3.5 w-3.5 text-emerald-400" /> AUTONOMIC NERVOUS SYSTEM TECHNIQUE
            </div>
            <h1 className="font-display font-black text-3xl md:text-4xl text-white uppercase tracking-tight leading-tight">
              HEART RATE VARIABILITY (HRV)
            </h1>
            <p className="text-sm text-stone-300 font-medium leading-relaxed max-w-xl">
              HRV measures the subtle fluctuations between heartbeats to reveal autonomic nervous system activity, stress regulation, emotional resilience, recovery capacity, cognitive control, and subconscious behavioral states.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 border-t border-stone-850 pt-5">
            <div>
              <div className="text-[9px] uppercase font-black text-emerald-450 tracking-wider">WHAT IT MEASURES</div>
              <div className="text-xs font-black text-white mt-1 uppercase tracking-wide">AUTONOMIC FLEXIBILITY</div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-cyan-400 tracking-wider">BEST USE</div>
              <div className="text-xs font-black text-purple-300 mt-1 uppercase tracking-wide">STRESS & RECOVERY</div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-yellow-500 tracking-wider">BUSINESS RELEVANCE</div>
              <div className="text-xs font-black text-white mt-1 uppercase tracking-wide leading-tight font-display">TRUST & COMFORT OPTIMIZATION</div>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl border border-stone-850 aspect-[4/3] group">
          <img 
            src="/images/hrv_hero.png" 
            alt="Real-time cardiac autonomic dashboard overlays and biosensor wristband tracking" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 filter brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-6">
            <span className="text-[9px] font-black uppercase text-emerald-455 tracking-wider mb-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" /> SIMULATED DEPLOYMENT SCENARIO
            </span>
            <h3 className="font-display font-black text-sm text-white uppercase tracking-wide">
              AUTONOMIC CUSTOMER EXPERIENCE RESEARCH
            </h3>
            <p className="text-[11px] text-[#E5E7EB] mt-1 leading-normal font-medium max-w-md">
              HRV may reveal hidden stress, trust formation, emotional regulation, and recovery dynamics during consumer decision-making.
            </p>
          </div>
        </div>
      </div>

      {/* ─── PAGE 2: BEHAVIORAL SIGNALS HRV CAN POTENTIALLY DETECT ─── */}
      <div className="space-y-6 select-none">
        <div className="max-w-[1400px] w-full flex flex-col lg:flex-row gap-6 justify-between items-start">
          <div className="flex-1">
            <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
              Autonomic Indicators
            </span>
            <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
              Behavioral Signals HRV Can Potentially Detect
            </h2>
            <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
              Understanding how autonomic nervous system activity influences stress, trust, emotional regulation, resilience, decision-making, and consumer behavior.
            </p>
          </div>
          
          <div className="w-full lg:w-[380px] bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/25 p-5 rounded-3xl backdrop-blur-sm shadow-xl">
            <span className="text-[8.5px] font-black uppercase text-emerald-400 tracking-wider flex items-center gap-1.5 mb-1.5">
              <Sparkles className="h-3.5 w-3.5" /> High-frequency Autonomic Capture
            </span>
            <p className="text-[11px] text-[#243447] leading-relaxed font-semibold">
              HRV measurements track cardiac inter-beat intervals to capture real-time sympathetic and parasympathetic regulation, providing direct insight into stress events and comfort baselines.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans pt-2">
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
                      {item.tag}
                    </span>
                    <div className={`p-1.5 rounded-lg border ${item.badgeColor} flex items-center justify-center`}>
                      <IconComp className="h-4 w-4" />
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-[9px] font-bold text-stone-400 tracking-wider uppercase block">{item.label}</span>
                    <h3 className="font-display font-black text-sm text-white uppercase tracking-wider mt-1">
                      {item.tag}
                    </h3>
                    <div className="bg-[#121011] border border-stone-850 p-2.5 rounded-xl mt-2">
                      <span className="text-[7.5px] font-black uppercase text-cyan-400 tracking-wider block mb-0.5">NEUROSCIENCE SIGNAL</span>
                      <p className="text-[10.5px] text-[#E5E7EB] leading-normal font-semibold">
                        "{item.signal}"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-stone-850 relative z-10">
                  <span className="text-[7.5px] font-black uppercase text-emerald-400 tracking-widest block mb-1">MARKETING IMPLICATION</span>
                  <p className="text-[10.5px] text-[#CBD5E1] leading-relaxed font-semibold">
                    {item.implication}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── PAGE 3: POTENTIAL HRV DEPLOYMENT SCENARIOS ─── */}
      <div className="space-y-6 select-none border-t border-stone-200/20 pt-1">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            Hypothetical Frameworks
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            Potential HRV Deployment Scenarios
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            Hypothetical frameworks demonstrating how HRV could reveal hidden autonomic responses throughout consumer experiences.
          </p>
        </div>

        {/* 3-Column Grid of Scenarios */}
        <div className="grid grid-cols-12 gap-6 items-stretch font-sans pt-2">
          {deploymentScenarios.map((use, idx) => (
            <div 
              key={idx}
              className="bg-[#050505] border border-stone-850 rounded-3xl p-5 md:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between hover:border-stone-750 hover:bg-[#0c0c0c] transition-all duration-300 group col-span-12 lg:col-span-4 text-white"
            >
              <div className="absolute top-0 right-0 h-40 w-40 bg-radial from-emerald-500/4 to-transparent pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-stone-850 pb-2.5">
                  <span className="text-[8.5px] font-black uppercase text-emerald-400 bg-emerald-955/20 px-2.5 py-0.5 rounded border border-emerald-550/30">
                    {use.id}
                  </span>
                  <span className="text-[7.5px] font-mono text-stone-400 font-bold">FEASIBILITY REPORT</span>
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
                    <span className="text-[8px] font-black text-rose-450 uppercase tracking-widest block">Marketing Challenge</span>
                    <p className="text-[10.5px] leading-relaxed text-[#E5E7EB] font-semibold mt-1">{use.challenge}</p>
                  </div>
                  <div className="bg-[#121011] p-3 rounded-xl border border-stone-850">
                    <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest block">What HRV Reveals</span>
                    <p className="text-[10.5px] leading-relaxed text-[#E5E7EB] font-semibold mt-1">{use.reveals}</p>
                  </div>
                  <div className="bg-[#121011] p-3 rounded-xl border border-stone-850">
                    <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest block">Potential Autonomic Insight</span>
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
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-400" /> Expected Behavioral Impact:
                </span>
                <span className="text-emerald-400 font-black text-right tracking-wide">{use.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── PAGE 4: SCIENTIFIC OUTPUTS GENERATED BY HRV ─── */}
      <div className="space-y-6 select-none border-t border-stone-200/20 pt-1">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            Scientific Mapping
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            Scientific Outputs Generated by HRV
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            A precise mapping of neural molecular metrics and metabolic outputs produced during high-fidelity HRV scans.
          </p>
        </div>

        {/* 14 Premium output cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans pt-2">
          {scientificOutputs.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-[#050505] border border-stone-850 hover:border-stone-750 transition-all duration-300 rounded-3xl p-5 min-h-[140px] flex flex-col justify-between shadow-2xl relative overflow-hidden group text-white"
            >
              <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl from-white/2 to-transparent pointer-events-none" />
              <div className="space-y-2">
                <span className="text-[8.5px] font-black uppercase text-emerald-400 tracking-widest block">OUTPUT {(idx + 1).toString().padStart(2, "0")}</span>
                <h4 className="font-display font-black text-xs text-white uppercase tracking-wide group-hover:text-emerald-300 transition-colors">
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
            Executive Strategic Takeaways
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            Executive evaluation framework for assessing real-world HRV deployment feasibility, scalability, scientific validity, and business impact.
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
                <span className="text-[8px] font-black uppercase text-emerald-450 tracking-widest block">{item.category}</span>
                <h4 className="font-display font-black text-xs text-white uppercase tracking-wide group-hover:text-emerald-300 transition-colors">{item.title}</h4>
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
