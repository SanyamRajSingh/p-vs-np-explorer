import React from "react";
import { motion } from "framer-motion";

export function GlassCard({
  className = "",
  children,
  delay = 0,
  hover = true,
  glowColor = null,
  ...props
}) {
  const hoverEffect = hover ? { whileHover: { y: -6, scale: 1.01 } } : {};
  const glowStyle = glowColor ? { boxShadow: `0 0 40px ${glowColor}15` } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      {...hoverEffect}
      className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 ${className}`}
      style={{ ...glowStyle, ...props.style }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
