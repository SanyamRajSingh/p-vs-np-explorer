import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, CheckCircle } from "lucide-react";
import { Section, Container, SectionHeader, GlassCard, Button, FADE_UP } from "./ui";

function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

function totalRoutes(n) {
  if (n < 3) return 1;
  return factorial(n - 1) / 2;
}

function generateCities(n) {
  const cx = 210, cy = 185, r = 130;
  return Array.from({ length: n }, (_, i) => ({
    x: cx + r * Math.cos((2 * Math.PI * i) / n - Math.PI / 2),
    y: cy + r * Math.sin((2 * Math.PI * i) / n - Math.PI / 2),
    id: i,
  }));
}

function dist(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function pathDist(cities, path) {
  let d = 0;
  for (let i = 0; i < path.length; i++) {
    d += dist(cities[path[i]], cities[path[(i + 1) % path.length]]);
  }
  return d;
}

function getPermutations(arr) {
  if (arr.length <= 1) return [arr];
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = getPermutations([...arr.slice(0, i), ...arr.slice(i + 1)]);
    rest.forEach((p) => result.push([arr[i], ...p]));
  }
  return result;
}

export default function TSPSimulation() {
  const [n, setN] = useState(5);
  const [state, setState] = useState("idle"); // idle | searching | done | verifying | verified
  const [checked, setChecked] = useState(0);
  const [curPath, setCurPath] = useState([]);
  const [bestPath, setBestPath] = useState([]);
  const [bestDist, setBestDist] = useState(null);
  const timerRef = useRef(null);

  const cities = useMemo(() => generateCities(n), [n]);
  const total = totalRoutes(n);

  const reset = () => {
    clearInterval(timerRef.current);
    setState("idle");
    setChecked(0);
    setCurPath([]);
    setBestPath([]);
    setBestDist(null);
  };

  useEffect(() => { reset(); }, [n]); // eslint-disable-line

  const startSearch = () => {
    if (state === "searching") return;
    reset();
    setState("searching");

    if (n <= 7) {
      const others = Array.from({ length: n - 1 }, (_, i) => i + 1);
      const perms = getPermutations(others).map((p) => [0, ...p]);
      const half = perms.slice(0, Math.ceil(perms.length / 2));
      let i = 0;
      let best = Infinity, bp = [];
      const delay = n <= 5 ? 160 : 90;
      timerRef.current = setInterval(() => {
        if (i >= half.length) {
          clearInterval(timerRef.current);
          setState("done");
          setBestPath(bp);
          return;
        }
        const path = half[i];
        const d = pathDist(cities, path);
        setCurPath(path);
        setChecked(i + 1);
        if (d < best) { best = d; bp = path; setBestDist(d); }
        i++;
      }, delay);
    } else {
      const t = total;
      const steps = 150;
      const inc = Math.ceil(t / steps);
      let count = 0;
      let best = Infinity, bp = [];
      timerRef.current = setInterval(() => {
        count = Math.min(count + inc, t);
        setChecked(count);
        const rp = Array.from({ length: n }, (_, i) => i).sort(() => Math.random() - 0.5);
        const d = pathDist(cities, rp);
        setCurPath(rp);
        if (d < best) { best = d; bp = rp; setBestDist(d); }
        if (count >= t) {
          clearInterval(timerRef.current);
          setState("done");
          setBestPath(bp);
        }
      }, 30);
    }
  };

  const verifyRoute = () => {
    if (bestPath.length === 0) return;
    setState("verifying");
    setTimeout(() => setState("verified"), 800);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  const pathColor = (i) => (state === "done" ? "#34C759" : "#007AFF");

  const displayPath = state === "done" || state === "verified" || state === "verifying" ? bestPath : curPath;
  const displayColor = state === "done" || state === "verified" || state === "verifying" ? "#34C759" : "#007AFF";

  return (
    <Section id="tsp" className="bg-[#050505]">
      <Container>
        <SectionHeader
          chapter="Simulation 01 · NP-Complete"
          title="Traveling Salesman Problem"
          subtitle="Visit every city exactly once. Find the shortest route. Simple to describe — brutally hard to solve."
        />

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* SVG Map */}
          <GlassCard glowColor={state === "done" || state === "verified" ? "#34C759" : "#007AFF"} className="!p-4 overflow-hidden">
            <svg viewBox="0 0 420 370" className="w-full">
              {/* Path lines */}
              {displayPath.length > 1 && displayPath.map((id, i) => {
                const nxt = displayPath[(i + 1) % displayPath.length];
                return (
                  <line
                    key={i}
                    x1={cities[id].x} y1={cities[id].y}
                    x2={cities[nxt].x} y2={cities[nxt].y}
                    stroke={displayColor}
                    strokeWidth={state === "done" || state === "verified" ? 2.5 : 1.5}
                    strokeOpacity={state === "done" || state === "verified" ? 0.8 : 0.4}
                    strokeDasharray={state === "done" || state === "verified" ? "none" : "5 3"}
                  />
                );
              })}
              {/* Cities */}
              {cities.map((c) => (
                <g key={c.id}>
                  <circle cx={c.x} cy={c.y} r="11" fill="#0A0A0A" stroke="#FFCC00" strokeWidth="2" />
                  <circle cx={c.x} cy={c.y} r="4" fill="#FFCC00" />
                  <text x={c.x} y={c.y - 18} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="JetBrains Mono, monospace">
                    {c.id + 1}
                  </text>
                </g>
              ))}
              {/* Verify flash */}
              {state === "verified" && (
                <rect x="0" y="0" width="420" height="370" fill="#34C759" fillOpacity="0.08" />
              )}
            </svg>
          </GlassCard>

          {/* Controls */}
          <motion.div
            {...FADE_UP}
            className="space-y-6"
          >
            {/* City slider */}
            <GlassCard className="!p-6">
              <label className="text-xs uppercase tracking-widest text-white/40 mb-3 block font-mono">
                Number of Cities: {n}
              </label>
              <input
                type="range" min={3} max={10} value={n}
                onChange={(e) => setN(Number(e.target.value))}
                className="w-full mb-4 accent-yellow-400"
                data-testid="tsp-cities-slider"
              />
              <div className="flex justify-between text-xs text-white/30 font-mono">
                <span>3 cities</span>
                <span>10 cities</span>
              </div>
            </GlassCard>

            {/* Stats */}
            <GlassCard className="!p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-xs text-white/30 mb-1 font-mono">Possible Routes</div>
                  <div className="text-2xl font-bold text-[#FFCC00] font-heading">{total.toLocaleString()}</div>
                  <div className="text-xs text-white/30 mt-0.5 font-mono">= ({n}-1)! ÷ 2</div>
                </div>
                <div>
                  <div className="text-xs text-white/30 mb-1 font-mono">Checked</div>
                  <div className="text-2xl font-bold font-heading" style={{ color: state === "done" ? "#34C759" : "#007AFF" }}>
                    {checked.toLocaleString()}
                  </div>
                  <div className="text-xs text-white/30 mt-0.5 font-mono">
                    {state === "done" ? "Complete!" : state === "searching" ? "Searching..." : "—"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-white/30 mb-1 font-mono">Best Distance</div>
                  <div className="text-xl font-bold text-white font-heading">
                    {bestDist ? bestDist.toFixed(1) : "—"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-white/30 mb-1 font-mono">Complexity</div>
                  <div className="text-xl font-bold text-[#FF3B30] font-mono">O((n-1)!)</div>
                </div>
              </div>
            </GlassCard>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={startSearch}
                disabled={state === "searching"}
                data-testid="tsp-start-btn"
                color="#007AFF"
                variant={state === "searching" ? "outline" : "filled"}
                className="flex-1"
              >
                <Play size={14} />
                {state === "searching" ? "Searching..." : "Brute Force"}
              </Button>
              <Button
                onClick={verifyRoute}
                disabled={state !== "done"}
                data-testid="tsp-verify-btn"
                color="#34C759"
                variant={state === "done" ? "filled" : "default"}
                className="flex-1"
              >
                <CheckCircle size={14} />
                Verify Route
              </Button>
            </div>
            <button onClick={reset} className="w-full flex items-center justify-center gap-2 py-2 text-white/30 hover:text-white/60 text-sm transition-colors font-body" data-testid="tsp-reset-btn">
              <RotateCcw size={12} /> Reset
            </button>

            {state === "verified" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl text-center bg-[#34C759]/10 border border-[#34C759]/30"
              >
                <p className="text-sm font-medium text-[#34C759] font-body">
                  Verified in 1 check!
                </p>
                <p className="text-xs text-white/40 mt-1 font-body">
                  Finding took {checked.toLocaleString()} attempts. Verifying took 1.
                </p>
              </motion.div>
            )}

            <div className="p-4 rounded-xl bg-[#FFCC00]/5 border border-[#FFCC00]/15">
              <p className="text-xs text-white/50 leading-relaxed font-mono">
                As n grows: 10 cities = 181,440 routes. 20 cities = 60 trillion routes. Each new city multiplies the problem by n.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
