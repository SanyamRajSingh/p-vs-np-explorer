import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Check, Search, Lock, Key } from "lucide-react";
import { Section, Container, SectionHeader, GlassCard, Button, FADE_UP } from "./ui";

const attempts = ["hunter2", "password1", "abc123__", "qwerty99", "letmein!", "correct!!"];

export default function StoryAnalogy() {
  const [attempt, setAttempt] = useState(0);
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const intervalRef = useRef(null);

  const runCracker = () => {
    setAttempt(0);
    setVerified(false);
    setVerifying(true);
    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      setAttempt(i);
      if (i >= attempts.length - 1) {
        clearInterval(intervalRef.current);
        setVerified(true);
        setVerifying(false);
      }
    }, 600);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <Section id="story" className="bg-[#050505]">
      <Container>
        <SectionHeader
          chapter="Chapter 01 · The Core Insight"
          title="The Password Cracker"
          subtitle="This one analogy unlocks everything."
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {/* Verify: Fast */}
          <GlassCard glowColor="#34C759">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#34C759]/20">
                <Check size={20} className="text-[#34C759]" />
              </div>
              <span className="text-xs uppercase tracking-widest text-white/40 font-mono">
                Verification (Fast)
              </span>
            </div>
            <h3 className="text-2xl font-medium text-white mb-4 font-heading">
              You find a sticky note:<br />
              <span className="text-[#34C759]">"correct!!"</span>
            </h3>
            <p className="text-white/60 leading-relaxed mb-6 font-body">
              Does it open the lock? You try it once.{" "}
              <strong className="text-white">One check.</strong> Done.
              Whether the password is 8 characters or 80, verification takes the same relative effort.
            </p>
            <div className="rounded-xl p-4 bg-[#34C759]/10 border border-[#34C759]/20 font-mono">
              <div className="text-xs text-white/40 mb-2">verification.py</div>
              <div className="text-sm text-[#34C759]">if hash(<span className="text-[#FFCC00]">"correct!!"</span>) == stored:</div>
              <div className="text-sm text-white/60 ml-4">return "✓ Correct!" <span className="text-white/30"># instant</span></div>
            </div>
            <div className="mt-5 flex items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-[#34C759]/15 text-[#34C759] font-mono">
                O(1) — Constant time
              </span>
            </div>
          </GlassCard>

          {/* Solve: Slow */}
          <GlassCard glowColor="#FF3B30" delay={0.15}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#FF3B30]/20">
                <Search size={20} className="text-[#FF3B30]" />
              </div>
              <span className="text-xs uppercase tracking-widest text-white/40 font-mono">
                Solving (Potentially Slow)
              </span>
            </div>
            <h3 className="text-2xl font-medium text-white mb-4 font-heading">
              No sticky note. <span className="text-[#FF3B30]">Crack it.</span>
            </h3>
            <p className="text-white/60 leading-relaxed mb-6 font-body">
              Now guess every possible combination. 8 characters × 94 printable symbols = <strong className="text-white">6 quadrillion</strong> possibilities.
            </p>

            {/* Animated cracker */}
            <div className="rounded-xl p-4 mb-4 bg-[#FF3B30]/10 border border-[#FF3B30]/20 font-mono">
              {attempts.slice(0, attempt + 1).map((a, i) => (
                <div key={i} className="text-sm flex items-center gap-2" style={{ color: i === attempt && verified ? "#34C759" : i === attempt ? "#FFCC00" : "rgba(255,255,255,0.25)" }}>
                  <span>{i === attempt && verified ? "✓" : i < attempt ? "✗" : "→"}</span>
                  <span>try("{a}")</span>
                  {i === attempt && verified && <span className="text-[#34C759]">FOUND!</span>}
                </div>
              ))}
            </div>
            <div className="flex gap-3 items-center">
              <Button
                onClick={runCracker}
                disabled={verifying}
                color="#FF3B30"
                variant={verifying ? "outline" : "filled"}
                data-testid="cracker-btn"
              >
                {verifying ? "Cracking..." : verified ? "Try Again" : "Run Cracker"}
              </Button>
              <span className="text-xs px-3 py-1 rounded-full bg-[#FF3B30]/10 text-[#FF3B30] font-mono">
                O(2ⁿ) — Exponential
              </span>
            </div>
          </GlassCard>
        </div>

        <motion.div
          {...FADE_UP}
          className="text-center py-12 px-8 rounded-3xl bg-[#FFCC00]/5 border border-[#FFCC00]/20"
        >
          <div className="flex justify-center gap-6 mb-6 font-body">
            <div className="flex items-center gap-2 text-white/60">
              <Lock size={18} className="text-[#34C759]" />
              <span className="text-sm">Verifying = Easy</span>
            </div>
            <div className="text-white/20 text-2xl">≠</div>
            <div className="flex items-center gap-2 text-white/60">
              <Key size={18} className="text-[#FF3B30]" />
              <span className="text-sm">Solving = Hard?</span>
            </div>
          </div>
          <p className="text-xl md:text-2xl font-light text-white max-w-3xl mx-auto leading-relaxed font-heading">
            "This gap — between{" "}
            <span className="text-[#34C759]">checking</span> an answer and{" "}
            <span className="text-[#FF3B30]">finding</span> one — is the soul of P vs NP."
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
