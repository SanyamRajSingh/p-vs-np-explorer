import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle, CheckCircle, ChevronDown } from "lucide-react";
import { Section, Container, SectionHeader, GlassCard } from "./ui";

const MYTHS = [
  {
    myth: '"NP" stands for "Non-Polynomial"',
    truth: "NP stands for Nondeterministic Polynomial time.",
    detail:
      "A Nondeterministic Turing Machine can guess the right answer AND verify it in polynomial time. It has nothing to do with 'non-polynomial' — in fact, P ⊆ NP, meaning P problems ARE also NP.",
    color: "#007AFF",
  },
  {
    myth: "NP problems are impossible to solve",
    truth: "NP problems CAN be solved — just potentially slowly.",
    detail:
      "Every Sudoku puzzle has a solution. Every NP-Complete problem is solvable. The question is efficiency. We just don't know if there's a fast (polynomial-time) algorithm. Many NP problems are solved daily using heuristics, approximations, and optimized backtracking.",
    color: "#FF9500",
  },
  {
    myth: "P vs NP is about speed, not solvability",
    truth: "Partially true — but it's deeper than just speed.",
    detail:
      "P vs NP asks whether every problem whose solution can be checked quickly can also be SOLVED quickly. It's about the fundamental nature of mathematical creativity and discovery — can following a logical path always match insight?",
    color: "#34C759",
  },
  {
    myth: "If P = NP, computers become infinitely fast",
    truth: "No. It means certain algorithms would become polynomial.",
    detail:
      "P = NP doesn't mean every problem becomes trivial. It means a polynomial-time algorithm EXISTS for NP-Complete problems. For problems where n = 1,000,000, an O(n¹⁰⁰) algorithm is still painfully slow — but it IS polynomial.",
    color: "#FF3B30",
  },
  {
    myth: "NP-Hard means harder than NP-Complete",
    truth: "NP-Hard problems are AT LEAST as hard — not necessarily harder.",
    detail:
      "NP-Complete ⊆ NP-Hard. Every NP-Complete problem is also NP-Hard. What makes NP-Hard special is that some NP-Hard problems aren't even in NP — they might not be verifiable quickly at all. The Halting Problem is NP-Hard but NOT NP-Complete.",
    color: "#CC44FF",
  },
];

export default function Misconceptions() {
  const [open, setOpen] = useState(null);

  return (
    <Section id="misconceptions" className="bg-[#050505]">
      <Container>
        <SectionHeader
          chapter="Chapter 06 · Myth Busting"
          title="Common Misconceptions"
          subtitle="These myths confuse even experienced programmers. Let's clear them up."
        />

        <div className="space-y-4 max-w-4xl mx-auto">
          {MYTHS.map(({ myth, truth, detail, color }, i) => (
            <GlassCard
              key={i}
              hover={false}
              delay={i * 0.08}
              className="!p-0 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center gap-4 p-6 text-left hover:bg-white/5 transition-colors"
                data-testid={`misconception-toggle-${i}`}
              >
                <XCircle size={18} className="shrink-0 text-[#FF3B30]" />
                <div className="flex-1">
                  <p className="text-white/80 font-medium font-heading">"{myth}"</p>
                </div>
                <ChevronDown
                  size={16}
                  className="text-white/30 shrink-0 transition-transform"
                  style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4 border-t border-white/5">
                      <div className="flex items-start gap-3 mt-4 p-4 rounded-xl" style={{ background: color + "15", border: `1px solid ${color}30` }}>
                        <CheckCircle size={16} style={{ color, marginTop: 2 }} className="shrink-0" />
                        <p className="text-sm font-medium font-body" style={{ color }}>{truth}</p>
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed pl-2 font-body">{detail}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          ))}
        </div>
      </Container>
    </Section>
  );
}
