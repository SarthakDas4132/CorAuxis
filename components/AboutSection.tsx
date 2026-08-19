"use client";

import { useRef, useEffect, useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [translateY, setTranslateY] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [count, setCount] = useState(0);

  // 1. Intersection Observer for viewport trigger (resets when out of view, re-animates on return)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // 2. Count-up animation for "20+" watermark stat
  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

    let startTimestamp: number | null = null;
    let animationFrame: number;
    const duration = 1600; // 1.6s smooth count-up
    const target = 20;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Cubic ease-out for natural slowing effect
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easedProgress * target);
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView]);

  // 3. Lenis-compatible RAF parallax scroll effect for Globe image
  useEffect(() => {
    let animationFrameId: number;

    const updateParallax = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        
        // Active visual window: starts when user arrives at About section (rect.top around 450px)
        // and finishes when the card is centered in view (rect.top around -100px)
        const startPoint = 450;
        const endPoint = -100;
        const totalDist = startPoint - endPoint;

        const rawFraction = (startPoint - rect.top) / totalDist;
        const progress = Math.min(Math.max(rawFraction, 0), 1);

        // At progress 0 (When user arrives): translateY = +300px -> Subtle globe horizon sliver at the bottom edge
        // At progress 1 (When card is centered): translateY = 0px -> Globe rises right under Start a Project button
        const shift = (1 - progress) * 300; 
        setTranslateY(shift);
      }
      animationFrameId = requestAnimationFrame(updateParallax);
    };

    animationFrameId = requestAnimationFrame(updateParallax);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-[#f2f2f4] text-zinc-900 py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      <div className="max-w-[1760px] w-full mx-auto">
        {/* Top Header & Badge */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-200/90 border border-zinc-300/80 text-xs font-semibold text-zinc-700 tracking-wide mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FD3A25]" />
            About Us
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-[54px] font-bold tracking-tight text-zinc-900 max-w-4xl leading-[1.12] font-[family-name:var(--font-urbanist)]">
            Engineering Intelligent Software for Modern Businesses
          </h2>
        </div>

        {/* Bento Grid Layout (7 cols Left / 5 cols Right Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-7 items-stretch">
          {/* Left Dark Globe Card (7 cols - Larger Width) */}
          <div className="lg:col-span-7 rounded-[32px] bg-[#0c0c0e] text-white p-8 sm:p-10 md:p-12 flex flex-col justify-between relative overflow-hidden min-h-[580px] sm:min-h-[620px] shadow-xl">
            {/* Top Badge, Headline & CTA Button */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-medium text-white/90 mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#FD3A25] animate-pulse" />
                Available for worldwide project
              </div>

              {/* Exact typography matching Image 3: 32px Urbanist font & #FD3A25 red accent */}
              <h3 className="text-[32px] sm:text-[36px] font-bold tracking-tight text-white leading-snug font-[family-name:var(--font-urbanist)]">
                Based in <span className="text-[#FD3A25]">Montréal, Canada</span>
              </h3>

              {/* Capsule CTA Button - Exact 3D Popping Out Effect matching screenshot */}
              <a
                href="#contact"
                className="mt-6 px-8 py-3 rounded-full bg-gradient-to-b from-[#2a2a2e] to-[#121215] text-white text-xs sm:text-sm font-semibold tracking-wide border border-white/25 shadow-[0_12px_24px_-4px_rgba(0,0,0,0.8),0_4px_8px_-2px_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 hover:from-[#323238] hover:to-[#18181c]"
              >
                Start a Project
              </a>
            </div>

            {/* Moving Globe + Aura Container - Rises smoothly from bottom edge up to Start a Project button */}
            <div
              className="absolute -bottom-[580px] sm:-bottom-[600px] md:-bottom-[620px] left-1/2 w-[145%] sm:w-[135%] md:w-[125%] max-w-[1000px] aspect-square pointer-events-none z-0"
              style={{
                transform: `translate3d(-50%, ${translateY}px, 0)`,
              }}
            >
              {/* Soft Radiant White Aura Layers around the dome */}
              <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[110%] h-[50%] bg-white/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[85%] h-[35%] bg-white/35 rounded-full blur-[65px] pointer-events-none" />

              <Image
                src="/images/globe.png"
                alt="Dotted Globe Horizon"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  filter: "drop-shadow(0 -10px 35px rgba(255, 255, 255, 0.45))",
                }}
                priority
              />
            </div>
          </div>

          {/* Right Cards Stack (5 cols - Narrower Width) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Top Light Card - Exact 2D/3D Beveled Bottom Edge & Drop Shadow */}
            <div className="relative rounded-[32px] bg-[#f0f0f3] border border-white border-b-zinc-300/80 p-8 sm:p-10 md:p-11 flex flex-col justify-between overflow-hidden shadow-[inset_0_-6px_0_0_rgba(0,0,0,0.06),0_16px_36px_rgba(0,0,0,0.11),0_4px_12px_rgba(0,0,0,0.06)] min-h-[290px]">
              {/* Giant Background Watermark Animated Counter */}
              <span className="absolute right-6 sm:right-8 bottom-2 sm:bottom-3 md:bottom-4 text-[120px] sm:text-[145px] md:text-[160px] font-black text-[#d8d8de]/75 select-none pointer-events-none font-[family-name:var(--font-urbanist)] leading-none tracking-tighter transition-all duration-300">
                {count}+
              </span>

              <p className="relative z-10 text-base sm:text-xl text-zinc-800 font-medium leading-relaxed max-w-xl font-[family-name:var(--font-urbanist)]">
                CorAuxis is an AI Automation and Software Development company helping businesses streamline operations, eliminate repetitive work, and accelerate growth through intelligent technology.
              </p>

              {/* Trustpilot Widget (Vertical Stacked Layout matching user screenshot) */}
              <div className="relative z-10 mt-10 sm:mt-12 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-[#00b67a] text-[#00b67a]" />
                  <span className="text-sm font-bold text-zinc-900 tracking-tight font-[family-name:var(--font-urbanist)]">
                    Trustpilot
                  </span>
                </div>
                {/* 5 Rating Box Stars */}
                <div className="flex items-center gap-[3px]">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 bg-[#373943] flex items-center justify-center rounded-[2px]"
                    >
                      <Star className="w-3 h-3 fill-white text-white" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Quote Card - Exact 2D/3D Beveled Bottom Edge & Drop Shadow */}
            <div className="rounded-[32px] bg-[#f0f0f3] border border-white border-b-zinc-300/80 p-8 sm:p-10 md:p-11 flex flex-col justify-between shadow-[inset_0_-6px_0_0_rgba(0,0,0,0.06),0_16px_36px_rgba(0,0,0,0.11),0_4px_12px_rgba(0,0,0,0.06)] min-h-[200px]">
              <div>
                <span className="text-4xl text-zinc-400 font-serif leading-none block mb-2 select-none">
                  &ldquo;
                </span>
                <blockquote className="text-lg sm:text-xl font-semibold text-zinc-900 tracking-tight leading-snug font-[family-name:var(--font-urbanist)]">
                  AI Isn&apos;t about replacement it&apos;s about smarter management,
                </blockquote>
              </div>

              {/* Stat Footer */}
              <div className="mt-6 pt-6 border-t border-zinc-300/80 flex items-center gap-3 font-[family-name:var(--font-urbanist)]">
                <span className="text-sm font-bold text-zinc-900 font-mono">
                  100%
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  Custom Build
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
