import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/neuro/AppLayout";
import { PageHeader, Card } from "@/components/neuro/Primitives";
import { FileText, Download, Sparkles, FileImage, Eye } from "lucide-react";

export const Route = createFileRoute("/reports")({ component: ReportsPage });

const reports = [
  { name: "Q3 Rural Trust Index", date: "12 Nov 2026", type: "Executive PDF", size: "2.4 MB" },
  { name: "Tractor Loan Print Audit — Maharashtra", date: "08 Nov 2026", type: "Neuro Audit", size: "1.1 MB" },
  { name: "KYC Friction Lab Snapshot", date: "01 Nov 2026", type: "UX Report", size: "0.8 MB" },
  { name: "Festive Campaign Brief — Diwali 2026", date: "24 Oct 2026", type: "Strategy Deck", size: "3.7 MB" },
];

function ReportsPage() {
  function exportPage() { window.print(); }
  return (
    <AppLayout>
      <PageHeader
        eyebrow="Reports & Exports"
        title="Executive Outputs from Every Module"
        subtitle="Generate, save, and export neuroscience-backed audits, heatmaps, and executive summaries — straight to PDF, ready for leadership reviews."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Link to="/audit">
          <Card hover className="p-5 h-full">
            <div className="h-10 w-10 rounded-xl bg-primary/8 text-primary grid place-items-center mb-3"><Sparkles className="h-5 w-5"/></div>
            <div className="font-display text-base font-semibold mb-1">New Creative Audit</div>
            <p className="text-xs text-muted-foreground">Upload a creative, get an explainable PDF-ready report.</p>
          </Card>
        </Link>
        <Link to="/eye-tracking">
          <Card hover className="p-5 h-full">
            <div className="h-10 w-10 rounded-xl bg-primary/8 text-primary grid place-items-center mb-3"><Eye className="h-5 w-5"/></div>
            <div className="font-display text-base font-semibold mb-1">Run a Gaze Session</div>
            <p className="text-xs text-muted-foreground">Capture a heatmap from a live browser session.</p>
          </Card>
        </Link>
        <button onClick={exportPage} className="text-left">
          <Card hover className="p-5 h-full">
            <div className="h-10 w-10 rounded-xl bg-primary/8 text-primary grid place-items-center mb-3"><FileImage className="h-5 w-5"/></div>
            <div className="font-display text-base font-semibold mb-1">Export Current View</div>
            <p className="text-xs text-muted-foreground">Print or save the current dashboard as a PDF.</p>
          </Card>
        </button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-border bg-secondary/40 text-[10.5px] uppercase tracking-wider text-muted-foreground font-medium">
          <div className="col-span-5">Report</div>
          <div className="col-span-3">Type</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2 text-right">Action</div>
        </div>
        {reports.map((r, i) => (
          <div key={r.name} className={`grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 ${i!==reports.length-1?"border-b border-border":""} hover:bg-secondary/30 transition`}>
            <div className="md:col-span-5 flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary/8 text-primary grid place-items-center"><FileText className="h-4 w-4"/></div>
              <div>
                <div className="font-medium text-sm">{r.name}</div>
                <div className="text-[11px] text-muted-foreground">{r.size}</div>
              </div>
            </div>
            <div className="md:col-span-3 flex items-center text-xs text-foreground/75">{r.type}</div>
            <div className="md:col-span-2 flex items-center text-xs text-muted-foreground">{r.date}</div>
            <div className="md:col-span-2 md:text-right flex md:justify-end items-center">
              <button className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-secondary">
                <Download className="h-3.5 w-3.5"/> Download
              </button>
            </div>
          </div>
        ))}
      </Card>
    </AppLayout>
  );
}
