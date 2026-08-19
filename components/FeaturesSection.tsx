"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Bot, UserCheck, ClipboardCheck, ShieldCheck, FileText, PlugZap } from "lucide-react";

interface FeatureCard {
  id: string;
  icon: typeof Bot;
  title: string;
  description: string;
}

const leftFeatures: FeatureCard[] = [
  {
    id: "agent-workflows",
    icon: Bot,
    title: "Agent-Powered Workflows",
    description:
      "Turn repetitive tasks into autonomous flows—agents plan, execute, and report with guardrails, audit trails, and clear handoff to humans.",
  },
  {
    id: "eval-quality",
    icon: ClipboardCheck,
    title: "Eval-First Quality",
    description:
      "Measure accuracy, latency, safety, and cost from day one. Our evals and dashboards keep models reliable and budgets predictable.",
  },
  {
    id: "private-rag",
    icon: FileText,
    title: "Private Knowledge RAG",
    description:
      "Make your docs, tickets, and wikis instantly useful with retrieval augmented generation—freshness, citations, and explainability built in.",
  },
];

const rightFeatures: FeatureCard[] = [
  {
    id: "human-ux",
    icon: UserCheck,
    title: "Human-Centered AI UX",
    description:
      "Interfaces, prompts, and error states designed for trust and adoption—so the smart thing is also the obvious thing to do.",
  },
  {
    id: "secure-design",
    icon: ShieldCheck,
    title: "Secure by Design",
    description:
      "PII handling, SSO/SAML, RBAC, secrets management, and compliance workflows—ship AI that's safe, auditable, and enterprise-ready.",
  },
  {
    id: "integrations",
    icon: PlugZap,
    title: "Seamless Integrations",
    description:
      "Plug into your stack (CRM, helpdesk, ERP, data warehouse) with webhooks and APIs to turn insights into action—fast.",
  },
];

// Left pipe paths (320x960 coordinate space)
const pathLeftTop = "M 160 480 L 64 480 L 64 180 Q 64 160 44 160 L -10 160";
const pathLeftMid = "M 160 480 L 64 480 L -10 480";
const pathLeftBot = "M 160 480 L 64 480 L 64 780 Q 64 800 44 800 L -10 800";

// Right pipe paths (320x960 coordinate space)
const pathRightTop = "M 160 480 L 256 480 L 256 180 Q 256 160 276 160 L 330 160";
const pathRightMid = "M 160 480 L 256 480 L 330 480";
const pathRightBot = "M 160 480 L 256 480 L 256 780 Q 256 800 276 800 L 330 800";

const pipeTreePath = `${pathLeftTop} ${pathLeftMid} ${pathLeftBot} ${pathRightTop} ${pathRightMid} ${pathRightBot}`;

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Continuous Framer-style Lenis RAF scroll-linked parallax animation across entire section
  useEffect(() => {
    let animationFrameId: number;

    const updateScrollMotion = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Continuous parallax across entire viewport traverse (never freezes)
        const totalDist = windowHeight + rect.height;
        const rawProgress = (windowHeight - rect.top) / totalDist;
        const progress = Math.min(Math.max(rawProgress, 0), 1);
        setScrollProgress(progress);
      }
      animationFrameId = requestAnimationFrame(updateScrollMotion);
    };

    animationFrameId = requestAnimationFrame(updateScrollMotion);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative bg-[#f2f2f4] text-zinc-900 py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      <div className="max-w-[1440px] w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-200/90 border border-zinc-300/80 text-xs font-semibold text-zinc-700 tracking-wide mb-6 shadow-sm w-fit">
            <span className="w-2 h-2 rounded-full bg-[#FD3A25]" />
            Features
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-[56px] font-bold tracking-tight text-zinc-900 leading-[1.08] font-[family-name:var(--font-urbanist)] max-w-2xl">
            All Features in One
          </h2>
        </div>

        {/* 3-Part Flexible Network Bento Layout with Wide Gap */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-0">
          {/* Left Column (3 Shorter Width & Taller Height Cards with Continuous Parallax) */}
          <div className="w-full lg:w-[390px] flex flex-col gap-10 sm:gap-12 md:gap-14 shrink-0 z-10">
            {leftFeatures.map((item, idx) => {
              const Icon = item.icon;
              // Continuous smooth Framer-style cascading scroll parallax
              const translateYOffset = (0.5 - scrollProgress) * (75 + idx * 50);

              return (
                <div
                  key={item.id}
                  className="relative rounded-[32px] bg-[#f0f0f3] border border-white border-b-zinc-300/80 p-8 sm:p-9 md:p-10 shadow-[inset_0_-6px_0_0_rgba(0,0,0,0.06),0_16px_36px_rgba(0,0,0,0.11),0_4px_12px_rgba(0,0,0,0.06)] min-h-[290px] flex flex-col justify-start will-change-transform select-none"
                  style={{
                    transform: `translate3d(0, ${translateYOffset}px, 0)`,
                  }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#1c1c20] text-white flex items-center justify-center mb-6 shadow-md shrink-0">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="text-2xl sm:text-[25px] font-bold text-zinc-900 tracking-tight font-[family-name:var(--font-urbanist)] mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-zinc-600 font-medium leading-relaxed font-[family-name:var(--font-urbanist)]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Center Column: Hub & Wide Branching Connector Lines with Continuous Parallax */}
          <div
            className="flex-1 w-full relative flex items-center justify-center min-h-[180px] lg:min-h-[960px] self-stretch will-change-transform"
            style={{
              transform: `translate3d(0, ${(0.5 - scrollProgress) * 125}px, 0)`,
            }}
          >
            {/* SVG Connecting Branches with Physically Synchronized Flow */}
            <svg
              className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 320 960"
            >
              {/* Static Base Guide Pipe Network (Subtle red continuous tracks) */}
              <path
                d={pipeTreePath}
                fill="none"
                stroke="#FD3A25"
                strokeWidth="1.5"
                strokeOpacity="0.25"
                vectorEffect="non-scaling-stroke"
              />

              {/* Active Fluid Streams flowing continuously from AgenAI through true path curves */}
              {/* Left Branches */}
              <path
                d={pathLeftTop}
                fill="none"
                stroke="#FD3A25"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="anim-batch-top-bot"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={pathLeftMid}
                fill="none"
                stroke="#FD3A25"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="anim-batch-mid"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={pathLeftBot}
                fill="none"
                stroke="#FD3A25"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="anim-batch-top-bot"
                vectorEffect="non-scaling-stroke"
              />

              {/* Right Branches */}
              <path
                d={pathRightTop}
                fill="none"
                stroke="#FD3A25"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="anim-batch-top-bot"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={pathRightMid}
                fill="none"
                stroke="#FD3A25"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="anim-batch-mid"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={pathRightBot}
                fill="none"
                stroke="#FD3A25"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="anim-batch-top-bot"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Crisp Circular Junction Dots on left & right branch bars */}
            <div className="hidden lg:block absolute left-[20%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#FD3A25] shadow-[0_0_8px_rgba(253,58,37,0.8)] z-10 pointer-events-none" />
            <div className="hidden lg:block absolute left-[80%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#FD3A25] shadow-[0_0_8px_rgba(253,58,37,0.8)] z-10 pointer-events-none" />

            {/* Center Glowing Red Hub Card with AgenAI Branding */}
            <div className="relative z-10 w-44 sm:w-48 h-32 sm:h-36 rounded-[28px] bg-[#FD3A25] text-white flex flex-col items-center justify-center shadow-[0_16px_40px_rgba(253,58,37,0.45)] border border-red-400/30 select-none">
              {/* AgenAI Overlapping Circles Logo */}
              <div className="relative w-12 h-8 mb-2">
                <Image
                  src="/images/features/agenai-logo.png"
                  alt="AgenAI Logo"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <span className="font-bold text-lg sm:text-xl text-white tracking-tight font-[family-name:var(--font-urbanist)]">
                AgenAI
              </span>
            </div>
          </div>

          {/* Right Column (3 Shorter Width & Taller Height Cards with Continuous Parallax) */}
          <div className="w-full lg:w-[390px] flex flex-col gap-10 sm:gap-12 md:gap-14 shrink-0 z-10">
            {rightFeatures.map((item, idx) => {
              const Icon = item.icon;
              // Continuous smooth Framer-style cascading scroll parallax
              const translateYOffset = (0.5 - scrollProgress) * (75 + idx * 50);

              return (
                <div
                  key={item.id}
                  className="relative rounded-[32px] bg-[#f0f0f3] border border-white border-b-zinc-300/80 p-8 sm:p-9 md:p-10 shadow-[inset_0_-6px_0_0_rgba(0,0,0,0.06),0_16px_36px_rgba(0,0,0,0.11),0_4px_12px_rgba(0,0,0,0.06)] min-h-[290px] flex flex-col justify-start will-change-transform select-none"
                  style={{
                    transform: `translate3d(0, ${translateYOffset}px, 0)`,
                  }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#1c1c20] text-white flex items-center justify-center mb-6 shadow-md shrink-0">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="text-2xl sm:text-[25px] font-bold text-zinc-900 tracking-tight font-[family-name:var(--font-urbanist)] mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-zinc-600 font-medium leading-relaxed font-[family-name:var(--font-urbanist)]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
