import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/neuro/AppLayout";
import { PageHeader, Card } from "@/components/neuro/Primitives";
import { Eye, Brain, Radio, Activity, Smile, Scale } from "lucide-react";

export const Route = createFileRoute("/tools")({ component: ToolsPage });

const tools = [
  {
    icon: Eye, name: "Eye Tracking",
    measures: "Gaze coordinates, fixation duration, scan path, AOI dwell time",
    works: "Infrared cameras (or webcams) track corneal reflection at 60–1000Hz to compute gaze.",
    metrics: ["Time to first fixation", "Total dwell", "Fixation count per AOI", "Re-visits"],
    interpret: "Where attention goes — and where it doesn't. Predicts brand recall and CTA conversion.",
    bfsi: "Optimise loan disclosure layouts, branch signage, and app onboarding screens.",
    mahindra: "Pre-test rural-market print ads; redesign KYC screens to put officer face on left scan-start zone.",
    limits: "Doesn't measure why; gaze ≠ understanding; webcam accuracy ±100px.",
    cost: "Lab-grade: ₹15-40L/study · Webcam: ₹50k-2L · DIY (WebGazer): free",
    vendors: "Tobii Pro, Pupil Labs, Sticky.ai, Affectiva, EyeSee"
  },
  {
    icon: Brain, name: "EEG (Electroencephalography)",
    measures: "Real-time brainwave activity across frontal, temporal, parietal regions",
    works: "16–256 scalp electrodes record electrical activity at millisecond resolution.",
    metrics: ["Engagement (β/α ratio)", "Approach-withdrawal (frontal asymmetry)", "Cognitive workload"],
    interpret: "How emotionally and cognitively engaged a viewer is — moment by moment.",
    bfsi: "Validate that loan ad voiceovers drive engagement, not boredom or confusion.",
    mahindra: "Test vernacular vs Hindi vs English creative variants for emotional pull in target districts.",
    limits: "Lab-bound; sample sizes 20–40; expensive; results sensitive to muscle noise.",
    cost: "₹25-60L per study (n=30, 2-3 stimuli)",
    vendors: "Neuro-Insight, Nielsen Consumer Neuroscience, iMotions, Emotiv (consumer)"
  },
  {
    icon: Radio, name: "SST (Steady State Topography)",
    measures: "Sub-conscious neural response to time-locked visual probe (13Hz flicker)",
    works: "Continuous EEG tracking of brain's entrainment to a steady visual stimulus while watching content.",
    metrics: ["Long-term memory encoding", "Detail encoding", "Approach motivation", "Global emotion"],
    interpret: "What the brain actually encodes for later recall — independent of stated preference.",
    bfsi: "Validate TVC second-by-second to identify which 3 seconds are encoded vs forgotten.",
    mahindra: "Score new tractor-loan TVC editions before air; cut the 4 seconds the brain wasn't encoding.",
    limits: "Patented method (Neuro-Insight); needs trained operator; expensive per stimulus.",
    cost: "₹35-75L per campaign (15-30s stimulus, n=40)",
    vendors: "Neuro-Insight (originator), select certified partners"
  },
  {
    icon: Activity, name: "GSR (Galvanic Skin Response)",
    measures: "Skin conductance changes driven by sympathetic nervous system arousal",
    works: "Two electrodes on fingertips measure micro-sweat changes in real-time.",
    metrics: ["Arousal peaks", "Time-to-peak", "Recovery time", "Tonic vs phasic activity"],
    interpret: "Emotional intensity — but not valence (positive vs negative).",
    bfsi: "Detect anxiety spikes in loan disclosure or pricing T&C screens.",
    mahindra: "Map exactly which sentence in the consent form triggers anxiety; rewrite or chunk it.",
    limits: "Doesn't tell positive/negative; needs to be paired with self-report or facial coding.",
    cost: "₹5-15L per study; often bundled with eye tracking",
    vendors: "iMotions, Shimmer, BIOPAC, Empatica"
  },
  {
    icon: Smile, name: "Facial Coding",
    measures: "Micro-expressions across 7 universal affects (Ekman) + 20+ action units",
    works: "Computer vision detects facial action units at 30fps from webcam.",
    metrics: ["Joy / Surprise / Fear / Anger / Disgust / Sadness / Contempt", "Engagement", "Attention"],
    interpret: "Honest, sub-second emotional reaction independent of what the person says.",
    bfsi: "Read trust vs scepticism in field officer interactions; A/B test branch script changes.",
    mahindra: "Decode rural focus-group emotional reactions to draft creatives without language bias.",
    limits: "Cultural display rules vary; small movements; lighting matters.",
    cost: "₹2-10L per study (SaaS) · Pay-as-you-go on Affectiva-style APIs",
    vendors: "Affectiva (Smart Eye), Realeyes, Discovery Insights, Sightcorp"
  },
  {
    icon: Scale, name: "IAT (Implicit Association Test)",
    measures: "Reaction-time-based association strength between concepts",
    works: "Forced sort tasks reveal which concept pairs the brain links faster.",
    metrics: ["D-score (effect size)", "Bias direction", "Brand strength index"],
    interpret: "Sub-conscious brand equity and competitor associations users won't admit in surveys.",
    bfsi: "Reveal whether 'Mahindra Finance' associates with 'trustworthy' faster than competitors.",
    mahindra: "Quarterly brand-health pulse across rural cohorts to track implicit trust trajectory.",
    limits: "Single-construct per test; needs digital literacy; doesn't predict behaviour alone.",
    cost: "₹3-8L per study (n=200, 2 brand pairs)",
    vendors: "Project Implicit (academic), MindProber, Sentient Decision Science"
  },
];

function ToolsPage() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="Neuromarketing Tools Hub"
        title="The Methods Behind the Science"
        subtitle="Six neuromarketing methods every Mahindra Finance marketer should know — what they measure, what they cost, and how to brief an agency partner on each."
      />

      <div className="space-y-4">
        {tools.map((t) => {
          const Icon = t.icon;
          return (
            <Card key={t.name} hover className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/4">
                  <div className="h-12 w-12 rounded-xl bg-primary/8 text-primary grid place-items-center mb-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-1">{t.name}</h3>
                  <p className="text-xs text-foreground/75 leading-relaxed">{t.measures}</p>
                  <div className="mt-3 text-[10.5px] uppercase tracking-wider text-muted-foreground">How it works</div>
                  <p className="text-[12px] text-foreground/80 mt-1 leading-relaxed">{t.works}</p>
                </div>
                <div className="lg:w-3/4 grid sm:grid-cols-2 gap-4 text-[12.5px]">
                  <Cell label="Key metrics" value={t.metrics.join(" · ")} />
                  <Cell label="Interpretation" value={t.interpret} />
                  <Cell label="BFSI use case" value={t.bfsi} />
                  <Cell label="Mahindra Finance application" value={t.mahindra} highlight />
                  <Cell label="Limitations" value={t.limits} muted />
                  <Cell label="Indicative cost" value={t.cost} />
                  <Cell label="Vendors / service providers" value={t.vendors} className="sm:col-span-2" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </AppLayout>
  );
}

function Cell({ label, value, highlight, muted, className = "" }: { label: string; value: string; highlight?: boolean; muted?: boolean; className?: string }) {
  return (
    <div className={className}>
      <div className={`text-[10px] uppercase tracking-wider mb-1 ${highlight ? "text-primary" : "text-muted-foreground"}`}>{label}</div>
      <p className={`leading-relaxed ${muted ? "text-foreground/65" : "text-foreground/85"}`}>{value}</p>
    </div>
  );
}
