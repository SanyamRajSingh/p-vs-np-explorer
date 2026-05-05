import React from "react";
import { motion } from "framer-motion";
import { Clock, AlertCircle, Lightbulb } from "lucide-react";
import { Section, Container, SectionHeader, GlassCard, FADE_UP } from "./ui";

const TIMELINE = [
  { year: "1956", event: "Kurt Gödel writes to John von Neumann about the P vs NP-like question.", color: "#34C759" },
  { year: "1971", event: "Stephen Cook publishes the Cook-Levin theorem, introducing NP-Completeness and 3-SAT.", color: "#007AFF" },
  { year: "1972", event: "Richard Karp proves 21 combinatorial problems are NP-Complete, establishing the field.", color: "#FF9500" },
  { year: "2000", event: "Clay Mathematics Institute names P vs NP as one of 7 Millennium Prize Problems ($1M).", color: "#FFCC00" },
  { year: "2010", event: "Vinay Deolalikar claims to prove P ≠ NP. The proof is found to have gaps within days.", color: "#FF3B30" },
  { year: "Now", event: "Still unsolved. The smartest minds in mathematics and computer science continue the search.", color: "#CC44FF" },
];

export default function ResearchStatus() {
  return (
    <Section id="research" className="bg-[#050505]">
      <Container>
        <SectionHeader
          chapter="Chapter 09 · Current Status"
          title="The Quest Continues"
        >
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: "rgba(255,204,0,0.1)", border: "1px solid rgba(255,204,0,0.3)" }}>
            <span className="w-2 h-2 rounded-full pulse-dot bg-[#FFCC00]" />
            <span className="text-sm text-[#FFCC00] font-mono">
              UNSOLVED · Active Research · Since 1971
            </span>
          </div>
        </SectionHeader>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Timeline */}
          <div>
            <h3 className="text-lg font-medium text-white/60 mb-8 font-heading">Historical Timeline</h3>
            <div className="relative pl-6" style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
              {TIMELINE.map(({ year, event, color }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative mb-8 last:mb-0"
                >
                  <div className="absolute -left-[25px] w-3 h-3 rounded-full mt-1.5" style={{ background: color, boxShadow: `0 0 10px ${color}60` }} />
                  <div className="text-xs mb-1 font-mono" style={{ color }}>{year}</div>
                  <p className="text-white/70 text-sm leading-relaxed font-body">{event}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Status cards */}
          <div className="space-y-5">
            <GlassCard
              hover={false}
              delay={0}
              className="!p-7"
              style={{ background: "rgba(255,59,48,0.06)", border: "1px solid rgba(255,59,48,0.2)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle size={18} className="text-[#FF3B30]" />
                <span className="text-white font-medium font-heading">The Problem Remains Unsolved</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed font-body">
                No one has proven P = NP or P ≠ NP. We don't even have a clear roadmap for how a proof would look. Hundreds of flawed proofs are submitted annually — both directions.
              </p>
            </GlassCard>

            <GlassCard
              hover={false}
              delay={0.1}
              className="!p-7"
              style={{ background: "rgba(255,204,0,0.06)", border: "1px solid rgba(255,204,0,0.2)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Clock size={18} className="text-[#FFCC00]" />
                <span className="text-white font-medium font-heading">Why Is It So Hard to Prove?</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed font-body">
                We don't have good tools to prove lower bounds on computation time. All known techniques — diagonalization, circuit complexity, algebraic methods — have hit fundamental barriers.
              </p>
            </GlassCard>

            <GlassCard
              hover={false}
              delay={0.2}
              className="!p-7"
              style={{ background: "rgba(52,199,89,0.06)", border: "1px solid rgba(52,199,89,0.2)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Lightbulb size={18} className="text-[#34C759]" />
                <span className="text-white font-medium font-heading">What Would Change If P = NP?</span>
              </div>
              <ul className="space-y-2">
                {[
                  "All internet encryption would become breakable",
                  "Drug discovery optimized in minutes",
                  "Protein folding solved instantly",
                  "AI planning and reasoning dramatically accelerated",
                ].map((item, i) => (
                  <li key={i} className="text-white/60 text-sm flex gap-2 font-body">
                    <span className="text-[#34C759]">›</span> {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </Container>
    </Section>
  );
}
