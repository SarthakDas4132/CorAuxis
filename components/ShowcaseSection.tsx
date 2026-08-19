"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const projects = [
  {
    title: "Support Copilot for SaaS",
    description:
      "Draft replies and pulls account context; reduced first-response time by 38%.",
    deliverables: "AI strategy, AI UX flows, LLM agent, RAG",
    industry: "SaaS",
    image: "/images/showcase/project-1.png",
  },
  {
    title: "Underwriting Risk Copilot",
    description:
      "Built a triage assistant to summarize claims; cut manual review time by 42%.",
    deliverables: "Use-case mapping, Prompt & UI patterns",
    industry: "Fintech",
    image: "/images/showcase/project-2.png",
  },
  {
    title: "Clinical Note Summarizer",
    description:
      "Clinic-lobby assistant answering pre-visit questions; decreased front-desk calls by 28%.",
    deliverables: "AI strategy, AI UX flows, LLM agent, RAG",
    industry: "Healthcare",
    image: "/images/showcase/project-3.png",
  },
  {
    title: "Catalog Intelligence Engine",
    description:
      "Launched a shopping copilot that understands attributes; raised add-to-cart by 12%.",
    deliverables: "Data cleaning & embeddings",
    industry: "E-Commerce",
    image: "/images/showcase/project-4.jpg",
  },
];

function useRevealOnScroll(ref: React.RefObject<HTMLElement | null>, prefix: string) {
  const prefixRef = useRef(prefix);
  prefixRef.current = prefix;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const p = prefixRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const px = prefixRef.current;
        if (entry.isIntersecting) {
          el.classList.add(px + "-revealed");
          el.classList.remove(px + "-hidden");
        } else {
          el.classList.remove(px + "-revealed");
          el.classList.add(px + "-hidden");
        }
      },
      { threshold: 0.15 }
    );

    // Set initial hidden class
    el.classList.add(p + "-hidden");
    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}

function ProjectCard({ project, idx }: { project: (typeof projects)[0]; idx: number }) {
  const dotsRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useRevealOnScroll(dotsRef as React.RefObject<HTMLElement>, "sc-dots");
  useRevealOnScroll(metaRef as React.RefObject<HTMLElement>, "sc-meta");

  return (
    <div className="group rounded-[28px] bg-[#f0f0f3] overflow-hidden cursor-pointer border border-white border-b-zinc-300/80 shadow-[inset_0_-6px_0_0_rgba(0,0,0,0.06),0_16px_36px_rgba(0,0,0,0.11),0_4px_12px_rgba(0,0,0,0.06)] transition-shadow duration-500">
      {/* Project Image */}
      <div className="px-4 md:px-6 pt-4 md:pt-6">
        <div className="relative w-full overflow-hidden rounded-[20px]" style={{ aspectRatio: "16/7" }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-[1.025] transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 1760px"
            priority={idx === 0}
          />
          {/* Gloss sweep overlay */}
          <div
            aria-hidden="true"
            className="sc-gloss pointer-events-none absolute inset-0 rounded-[20px]"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-4 md:px-8 pb-6 md:pb-8 mt-5">
        {/* Dot Indicators — animate first */}
        <div ref={dotsRef} className="sc-dots-hidden flex items-center gap-2 mb-4">
          {projects.map((_, dotIdx) => (
            <span
              key={dotIdx}
              className="inline-block w-2 h-2 rounded-full transition-colors"
              style={{ backgroundColor: dotIdx === idx ? "#FD3A25" : "#C0C0C2" }}
            />
          ))}
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-zinc-300/80 mb-5" />

        {/* Metadata Grid — animate after dots */}
        <div
          ref={metaRef}
          className="sc-meta-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.8fr_1.5fr_0.6fr] gap-y-5 gap-x-10 xl:gap-x-16"
        >
          {/* Title */}
          <div>
            <h3 className="text-2xl sm:text-3xl md:text-[28px] font-bold text-zinc-900 tracking-tight leading-[1.2] font-[family-name:var(--font-urbanist)]">
              {project.title}
            </h3>
          </div>

          {/* Description */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400 mb-1.5">
              Description
            </p>
            <p className="text-sm text-zinc-700 font-medium leading-relaxed font-[family-name:var(--font-urbanist)]">
              {project.description}
            </p>
          </div>

          {/* Deliverables */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400 mb-1.5">
              Deliverables
            </p>
            <p className="text-sm text-zinc-700 font-medium leading-relaxed font-[family-name:var(--font-urbanist)]">
              {project.deliverables}
            </p>
          </div>

          {/* Industry */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400 mb-1.5">
              Industry
            </p>
            <p className="text-sm text-zinc-700 font-medium font-[family-name:var(--font-urbanist)]">
              {project.industry}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShowcaseSection() {
  const badgeRef = useRef<HTMLDivElement>(null);
  useRevealOnScroll(badgeRef as React.RefObject<HTMLElement>, "sc");

  return (
    <section
      id="showcase"
      className="relative bg-[#f2f2f4] text-zinc-900 pt-16 md:pt-[100px] pb-20 md:pb-[140px] px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-[1760px] w-full mx-auto">
        {/* Header Badge */}
        <div ref={badgeRef} className="sc-hidden flex justify-center mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FD3A25]" />
            Featured Works
          </div>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-5">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
