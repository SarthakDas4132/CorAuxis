"use client";

import React, { useRef } from "react";
import "./LiquidHover.css";

interface LiquidHoverProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function LiquidHover({
  children = "Hover me",
  className = "",
  ...props
}: LiquidHoverProps) {
  const elementRef = useRef<HTMLButtonElement>(null);

  function handleMove(event: React.MouseEvent<HTMLButtonElement>) {
    const element = elementRef.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    element.style.setProperty("--pointer-x", `${x}%`);
    element.style.setProperty("--pointer-y", `${y}%`);
  }

  return (
    <button
      ref={elementRef}
      className={`liquid-hover ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        elementRef.current?.style.setProperty("--pointer-x", "50%");
        elementRef.current?.style.setProperty("--pointer-y", "50%");
      }}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
}
