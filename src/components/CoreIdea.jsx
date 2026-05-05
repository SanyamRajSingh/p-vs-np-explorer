import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Clock } from "lucide-react";
import { Section, Container, SectionHeader, GlassCard, FADE_UP } from "./ui";

function AnimatedBar({ label, color, pct, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="mb-4"
    >
      <div className="flex justify-between mb-1">
        <span className="text-xs text-white/60" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{label}</span>
        <span className="text-xs" style={{ color, fontFamily: "'JetBrains Mono', monospace" }}>{pct}%</span>
      </div>
      <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </motion.div>
  );
}

export default function CoreIdea() {
  const [n, setN] = useState(10);
  const linearOps = n;
  const expOps = Math.min(Math.pow(2, n), 999999);

  const verifyPct = Math.min(100, (linearOps / expOps) * 100);
  const solvePct = 100;

  return (
    <Section id="core" className="bg-black">
      <Container>
        <SectionHeader
          chapter="Chapter 02 · The Breakthrough"
          title="Finding vs. Verifying"
          subtitle="The same solution. Wildly different effort."
        />

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Visual: exponential vs linear */}
          <GlassCard glowColor="#FF3B30">
            <div className="flex items-center gap-2 mb-6">
              <Clock size={16} className="text-[#007AFF]" />
              <span className="text-sm text-white/60 font-body">Adjust input size</span>
            </div>
            <div className="mb-6">
              <label className="text-xs text-white/40 mb-2 block font-mono">
                Input size n = {n}
              </label>
              <input
                type="range" min={1} max={20} value={n}
                onChange={(e) => setN(Number(e.target.value))}
                className="w-full accent-blue-500"
                data-testid="core-idea-slider"
              />
            </div>
            <AnimatedBar label={`Verify: ${linearOps} checks`} color="#34C759" pct={3} delay={0} />
            <AnimatedBar
              label={`Solve (brute force): ${expOps.toLocaleString()} attempts`}
              color="#FF3B30"
              pct={Math.min(solvePct, 100)}
              delay={0.1}
            />
            <div className="mt-6 p-4 rounded-xl bg-[#FF3B30]/10 border border-[#FF3B30]/20">
              <p className="text-sm text-white/60 font-mono">
                Verify: <span className="text-[#34C759]">O(n)</span> = {linearOps} operations<br />
                Solve: <span className="text-[#FF3B30]">O(2ⁿ)</span> = {expOps.toLocaleString()} operations
              </p>
            </div>
          </GlassCard>

          {/* Steps */}
          <div className="space-y-5">
            {[
              { num: "01", title: "A solution exists", text: "Every NP problem has a potential solution — we just don't know how to find it fast.", color: "#007AFF", delay: 0 },
              { num: "02", title: "Checking is always fast", text: "Given a candidate answer, we can check if it's correct in polynomial time. This is the 'NP' part.", color: "#34C759", delay: 0.1 },
              { num: "03", title: "Finding might be slow", text: "Without a known shortcut, we may need to try every possibility. That's exponential time.", color: "#FF9500", delay: 0.2 },
              { num: "04", title: "The million dollar question", text: "Does a fast SOLVER always exist, even if we haven't found it yet? P = NP asks exactly this.", color: "#FFCC00", delay: 0.3 },
            ].map(({ num, title, text, color, delay }) => (
              <GlassCard key={num} delay={delay} className="!p-6 flex gap-5">
                <div className="text-3xl font-light shrink-0 font-heading" style={{ color: color + "60" }}>{num}</div>
                <div>
                  <h4 className="text-white font-medium mb-1 font-heading">{title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed font-body">{text}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <motion.div
          {...FADE_UP}
          className="text-center py-12 rounded-3xl trace-border"
        >
          <Zap size={28} className="mx-auto mb-4 text-[#FFCC00]" />
          <h3 className="text-2xl md:text-3xl font-light text-white font-heading">
            If P = NP, then every <span className="text-[#34C759]">checkable</span> problem<br />
            is also <span className="text-[#FF3B30]">solvable</span> just as fast.
          </h3>
          <p className="text-white/40 mt-4 text-sm font-body">...and that would change everything.</p>
        </motion.div>
      </Container>
    </Section>
  );
}
