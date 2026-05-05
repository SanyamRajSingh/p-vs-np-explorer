import React from "react";

export function Button({
  children,
  variant = "default",
  color = "#ffffff",
  className = "",
  disabled = false,
  ...props
}) {
  let style = {};

  if (variant === "outline") {
    style = {
      background: `${color}15`,
      color: color,
      border: `1px solid ${color}40`,
    };
  } else if (variant === "filled") {
    style = {
      background: `${color}20`,
      color: color,
      border: `1px solid ${color}50`,
    };
  } else {
    style = {
      background: "rgba(255,255,255,0.05)",
      color: "rgba(255,255,255,0.7)",
      border: "1px solid rgba(255,255,255,0.1)",
    };
  }

  return (
    <button
      disabled={disabled}
      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all font-mono flex items-center justify-center gap-2 ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-110 active:scale-95"
      } ${className}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}
