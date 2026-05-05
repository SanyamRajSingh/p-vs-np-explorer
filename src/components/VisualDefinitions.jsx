import React from "react";
import { Section, Container, SectionHeader, GlassCard } from "./ui";

const CLASSES = [
  {
    id: "p-class",
    label: "P",
    full: "Polynomial Time",
    color: "#34C759",
    bg: "rgba(52,199,89,0.08)",
    border: "rgba(52,199,89,0.25)",
    icon: "→",
    tagline: "Fast to Solve",
    description: "Problems solvable in polynomial time. If an algorithm runs in O(n²) or O(n³), it's in P. Computers handle these efficiently, even for large inputs.",
    examples: ["Sorting a list", "Shortest path (Dijkstra)", "Binary search", "Matrix multiplication"],
    visual: "linear",
    complexity: "O(nᵏ) where k is fixed",
  },
  {
    id: "np-class",
    label: "NP",
    full: "Nondeterministic Polynomial",
    color: "#007AFF",
    bg: "rgba(0,122,255,0.08)",
    border: "rgba(0,122,255,0.25)",
    icon: "?",
    tagline: "Fast to Verify",
    description: "A solution can be verified quickly (polynomial time), but finding it might take exponential time. All P problems are inside NP. Every P problem is also NP.",
    examples: ["Sudoku", "Boolean satisfiability", "Subset sum", "Graph coloring"],
    visual: "tree",
    complexity: "Verify: O(nᵏ) | Solve: unknown",
  },
  {
    id: "np-complete",
    label: "NP-C",
    full: "NP-Complete",
    color: "#FF9500",
    bg: "rgba(255,149,0,0.08)",
    border: "rgba(255,149,0,0.25)",
    icon: "★",
    tagline: "The Hardest in NP",
    description: "The toughest problems inside NP. Every other NP problem can be reduced to any NP-Complete problem. Solving ONE fast means solving ALL NP problems fast.",
    examples: ["Traveling Salesman", "Knapsack problem", "3-SAT", "Hamiltonian cycle"],
    visual: "glow",
    complexity: "If one solved → all NP solved",
  },
  {
    id: "np-hard",
    label: "NP-H",
    full: "NP-Hard",
    color: "#FF3B30",
    bg: "rgba(255,59,48,0.08)",
    border: "rgba(255,59,48,0.25)",
    icon: "∞",
    tagline: "Beyond NP",
    description: "At least as hard as the hardest NP problems. Some NP-Hard problems aren't even in NP — you can't verify a solution quickly. They sit outside the NP universe.",
    examples: ["Halting Problem", "Optimal scheduling", "Tetris (general)", "Chess (infinite board)"],
    visual: "chaos",
    complexity: "May not even be verifiable",
  },
];

function MiniVisual({ type, color }) {
  if (type === "linear") {
    return (
      <svg width="100%" height="60" viewBox="0 0 200 60">
        <line x1="10" y1="50" x2="190" y2="10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={10 + i * 45} cy={50 - i * 10} r="4" fill={color} fillOpacity="0.8" />
        ))}
      </svg>
    );
  }
  if (type === "tree") {
    return (
      <svg width="100%" height="60" viewBox="0 0 200 60">
        <line x1="100" y1="5" x2="50" y2="30" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="100" y1="5" x2="150" y2="30" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="50" y1="30" x2="25" y2="55" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
        <line x1="50" y1="30" x2="70" y2="55" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
        <line x1="150" y1="30" x2="130" y2="55" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
        <line x1="150" y1="30" x2="170" y2="55" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
        {[[100,5],[50,30],[150,30],[25,55],[70,55],[130,55],[170,55]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r={i < 3 ? 5 : 4} fill={color} fillOpacity={i === 0 ? 1 : 0.5} />
        ))}
      </svg>
    );
  }
  if (type === "glow") {
    return (
      <svg width="100%" height="60" viewBox="0 0 200 60">
        <defs>
          <radialGradient id={`glow-${color.replace('#','')}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="30" rx="80" ry="25" fill={`url(#glow-${color.replace('#','')})`} />
        <ellipse cx="100" cy="30" rx="50" ry="15" fill={color} fillOpacity="0.3" />
        <circle cx="100" cy="30" r="8" fill={color} />
      </svg>
    );
  }
  // chaos
  return (
    <svg width="100%" height="60" viewBox="0 0 200 60">
      {Array.from({ length: 18 }, (_, i) => {
        const x = 15 + (i % 6) * 32 + (Math.sin(i * 2.1) * 10);
        const y = 10 + Math.floor(i / 6) * 20 + (Math.cos(i * 1.7) * 8);
        return <circle key={i} cx={x} cy={y} r={2 + (i % 3)} fill={color} fillOpacity={0.2 + (i % 3) * 0.15} />;
      })}
    </svg>
  );
}

export default function VisualDefinitions() {
  return (
    <Section id="definitions" className="bg-[#050505]">
      <Container>
        <SectionHeader
          chapter="Chapter 03 · The Four Classes"
          title="Know Your Enemy"
          subtitle="Four complexity classes. One universe of problems."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLASSES.map(({ id, label, full, color, bg, border, icon, tagline, description, examples, visual, complexity }, idx) => (
            <GlassCard
              key={id}
              id={id}
              delay={idx * 0.1}
              className="!p-6 relative overflow-hidden"
              style={{ background: bg, border: `1px solid ${border}` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-4xl font-bold font-heading" style={{ color }}>{label}</span>
                  <div className="text-xs text-white/40 mt-1 font-mono">{full}</div>
                </div>
                <span className="text-2xl font-light" style={{ color }}>{icon}</span>
              </div>

              <div className="mb-4">
                <MiniVisual type={visual} color={color} />
              </div>

              <div className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 font-mono" style={{ background: color + "20", color }}>
                {tagline}
              </div>

              <p className="text-white/60 text-sm leading-relaxed mb-4 font-body">{description}</p>

              <div className="mb-4">
                <div className="text-xs text-white/30 uppercase tracking-widest mb-2 font-mono">
                  Examples
                </div>
                <ul className="space-y-1">
                  {examples.map((ex) => (
                    <li key={ex} className="text-xs text-white/60 flex items-center gap-2 font-body">
                      <span style={{ color, opacity: 0.7 }}>›</span> {ex}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3" style={{ borderTop: `1px solid ${border}` }}>
                <span className="text-xs font-mono" style={{ color: color + "aa" }}>{complexity}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </Container>
    </Section>
  );
}
