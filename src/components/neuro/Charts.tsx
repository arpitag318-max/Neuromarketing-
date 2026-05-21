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

export function TrustAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={trustData} margin={{ left: -20, right: 8, top: 10, bottom: 0 }}>
        <defs>
          <linearGradient id="gTrust" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.14 195)" stopOpacity={0.5} />
            <stop offset="100%" stopColor="oklch(0.78 0.14 195)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gCog" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.7 0.18 305)" stopOpacity={0.4} />
            <stop offset="100%" stopColor="oklch(0.7 0.18 305)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
        <XAxis dataKey="t" tick={{ fill: "oklch(0.68 0.025 260)", fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
        <YAxis tick={{ fill: "oklch(0.68 0.025 260)", fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: "oklch(0.19 0.035 260)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, fontSize: 12 }}
          labelStyle={{ color: "oklch(0.85 0.015 250)" }}
        />
        <Area type="monotone" dataKey="trust" stroke="oklch(0.78 0.14 195)" strokeWidth={2} fill="url(#gTrust)" />
        <Area type="monotone" dataKey="cognitive" stroke="oklch(0.7 0.18 305)" strokeWidth={2} fill="url(#gCog)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function NeuroRadar() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <RadarChart data={radarData}>
        <PolarGrid stroke="oklch(1 0 0 / 0.1)" />
        <PolarAngleAxis dataKey="metric" tick={{ fill: "oklch(0.78 0.025 250)", fontSize: 11 }} />
        <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
        <Radar dataKey="value" stroke="oklch(0.78 0.14 195)" fill="oklch(0.78 0.14 195)" fillOpacity={0.25} strokeWidth={2} />
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
            <stop offset="0%" stopColor="oklch(0.78 0.14 195)" />
            <stop offset="100%" stopColor="oklch(0.7 0.18 305)" />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="oklch(1 0 0 / 0.05)" horizontal={false} />
        <XAxis type="number" hide />
        <YAxis dataKey="stage" type="category" tick={{ fill: "oklch(0.78 0.025 250)", fontSize: 11 }} axisLine={false} tickLine={false} width={92} />
        <Tooltip cursor={{ fill: "oklch(1 0 0 / 0.04)" }} contentStyle={{ background: "oklch(0.19 0.035 260)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, fontSize: 12 }} />
        <Bar dataKey="v" fill="url(#gBar)" radius={[4, 4, 4, 4]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function Sparkline({ color = "oklch(0.78 0.14 195)" }: { color?: string }) {
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
