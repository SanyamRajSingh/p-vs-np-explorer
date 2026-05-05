import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, Container, SectionHeader, GlassCard, FADE_UP } from "./ui";

const REGIONS = {
  NPH: {
    label: "NP-Hard",
    color: "#FF3B30",
    title: "NP-Hard",
    tagline: "Beyond the NP universe",
    items: [
      "At least as hard as any NP-Complete problem",
      "May not be verifiable in polynomial time",
      "Includes NP-Complete and harder problems",
      "Examples: Halting Problem, Chess (infinite board)",
    ],
  },
  NP: {
    label: "NP",
    color: "#007AFF",
    title: "NP",
    tagline: "Fast to verify",
    items: [
      "Solutions can be verified in polynomial time",
      "P is a subset of NP",
      "Unknown if NP = P",
      "Examples: Sudoku, Graph 3-coloring",
    ],
  },
  NPC: {
    label: "NP-Complete",
    color: "#FF9500",
    title: "NP-Complete",
    tagline: "The hardest problems in NP",
    items: [
      "In both NP and NP-Hard",
      "Every NP problem reduces to any NP-Complete problem",
      "Solving one fast means solving ALL NP fast",
      "Examples: TSP, 3-SAT, Knapsack",
    ],
  },
  P: {
    label: "P",
    color: "#34C759",
    title: "P",
    tagline: "Fast to solve AND verify",
    items: [
      "Solvable in polynomial time",
      "Subset of NP",
      "Best case scenario for any problem",
      "Examples: Sorting, Shortest path, Primality test",
    ],
  },
};

export default function VennDiagram() {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const active = selected || hovered;
  const region = active ? REGIONS[active] : null;

  const onEnter = (id) => setHovered(id);
  const onLeave = () => setHovered(null);
  const onClick = (id) => setSelected(selected === id ? null : id);

  const opacity = (id) => (active && active !== id ? 0.25 : 1);
  const strokeW = (id) => (active === id ? 3 : 1.5);

  return (
    <Section id="venn" className="bg-black">
      <Container>
        <SectionHeader
          chapter="Chapter 04 · The Map"
          title="Interactive Venn Diagram"
          subtitle="Hover or click any region to explore"
        />

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* SVG Diagram */}
          <motion.div
            {...FADE_UP}
            className="w-full lg:w-[60%]"
          >
            <svg viewBox="0 0 820 440" className="w-full" style={{ maxHeight: 440 }}>
              {/* NP-Hard background region */}
              <ellipse
                cx="520" cy="220" rx="285" ry="205"
                fill="#FF3B30" fillOpacity={active && active !== "NPH" ? 0.04 : 0.1}
                stroke="#FF3B30" strokeOpacity={opacity("NPH") * 0.5} strokeWidth={strokeW("NPH")}
                className="venn-region"
                onMouseEnter={() => onEnter("NPH")}
                onMouseLeave={onLeave}
                onClick={() => onClick("NPH")}
                style={{ transition: "all 0.3s ease", cursor: "pointer" }}
              />
              <text x="700" y="80" fill="#FF3B30" fillOpacity={opacity("NPH")} fontSize="13" fontFamily="JetBrains Mono, monospace" textAnchor="middle">NP-Hard</text>
              <text x="700" y="97" fill="#FF3B30" fillOpacity={opacity("NPH") * 0.6} fontSize="10" fontFamily="JetBrains Mono, monospace" textAnchor="middle">(extends beyond NP)</text>

              {/* NP circle */}
              <circle
                cx="300" cy="220" r="185"
                fill="#007AFF" fillOpacity={active && active !== "NP" ? 0.04 : 0.1}
                stroke="#007AFF" strokeOpacity={opacity("NP") * 0.5} strokeWidth={strokeW("NP")}
                className="venn-region"
                onMouseEnter={() => onEnter("NP")}
                onMouseLeave={onLeave}
                onClick={() => onClick("NP")}
                style={{ transition: "all 0.3s ease", cursor: "pointer" }}
              />
              <text x="300" y="380" fill="#007AFF" fillOpacity={opacity("NP")} fontSize="14" fontFamily="JetBrains Mono, monospace" textAnchor="middle" fontWeight="600">NP</text>

              {/* NP-Complete circle (inside NP AND NP-Hard) */}
              <circle
                cx="405" cy="220" r="72"
                fill="#FF9500" fillOpacity={active && active !== "NPC" ? 0.06 : 0.2}
                stroke="#FF9500" strokeOpacity={opacity("NPC") * 0.7} strokeWidth={strokeW("NPC")}
                className="venn-region"
                onMouseEnter={() => onEnter("NPC")}
                onMouseLeave={onLeave}
                onClick={() => onClick("NPC")}
                style={{ transition: "all 0.3s ease", cursor: "pointer" }}
              />
              <text x="405" y="216" fill="#FF9500" fillOpacity={opacity("NPC")} fontSize="11" fontFamily="JetBrains Mono, monospace" textAnchor="middle" fontWeight="600">NP-</text>
              <text x="405" y="231" fill="#FF9500" fillOpacity={opacity("NPC")} fontSize="11" fontFamily="JetBrains Mono, monospace" textAnchor="middle" fontWeight="600">Complete</text>

              {/* P circle (inside NP) */}
              <circle
                cx="175" cy="220" r="62"
                fill="#34C759" fillOpacity={active && active !== "P" ? 0.06 : 0.25}
                stroke="#34C759" strokeOpacity={opacity("P") * 0.8} strokeWidth={strokeW("P")}
                className="venn-region"
                onMouseEnter={() => onEnter("P")}
                onMouseLeave={onLeave}
                onClick={() => onClick("P")}
                style={{ transition: "all 0.3s ease", cursor: "pointer" }}
              />
              <text x="175" y="225" fill="#34C759" fillOpacity={opacity("P")} fontSize="18" fontFamily="JetBrains Mono, monospace" textAnchor="middle" fontWeight="700">P</text>

              {/* P ⊆ NP arrow label */}
              <text x="250" y="200" fill="rgba(255,255,255,0.25)" fontSize="10" fontFamily="JetBrains Mono, monospace">P ⊆ NP</text>
              
              {/* Key insight label */}
              <text x="140" y="380" fill="rgba(52,199,89,0.6)" fontSize="10" fontFamily="JetBrains Mono, monospace" textAnchor="middle">Every P is also NP</text>
              <text x="405" y="310" fill="rgba(255,149,0,0.6)" fontSize="10" fontFamily="JetBrains Mono, monospace" textAnchor="middle">NP-C = NP ∩ NP-Hard</text>

              {/* NP-Hard-only label (right side) */}
              <text x="710" y="220" fill="#FF3B30" fillOpacity={opacity("NPH") * 0.7} fontSize="11" fontFamily="JetBrains Mono, monospace" textAnchor="middle">NP-Hard only</text>
              <text x="710" y="238" fill="#FF3B30" fillOpacity={opacity("NPH") * 0.5} fontSize="10" fontFamily="JetBrains Mono, monospace" textAnchor="middle">(not in NP)</text>
            </svg>
          </motion.div>

          {/* Tooltip panel */}
          <div className="w-full lg:w-[40%]">
            <AnimatePresence mode="wait">
              {region ? (
                <GlassCard
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ border: `1px solid ${region.color}40` }}
                  className="!p-8"
                  hover={false}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full" style={{ background: region.color }} />
                    <span className="text-2xl font-bold font-heading" style={{ color: region.color }}>{region.title}</span>
                  </div>
                  <p className="text-white/60 text-sm mb-5 italic font-body">{region.tagline}</p>
                  <ul className="space-y-3">
                    {region.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white/70 font-body">
                        <span style={{ color: region.color }} className="mt-0.5 shrink-0">›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              ) : (
                <GlassCard
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center !p-8"
                  hover={false}
                >
                  <div className="text-4xl mb-4">☝</div>
                  <p className="text-white/40 text-sm font-body">Click any region to learn more about that complexity class</p>
                  <div className="mt-6 flex flex-col gap-2">
                    {Object.entries(REGIONS).map(([id, r]) => (
                      <button
                        key={id}
                        onClick={() => setSelected(id)}
                        className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-all hover:bg-white/5 font-mono"
                        data-testid={`venn-btn-${id.toLowerCase()}`}
                      >
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: r.color }} />
                        <span style={{ color: r.color }}>{r.title}</span>
                        <span className="text-white/30 text-xs ml-auto">{r.tagline}</span>
                      </button>
                    ))}
                  </div>
                </GlassCard>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}
