import { type SVGProps } from "react";

/**
 * Official Mahindra wordmark in vector format.
 * Coordinates are sourced from the brand assets.
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
 * A beautiful, premium geometric representation of the Mahindra brand icon.
 * Features a modern red badge with clean stylized brand elements.
 */
export function MahindraIcon({ className = "h-6 w-6", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Three elegant, energetic parallel slashes (representing the Rise philosophy & 'Road Ahead') */}
      <g fill="currentColor">
        {/* Left Slash */}
        <path d="M 22,82 C 22,82 23,26 27,18 C 29,14 34,14 34,14 L 38,14 C 38,14 34,22 32,32 L 27,82 Z" />
        {/* Middle Slash */}
        <path d="M 44,82 C 44,82 46,36 51,26 C 53,22 57,20 57,20 L 61,20 C 61,20 57,28 55,38 L 49,82 Z" />
        {/* Right Slash */}
        <path d="M 66,82 C 66,82 69,46 75,34 C 77,30 81,26 81,26 L 85,26 C 85,26 81,32 78,44 L 71,82 Z" />
      </g>
    </svg>
  );
}

/**
 * Full combined logo for Mahindra Finance.
 * Beautifully styled to fit modern, premium UI layout.
 */
export function MahindraFinanceLogo({
  variant = "full",
  className = "",
}: {
  variant?: "full" | "icon" | "horizontal";
  className?: string;
}) {
  if (variant === "icon") {
    return (
      <div className={`relative flex items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20 border border-primary/20 h-10 w-10 shrink-0 ${className}`}>
        <MahindraIcon className="h-6.5 w-6.5" />
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-accent pulse-glow ring-2 ring-sidebar" />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20 border border-primary/20 h-10 w-10 shrink-0">
        <MahindraIcon className="h-6.5 w-6.5" />
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-accent pulse-glow ring-2 ring-sidebar" />
      </div>
      <div className="flex flex-col leading-tight select-none">
        <div className="flex items-center gap-1.5">
          <MahindraWordmark className="h-[11px] text-primary" />
        </div>
        <div className="font-display text-[13.5px] font-bold tracking-tight text-foreground/90 uppercase mt-0.5">
          Finance
        </div>
      </div>
    </div>
  );
}
