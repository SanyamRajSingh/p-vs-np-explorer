import React from "react";
import { motion } from "framer-motion";
import { Section, Container, SectionHeader, GlassCard } from "./ui";

const ROWS = [
  {
    cls: "P",
    color: "#34C759",
    solve: "Yes — polynomial",
    verify: "Yes — polynomial",
    difficulty: "Easy",
    examples: "Sorting, search, shortest path",
    note: "The 'best case' for any problem",
  },
  {
    cls: "NP",
    color: "#007AFF",
    solve: "Unknown (maybe yes)",
    verify: "Yes — polynomial",
    difficulty: "Unknown",
    examples: "Sudoku, SAT, Subset sum",
    note: "All P problems are also NP",
  },
  {
    cls: "NP-Complete",
    color: "#FF9500",
    solve: "If P=NP, then yes",
    verify: "Yes — polynomial",
    difficulty: "Hardest in NP",
    examples: "TSP, Knapsack, 3-SAT",
    note: "Solve one → solve all NP",
  },
  {
    cls: "NP-Hard",
    color: "#FF3B30",
    solve: "Unknown / No",
    verify: "Not necessarily",
    difficulty: "At least NP-Complete",
    examples: "Halting Problem, Tetris",
    note: "May not even be verifiable",
  },
];

export default function ComparisonTable() {
  return (
    <Section id="comparison" className="bg-[#050505]">
      <Container>
        <SectionHeader
          chapter="Chapter 10 · Crystal Clarity"
          title="Side-by-Side Comparison"
          subtitle="The definitive reference table"
        />

        <GlassCard hover={false} className="!p-0 overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                {["Class", "Solve Fast?", "Verify Fast?", "Difficulty", "Examples", "Key Insight"].map((h, i) => (
                  <th
                    key={i}
                    className="px-5 py-4 text-left text-xs uppercase tracking-widest text-white/40 font-mono"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(({ cls, color, solve, verify, difficulty, examples, note }, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}
                >
                  <td className="px-5 py-5">
                    <span
                      className="inline-flex items-center px-3 py-1.5 rounded-lg font-bold text-base font-heading"
                      style={{ color, background: color + "20", border: `1px solid ${color}40` }}
                    >
                      {cls}
                    </span>
                  </td>
                  <td className="px-5 py-5 text-sm font-mono" style={{ color: solve.startsWith("Yes") ? "#34C759" : solve.includes("Unknown") ? "#FFCC00" : "#FF3B30" }}>
                    {solve}
                  </td>
                  <td className="px-5 py-5 text-sm font-mono" style={{ color: verify.startsWith("Yes") ? "#34C759" : "#FF3B30" }}>
                    {verify}
                  </td>
                  <td className="px-5 py-5">
                    <span className="text-sm px-2 py-0.5 rounded font-mono" style={{ background: color + "15", color }}>
                      {difficulty}
                    </span>
                  </td>
                  <td className="px-5 py-5 text-sm text-white/60 font-body">{examples}</td>
                  <td className="px-5 py-5 text-sm text-white/50 italic font-body">{note}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </GlassCard>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap gap-4 mt-6 justify-center"
        >
          {[
            { label: "P ⊆ NP", color: "#34C759" },
            { label: "NP-C ⊆ NP", color: "#FF9500" },
            { label: "NP-C ⊆ NP-H", color: "#FF3B30" },
            { label: "P = NP? (unsolved)", color: "#FFCC00" },
          ].map(({ label, color }, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
