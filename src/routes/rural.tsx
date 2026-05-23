import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/neuro/AppLayout";
import { PageHeader, Card } from "@/components/neuro/Primitives";
import { Shield, Smartphone, HandHeart, Eye, MessageCircle, AlertTriangle, Users } from "lucide-react";
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/rural")({ component: RuralPage });

const behaviors = [
  { icon: Shield, title: "Trust Behavior", value: 78, insight: "Tier-3/4 borrowers trust faces over logos. Field officers carry 2.4× more credibility than brand ads." },
  { icon: Smartphone, title: "Digital Hesitation", value: 61, insight: "61% complete first KYC step but stall before OTP — fear of 'pressing wrong button' costs Rs 14L/month in CAC." },
  { icon: HandHeart, title: "Onboarding Anxiety", value: 54, insight: "Stress peaks at document upload. Pre-uploaded officer-assisted forms cut anxiety by 38%." },
  { icon: Eye, title: "Familiarity Bias", value: 82, insight: "Repeated exposure to same agent face across SMS + branch + WhatsApp drives 35% trust uplift." },
  { icon: MessageCircle, title: "Emotional Reassurance", value: 71, insight: "'Hum aapke saath hain' vernacular phrasing outperforms English equivalents by 2.1× in recall." },
  { icon: AlertTriangle, title: "Fear of Rejection", value: 67, insight: "Public visibility of failure (others seeing 'declined') is a top-3 reason borrowers avoid digital apply." },
  { icon: Users, title: "Assisted Onboarding Preference", value: 84, insight: "84% of new-to-credit rural users prefer agent-led completion even when self-serve is faster." },
];

const stateData = [
  { s: "Maharashtra", trust: 82, anxiety: 38 },
  { s: "MP", trust: 75, anxiety: 44 },
  { s: "UP", trust: 71, anxiety: 49 },
  { s: "Karnataka", trust: 79, anxiety: 36 },
  { s: "Rajasthan", trust: 74, anxiety: 47 },
  { s: "Bihar", trust: 68, anxiety: 53 },
  { s: "TN", trust: 80, anxiety: 35 },
  { s: "Gujarat", trust: 81, anxiety: 39 },
];

function RuralPage() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="Rural Insight Center"
        title="The Rural Borrower, Decoded"
        subtitle="Behavioral dashboards built from field research across 18 Indian states. Every metric is a starting point for a campaign brief — not a vanity score."
      />

      <Card className="p-5 mb-6">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <h3 className="font-display text-base font-semibold">Trust vs Digital Anxiety — by State</h3>
            <p className="text-xs text-muted-foreground">Higher trust + lower anxiety = lowest cost-per-funded-lead</p>
          </div>
          <div className="flex gap-2 text-[10px]">
            <span className="chip">Trust</span>
            <span className="chip-teal chip">Anxiety</span>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={stateData} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="oklch(0.24 0.03 245 / 0.06)" vertical={false} />
              <XAxis dataKey="s" stroke="oklch(0.52 0.02 245)" fontSize={10} />
              <YAxis stroke="oklch(0.52 0.02 245)" fontSize={10} />
              <Tooltip contentStyle={{ background: "white", border: "1px solid oklch(0.24 0.03 245 / 0.1)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="trust" fill="oklch(0.40 0.14 22)" radius={[6,6,0,0]} />
              <Bar dataKey="anxiety" fill="oklch(0.67 0.065 195)" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {behaviors.map((b) => {
          const Icon = b.icon;
          return (
            <Card key={b.title} hover className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-xl bg-primary/8 text-primary grid place-items-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-display text-2xl font-bold text-primary">{b.value}</div>
              </div>
              <h3 className="font-display text-base font-semibold mb-1">{b.title}</h3>
              <p className="text-xs text-foreground/75 leading-relaxed">{b.insight}</p>
              <div className="mt-3 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${b.value}%` }} />
              </div>
            </Card>
          );
        })}
      </div>
    </AppLayout>
  );
}
