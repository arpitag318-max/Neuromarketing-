import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis,
  BarChart, Bar, CartesianGrid
} from "recharts";

const trustData = Array.from({ length: 24 }, (_, i) => ({
  t: `${i}:00`,
  trust: 55 + Math.sin(i / 2) * 14 + (i > 12 ? 6 : 0) + Math.random() * 3,
  cognitive: 70 - Math.cos(i / 3) * 10 + Math.random() * 3,
}));

const radarData = [
  { metric: "Trust", value: 78 },
  { metric: "Attention", value: 64 },
  { metric: "Emotion", value: 72 },
  { metric: "Memory", value: 58 },
  { metric: "Clarity", value: 81 },
  { metric: "Comfort", value: 69 },
];

const funnelData = [
  { stage: "Awareness", v: 100 },
  { stage: "Interest", v: 78 },
  { stage: "Consideration", v: 54 },
  { stage: "Trust", v: 41 },
  { stage: "Conversion", v: 29 },
  { stage: "Loyalty", v: 22 },
];

/* ── Mahindra Finance Brand Colors ── */
const BRAND = {
  red: "oklch(0.40 0.14 22)",       // #8B1E1E
  redLight: "oklch(0.50 0.17 24)",  // #C62828
  teal: "oklch(0.67 0.065 195)",    // #6CA6A6
  navy: "oklch(0.28 0.05 245)",     // #243447
  navyMuted: "oklch(0.52 0.02 245)",
  grid: "oklch(0.24 0.03 245 / 0.06)",
  border: "oklch(0.24 0.03 245 / 0.1)",
} as const;

export function TrustAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={trustData} margin={{ left: -20, right: 8, top: 10, bottom: 0 }}>
        <defs>
          <linearGradient id="gTrust" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BRAND.red} stopOpacity={0.4} />
            <stop offset="100%" stopColor={BRAND.red} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gCog" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BRAND.teal} stopOpacity={0.35} />
            <stop offset="100%" stopColor={BRAND.teal} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={BRAND.grid} vertical={false} />
        <XAxis dataKey="t" tick={{ fill: BRAND.navyMuted, fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
        <YAxis tick={{ fill: BRAND.navyMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: "white", border: `1px solid ${BRAND.border}`, borderRadius: 10, fontSize: 12 }}
        />
        <Area type="monotone" dataKey="trust" stroke={BRAND.red} strokeWidth={2} fill="url(#gTrust)" />
        <Area type="monotone" dataKey="cognitive" stroke={BRAND.teal} strokeWidth={2} fill="url(#gCog)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function NeuroRadar() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <RadarChart data={radarData}>
        <PolarGrid stroke={BRAND.border} />
        <PolarAngleAxis dataKey="metric" tick={{ fill: BRAND.navy, fontSize: 11 }} />
        <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
        <Radar dataKey="value" stroke={BRAND.red} fill={BRAND.red} fillOpacity={0.25} strokeWidth={2} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function FunnelBars() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={funnelData} layout="vertical" margin={{ left: 8, right: 8, top: 4, bottom: 4 }}>
        <defs>
          <linearGradient id="gBar" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={BRAND.red} />
            <stop offset="100%" stopColor={BRAND.teal} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={BRAND.grid} horizontal={false} />
        <XAxis type="number" hide />
        <YAxis dataKey="stage" type="category" tick={{ fill: BRAND.navy, fontSize: 11 }} axisLine={false} tickLine={false} width={92} />
        <Tooltip cursor={{ fill: "oklch(0.24 0.03 245 / 0.04)" }} contentStyle={{ background: "white", border: `1px solid ${BRAND.border}`, borderRadius: 10, fontSize: 12 }} />
        <Bar dataKey="v" fill="url(#gBar)" radius={[4, 4, 4, 4]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function Sparkline({ color = "oklch(0.40 0.14 22)" }: { color?: string }) {
  const data = Array.from({ length: 20 }, (_, i) => ({ i, v: 40 + Math.sin(i / 2) * 18 + Math.random() * 10 }));
  return (
    <ResponsiveContainer width="100%" height={48}>
      <AreaChart data={data} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
        <defs>
          <linearGradient id={`sp-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.55} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.6} fill={`url(#sp-${color})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
