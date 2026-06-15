import React, { useState } from "react";
import { 
  Brain, ShieldCheck, Heart, Database, TrendingUp, 
  Activity, Target, Zap, Eye, Award, Sliders, EyeOff, 
  ChevronRight, ChevronDown, Clock, Layers, Lock, Shield,
  SlidersHorizontal, CheckCircle2, AlertTriangle, Lightbulb
} from "lucide-react";

export function MegStorytellingView({ tool, activeTheme }: { 
  tool: any; 
  activeTheme: any;
}) {
  // ═══════════════════════════════════════════
  // SECTION 2: HOW MEG WORKS (6-STAGE PIPELINE)
  // ═══════════════════════════════════════════
  const [activeStep, setActiveStep] = useState(0);
  const pipelineSteps = [
    {
      title: "Neurons Fire",
      subtitle: "Synaptic Currents",
      tech: "Synchronized intracellular currents in apical dendrites of pyramidal cells.",
      details: "Thousands of cortical neurons fire in unison in response to visual stimuli, creating a primary current dipole.",
      marketing: "Captures the initial spark of customer reaction before conscious filters or survey bias can modify it."
    },
    {
      title: "Magnetic Fields Generated",
      subtitle: "Ampere's Law",
      tech: "Dendritic current loops induce weak magnetic fields in the femtotesla range.",
      details: "According to Ampere's Law, electrical currents generate magnetic fields. These fields pass through the skull completely undistorted.",
      marketing: "Enables unattenuated recording of cognitive states, bypassing the spatial blurring that skull bones cause for EEG."
    },
    {
      title: "Sensory Detection",
      subtitle: "OPM Helmet Sensor Arrays",
      tech: "Room-temperature Optically Pumped Magnetometers (OPMs) capture fields on the scalp.",
      details: "Wearable OPM helmets feature flexible arrays sitting directly on the scalp, eliminating cryogenic SQUID shielding dewars.",
      marketing: "Allows naturalistic testing of mobile checkouts while users sit, move, or hold devices naturally."
    },
    {
      title: "Noise Removed",
      subtitle: "Ambient Filtering",
      tech: "Active magnetic shielding and software gradiometers isolate brain signals.",
      details: "Environmental magnetic noise (like elevator motors or power lines) is actively filtered using mathematical subtraction.",
      marketing: "Guarantees that millisecond-level telemetry shifts reflect app usability friction, not background interference."
    },
    {
      title: "Source Localization",
      subtitle: "3D Cortical Mapping",
      tech: "Mathematical beamforming maps magnetic sensor fields to structural MRI templates.",
      details: "Advanced source reconstruction models estimate current densities in 3D, pinpointing the active source with 3-5mm precision.",
      marketing: "Pinpoints the exact cortical structures (e.g. occipital vs. frontal lobes) processing specific pricing elements."
    },
    {
      title: "Insight Extraction",
      subtitle: "Cognitive Chronometry",
      tech: "Oscillatory power shifts are translated into attention or stress indices.",
      details: "Time-frequency analysis isolates theta, alpha, and beta dynamics to construct usability load profiles.",
      marketing: "Translates raw magnetic fluctuations into actionable UX guidelines to improve loan conversion."
    }
  ];

  // ═══════════════════════════════════════════
  // SECTION 3: WHAT MEG MEASURES DATASET (8 CARDS)
  // ═══════════════════════════════════════════
  const measuresList = [
    {
      title: "Attention",
      desc: "Traces early visual cortex activation latency and frontal alert network dynamics.",
      whyItMatters: "Reveals how fast a borrower locates primary call-to-action buttons on mobile application landing screens."
    },
    {
      title: "Cognitive Load",
      desc: "Monitors prefrontal theta-to-beta power dynamics, registering working memory strain.",
      whyItMatters: "Detects the exact moment a borrower becomes overwhelmed by multi-row loan rate disclosures."
    },
    {
      title: "Semantic Processing",
      desc: "Tracks the M400 Event-Related Field, indexing visual/symbolic comprehension speed.",
      whyItMatters: "Identifies whether technical financing copy creates language barriers and confusion for rural audiences."
    },
    {
      title: "Trust Signals",
      desc: "Maps coupling between temporoparietal junction (TPJ) and medial prefrontal networks.",
      whyItMatters: "Identifies which brand visuals (like official logos vs advisor images) biologically communicate safety."
    },
    {
      title: "Decision Making",
      desc: "Decodes prefrontal cortex and basal ganglia coordination patterns during tenure choice.",
      whyItMatters: "Determines which repayment choice layout lowers hesitation and simplifies selection."
    },
    {
      title: "Reward Processing",
      desc: "Monitors source-localized activity in ventral striatal systems tracking value anticipation.",
      whyItMatters: "Measures whether celebrating checkout screens trigger positive reinforcement and repeat intent."
    },
    {
      title: "Executive Function",
      desc: "Tracks dorsolateral prefrontal cortex (dlPFC) engagement during rational evaluation.",
      whyItMatters: "Measures the mental effort required to navigate dynamic loan amount calculator sliders."
    },
    {
      title: "Neural Oscillations",
      desc: "Measures global brainwave synchronization across Theta, Alpha, Beta, and Gamma bands.",
      whyItMatters: "Maps overall alert focus or distraction levels throughout the borrower's digital application journey."
    }
  ];

  // ═══════════════════════════════════════════
  // SECTION 4: SIGNAL INTERPRETATION DATASET (6 CARDS)
  // ═══════════════════════════════════════════
  const [activeSignal, setActiveSignal] = useState(0);
  const signalsList = [
    {
      title: "Gamma Oscillations",
      function: "Sensory Binding & Salience",
      state: "High-frequency (30–100+ Hz) local synchronization in sensory cortices.",
      interpretation: "Indicates active feature recognition and sensory information integration.",
      marketing: "Gamma bursts highlight the exact millisecond a customer visualizes a brand symbol or localized action button.",
      waveColor: "#a855f7",
      wavePath: "M 0,30 Q 5,10 10,50 T 20,30 T 30,30 T 40,30 T 50,50 T 60,10 T 70,30 T 80,30 T 90,30 T 100,50 T 110,10 T 120,30 T 130,30 T 140,30 T 150,50 T 160,10 T 170,30 T 180,30 T 190,30 T 200,50 T 210,10 T 220,30 T 230,30 T 240,30 T 250,50 T 260,10 T 270,30 T 280,30 T 290,30 T 300,50 T 310,10 T 320,30"
    },
    {
      title: "Beta Oscillations",
      function: "Concentration & Motor Readiness",
      state: "Fronto-parietal rhythm (13–30 Hz) expressing state-maintenance or transition.",
      interpretation: "Beta drop reflects motor execution readiness, while beta spikes index focused concentration.",
      marketing: "A drop in beta occurs when the customer is biologically ready to click the 'Pay EMI' button.",
      waveColor: "#3b82f6",
      wavePath: "M 0,30 Q 10,15 20,45 T 40,30 T 60,30 T 80,15 T 100,45 T 120,30 T 140,30 T 160,15 T 180,45 T 200,30 T 220,30 T 240,15 T 260,45 T 280,30 T 300,30 T 320,15"
    },
    {
      title: "Alpha Suppression",
      function: "Visual Attentional Gating",
      state: "Drop in alpha band (8–12 Hz) power in sensory regions focused on active tasks.",
      interpretation: "Suppression indicates visual processing resources are allocated to the external target.",
      marketing: "Deep alpha suppression maps active reading of repayment schedules, verifying focused attention.",
      waveColor: "#ef4444",
      wavePath: "M 0,30 Q 15,10 30,50 T 60,30 T 90,30 T 120,10 T 150,50 T 180,30 T 210,30 T 240,10 T 270,50 T 300,30 T 320,30"
    },
    {
      title: "Theta Synchronization",
      function: "Working Memory Load",
      state: "Low-frequency (4–8 Hz) synchronization in medial prefrontal structures.",
      interpretation: "Strong theta synchronization corresponds directly to working memory load and control processes.",
      marketing: "Theta tracking reveals if a multi-page loan checklist creates cognitive overload.",
      waveColor: "#f59e0b",
      wavePath: "M 0,30 Q 20,5 40,55 T 80,30 T 120,30 T 160,5 T 200,55 T 240,30 T 280,30 T 320,5"
    },
    {
      title: "Event Related Fields (ERFs)",
      function: "Cognitive Expectation Violations",
      state: "Specific response deflections like the N400m/M400 occurring 350-450ms post-stimulus.",
      interpretation: "Negative magnetic deflection marking semantic incongruity or unexpected layouts.",
      marketing: "Detects the exact millisecond price confusion occurs when viewing fee disclosures.",
      waveColor: "#a855f7",
      wavePath: "M 0,30 L 60,30 Q 90,55 120,30 T 180,30 T 240,30 T 280,30 T 320,30"
    },
    {
      title: "Executive Control",
      function: "Impulse Management & Logic",
      state: "Prefrontal cortex (PFC) interaction with the basal ganglia.",
      interpretation: "Reflects active trade-off analysis, option sorting, and decision effort.",
      marketing: "Sustained PFC engagement shows that comparing tenure options takes too much effort.",
      waveColor: "#06b6d4",
      wavePath: "M 0,30 Q 25,5 50,55 T 100,30 T 150,30 T 200,5 T 250,55 T 300,30 T 320,30"
    }
  ];

  // ═══════════════════════════════════════════
  // SECTION 5: BEHAVIORAL INDICATORS (6 CARDS)
  // ═══════════════════════════════════════════
  const [indicatorFilter, setIndicatorFilter] = useState("All");
  const behavioralIndicators = [
    {
      title: "Attention Shifts",
      category: "Attention",
      signal: "Occipital Alpha Suppression (8-14 Hz) + Gamma Synchronization",
      science: "Visual processing causes a localized drop in alpha rhythms (gating mechanism) while active features drive gamma synchronization.",
      marketing: "Alpha suppression maps which UI components (like a green CTA vs. static text) capture the viewer's gaze first, guiding the user path."
    },
    {
      title: "Trust Disruption",
      category: "Trust & Emotion",
      signal: "Temporoparietal Junction (TPJ) and Medial Prefrontal Cortex (mPFC) Decoupling",
      science: "Decoupling between these regions marks an interruption in cooperative social learning and social trust evaluation.",
      marketing: "Hidden transaction costs or legal jargon spark instant TPJ decoupling, signaling a breakdown in brand trust."
    },
    {
      title: "Cognitive Overload",
      category: "Cognitive Load",
      signal: "Fronto-Parietal Beta (18-26 Hz) interference and Medial Theta Synchronization",
      science: "Frontal theta increases with working memory load, while beta oscillations modulate under executive control strain.",
      marketing: "Dense pricing tables trigger load indicators, signaling that the page is too complex for rural users."
    },
    {
      title: "Semantic Confusion",
      category: "Cognitive Load",
      signal: "N400m / M400 Event-Related Field Peak (~400ms Post-Stimulus)",
      science: "A negative magnetic field deflection peaking in temporal regions when processing mismatching words/symbols.",
      marketing: "Exposing a borrower to annual interest rate numbers creates an N400m peak if the pricing conflicts with local market expectations."
    },
    {
      title: "Reward Anticipation",
      category: "Trust & Emotion",
      signal: "Ventromedial Prefrontal Cortex (vmPFC) Activation Sequence",
      science: "The vmPFC encodes anticipated utility and personal value, scaling with reward probability.",
      marketing: "Loan approval banners trigger vmPFC rewards; timing visual cues with this response anchors brand loyalty."
    },
    {
      title: "Processing Fluency",
      category: "Cognitive Load",
      signal: "Reduced Default Mode Network (DMN) Deactivation Effort",
      science: "High cognitive fluency requires less task-induced DMN deactivation, reflecting efficient information processing.",
      marketing: "Colloquial voice commands keep processing fluency high, ensuring the user completes steps with low effort."
    }
  ];

  // ═══════════════════════════════════════════
  // SECTION 6: APPLICATIONS DATASET (6 CARDS WITH REALISTIC IMAGES)
  // ═══════════════════════════════════════════
  const mahindraApplications = [
    {
      title: "Digital Onboarding Optimization",
      image: "/images/meg_usecase_onboarding.png",
      challenge: "Borrowers exit onboarding flows due to visual clutter and layout confusion.",
      reveal: "MEG telemetry detects frontal beta-interference and theta spikes when entering address fields.",
      insight: "Mandatory multi-select drop-downs exceed memory bounds, causing user hesitation.",
      outcome: "Replacing drop-downs with geographic presets cuts onboarding drop-offs."
    },
    {
      title: "Tractor Loan Pricing Calibration",
      image: "/images/meg_usecase_tractor.png",
      challenge: "High-ticket tractor pricing details generate immediate pricing shock.",
      reveal: "N400m semantic conflict waves peak within 400ms of seeing yearly pricing.",
      insight: "Yearly interest rates feel disconnected from seasonal crop sales cycles.",
      outcome: "Reframing pricing as 'Per Harvest Contribution' prevents immediate rate rejection."
    },
    {
      title: "WhatsApp Autopay Mandate",
      image: "/images/meg_usecase_whatsapp.png",
      challenge: "Rural borrowers hesitate to set up auto-debit templates via WhatsApp messaging.",
      reveal: "Left-hemisphere high-frequency activity spikes, showing active risk avoidance.",
      insight: "The phrase 'Auto-Debit' implies loss of control over personal financial assets.",
      outcome: "Redesigning disclaimers as 'Safe Autopay with Stop Controls' improves adopt rates."
    },
    {
      title: "Branch Advisory Systems",
      image: "/images/meg_usecase_branch.png",
      challenge: "Tablet-assisted branch presentations fail to hold visual attention.",
      reveal: "Occipital alpha suppression fails, indicating visual attention drift and boredom.",
      insight: "Dense numerical tables lack visual salience for rural, visual-first users.",
      outcome: "Deploying image-driven visual slide layouts command higher gamma engagement."
    },
    {
      title: "SME Working Capital Dashboard",
      image: "/images/meg_usecase_sme.png",
      challenge: "SME business owners display cognitive fatigue managing multiple credit lines.",
      reveal: "Persistent high-frequency beta signals indicate prefrontal resource depletion.",
      insight: "Simultaneous displays of multiple dates and balances overwhelm attention paths.",
      outcome: "A single-priority dashboard flow reduces fatigue, increasing credit utilization."
    },
    {
      title: "Repayment Experience Design",
      image: "/images/meg_usecase_repayment.png",
      challenge: "Borrowers report stress when making digital EMI monthly payments.",
      reveal: "Sympathetic arousal indicators spike right at the final bank gateway screen.",
      insight: "A lack of verification cues increases stress. Adding haptic pings and green checkmarks helps.",
      outcome: "Multimodal success confirmations decrease transaction fatigue and build loyalty."
    }
  ];

  // ═══════════════════════════════════════════
  // SECTION 7: STRATEGIC TAKEAWAYS DATASET (6 CARDS)
  // ═══════════════════════════════════════════
  const strategicTakeaways = [
    {
      title: "Best Environments for MEG",
      tag: "Deployment Setup",
      desc: "Requires room-temperature OPM sensor cap setups, ideally run in dedicated mobile usability research labs or central branch usability cycles.",
      color: "bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]",
      label: "HIGH",
      score: 85
    },
    {
      title: "Rural Feasibility",
      tag: "Operational Fit",
      desc: "Wearable OPM helmets do not require cryogenic liquid helium shielding dewars, making focus group studies extremely comfortable for rural participants.",
      color: "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]",
      label: "CRITICAL",
      score: 90
    },
    {
      title: "Cost & Scalability",
      tag: "Resource Scale",
      desc: "Gen-2 room-temperature OPM sensors drastically lower hardware capital outlay. High initial research setup expenses are offset by lower transaction abandonment.",
      color: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]",
      label: "MEDIUM",
      score: 70
    },
    {
      title: "Branch Complexity",
      tag: "Branch Mechanics",
      desc: "Requires certified neuro-analytical coordinators to run sessions. Insights are compiled centrally and scaled to millions of digital app users via updates.",
      color: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]",
      label: "MANAGED",
      score: 75
    },
    {
      title: "Digital Research Potential",
      tag: "Digital Focus",
      desc: "Enables sub-millisecond timeline tracking of visual scanning, revealing exactly where borrowers experience screen confusion before conscious complaints.",
      color: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]",
      label: "OPTIMIZED",
      score: 85
    },
    {
      title: "Ethical Compliance Safeguards",
      tag: "Compliance Safeguards",
      desc: "All research cohorts undergo clear informed consent loops. Biometric session telemetry is fully encrypted, strictly aligning design tests with transparency.",
      color: "bg-stone-500 shadow-[0_0_8px_rgba(120,120,120,0.4)]",
      label: "SECURED",
      score: 95
    }
  ];

  return (
    <div className="col-span-12 space-y-24 pb-12 relative font-sans">
      {/* Dynamic inline styles for smooth particle and wave animations */}
      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(0.9); opacity: 0; }
          50% { opacity: 0.4; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          50% { opacity: 0.7; }
          100% { transform: translateY(-30px) translateX(15px); opacity: 0; }
        }
        @keyframes pulseNode {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.25); opacity: 1; }
        }
        @keyframes waveScroll {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -100; }
        }
        .animate-pulse-ring {
          animation: pulseRing 3s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
        }
        .animate-float-p1 { animation: floatParticle 4s ease-in-out infinite; }
        .animate-float-p2 { animation: floatParticle 5s ease-in-out infinite 1.5s; }
        .animate-float-p3 { animation: floatParticle 6s ease-in-out infinite 0.7s; }
        .animate-pulse-node { animation: pulseNode 2.5s ease-in-out infinite; }
        .animate-wave-scroll {
          stroke-dasharray: 8 4;
          animation: waveScroll 4s linear infinite;
        }
      `}</style>

      {/* Subtle radial glows representing magnetic field vectors */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#a855f7]/3 via-background to-background pointer-events-none rounded-3xl -z-10 animate-fade-in" />
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] bg-radial from-violet-600/3 to-transparent pointer-events-none blur-3xl -z-10 animate-pulse" />

      {/* ═══════════════════════════════════════════
          SECTION 1: HERO
          ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#090809]/95 border border-stone-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden select-none">
        
        {/* SVG animated magnetic fields background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="90%" cy="10%" r="60" stroke="#a855f7" strokeWidth="1" fill="none" className="animate-pulse" />
            <circle cx="90%" cy="10%" r="120" stroke="#a855f7" strokeWidth="0.75" fill="none" className="animate-pulse-ring" />
            <circle cx="90%" cy="10%" r="180" stroke="#a855f7" strokeWidth="0.5" fill="none" style={{ animationDelay: "1s" }} className="animate-pulse-ring" />
          </svg>
        </div>

        {/* Floating Neural Particles */}
        <div className="absolute bottom-1/3 left-10 pointer-events-none">
          <div className="h-2 w-2 rounded-full bg-violet-400 absolute animate-float-p1" />
          <div className="h-1.5 w-1.5 rounded-full bg-violet-300 absolute left-8 animate-float-p2" />
          <div className="h-2 w-2 rounded-full bg-fuchsia-400 absolute left-4 bottom-6 animate-float-p3" />
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between space-y-8 relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-[10px] font-black uppercase tracking-wider">
              <Brain className="h-3.5 w-3.5 text-violet-400 animate-pulse" /> CNS Magnetic Telemetry Technique
            </div>
            <h1 className="font-display font-black text-3xl md:text-5xl text-white uppercase tracking-tight leading-none">
              MAGNETOENCEPHALOGRAPHY (MEG)
            </h1>
            <p className="text-sm md:text-base text-violet-200/90 font-medium tracking-wide">
              "Capturing brain activity at the speed of thought."
            </p>
          </div>

          {/* Why Researchers Use MEG card */}
          <div className="bg-[#121011]/85 border border-stone-800 p-5 rounded-2xl relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 p-3 opacity-15">
              <Lightbulb className="h-12 w-12 text-violet-400" />
            </div>
            <span className="text-[9px] font-black uppercase text-violet-400 tracking-wider block mb-2">Why Researchers Use MEG</span>
            <ul className="space-y-2.5 text-[11px] text-[#CBD5E1] font-semibold">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                <span><strong className="text-white">Millisecond Resolution:</strong> Directly tracks the speed of cognitive processing (1 ms) rather than blood oxygenation lag.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                <span><strong className="text-white">Better Source Localization:</strong> Identifies active structures with high spatial precision (~3-5 mm) undistorted by skull bones.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                <span><strong className="text-white">Direct Neural Measurement:</strong> Records actual intracellular currents perpendicularly emerging from pyramidal synapses.</span>
              </li>
            </ul>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-stone-850 pt-6">
            <div>
              <div className="text-[9px] uppercase font-black text-stone-400 tracking-wider">Temporal Resolution</div>
              <div className="text-sm font-black text-white mt-1 uppercase tracking-wide">~1 ms</div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-stone-400 tracking-wider">Spatial Resolution</div>
              <div className="text-sm font-black text-violet-300 mt-1 uppercase tracking-wide">~3-5 mm</div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-stone-400 tracking-wider">Signal Type</div>
              <div className="text-sm font-black text-white mt-1 uppercase tracking-wide leading-tight">Magnetic Fields</div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-black text-stone-400 tracking-wider">Best For</div>
              <div className="text-sm font-black text-violet-300 mt-1 uppercase tracking-wide leading-tight">Attention Sequence</div>
            </div>
          </div>
        </div>

        {/* Hero Visual Block (High-precision telemetry OPM helmet) */}
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl border border-stone-850 aspect-[4/3] group">
          <img 
            src="/images/meg_hero_helmet.png" 
            alt="Advanced room-temperature OPM-MEG sensor helmet during neural telemetry" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 filter brightness-[0.9]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-6">
            <span className="text-[9px] font-black uppercase text-violet-400 tracking-wider mb-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-ping" /> Scientific Neural Telemetry Artwork
            </span>
            <h3 className="font-display font-black text-sm text-white uppercase tracking-wide">
              OPM-MEG Wearable Sensor Architecture
            </h3>
            <p className="text-[11px] text-[#E5E7EB] mt-1 leading-normal font-medium max-w-md">
              High-precision sensor arrays map visual scanpaths and prefrontal cognitive stress profiles directly on the scalp.
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 2: WHAT IS MEG & HOW MEG WORKS
          ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-stone-200/20 pt-16">
        
        {/* Left: What is MEG (with Contrast Fixes: dark slate/grey text) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-2">
              Technique Profile
            </span>
            <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-none text-2xl md:text-3xl">
              What is MEG?
            </h2>
          </div>

          <div className="space-y-4 text-sm text-[#475569] font-medium leading-relaxed">
            <p>
              Magnetoencephalography (MEG) measures the minute magnetic fields produced by the brain's electrical currents. Pyramidal neurons in the cortex generate tiny ionic current flows during synaptic transmission. According to Ampere's Law, these electrical currents inevitably produce perpendicular magnetic fields.
            </p>
            <p>
              While electrical signals (measured by EEG) are heavily distorted, scattered, and delayed as they pass through the skull bone, hair, and scalp tissues, <strong className="text-[#0F172A] font-bold">magnetic fields pass through these biological barriers completely undistorted</strong>.
            </p>
            <p>
              This allows MEG to achieve a unique dual benefit: it operates at the <span className="text-violet-750 font-bold">millisecond-level temporal resolution</span> of EEG, while providing the <span className="text-violet-750 font-bold">spatial localization precision (~3-5 mm)</span> closer to fMRI.
            </p>
          </div>

          {/* Callout */}
          <div className="bg-violet-950/5 border-l-2 border-violet-500 p-4 rounded-r-xl">
            <p className="text-xs md:text-sm text-[#4c1d95] font-bold italic leading-relaxed">
              "MEG records neural activity directly, not delayed blood-flow responses."
            </p>
          </div>
        </div>

        {/* Right: How MEG Works (6-stage pipeline) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-2">
              Neuroscience Pipeline
            </span>
            <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-none text-2xl md:text-3xl">
              How MEG Works
            </h2>
            <p className="text-[#475569] text-xs md:text-sm font-medium mt-1">
              Select a stage in the visual pipeline to trace biological signal propagation.
            </p>
          </div>

          {/* Pipeline stages selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {pipelineSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3.5 rounded-xl border text-left flex flex-col justify-between h-[85px] transition-all cursor-pointer ${
                    isActive 
                      ? "bg-[#090809] border-violet-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.15)] scale-[1.01]" 
                      : "bg-[#0c0b0c] border-stone-800 text-stone-400 hover:border-stone-750"
                  }`}
                >
                  <div className="flex justify-between items-start w-full">
                    <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded ${isActive ? "bg-violet-600 text-white" : "bg-stone-850 text-stone-600"}`}>
                      STAGE {idx + 1}
                    </span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-ping" />}
                  </div>
                  <h4 className={`text-[10px] font-black uppercase tracking-wide truncate ${isActive ? "text-white" : "text-stone-300"}`}>
                    {step.title}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Active Stage Details (Dark Card) */}
          <div className="bg-[#0c0b0c] border border-stone-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-radial from-violet-600/5 to-transparent pointer-events-none" />
            <div className="space-y-3 relative z-10 text-[11px] leading-relaxed">
              <div className="flex justify-between items-center border-b border-stone-850 pb-2">
                <span className="text-[7.5px] font-mono text-stone-500 uppercase tracking-widest">Active Phase Description</span>
                <span className="text-violet-400 font-bold uppercase tracking-wider">{pipelineSteps[activeStep].subtitle}</span>
              </div>
              <p className="text-[#CBD5E1] font-semibold">{pipelineSteps[activeStep].details}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-850/80">
                <div>
                  <span className="text-[7.5px] font-black uppercase text-stone-500 tracking-wider block mb-0.5">Telemetry Parameter</span>
                  <p className="text-stone-300 font-semibold">{pipelineSteps[activeStep].tech}</p>
                </div>
                <div className="bg-[#121011] p-2.5 rounded-xl border border-stone-850">
                  <span className="text-[7.5px] font-black uppercase text-violet-400 tracking-wider block mb-0.5">Marketing Calibration</span>
                  <p className="text-white font-bold">"{pipelineSteps[activeStep].marketing}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 3: WHAT MEG MEASURES
          ═══════════════════════════════════════════ */}
      <div className="space-y-6 border-t border-stone-200/20 pt-16 select-none">
        <div>
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-2">
            Biometric Mapping
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-none text-2xl md:text-3xl">
            What MEG Measures
          </h2>
          <p className="text-[#475569] text-xs md:text-sm font-medium mt-1">
            Analyzing 8 core cognitive and emotional response matrices using unattenuated magnetic signals.
          </p>
        </div>

        {/* 8 Cards Grid (Contrast fix: titles & text inside are light since card is dark) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {measuresList.map((measure, idx) => (
            <div 
              key={idx}
              className="bg-[#0c0b0c] border border-stone-800 hover:border-stone-750 transition-colors rounded-2xl p-5 flex flex-col justify-between min-h-[190px] shadow-lg relative overflow-hidden group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-stone-850 pb-2">
                  <span className="text-[8px] font-mono text-stone-500 font-bold">METRIC {(idx + 1).toString().padStart(2, "0")}</span>
                  <Zap className="h-3.5 w-3.5 text-violet-500/50 group-hover:text-violet-400 transition-colors" />
                </div>
                <h4 className="font-display font-black text-sm text-white uppercase tracking-wider">
                  {measure.title}
                </h4>
                <p className="text-[11px] text-stone-300 leading-normal font-semibold">
                  {measure.desc}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-stone-850">
                <span className="text-[7.5px] font-black uppercase text-violet-400 tracking-wider block mb-0.5">Why It Matters</span>
                <p className="text-[10px] text-stone-450 leading-relaxed font-semibold">
                  {measure.whyItMatters}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 4: SIGNAL INTERPRETATION ENGINE
          ═══════════════════════════════════════════ */}
      <div className="space-y-8 border-t border-stone-200/20 pt-16 select-none">
        <div>
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-2">
            Interpretation Engine
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-none text-2xl md:text-3xl">
            MEG Signal Interpretation Engine
          </h2>
          <p className="text-[#475569] text-xs md:text-sm font-medium mt-1">
            Click a signal card to see the biophysical wave behavior and its exact marketing translation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: 6 wave cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {signalsList.map((sig, idx) => {
              const isActive = activeSignal === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveSignal(sig.title.toLowerCase().includes("gamma") ? 0 : sig.title.toLowerCase().includes("beta") ? 1 : sig.title.toLowerCase().includes("alpha") ? 2 : sig.title.toLowerCase().includes("theta") ? 3 : sig.title.toLowerCase().includes("field") ? 4 : 5)}
                  className={`p-4 rounded-2xl border text-left flex justify-between items-start transition-all cursor-pointer ${
                    isActive 
                      ? "bg-[#090809] border-violet-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.15)]" 
                      : "bg-[#0c0b0c] border-stone-805 text-stone-400 hover:border-stone-750"
                  }`}
                >
                  <div className="space-y-1 truncate">
                    <h4 className={`text-xs font-black uppercase tracking-wider ${isActive ? "text-white" : "text-stone-300"}`}>
                      {sig.title}
                    </h4>
                    <p className="text-[10px] text-stone-500 truncate leading-none mt-0.5">{sig.function}</p>
                  </div>
                  <span className={`text-[8.5px] font-mono px-2 py-0.5 rounded ${isActive ? "bg-violet-600 text-white" : "bg-stone-850 text-stone-600"}`}>
                    SELECT
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Live wave visualizer panel (Dark Card) */}
          <div className="lg:col-span-4 bg-[#0c0b0c] border border-violet-500/25 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 h-32 w-32 bg-radial from-violet-600/5 to-transparent pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-stone-850 pb-2">
                <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest">Biophysical Waveform</span>
                <span className="text-[10px] font-black text-violet-400 uppercase tracking-wider animate-pulse">Live Feed</span>
              </div>

              {/* Dynamic Animated wave display */}
              <div className="h-20 w-full bg-[#050405] border border-stone-900 rounded-xl flex items-center relative overflow-hidden px-3">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:10px_10px]" />
                
                <svg viewBox="0 0 320 60" className="w-full h-full">
                  <path 
                    d={signalsList[activeSignal].wavePath} 
                    fill="none" 
                    stroke={signalsList[activeSignal].waveColor} 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                    className="animate-wave-scroll opacity-90" 
                  />
                </svg>
              </div>

              <div className="space-y-3 text-[11px] leading-relaxed">
                <div>
                  <span className="text-[7.5px] font-black uppercase text-stone-400 tracking-wider block">Neural Activation State</span>
                  <p className="text-stone-300 font-semibold">{signalsList[activeSignal].state}</p>
                </div>
                <div>
                  <span className="text-[7.5px] font-black uppercase text-stone-400 tracking-wider block">Diagnostic Interpretation</span>
                  <p className="text-stone-300 font-semibold">{signalsList[activeSignal].interpretation}</p>
                </div>
                <div className="bg-[#121011] border border-stone-850 p-2.5 rounded-xl">
                  <span className="text-[7.5px] font-black uppercase text-violet-400 tracking-wider block">Marketing Relevance</span>
                  <p className="text-white font-bold mt-0.5">{signalsList[activeSignal].marketing}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-850 flex justify-between items-center text-[10px]">
              <span className="text-stone-500 uppercase font-black tracking-widest text-[8px]">Oscillatory Source</span>
              <span className="text-violet-400 font-bold uppercase tracking-wider">{signalsList[activeSignal].title.split(" ")[0]} band</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 5: BEHAVIORAL INDICATORS
          ═══════════════════════════════════════════ */}
      <div className="space-y-8 border-t border-stone-200/20 pt-16 select-none">
        <div className="flex flex-col sm:flex-row gap-6 justify-between sm:items-end">
          <div>
            <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-2">
              Behavioral Signals
            </span>
            <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-none text-2xl md:text-3xl">
              MEG Behavioral Indicators
            </h2>
            <p className="text-[#475569] text-xs md:text-sm font-medium mt-1">
              Subconscious signals mapped directly to digital loan funnel interactions.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {["All", "Attention", "Trust & Emotion", "Cognitive Load"].map((cat) => (
              <button
                key={cat}
                onClick={() => setIndicatorFilter(cat)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border transition-all cursor-pointer ${
                  indicatorFilter === cat
                    ? "bg-violet-600 text-white border-violet-500 shadow-[0_0_8px_rgba(168,85,247,0.3)]"
                    : "bg-stone-200/50 text-[#475569] border-stone-300 hover:text-[#0F172A] hover:bg-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Indicators Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {behavioralIndicators
            .filter((item) => indicatorFilter === "All" || item.category === indicatorFilter)
            .map((item, idx) => (
              <div 
                key={idx}
                className="bg-[#0c0b0c] border border-stone-800 hover:border-stone-700 transition-all rounded-3xl p-5 flex flex-col justify-between min-h-[260px] shadow-2xl relative overflow-hidden group animate-fade-in"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-stone-850 pb-2.5">
                    <span className="text-[8.5px] font-black uppercase px-2.5 py-0.5 rounded border border-violet-500/30 text-violet-300 bg-violet-955/20">
                      {item.category}
                    </span>
                    <span className="text-[8px] font-mono text-stone-500 font-bold">SIGNAL</span>
                  </div>

                  <div>
                    <h3 className="font-display font-black text-sm text-white uppercase tracking-wider">
                      {item.title}
                    </h3>
                    <div className="bg-[#121011] border border-stone-850 p-2.5 rounded-xl mt-2.5">
                      <span className="text-[7.5px] font-black uppercase text-stone-500 tracking-wider block mb-0.5">Biophysical Marker</span>
                      <p className="text-[10px] text-violet-300 font-bold leading-tight uppercase font-mono">
                        {item.signal}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-3 mt-4 border-t border-stone-850">
                  <div>
                    <span className="text-[7.5px] font-black uppercase text-stone-400 tracking-wider block">Scientific Mechanism</span>
                    <p className="text-[10.5px] text-stone-300 leading-normal font-semibold">
                      {item.science}
                    </p>
                  </div>
                  <div className="bg-violet-955/10 border border-violet-500/10 p-2 rounded-xl">
                    <span className="text-[7.5px] font-black uppercase text-violet-400 tracking-wider block">Marketing Adaptation</span>
                    <p className="text-[10.5px] text-[#CBD5E1] leading-relaxed font-bold">
                      {item.marketing}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 6: APPLICATIONS
          ═══════════════════════════════════════════ */}
      <div className="space-y-8 border-t border-stone-200/20 pt-16 select-none">
        <div>
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-2">
            Deployment Scenarios
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-none text-2xl md:text-3xl">
            Mahindra Finance Applications
          </h2>
          <p className="text-[#475569] text-xs md:text-sm font-medium mt-1">
            How OPM-MEG intelligence translates into conversion, compliance, and onboarding optimizations.
          </p>
        </div>

        {/* 6 High-precision scenario cards with realistic use case images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch font-sans">
          {mahindraApplications.map((use, idx) => (
            <div 
              key={idx}
              className="bg-[#0c0b0c] border border-stone-855 rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between hover:border-stone-700 hover:bg-[#121011] transition-all duration-300 group"
            >
              <div className="absolute top-0 right-0 h-40 w-40 bg-radial from-[#a855f7]/4 to-transparent pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-stone-850 pb-2.5">
                  <span className="text-[8px] font-black uppercase text-violet-300 bg-violet-955/20 px-2 py-0.5 rounded border border-violet-500/20">
                    APPLICATION {(idx + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="text-[7.5px] font-mono text-stone-500 font-bold">OPM-MEG</span>
                </div>

                {/* Visual Image container (custom generated telemetry assets) */}
                <div className="relative rounded-2xl overflow-hidden border border-stone-850 shadow bg-secondary/15 shrink-0 aspect-[16/9]">
                  <img 
                    src={use.image} 
                    alt={use.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex items-end p-3.5">
                    <h3 className="font-display font-black text-xs md:text-sm text-white uppercase tracking-wide leading-tight">
                      {use.title}
                    </h3>
                  </div>
                </div>

                {/* Scenario details */}
                <div className="grid gap-3 pt-2 border-t border-stone-850 grid-cols-1 text-[11px] leading-relaxed">
                  <div className="bg-[#121011] p-2.5 rounded-xl border border-stone-850">
                    <span className="text-[7.5px] font-black text-rose-400 uppercase tracking-widest block mb-0.5">Marketing Challenge</span>
                    <p className="text-stone-300 font-semibold">{use.challenge}</p>
                  </div>
                  <div className="bg-[#121011] p-2.5 rounded-xl border border-stone-850">
                    <span className="text-[7.5px] font-black text-violet-400 uppercase tracking-widest block mb-0.5">What MEG Telemetry Reveals</span>
                    <p className="text-stone-300 font-semibold">{use.reveal}</p>
                  </div>
                  <div className="bg-[#121011] p-2.5 rounded-xl border border-stone-850">
                    <span className="text-[7.5px] font-black text-[#F5E6CC] uppercase tracking-widest block mb-0.5">Possible Subconscious Insight</span>
                    <p className="text-stone-300 font-semibold">{use.insight}</p>
                  </div>
                </div>
              </div>

              {/* Expected Outcome impact banner */}
              <div className="bg-[#050405] border border-stone-855 px-3 py-2 rounded-xl flex justify-between items-center text-[10px] font-bold mt-4 shrink-0 transition-colors group-hover:bg-[#121011]">
                <span className="text-stone-400 flex items-center gap-1 uppercase text-[7px] tracking-widest font-black">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-400" /> Expected Outcome:
                </span>
                <span className="text-emerald-400 font-black text-right tracking-wide">{use.outcome}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 7: STRATEGIC TAKEAWAYS
          ═══════════════════════════════════════════ */}
      <div className="space-y-6 select-none border-t border-stone-200/20 pt-16">
        <div>
          <span className="text-[11px] tracking-[0.18em] font-bold text-[#7C93B7] block uppercase font-sans mb-3">
            Executive Scorecards
          </span>
          <h2 className="font-display font-extrabold text-[#0F172A] uppercase tracking-tight leading-none text-2xl md:text-3xl">
            Enterprise Strategic Takeaways
          </h2>
          <p className="text-[#475569] text-xs md:text-sm font-medium mt-1">
            Enterprise-grade evaluation guidelines to calibrate real-world branch deployment feasibility, scalability, and ethical safeguards.
          </p>
        </div>

        {/* 6 Enterprise Cards (Takeaways with Impact Score) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans pt-2">
          {strategicTakeaways.map((takeaway, idx) => (
            <div 
              key={idx}
              className="bg-[#0c0b0c] border border-stone-800 hover:border-stone-750 transition-all duration-300 rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[170px] group animate-fade-in"
            >
              <div className="space-y-2">
                <span className="text-[8px] font-black uppercase text-[#FF758F] tracking-widest block">{takeaway.tag}</span>
                <h4 className="font-display font-black text-xs text-white uppercase tracking-wide">{takeaway.title}</h4>
                <p className="text-[10px] leading-relaxed text-[#E5E7EB] font-medium">
                  {takeaway.desc}
                </p>
              </div>
              <div className="space-y-1 mt-4">
                <div className="flex justify-between text-[7.5px] font-mono font-bold text-[#CBD5E1] uppercase">
                  <span>IMPACT SCORE</span>
                  <span>{takeaway.label} ({takeaway.score}%)</span>
                </div>
                <div className="w-full h-1.5 bg-stone-900 border border-stone-800 rounded-full overflow-hidden">
                  <div className={`h-full w-[${takeaway.score}%] ${takeaway.color}`} style={{ width: `${takeaway.score}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
