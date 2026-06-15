import React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/neuro/AppLayout";
import { ArrowLeft, Brain, Activity, Smile, Zap, Cpu, Search, X, ChevronRight, ChevronDown } from "lucide-react";
import { neuroscienceToolsList, EegStorytellingView } from "./tools";
import { FmriStorytellingView } from "./fmri-view";
import { GsrStorytellingView } from "./gsr-view";
import { EyeTrackingStorytellingView } from "./eye-tracking-view";
import { FnirsStorytellingView } from "./fnirs-view";
import { MegStorytellingView } from "./meg-view";
import { PetStorytellingView } from "./pet-view";
import { PupillometryStorytellingView } from "./pupillometry-view";
import { HrvStorytellingView } from "./hrv-view";

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

import { useState, useEffect } from "react";

export function ToolDetailPage() {
  const { toolId } = Route.useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    cns: true,
    ans: true,
    somatic: true,
    behavioral: true,
    ai: true,
  });

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

  // Auto-expand the active tool's category when it changes
  useEffect(() => {
    if (tool) {
      setExpandedCategories(prev => ({
        ...prev,
        [tool.group]: true
      }));
    }
  }, [tool.id]);

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

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const activeCategoryTools = neuroscienceToolsList.filter((t) => t.group === tool.group);

  return (
    <AppLayout>
      {/* 
        ═══════════════════════════════════════════
        1. FLOATING STRATEGIC TWO-TIER SYSTEM SELECTOR BAR
        ═══════════════════════════════════════════ 
      */}
      <div className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur-md border-b border-border/40 py-3 mb-6 select-none space-y-3">
        {/* Tier 1: Modality Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 scrollbar-none">
          <Link 
            to="/tools"
            className="inline-flex items-center gap-1 text-[10.5px] font-black uppercase text-stone-300 hover:text-white tracking-wider shrink-0 mr-4 cursor-pointer hover:scale-105 transition"
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
                      ? "bg-primary text-white shadow-sm"
                      : "bg-secondary/40 text-foreground/80 hover:bg-secondary border border-border/40"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{cat.label.split(" (")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tier 2: Modality Specific subpage triggers (Technique tabs horizontally aligned) */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 scrollbar-none border-t border-border/30 pt-2.5">
          {activeCategoryTools.map((t) => {
            const isActive = tool.id === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleToolShift(t.id)}
                className={`h-8 px-3 rounded-lg text-[10px] font-black tracking-wide capitalize shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? `${activeTheme.badge} shadow-inner scale-[1.02]`
                    : "bg-secondary/20 text-muted-foreground hover:text-foreground border border-border/30"
                }`}
              >
                {t.name.split(" (")[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* 
        ═══════════════════════════════════════════
        2. FULL-WIDTH IMMERSIVE RESEARCH PLATFORM VIEWPORT
        ═══════════════════════════════════════════
      */}
      <div className="w-full pb-12 animate-in fade-in duration-300">
        {tool.id === 'fmri' ? (
          <FmriStorytellingView tool={tool} activeTheme={activeTheme} />
        ) : tool.id === 'gsr' ? (
          <GsrStorytellingView tool={tool} activeTheme={activeTheme} />
        ) : tool.id === 'eye-tracking' ? (
          <EyeTrackingStorytellingView tool={tool} activeTheme={activeTheme} />
        ) : tool.id === 'fnirs' ? (
          <FnirsStorytellingView tool={tool} activeTheme={activeTheme} />
        ) : tool.id === 'meg' ? (
          <MegStorytellingView tool={tool} activeTheme={activeTheme} />
        ) : tool.id === 'pet' ? (
          <PetStorytellingView tool={tool} activeTheme={activeTheme} />
        ) : tool.id === 'pupillometry' ? (
          <PupillometryStorytellingView tool={tool} activeTheme={activeTheme} />
        ) : tool.id === 'hrv-ecg' ? (
          <HrvStorytellingView tool={tool} activeTheme={activeTheme} />
        ) : (
          <EegStorytellingView tool={tool} activeTheme={activeTheme} />
        )}
      </div>
    </AppLayout>
  );
}
