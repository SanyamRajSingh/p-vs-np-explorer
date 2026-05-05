import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Truck, Lock, Cpu } from "lucide-react";
import { Section, Container, SectionHeader, GlassCard, FADE_UP } from "./ui";

const CASES = [
  {
    icon: Map,
    title: "Google Maps Routing",
    subtitle: "Shortest path in seconds",
    color: "#34C759",
    category: "P-class in practice",
    badge: "Uses P algorithms",
    summary: "Finding the shortest path between two points is in P. Google Maps uses Dijkstra's or A* algorithms.",
    reality: "But finding the globally optimal route for delivery fleets visiting hundreds of stops? That's NP-Hard (Vehicle Routing Problem). Google uses smart approximations — not exact solutions.",
    techDetail: "Dijkstra's: O((V+E) log V) — polynomial and fast. VRP (100+ stops): exponential exact, polynomial approximate.",
    insight: "This is why maps are fast for navigation but delivery optimization uses clever heuristics, not perfect answers.",
  },
  {
    icon: Truck,
    title: "Swiggy / Uber Delivery",
    subtitle: "Optimizing thousands of routes",
    color: "#FF9500",
    category: "NP-Hard optimization",
    badge: "Approximation algorithms",
    summary: "Assigning 1,000 delivery agents to 10,000 orders is a variant of the Traveling Salesman Problem — NP-Hard.",
    reality: "Swiggy and Uber CANNOT find the mathematically perfect assignment. The search space is astronomically large. Instead, they use heuristic algorithms, machine learning, and greedy approximations that run in milliseconds.",
    techDetail: "Exact TSP for 100 cities: 100! routes. Nearest-neighbor heuristic: O(n²) — fast and ~80% optimal.",
    insight: "When you see 'Your food arrives in 30 min', that ETA is an estimate, not a mathematically optimal guarantee.",
  },
  {
    icon: Lock,
    title: "RSA Cryptography",
    subtitle: "Security based on NP hardness",
    color: "#007AFF",
    category: "NP-Hard assumption",
    badge: "Core of internet security",
    summary: "RSA encryption relies on the fact that multiplying two large primes is easy (P), but factoring the product is believed to be hard (possibly NP-Hard).",
    reality: "Generating a key: multiply p × q (trivial). Cracking the key: factor the product. For 2048-bit keys, factoring would take longer than the age of the universe with classical computers.",
    techDetail: "Generating: O(n²) for n-bit numbers. Factoring best known: O(exp(n^(1/3))) — sub-exponential but still impractical.",
    insight: "If P = NP, RSA breaks. Your HTTPS, banking, messages — all vulnerable. This is why mathematicians study P vs NP with urgency.",
  },
  {
    icon: Cpu,
    title: "VLSI Circuit Design",
    subtitle: "Chip layout optimization",
    color: "#FF3B30",
    category: "NP-Complete",
    badge: "Billions in annual cost",
    summary: "Designing chip layouts to minimize wire length and maximize performance involves problems proven to be NP-Complete.",
    reality: "VLSI placement and routing are NP-Complete problems. Intel, AMD, and NVIDIA spend billions on EDA (Electronic Design Automation) tools that use sophisticated heuristics to design chips in finite time.",
    techDetail: "Optimal wire routing: NP-Complete. Current EDA tools use simulated annealing, genetic algorithms — elegant approximations.",
    insight: "Every CPU, GPU, and smartphone chip was designed using approximate algorithms for NP-Complete problems. Exact solutions would take millennia.",
  },
];

export default function RealWorldCases() {
  const [active, setActive] = useState(0);
  const c = CASES[active];
  const Icon = c.icon;

  return (
    <Section id="cases" className="bg-[#050505]">
      <Container>
        <SectionHeader
          chapter="Chapter 07 · Real World"
          title="Real-World Case Studies"
          subtitle="P vs NP isn't abstract theory. It shapes every app you use."
        />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tabs */}
          <motion.div {...FADE_UP} className="flex lg:flex-col gap-3 lg:w-64 shrink-0 overflow-x-auto pb-4 lg:pb-0">
            {CASES.map(({ title, icon: I, color }, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                data-testid={`case-tab-${i}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all shrink-0 lg:shrink"
                style={{
                  background: active === i ? color + "20" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${active === i ? color + "50" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                <I size={16} style={{ color: active === i ? color : "rgba(255,255,255,0.3)" }} />
                <span className="text-sm font-heading" style={{ color: active === i ? "white" : "rgba(255,255,255,0.5)" }}>
                  {title}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <GlassCard
                key={active}
                hover={false}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="!p-8"
                style={{ border: `1px solid ${c.color}30` }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: c.color + "20" }}>
                    <Icon size={22} style={{ color: c.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white font-heading">{c.title}</h3>
                    <p className="text-white/50 text-sm font-body">{c.subtitle}</p>
                  </div>
                  <div className="ml-auto shrink-0">
                    <span className="px-3 py-1 rounded-full text-xs font-medium font-mono" style={{ background: c.color + "20", color: c.color }}>
                      {c.badge}
                    </span>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/30 mb-2 font-mono">Overview</div>
                    <p className="text-white/70 text-sm leading-relaxed font-body">{c.summary}</p>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/30 mb-2 font-mono">Reality</div>
                    <p className="text-white/70 text-sm leading-relaxed font-body">{c.reality}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                    <div className="text-xs text-white/30 mb-1 font-mono">Technical Detail</div>
                    <p className="text-sm text-white/60 font-mono">{c.techDetail}</p>
                  </div>
                  <div className="p-4 rounded-xl flex items-start gap-3" style={{ background: c.color + "10", border: `1px solid ${c.color}25` }}>
                    <span style={{ color: c.color }} className="text-lg shrink-0">→</span>
                    <p className="text-sm leading-relaxed font-body" style={{ color: c.color + "dd" }}>{c.insight}</p>
                  </div>
                </div>
              </GlassCard>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}
