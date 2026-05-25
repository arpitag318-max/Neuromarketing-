import React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/neuro/AppLayout";
import { ArrowLeft, Brain, Activity, Smile, Zap, Cpu, Search, X, ChevronRight } from "lucide-react";
import { neuroscienceToolsList, EegStorytellingView } from "./tools";

export const Route = createFileRoute("/tools/$toolId")({
  component: ToolDetailPage,
});

// ═══════════════════════════════════════════
// DYNAMIC IMMERSIVE CUSTOM VISUAL STYLES
// ═══════════════════════════════════════════
const themeConfig: Record<string, {
  bg: string;
  accent: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
  badge: string;
}> = {
  cns: {
    bg: "from-purple-950/20 via-card to-card",
    accent: "purple",
    textColor: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    glowColor: "shadow-purple-500/20",
    badge: "bg-purple-600 border border-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.3)]",
  },
  ans: {
    bg: "from-cyan-950/20 via-card to-card",
    accent: "cyan",
    textColor: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    glowColor: "shadow-cyan-500/20",
    badge: "bg-cyan-600 border border-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]",
  },
  somatic: {
    bg: "from-rose-950/20 via-card to-card",
    accent: "pink",
    textColor: "text-rose-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    glowColor: "shadow-rose-500/20",
    badge: "bg-rose-600 border border-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.3)]",
  },
  behavioral: {
    bg: "from-emerald-950/20 via-card to-card",
    accent: "green",
    textColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    glowColor: "shadow-emerald-500/20",
    badge: "bg-emerald-600 border border-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.3)]",
  },
  ai: {
    bg: "from-blue-950/20 via-card to-card",
    accent: "blue",
    textColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    glowColor: "shadow-blue-500/20",
    badge: "bg-blue-600 border border-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]",
  },
};

// Map of category icons
const categoryIcons: Record<string, React.ComponentType<any>> = {
  cns: Brain,
  ans: Activity,
  somatic: Smile,
  behavioral: Zap,
  ai: Cpu,
};

import { useState } from "react";

export function ToolDetailPage() {
  const { toolId } = Route.useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Categories list
  const categoriesList = [
    { id: "cns", label: "Central Nervous System (CNS) Tools" },
    { id: "ans", label: "Autonomic Nervous System (ANS) Biometrics" },
    { id: "somatic", label: "Somatic & Muscular Response Tools" },
    { id: "behavioral", label: "Behavioral & Implicit Cognitive Tools" },
    { id: "ai", label: "AI & Computational Neuroscience Tools" }
  ];

  // Match the active tool
  const tool = neuroscienceToolsList.find((t) => t.id === toolId) || neuroscienceToolsList[0];
  const activeTheme = themeConfig[tool.group] || themeConfig.ans;

  // Filter tools based on search
  const filteredTools = neuroscienceToolsList.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.oneLinePurpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group filtered tools by category
  const groupedFilteredTools = categoriesList.map(cat => ({
    ...cat,
    tools: filteredTools.filter(t => t.group === cat.id)
  })).filter(group => group.tools.length > 0);

  const handleCategoryShift = (catId: string) => {
    const matchingTools = neuroscienceToolsList.filter((t) => t.group === catId);
    if (matchingTools.length > 0) {
      navigate({ to: "/tools/$toolId", params: { toolId: matchingTools[0].id } });
    }
  };

  const handleToolShift = (tId: string) => {
    navigate({ to: "/tools/$toolId", params: { toolId: tId } });
  };

  return (
    <AppLayout>
      {/* 
        ═══════════════════════════════════════════
        1. FLOATING STRATEGIC TWO-TIER SYSTEM SELECTOR BAR
        ═══════════════════════════════════════════ 
      */}
      <div className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/40 py-3.5 mb-6 select-none space-y-4">
        {/* Tier 1: Modality Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 scrollbar-none">
          <Link 
            to="/tools"
            className="inline-flex items-center gap-1 text-[10.5px] font-black uppercase text-muted-foreground hover:text-foreground tracking-wider shrink-0 mr-4 cursor-pointer hover:scale-105 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Hub
          </Link>
          <div className="flex items-center gap-2">
            {categoriesList.map((cat) => {
              const Icon = categoryIcons[cat.id] || Brain;
              const isActive = tool.group === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryShift(cat.id)}
                  className={`h-9 px-4 rounded-xl text-[10.5px] font-black uppercase tracking-wider shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-sm scale-105"
                      : "bg-secondary/40 text-foreground/80 hover:bg-secondary border border-border/40 hover:scale-[1.02]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{cat.label.split(" (")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 
        ═══════════════════════════════════════════
        2. DUAL COLUMN PREMIUM SCIENTIFIC DIRECTORY & SIMULATOR
        ═══════════════════════════════════════════
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative pb-12">
        {/* LEFT COLUMN: Premium Techniques directory (Sticky) */}
        <aside className="lg:col-span-3 w-full sticky top-[72px] z-30 bg-card border border-border/80 rounded-2xl p-4.5 space-y-4 shadow-sm backdrop-blur-sm self-start max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-thin select-none">
          <div className="space-y-1.5">
            <span className="text-[8px] font-black uppercase tracking-widest text-primary">Biometric Modality Index</span>
            <h3 className="font-display text-xs font-black uppercase text-foreground leading-none">Research Techniques</h3>
          </div>
          
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search 26 techniques..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-8 rounded-xl bg-secondary/50 border border-border/60 text-xs placeholder:text-muted-foreground/75 focus:outline-none focus:border-primary/50 focus:bg-card transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-0.5 rounded cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <hr className="border-border/40" />

          {/* Grouped Modalities Directory */}
          <div className="space-y-4 max-h-[calc(100vh-270px)] overflow-y-auto pr-1">
            {groupedFilteredTools.map((group) => (
              <div key={group.id} className="space-y-1.5">
                <h4 className="text-[8.5px] uppercase font-black tracking-widest text-muted-foreground/90 px-2 py-1 bg-secondary/40 rounded-md border border-border/20 leading-none">
                  {group.label.split(" (")[0]}
                </h4>
                <div className="space-y-0.5">
                  {group.tools.map((t) => {
                    const isActive = tool.id === t.id;
                    const toolTheme = themeConfig[t.group] || themeConfig.ans;
                    return (
                      <button
                        key={t.id}
                        onClick={() => handleToolShift(t.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                          isActive
                            ? "bg-primary/5 border border-primary/20 shadow-sm font-bold scale-[1.01]"
                            : "border border-transparent hover:bg-secondary/40 text-stone-600 dark:text-stone-300"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {/* LED indicator light with active pulse glow */}
                          <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                            isActive 
                              ? "bg-primary shadow-[0_0_8px_rgba(139,30,30,0.8)] animate-pulse" 
                              : "bg-muted-foreground/30"
                          }`} />
                          <span className={`truncate ${isActive ? "text-primary font-black" : "text-foreground/80 hover:text-foreground"}`}>
                            {t.name.split(" (")[0]}
                          </span>
                        </div>
                        {isActive && <ChevronRight className="h-3.5 w-3.5 text-primary shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {groupedFilteredTools.length === 0 && (
              <div className="text-center py-8 text-xs text-muted-foreground font-semibold">
                No techniques match "{searchQuery}"
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT COLUMN: Interactive Simulator Viewport */}
        <div className="lg:col-span-9 min-w-0 w-full animate-in fade-in duration-300">
          <EegStorytellingView tool={tool} activeTheme={activeTheme} />
        </div>
      </div>
    </AppLayout>
  );
}
