import React, { type SVGProps } from "react";

/**
 * ═══════════════════════════════════════════════════════════════
 * MAHINDRA FINANCE — Official Brand Logo Components
 * ═══════════════════════════════════════════════════════════════
 *
 * Uses the official Mahindra Finance logos:
 *   - Horizontal wordmark: /logos/mahindra-finance-horizontal.png
 *   - Square icon badge:   /logos/mahindra-finance-square.png
 *
 * Fallback: inline SVG vectors for when images are unavailable.
 */

/* ── Paths to official logo assets in /public ── */
/* PNG (user-uploaded) takes priority; SVG fallback always available */
const LOGO_HORIZONTAL_PNG = "/logos/mahindra-finance-horizontal.png";
const LOGO_HORIZONTAL_SVG = "/logos/mahindra-finance-horizontal.svg";
const LOGO_SQUARE_PNG = "/logos/mahindra-finance-square.png";
const LOGO_SQUARE_SVG = "/logos/mahindra-finance-square.svg";

/** Try PNG first, fallback to SVG on error */
function logoSrc(png: string, svg: string) { return png; }
function handleLogoError(e: React.SyntheticEvent<HTMLImageElement>, svg: string) {
  const img = e.currentTarget;
  if (!img.src.endsWith('.svg')) img.src = svg;
}

/**
 * Official Mahindra wordmark — inline SVG fallback.
 * Used when the PNG asset hasn't loaded yet or as a companion element.
 */
export function MahindraWordmark({ className = "h-4", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
      {...props}
    >
      <title>Mahindra</title>
      <path d="M5.145 11.311H6.78a.67.67 0 0 1 .674.66v1.509H5.009a.408.408 0 0 1-.41-.404v-.524a.38.38 0 0 1 .383-.375h1.354l-.144.306h-.998c-.043 0-.092.034-.092.081v.412c0 .047.049.082.092.082h1.73v-.99c0-.191-.169-.338-.357-.338H4.945l.2-.419zm13.427-.787v2.959h-2.383a.408.408 0 0 1-.41-.403v-1.11a.67.67 0 0 1 .675-.659h1.357l-.2.422h-.948c-.188 0-.357.147-.357.337v.91c0 .046.049.08.092.08h1.644v-2.536h.53zM10.2 13.483h.527v-1.51a.67.67 0 0 0-.674-.659H8.932l-.2.422h1.111c.188 0 .357.147.357.337v1.41zm-2.195-2.96v2.96h.527v-2.96h-.527zm-4.4 2.96h.527v-1.51a.67.67 0 0 0-.674-.659H0v2.169h.526v-1.669c0-.047.05-.081.093-.081h1.09c.043 0 .092.034.092.081v1.669h.527v-1.669c0-.047.049-.081.092-.081h.828c.188 0 .357.147.357.337v1.413zm17.72-2.172H20a.67.67 0 0 0-.674.66v1.509h.527v-1.41c0-.19.169-.337.357-.337h.914l.2-.422zm-6.753 0a.67.67 0 0 1 .675.66v1.509h-.527v-1.41c0-.19-.17-.337-.357-.337h-1.268v1.75h-.527v-2.169c.665 0 1.333-.003 2.004-.003zm-3.19.137.527-.306v2.338h-.526v-2.032zm.53-.609v-.322h-.526v.625l.526-.303zm9.782.472h1.632a.67.67 0 0 1 .674.66v1.509h-2.445a.408.408 0 0 1-.41-.404v-.524a.38.38 0 0 1 .383-.375h1.354l-.144.306h-.998c-.043 0-.092.034-.092.081v.412c0 .047.049.082.092.082h1.73v-.99c0-.191-.169-.338-.357-.338h-1.622l.203-.419z" />
    </svg>
  );
}

/**
 * Inline SVG icon representing the Mahindra "M" badge.
 * Used as a fallback and in small-space contexts.
 */
export function MahindraIcon({ className = "h-6 w-6", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Stylized "M" icon matching the official Mahindra brand mark */}
      <g fill="currentColor">
        {/* Left arch */}
        <path d="M 20,70 L 20,42 C 20,32 28,22 38,22 L 42,22 L 42,42 C 42,42 42,50 34,50 L 20,50" />
        {/* Right arch */}
        <path d="M 58,70 L 58,42 C 58,32 66,22 76,22 L 80,22 L 80,42 C 80,42 80,50 72,50 L 58,50" />
        {/* Center connector */}
        <path d="M 42,42 L 42,22 C 42,22 50,22 58,22 L 58,42" />
      </g>
    </svg>
  );
}

/**
 * ═══════════════════════════════════════════════
 *  MAIN LOGO COMPONENT
 * ═══════════════════════════════════════════════
 *
 * Variants:
 *   - "full"       → Square icon logo + text label (sidebar expanded)
 *   - "icon"       → Square logo only (sidebar collapsed, favicons, loading)
 *   - "horizontal" → Horizontal wordmark logo (topbar, reports, exports)
 */
export function MahindraFinanceLogo({
  variant = "full",
  className = "",
}: {
  variant?: "full" | "icon" | "horizontal";
  className?: string;
}) {
  /* ── ICON VARIANT ── */
  if (variant === "icon") {
    return (
      <div className={`relative shrink-0 ${className}`}>
        <img
          src={logoSrc(LOGO_SQUARE_PNG, LOGO_SQUARE_SVG)}
          onError={(e) => handleLogoError(e, LOGO_SQUARE_SVG)}
          alt="Mahindra Finance"
          className="h-11 w-11 rounded-xl object-contain shadow-md shadow-primary/15"
          draggable={false}
          loading="eager"
        />
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-accent pulse-glow ring-2 ring-sidebar" />
      </div>
    );
  }

  /* ── HORIZONTAL VARIANT ── */
  if (variant === "horizontal") {
    return (
      <div className={`logo-container flex items-center justify-start ${className}`}>
        <img
          src={logoSrc(LOGO_HORIZONTAL_PNG, LOGO_HORIZONTAL_SVG)}
          onError={(e) => handleLogoError(e, LOGO_HORIZONTAL_SVG)}
          alt="Mahindra Finance"
          className="h-9 w-auto object-contain"
          draggable={false}
          loading="eager"
        />
      </div>
    );
  }

  /* ── FULL VARIANT (default - sidebar header) ── */
  return (
    <div className={`logo-container flex items-center justify-start ${className}`}>
      <img
        src={logoSrc(LOGO_HORIZONTAL_PNG, LOGO_HORIZONTAL_SVG)}
        onError={(e) => handleLogoError(e, LOGO_HORIZONTAL_SVG)}
        alt="Mahindra Finance"
        className="h-10 w-auto object-contain max-w-[210px]"
        draggable={false}
        loading="eager"
      />
    </div>
  );
}

/**
 * Compact brand watermark for footers, reports, and micro-branding placements.
 */
export function MahindraBrandMark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <img
        src={logoSrc(LOGO_HORIZONTAL_PNG, LOGO_HORIZONTAL_SVG)}
        onError={(e) => handleLogoError(e, LOGO_HORIZONTAL_SVG)}
        alt="Mahindra Finance"
        className="h-7 w-auto object-contain"
        draggable={false}
        loading="eager"
      />
      <div className="h-4 w-px bg-border/80" />
      <span className="text-[10px] text-muted-foreground/80 font-medium">Behavioral Intelligence Platform</span>
    </div>
  );
}

/**
 * Horizontal logo for topbar/header usage with proper spacing.
 */
export function MahindraTopbarLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoSrc(LOGO_HORIZONTAL_PNG, LOGO_HORIZONTAL_SVG)}
        onError={(e) => handleLogoError(e, LOGO_HORIZONTAL_SVG)}
        alt="Mahindra Finance"
        className="h-9 w-auto object-contain"
        draggable={false}
        loading="eager"
      />
    </div>
  );
}

