"use client";

import { useState } from "react";

export default function Footer() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    category: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer
      id="contact"
      className="relative bg-[#09090b] text-white pt-20 sm:pt-28 md:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden select-none"
    >
      <div className="max-w-[1760px] w-full mx-auto">
        
        {/* ========================================================
            TOP SECTION: Contact Form Block (2 Columns)
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          
          {/* Left Column: Dark box with Minimalist Stepped Icon */}
          <div className="lg:col-span-5 hidden sm:flex items-center justify-center rounded-[28px] bg-[#121215] border border-white/5 min-h-[380px] lg:min-h-[520px] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* Stepped pixel icon */}
              <div className="relative w-12 h-12">
                <span className="absolute top-0 right-0 w-6 h-6 bg-white rounded-[3px]" />
                <span className="absolute bottom-0 left-0 w-3.5 h-3.5 bg-white rounded-[2px]" />
                <span className="absolute bottom-3.5 left-3.5 w-3.5 h-3.5 bg-white rounded-[2px]" />
              </div>
            </div>
          </div>

          {/* Right Column: Get In Touch Form */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2 sm:py-4">
            <div>
              {/* Heading with Closing Quotation */}
              <h2 className="text-4xl sm:text-5xl md:text-[64px] font-bold text-white tracking-tight leading-[1.08] font-[family-name:var(--font-urbanist)]">
                Get In Touch”
              </h2>
              
              {/* Subheading */}
              <p className="mt-3 text-sm sm:text-base text-zinc-400 font-medium leading-relaxed font-[family-name:var(--font-urbanist)]">
                Let&apos;s Build someting great together! Audit and entire structur in next 24hrs.
              </p>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="mt-10 sm:mt-12 flex flex-col gap-8">
              
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-10">
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 font-[family-name:var(--font-urbanist)]">
                    First Name*
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jim"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-zinc-700/80 pb-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors font-medium font-[family-name:var(--font-urbanist)]"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 font-[family-name:var(--font-urbanist)]">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Hopper"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-zinc-700/80 pb-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors font-medium font-[family-name:var(--font-urbanist)]"
                  />
                </div>
              </div>

              {/* Row 2: Category & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-10">
                <div className="flex flex-col relative">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 font-[family-name:var(--font-urbanist)]">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-zinc-700/80 pb-2.5 text-sm text-white focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer font-medium font-[family-name:var(--font-urbanist)] pr-8"
                    >
                      <option value="" className="bg-[#121215] text-zinc-400">
                        Select
                      </option>
                      <option value="AI Strategy & Mapping" className="bg-[#121215] text-white">
                        AI Strategy &amp; Mapping
                      </option>
                      <option value="AI UX & Product Design" className="bg-[#121215] text-white">
                        AI UX &amp; Product Design
                      </option>
                      <option value="LLM / Agent Development" className="bg-[#121215] text-white">
                        LLM / Agent Development
                      </option>
                      <option value="Data Engineering & Pipelines" className="bg-[#121215] text-white">
                        Data Engineering &amp; Pipelines
                      </option>
                      <option value="Art Direction" className="bg-[#121215] text-white">
                        Art Direction
                      </option>
                    </select>
                    {/* Down Chevron icon */}
                    <span className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 text-xs">
                      ▼
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 font-[family-name:var(--font-urbanist)]">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="fuel@mail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-zinc-700/80 pb-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors font-medium font-[family-name:var(--font-urbanist)]"
                  />
                </div>
              </div>

              {/* Row 3: Message */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 font-[family-name:var(--font-urbanist)]">
                  Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter your message....."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-zinc-700/80 pb-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors resize-none font-medium font-[family-name:var(--font-urbanist)]"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl sm:rounded-2xl bg-[#222225] hover:bg-[#2e2e34] active:scale-[0.99] text-white font-medium text-sm sm:text-base tracking-wide transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.3)] font-[family-name:var(--font-urbanist)]"
                >
                  {submitted ? "Message Sent Successfully!" : "Submit"}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* ========================================================
            SEPARATOR
           ======================================================== */}
        <div className="w-full h-px bg-zinc-800/80 my-16 sm:my-24 md:my-28" />

        {/* ========================================================
            MIDDLE SECTION: Let's Work Together & Navigation Links
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start justify-between">
          
          {/* Left Column: Direct Contact & CTA Link */}
          <div className="lg:col-span-8">
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-medium text-zinc-400 tracking-tight font-[family-name:var(--font-urbanist)]">
              Let’s work together
            </h3>
            
            <a
              href="mailto:contact@corauxis.com"
              className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-white tracking-tight leading-tight block mt-1 hover:text-zinc-300 transition-colors font-[family-name:var(--font-urbanist)] break-all sm:break-normal"
            >
              contact@corauxis.com
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-3 mt-7 pb-1 border-b border-white text-white text-sm sm:text-base font-semibold tracking-wide group hover:gap-4 transition-all font-[family-name:var(--font-urbanist)]"
            >
              <span>Contact Now</span>
              <span className="text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ┐
              </span>
            </a>
          </div>

          {/* Right Column: Navigation List */}
          <div className="lg:col-span-4 w-full flex flex-col">
            {[
              { label: "Home", num: "01", href: "#" },
              { label: "Portfolio", num: "02", href: "#showcase" },
              { label: "About", num: "03", href: "#about" },
              { label: "Contact", num: "04", href: "#contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center justify-between py-3.5 border-b border-zinc-800/80 group hover:border-zinc-500 transition-colors"
              >
                <span className="text-white text-sm sm:text-base font-semibold group-hover:translate-x-1 transition-transform font-[family-name:var(--font-urbanist)]">
                  {link.label}
                </span>
                <span className="text-zinc-500 text-xs font-mono">
                  {link.num}
                </span>
              </a>
            ))}
          </div>

        </div>

        {/* ========================================================
            DECORATIVE MARKS ROW (+ ❖ +)
           ======================================================== */}
        <div className="flex items-center justify-between px-4 sm:px-12 md:px-24 mt-16 sm:mt-20 md:mt-24 text-zinc-600 select-none">
          <span className="text-xl sm:text-2xl font-light">+</span>
          <span className="text-lg sm:text-xl font-light">❖</span>
          <span className="text-xl sm:text-2xl font-light">+</span>
        </div>

        {/* ========================================================
            SEPARATOR ABOVE GIANT WORDMARK
           ======================================================== */}
        <div className="w-full h-px bg-zinc-800/80 mt-8 mb-10 sm:mb-14" />

        {/* ========================================================
            BOTTOM: Giant COR-AUXIS Wordmark & Inline Copyright Meter
           ======================================================== */}
        <div className="relative w-full flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-2 sm:pt-4">
          {/* Giant Brand Name */}
          <h1 className="text-[14vw] sm:text-[11.5vw] md:text-[11.8vw] lg:text-[11.2vw] font-bold text-white tracking-tighter leading-[0.82] select-none uppercase font-[family-name:var(--font-urbanist)] opacity-95 shrink min-w-0">
            COR-AUXIS
          </h1>

          {/* Bottom Right Copyright & Precision Meter */}
          <div className="flex items-end gap-2.5 shrink-0 sm:pb-2.5 md:pb-3.5 text-white/80 text-[11px] sm:text-xs font-mono select-none">
            <span className="tracking-wide">© 2026</span>
            
            {/* Precision Tick Marks */}
            <div className="flex items-end gap-[3px] h-[20px] px-0.5 mb-[2px]">
              <span className="w-[1px] h-[7px] bg-white/35" />
              <span className="w-[1px] h-[7px] bg-white/35" />
              <span className="w-[1px] h-[7px] bg-white/35" />
              <span className="w-[1px] h-[7px] bg-white/35" />
              <span className="w-[1px] h-[7px] bg-white/35" />
              <span className="w-[1px] h-[7px] bg-white/35" />
              <span className="w-[1px] h-[20px] bg-white/80" />
              <span className="w-[1px] h-[7px] bg-white/35" />
            </div>

            <span className="tracking-wide">19&apos;</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
