import React from "react";
import { 
  Brain, ShieldCheck, AlertTriangle, Heart, Database, TrendingUp, 
  Zap, Award, Activity, Sparkles, Scale, RefreshCw, BarChart2, Eye
} from "lucide-react";

export function PupillometryStorytellingView({ tool, activeTheme }: { 
  tool: any; 
  activeTheme: any;
}) {
  // ═══════════════════════════════════════════
  // 1. BEHAVIORAL SIGNALS PUPILLOMETRY CAN POTENTIALLY DETECT (SECTION 2)
  // ═══════════════════════════════════════════
  const behavioralSignals = [
    {
      label: "ATTENTION ALLOCATION",
      tag: "ATTENTION RESPONSE",
      signal: "Phasic pupil dilations indicate selective attention toward relevant stimuli.",
      implication: "High-attention moments may identify content with strongest consumer focus.",
      badgeColor: "border-blue-500/40 text-blue-400 bg-blue-950/20",
      icon: Eye
    },
    {
      label: "COGNITIVE LOAD",
      tag: "MENTAL EFFORT",
      signal: "Increasing task complexity produces larger task-evoked pupillary responses.",
      implication: "Complex interfaces may create friction and increase abandonment risk.",
      badgeColor: "border-amber-500/40 text-amber-550 bg-amber-955/20",
      icon: Brain
    },
    {
      label: "EMOTIONAL AROUSAL",
      tag: "AFFECTIVE RESPONSE",
      signal: "Emotionally salient content triggers rapid sympathetic dilation.",
      implication: "High emotional resonance may strengthen message retention.",
      badgeColor: "border-pink-500/40 text-pink-400 bg-pink-950/20",
      icon: Heart
    },
    {
      label: "DECISION UNCERTAINTY",
      tag: "RISK PROCESSING",
      signal: "Ambiguous choices produce elevated pupil responses.",
      implication: "Unclear pricing or messaging may increase hesitation.",
      badgeColor: "border-rose-500/40 text-rose-450 bg-rose-955/20",
      icon: AlertTriangle
    },
    {
      label: "TRUST FORMATION",
      tag: "SAFETY LEARNING",
      signal: "Reduced stress-related dilation may indicate growing trust.",
      implication: "Trust signals can improve confidence and conversion.",
      badgeColor: "border-emerald-500/40 text-emerald-400 bg-emerald-950/20",
      icon: ShieldCheck
    },
    {
      label: "REWARD ANTICIPATION",
      tag: "APPROACH MOTIVATION",
      signal: "Expected rewards trigger anticipatory autonomic activation.",
      implication: "Promotions and incentives may increase engagement and purchase intent.",
      badgeColor: "border-cyan-500/40 text-cyan-400 bg-cyan-950/20",
      icon: Zap
    },
    {
      label: "MEMORY ENCODING",
      tag: "LONG-TERM RETENTION",
      signal: "Pupil dilation during encoding predicts later recall.",
      implication: "Memorable creative assets are more likely to be retained.",
      badgeColor: "border-blue-500/40 text-blue-400 bg-blue-950/20",
      icon: Database
    },
    {
      label: "COGNITIVE FATIGUE",
      tag: "RESOURCE DEPLETION",
      signal: "Declining task-evoked responses signal mental exhaustion.",
      implication: "Excessive decision complexity may drive disengagement.",
      badgeColor: "border-amber-500/40 text-amber-550 bg-amber-955/20",
      icon: Activity
    }
  ];

  // ═══════════════════════════════════════════
  // 2. POTENTIAL PUPILLOMETRY DEPLOYMENT SCENARIOS (SECTION 3)
  // ═══════════════════════════════════════════
  const deploymentScenarios = [
    {
      id: "SCENARIO 01",
      title: "WEBSITE UX FRICTION ANALYSIS",
      challenge: "Users abandon digital journeys despite strong acquisition efforts.",
      reveals: "Task-evoked pupil responses identify moments of cognitive overload.",
      insight: "Complex layouts and dense information increase mental effort.",
      optimization: "Simplify navigation pathways and reduce information density.",
      impact: "Higher conversion and reduced abandonment.",
      image: "/images/pupillometry_scenario1.png"
    },
    {
      id: "SCENARIO 02",
      title: "ADVERTISEMENT ENGAGEMENT TESTING",
      challenge: "Determining whether consumers truly engage with advertising content.",
      reveals: "Continuous attention and emotional engagement profiles.",
      insight: "Strong creative moments trigger synchronized autonomic responses.",
      optimization: "Align peak engagement moments with brand reveals.",
      impact: "Higher ad effectiveness and stronger recall.",
      image: "/images/pupillometry_scenario2.png"
    },
    {
      id: "SCENARIO 03",
      title: "FINANCIAL DECISION JOURNEY",
      challenge: "Consumers hesitate during onboarding and purchase processes.",
      reveals: "Decision uncertainty and risk-related pupil dynamics.",
      insight: "Complex disclosures and unclear messaging trigger hesitation.",
      optimization: "Simplify communication and reinforce trust indicators.",
      impact: "Improved completion rates and customer confidence.",
      image: "/images/pupillometry_scenario3.png"
    }
  ];

  // ═══════════════════════════════════════════
  // 3. SCIENTIFIC OUTPUTS GENERATED BY PUPILLOMETRY (SECTION 4)
  // ═══════════════════════════════════════════
  const scientificOutputs = [
    { title: "PUPIL DILATION CURVES", desc: "Continuous measurement of autonomic and cognitive responses." },
    { title: "TASK-EVOKED PUPILLARY RESPONSES", desc: "Quantifies cognitive effort and working memory demand." },
    { title: "COGNITIVE LOAD MAPS", desc: "Identifies friction points within visual experiences." },
    { title: "ATTENTION RESPONSE PROFILES", desc: "Tracks engagement across dynamic experiences." },
    { title: "EMOTIONAL AROUSAL PROFILES", desc: "Measures autonomic intensity of emotional reactions." },
    { title: "DECISION DIFFICULTY METRICS", desc: "Quantifies uncertainty and cognitive conflict." },
    { title: "MENTAL EFFORT SCORES", desc: "Standardized measurement of processing demands." },
    { title: "FATIGUE INDICATORS", desc: "Detects cognitive depletion and overload." },
    { title: "VIGILANCE METRICS", desc: "Measures sustained attention over time." },
    { title: "ENGAGEMENT CURVES", desc: "Visualizes audience involvement throughout content." },
    { title: "CONSUMER RESPONSE TIMELINES", desc: "Maps behavioral states across customer journeys." },
    { title: "BEHAVIORAL PREDICTION MODELS", desc: "Forecasts likely consumer actions using physiological signals." }
  ];

  // ═══════════════════════════════════════════
  // 4. ENTERPRISE STRATEGIC TAKEAWAYS (SECTION 5)
  // ═══════════════════════════════════════════
  const executiveTakeaways = [
    {
      category: "DEPLOYMENT SETUP",
      title: "BEST ENVIRONMENT FOR PUPILLOMETRY",
      desc: "Controlled testing environments with stable luminance provide highest signal quality.",
      score: 92,
      label: "HIGH",
      color: "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
    },
    {
      category: "OPERATIONAL FIT",
      title: "ENTERPRISE FEASIBILITY",
      desc: "Rapid setup and minimal participant burden enable scalable deployment.",
      score: 95,
      label: "EXCELLENT",
      color: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
    },
    {
      category: "RESOURCE SCALE",
      title: "COST & SCALABILITY",
      desc: "Low infrastructure requirements support large-scale studies.",
      score: 96,
      label: "VERY HIGH",
      color: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
    },
    {
      category: "BUSINESS VALUE",
      title: "CONSUMER INSIGHT POTENTIAL",
      desc: "Provides objective measurement of subconscious engagement and friction.",
      score: 97,
      label: "CRITICAL",
      color: "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
    },
    {
      category: "DATA QUALITY",
      title: "SIGNAL RELIABILITY",
      desc: "High-frequency sampling captures millisecond-level autonomic dynamics.",
      score: 90,
      label: "HIGH",
      color: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]"
    },
    {
      category: "RESEARCH VALUE",
      title: "COGNITIVE STATE DETECTION",
      desc: "Validated across attention, learning, decision-making, and neuroeconomics.",
      score: 94,
      label: "EXCEPTIONAL",
      color: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
    },
    {
      category: "KEY LIMITATIONS",
      title: "ENVIRONMENTAL SENSITIVITY",
      desc: "Signal quality depends heavily on luminance control.",
      score: 55,
      label: "MODERATE",
      color: "bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"
    },
    {
      category: "COMPLIANCE SAFEGUARDS",
      title: "BIOMETRIC PRIVACY",
      desc: "Requires informed consent and secure biometric data handling.",
      score: 91,
      label: "MANAGED",
      color: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
    }
  ];

  return (
    <div className="col-span-12 space-y-24 pb-12 relative font-sans text-foreground bg-[#F6F6F6] rounded-3xl p-2">
      {/* Subtle cyan radial glow representing pupillary light and autonomic triggers */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/2 via-[#F6F6F6] to-[#F6F6F6] pointer-events-none rounded-3xl -z-10 animate-fade-in" />
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] bg-radial from-cyan-550/3 to-transparent pointer-events-none blur-3xl -z-10 animate-pulse" />

      {/* ─── PAGE 1: HERO SECTION ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#050505] border border-stone-850 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden select-none">
        <div className="absolute top-0 right-0 h-96 w-96 bg-radial from-cyan-500/10 to-transparent pointer-events-none blur-3xl animate-pulse" />
        
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-[10px] font-black uppercase tracking-wider">
              <Brain className="h-3.5 w-3.5 text-cyan-400" /> CENTRAL NERVOUS SYSTEM TECHNIQUE
            </div>
            <h1 className="font-display font-black text-3xl md:text-4xl text-white uppercase tracking-tight leading-tight">
              PUPILLOMETRY
            </h1>
            <p className="text-sm text-stone-300 font-medium leading-relaxed max-w-xl">
              Pupillometry measures microscopic fluctuations in pupil diameter to reveal attention allocation, cognitive effort, emotional arousal, decision uncertainty, reward anticipation, and subconscious consumer engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 border-t border-stone-850 pt-5">
            <div>
              <div className="text-[9px] uppercase font-black text-cyan-400 tracking-wider">WHAT IT MEASURES</div>
              <div className="text-xs font-black text-white mt-1 uppercase tracking-wide">AUTONOMIC & COGNITIVE SIGNALS</div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-purple-450 tracking-wider">BEST USE</div>
              <div className="text-xs font-black text-purple-300 mt-1 uppercase tracking-wide">ATTENTION & COGNITIVE LOAD</div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-emerald-400 tracking-wider">BUSINESS RELEVANCE</div>
              <div className="text-xs font-black text-white mt-1 uppercase tracking-wide leading-tight">UX & CONSUMER INSIGHT</div>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl border border-stone-850 aspect-[4/3] group">
          <img 
            src="/images/pupillometry_hero.png" 
            alt="Infrared pupil dilation analysis and dynamic visual vector mapping" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 filter brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-6">
            <span className="text-[9px] font-black uppercase text-cyan-455 tracking-wider mb-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-ping" /> SIMULATED DEPLOYMENT SCENARIO
            </span>
            <h3 className="font-display font-black text-sm text-white uppercase tracking-wide">
              DIGITAL JOURNEY ATTENTION RESEARCH
            </h3>
            <p className="text-[11px] text-[#E5E7EB] mt-1 leading-normal font-medium max-w-md">
              Pupillometry may reveal subconscious engagement, cognitive friction, and emotional responses during customer journeys.
            </p>
          </div>
        </div>
      </div>

      {/* ─── PAGE 2: BEHAVIORAL SIGNALS PUPILLOMETRY CAN POTENTIALLY DETECT ─── */}
      <div className="space-y-6 select-none">
        <div className="max-w-[1400px] w-full flex flex-col lg:flex-row gap-6 justify-between items-start">
          <div className="flex-1">
            <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
              Autonomic Signals
            </span>
            <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
              Behavioral Signals Pupillometry Can Potentially Detect
            </h2>
            <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
              Understanding how subconscious attention, mental effort, emotional arousal, trust formation, and decision-making influence consumer behavior.
            </p>
          </div>
          
          <div className="w-full lg:w-[380px] bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/25 p-5 rounded-3xl backdrop-blur-sm shadow-xl">
            <span className="text-[8.5px] font-black uppercase text-cyan-400 tracking-wider flex items-center gap-1.5 mb-1.5">
              <Sparkles className="h-3.5 w-3.5" /> High-frequency Autonomic Capture
            </span>
            <p className="text-[11px] text-[#243447] leading-relaxed font-semibold">
              Pupillary dilation captures millisecond-level autonomic shifts representing real-time cognitive workload and emotional reactions without task interference.
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

      {/* ─── PAGE 3: POTENTIAL PUPILLOMETRY DEPLOYMENT SCENARIOS ─── */}
      <div className="space-y-6 select-none border-t border-stone-200/20 pt-1">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            Hypothetical Frameworks
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            Potential Pupillometry Deployment Scenarios
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            Hypothetical frameworks demonstrating how pupillometry could reveal hidden behavioral drivers across digital and consumer experiences.
          </p>
        </div>

        {/* 3-Column Grid of Scenarios */}
        <div className="grid grid-cols-12 gap-6 items-stretch font-sans pt-2">
          {deploymentScenarios.map((use, idx) => (
            <div 
              key={idx}
              className="bg-[#050505] border border-stone-850 rounded-3xl p-5 md:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between hover:border-stone-750 hover:bg-[#0c0c0c] transition-all duration-300 group col-span-12 lg:col-span-4 text-white"
            >
              <div className="absolute top-0 right-0 h-40 w-40 bg-radial from-cyan-500/4 to-transparent pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-stone-850 pb-2.5">
                  <span className="text-[8.5px] font-black uppercase text-cyan-400 bg-cyan-955/20 px-2.5 py-0.5 rounded border border-cyan-550/30">
                    {use.id}
                  </span>
                  <span className="text-[7.5px] font-mono text-stone-400 font-bold">FEASIBILITY PLAN</span>
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
                    <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest block">What Pupillometry Reveals</span>
                    <p className="text-[10.5px] leading-relaxed text-[#E5E7EB] font-semibold mt-1">{use.reveals}</p>
                  </div>
                  <div className="bg-[#121011] p-3 rounded-xl border border-stone-850">
                    <span className="text-[8px] font-black text-cyan-400 uppercase tracking-widest block">Possible Behavioral Insight</span>
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

      {/* ─── PAGE 4: SCIENTIFIC OUTPUTS GENERATED BY PUPILLOMETRY ─── */}
      <div className="space-y-6 select-none border-t border-stone-200/20 pt-1">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            Scientific Mapping
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            Scientific Outputs Generated by Pupillometry
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            A precise mapping of neural molecular metrics and metabolic outputs produced during high-fidelity Pupillometry scans.
          </p>
        </div>

        {/* 12 Premium output cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans pt-2">
          {scientificOutputs.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-[#050505] border border-stone-850 hover:border-stone-750 transition-all duration-300 rounded-3xl p-5 min-h-[140px] flex flex-col justify-between shadow-2xl relative overflow-hidden group text-white"
            >
              <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl from-white/2 to-transparent pointer-events-none" />
              <div className="space-y-2">
                <span className="text-[8.5px] font-black uppercase text-cyan-400 tracking-widest block">OUTPUT {(idx + 1).toString().padStart(2, "0")}</span>
                <h4 className="font-display font-black text-xs text-white uppercase tracking-wide group-hover:text-cyan-300 transition-colors">
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
            Executive evaluation framework for assessing real-world pupillometry deployment feasibility, scalability, scientific value, and business impact.
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
                <span className="text-[8px] font-black uppercase text-cyan-400 tracking-widest block">{item.category}</span>
                <h4 className="font-display font-black text-xs text-white uppercase tracking-wide group-hover:text-cyan-300 transition-colors">{item.title}</h4>
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
