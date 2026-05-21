import { Search, Bell, Command, ChevronDown, Sparkles, Menu } from "lucide-react";

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/70 border-b border-white/5">
      <div className="flex items-center gap-4 px-5 lg:px-8 h-16">
        <button className="lg:hidden p-2 -ml-2 rounded-md hover:bg-white/5">
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="hidden sm:inline">Workspace</span>
          <ChevronDown className="hidden sm:inline h-3 w-3" />
          <span className="text-foreground/90 font-medium">Neuromarketing Capsule</span>
          <span className="ml-2 hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider bg-teal/10 text-teal border border-teal/20">
            <span className="h-1.5 w-1.5 rounded-full bg-teal pulse-glow" /> Live
          </span>
        </div>

        <div className="flex-1 max-w-xl mx-auto hidden md:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search modules, audits, neuro-metrics…"
              className="w-full h-10 pl-10 pr-20 rounded-xl bg-white/[0.04] border border-white/10 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-teal/40 focus:bg-white/[0.06] transition"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="text-[10px] text-muted-foreground border border-white/10 rounded px-1.5 py-0.5 flex items-center gap-0.5"><Command className="h-2.5 w-2.5"/>K</kbd>
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button className="hidden sm:inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] text-xs transition">
            <Sparkles className="h-3.5 w-3.5 text-purple" /> Ask NeuroAI
          </button>
          <button className="relative h-9 w-9 grid place-items-center rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] transition">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-purple" />
          </button>
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple to-teal grid place-items-center text-[11px] font-semibold text-background">MF</div>
        </div>
      </div>
    </header>
  );
}
