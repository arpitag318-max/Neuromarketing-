import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/neuro/AppLayout";
import { PageHeader, Card, SectionTitle } from "@/components/neuro/Primitives";
import {
  Eye, ShieldCheck, HeartPulse, BrainCircuit, Activity, Sparkles, Gauge,
  Sprout, ArrowRight, TrendingUp, ClipboardCheck, Workflow,
  BookMarked, Microscope, Brain, FileText
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar, CartesianGrid
} from "recharts";

export const Route = createFileRoute("/")({ component: Dashboard });

const kpis = [
  { label: "Attention Retention", value: "71.5", delta: "+3.1%", icon: Eye, hint: "First 7-second hold" },
  { label: "Trust Score", value: "78.4", delta: "+4.2%", icon: ShieldCheck, hint: "Rural borrower confidence" },
  { label: "Emotional Engagement", value: "64.1", delta: "+2.8%", icon: HeartPulse, hint: "Affect intensity index" },
  { label: "Cognitive Load", value: "32.0", delta: "−5.6%", good: true, icon: BrainCircuit, hint: "Lower is better" },
  { label: "Memory Encoding", value: "58.9", delta: "+1.4%", icon: Activity, hint: "Recall after 24h" },
  { label: "Rural Relevance", value: "82.3", delta: "+6.0%", icon: Sprout, hint: "Cultural fit score" },
  { label: "Digital Anxiety", value: "41.2", delta: "−3.9%", good: true, icon: Gauge, hint: "Onboarding friction" },
];

const trustData = Array.from({ length: 14 }, (_, i) => ({
  d: `W${i + 1}`,
  trust: 60 + Math.sin(i / 2) * 8 + i * 0.6,
  attention: 55 + Math.cos(i / 3) * 10 + i * 0.3,
}));

const radarData = [
  { m: "Trust", v: 78 }, { m: "Attention", v: 71 }, { m: "Emotion", v: 64 },
  { m: "Memory", v: 59 }, { m: "Clarity", v: 81 }, { m: "Comfort", v: 69 },
];

const funnelData = [
  { stage: "Awareness", v: 100 }, { stage: "Interest", v: 78 },
  { stage: "Trust", v: 54 }, { stage: "Desire", v: 41 }, { stage: "Action", v: 29 },
];

const quickLinks = [
  { to: "/audit", icon: ClipboardCheck, title: "Run AI Creative Audit", desc: "Upload a campaign visual for neuroscience-backed scoring", tag: "AI" },
  { to: "/eye-tracking", icon: Eye, title: "Live Gaze Lab", desc: "Browser-based eye tracking with WebGazer", tag: "Live" },
  { to: "/psychology", icon: Brain, title: "Consumer Psychology", desc: "Cognitive load, trust heuristics, loss aversion", tag: "Learn" },
  { to: "/tools", icon: Microscope, title: "Neuromarketing Tools Hub", desc: "EEG, SST, GSR, IAT, eye tracking, facial coding", tag: "Methods" },
  { to: "/funnel", icon: Workflow, title: "Communication Funnel", desc: "Attention → Interest → Desire → Action mapped to neuro signals", tag: "Strategy" },
  { to: "/case-studies", icon: BookMarked, title: "Case Study Vault", desc: "BFSI, Fintech, FMCG, Retail behavioral wins", tag: "Library" },
] as const;

const recentAudits = [
  { name: "Tractor Loan — Vernacular Print", score: 82, status: "Strong", date: "2 days ago" },
  { name: "Two-Wheeler Festive Banner", score: 67, status: "Solid", date: "4 days ago" },
  { name: "KYC Onboarding Screen v3", score: 54, status: "Needs Work", date: "1 week ago" },
];

function Dashboard() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="Neuromarketing Capsule"
        title="Behavioral Intelligence Platform"
        subtitle="For Mahindra Finance's rural financial marketing team — combining neuroscience, behavioral science, and consumer psychology into one decision workspace."
        action={
          <Link to="/audit" className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium transition shadow-sm">
            <Sparkles className="h-4 w-4" /> Run AI Creative Audit
          </Link>
        }
      />

      {/* KPI grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 mb-8">
        {kpis.map((k) => {
          const Icon = k.icon;
          const positive = k.good ? k.delta.startsWith("−") : k.delta.startsWith("+");
          return (
            <Card key={k.label} hover className="p-4">
              <div className="flex items-start justify-between">
                <div className="h-9 w-9 rounded-lg bg-primary/8 text-primary grid place-items-center">
                  <Icon className="h-4 w-4" />
                </div>
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${positive ? "bg-emerald-500/10 text-emerald-700" : "bg-primary/10 text-primary"}`}>
                  {k.delta}
                </span>
              </div>
              <div className="mt-4">
                <div className="font-display text-2xl font-semibold tracking-tight">{k.value}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{k.label}</div>
                <div className="text-[10px] text-muted-foreground/70 mt-1">{k.hint}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <h3 className="font-display text-base font-semibold">Trust & Attention Trends</h3>
              <p className="text-xs text-muted-foreground">14-week rolling neuro index across rural campaigns</p>
            </div>
            <div className="flex gap-2 text-[10px]">
              <span className="chip">Trust</span>
              <span className="chip-teal chip">Attention</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={trustData} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.40 0.14 22)" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="oklch(0.40 0.14 22)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.67 0.065 195)" stopOpacity={0.35}/>
                    <stop offset="100%" stopColor="oklch(0.67 0.065 195)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(0.24 0.03 245 / 0.06)" />
                <XAxis dataKey="d" stroke="oklch(0.52 0.02 245)" fontSize={10} />
                <YAxis stroke="oklch(0.52 0.02 245)" fontSize={10} />
                <Tooltip contentStyle={{ background: "white", border: "1px solid oklch(0.24 0.03 245 / 0.1)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="trust" stroke="oklch(0.40 0.14 22)" strokeWidth={2} fill="url(#g1)" />
                <Area type="monotone" dataKey="attention" stroke="oklch(0.67 0.065 195)" strokeWidth={2} fill="url(#g2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-display text-base font-semibold mb-1">Neuro Signal Radar</h3>
          <p className="text-xs text-muted-foreground mb-2">Current portfolio average</p>
          <div className="h-64">
            <ResponsiveContainer>
              <RadarChart data={radarData}>
                <PolarGrid stroke="oklch(0.24 0.03 245 / 0.1)" />
                <PolarAngleAxis dataKey="m" tick={{ fill: "oklch(0.28 0.05 245)", fontSize: 11 }} />
                <Radar dataKey="v" stroke="oklch(0.40 0.14 22)" fill="oklch(0.40 0.14 22)" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Funnel + Recent audits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <h3 className="font-display text-base font-semibold">Communication Funnel — AIDA Conversion</h3>
              <p className="text-xs text-muted-foreground">Behavioral drop-off across rural awareness journey</p>
            </div>
            <Link to="/funnel" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
              Open funnel <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={funnelData} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="oklch(0.24 0.03 245 / 0.06)" vertical={false} />
                <XAxis dataKey="stage" stroke="oklch(0.52 0.02 245)" fontSize={11} />
                <YAxis stroke="oklch(0.52 0.02 245)" fontSize={10} />
                <Tooltip contentStyle={{ background: "white", border: "1px solid oklch(0.24 0.03 245 / 0.1)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="v" fill="oklch(0.40 0.14 22)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="font-display text-base font-semibold">Recent Audits</h3>
            <Link to="/audit" className="text-xs text-primary hover:underline">All →</Link>
          </div>
          <ul className="space-y-3">
            {recentAudits.map((a) => (
              <li key={a.name} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/60 transition">
                <div className={`h-10 w-10 rounded-lg grid place-items-center font-display font-semibold text-sm ${a.score >= 75 ? "bg-emerald-500/10 text-emerald-700" : a.score >= 60 ? "bg-accent/15 text-accent" : "bg-primary/10 text-primary"}`}>
                  {a.score}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium truncate">{a.name}</div>
                  <div className="text-[10.5px] text-muted-foreground">{a.status} · {a.date}</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Modules grid */}
      <SectionTitle hint="10 modules">Explore the Platform</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((q) => {
          const Icon = q.icon;
          return (
            <Link to={q.to} key={q.to}>
              <Card hover className="p-5 h-full group">
                <div className="flex items-start justify-between mb-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/8 text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="chip-navy chip">{q.tag}</span>
                </div>
                <div className="font-display text-[15px] font-semibold mb-1">{q.title}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{q.desc}</p>
                <div className="mt-4 text-[11px] text-primary inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  Open module <ArrowRight className="h-3 w-3" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </AppLayout>
  );
}
