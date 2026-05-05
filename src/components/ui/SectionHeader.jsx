import React from "react";
import { motion } from "framer-motion";

export const FADE_UP = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: "easeOut" },
};

export function SectionHeader({ chapter, title, subtitle }) {
  return (
    <motion.div
      {...FADE_UP}
      className="text-center mb-16 md:mb-20 flex flex-col items-center"
    >
      <div className="w-16 h-[2px] bg-gradient-to-r from-green-500 to-transparent mb-4" />
      {chapter && (
        <span className="text-xs uppercase tracking-[0.3em] text-white/30 font-mono mb-3 block">
          {chapter}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white font-heading">
        {title}
      </h2>
      {subtitle && (
        <p className="text-white/50 text-lg mt-4 max-w-2xl mx-auto font-body leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
