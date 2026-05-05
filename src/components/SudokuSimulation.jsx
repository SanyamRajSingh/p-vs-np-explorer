import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Zap, RotateCcw } from "lucide-react";
import { Section, Container, SectionHeader, GlassCard, Button, FADE_UP } from "./ui";

const PUZZLE = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9],
];

const SOLUTION = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9],
];

function isOriginal(r, c) { return PUZZLE[r][c] !== 0; }

function isValid(board, row, col, num) {
  for (let c = 0; c < 9; c++) if (board[row][c] === num) return false;
  for (let r = 0; r < 9; r++) if (board[r][col] === num) return false;
  const br = Math.floor(row / 3) * 3, bc = Math.floor(col / 3) * 3;
  for (let r = br; r < br + 3; r++) for (let c = bc; c < bc + 3; c++) if (board[r][c] === num) return false;
  return true;
}

function recordSolveSteps(board) {
  const steps = [];
  const b = board.map(r => [...r]);
  const solve = () => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (b[r][c] === 0) {
          for (let n = 1; n <= 9; n++) {
            if (isValid(b, r, c, n)) {
              b[r][c] = n;
              steps.push({ r, c, v: n, back: false });
              if (solve()) return true;
              b[r][c] = 0;
              steps.push({ r, c, v: 0, back: true });
            }
          }
          return false;
        }
      }
    }
    return true;
  };
  solve();
  return steps;
}

export default function SudokuSimulation() {
  const [grid, setGrid] = useState(PUZZLE.map(r => [...r]));
  const [highlight, setHighlight] = useState(null); // { type, index } or null
  const [cellState, setCellState] = useState({}); // { "r,c": "green"|"red"|"yellow"|"filled" }
  const [mode, setMode] = useState("idle"); // idle | verifying | verified | solving | solved
  const [attempts, setAttempts] = useState(0);
  const timerRef = useRef(null);

  const resetAll = () => {
    clearTimeout(timerRef.current);
    clearInterval(timerRef.current);
    setGrid(PUZZLE.map(r => [...r]));
    setHighlight(null);
    setCellState({});
    setMode("idle");
    setAttempts(0);
  };

  const verify = () => {
    if (mode !== "idle" && mode !== "verified" && mode !== "solved") return;
    resetAll();
    setMode("verifying");
    let step = 0;
    const sequence = [
      ...Array.from({length:9},(_,i) => ({ type:"row", index:i })),
      ...Array.from({length:9},(_,i) => ({ type:"col", index:i })),
      ...Array.from({length:9},(_,i) => ({ type:"box", index:i })),
    ];
    const runStep = () => {
      if (step >= sequence.length) {
        setHighlight(null);
        setMode("verified");
        return;
      }
      setHighlight(sequence[step]);
      step++;
      timerRef.current = setTimeout(runStep, 120);
    };
    timerRef.current = setTimeout(runStep, 100);
  };

  const solve = () => {
    if (mode !== "idle" && mode !== "verified") return;
    resetAll();
    setMode("solving");
    const steps = recordSolveSteps(PUZZLE.map(r => [...r]));
    let i = 0;
    const SPEED = 12; // ms per step
    const SAMPLE = Math.max(1, Math.floor(steps.length / 400)); // sample to show ~400 visual frames

    timerRef.current = setInterval(() => {
      // Advance multiple steps at once for speed
      const end = Math.min(i + SAMPLE, steps.length);
      let lastGrid = null;
      const newCS = {};
      for (let j = i; j < end; j++) {
        const s = steps[j];
        if (!s.back) {
          newCS[`${s.r},${s.c}`] = "filled";
        } else {
          delete newCS[`${s.r},${s.c}`];
        }
      }
      const cur = steps[end - 1];
      if (cur) newCS[`${cur.r},${cur.c}`] = cur.back ? "red" : "green";

      // Build latest grid state
      const gd = PUZZLE.map(r => [...r]);
      for (let j = 0; j < end; j++) {
        const s = steps[j];
        gd[s.r][s.c] = s.v;
      }
      setGrid(gd);
      setCellState(newCS);
      setAttempts(end);
      i = end;

      if (i >= steps.length) {
        clearInterval(timerRef.current);
        setGrid(SOLUTION.map(r => [...r]));
        setCellState({});
        setMode("solved");
      }
    }, SPEED);
  };

  const getCellBg = (r, c) => {
    // Row/col/box highlight during verification
    if (highlight && mode === "verifying") {
      if (highlight.type === "row" && highlight.index === r) return "rgba(52,199,89,0.25)";
      if (highlight.type === "col" && highlight.index === c) return "rgba(52,199,89,0.25)";
      if (highlight.type === "box") {
        const br = Math.floor(r / 3), bc = Math.floor(c / 3);
        if (br * 3 + bc === highlight.index) return "rgba(52,199,89,0.25)";
      }
    }
    const key = `${r},${c}`;
    if (cellState[key] === "green") return "rgba(52,199,89,0.4)";
    if (cellState[key] === "red") return "rgba(255,59,48,0.4)";
    if (cellState[key] === "filled") return "rgba(0,122,255,0.2)";
    if (mode === "verified") return "rgba(52,199,89,0.08)";
    if (mode === "solved") return "rgba(0,122,255,0.08)";
    if (isOriginal(r, c)) return "rgba(255,255,255,0.06)";
    return "rgba(255,255,255,0.02)";
  };

  const getCellColor = (r, c) => {
    if (isOriginal(r, c)) return "#FFFFFF";
    if (mode === "solved") return "#007AFF";
    const key = `${r},${c}`;
    if (cellState[key] === "green") return "#34C759";
    if (cellState[key] === "red") return "#FF3B30";
    if (cellState[key] === "filled") return "#007AFF";
    return "rgba(255,255,255,0.7)";
  };

  return (
    <Section id="sudoku" className="bg-black">
      <Container>
        <SectionHeader
          chapter="Simulation 02 · NP vs P"
          title="Solving vs. Verifying Sudoku"
          subtitle="Checking a complete solution is instant. Finding it from scratch? Thousands of attempts."
        />

        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">
          {/* Sudoku Grid */}
          <GlassCard glowColor={mode === "solved" ? "#007AFF" : mode === "verified" ? "#34C759" : null} className="!p-4 md:!p-6 inline-block">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: 1, background: "rgba(255,255,255,0.15)", padding: 2, borderRadius: 8 }}>
              {grid.map((row, r) =>
                row.map((val, c) => {
                  const thick = (i) => i % 3 === 0 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.08)";
                  return (
                    <div
                      key={`${r}-${c}`}
                      className="sudoku-cell"
                      style={{
                        background: getCellBg(r, c),
                        color: getCellColor(r, c),
                        fontWeight: isOriginal(r, c) ? "600" : "400",
                        borderTop: r % 3 === 0 ? `2px solid ${thick(r)}` : undefined,
                        borderLeft: c % 3 === 0 ? `2px solid ${thick(c)}` : undefined,
                        transition: "background 0.15s ease, color 0.15s ease",
                      }}
                    >
                      {val !== 0 ? val : ""}
                    </div>
                  );
                })
              )}
            </div>
          </GlassCard>

          {/* Controls */}
          <motion.div
            {...FADE_UP}
            className="space-y-5 max-w-sm w-full"
          >
            <GlassCard className="!p-6">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={14} className="text-[#34C759]" />
                <span className="text-white/80 text-sm font-medium font-heading">Verify Solution</span>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-[#34C759]/15 text-[#34C759] font-mono">O(n)</span>
              </div>
              <p className="text-white/50 text-xs mb-4 leading-relaxed font-body">
                Check each row, column, and 3×3 box for validity. Fast, simple, linear time.
              </p>
              <Button
                onClick={verify}
                disabled={mode === "verifying" || mode === "solving"}
                data-testid="sudoku-verify-btn"
                color="#34C759"
                variant={mode === "verifying" ? "outline" : "filled"}
                className="w-full"
              >
                {mode === "verifying" ? "Verifying..." : mode === "verified" ? "✓ Verified!" : "Verify Solution"}
              </Button>
              {mode === "verified" && (
                <p className="text-xs mt-3 text-center text-[#34C759] font-body">
                  Done in 27 checks (9 rows + 9 cols + 9 boxes)
                </p>
              )}
            </GlassCard>

            <GlassCard className="!p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#FF3B30]/15 text-[#FF3B30] font-mono">O(9ⁿ)</span>
                <span className="text-white/80 text-sm font-medium font-heading">Brute Force Solve</span>
              </div>
              <p className="text-white/50 text-xs mb-4 leading-relaxed font-body">
                Try each empty cell with numbers 1-9. Backtrack on dead ends. Watch the attempts skyrocket.
              </p>
              <Button
                onClick={solve}
                disabled={mode === "solving" || mode === "verifying"}
                data-testid="sudoku-solve-btn"
                color="#FF3B30"
                variant={mode === "solving" ? "outline" : "filled"}
                className="w-full"
              >
                {mode === "solving" ? "Solving..." : mode === "solved" ? "Solved!" : "Brute Force Solve"}
              </Button>
              {(mode === "solving" || mode === "solved") && (
                <p className={`text-xs mt-3 text-center font-mono ${mode === "solved" ? "text-[#34C759]" : "text-[#FF9500]"}`}>
                  Attempts: {attempts.toLocaleString()} {mode === "solved" ? "— Done!" : ""}
                </p>
              )}
            </GlassCard>

            <button onClick={resetAll} className="w-full flex items-center justify-center gap-2 py-2 text-white/30 hover:text-white/60 text-sm transition-colors font-body" data-testid="sudoku-reset-btn">
              <RotateCcw size={12} /> Reset puzzle
            </button>

            <div className="p-4 rounded-xl bg-[#FFCC00]/5 border border-[#FFCC00]/15">
              <p className="text-xs text-white/50 leading-relaxed font-mono">
                The verification completes in milliseconds. The solver makes thousands of decisions. Same puzzle — radically different complexity.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
