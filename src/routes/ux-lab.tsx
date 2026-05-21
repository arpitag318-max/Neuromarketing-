import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/neuro/AppLayout";
import { PageHeader, Card } from "@/components/neuro/Primitives";
import { AlertTriangle, FileCheck, Shield, Smartphone, FileText } from "lucide-react";

export const Route = createFileRoute("/ux-lab")({ component: UxLabPage });

const audits = [
  { icon: FileCheck, area: "Onboarding Stress", friction: 72, load: "High", recommendation: "Split 'Personal + Income + Document' into 3 single-task screens; show progress bar starting at 33%." },
  { icon: Shield, area: "KYC Friction", friction: 81, load: "Very High", recommendation: "Replace 'Upload Aadhaar' with 'Take a clear photo of front + back' + sample image preview." },
  { icon: Smartphone, area: "OTP Anxiety", friction: 58, load: "Medium", recommendation: "Show network strength + 'auto-detected' badge; expose 'Call me' fallback after 15s." },
  { icon: FileText, area: "Information Overload", friction: 76, load: "High", recommendation: "Hide T&C behind progressive disclosure; surface only the 3 things that change EMI." },
  { icon: AlertTriangle, area: "Mobile Usability", friction: 49, load: "Medium", recommendation: "Buttons ≥48px touch target; primary action above the keyboard area on small screens." },
];

function loadColor(load: string) {
  if (load.startsWith("Very")) return "bg-primary/15 text-primary";
  if (load === "High") return "bg-accent/20 text-accent";
  return "bg-emerald-500/15 text-emerald-700";
}

function UxLabPage() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="UX & Cognitive Friction Lab"
        title="Where the Funnel Bleeds"
        subtitle="Each row is a cognitive bottleneck observed in Mahindra Finance's digital onboarding. Friction scores combine GSR-style arousal + task-completion drop-off + Cognitive Load estimates."
      />

      <Card className="p-0 overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-border bg-secondary/40 text-[10.5px] uppercase tracking-wider text-muted-foreground font-medium">
          <div className="col-span-3">Friction area</div>
          <div className="col-span-2">Friction score</div>
          <div className="col-span-2">Cognitive load</div>
          <div className="col-span-5">Optimisation recommendation</div>
        </div>
        {audits.map((a, i) => {
          const Icon = a.icon;
          return (
            <div key={a.area} className={`grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 ${i!==audits.length-1?"border-b border-border":""} hover:bg-secondary/30 transition`}>
              <div className="md:col-span-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary/8 text-primary grid place-items-center shrink-0"><Icon className="h-4 w-4"/></div>
                <div className="font-display text-sm font-semibold">{a.area}</div>
              </div>
              <div className="md:col-span-2 flex items-center">
                <div className="flex items-center gap-2 w-full">
                  <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${a.friction}%` }} />
                  </div>
                  <span className="text-sm font-display font-semibold w-8 text-right">{a.friction}</span>
                </div>
              </div>
              <div className="md:col-span-2 flex items-center">
                <span className={`chip ${loadColor(a.load)}`}>{a.load}</span>
              </div>
              <div className="md:col-span-5 text-[13px] text-foreground/80 leading-relaxed">{a.recommendation}</div>
            </div>
          );
        })}
      </Card>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5"><div className="text-xs text-muted-foreground">Avg friction score</div><div className="font-display text-3xl font-bold text-primary mt-2">67</div><div className="text-xs text-muted-foreground mt-1">−6 vs last quarter</div></Card>
        <Card className="p-5"><div className="text-xs text-muted-foreground">Highest-load step</div><div className="font-display text-xl font-bold mt-2">KYC document upload</div><div className="text-xs text-muted-foreground mt-1">81 / 100 friction</div></Card>
        <Card className="p-5"><div className="text-xs text-muted-foreground">Quickest win</div><div className="font-display text-xl font-bold mt-2">OTP fallback CTA</div><div className="text-xs text-muted-foreground mt-1">Est. +12% step completion</div></Card>
      </div>
    </AppLayout>
  );
}
