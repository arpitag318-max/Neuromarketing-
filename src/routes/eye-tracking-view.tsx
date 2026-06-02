import React from "react";
import { 
  Brain, ShieldCheck, AlertTriangle, Heart, Database, TrendingUp, 
  Activity, Target, Zap, Eye, Award, Compass, ArrowRight, CheckCircle2
} from "lucide-react";

export function EyeTrackingStorytellingView({ tool, activeTheme }: { 
  tool: any; 
  activeTheme: any;
}) {
  // ═══════════════════════════════════════════
  // 1. HYPOTHETICAL BEHAVIORAL SIGNALS DATASET (SECTION 2)
  // ═══════════════════════════════════════════
  const hypotheticalSignals = [
    {
      title: "Visual Attention",
      tag: "HIGH CTA DISCOVERY",
      human: "Consumers rapidly fixate on primary action areas.",
      marketing: "Clear visual hierarchy may increase application intent.",
      color: "border-cyan-200 text-cyan-600 bg-cyan-50/50",
      icon: ShieldCheck
    },
    {
      title: "Attention Leakage",
      tag: "CTA BLINDNESS",
      human: "Visual attention bypasses conversion elements.",
      marketing: "Critical actions may remain unnoticed.",
      color: "border-rose-200 text-rose-600 bg-rose-50/50",
      icon: AlertTriangle
    },
    {
      title: "Trust Processing",
      tag: "TRUST BADGE NEGLECT",
      human: "Authority cues receive minimal fixation.",
      marketing: "Trust architecture may be underperforming.",
      color: "border-amber-200 text-amber-600 bg-amber-50/50",
      icon: Award
    },
    {
      title: "Information Processing",
      tag: "CONTENT SKIMMING",
      human: "Users scan instead of reading key information.",
      marketing: "Complex messaging may be ignored.",
      color: "border-blue-200 text-blue-600 bg-blue-50/50",
      icon: Brain
    },
    {
      title: "Visual Friction",
      tag: "ATTENTION CONFLICT",
      human: "Multiple competing elements fight for gaze.",
      marketing: "Visual clutter may reduce conversion.",
      color: "border-rose-200 text-rose-600 bg-rose-50/50",
      icon: AlertTriangle
    },
    {
      title: "Decision Behavior",
      tag: "CTA HESITATION",
      human: "Users repeatedly revisit CTA zones without acting.",
      marketing: "Decision confidence may be weak.",
      color: "border-amber-200 text-amber-600 bg-amber-50/50",
      icon: Activity
    },
    {
      title: "Navigation Behavior",
      tag: "SEARCH FOR ORIENTATION",
      human: "Users struggle to locate next steps.",
      marketing: "Information architecture may require optimization.",
      color: "border-indigo-200 text-indigo-600 bg-indigo-50/50",
      icon: Compass
    },
    {
      title: "Memory Encoding",
      tag: "BRAND FOCUS",
      human: "Consumers repeatedly fixate on brand assets.",
      marketing: "Brand recall probability may increase.",
      color: "border-emerald-200 text-emerald-600 bg-emerald-50/50",
      icon: Target
    }
  ];

  // ═══════════════════════════════════════════
  // 2. HOW EYE TRACKING SIGNALS ARE INTERPRETED (SECTION 3)
  // ═══════════════════════════════════════════
  const simulatedWaves = [
    {
      name: "FIRST FIXATION TIME",
      range: "150 - 250 ms",
      meaning: "Time required for attention to first land on an element.",
      interpretation: "Measures visual salience. Evaluates the immediate pre-attentive draw of headlines, CTAs, and trust cues.",
      color: "#06b6d4",
      signalPath: "M 0,25 Q 15,10 30,25 T 60,25 T 90,25 T 120,25 T 150,25 T 180,25"
    },
    {
      name: "DWELL TIME",
      range: "1.2 - 3.5 s",
      meaning: "Total viewing duration on an visual element.",
      interpretation: "Measures engagement intensity. Longer viewing duration typically correlates with deep cognitive processing of content.",
      color: "#10b981",
      signalPath: "M 0,25 C 20,5 40,45 60,25 C 80,5 100,45 120,25 C 140,5 160,45 180,25"
    },
    {
      name: "SCAN PATHS",
      range: "Sequential Vectors",
      meaning: "Sequence of visual navigation pathway.",
      interpretation: "Measures attention flow. Traces how a customer's gaze navigates across headlines, banners, calculators, and actions.",
      color: "#818cf8",
      signalPath: "M 0,10 L 40,40 L 80,15 L 120,45 L 160,20 L 200,40 L 240,10"
    },
    {
      name: "FIXATION CLUSTERS",
      range: "Gaze Concentration",
      meaning: "Areas receiving repeated visual focus.",
      interpretation: "Measures attention concentration. Highlights cognitively important regions and high-value communication zones.",
      color: "#a855f7",
      signalPath: "M 0,25 Q 10,15 20,25 T 40,25 T 60,25 T 80,25 T 100,25 T 120,25 M 140,25 Q 150,15 160,25 T 180,25 T 200,25 T 220,25"
    }
  ];

  // ═══════════════════════════════════════════
  // 3. DEPLOYMENT SCENARIOS (SECTION 4)
  // ═══════════════════════════════════════════
  const hypotheticalScenarios = [
    {
      title: "Website CTA Optimization",
      tag: "Web Usability",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eye_tracking_website.png",
      challenge: "Users overlook Apply Now buttons during self-service mobile loan calculation.",
      reveal: "Gaze heatmaps reveal that visual attention concentrated on surrounding colorful tractor graphics rather than actions.",
      insight: "Visual hierarchy weakness: background assets competition siphons foveal attention from checkout triggers.",
      optimize: "Increase CTA button contrast and surround it with 40% breathing room to prevent attention siphoning.",
      impact: "Improved click-through rates and increased self-service completions."
    },
    {
      title: "WhatsApp Creative Testing",
      tag: "Mobile Messaging",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eye_tracking_whatsapp.png",
      challenge: "Low click-through rates and high opt-outs on promotional WhatsApp campaigns.",
      reveal: "Gaze tracking shows consumers completely ignore secondary bulleted copy, focusing only on the header graphic.",
      insight: "Consumers skim messages in less than 2 seconds, meaning secondary value propositions are completely neglected.",
      optimize: "Improve visual hierarchy by using single-sentence headlines and clean agricultural icons.",
      impact: "Higher click engagement and significantly lowered opt-out ratios."
    },
    {
      title: "Loan Application Flow",
      tag: "Onboarding Journey",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eye_tracking_onboarding.png",
      challenge: "High customer abandonment during digital self-service KYC and onboarding forms.",
      reveal: "Scanpaths reveal extreme visual backtracking and chaotic search behaviors around income declaration fields.",
      insight: "Visual friction: complex field groupings trigger cognitive fatigue and visual disorientation before completion.",
      optimize: "Simplify layout structure, utilize progressive single-column fields, and place visual progress steps.",
      impact: "Higher application completion velocity and lower drop-off ratios."
    },
    {
      title: "EMI Calculator Analysis",
      tag: "Interactive Widgets",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eye_tracking_calculator.png",
      challenge: "Borrowers struggle to comprehend complex dynamic interest rate grids and loan selectors.",
      reveal: "Wearable trackers capture prolonged fixation and visual loops between rate details and repayment tables.",
      insight: "Too many simultaneous variables scatter focus, increasing working memory load and purchase hesitation.",
      optimize: "Simplify financial information architecture, displaying EMI outcomes in a single high-salience row.",
      impact: "Improved financial comprehension and reduction in calculator abandonment."
    },
    {
      title: "Branch Experience Optimization",
      tag: "Physical Spaces",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eye_tracking_branch.png",
      challenge: "Customers ignore informational posters, agricultural pamphlets, and product standees inside branches.",
      reveal: "Mobile eye-tracking glasses reveal walk-in customers systematically ignore posters placed behind high-traffic counters.",
      insight: "Visual noise: busy branch environments compete with collateral, relegating them to peripheral blindness.",
      optimize: "Redesign branch communication layouts, placing high-contrast, simple posters in primary sightlines.",
      impact: "Improved product awareness and organic branch-led cross-selling conversions."
    },
    {
      title: "Video Ad Attention Testing",
      tag: "Video Advertising",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eye_tracking_video.png",
      challenge: "Regional television and social media video campaigns fail to communicate branding and core loan offers.",
      reveal: "Scene-by-scene fixations show borrowers focus on emotional story characters while completely ignoring overlays.",
      insight: "Branding assets receive limited visual exposure because they appear during high-motion action sequences.",
      optimize: "Reposition branding marks and core numbers into early, low-motion visual focal segments.",
      impact: "Higher brand recall and improved return on seasonal media investments."
    },
    {
      title: "Female Borrower Trust Research",
      tag: "Inclusive Financing",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eye_tracking_female.png",
      challenge: "Traditional agricultural campaigns fail to engage female family co-signers in farm financing decisions.",
      reveal: "Ocular metrics show female borrowers fixate up to 3x longer on inclusive household agricultural scenes.",
      insight: "Representation bias: campaigns focusing exclusively on sole male farmers trigger visual neglect in women.",
      optimize: "Increase female visual representation, showcasing collaborative family ownership farming visuals.",
      impact: "Improved trust perception and higher family joint-loan applications."
    },
    {
      title: "Festival Campaign Visibility",
      tag: "Seasonal Marketing",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eye_tracking_festival.png",
      challenge: "Festival campaigns blend into cluttered seasonal advertising spaces without creating brand memorability.",
      reveal: "Gaze path analysis shows excessive visual elements (ribbons, gold frames) siphon focus from brand marks.",
      insight: "Festive visual clutter overshadows corporate emblems, decreasing long-term brand recall.",
      optimize: "Integrate the corporate emblem cleanly into the primary visual focal zones, minimizing non-essential decor.",
      impact: "Higher campaign engagement and stronger brand memorability."
    },
    {
      title: "Regional Language Creative Optimization",
      tag: "Vernacular Translation",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eye_tracking_vernacular.png",
      challenge: "Localized regional language campaigns yield highly inconsistent conversion performances.",
      reveal: "Reading speed and fixation durations reveal visual backtracking when text contains direct dictionary translations.",
      insight: "Linguistic visual friction: direct literal translation creates reading strains, triggering visual avoidance.",
      optimize: "Refine regional copywriting structures to use natural local dialects and familiar spacing structures.",
      impact: "Higher emotional trust and improved regional campaign effectiveness."
    }
  ];

  // ═══════════════════════════════════════════
  // 4. ENTERPRISE STRATEGIC TAKEAWAYS (SECTION 5)
  // ═══════════════════════════════════════════
  const enterpriseTakeaways = [
    {
      title: "Attention is a Finite Resource",
      insight: "Consumers only process a limited amount of visual information before disengaging.",
      score: "92%"
    },
    {
      title: "Visibility Precedes Conversion",
      insight: "Elements must first be seen and processed before they can influence borrower choices.",
      score: "90%"
    },
    {
      title: "Trust Elements Require Visual Exposure",
      insight: "Security trust cues are completely ineffective if foveal attention never reaches them.",
      score: "88%"
    },
    {
      title: "Visual Simplicity Reduces Cognitive Friction",
      insight: "Cleaner, high-contrast layouts support faster, low-effort financial decision making.",
      score: "86%"
    },
    {
      title: "Mobile Attention Patterns Differ from Desktop",
      insight: "Compact screen sizes completely restructure natural ocular scan paths.",
      score: "82%"
    },
    {
      title: "Attention Data Complements Surveys",
      insight: "Consumers often cannot accurately self-report what they visually scanned.",
      score: "85%"
    }
  ];

  return (
    <div className="col-span-12 space-y-24 pb-12 relative font-sans text-slate-800 bg-slate-50/50">
      {/* Premium subtle light radial glows representing gaze paths */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/20 via-slate-50 to-slate-50/30 pointer-events-none rounded-3xl -z-10 animate-fade-in" />
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] bg-radial from-cyan-500/5 to-transparent pointer-events-none blur-3xl -z-10 animate-pulse" />

      {/* ─── SECTION 1: ENTERPRISE HERO INTRO (Premium Nielsen Norman + McKinsey Style) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden select-none">
        <div className="absolute top-0 right-0 h-96 w-96 bg-radial from-cyan-500/5 to-transparent pointer-events-none blur-3xl animate-pulse" />
        
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6 text-left">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-150 text-cyan-600 text-[10px] font-black uppercase tracking-wider">
              <Eye className="h-3.5 w-3.5 text-cyan-500 animate-pulse" /> Visual Attention Analytics
            </div>
            <h1 className="font-display font-black text-3xl md:text-4xl text-slate-900 uppercase tracking-tight leading-tight">
              EYE TRACKING
            </h1>
            <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-xl">
              Eye Tracking reveals where consumers actually look, what they ignore, how attention flows across a visual experience, and where decision friction occurs. By measuring fixations, saccades, dwell time, scan paths, visual hierarchy processing, and attention leakage, Eye Tracking helps marketing teams optimize websites, advertisements, loan applications, branch environments, and customer journeys for maximum engagement and conversion.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-5">
            <div>
              <div className="text-[9px] uppercase font-black text-cyan-600 tracking-wider">What It Measures</div>
              <div className="text-xs font-black text-slate-800 mt-1 uppercase tracking-wide">Gaze & Attention</div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-slate-500 tracking-wider">Best Use</div>
              <div className="text-xs font-black text-cyan-600 mt-1 uppercase tracking-wide">UX & Conversion</div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-slate-500 tracking-wider">Business Relevance</div>
              <div className="text-xs font-black text-slate-800 mt-1 uppercase tracking-wide leading-tight">Decision Design</div>
            </div>
          </div>
        </div>

        {/* Premium Realistic Visual */}
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow border border-slate-200 aspect-[4/3] group">
          <img 
            src="/images/eye_tracking_hero.png" 
            alt="Consumer wearing Tobii Pro style eye tracking glasses during usability testing" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 filter brightness-[0.98]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6 text-left">
            <span className="text-[9px] font-black uppercase text-cyan-300 tracking-wider mb-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" /> SIMULATED DEPLOYMENT SCENARIO
            </span>
            <h3 className="font-display font-black text-sm text-white uppercase tracking-wide">
              CONSUMER WEBSITE ATTENTION RESEARCH
            </h3>
            <p className="text-[11px] text-slate-200 mt-1 leading-normal font-medium max-w-md">
              Eye Tracking may help identify which website elements capture visual attention, which trust signals are ignored, and where consumers disengage before conversion.
            </p>
          </div>
        </div>
      </div>

      {/* ─── SECTION 2: BEHAVIORAL INDICATORS ─── */}
      <div className="space-y-6 select-none">
        <div className="max-w-[1400px] w-full text-left">
          <span className="text-[11px] tracking-[0.18em] font-bold text-cyan-600 block uppercase font-sans mb-3">
            Behavioral Indicators
          </span>
          <h2 className="font-display font-black text-slate-900 uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            BEHAVIORAL SIGNALS EYE TRACKING CAN POTENTIALLY DETECT
          </h2>
          <p className="text-slate-500 font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            Understanding how visual attention patterns influence trust, engagement, comprehension, and financial decision making.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans pt-2">
          {hypotheticalSignals.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-white border border-slate-200/80 hover:border-cyan-300 transition-all duration-300 rounded-3xl p-5 flex flex-col justify-between min-h-[230px] shadow-sm relative overflow-hidden group animate-fade-in"
              >
                <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-cyan-50/50 to-transparent pointer-events-none" />
                <div className="space-y-4 relative z-10 text-left">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                      {item.title}
                    </span>
                    <div className={`p-1.5 rounded-lg border ${item.color} flex items-center justify-center`}>
                      <IconComp className="h-4 w-4" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-display font-black text-sm text-slate-900 uppercase tracking-wider">
                      {item.tag}
                    </h3>
                    <div className="bg-slate-50/50 border border-slate-100 p-2.5 rounded-xl mt-2">
                      <span className="text-[7.5px] font-black uppercase text-slate-400 tracking-wider block mb-0.5">Neuroscience Signal</span>
                      <p className="text-[10.5px] text-slate-700 leading-normal font-semibold">
                        "{item.human}"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-100 relative z-10 text-left">
                  <span className="text-[7.5px] font-black uppercase text-slate-400 tracking-widest block mb-1">Marketing Implication</span>
                  <p className="text-[10.5px] text-slate-600 leading-relaxed font-semibold">
                    {item.marketing}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── SECTION 3: HOW EYE TRACKING SIGNALS ARE INTERPRETED ─── */}
      <div className="space-y-6 select-none border-t border-slate-200/40 pt-1">
        <div className="max-w-[1400px] w-full text-left">
          <span className="text-[11px] tracking-[0.18em] font-bold text-cyan-600 block uppercase font-sans mb-3">
            Ocular Variable Interpretation
          </span>
          <h2 className="font-display font-black text-slate-900 uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            HOW EYE TRACKING DATA IS INTERPRETED
          </h2>
          <p className="text-slate-500 font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            Understanding the key visual attention metrics used in neuromarketing research.
          </p>
        </div>

        {/* Horizontal Mini Signal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans pt-2">
          {simulatedWaves.map((wave, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-200/80 rounded-3xl p-5 space-y-4 hover:border-cyan-300 transition-all duration-300 shadow-sm relative overflow-hidden group text-left"
            >
              <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-cyan-50/30 to-transparent pointer-events-none" />
              <div className="flex justify-between items-center border-b border-slate-100 pb-2 relative z-10">
                <span className="font-display font-black text-xs text-slate-900 uppercase tracking-wider">{wave.name}</span>
                <span className="text-[9.5px] font-mono font-black text-cyan-600 bg-cyan-50 border border-cyan-150 px-2 py-0.5 rounded-md">{wave.range}</span>
              </div>

              {/* Graphic path representation */}
              <div className="h-16 w-full bg-slate-50 border border-slate-100 rounded-xl flex items-center relative overflow-hidden px-3 shadow-inner">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:8px_8px] pointer-events-none" />
                <svg className="absolute inset-0 h-full w-full pointer-events-none">
                  <path d={wave.signalPath} fill="none" stroke={wave.color} strokeWidth="2.5" strokeLinecap="round" className="opacity-95" />
                </svg>
              </div>

              <div className="space-y-3.5 relative z-10">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[7.5px] font-black uppercase text-cyan-600 tracking-widest block">Ocular Variable</span>
                  <div className="text-xs font-black text-slate-800 mt-1">{wave.meaning}</div>
                </div>
                <div>
                  <span className="text-[7.5px] font-black uppercase text-slate-400 tracking-widest block">Neural Meaning</span>
                  <p className="text-[10.5px] leading-relaxed text-slate-600 font-semibold mt-1">{wave.interpretation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION 4: POTENTIAL EYE TRACKING DEPLOYMENT SCENARIOS FOR MAHINDRA FINANCE ─── */}
      <div className="space-y-6 select-none border-t border-slate-200/40 pt-1">
        <div className="max-w-[1400px] w-full text-left">
          <span className="text-[11px] tracking-[0.18em] font-bold text-cyan-600 block uppercase font-sans mb-3">
            Strategic Deployments
          </span>
          <h2 className="font-display font-black text-slate-900 uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            POTENTIAL EYE TRACKING DEPLOYMENT SCENARIOS FOR MAHINDRA FINANCE
          </h2>
          <p className="text-slate-500 font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            Potential eye tracking deployment frameworks detailing how visual attention measurement could optimize credit portals and local branch communication.
          </p>
        </div>

        {/* Grid representing scenarios */}
        <div className="grid grid-cols-12 gap-6 items-stretch font-sans pt-2">
          {hypotheticalScenarios.map((use, idx) => (
            <div 
              key={idx}
              className={`bg-white border border-slate-200/80 rounded-3xl p-5 md:p-6 shadow-sm relative overflow-hidden flex flex-col justify-between hover:border-cyan-300 hover:shadow transition-all duration-300 group ${use.style}`}
            >
              <div className="absolute top-0 right-0 h-40 w-40 bg-radial from-cyan-500/5 to-transparent pointer-events-none" />
              
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                  <span className="text-[8.5px] font-black uppercase text-cyan-600 bg-cyan-50 px-2.5 py-0.5 rounded border border-cyan-150">
                    {use.tag}
                  </span>
                  <span className="text-[7.5px] font-mono text-slate-400 font-bold">SCENARIO {(idx + 1).toString().padStart(2, "0")}</span>
                </div>

                {/* Video/Image layout placeholder */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow bg-slate-50 shrink-0 transition-all duration-500 aspect-[16/9]">
                  <img 
                    src={use.image} 
                    alt={use.title} 
                    className="w-full h-full object-cover filter brightness-[0.98]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent flex items-end p-4">
                    <h3 className="font-display font-black text-xs md:text-sm text-white uppercase tracking-wide">
                      {use.title}
                    </h3>
                  </div>
                </div>

                {/* 5 Core Fields */}
                <div className="grid gap-4 pt-2 border-t border-slate-100 grid-cols-1">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[8px] font-black text-rose-600 uppercase tracking-widest block">Marketing Challenge</span>
                    <p className="text-[10.5px] leading-relaxed text-slate-700 font-semibold mt-1">{use.challenge}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[8px] font-black text-cyan-600 uppercase tracking-widest block">What Eye Tracking Reveals</span>
                    <p className="text-[10.5px] leading-relaxed text-slate-700 font-semibold mt-1">{use.reveal}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest block">Possible Behavioral Insight</span>
                    <p className="text-[10.5px] leading-relaxed text-slate-700 font-semibold mt-1">{use.insight}</p>
                  </div>
                  <div className="bg-emerald-50/40 p-3 rounded-xl border border-emerald-100">
                    <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest block">Targeted Visual Optimization</span>
                    <p className="text-[10.5px] leading-relaxed text-slate-800 font-bold mt-1">"{use.optimize}"</p>
                  </div>
                </div>
              </div>

              {/* Business Impact Footer */}
              <div className="bg-slate-50 border border-slate-100 px-3.5 py-2.5 rounded-xl flex justify-between items-center text-[10px] font-bold mt-4 shrink-0">
                <span className="text-slate-500 flex items-center gap-1.5 uppercase text-[7.5px] tracking-widest font-black">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-500 animate-pulse" /> Expected Business Impact:
                </span>
                <span className="text-emerald-600 font-black text-right tracking-wide">{use.impact}</span>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION 5: ENTERPRISE STRATEGIC TAKEAWAYS ─── */}
      <div className="space-y-6 select-none pb-4 border-t border-slate-200/40 pt-1">
        <div className="max-w-[1400px] w-full text-left">
          <span className="text-[11px] tracking-[0.18em] font-bold text-cyan-600 block uppercase font-sans mb-3">
            Strategic Guidelines
          </span>
          <h2 className="font-display font-black text-slate-900 uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            ENTERPRISE STRATEGIC TAKEAWAYS
          </h2>
          <p className="text-slate-500 font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            Key operational eye-tracking benchmarks to guide credit portal conversions, informational clarity, and device feasibility.
          </p>
        </div>

        {/* Takeaway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans pt-2">
          {enterpriseTakeaways.map((takeaway, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-200/80 hover:border-cyan-300 transition-all duration-300 rounded-3xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[160px] group animate-fade-in text-left"
            >
              <div className="space-y-2">
                <span className="text-[8px] font-black uppercase text-cyan-600 tracking-widest block">GUIDELINE {(idx + 1).toString().padStart(2, "0")}</span>
                <h4 className="font-display font-black text-sm text-slate-900 uppercase tracking-wide">{takeaway.title}</h4>
                <p className="text-[10.5px] leading-relaxed text-slate-500 font-medium">
                  {takeaway.insight}
                </p>
              </div>
              <div className="space-y-1 mt-4">
                <div className="flex justify-between text-[7.5px] font-mono font-bold text-slate-400 uppercase">
                  <span>IMPACT SCORE</span>
                  <span className="text-cyan-600 font-black">{takeaway.score}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 border border-slate-200/60 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]" 
                    style={{ width: takeaway.score }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
