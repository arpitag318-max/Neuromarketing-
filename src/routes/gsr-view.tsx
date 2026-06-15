import React from "react";
import { 
  Brain, ShieldCheck, AlertTriangle, Heart, Database, TrendingUp, 
  Activity, Target, Zap, Eye, Award, Sliders, EyeOff
} from "lucide-react";

function GsrSignalChart({ name, color }: { name: string; color: string }) {
  let chartContent: React.ReactNode = null;
  let signalLabel = "uS";
  let valueLabel = "0.0";

  switch (name) {
    case "TONIC SKIN CONDUCTANCE LEVEL (SCL)":
      signalLabel = "SCL baseline";
      valueLabel = "5.2 uS";
      chartContent = (
        <>
          <path
            d="M 10,42 C 60,38 100,20 150,25 C 200,28 220,45 230,40"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            filter={`url(#glow-${color.replace('#', '')})`}
          />
          <path
            d="M 10,42 C 60,38 100,20 150,25 C 200,28 220,45 230,40"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <text x="15" y="55" fill="#57534e" fontSize="6" fontWeight="bold">0s</text>
          <text x="215" y="55" fill="#57534e" fontSize="6" fontWeight="bold">60s</text>
        </>
      );
      break;

    case "PHASIC SKIN CONDUCTANCE RESPONSE (SCR)":
      signalLabel = "Phasic spikes";
      valueLabel = "1.8 Hz";
      chartContent = (
        <>
          <path
            d="M 10,48 L 30,48 L 35,15 C 45,20 50,45 60,48 L 100,48 L 105,10 C 115,15 120,45 130,48 L 170,48 L 175,20 C 185,25 190,45 200,48 L 230,48"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            filter={`url(#glow-${color.replace('#', '')})`}
          />
          <path
            d="M 10,48 L 30,48 L 35,15 C 45,20 50,45 60,48 L 100,48 L 105,10 C 115,15 120,45 130,48 L 170,48 L 175,20 C 185,25 190,45 200,48 L 230,48"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="35" cy="15" r="2" fill="#ef4444" />
          <circle cx="105" cy="10" r="2" fill="#ef4444" />
          <circle cx="175" cy="20" r="2" fill="#ef4444" />
        </>
      );
      break;

    case "EVENT-RELATED SCR (ER-SCR)":
      signalLabel = "Stimulus Lock";
      valueLabel = "ER-SCR";
      chartContent = (
        <>
          <line x1="80" y1="5" x2="80" y2="55" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3" />
          <text x="84" y="15" fill="#ef4444" fontSize="7" fontWeight="black" letterSpacing="0.05em">STIMULUS</text>
          <path
            d="M 10,48 L 80,48 L 92,48 L 110,12 C 125,18 160,40 230,46"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            filter={`url(#glow-${color.replace('#', '')})`}
          />
          <path
            d="M 10,48 L 80,48 L 92,48 L 110,12 C 125,18 160,40 230,46"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line x1="80" y1="48" x2="92" y2="48" stroke="#10b981" strokeWidth="2" />
          <text x="68" y="55" fill="#10b981" fontSize="6" fontWeight="bold">Latency</text>
        </>
      );
      break;

    case "NON-SPECIFIC SCR (NS-SCR)":
      signalLabel = "NS-SCR drift";
      valueLabel = "4.2 min-1";
      chartContent = (
        <>
          <path
            d="M 10,45 Q 25,30 40,42 T 70,35 T 100,48 T 130,38 T 160,45 T 190,30 T 220,42 T 230,45"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            filter={`url(#glow-${color.replace('#', '')})`}
          />
          <path
            d="M 10,45 Q 25,30 40,42 T 70,35 T 100,48 T 130,38 T 160,45 T 190,30 T 220,42 T 230,45"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      );
      break;

    case "ANTICIPATORY AROUSAL":
      signalLabel = "Pre-decision climb";
      valueLabel = "+82% Arousal";
      chartContent = (
        <>
          <line x1="180" y1="5" x2="180" y2="55" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3" />
          <text x="135" y="15" fill="#8b5cf6" fontSize="6" fontWeight="black" letterSpacing="0.05em">EXPECTED TASK</text>
          <path
            d="M 10,50 C 50,48 100,40 140,25 C 160,18 175,10 180,8 L 190,8 C 205,10 220,25 230,30"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            filter={`url(#glow-${color.replace('#', '')})`}
          />
          <path
            d="M 10,50 C 50,48 100,40 140,25 C 160,18 175,10 180,8 L 190,8 C 205,10 220,25 230,30"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      );
      break;

    case "EMOTIONAL OVERLOAD PATTERNS":
      signalLabel = "Stress saturation";
      valueLabel = "9.4 uS";
      chartContent = (
        <>
          <path
            d="M 10,35 L 20,15 L 28,28 L 35,10 L 45,30 L 52,12 L 62,25 L 70,8 L 80,28 L 88,10 L 98,22 L 105,5 L 115,25 L 122,8 L 132,20 L 140,8 L 150,28 L 158,12 L 168,22 L 175,5 L 185,25 L 192,8 L 202,22 L 210,12 L 220,30 L 230,25"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            filter={`url(#glow-${color.replace('#', '')})`}
          />
          <path
            d="M 10,35 L 20,15 L 28,28 L 35,10 L 45,30 L 52,12 L 62,25 L 70,8 L 80,28 L 88,10 L 98,22 L 105,5 L 115,25 L 122,8 L 132,20 L 140,8 L 150,28 L 158,12 L 168,22 L 175,5 L 185,25 L 192,8 L 202,22 L 210,12 L 220,30 L 230,25"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect x="50" y="8" width="130" height="42" fill="rgba(239, 68, 68, 0.08)" stroke="rgba(239, 68, 68, 0.2)" strokeDasharray="2,2" rx="4" />
          <text x="95" y="32" fill="#ef4444" fontSize="7" fontWeight="black" letterSpacing="0.08em">OVERLOAD ZONE</text>
        </>
      );
      break;

    case "HABITUATION RESPONSE":
      signalLabel = "Adaptation curve";
      valueLabel = "t1/2 Decay";
      chartContent = (
        <>
          <path
            d="M 10,48 L 25,48 L 30,10 C 40,15 45,45 55,48 L 75,48 L 80,22 C 90,25 95,45 105,48 L 125,48 L 130,30 C 140,32 145,45 155,48 L 175,48 L 180,38 C 190,39 195,45 205,48 L 230,48"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            filter={`url(#glow-${color.replace('#', '')})`}
          />
          <path
            d="M 10,48 L 25,48 L 30,10 C 40,15 45,45 55,48 L 75,48 L 80,22 C 90,25 95,45 105,48 L 125,48 L 130,30 C 140,32 145,45 155,48 L 175,48 L 180,38 C 190,39 195,45 205,48 L 230,48"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M 40,8 L 190,30" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" markerEnd="url(#arrow)" />
        </>
      );
      break;

    case "ENGAGEMENT PERSISTENCE":
      signalLabel = "Autonomic stability";
      valueLabel = "Steady State";
      chartContent = (
        <>
          <path
            d="M 10,32 C 30,28 50,35 70,30 C 90,25 110,35 130,32 C 150,28 170,35 190,30 C 210,28 220,32 230,30"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            filter={`url(#glow-${color.replace('#', '')})`}
          />
          <path
            d="M 10,32 C 30,28 50,35 70,30 C 90,25 110,35 130,32 C 150,28 170,35 190,30 C 210,28 220,32 230,30"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      );
      break;

    case "EMOTIONAL RECOVERY RATE":
      signalLabel = "T1/2 Recovery";
      valueLabel = "2.8s Recovery";
      chartContent = (
        <>
          <path
            d="M 10,48 L 35,48 L 40,10 C 55,15 90,48 180,48 L 230,48"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            filter={`url(#glow-${color.replace('#', '')})`}
          />
          <path
            d="M 10,48 L 35,48 L 40,10 C 55,15 90,48 180,48 L 230,48"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line x1="40" y1="29" x2="110" y2="29" stroke={color} strokeWidth="1" strokeDasharray="2,2" />
          <text x="50" y="25" fill={color} fontSize="6" fontWeight="bold">Half-Recovery (t50)</text>
        </>
      );
      break;

    case "SURPRISE ACTIVATION":
      signalLabel = "Shock reaction";
      valueLabel = "+3.4 uS Spike";
      chartContent = (
        <>
          <path
            d="M 10,48 L 95,48 L 100,8 C 110,12 130,45 150,48 L 230,48"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            filter={`url(#glow-${color.replace('#', '')})`}
          />
          <path
            d="M 10,48 L 95,48 L 100,8 C 110,12 130,45 150,48 L 230,48"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      );
      break;

    default:
      chartContent = (
        <path
          d="M 10,32 H 230"
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
      );
  }

  return (
    <div className="h-16 w-full bg-[#050405] border border-stone-900 rounded-xl flex items-center justify-center relative overflow-hidden shadow-inner group-hover:border-stone-800 transition-colors">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:8px_8px] pointer-events-none" />
      <svg className="absolute inset-0 h-full w-full select-none" viewBox="0 0 240 64">
        <defs>
          <filter id={`glow-${color.replace('#', '')}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
          </marker>
        </defs>
        <line x1="10" y1="55" x2="230" y2="55" stroke="#1c1917" strokeWidth="1" />
        <line x1="10" y1="5" x2="10" y2="55" stroke="#1c1917" strokeWidth="1" />
        {chartContent}
        <text x="12" y="12" fill="#57534e" fontSize="5.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.05em">{signalLabel.toUpperCase()}</text>
        <text x="228" y="12" fill={color} fontSize="6" fontFamily="monospace" fontWeight="bold" textAnchor="end">{valueLabel}</text>
      </svg>
    </div>
  );
}

export function GsrStorytellingView({ tool, activeTheme }: { 
  tool: any; 
  activeTheme: any;
}) {
  // ═══════════════════════════════════════════
  // 1. HYPOTHETICAL BEHAVIORAL SIGNALS DATASET (SECTION 2)
  // ═══════════════════════════════════════════
  const hypotheticalSignals = [
    {
      title: "Financial Anxiety",
      tag: "Stress Indicator",
      human: "Elevated tonic conductance reflects chronic emotional stress and anticipatory financial fear.",
      marketing: "Complex EMI structures and aggressive repayment communication may biologically overwhelm first-time rural borrowers.",
      color: "border-rose-500/40 text-rose-450 bg-rose-950/20",
      icon: AlertTriangle
    },
    {
      title: "Decision Friction",
      tag: "Hesitation Indicator",
      human: "Acute SCR spikes indicate subconscious hesitation during high-stakes decision moments.",
      marketing: "Loan authorization screens and hidden conditions may trigger emotional resistance before conscious rejection occurs.",
      color: "border-amber-500/40 text-amber-400 bg-amber-955/20",
      icon: Sliders
    },
    {
      title: "Trust Discomfort",
      tag: "Institutional Distrust",
      human: "Sustained autonomic arousal reflects institutional distrust and psychological defensiveness.",
      marketing: "Purely digital onboarding systems without human reassurance may increase borrower abandonment probability.",
      color: "border-indigo-500/40 text-indigo-300 bg-indigo-950/20",
      icon: ShieldCheck
    },
    {
      title: "Emotional Engagement",
      tag: "Attention Indicator",
      human: "Moderate sympathetic activation reflects focused emotional attention and cognitive absorption.",
      marketing: "Localized prosperity storytelling and family-oriented financial narratives may increase borrower emotional resonance.",
      color: "border-purple-500/40 text-purple-400 bg-purple-950/20",
      icon: Heart
    },
    {
      title: "Repayment Tension",
      tag: "Anticipatory Stress",
      human: "Anticipatory conductance increases emerge prior to emotionally stressful repayment exposure.",
      marketing: "Penalty-heavy WhatsApp reminders may trigger repayment avoidance instead of repayment action.",
      color: "border-rose-500/40 text-rose-400 bg-rose-955/20",
      icon: AlertTriangle
    },
    {
      title: "Cognitive Overload",
      tag: "Processing Burden",
      human: "Erratic phasic responses indicate excessive mental processing burden.",
      marketing: "Dense legal disclosures and overloaded dashboards may biologically exceed borrower comprehension thresholds.",
      color: "border-blue-500/40 text-blue-300 bg-blue-950/20",
      icon: Brain
    },
    {
      title: "Fear Response Activation",
      tag: "Threat Detection",
      human: "Hyper-reactive sympathetic spikes indicate perceived financial threat.",
      marketing: "Aggressive collection messaging may push borrowers into emotional shutdown states.",
      color: "border-rose-500/40 text-rose-450 bg-rose-950/20",
      icon: AlertTriangle
    },
    {
      title: "Attention Intensity",
      tag: "Focus Priority",
      human: "High-amplitude arousal peaks reflect biologically prioritized attention.",
      marketing: "Critical repayment instructions must visually stand out during emotionally intense moments.",
      color: "border-cyan-500/40 text-cyan-400 bg-cyan-950/20",
      icon: Eye
    },
    {
      title: "Uncertainty Processing",
      tag: "Confusion Indicator",
      human: "Unpredictable autonomic fluctuations indicate confusion and decision instability.",
      marketing: "Ambiguous vernacular translations may increase onboarding stress and digital hesitation.",
      color: "border-amber-500/40 text-amber-400 bg-amber-955/20",
      icon: EyeOff
    },
    {
      title: "Emotional Recovery Speed",
      tag: "Stress Persistence",
      human: "Delayed conductance recovery indicates prolonged emotional stress persistence.",
      marketing: "Borrowers experiencing repayment trauma may require slower, empathetic financial communication strategies.",
      color: "border-indigo-500/40 text-indigo-300 bg-indigo-950/20",
      icon: Activity
    },
    {
      title: "Reward Excitement",
      tag: "Positive Arousal",
      human: "Positive sympathetic arousal emerges during emotionally meaningful reward anticipation.",
      marketing: "Approval celebrations and repayment milestone systems may increase emotional borrower satisfaction.",
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-950/20",
      icon: Award
    },
    {
      title: "Subconscious Hesitation",
      tag: "Internal Conflict",
      human: "Micro-conductance fluctuations reveal internal emotional conflict before visible behavior changes.",
      marketing: "Users may appear behaviorally calm while experiencing severe subconscious financial stress internally.",
      color: "border-purple-500/40 text-purple-400 bg-purple-950/20",
      icon: Sliders
    }
  ];

  // ═══════════════════════════════════════════
  // 2. GSR SIGNAL INTERPRETATIONS (SECTION 3)
  // ═══════════════════════════════════════════
  const gsrSignals = [
    {
      name: "TONIC SKIN CONDUCTANCE LEVEL (SCL)",
      function: "Baseline Autonomic Arousal",
      state: "Slow-moving electrodermal baseline measured over extended interaction periods.",
      interpretation: "Persistently elevated tonic conductance may indicate chronic financial stress and low digital confidence.",
      color: "#10b981" // Green = Baseline Activity
    },
    {
      name: "PHASIC SKIN CONDUCTANCE RESPONSE (SCR)",
      function: "Acute Emotional Reactivity",
      state: "Rapid electrodermal spikes emerging 1–5 seconds after emotional stimulus exposure.",
      interpretation: "Specific onboarding screens or repayment disclosures may trigger immediate emotional distress.",
      color: "#f97316" // Orange = Reactivity
    },
    {
      name: "EVENT-RELATED SCR (ER-SCR)",
      function: "Stimulus-Locked Emotional Response",
      state: "Precise autonomic peak directly synchronized to a specific interaction event.",
      interpretation: "Biometric verification prompts may generate measurable trust disruption responses.",
      color: "#8b5cf6" // Purple = Event Response
    },
    {
      name: "NON-SPECIFIC SCR (NS-SCR)",
      function: "Spontaneous Internal Arousal",
      state: "Autonomic spikes occurring without identifiable external stimulus.",
      interpretation: "Borrowers may internally ruminate about future repayment burden even during passive interaction stages.",
      color: "#06b6d4" // Cyan = Spontaneous / Recovery
    },
    {
      name: "ANTICIPATORY AROUSAL",
      function: "Pre-Decision Threat Prediction",
      state: "Elevated electrodermal activity emerging before high-risk decision exposure.",
      interpretation: "Borrowers subconsciously fear irreversible financial commitment before final loan submission.",
      color: "#f97316" // Orange = Reactivity
    },
    {
      name: "EMOTIONAL OVERLOAD PATTERNS",
      function: "Autonomic Stress Saturation",
      state: "Sustained high-amplitude conductance with poor recovery stabilization.",
      interpretation: "Overly complex onboarding systems may psychologically exhaust users.",
      color: "#ef4444" // Red = Stress
    },
    {
      name: "HABITUATION RESPONSE",
      function: "Autonomic Adaptation",
      state: "Gradual reduction in electrodermal reactivity after repeated exposure.",
      interpretation: "Familiar repayment systems may eventually reduce emotional borrower anxiety.",
      color: "#06b6d4" // Cyan = Recovery
    },
    {
      name: "ENGAGEMENT PERSISTENCE",
      function: "Sustained Emotional Attention",
      state: "Stable moderate arousal maintained throughout extended interaction periods.",
      interpretation: "Financial literacy systems may successfully sustain emotional engagement over time.",
      color: "#10b981" // Green = Baseline Activity
    },
    {
      name: "EMOTIONAL RECOVERY RATE",
      function: "Post-Stress Autonomic Stabilization",
      state: "Speed at which electrodermal activity returns to baseline after emotional activation.",
      interpretation: "Long emotional recovery periods may indicate severe financial insecurity or repayment trauma.",
      color: "#06b6d4" // Cyan = Recovery
    },
    {
      name: "SURPRISE ACTIVATION",
      function: "Unexpected Emotional Interruption",
      state: "Abrupt conductance spikes during unanticipated stimulus exposure.",
      interpretation: "Hidden charges or unexpected repayment obligations may create subconscious shock reactions.",
      color: "#ef4444" // Red = Stress
    }
  ];

  // ═══════════════════════════════════════════
  // 3. HYPOTHETICAL MAHINDRA SCENARIOS (SECTION 4)
  // ═══════════════════════════════════════════
  const hypotheticalScenarios = [
    {
      title: "EMI Repayment Anxiety Detection",
      tag: "Repayment Psychology",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eeg_fintech_onboarding.png",
      challenge: "Traditional repayment systems unintentionally increase borrower stress and avoidance behavior.",
      reveal: "Massive anticipatory conductance spikes before EMI reminder exposure.",
      insight: "Borrowers emotionally associate repayment notifications with threat and instability.",
      optimize: "Replace penalty-heavy reminders with supportive vernacular repayment guidance and emotional reassurance systems.",
      impact: "Potential reduction in repayment avoidance and improved borrower engagement."
    },
    {
      title: "Tractor Financing Emotional Engagement",
      tag: "Agricultural Finance",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eeg_tvc_testing.png",
      challenge: "Agricultural financing campaigns fail to emotionally differentiate ownership aspiration.",
      reveal: "High emotional arousal during prosperity-oriented agricultural storytelling.",
      insight: "Borrowers emotionally associate tractors with long-term family security and social mobility.",
      optimize: "Frame financing journeys around intergenerational prosperity and agricultural advancement.",
      impact: "Potential increase in emotional financing motivation and campaign recall."
    },
    {
      title: "Digital Onboarding Emotional Overload",
      tag: "UX Optimization",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eeg_kyc_friction.png",
      challenge: "Complex onboarding systems trigger massive application abandonment.",
      reveal: "Sustained tonic conductance elevation during KYC and legal disclosure stages.",
      insight: "Borrowers experience cognitive paralysis caused by institutional intimidation.",
      optimize: "Use guided onboarding systems with progressive disclosure and voice-assisted reassurance.",
      impact: "Potential improvement in onboarding completion rates."
    },
    {
      title: "WhatsApp Repayment Stress Analysis",
      tag: "Communication Strategy",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fmri_anxiety.png",
      challenge: "Repayment reminders generate emotional fatigue instead of positive repayment action.",
      reveal: "Repeated sympathetic activation during repetitive collection communication.",
      insight: "Borrowers gradually develop conditioned stress responses toward repayment channels.",
      optimize: "Introduce emotionally supportive conversational repayment ecosystems.",
      impact: "Potential improvement in long-term repayment relationship quality."
    },
    {
      title: "Female Borrower Stress Evaluation",
      tag: "Inclusive Finance",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eeg_female_rural_trust.png",
      challenge: "Women borrowers experience institutional stress during financial onboarding.",
      reveal: "Elevated autonomic defensiveness during aggressive advisory interactions.",
      insight: "Empathetic financial guidance significantly lowers emotional barriers.",
      optimize: "Deploy collaborative advisory ecosystems and women-centered trust narratives.",
      impact: "Potential increase in female financial participation and confidence."
    },
    {
      title: "Collection Call Anxiety Calibration",
      tag: "Recovery Strategy",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fmri_anxiety.png",
      challenge: "Aggressive recovery communication damages borrower mental health.",
      reveal: "Extreme electrodermal volatility during confrontational collection exposure.",
      insight: "Fear-driven recovery systems create cognitive shutdown rather than repayment cooperation.",
      optimize: "Transition collection systems toward collaborative financial restructuring support.",
      impact: "Potential reduction in borrower hostility and emotional disengagement."
    },
    {
      title: "Branch Waiting Frustration Analysis",
      tag: "Branch Experience",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/eeg_branch_experience.png",
      challenge: "Long waiting periods increase borrower irritation before advisory interaction begins.",
      reveal: "Gradual tonic arousal accumulation during unmanaged waiting environments.",
      insight: "Institutional inefficiency creates subconscious distrust before onboarding even starts.",
      optimize: "Deploy transparent queue visibility and calming financial education experiences.",
      impact: "Potential increase in branch satisfaction and advisory receptiveness."
    },
    {
      title: "Financial Trust Reinforcement",
      tag: "Trust Engineering",
      style: "lg:col-span-4 md:col-span-6",
      image: "/images/fmri_trust_comfort.png",
      challenge: "Rural borrowers distrust formal financial ecosystems.",
      reveal: "Autonomic stabilization during localized trust-oriented storytelling.",
      insight: "Community familiarity reduces sympathetic defensiveness toward institutions.",
      optimize: "Use authentic borrower testimonials and regional advisory ecosystems.",
      impact: "Potential increase in trust formation and financial confidence."
    }
  ];

  // ═══════════════════════════════════════════
  // 4. ENTERPRISE STRATEGIC TAKEAWAYS (SECTION 5)
  // ═══════════════════════════════════════════
  const enterpriseTakeaways = [
    {
      title: "Emotional Arousal Precision",
      insight: "GSR directly captures subconscious autonomic arousal without reliance on conscious self-reporting.",
      icon: Target,
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-950/20"
    },
    {
      title: "Real-Time Stress Monitoring",
      insight: "Continuous electrodermal tracking reveals dynamic emotional fluctuations during borrower interaction.",
      icon: Activity,
      color: "border-cyan-500/40 text-cyan-400 bg-cyan-950/20"
    },
    {
      title: "Portability Advantage",
      insight: "Wearable GSR systems support scalable deployment across branches and rural environments.",
      icon: Zap,
      color: "border-purple-500/40 text-purple-400 bg-purple-950/20"
    },
    {
      title: "Low-Cost Scalability",
      insight: "Compared to advanced neuroimaging systems, GSR provides highly scalable emotional analytics infrastructure.",
      icon: TrendingUp,
      color: "border-blue-500/40 text-blue-300 bg-blue-950/20"
    },
    {
      title: "Emotional Finance Applications",
      insight: "GSR reveals the hidden physiological burden of financial stress and repayment anxiety.",
      icon: Heart,
      color: "border-rose-500/40 text-rose-400 bg-rose-955/20"
    },
    {
      title: "Ethical Safeguards",
      insight: "Autonomic behavioral intelligence requires rigorous privacy and emotional-protection governance.",
      icon: ShieldCheck,
      color: "border-amber-500/40 text-amber-400 bg-amber-955/20"
    }
  ];

  // ═══════════════════════════════════════════
  // 5. IMPLEMENTATION MAP (SECTION 6)
  // ═══════════════════════════════════════════
  const implementationPhases = [
    {
      phase: "Phase 1",
      title: "Wearable Infrastructure Setup",
      description: "Deploy portable GSR sensors and establish baseline autonomic measurement protocols.",
      timeline: "Q1-Q2"
    },
    {
      phase: "Phase 2",
      title: "Borrower Stress Profiling",
      description: "Map emotional arousal patterns across onboarding, repayment, and advisory interactions.",
      timeline: "Q2-Q3"
    },
    {
      phase: "Phase 3",
      title: "Friction Point Identification",
      description: "Identify high-stress moments causing abandonment and emotional resistance.",
      timeline: "Q3-Q4"
    },
    {
      phase: "Phase 4",
      title: "Experience Redesign",
      description: "Optimize onboarding flows, repayment systems, and advisory communication based on autonomic insights.",
      timeline: "Q4-Q1"
    },
    {
      phase: "Phase 5",
      title: "Emotional Impact Measurement",
      description: "Track stress reduction, trust improvement, and completion rate increases.",
      timeline: "Q1-Q2"
    },
    {
      phase: "Phase 6",
      title: "Continuous Emotional Calibration",
      description: "Establish ongoing GSR-driven optimization cycles for borrower experience evolution.",
      timeline: "Ongoing"
    }
  ];

  return (
    <div className="col-span-12 space-y-24 pb-12 relative font-sans text-[#E5E7EB] bg-background">
      {/* Soft warm/lavender subtle radial glows representing autonomic activity */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#A11D33]/2 via-background to-background pointer-events-none rounded-3xl -z-10 animate-fade-in" />
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] bg-radial from-rose-500/2 to-transparent pointer-events-none blur-3xl -z-10 animate-pulse" />

      {/* ─── SECTION 1: ENTERPRISE HERO INTRO (McKinsey + Apple + Rural Intelligence) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#090809]/95 border border-stone-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden select-none">
        <div className="absolute top-0 right-0 h-96 w-96 bg-radial from-[#A11D33]/10 to-transparent pointer-events-none blur-3xl animate-pulse" />
        
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-300 text-[10px] font-black uppercase tracking-wider">
              <Activity className="h-3.5 w-3.5 text-rose-400" /> Autonomic Nervous System Technique
            </div>
            <h1 className="font-display font-black text-3xl md:text-4xl text-white uppercase tracking-tight leading-tight">
              Galvanic Skin Response (GSR / GSV)
            </h1>
            <p className="text-sm text-[#E5E7EB] font-medium leading-relaxed max-w-xl">
              GSR enables enterprises to decode subconscious emotional arousal, repayment anxiety, cognitive overload, trust disruption, and financial stress directly through the autonomic nervous system. By measuring microscopic fluctuations in skin conductivity, marketing teams can identify hidden emotional friction points that traditional surveys cannot capture.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 border-t border-stone-850 pt-5">
            <div>
              <div className="text-[9px] uppercase font-black text-[#FF758F] tracking-wider">What It Measures</div>
              <div className="text-xs font-black text-white mt-1 uppercase tracking-wide">Autonomic Emotional Arousal</div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-[#CBD5E1] tracking-wider">Best Use</div>
              <div className="text-xs font-black text-rose-300 mt-1 uppercase tracking-wide">Stress, Trust & Engagement</div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-[#CBD5E1] tracking-wider">Business Relevance</div>
              <div className="text-xs font-black text-white mt-1 uppercase tracking-wide leading-tight">Financial Anxiety Optimization</div>
            </div>
          </div>
        </div>

        {/* Realistic Aspirational Visual */}
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl border border-stone-850 aspect-[4/3] group">
          <img 
            src="/images/gsr_hero.png" 
            alt="Rural borrower with wearable GSR sensor during digital loan onboarding stress analysis" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 filter brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-6">
            <span className="text-[9px] font-black uppercase text-amber-400 tracking-wider mb-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" /> SIMULATED DEPLOYMENT SCENARIO
            </span>
            <h3 className="font-display font-black text-sm text-white uppercase tracking-wide">
              DIGITAL LOAN ONBOARDING STRESS ANALYSIS
            </h3>
            <p className="text-[11px] text-[#E5E7EB] mt-1 leading-normal font-medium max-w-md">
              Wearable GSR sensors continuously monitor electrodermal activity to identify hidden emotional stress, trust disruption, financial anxiety, and cognitive friction during customer onboarding journeys.
            </p>
          </div>
        </div>
      </div>

      {/* ─── SECTION 2: WHAT GSR ACTUALLY HELPS UNDERSTAND (BENTO GRID) ─── */}
      <div className="space-y-6 select-none">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            Behavioral Indicators
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            Behavioral Signals GSR Can Potentially Detect
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            Understanding the autonomic foundations of financial anxiety, trust formation, emotional engagement, repayment tension, and borrower stress.
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

      {/* ─── SECTION 3: SIMPLE GSR EXPLANATION (HORIZONTAL SIGNAL INTERPRETATION) ─── */}
      <div className="space-y-6 select-none border-t border-stone-200/20 pt-1">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            GSR Signal Interpretation
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            How GSR Signals Are Interpreted
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            A behavioral neuroscience interpretation layer translating autonomic activity into borrower psychology and financial decision intelligence.
          </p>
        </div>

        {/* Horizontal Signal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans pt-2">
          {gsrSignals.map((signal, idx) => (
            <div 
              key={idx}
              className="bg-[#0c0b0c] border border-stone-800 rounded-3xl p-5 space-y-4 hover:border-stone-700 transition-all duration-300 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-white/1 to-transparent pointer-events-none" />
              <div className="flex justify-between items-center border-b border-stone-850 pb-2 relative z-10">
                <span className="font-display font-black text-xs text-white uppercase tracking-wider">{signal.name}</span>
              </div>

              {/* Signal visual representation */}
              <GsrSignalChart name={signal.name} color={signal.color} />

              <div className="space-y-3.5 relative z-10">
                <div className="bg-[#121011] p-2.5 rounded-xl border border-stone-850">
                  <span className="text-[7.5px] font-black uppercase text-rose-500 tracking-widest block">Physiological Function</span>
                  <div className="text-xs font-black text-white mt-1">{signal.function}</div>
                </div>
                <div>
                  <span className="text-[7.5px] font-black uppercase text-[#94A3B8] tracking-widest block">Signal State</span>
                  <p className="text-[10.5px] leading-relaxed text-[#CBD5E1] font-semibold mt-1">{signal.state}</p>
                </div>
                <div>
                  <span className="text-[7.5px] font-black uppercase text-[#94A3B8] tracking-widest block">Marketing Interpretation</span>
                  <p className="text-[10.5px] leading-relaxed text-[#CBD5E1] font-semibold mt-1">{signal.interpretation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION 4: POTENTIAL GSR DEPLOYMENT SCENARIOS FOR MAHINDRA FINANCE ─── */}
      <div className="space-y-6 select-none border-t border-stone-200/20 pt-1">
        <div className="max-w-[1400px] w-full">
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            Deployment Scenarios
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-[14px] block w-full font-sans" style={{ fontSize: 'clamp(24px, 2vw, 40px)', letterSpacing: '-0.03em' }}>
            Potential GSR Deployment Scenarios<br className="hidden lg:inline" /> for Mahindra&nbsp;Finance
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            Hypothetical frameworks detailing how autonomic nervous system measurement could potentially decode emotional stress, trust disruption, and financial anxiety patterns.
          </p>
        </div>

        {/* 3-Column Grid representing GSR intelligence grid */}
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
                    <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest block">What GSR May Reveal</span>
                    <p className="text-[10.5px] leading-relaxed text-[#E5E7EB] font-semibold mt-1">{use.reveal}</p>
                  </div>
                  <div className="bg-[#121011] p-3 rounded-xl border border-stone-850">
                    <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest block">Possible Behavioral Insight</span>
                    <p className="text-[10.5px] leading-relaxed text-[#E5E7EB] font-semibold mt-1">{use.insight}</p>
                  </div>
                  <div className="bg-[#121011] p-3 rounded-xl border border-stone-850">
                    <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest block">Targeted Visual Optimization</span>
                    <p className="text-[10.5px] leading-relaxed text-[#E5E7EB] font-semibold mt-1">{use.optimize}</p>
                  </div>
                  <div className="bg-[#121011] p-3 rounded-xl border border-stone-850">
                    <span className="text-[8px] font-black text-amber-400 uppercase tracking-widest block">Expected Business Impact</span>
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
            Strategic Intelligence from GSR Research
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            Key strategic insights that GSR-based autonomic nervous system research could potentially unlock for rural and semi-urban financing ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans pt-2">
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
            GSR Research Implementation Framework
          </h2>
          <p className="text-[#475569] font-medium text-[16px] leading-[1.7] max-w-[980px] mt-2 block font-sans">
            A structured phased approach to integrating GSR-based autonomic nervous system research into enterprise marketing and borrower experience strategy.
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
