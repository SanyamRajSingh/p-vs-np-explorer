import React from "react";
import { Trophy, ShieldOff, Brain, Network } from "lucide-react";
import { Section, Container, SectionHeader, GlassCard } from "./ui";

const FACTS = [
  {
    icon: Trophy,
    color: "#FFCC00",
    number: "$1,000,000",
    label: "Millennium Prize",
    text: "P vs NP is one of the 7 Millennium Prize Problems by the Clay Mathematics Institute. Solving it earns a million dollars — and changes civilization.",
  },
  {
    icon: Brain,
    color: "#007AFF",
    number: ">99%",
    label: "Scientists believe P ≠ NP",
    text: "An informal poll of complexity theorists found that over 99% believe P ≠ NP. Yet no one has proven it. It remains the most important unsolved problem in computer science.",
  },
  {
    icon: ShieldOff,
    color: "#FF3B30",
    number: "Broken",
    label: "If P = NP, encryption fails",
    text: "RSA, AES, all public-key cryptography relies on problems believed to be hard. If P = NP, an efficient algorithm could decrypt any password, email, or bank transfer instantly.",
  },
  {
    icon: Network,
    color: "#34C759",
    number: "3,000+",
    label: "NP-Complete problems known",
    text: "Since Cook's 1971 theorem, over 3,000 problems have been proven NP-Complete. Scheduling, routing, packing, circuit design — they're all connected at their hardest core.",
  },
];

export default function FunFacts() {
  return (
    <Section id="funfacts" className="bg-[#050505]">
      <Container>
        <SectionHeader
          chapter="Chapter 08 · Surprising Facts"
          title="Mind-Blowing Facts"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACTS.map(({ icon: I, color, number, label, text }, i) => (
            <GlassCard
              key={i}
              delay={i * 0.1}
              className="!p-7"
              style={{ border: `1px solid ${color}25` }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: color + "20" }}>
                <I size={22} style={{ color }} />
              </div>
              <div className="text-3xl font-bold mb-1 font-heading" style={{ color }}>{number}</div>
              <div className="text-xs uppercase tracking-widest text-white/40 mb-4 font-mono">{label}</div>
              <p className="text-white/60 text-sm leading-relaxed font-body">{text}</p>
            </GlassCard>
          ))}
        </div>
      </Container>
    </Section>
  );
}
