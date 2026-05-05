import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Story", href: "#story" },
  { label: "P & NP", href: "#definitions" },
  { label: "Venn", href: "#venn" },
  { label: "TSP Demo", href: "#tsp" },
  { label: "Sudoku", href: "#sudoku" },
  { label: "Playground", href: "#playground" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50">
        <div
          className="h-full"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg,#34C759,#007AFF,#FF9500,#FF3B30)",
            transition: "width 0.1s linear",
          }}
        />
      </div>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-2 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-black/80 backdrop-blur-2xl border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-white font-medium tracking-tight text-lg font-heading"
            data-testid="navbar-logo"
          >
            P vs <span className="text-[#FFCC00]">NP</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="text-xs uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors font-mono"
                data-testid={`nav-${l.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button className="md:hidden text-white" onClick={() => setOpen(!open)} data-testid="nav-mobile-toggle">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-black/95 border-b border-white/10 px-6 overflow-hidden"
            >
              {links.map((l) => (
                <button
                  key={l.label}
                  onClick={() => scrollTo(l.href)}
                  className="block w-full text-left py-3 text-sm text-white/70 hover:text-white border-b border-white/5"
                >
                  {l.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
