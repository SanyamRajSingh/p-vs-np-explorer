import React from "react";

export function Section({ id, className = "", children, ...props }) {
  return (
    <section
      id={id}
      className={`py-24 md:py-40 relative w-full ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
