import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section, Container, SectionHeader, FADE_UP } from "./ui";

const FLOW = [
  { label: "P", sub: "Solvable fast", color: "#34C759", x: 0 },
  { label: "NP", sub: "Verifiable fast", color: "#007AFF", x: 1 },
  { label: "NP-C", sub: "Hardest in NP", color: "#FF9500", x: 2 },
  { label: "NP-H", sub: "Beyond NP", color: "#FF3B30", x: 3 },
];

export default function FinalInsight() {
  return (
    <Section id="final" className="bg-[#050505] overflow-hidden">
      <Container className="max-w-5xl text-center">
        <SectionHeader
          chapter="Final Insight"
          title="Everything in One Picture"
        />

        {/* Flow diagram */}
        <motion.div
          {...FADE_UP}
          className="flex flex-wrap items-center justify-center gap-4 mb-20"
        >
          {FLOW.map(({ label, sub, color }, i) => (
            <React.Fragment key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col items-center"
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold mb-2 font-heading"
                  style={{ background: color + "20", border: `2px solid ${color}60`, color, boxShadow: `0 0 30px ${color}20` }}
                >
                  {label}
                </div>
                <span className="text-xs text-white/40 font-mono">{sub}</span>
              </motion.div>
              {i < FLOW.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3 }}
                >
                  <ArrowRight size={20} className="text-white/20" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Summary bullets */}
        <div className="grid sm:grid-cols-2 gap-4 mb-20 text-left">
          {[
            { color: "#34C759", text: "P: Problems with known fast algorithms. Sorting, searching, Dijkstra." },
            { color: "#007AFF", text: "NP: Solutions verified fast. Includes P. Unknown if all can be solved fast." },
            { color: "#FF9500", text: "NP-Complete: Hardest in NP. If any NP-C solved fast → ALL NP solved fast." },
            { color: "#FF3B30", text: "NP-Hard: At least NP-C hard. Some not verifiable. Extends beyond NP." },
            { color: "#FFCC00", text: "P vs NP asks: is P = NP? Does a shortcut exist for every hard problem?" },
            { color: "#CC44FF", text: "Still unsolved. $1M prize. Most believe P ≠ NP but no one can prove it." },
          ].map(({ color, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-3 p-4 rounded-xl"
              style={{ background: color + "08", border: `1px solid ${color}20` }}
            >
              <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: color }} />
              <p className="text-white/70 text-sm leading-relaxed font-body">{text}</p>
            </motion.div>
          ))}
        </div>

        {/* Final quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="py-16 px-8 rounded-3xl relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(52,199,89,0.08), rgba(0,122,255,0.08), rgba(255,59,48,0.08))", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-10 blur-[40px]" style={{ background: "#007AFF" }} />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full opacity-10 blur-[40px]" style={{ background: "#34C759" }} />

          <div className="relative z-10">
            <p className="text-2xl md:text-4xl font-light text-white leading-relaxed mb-8 font-heading">
              "What if every impossible problem<br />
              <span className="text-[#FFCC00]">suddenly became easy?"</span>
            </p>
            <p className="text-white/50 text-lg mb-8 font-body">
              That is the question. One equation. P = NP.
            </p>
            <p className="text-white/30 text-sm max-w-xl mx-auto leading-relaxed font-body">
              It has never been answered. It may never be answered. But in its asking, it revealed the deep structure of computation — and why some problems are beautiful and some are brutal.
            </p>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-white/60 text-base mb-2 font-heading">
                You now understand something most people never will.
              </p>
              <p className="text-white/30 text-sm font-body">P, NP, NP-Complete, NP-Hard — and why it matters.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 flex justify-center gap-3"
        >
          {[
            { label: "P", color: "#34C759" },
            { label: "NP", color: "#007AFF" },
            { label: "NP-C", color: "#FF9500" },
            { label: "NP-H", color: "#FF3B30" },
          ].map(({ label, color }) => (
            <span
              key={label}
              className="w-3 h-3 rounded-full pulse-dot"
              style={{ background: color }}
            />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-xs text-white/20 font-mono"
        >
          Built with clarity · P vs NP Explorer
        </motion.p>
      </Container>
    </Section>
  );
}
