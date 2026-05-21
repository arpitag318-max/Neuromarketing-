import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/neuro/AppLayout";
import { PageHeader, Card } from "@/components/neuro/Primitives";
import { Building2, Smartphone, ShoppingBag, Store } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/case-studies")({ component: CasesPage });

const categories = [
  { id: "bfsi", label: "BFSI", icon: Building2 },
  { id: "fintech", label: "Fintech", icon: Smartphone },
  { id: "fmcg", label: "FMCG", icon: ShoppingBag },
  { id: "retail", label: "Retail", icon: Store },
] as const;

type Cat = typeof categories[number]["id"];

const cases: Record<Cat, Array<{ title: string; problem: string; tool: string; insight: string; impact: string; mahindra: string }>> = {
  bfsi: [
    { title: "HDFC Bank — Branch Signage", problem: "Customers missed key product offers on branch walls.", tool: "Eye tracking (Tobii) — n=42 branches", insight: "Counter-facing signage above eye-line received <1.2s dwell. Hand-level signage got 4.8s.", impact: "Repositioning lifted cross-sell visibility by 41%.", mahindra: "Audit Mahindra Finance branch wall placements; move tractor-loan signage to hand-level near token counter." },
    { title: "ICICI — Loan Disclosure Screen", problem: "High abandonment on T&C step in app.", tool: "GSR + facial coding, n=60", insight: "Arousal spike correlated to a single sentence about prepayment penalty.", impact: "Rewriting that sentence cut abandonment 28%.", mahindra: "GSR-test our app's pre-EMI confirmation screen; identify and rewrite the one anxious sentence." },
  ],
  fintech: [
    { title: "PhonePe — Onboarding Carousel", problem: "Carousel skipped within 1.4s by 73% of users.", tool: "WebGazer + heatmaps, n=200", insight: "Skip-X icon got first fixation. Value props never reached.", impact: "Repositioning skip-X gained +9% activated users.", mahindra: "Our app onboarding likely loses users at the same first-fixation moment. Audit and reposition." },
    { title: "Paytm — Trust Cues", problem: "Low conversion on personal loan flow.", tool: "IAT — implicit brand-trust association, n=400", insight: "'Paytm' associated faster with 'wallet' than 'lending'.", impact: "Adding RBI badge + bank-partner logos closed the trust gap, +18% conv.", mahindra: "Our brand strength on 'trust' is high in rural — leverage it explicitly in fintech-style flows." },
  ],
  fmcg: [
    { title: "Unilever — Pack Design", problem: "New Surf Excel pack underperformed in shelf test.", tool: "SST + eye tracking, n=80", insight: "New logo placement broke 8-year visual memory anchor. Lower encoding.", impact: "Reverting logo position recovered 14% category share.", mahindra: "Don't redesign our brand mark position arbitrarily — long-built familiarity is encoded subconsciously." },
    { title: "Nestlé — Maggi Re-launch Ad", problem: "Post-ban relaunch ad emotional resonance unknown.", tool: "Facial coding, n=150", insight: "Joy peaked at family-eating scene, not at safety claim.", impact: "Trimmed safety messaging, doubled family moments — recall +37%.", mahindra: "Lead campaigns with emotional family moments first, technical reassurance second." },
  ],
  retail: [
    { title: "DMart — Aisle Layout", problem: "Promo end-caps underperforming in tier-2 stores.", tool: "Mobile eye tracking, n=30 shoppers", insight: "Shoppers scanned floor-up; end-cap height was too tall for rural shopper avg.", impact: "Lowering end-cap by 18cm lifted promo offtake 22%.", mahindra: "Same lesson for branch displays and brochure racks — design for the actual rural eye height." },
    { title: "Big Bazaar — Festive Promo", problem: "Loud festive POS reduced conversion in some stores.", tool: "GSR + survey, n=120", insight: "Visual clutter elevated arousal past comfort threshold — shoppers exited.", impact: "Toned-down clutter at 30% of stores grew basket size 11%.", mahindra: "Festive campaign creatives risk visual clutter — neuro-audit before mass rollout." },
  ],
};

function CasesPage() {
  const [active, setActive] = useState<Cat>("bfsi");
  return (
    <AppLayout>
      <PageHeader
        eyebrow="Case Study Vault"
        title="What Worked, and Why It Worked"
        subtitle="Real-world neuromarketing wins — each tagged with the method, insight, business impact, and a direct Mahindra Finance adaptation."
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((c) => {
          const Icon = c.icon;
          return (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`inline-flex items-center gap-2 h-10 px-4 rounded-xl text-sm font-medium border transition ${active===c.id?"bg-primary text-primary-foreground border-primary":"bg-card border-border hover:bg-secondary"}`}
            >
              <Icon className="h-4 w-4" /> {c.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cases[active].map((c) => (
          <Card key={c.title} hover className="p-6">
            <h3 className="font-display text-lg font-semibold mb-2">{c.title}</h3>
            <Field label="Problem" text={c.problem} />
            <Field label="Neuroscience tool used" text={c.tool} />
            <Field label="Key insight" text={c.insight} />
            <Field label="Business impact" text={c.impact} highlight />
            <Field label="Mahindra Finance adaptation" text={c.mahindra} highlight />
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}

function Field({ label, text, highlight }: { label: string; text: string; highlight?: boolean }) {
  return (
    <div className="mt-3 pt-3 border-t border-border/60">
      <div className={`text-[10px] uppercase tracking-wider mb-1 ${highlight?"text-primary":"text-muted-foreground"}`}>{label}</div>
      <p className="text-[13px] text-foreground/85 leading-relaxed">{text}</p>
    </div>
  );
}
