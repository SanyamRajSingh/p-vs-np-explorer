import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "./ui";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let frame = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 200;
    const particles = Array.from({ length: N }, (_, i) => {
      const cols = 16, rows = Math.ceil(N / cols);
      const col = i % cols, row = Math.floor(i / cols);
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        tx: ((col + 0.5) / cols) * canvas.width,
        ty: ((row + 0.5) / rows) * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        r: Math.random() * 1.8 + 0.6,
        speed: 0.012 + Math.random() * 0.015,
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      const organizeStart = 80, fullOrganize = 300;
      const t = Math.min(Math.max((frame - organizeStart) / (fullOrganize - organizeStart), 0), 1);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      particles.forEach((p) => {
        if (frame < organizeStart) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        } else {
          p.x += (p.tx - p.x) * p.speed;
          p.y += (p.ty - p.y) * p.speed;
        }
        const opacity = 0.15 + eased * 0.45;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const stagger = (i) => ({ initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: i * 0.18, ease: "easeOut" } });

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.25 }} />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />

      <Container className="relative z-10 text-center">
        <motion.div {...stagger(0)} className="mb-6">
          <span className="text-xs uppercase tracking-[0.3em] text-white/40 font-mono">
            Computer Science · Complexity Theory · Millennium Prize
          </span>
        </motion.div>

        <motion.h1
          {...stagger(1)}
          className="text-5xl md:text-7xl font-light tracking-tighter leading-[1.05] text-white mb-6 font-heading"
        >
          P vs NP:
          <br />
          <span className="text-[#FFCC00]">The Question That</span>
          <br />
          Could Break the Internet
        </motion.h1>

        <motion.p
          {...stagger(2)}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed font-body"
        >
          Can every problem that is easy to check also be easy to solve?
          <br />
          <span className="text-white/40 text-base">One of the greatest unsolved mysteries in mathematics.</span>
        </motion.p>

        <motion.div {...stagger(3)} className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {[
            { label: "P", cls: "text-[#34C759] border-[#34C759]/40 bg-[#34C759]/15" },
            { label: "NP", cls: "text-[#007AFF] border-[#007AFF]/40 bg-[#007AFF]/15" },
            { label: "NP-Complete", cls: "text-[#FF9500] border-[#FF9500]/40 bg-[#FF9500]/15" },
            { label: "NP-Hard", cls: "text-[#FF3B30] border-[#FF3B30]/40 bg-[#FF3B30]/15" },
          ].map(({ label, cls }) => (
            <span
              key={label}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border font-mono ${cls}`}
            >
              {label}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs tracking-widest font-mono">
            SCROLL TO DISCOVER
          </span>
          <ChevronDown size={18} className="animate-bounce" />
        </motion.div>
      </Container>
    </section>
  );
}
