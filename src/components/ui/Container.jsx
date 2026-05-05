import React from "react";

export function Container({ className = "", children, ...props }) {
  return (
    <div
      className={`max-w-7xl mx-auto px-6 md:px-12 w-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
