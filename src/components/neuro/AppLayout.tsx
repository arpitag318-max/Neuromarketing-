import { Outlet, Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard, Brain, Sprout, Microscope, Workflow, ClipboardCheck,
  Eye, FlaskConical, BookMarked, FileText, Sparkles, Search, Bell,
  Settings, HelpCircle, Menu, X
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { NeuroCopilot } from "./NeuroCopilot";
import { MahindraFinanceLogo, MahindraIcon, MahindraWordmark } from "./MahindraLogo";

type NavItem = { to: string; icon: typeof LayoutDashboard; label: string; highlight?: boolean };
const nav: NavItem[] = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/psychology", icon: Brain, label: "Consumer Psychology" },
  { to: "/rural", icon: Sprout, label: "Rural Insights" },
  { to: "/tools", icon: Microscope, label: "Neuromarketing Tools" },
  { to: "/funnel", icon: Workflow, label: "Communication Funnel" },
  { to: "/audit", icon: ClipboardCheck, label: "AI Creative Audit", highlight: true },
  { to: "/eye-tracking", icon: Eye, label: "Live Eye Tracking" },
  { to: "/ux-lab", icon: FlaskConical, label: "UX Friction Lab" },
  { to: "/case-studies", icon: BookMarked, label: "Case Study Vault" },
  { to: "/reports", icon: FileText, label: "Reports & Exports" },
];

export function AppLayout({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  return (
    <div className="min-h-screen warm-bg text-foreground flex">
      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 bg-foreground/30 z-40" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 z-50 lg:z-30 h-screen w-[270px] shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="px-5 py-5 flex items-center justify-between border-b border-sidebar-border gap-3">
          <MahindraFinanceLogo />
          <button onClick={() => setOpen(false)} className="lg:hidden p-1.5 rounded-md hover:bg-secondary shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-3 pt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              placeholder="Search modules…"
              className="w-full h-9 pl-9 pr-3 rounded-lg bg-secondary border border-transparent text-xs placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/30 focus:bg-card transition"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 py-4">
          <div className="px-3 pb-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">Workspace</div>
          <ul className="space-y-0.5">
            {nav.map((it) => {
              const Icon = it.icon;
              const active = loc.pathname === it.to;
              return (
                <li key={it.to}>
                  <Link
                    to={it.to}
                    onClick={() => setOpen(false)}
                    className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition relative ${
                      active
                        ? "bg-primary/8 text-primary font-medium"
                        : "text-foreground/75 hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2.5px] rounded-r bg-primary" />}
                    <Icon className={`h-4 w-4 ${active ? "text-primary" : "text-foreground/55 group-hover:text-primary"} transition`} />
                    <span className="truncate">{it.label}</span>
                    {it.highlight && <span className="ml-auto chip-gold chip text-[9px] py-0.5 px-1.5">AI</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-sidebar-border p-3 space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] text-foreground/70 hover:text-foreground hover:bg-secondary transition">
            <Settings className="h-4 w-4" /> Settings
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] text-foreground/70 hover:text-foreground hover:bg-secondary transition">
            <HelpCircle className="h-4 w-4" /> Help & Docs
          </a>
          <div className="mt-3 soft-card rounded-xl p-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-primary/10 text-primary grid place-items-center text-[11px] font-semibold">MF</div>
              <div className="leading-tight">
                <div className="text-xs font-medium">Marketing Team</div>
                <div className="text-[10px] text-muted-foreground">Internal · Tier 1</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/80 border-b border-border">
          <div className="flex items-center gap-4 px-4 lg:px-8 h-16">
            <button onClick={() => setOpen(true)} className="lg:hidden p-2 -ml-2 rounded-md hover:bg-secondary">
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <span>Workspace</span>
              <span className="text-foreground/40">/</span>
              <span className="text-foreground font-medium">Neuromarketing Capsule</span>
              <span className="ml-2 chip-teal chip">
                <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-glow" /> Live
              </span>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Link to="/audit" className="hidden sm:inline-flex items-center gap-2 h-9 px-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-medium transition">
                <Sparkles className="h-3.5 w-3.5" /> Run Creative Audit
              </Link>
              <button className="relative h-9 w-9 grid place-items-center rounded-lg border border-border bg-card hover:bg-secondary transition">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary" />
              </button>
              <div className="h-9 w-9 rounded-full bg-primary/10 text-primary grid place-items-center text-[11px] font-semibold">MF</div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 lg:px-8 py-6 lg:py-10">
          {children ?? <Outlet />}
        </main>

        <footer className="px-4 lg:px-8 py-6 border-t border-border bg-card/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center border border-primary/20 shrink-0 shadow-sm shadow-primary/5">
                <MahindraIcon className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col leading-tight select-none">
                <div className="flex items-center gap-1.5">
                  <MahindraWordmark className="h-[9.5px] text-primary" />
                  <span className="font-display font-semibold text-[10px] uppercase text-foreground leading-none">Finance</span>
                </div>
                <span className="text-[9.5px] text-muted-foreground mt-0.5">Neuromarketing Capsule · Internal platform</span>
              </div>
            </div>
            <div className="text-center md:text-right select-none">
              Powered by Neuroscience, Behavioral Science & Rural Consumer Psychology
            </div>
          </div>
        </footer>
      </div>

      <NeuroCopilot />
    </div>
  );
}
