import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/neuro/AppLayout";
import { PageHeader, Card } from "@/components/neuro/Primitives";
import { Eye, Lightbulb, Heart, MousePointerClick } from "lucide-react";

export const Route = createFileRoute("/funnel")({ component: FunnelPage });

const stages = [
  {
    icon: Eye, name: "Attention", color: "from-primary/15 to-primary/5",
    principle: "Salience Theory — high-contrast, face-bearing, emotionally relevant stimuli win pre-attentive processing in <500ms.",
    trigger: "Faces, motion, contrast, scale, novelty.",
    rural: "Rural eyes screen out generic stock imagery instantly. They reward locally-recognisable scenes (own crop, own attire, own dialect).",
    mahindra: "Hero shot: a borrower from the same district holding a Mahindra-financed tractor. NOT generic urban office footage.",
    optimisation: "Test thumbnails with Mahindra agents from the target district. First 3 seconds must show a face + a recognisable rural artefact."
  },
  {
    icon: Lightbulb, name: "Interest", color: "from-accent/20 to-accent/5",
    principle: "Curiosity Gap (Loewenstein) — the brain treats unresolved information as itch demanding scratch.",
    trigger: "Specific numbers, time-bounded promises, named protagonists.",
    rural: "Vague aspirational claims trigger suspicion. Specific outcomes ('₹2 lakh in 48 hours, no CIBIL check') hold interest.",
    mahindra: "Replace 'Easy farm loans' with 'Tractor loan approved in 3 visits — 92% of farmers in your block did it'.",
    optimisation: "Lead with the most specific, district-localised proof point. Specificity raises perceived truth."
  },
  {
    icon: Heart, name: "Desire", color: "from-rose-500/15 to-rose-500/5",
    principle: "Affective Forecasting + Loss Aversion — desire is amplified by imagining a future self holding the gain and by fearing it slipping away.",
    trigger: "Possession imagery, deadline framing, social validation.",
    rural: "Joint family is the actual decision unit. Desire is collective — the wife, eldest son, and elder must all see themselves in the future state.",
    mahindra: "Show the family using the tractor at harvest, festival deadlines anchoring the offer, and social proof from peers.",
    optimisation: "Replace 'You can own it' with 'Your family will own it before Diwali'. Make ownership communal and time-bound."
  },
  {
    icon: MousePointerClick, name: "Action", color: "from-emerald-500/15 to-emerald-500/5",
    principle: "Cognitive Load Theory + Conceptual Closure — completion feels mandatory once a progress loop is opened and friction is minimised.",
    trigger: "Single visible next step, pre-filled progress, assisted human option.",
    rural: "Self-serve digital is intimidating. The user wants an agent name and phone number visible at the moment of friction.",
    mahindra: "On every CTA screen: 'Apply online' AND 'Call Ramesh in your branch — +91…'. Show both, equally weighted.",
    optimisation: "Pre-fill 'Step 1 of 3 done'. Surface an agent face + name at every drop-off zone. Eliminate every form field that isn't legally required."
  },
];

function FunnelPage() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="Communication Funnel"
        title="From Attention to Action — Neuro-Mapped"
        subtitle="The AIDA funnel re-grounded in neuroscience: each stage has its own principle, behavioral trigger, and rural-specific optimisation."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {stages.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={s.name} hover className="p-6 overflow-hidden relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${s.color} pointer-events-none`} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-11 w-11 rounded-xl bg-primary text-primary-foreground grid place-items-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="chip text-[9px]">Stage {i + 1}</div>
                    <h3 className="font-display text-xl font-semibold">{s.name}</h3>
                  </div>
                </div>
                <Block label="Neuroscience principle" text={s.principle} />
                <Block label="Behavioral trigger" text={s.trigger} />
                <Block label="Rural consumer insight" text={s.rural} />
                <Block label="Mahindra Finance application" text={s.mahindra} highlight />
                <Block label="Optimisation playbook" text={s.optimisation} />
              </div>
            </Card>
          );
        })}
      </div>
    </AppLayout>
  );
}

function Block({ label, text, highlight }: { label: string; text: string; highlight?: boolean }) {
  return (
    <div className="mt-3 pt-3 border-t border-border/60">
      <div className={`text-[10px] uppercase tracking-wider mb-1 ${highlight ? "text-primary" : "text-muted-foreground"}`}>{label}</div>
      <p className="text-[13px] text-foreground/85 leading-relaxed">{text}</p>
    </div>
  );
}
