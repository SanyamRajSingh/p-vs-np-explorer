import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Section, Container, SectionHeader, GlassCard, FADE_UP, Button } from "./ui";

function factorial(n) {
  if (n <= 12) {
    const vals = [1,1,2,6,24,120,720,5040,40320,362880,3628800,39916800,479001600];
    return vals[n];
  }
  return Infinity;
}

const CURVES = [
  { key: "O(1)", color: "#FFFFFF", opacity: 0.5, fn: () => 1 },
  { key: "O(log n)", color: "#34C759", fn: (n) => Math.log2(n) },
  { key: "O(n)", color: "#007AFF", fn: (n) => n },
  { key: "O(n²)", color: "#FF9500", fn: (n) => n * n },
  { key: "O(2ⁿ)", color: "#FF3B30", fn: (n) => Math.min(Math.pow(2, n), 1e8) },
  { key: "O(n!)", color: "#CC44FF", fn: (n) => Math.min(factorial(n), 1e8) },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-black/90 backdrop-blur-xl border border-white/15 p-3 rounded-xl text-xs font-mono">
      <p className="text-white/60 mb-2">n = {label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex justify-between gap-4" style={{ color: p.color }}>
          <span>{p.dataKey}:</span>
          <span>{Number(p.value).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default function AlgorithmPlayground() {
  const [n, setN] = useState(10);
  const [hiddenCurves, setHiddenCurves] = useState(new Set());

  const data = useMemo(() => {
    return Array.from({ length: n }, (_, i) => {
      const val = i + 1;
      const obj = { n: val };
      CURVES.forEach(({ key, fn }) => {
        obj[key] = parseFloat(fn(val).toFixed(2));
      });
      return obj;
    });
  }, [n]);

  const toggle = (key) => {
    setHiddenCurves((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const formatY = (v) => {
    if (v >= 1e6) return `${(v/1e6).toFixed(1)}M`;
    if (v >= 1e3) return `${(v/1e3).toFixed(1)}k`;
    return v;
  };

  return (
    <Section id="playground" className="bg-[#050505]">
      <Container>
        <SectionHeader
          chapter="Interactive 01 · Big O Visualization"
          title="Algorithm Playground"
          subtitle="Drag the slider and watch complexity explode. This is why P ≠ NP matters."
        />

        <GlassCard hover={false} delay={0.1} className="!p-6 md:!p-10">
          {/* Slider */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm text-white/60 font-mono">
                Input size <span className="text-white font-medium">n = {n}</span>
              </label>
              <div className="flex items-center gap-2 text-xs text-white/30 font-mono">
                <span>O(2ⁿ) at n={n}:</span>
                <span className="text-[#FF3B30]">{Math.min(Math.pow(2,n), 1e8).toLocaleString()} ops</span>
              </div>
            </div>
            <input
              type="range" min={2} max={18} value={n}
              onChange={(e) => setN(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: "#007AFF", background: `linear-gradient(to right, #007AFF 0%, #007AFF ${((n-2)/16)*100}%, rgba(255,255,255,0.1) ${((n-2)/16)*100}%, rgba(255,255,255,0.1) 100%)` }}
              data-testid="playground-slider"
            />
            <div className="flex justify-between text-xs text-white/20 mt-2 font-mono">
              <span>n=2</span><span>n=18</span>
            </div>
          </div>

          {/* Toggle curves */}
          <div className="flex flex-wrap gap-2 mb-6">
            {CURVES.map(({ key, color }) => (
              <button
                key={key}
                onClick={() => toggle(key)}
                className="px-3 py-1 rounded-full text-xs font-medium transition-all font-mono"
                style={{
                  background: hiddenCurves.has(key) ? "rgba(255,255,255,0.05)" : color + "25",
                  color: hiddenCurves.has(key) ? "rgba(255,255,255,0.3)" : color,
                  border: `1px solid ${hiddenCurves.has(key) ? "rgba(255,255,255,0.1)" : color + "60"}`,
                }}
                data-testid={`toggle-curve-${key.replace(/[^a-z0-9]/gi, "")}`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="w-full h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis
                  dataKey="n"
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fill: "rgba(255,255,255,0.4)" }}
                  label={{ value: "Input Size (n)", position: "insideBottom", offset: -2, fill: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.3)"
                  tickFormatter={formatY}
                  tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fill: "rgba(255,255,255,0.4)" }}
                  label={{ value: "Operations", angle: -90, position: "insideLeft", fill: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1, strokeDasharray: '5 5' }} />
                {CURVES.map(({ key, color, opacity }) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={color}
                    strokeWidth={2}
                    strokeOpacity={hiddenCurves.has(key) ? 0 : (opacity || 1)}
                    dot={false}
                    activeDot={hiddenCurves.has(key) ? false : { r: 4, fill: color }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Key insight boxes */}
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            <div className="p-4 rounded-xl bg-[#34C759]/10 border border-[#34C759]/20">
              <div className="text-xs text-white/40 mb-1 font-mono">P class (polynomial)</div>
              <div className="text-sm text-white/80 font-body">O(1), O(log n), O(n), O(n²) — stay manageable</div>
            </div>
            <div className="p-4 rounded-xl bg-[#007AFF]/10 border border-[#007AFF]/20">
              <div className="text-xs text-white/40 mb-1 font-mono">NP verify</div>
              <div className="text-sm text-white/80 font-body">Checking a solution is always polynomial — fast</div>
            </div>
            <div className="p-4 rounded-xl bg-[#FF3B30]/10 border border-[#FF3B30]/20">
              <div className="text-xs text-white/40 mb-1 font-mono">Exponential nightmare</div>
              <div className="text-sm text-white/80 font-body">O(2ⁿ) and O(n!) explode almost instantly</div>
            </div>
          </div>
        </GlassCard>
      </Container>
    </Section>
  );
}
