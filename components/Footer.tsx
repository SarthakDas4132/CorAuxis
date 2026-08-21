"use client";

import { useState, useEffect } from "react";

export default function Footer() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    category: "",
    email: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [loadTime, setLoadTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{
    type: "success" | "error" | "";
    text: string;
  }>({ type: "", text: "" });

  useEffect(() => {
    setLoadTime(Date.now());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg({ type: "", text: "" });

    // Anti-spam honeypot
    if (honeypot) {
      return;
    }

    // Minimum message length check (at least 15 characters)
    if (formData.message.trim().length < 15) {
      setStatusMsg({
        type: "error",
        text: "Please write at least 15 characters in your message.",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          hp_field: honeypot,
          loadTime,
        }),
      });

      const data = await res.json();

      if (res.ok && !data.error) {
        setStatusMsg({
          type: "success",
          text: "Message sent successfully to sarthak.zfi@gmail.com! We will get back to you within 24 hours.",
        });
        setFormData({
          firstName: "",
          lastName: "",
          category: "",
          email: "",
          message: "",
        });
      } else {
        setStatusMsg({
          type: "error",
          text: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch {
      setStatusMsg({
        type: "error",
        text: "Network error. You can also reach out directly to sarthak.zfi@gmail.com",
      });
    } finally {
      setLoading(false);
    }
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
                Let&apos;s build something great together! Audit and entire structure in next 24hrs.
              </p>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="mt-10 sm:mt-12 flex flex-col gap-8">
              
              {/* Anti-Spam Honeypot Field (Hidden from humans) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company_hp">Do not fill this field</label>
                <input
                  type="text"
                  id="company_hp"
                  name="company_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-10">
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 font-[family-name:var(--font-urbanist)]">
                    First Name*
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
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
                    name="lastName"
                    autoComplete="family-name"
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

              {/* Row 2: Category & Email with Browser Auto-fill */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-10">
                <div className="flex flex-col relative">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 font-[family-name:var(--font-urbanist)]">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      name="category"
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
                    Your Email Address*
                  </label>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-zinc-700/80 pb-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors font-medium font-[family-name:var(--font-urbanist)]"
                  />
                </div>
              </div>

              {/* Row 3: Message with Minimum Length Constraint (15+ characters) */}
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-[family-name:var(--font-urbanist)]">
                    Message*
                  </label>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    min. 15 characters ({formData.message.trim().length}/15)
                  </span>
                </div>
                <textarea
                  name="message"
                  required
                  minLength={15}
                  rows={3}
                  placeholder="Tell us about your project or inquiry (minimum 15 characters)....."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-zinc-700/80 pb-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors resize-none font-medium font-[family-name:var(--font-urbanist)]"
                />
              </div>

              {/* Status Message Notification */}
              {statusMsg.text && (
                <div
                  className={`p-3.5 rounded-xl text-xs sm:text-sm font-medium font-[family-name:var(--font-urbanist)] transition-all ${
                    statusMsg.type === "success"
                      ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30"
                      : "bg-red-950/80 text-red-300 border border-red-500/30"
                  }`}
                >
                  {statusMsg.text}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl sm:rounded-2xl bg-[#222225] hover:bg-[#2e2e34] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm sm:text-base tracking-wide transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.3)] font-[family-name:var(--font-urbanist)] flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    "Submit"
                  )}
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
            MIDDLE SECTION: Contact Details & Navigation Columns
           ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 items-start justify-between">
          
          {/* Left Column (6 cols): Direct Contact Information & CTA */}
          <div className="lg:col-span-6 flex flex-col gap-7">
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight font-[family-name:var(--font-urbanist)]">
                Let’s work together
              </h3>
              <a
                href="mailto:sarthak.zfi@gmail.com"
                className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight block mt-2 hover:text-[#FD3A25] transition-colors font-[family-name:var(--font-urbanist)] break-all"
              >
                sarthak.zfi@gmail.com
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
              {/* Phone */}
              <div className="flex flex-col">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-[family-name:var(--font-urbanist)] mb-1.5">
                  PHONE
                </span>
                <a
                  href="tel:+919209552809"
                  className="text-sm sm:text-base text-zinc-300 hover:text-white font-medium transition-colors font-[family-name:var(--font-urbanist)]"
                >
                  +91-9209552809
                </a>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-[family-name:var(--font-urbanist)] mb-1.5">
                  EMAIL
                </span>
                <a
                  href="mailto:support@m-auxis.com"
                  className="text-sm sm:text-base text-zinc-300 hover:text-white font-medium transition-colors font-[family-name:var(--font-urbanist)]"
                >
                  support@m-auxis.com
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-[family-name:var(--font-urbanist)] mb-1.5">
                ADDRESS
              </span>
              <p className="text-sm sm:text-base text-zinc-300 font-medium leading-relaxed font-[family-name:var(--font-urbanist)] max-w-md">
                12th floor, One West, Balewadi High St,<br />
                Balewadi, Pune, Maharashtra 411045
              </p>
            </div>

            <div className="pt-1">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 pb-1 border-b border-white text-white text-sm sm:text-base font-semibold tracking-wide group font-[family-name:var(--font-urbanist)]"
              >
                <span>Contact Now</span>
                <span className="text-xs inline-block -translate-y-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-2">
                  ┐
                </span>
              </a>
            </div>
          </div>

          {/* Middle Navigation Column (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3.5">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-[family-name:var(--font-urbanist)] mb-1">
              SERVICES
            </span>
            {[
              { label: "SERVICES", href: "#showcase" },
              { label: "PROCESS", href: "#features" },
              { label: "REVIEWS", href: "#about" },
              { label: "ABOUT", href: "#about" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm sm:text-base font-semibold text-zinc-300 hover:text-white transition-colors py-0.5 font-[family-name:var(--font-urbanist)] uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Socials Column (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3.5">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-[family-name:var(--font-urbanist)] mb-1">
              CONNECT
            </span>
            {[
              { label: "LINKEDIN", href: "https://linkedin.com" },
              { label: "FACEBOOK", href: "https://facebook.com" },
              { label: "TWITTER", href: "https://x.com" },
              { label: "INSTAGRAM", href: "https://instagram.com" },
              { label: "YOUTUBE", href: "https://youtube.com" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base font-semibold text-zinc-300 hover:text-white transition-colors py-0.5 font-[family-name:var(--font-urbanist)] uppercase tracking-wider flex items-center justify-between group"
              >
                <span>{social.label}</span>
                <span className="text-xs text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 transition-all">↗</span>
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
            BOTTOM: Giant CORAUXIS Brand Logo & Inline Copyright Meter
           ======================================================== */}
        <div className="relative w-full flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-2 sm:pt-4">
          {/* Giant Brand Logo */}
          <div className="shrink min-w-0 max-w-[85vw] sm:max-w-[70vw]">
            <img
              src="/images/logo.png"
              alt="CORAUXIS Logo"
              className="h-14 sm:h-20 md:h-24 lg:h-32 w-auto object-contain select-none"
            />
          </div>

          {/* Bottom Right Copyright & Precision Meter */}
          <div className="flex items-end gap-3 shrink-0 sm:pb-2.5 md:pb-3.5 text-white/90 text-xs sm:text-sm font-mono select-none">
            <span className="tracking-wide">© 2026</span>
            
            {/* Precision Tick Marks (Expanded length & distinct tall tick) */}
            <div className="flex items-end gap-1 h-[22px] px-0.5 mb-[2px]">
              <span className="w-[1px] h-[8px] bg-white/40" />
              <span className="w-[1px] h-[8px] bg-white/40" />
              <span className="w-[1px] h-[8px] bg-white/40" />
              <span className="w-[1px] h-[8px] bg-white/40" />
              <span className="w-[1px] h-[8px] bg-white/40" />
              <span className="w-[1px] h-[8px] bg-white/40" />
              <span className="w-[1px] h-[8px] bg-white/40" />
              <span className="w-[1.5px] h-[22px] bg-white" />
              <span className="w-[1px] h-[8px] bg-white/40" />
            </div>

            <span className="tracking-wide">19&apos;</span>
          </div>
        </div>

        {/* ========================================================
            LEGAL & COPYRIGHT BOTTOM BAR
           ======================================================== */}
        <div className="w-full h-px bg-zinc-800/80 mt-10 sm:mt-14 mb-6 sm:mb-8" />
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-[family-name:var(--font-urbanist)]">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1.5 text-center sm:text-left">
            <span>© 2026 CorAuxis. All rights reserved.</span>
            <span>•</span>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms &amp; Conditions</a>
            <span>•</span>
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-zinc-300 transition-colors">Deletion Policy</a>
          </div>

          <div className="text-zinc-500 font-medium">
            Built with passion.
          </div>
        </div>

      </div>
    </footer>
  );
}
