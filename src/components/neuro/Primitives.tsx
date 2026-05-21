import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, subtitle, icon: Icon, action }: {
  eyebrow?: string; title: string; subtitle?: string; icon?: LucideIcon; action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 fade-up">
      <div>
        {eyebrow && <div className="chip mb-3">{eyebrow}</div>}
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05]">
          <span className="text-gradient">{title}</span>
        </h1>
        {subtitle && <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
      {Icon && !action && (
        <div className="hidden md:grid h-14 w-14 rounded-2xl bg-primary/8 text-primary place-items-center">
          <Icon className="h-6 w-6" />
        </div>
      )}
    </div>
  );
}

export function Card({ children, className = "", hover = false }: { children: ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={`soft-card rounded-2xl ${hover ? "soft-hover" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function SectionTitle({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <div className="flex items-baseline justify-between mb-4 mt-2">
      <h2 className="font-display text-lg md:text-xl font-semibold tracking-tight">{children}</h2>
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </div>
  );
}
