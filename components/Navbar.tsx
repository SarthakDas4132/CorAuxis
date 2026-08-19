"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", num: "01", href: "#" },
    { label: "Portfolio", num: "02", href: "#showcase" },
    { label: "About", num: "03", href: "#about" },
    { label: "Contact", num: "04", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md py-4 border-b border-white/10 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="group flex items-center gap-1.5 text-white font-extrabold tracking-[0.2em] text-xl uppercase pointer-events-auto"
        >
          <span className="font-sans text-white text-2xl font-black tracking-[0.18em]">
            COR<span className="text-amber-500 font-mono italic">A</span>UXIS
          </span>
        </a>

        {/* Navigation Links with Floating Numbers */}
        <nav className="flex items-center gap-8 md:gap-12 pointer-events-auto">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative flex items-baseline gap-1 text-slate-200 hover:text-white transition-colors text-sm font-medium tracking-wide"
            >
              <span>{item.label}</span>
              <span className="text-[10px] font-mono text-slate-400 group-hover:text-amber-400 transition-colors">
                {item.num}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-amber-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
