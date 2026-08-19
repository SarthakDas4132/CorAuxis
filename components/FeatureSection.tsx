"use client";

import { Cpu, Layers, Zap, Eye, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Displacement Shaders",
    description:
      "Custom GLSL fragment shaders mapping 2D heightfield displacement textures onto Three.js mesh planes.",
  },
  {
    icon: Zap,
    title: "60 FPS Performance",
    description:
      "Orthographic GPU rendering with dual DPR pixel scaling and minimal re-draw overhead.",
  },
  {
    icon: Eye,
    title: "Layered Z-Index Arc",
    description:
      "Seamless pointer event passthrough letting mouse movements ripple the canvas directly underneath content text.",
  },
  {
    icon: Cpu,
    title: "Lenis Smooth Scroll",
    description:
      "Momentum-based inertia scrolling synchronized across high-refresh rate displays.",
  },
  {
    icon: ShieldCheck,
    title: "Strict Mode Resilient",
    description:
      "Clean double-mount lifecycle cleanup, canvas garbage collection, and responsive viewport re-scaling.",
  },
  {
    icon: Sparkles,
    title: "Single Image Water Morph",
    description:
      "Dual identical texture uniform binding producing pure liquid ripple physics without image switching.",
  },
];

export default function FeatureSection() {
  return (
    <section id="features" className="relative bg-zinc-950 text-white py-32 px-6 md:px-12 border-t border-white/10 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-widest mb-4">
            CORE ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Built for Awwwards-Grade Web Experiences
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg font-light">
            Combining Next.js App Router, Three.js, GSAP, and Tailwind CSS into a production-grade WebGL canvas hero.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/50 hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-1.5"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Metrics Bar */}
        <div className="mt-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-black border border-white/10 flex flex-wrap items-center justify-around gap-8 text-center">
          <div>
            <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono">100%</div>
            <div className="text-xs uppercase tracking-widest text-indigo-300 mt-2 font-mono">Responsive WebGL</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden sm:block" />
          <div>
            <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono">&lt; 16ms</div>
            <div className="text-xs uppercase tracking-widest text-indigo-300 mt-2 font-mono">Frame Render Time</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden sm:block" />
          <div>
            <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono">0ms</div>
            <div className="text-xs uppercase tracking-widest text-indigo-300 mt-2 font-mono">Scroll Latency</div>
          </div>
        </div>
      </div>
    </section>
  );
}
