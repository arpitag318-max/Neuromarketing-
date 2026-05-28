import React from "react";
import { 
  Brain, ShieldCheck, AlertTriangle, Heart, Database, TrendingUp, 
  Activity, Target, Zap, Eye, Award
} from "lucide-react";

export function FmriStorytellingView({ tool, activeTheme }: { 
  tool: any; 
  activeTheme: any;
}) {
  // ═══════════════════════════════════════════
  // 1. HYPOTHETICAL BEHAVIORAL SIGNALS DATASET (SECTION 2)
  // ═══════════════════════════════════════════
  const hypotheticalSignals = [
    {
      title: "Trust Activation",
      tag: "Neural Response Indicator",
      human: "Borrowers subconsciously perceive the institution as emotionally reliable and secure.",
      marketing: "Localized advisory storytelling, transparent repayment explanations, and familiar branch imagery may increase trust-related activation in valuation networks.",
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-950/20",
      icon: ShieldCheck
    },
    {
      title: "Financial Risk Anxiety",
      tag: "Threat Response Indicator",
      human: "Potential loss anticipation activates subconscious defensive processing.",
      marketing: "Dense repayment structures, aggressive red warning colors, and penalty-heavy communication may amplify emotional avoidance behavior.",
      color: "border-rose-500/40 text-rose-450 bg-rose-950/20",
      icon: AlertTriangle
    },
    {
      title: "Reward Motivation",
      tag: "Value Anticipation Indicator",
      human: "Future ownership reward anticipation strengthens approach motivation.",
      marketing: "Campaigns emphasizing prosperity, family advancement, and productive asset ownership may increase aspirational reward engagement.",
      color: "border-purple-500/40 text-purple-400 bg-purple-950/20",
      icon: Heart
    },
    {
      title: "Cognitive Conflict",
      tag: "Decision Friction Indicator",
      human: "Conflicting financial information creates subconscious uncertainty and hesitation.",
      marketing: "Complex disclosures, overloaded forms, and hidden repayment variables may biologically elevate decision fatigue.",
      color: "border-amber-500/40 text-amber-400 bg-amber-955/20",
      icon: Brain
    },
    {
      title: "Memory Consolidation",
      tag: "Long-Term Recall Indicator",
      human: "Emotionally meaningful visual experiences are retained more deeply in memory systems.",
      marketing: "Emotion-rich family narratives and regionally familiar agricultural visuals may strengthen long-term brand recall.",
      color: "border-blue-500/40 text-blue-300 bg-blue-950/20",
      icon: Database
    },
    {
      title: "Digital Payment Resistance",
      tag: "Payment Pain Indicator",
      human: "Invisible money movement increases subconscious financial discomfort.",
      marketing: "Cold digital EMI systems without reassurance layers may trigger avoidance toward online repayment adoption.",
      color: "border-rose-500/40 text-rose-400 bg-rose-955/20",
      icon: AlertTriangle
    },
    {
      title: "Fairness Evaluation",
      tag: "Social Equity Indicator",
      human: "Perceived imbalance in financial structures creates biological rejection responses.",
      marketing: "Opaque repayment schedules and hidden conditions may subconsciously reduce acceptance rates.",
      color: "border-indigo-500/40 text-indigo-300 bg-indigo-950/20",
      icon: Target
    },
    {
      title: "Emotional Security",
      tag: "Safety Response Indicator",
      human: "Warm interpersonal guidance reduces defensive financial processing.",
      marketing: "Human advisory visuals, empathetic language, and assisted onboarding systems may reduce loan anxiety.",
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-950/20",
      icon: ShieldCheck
    }
  ];

  // ═══════════════════════════════════════════
  // 2. BRAIN REGION INTERPRETATIONS (SECTION 3)
  // ═══════════════════════════════════════════
  const brainRegions = [
    {
      name: "AMYGDALA ACTIVATION",
      function: "Fear & Threat Processing",
      state: "High amygdala activity may indicate emotional stress, financial insecurity, or defensive reactions during repayment or onboarding exposure.",
      interpretation: "Penalty-heavy messaging and legal-density interfaces may trigger subconscious withdrawal behavior.",
      color: "#ef4444"
    },
    {
      name: "NUCLEUS ACCUMBENS RESPONSE",
      function: "Reward Anticipation System",
      state: "Increased reward-center activation may indicate aspirational ownership motivation and positive financial expectancy.",
      interpretation: "Tractor ownership visuals, family growth narratives, and prosperity framing may strengthen financing motivation.",
      color: "#10b981"
    },
    {
      name: "HIPPOCAMPAL MEMORY ENCODING",
      function: "Long-Term Recall System",
      state: "Higher hippocampal engagement may reflect stronger emotional memory retention.",
      interpretation: "Regionally familiar imagery and emotionally resonant storytelling may improve brand recall after campaign exposure.",
      color: "#818cf8"
    },
    {
      name: "ANTERIOR INSULA ACTIVATION",
      function: "Risk & Payment Discomfort",
      state: "Elevated insular activity may indicate perceived financial threat, unfairness, or repayment anxiety.",
      interpretation: "Aggressive collection systems and high-complexity EMI structures may increase subconscious emotional resistance.",
      color: "#f59e0b"
    },
    {
      name: "DORSOLATERAL PREFRONTAL CORTEX",
      function: "Rational Evaluation Network",
      state: "Strong dlPFC engagement may indicate active analytical processing and logical financial comparison.",
      interpretation: "Clear repayment calculators, transparent breakdowns, and structured financial education may improve decision clarity.",
      color: "#06b6d4"
    },
    {
      name: "VENTROMEDIAL PREFRONTAL CORTEX",
      function: "Value & Trust Integration",
      state: "Enhanced vmPFC activity may reflect emotional trust formation and perceived product value.",
      interpretation: "Warm advisory communication and emotionally secure narratives may strengthen subconscious financing acceptance.",
      color: "#a855f7"
    }
  ];

  // ═══════════════════════════════════════════
  // 3. HYPOTHETICAL MAHINDRA SCENARIOS (SECTION 4)
  // ═══════════════════════════════════════════
  const hypotheticalScenarios = [
    {
      title: "Cash to Digital EMI Transition Calibration",
      tag: "Payment Systems",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fmri_trust_comfort.png",
      challenge: "Rural borrowers often prefer physical EMI collection methods over digital repayment systems due to subconscious trust and control biases.",
      reveal: "Anterior Insula activation may potentially increase during digital payment exposure, reflecting the subconscious 'pain of paying' and uncertainty around invisible money movement.",
      insight: "Cold digital interfaces without reassurance cues may amplify emotional resistance toward auto-debit or app-based repayments.",
      optimize: "Introduce human reassurance layers, repayment transparency visuals, vernacular onboarding guidance, and branch-assistance anchors within EMI payment flows.",
      impact: "Potential acceleration in digital EMI adoption and reduction in physical collection dependency."
    },
    {
      title: "SME Trust Engineering",
      tag: "Business Lending",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fmri_narrative.png",
      challenge: "Small business borrowers often hesitate to trust institutional lending systems due to fear of repayment rigidity and low emotional familiarity.",
      reveal: "Dorsal Striatum and vmPFC activity may potentially increase when SME borrowers are exposed to localized entrepreneurial success narratives.",
      insight: "Community-based business growth stories may biologically strengthen trust expectancy and financing openness.",
      optimize: "Embed real regional entrepreneur journeys, advisory imagery, and collaborative business-growth narratives into SME lending campaigns.",
      impact: "Potential increase in SME onboarding confidence and long-term borrower retention."
    },
    {
      title: "Cultural Brand Resonance Mapping",
      tag: "Regional Marketing",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fmri_memory.png",
      challenge: "Rural financial consumers often trust local ecosystems more than large institutional brands.",
      reveal: "Hippocampal memory retrieval and dlPFC activation may potentially increase when culturally familiar symbols and community-driven narratives appear in communication.",
      insight: "Localized identity cues may override purely rational price comparisons and strengthen emotional brand attachment.",
      optimize: "Use region-specific storytelling, authentic agricultural imagery, local language voiceovers, and familiar environmental textures.",
      impact: "Potential increase in subconscious trust recall and stronger regional brand penetration."
    },
    {
      title: "Interest Rate Perception Calibration",
      tag: "Pricing Strategy",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fmri_hesitation.png",
      challenge: "Higher-risk rural financing products may create emotional resistance when interest rates are framed aggressively.",
      reveal: "Medial Orbitofrontal Cortex (mOFC) activity may potentially increase when pricing is framed through aspirational ownership rather than numerical burden.",
      insight: "Premium-value framing may reduce subconscious 'financial exploitation' perception.",
      optimize: "Present financing as a long-term prosperity accelerator using emotional ownership framing instead of rate-heavy messaging.",
      impact: "Potential reduction in pricing anxiety and increased financing acceptance."
    },
    {
      title: "Digital Loan Application Friction Analysis",
      tag: "Onboarding UX",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fmri_anxiety.png",
      challenge: "Complex onboarding systems trigger abandonment during digital self-service loan applications.",
      reveal: "dACC activation may potentially spike during moments of legal confusion, overloaded forms, or unclear repayment structures.",
      insight: "Consumers subconsciously interpret interface complexity as institutional risk.",
      optimize: "Break onboarding into progressive stages with reassurance checkpoints, conversational guidance, and reduced legal density.",
      impact: "Potential improvement in onboarding completion rates and reduced cognitive friction."
    },
    {
      title: "Financial Literacy Effectiveness Testing",
      tag: "Education Programs",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fmri_memory.png",
      challenge: "Traditional financial literacy programs fail to accurately measure deep comprehension and behavioral retention.",
      reveal: "Memory-encoding structures such as the hippocampus may potentially demonstrate whether financial education content is neurologically retained.",
      insight: "Story-driven visual education may outperform dense informational teaching systems.",
      optimize: "Convert financial education into emotionally contextualized visual storytelling using rural household scenarios.",
      impact: "Potential increase in financial understanding and healthier repayment behavior."
    },
    {
      title: "Risk Propensity Segmentation",
      tag: "Customer Profiling",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fmri_attention_drop.png",
      challenge: "Different borrower segments demonstrate highly variable financial risk tolerance patterns.",
      reveal: "The balance between Nucleus Accumbens reward activation and Insula-based fear processing may potentially reveal regional financing risk appetite.",
      insight: "Some agricultural communities may emotionally prioritize growth opportunity over repayment fear.",
      optimize: "Adapt financing communication intensity based on regional emotional risk appetite clusters.",
      impact: "Potential increase in product-market fit and financing conversion precision."
    },
    {
      title: "NPA Recovery Communication Optimization",
      tag: "Collections",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fmri_anxiety.png",
      challenge: "Aggressive debt recovery messaging increases borrower avoidance and emotional shutdown.",
      reveal: "Amygdala hyperactivation may potentially occur when repayment reminders use fear-heavy language.",
      insight: "Threat-driven messaging may biologically trigger avoidance rather than cooperation.",
      optimize: "Shift collection systems toward collaborative restructuring narratives and emotionally neutral repayment assistance.",
      impact: "Potential improvement in borrower engagement during recovery cycles."
    },
    {
      title: "Fairness Perception Engineering",
      tag: "Product Design",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fmri_hesitation.png",
      challenge: "Consumers often reject financially beneficial offers if the structure feels emotionally unfair.",
      reveal: "Anterior Insula activity may potentially spike when borrowers perceive hidden asymmetry or exploitative repayment structures.",
      insight: "Subconscious fairness perception heavily influences loan acceptance probability.",
      optimize: "Use transparent repayment storytelling, equal-benefit framing, and visible borrower protections.",
      impact: "Potential increase in product acceptance and trust stability."
    },
    {
      title: "Neuroeconomic Credit Modeling",
      tag: "Risk Assessment",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fmri_trust_comfort.png",
      challenge: "Millions of rural borrowers lack traditional credit history infrastructure.",
      reveal: "Neural patterns related to delayed gratification, reward anticipation, and trust processing may potentially correlate with repayment behavior tendencies.",
      insight: "Behavioral neuroscience may strengthen alternative credit scoring systems for underserved demographics.",
      optimize: "Integrate neuroeconomic behavioral variables into AI-driven borrower segmentation frameworks.",
      impact: "Potential improvement in lending precision and reduction in non-performing assets (NPAs)."
    },
    {
      title: "Festival Season Emotional Calibration",
      tag: "Seasonal Campaigns",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fmri_narrative.png",
      challenge: "Large-scale festive financing campaigns often fail to emotionally differentiate themselves within highly cluttered seasonal advertising environments.",
      reveal: "Nucleus Accumbens reward activation and hippocampal memory encoding may potentially increase when festive narratives are tied to family prosperity, harvest success, and aspirational ownership milestones.",
      insight: "Generic festive templates may create emotional habituation, while culturally grounded emotional narratives may biologically strengthen memorability and emotional resonance.",
      optimize: "Integrate regional festive rituals, family achievement moments, emotional agricultural symbolism, and prosperity-linked ownership storytelling into seasonal campaign assets.",
      impact: "Potential increase in festive campaign recall, emotional engagement depth, and seasonal financing conversion intent."
    },
    {
      title: "Women Borrower Confidence Research",
      tag: "Inclusive Finance",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fmri_trust_comfort.png",
      challenge: "Traditional financial communication often underrepresents female financial participation and co-decision-making influence in rural lending ecosystems.",
      reveal: "vmPFC trust valuation activity and social cognition networks may potentially increase when women are portrayed as active financial contributors rather than passive secondary participants.",
      insight: "Inclusive representation and collaborative family ownership narratives may subconsciously strengthen trust, belonging, and financial confidence among female borrowers.",
      optimize: "Depict women actively participating in agricultural ownership, EMI discussions, business management, and financial decision journeys.",
      impact: "Potential increase in female borrower trust, co-signing participation, and household-level financing adoption."
    }
  ];

  // ═══════════════════════════════════════════
  // 4. ENTERPRISE STRATEGIC TAKEAWAYS (SECTION 5)
  // ═══════════════════════════════════════════
  const enterpriseTakeaways = [
    {
      title: "Trust Architecture",
      insight: "Subconscious trust formation is biologically measurable and strategically optimizable.",
      icon: ShieldCheck,
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-950/20"
    },
    {
      title: "Emotional Pricing",
      insight: "Interest rate perception is emotionally processed, not purely rational.",
      icon: TrendingUp,
      color: "border-purple-500/40 text-purple-400 bg-purple-950/20"
    },
    {
      title: "Memory Engineering",
      insight: "Brand recall is strengthened through emotionally contextualized regional narratives.",
      icon: Database,
      color: "border-blue-500/40 text-blue-300 bg-blue-950/20"
    },
    {
      title: "Friction Diagnosis",
      insight: "Cognitive conflict and decision hesitation are neurologically detectable.",
      icon: Activity,
      color: "border-amber-500/40 text-amber-400 bg-amber-955/20"
    },
    {
      title: "Behavioral Segmentation",
      insight: "Neural risk appetite patterns may enable precision financing strategies.",
      icon: Target,
      color: "border-indigo-500/40 text-indigo-300 bg-indigo-950/20"
    },
    {
      title: "Fairness Perception",
      insight: "Subconscious equity evaluation heavily influences financing acceptance.",
      icon: Award,
      color: "border-rose-500/40 text-rose-400 bg-rose-955/20"
    },
    {
      title: "Reward Motivation",
      insight: "Aspirational ownership framing activates biological approach systems.",
      icon: Zap,
      color: "border-cyan-500/40 text-cyan-400 bg-cyan-950/20"
    }
  ];

  // ═══════════════════════════════════════════
  // 5. IMPLEMENTATION MAP (SECTION 6)
  // ═══════════════════════════════════════════
  const implementationPhases = [
    {
      phase: "Phase 1",
      title: "Research Infrastructure Setup",
      description: "Establish fMRI research partnerships with neuroscience institutions and behavioral labs.",
      timeline: "Q1-Q2"
    },
    {
      phase: "Phase 2",
      title: "Pilot Campaign Testing",
      description: "Test high-priority marketing assets with controlled borrower cohorts.",
      timeline: "Q2-Q3"
    },
    {
      phase: "Phase 3",
      title: "Behavioral Insight Integration",
      description: "Translate neural findings into actionable marketing and UX optimizations.",
      timeline: "Q3-Q4"
    },
    {
      phase: "Phase 4",
      title: "Regional Deployment",
      description: "Scale neuro-optimized campaigns across priority rural and semi-urban markets.",
      timeline: "Q4-Q1"
    },
    {
      phase: "Phase 5",
      title: "Performance Measurement",
      description: "Track conversion impact, trust metrics, and behavioral engagement improvements.",
      timeline: "Q1-Q2"
    },
    {
      phase: "Phase 6",
      title: "Continuous Optimization",
      description: "Establish ongoing neuromarketing calibration cycles for product and campaign evolution.",
      timeline: "Ongoing"
    }
  ];

  return (
    <div className="col-span-12 space-y-24 pb-12 relative font-sans text-[#E5E7EB] bg-background">
      {/* Soft warm/lavender subtle radial glows representing deep brain activity */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#A11D33]/2 via-background to-background pointer-events-none rounded-3xl -z-10 animate-fade-in" />
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] bg-radial from-purple-500/2 to-transparent pointer-events-none blur-3xl -z-10 animate-pulse" />

      {/* ─── SECTION 1: ENTERPRISE HERO INTRO (McKinsey + Apple + Rural Intelligence) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#090809]/95 border border-stone-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden select-none">
        <div className="absolute top-0 right-0 h-96 w-96 bg-radial from-[#A11D33]/10 to-transparent pointer-events-none blur-3xl animate-pulse" />
        
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-[10px] font-black uppercase tracking-wider">
              <Brain className="h-3.5 w-3.5 text-purple-400" /> Deep Brain Imaging Technique
            </div>
            <h1 className="font-display font-black text-3xl md:text-4xl text-white uppercase tracking-tight leading-tight">
              Functional Magnetic Resonance Imaging (fMRI)
            </h1>
            <p className="text-sm text-[#E5E7EB] font-medium leading-relaxed max-w-xl">
              fMRI helps decode deep emotional processing, reward anticipation, trust formation, and financial anxiety by measuring blood oxygen changes in specific brain regions. Marketing teams can potentially identify subconscious friction points that traditional research methods cannot capture.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 border-t border-stone-850 pt-5">
            <div>
              <div className="text-[9px] uppercase font-black text-[#FF758F] tracking-wider">What It Measures</div>
              <div className="text-xs font-black text-white mt-1 uppercase tracking-wide">Blood Oxygen Flow</div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-[#CBD5E1] tracking-wider">Best Use</div>
              <div className="text-xs font-black text-purple-300 mt-1 uppercase tracking-wide">Emotion & Value</div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-[#CBD5E1] tracking-wider">Business Relevance</div>
              <div className="text-xs font-black text-white mt-1 uppercase tracking-wide leading-tight">Trust Engineering</div>
            </div>
          </div>
        </div>

        {/* Realistic Aspirational Visual */}
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl border border-stone-850 aspect-[4/3] group">
          <img 
            src="/images/fmri_hero.png" 
            alt="Rural borrower participant in fMRI scanner during financial decision-making research" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 filter brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-6">
            <span className="text-[9px] font-black uppercase text-amber-400 tracking-wider mb-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" /> Simulated Deployment Scenario
            </span>
            <h3 className="font-display font-black text-sm text-white uppercase tracking-wide">
              Neuroeconomic Decision Research
            </h3>
            <p className="text-[11px] text-[#E5E7EB] mt-1 leading-normal font-medium max-w-md">
              fMRI scanning could potentially help decode deep emotional responses to financing products, trust formation patterns, and subconscious risk evaluation during borrower decision-making.
            </p>
          </div>
        </div>
      </div>

      {/* ─── SECTION 2: WHAT fMRI ACTUALLY HELPS UNDERSTAND (BENTO GRID) ─── */}
      <div className="space-y-6 select-none">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            Behavioral Indicators
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            Behavioral Signals fMRI Can Potentially Detect
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            Understanding the deep emotional and subconscious processing patterns that influence trust, financial anxiety, and borrower decision-making.
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
                        "{item.human}"
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

      {/* ─── SECTION 3: SIMPLE fMRI EXPLANATION (HORIZONTAL BRAIN REGION INTERPRETATION) ─── */}
      <div className="space-y-6 select-none border-t border-stone-200/20 pt-1">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            fMRI Signal Interpretation
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            How fMRI Brain Regions Are Interpreted
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            A clean look at key brain regions and what their activation patterns potentially indicate about borrower emotional processing.
          </p>
        </div>

        {/* Horizontal Brain Region Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans pt-2">
          {brainRegions.map((region, idx) => (
            <div 
              key={idx}
              className="bg-[#0c0b0c] border border-stone-800 rounded-3xl p-5 space-y-4 hover:border-stone-700 transition-all duration-300 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-white/1 to-transparent pointer-events-none" />
              <div className="flex justify-between items-center border-b border-stone-850 pb-2 relative z-10">
                <span className="font-display font-black text-xs text-white uppercase tracking-wider">{region.name}</span>
              </div>

              {/* Brain region visual representation */}
              <div className="h-16 w-full bg-[#050405] border border-stone-900 rounded-xl flex items-center justify-center relative overflow-hidden shadow-inner group-hover:border-stone-800 transition-colors">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:8px_8px] pointer-events-none" />
                <div 
                  className="h-10 w-10 rounded-full opacity-80 animate-pulse"
                  style={{ 
                    backgroundColor: region.color,
                    boxShadow: `0 0 20px ${region.color}40`
                  }}
                />
              </div>

              <div className="space-y-3.5 relative z-10">
                <div className="bg-[#121011] p-2.5 rounded-xl border border-stone-850">
                  <span className="text-[7.5px] font-black uppercase text-rose-500 tracking-widest block">Neural Function</span>
                  <div className="text-xs font-black text-white mt-1">{region.function}</div>
                </div>
                <div>
                  <span className="text-[7.5px] font-black uppercase text-[#94A3B8] tracking-widest block">Activation State</span>
                  <p className="text-[10.5px] leading-relaxed text-[#CBD5E1] font-semibold mt-1">{region.state}</p>
                </div>
                <div>
                  <span className="text-[7.5px] font-black uppercase text-[#94A3B8] tracking-widest block">Marketing Interpretation</span>
                  <p className="text-[10.5px] leading-relaxed text-[#CBD5E1] font-semibold mt-1">{region.interpretation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION 4: POTENTIAL fMRI DEPLOYMENT SCENARIOS FOR MAHINDRA FINANCE ─── */}
      <div className="space-y-6 select-none border-t border-stone-200/20 pt-1">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            Deployment Scenarios
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            Potential fMRI Deployment Scenarios<br className="hidden lg:inline" /> for Mahindra&nbsp;Finance
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            Hypothetical frameworks detailing how deep brain imaging could potentially decode emotional trust, financial anxiety, and subconscious decision-making patterns.
          </p>
        </div>

        {/* 3-Column Grid representing fMRI intelligence grid */}
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

                {/* 5 Core Hypothetical Fields */}
                <div className="grid gap-4 pt-2 border-t border-stone-850 grid-cols-1">
                  <div className="bg-[#121011] p-3 rounded-xl border border-stone-850">
                    <span className="text-[8px] font-black text-rose-450 uppercase tracking-widest block">Marketing Challenge</span>
                    <p className="text-[10.5px] leading-relaxed text-[#E5E7EB] font-semibold mt-1">{use.challenge}</p>
                  </div>
                  <div className="bg-[#121011] p-3 rounded-xl border border-stone-850">
                    <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest block">What fMRI Telemetry Reveals</span>
                    <p className="text-[10.5px] leading-relaxed text-[#E5E7EB] font-semibold mt-1">{use.reveal}</p>
                  </div>
                  <div className="bg-[#121011] p-3 rounded-xl border border-stone-850">
                    <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest block">Subconscious Insight</span>
                    <p className="text-[10.5px] leading-relaxed text-[#E5E7EB] font-semibold mt-1">{use.insight}</p>
                  </div>
                  <div className="bg-[#121011] p-3 rounded-xl border border-stone-850">
                    <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest block">Strategic Optimization</span>
                    <p className="text-[10.5px] leading-relaxed text-[#E5E7EB] font-semibold mt-1">{use.optimize}</p>
                  </div>
                  <div className="bg-[#121011] p-3 rounded-xl border border-stone-850">
                    <span className="text-[8px] font-black text-amber-400 uppercase tracking-widest block">Predicted Behavioral Impact</span>
                    <p className="text-[10.5px] leading-relaxed text-[#E5E7EB] font-semibold mt-1">{use.impact}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION 5: ENTERPRISE STRATEGIC TAKEAWAYS (SCORECARD GRID) ─── */}
      <div className="space-y-6 select-none border-t border-stone-200/20 pt-1">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            Enterprise Strategic Takeaways
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            Strategic Intelligence from fMRI Research
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            Key strategic insights that fMRI-based neuromarketing research could potentially unlock for rural and semi-urban financing ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans pt-2">
          {enterpriseTakeaways.map((takeaway, idx) => {
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

      {/* ─── SECTION 6: IMPLEMENTATION MAP (WORKFLOW PHASES) ─── */}
      <div className="space-y-6 select-none border-t border-stone-200/20 pt-1">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            Implementation Roadmap
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            fMRI Research Implementation Framework
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            A structured phased approach to integrating fMRI-based neuromarketing research into enterprise marketing and product strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans pt-2">
          {implementationPhases.map((phase, idx) => (
            <div 
              key={idx}
              className="bg-[#0c0b0c] border border-stone-800 rounded-3xl p-5 hover:border-stone-700 transition-all duration-300 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-white/2 to-transparent pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center border-b border-stone-850 pb-2.5">
                  <span className="text-[8.5px] font-black uppercase text-[#FF758F] bg-[#A11D33]/15 px-2.5 py-0.5 rounded border border-[#A11D33]/30">
                    {phase.phase}
                  </span>
                  <span className="text-[9.5px] font-mono font-black text-cyan-400 bg-cyan-955 border border-cyan-500/25 px-2 py-0.5 rounded-md">{phase.timeline}</span>
                </div>
                <div>
                  <h3 className="font-display font-black text-sm text-white uppercase tracking-wider mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-[10.5px] text-[#CBD5E1] leading-relaxed font-semibold">
                    {phase.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
