import {
  LayoutDashboard, Brain, Microscope, Workflow, ClipboardCheck,
  BookMarked, Network, Radio, Eye, Settings, HelpCircle, Search
} from "lucide-react";
import { useState } from "react";

const items = [
  { icon: LayoutDashboard, label: "Overview", href: "#overview" },
  { icon: Brain, label: "Consumer Psychology", href: "#psychology" },
  { icon: Microscope, label: "Neuromarketing Tools", href: "#tools" },
  { icon: Workflow, label: "Communication Funnel", href: "#modules" },
  { icon: ClipboardCheck, label: "Campaign Audit", href: "#audit" },
  { icon: BookMarked, label: "Case Study Vault", href: "#modules" },
  { icon: Network, label: "Neuro-Phygital", href: "#phygital" },
  { icon: Radio, label: "SST Intelligence", href: "#tools" },
  { icon: Eye, label: "Eye Tracking Hub", href: "#tools" },
];

export function Sidebar() {
  const [active, setActive] = useState("Overview");
  return (
    <aside className="hidden lg:flex flex-col w-[260px] shrink-0 h-screen sticky top-0 border-r border-white/5 bg-sidebar/80 backdrop-blur-xl">
      <div className="px-5 py-5 flex items-center gap-2.5 border-b border-white/5">
        <div className="relative h-9 w-9 rounded-xl bg-primary grid place-items-center shadow-[0_0_20px_-2px] shadow-primary/50">
          <span className="font-display text-[15px] font-bold text-primary-foreground tracking-tight">M</span>
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-accent pulse-glow ring-2 ring-sidebar" />
        </div>
        <div className="leading-tight">
          <div className="font-display text-[15px] font-semibold tracking-tight">Mahindra Finance</div>
          <div className="text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">NeuroCapsule · Internal</div>
        </div>
      </div>

      <div className="px-3 pt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            placeholder="Search insights, modules…"
            className="w-full h-9 pl-9 pr-12 rounded-lg bg-white/[0.04] border border-white/5 text-xs placeholder:text-muted-foreground/70 focus:outline-none focus:border-teal/40 focus:bg-white/[0.06] transition"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground border border-white/10 rounded px-1.5 py-0.5">⌘K</kbd>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 py-4">
        <div className="px-3 pb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">Workspace</div>
        <ul className="space-y-0.5">
          {items.map((it) => {
            const Icon = it.icon;
            const isActive = active === it.label;
            return (
              <li key={it.label}>
                <a
                  href={it.href}
                  onClick={() => setActive(it.label)}
                  className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition relative ${
                    isActive
                      ? "bg-white/[0.06] text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
                  }`}
                >
                  {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2px] rounded-r bg-teal shadow-[0_0_10px] shadow-teal/60" />}
                  <Icon className={`h-4 w-4 ${isActive ? "text-teal" : "group-hover:text-teal/80"} transition`} />
                  <span className="truncate">{it.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/5 p-3">
      </div>
    </aside>
  );
}
