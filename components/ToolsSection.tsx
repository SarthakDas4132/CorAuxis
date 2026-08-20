"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

const toolCards = [
  {
    name: "Python",
    image: "/images/tools/python.png",
    // Top-left (spread further out)
    positionClass: "top-[4%] sm:top-[6%] left-[2%] sm:left-[5%] lg:left-[7%]",
    rotation: "-rotate-[14deg]",
    animClass: "animate-float-sync",
  },
  {
    name: "FastAPI",
    image: "/images/tools/fastapi.png",
    // Mid-left (spread further out)
    positionClass: "top-[40%] sm:top-[42%] left-[0.5%] sm:left-[2%] lg:left-[3%]",
    rotation: "-rotate-[8deg]",
    animClass: "animate-float-sync",
  },
  {
    name: "React",
    image: "/images/tools/react.svg",
    // Bottom-left (spread further out)
    positionClass: "bottom-[3%] sm:bottom-[5%] left-[2.5%] sm:left-[6%] lg:left-[9%]",
    rotation: "rotate-[8deg]",
    animClass: "animate-float-sync",
  },
  {
    name: "PostgreSQL",
    image: "/images/tools/postgres.png",
    // Top-right (spread further out)
    positionClass: "top-[5%] sm:top-[7%] right-[2%] sm:right-[5%] lg:left-auto lg:right-[7%]",
    rotation: "rotate-[12deg]",
    animClass: "animate-float-sync",
  },
  {
    name: "LangChain",
    image: "/images/tools/langchain.svg",
    // Mid-right (spread further out)
    positionClass: "top-[42%] sm:top-[44%] right-[0.5%] sm:right-[2%] lg:left-auto lg:right-[3%]",
    rotation: "-rotate-[10deg]",
    animClass: "animate-float-sync",
  },
  {
    name: "Flutter",
    image: "/images/tools/flutter.svg",
    // Bottom-right (spread further out)
    positionClass: "bottom-[3%] sm:bottom-[5%] right-[2.5%] sm:right-[6%] lg:left-auto lg:right-[9%]",
    rotation: "rotate-[14deg]",
    animClass: "animate-float-sync",
  },
];

export default function ToolsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("sc-revealed");
          el.classList.remove("sc-hidden");
        } else {
          el.classList.remove("sc-revealed");
          el.classList.add("sc-hidden");
        }
      },
      { threshold: 0.12 }
    );

    el.classList.add("sc-hidden");
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-[#EDECEC] text-zinc-900 py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 overflow-hidden">
      <div className="max-w-[1760px] w-full mx-auto relative min-h-[580px] sm:min-h-[660px] md:min-h-[740px] flex items-center justify-center">
        
        {/* Floating Tool Cards surrounding the center in a wide elliptical orbit */}
        {toolCards.map((tool) => (
          <div
            key={tool.name}
            className={`absolute ${tool.positionClass} z-10`}
          >
            <div className={tool.animClass}>
              <div
                className={`w-18 h-18 sm:w-22 sm:h-22 md:w-26 md:h-26 lg:w-28 lg:h-28 rounded-[22px] sm:rounded-[26px] bg-white border border-white/90 shadow-[0_16px_36px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)] flex items-center justify-center p-3.5 sm:p-4.5 md:p-5 transition-all duration-500 hover:scale-115 hover:shadow-[0_24px_48px_rgba(0,0,0,0.13)] cursor-pointer select-none ${tool.rotation}`}
                title={tool.name}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={tool.image}
                    alt={tool.name}
                    width={56}
                    height={56}
                    className="object-contain max-h-full max-w-full w-auto h-auto drop-shadow-sm pointer-events-none"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Central Content */}
        <div
          ref={sectionRef}
          className="relative z-20 text-center max-w-[560px] mx-auto px-4 py-8 pointer-events-auto"
        >
          {/* Badge with red text */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-zinc-200/90 text-xs font-semibold text-[#FD3A25] tracking-wide shadow-sm mb-6 sm:mb-8">
            <span className="w-2 h-2 rounded-full bg-[#FD3A25]" />
            Tools
          </div>

          {/* Exact 72px Urbanist Heading matching Framer / User Inspect Screenshot */}
          <h2 className="text-[36px] sm:text-[54px] md:text-[72px] font-semibold tracking-[-0.02em] text-[#292C2E] leading-[1.08] font-[family-name:var(--font-urbanist)] max-w-[530px] mx-auto">
            We work with
            <br />
            powerful AI tools
          </h2>

          {/* Exact 16px Urbanist Description matching Framer / User Inspect Screenshot */}
          <p className="mt-5 sm:mt-6 text-[15px] sm:text-[16px] text-[#09090B] font-normal leading-[1.5] max-w-[490px] mx-auto font-[family-name:var(--font-urbanist)]">
            We design, build, and evaluate with a modern AI stack-LLMs, vector search, orchestration, and observability-so your features are fast, reliable, and secure.
          </p>

          {/* CTA Button */}
          <div className="mt-8 sm:mt-10">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#18181b] text-white text-sm font-semibold tracking-wide shadow-[0_12px_28px_rgba(0,0,0,0.22)] hover:bg-[#27272a] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 font-[family-name:var(--font-urbanist)]"
            >
              Get Started
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
