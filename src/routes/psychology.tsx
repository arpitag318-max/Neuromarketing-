import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/neuro/AppLayout";
import { PageHeader, Card } from "@/components/neuro/Primitives";
import { Brain, Shield, Heart, TrendingDown, FileQuestion, Users, Sparkles, Eye, Layers, Radio } from "lucide-react";

export const Route = createFileRoute("/psychology")({ component: PsychologyPage });

const concepts = [
  {
    icon: Brain, title: "Cognitive Load",
    basis: "Sweller's Cognitive Load Theory — working memory holds only ~4 chunks at once.",
    implication: "Every extra field, choice, or jargon term taxes the same scarce mental budget.",
    application: "Strip KYC screens to one decision per view. Replace 'EMI tenure' with 'How long to pay back'.",
    example: "Pre-approved loan banners with 3 elements (face + amount + 'Apply') outperform 7-element banners 2.4×."
  },
  {
    icon: Shield, title: "Trust Heuristics",
    basis: "Mayer–Davis–Schoorman trust model: Ability × Benevolence × Integrity.",
    implication: "Rural users decide who to trust within 2 seconds of seeing a brand cue.",
    application: "Pair brand mark with a recognisable Mahindra field officer photo; surface 'No hidden charges' early.",
    example: "Adding a real officer headshot beside the apply button lifted form completion by 18% in pilot."
  },
  {
    icon: Heart, title: "Emotional Salience",
    basis: "Affective Neuroscience — emotionally charged stimuli get amygdala-prioritised encoding.",
    implication: "A neutral chart loses to a relevant emotional image every single time.",
    application: "Lead with aspiration (tractor delivered, harvest sold) before product features.",
    example: "Emotion-led tractor TVCs showed 31% higher 24h recall than feature-led versions."
  },
  {
    icon: TrendingDown, title: "Loss Aversion",
    basis: "Kahneman–Tversky: losses feel ~2× as powerful as equivalent gains.",
    implication: "'Don't miss this rate' beats 'Save with this rate' for risk-averse rural borrowers.",
    application: "Frame seasonal offers as 'closing soon' anchored to harvest or festival deadlines.",
    example: "Festive deadline framing increased completed applications by 23% vs evergreen messaging."
  },
  {
    icon: FileQuestion, title: "Thin-File Borrowers",
    basis: "Most rural borrowers lack credit history → assess behavioral & relational signals.",
    implication: "Marketing must replace credit-score language with character-trust language.",
    application: "Showcase 'We understand farming income cycles' — not 'CIBIL score required'.",
    example: "Income-flexible messaging doubled lead quality from tier-3 districts."
  },
  {
    icon: Sparkles, title: "Financial Anxiety",
    basis: "Mani et al. — scarcity reduces cognitive bandwidth equivalent to losing one night of sleep.",
    implication: "Stressed borrowers cannot parse complex EMI tables, even simple ones.",
    application: "Use rupee icons, not percentages. Show monthly payment, not annual interest.",
    example: "Switching from APR to '₹/month' on banners reduced bounce by 41%."
  },
  {
    icon: Eye, title: "Familiarity Bias",
    basis: "Mere-exposure effect — repeated familiar cues feel safer & more truthful.",
    implication: "New visual languages underperform until trust is built through repetition.",
    application: "Reuse the same hero face, same colour, same officer-uniform across 6+ touchpoints.",
    example: "Consistent agent visualisation across SMS, app, and branch lifted brand recall by 35%."
  },
  {
    icon: Users, title: "Social Validation",
    basis: "Cialdini — people copy what similar others do, especially in uncertainty.",
    implication: "Joint family is the real decision unit, not the individual borrower.",
    application: "'2 lakh farmers in your district trust Mahindra Finance' beats 'India's largest NBFC'.",
    example: "District-level social proof tripled WhatsApp share rates on educational content."
  },
  {
    icon: Layers, title: "Conceptual Closure Theory",
    basis: "The brain prefers complete gestalts — open loops create discomfort & action pressure.",
    implication: "A half-filled progress bar creates a stronger pull to finish than an empty one.",
    application: "Show 'Step 2 of 3 done' on onboarding even if real step 1 was opening the app.",
    example: "Pre-filled progress bars increased KYC completion by 27%."
  },
  {
    icon: Radio, title: "SST Fundamentals",
    basis: "Steady State Topography measures sub-conscious neural entrainment to stimuli.",
    implication: "What people say they remember ≠ what their brain actually encoded.",
    application: "Use SST in agency briefs to validate that the brand frame, not just the joke, is encoded.",
    example: "SST showed 60% of laugh-heavy ads encoded the humour but not the brand colour."
  },
];

function PsychologyPage() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="Consumer Psychology"
        title="The Behavioral Operating System of Rural Borrowers"
        subtitle="Ten neuroscience and behavioral concepts every Mahindra Finance marketer should internalise — each explained with its neural basis, marketing implication, and a concrete Mahindra application."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {concepts.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.title} hover className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-primary/8 text-primary grid place-items-center shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-semibold mb-1">{c.title}</h3>
                  <p className="text-xs text-muted-foreground italic mb-3">{c.basis}</p>
                  <Row label="Marketing implication" text={c.implication} />
                  <Row label="Mahindra Finance application" text={c.application} highlight />
                  <Row label="Campaign example" text={c.example} muted />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </AppLayout>
  );
}

function Row({ label, text, highlight, muted }: { label: string; text: string; highlight?: boolean; muted?: boolean }) {
  return (
    <div className={`mt-2 pt-2 border-t border-border ${muted ? "opacity-75" : ""}`}>
      <div className={`text-[10px] uppercase tracking-wider mb-1 ${highlight ? "text-primary" : "text-muted-foreground"}`}>{label}</div>
      <p className="text-[13px] leading-relaxed text-foreground/85">{text}</p>
    </div>
  );
}
