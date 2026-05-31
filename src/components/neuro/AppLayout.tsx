import { Outlet, Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard, Brain, Sprout, Microscope, Workflow, ClipboardCheck,
  Eye, FlaskConical, BookMarked, Sparkles,
  Menu, X
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { NeuroCopilot } from "./NeuroCopilot";
import { MahindraFinanceLogo, MahindraBrandMark, MahindraTopbarLogo } from "./MahindraLogo";

type NavItem = { to: string; icon: typeof LayoutDashboard; label: string; highlight?: boolean };
const nav: NavItem[] = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/psychology", icon: Brain, label: "Consumer Psychology" },
  { to: "/tools", icon: Microscope, label: "Neuromarketing Tools" },
  { to: "/funnel", icon: Workflow, label: "Communication Funnel" },
  { to: "/audit", icon: ClipboardCheck, label: "AI Creative Audit", highlight: true },
  { to: "/eye-tracking", icon: Eye, label: "Live Eye Tracking" },
  { to: "/case-studies", icon: BookMarked, label: "Case Study Vault" },
];

export function AppLayout({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  return (
    <div className="min-h-screen warm-bg text-foreground flex">
      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 bg-foreground/30 backdrop-blur-sm z-40" onClick={() => setOpen(false)} />
      )}

      {/* ═══════════════════════════════════════════
          SIDEBAR — Mahindra Finance Branded
          ═══════════════════════════════════════════ */}
      <aside className={`fixed lg:sticky top-0 z-50 lg:z-30 h-screen w-[270px] shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>

        {/* Sidebar Header — Square Logo */}
        <div className="px-5 py-5 flex items-center justify-between border-b border-sidebar-border gap-3 brand-header-bg">
          <MahindraFinanceLogo />
          <button onClick={() => setOpen(false)} className="lg:hidden p-1.5 rounded-md hover:bg-secondary shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Brand accent divider */}
        <div className="brand-divider" />

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 py-4">
          <div className="px-3 pb-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70 font-medium">Workspace</div>
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

        {/* Sidebar Footer */}
        <div className="border-t border-sidebar-border p-3 space-y-1">
          {/* User Card with brand styling */}
          <div className="mt-3 soft-card rounded-xl p-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shadow-sm select-none shrink-0 border border-primary/5">
                MT
              </div>
              <div className="leading-tight">
                <div className="text-xs font-medium">Marketing Team</div>
                <div className="text-[10px] text-muted-foreground">Internal · Tier 1</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        {/* ═══════════════════════════════════════════
            TOPBAR — Horizontal Logo + Navigation
            ═══════════════════════════════════════════ */}
        <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/80 border-b border-border">
          <div className="flex items-center gap-4 px-4 lg:px-8 h-16">
            <button onClick={() => setOpen(true)} className="lg:hidden p-2 -ml-2 rounded-md hover:bg-secondary">
              <Menu className="h-5 w-5" />
            </button>

            {/* Mobile: Show logo when sidebar is hidden */}
            <div className="lg:hidden">
              <MahindraFinanceLogo variant="icon" />
            </div>

            {/* Desktop: Workspace indicator */}
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground ml-1">
              <span className="text-foreground font-semibold tracking-wide uppercase text-[11px]">Neuromarketing Capsule</span>
              <span className="ml-1.5 chip-teal chip">
                <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-glow" /> Live
              </span>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Link to="/audit" className="hidden sm:inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-mahindra-red-light text-xs font-medium transition shadow-sm shadow-primary/20">
                <Sparkles className="h-3.5 w-3.5" /> Run Creative Audit
              </Link>
              <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground font-semibold text-xs flex items-center justify-center shadow-sm select-none border border-primary/10 shrink-0">
                MT
              </div>
            </div>
          </div>
        </header>

        {/* ═══════════════════════════════════════════
            MAIN CONTENT
            ═══════════════════════════════════════════ */}
        <main className="flex-1 px-4 lg:px-8 py-6 lg:py-10">
          {children ?? <Outlet />}
        </main>

        {/* ═══════════════════════════════════════════
            FOOTER — Mahindra Finance Branding
            ═══════════════════════════════════════════ */}
        <footer className="px-4 lg:px-8 py-6 border-t border-border bg-card/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <MahindraBrandMark />
            <div className="flex flex-col items-center md:items-end gap-1 text-center md:text-right">
              <span>
                Created by{" "}
                <a
                  href="https://www.linkedin.com/in/guptarpita/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-bold transition-all"
                >
                  Arpita Gupta
                </a>
              </span>
              <span className="text-[10px] text-muted-foreground/60 select-none">© 2026 Mahindra & Mahindra Financial Services Ltd. · Internal Platform</span>
            </div>
          </div>
        </footer>
      </div>

      <NeuroCopilot />
    </div>
  );
}
