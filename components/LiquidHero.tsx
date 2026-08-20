"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import "./LiquidHero.css";

// Clip-space vertex shader guarantees 100% full screen coverage edge-to-edge
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uCursorSize;
  uniform float uPower;
  uniform float uDistortion;
  uniform float uImageAspect;
  uniform float uCanvasAspect;
  varying vec2 vUv;

  // True object-fit: cover GLSL mapping with overscan to prevent edge black borders
  vec2 coverUv(vec2 uv, float imageAspect, float canvasAspect) {
    vec2 st = uv;
    float overscan = 1.08; // 8% overscan buffer prevents ripple distortion from pulling in black edges
    vec2 s = vec2(1.0);

    if (canvasAspect > imageAspect) {
      s = vec2(1.0, imageAspect / canvasAspect);
    } else {
      s = vec2(canvasAspect / imageAspect, 1.0);
    }

    return (st - 0.5) * s * (1.0 / overscan) + 0.5;
  }

  void main() {
    vec2 uv = coverUv(vUv, uImageAspect, uCanvasAspect);
    float distanceFromMouse = distance(vUv, uMouse);
    float radius = uCursorSize;
    float influence = smoothstep(radius, 0.0, distanceFromMouse);
    vec2 direction = normalize(vUv - uMouse + 0.0001);
    float ripple =
      sin(distanceFromMouse * 42.0 - uTime * 4.0) *
      influence *
      uDistortion;
    vec2 distortion = direction * ripple * 0.035 * uPower;
    
    // Clamp distorted UVs inside [0.001, 0.999] so edge distortion never samples black borders
    vec2 distortedUv = clamp(uv + distortion, 0.001, 0.999);
    vec4 image = texture2D(uTexture, distortedUv);
    gl_FragColor = vec4(image.rgb, 1.0);
  }
`;

interface LiquidImageProps {
  image: string;
  cursorSize?: number;
  power?: number;
  distortion?: number;
  globalPointerRef: React.MutableRefObject<THREE.Vector2>;
}

// NOTE: WebGL Liquid Canvas animation is commented out per user request.
// To re-enable the liquid distortion on mouse move, uncomment the Canvas block below.

/*
function LiquidImage({
  image,
  cursorSize = 0.5,
  power = 1,
  distortion = 0.8,
  globalPointerRef,
}: LiquidImageProps) {
  const texture = useLoader(THREE.TextureLoader, image);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const localPointer = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return {
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uCursorSize: { value: cursorSize },
      uPower: { value: power },
      uDistortion: { value: distortion },
      uImageAspect: { value: 16 / 9 },
      uCanvasAspect: { value: 1 },
    };
  }, [texture, cursorSize, power, distortion]);

  useFrame(({ clock, size }) => {
    if (!materialRef.current) return;
    const shader = materialRef.current;

    const img = texture.image;
    const imgAspect = img && img.width && img.height ? img.width / img.height : 16 / 9;
    const canvasAspect = size.width / size.height;

    shader.uniforms.uTime.value = clock.getElapsedTime();
    shader.uniforms.uCanvasAspect.value = canvasAspect;
    shader.uniforms.uImageAspect.value = imgAspect;

    const targetPointer = globalPointerRef.current || localPointer.current;
    shader.uniforms.uMouse.value.lerp(targetPointer, 0.12);
  });

  return (
    <mesh
      onPointerMove={(event) => {
        if (!event.uv) return;
        localPointer.current.set(event.uv.x, event.uv.y);
        globalPointerRef.current.set(event.uv.x, event.uv.y);
      }}
    >
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        toneMapped={false}
      />
    </mesh>
  );
}
*/

interface LiquidHeroProps {
  image?: string;
  eyebrow?: string;
  title?: string;
  withinText?: string;
  cursorSize?: number;
  power?: number;
  distortion?: number;
}

export default function LiquidHero({
  image = "/images/bg.png",
  eyebrow = "AI AUTOMATION • SOFTWARE DEVELOPMENT • DIGITAL TRANSFORMATION",
  withinText = "within 24 hours.",
  title = "COR-AUXIS",
}: LiquidHeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", num: "01", href: "#" },
    { label: "Portfolio", num: "02", href: "#showcase" },
    { label: "About", num: "03", href: "#about" },
    { label: "Contact", num: "04", href: "#contact" },
  ];

  return (
    <section className="liquid-hero">
      {/* 
        Parallax Background Image (moves up on scroll down, vice versa — very slow and smooth)
      */}
      <div className="liquid-hero__bg-container">
        <img
          src={image}
          alt="Hero Background"
          className="liquid-hero__bg-img"
          style={{
            transform: `translate3d(0, -${scrollY * 0.08}px, 0)`,
          }}
        />
      </div>

      {/* Decorative Plus Symbols (+) */}
      <span className="liquid-hero__plus" style={{ top: "53.5%", left: "53.5%" }}>+</span>
      <span className="liquid-hero__plus" style={{ top: "63%", right: "23%" }}>+</span>
      <span className="liquid-hero__plus" style={{ top: "52%", right: "10%" }}>+</span>

      {/* Top Header Navigation with CORAUXIS Logo Image */}
      <nav className="liquid-hero__nav">
        <a href="#" className="liquid-hero__logo flex items-center">
          <img
            src="/images/logo.avif"
            alt="CORAUXIS Logo"
            className="h-7 sm:h-9 w-auto object-contain brightness-125"
          />
        </a>

        {/* Desktop Navigation Links */}
        <div className="liquid-hero__nav-links">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="liquid-hero__nav-link">
              <span>{link.label}</span>
              <span className="liquid-hero__nav-num">{link.num}</span>
            </a>
          ))}
        </div>

        {/* Mobile Navigation Wrapper (Button + Dropdown Submenu) */}
        <div className="relative md:hidden pointer-events-auto">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="liquid-hero__hamburger"
            aria-label="Toggle mobile menu"
          >
            <span className={`liquid-hero__hamburger-line ${mobileMenuOpen ? "open-top" : ""}`} />
            <span className={`liquid-hero__hamburger-line ${mobileMenuOpen ? "open-bottom" : ""}`} />
          </button>

          {/* Mobile Submenu Dropdown Panel */}
          {mobileMenuOpen && (
            <div className="liquid-hero__mobile-menu">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="liquid-hero__mobile-link"
                  >
                    <span className="text-sm font-semibold text-white tracking-wide">
                      {link.label}
                    </span>
                    <span className="font-mono text-[11px] text-white/50">{link.num}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Middle Content Section */}
      <div className="liquid-hero__top-section">
        {/* Left Subtext Block */}
        <div className="liquid-hero__subtext-block">
          <p className="liquid-hero__eyebrow">{eyebrow}</p>
          <div className="liquid-hero__within">{withinText}</div>
          <a href="#about" className="liquid-hero__explore">
            <span>Explore Now</span>
            <span className="liquid-hero__explore-arrow">┐</span>
          </a>
        </div>
      </div>

      {/* Bottom Row: Left Info (Tag + Meter) & Shifted Right COR-AUXIS Title */}
      <div className="liquid-hero__bottom-row">
        
        {/* Bottom Left Info Stack */}
        <div className="liquid-hero__left-meta">
          <div className="liquid-hero__tag-block">
            <div className="liquid-hero__tag-num">01/ AI FIRST</div>
            <div className="liquid-hero__tag-title">AUTOMATE</div>
            <div className="liquid-hero__tag-sub">Branding</div>
          </div>
          
          <div className="liquid-hero__meter">
            <span>© 2026</span>
            <div className="liquid-hero__ticks">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span className="tall" />
              <span />
            </div>
            <span>19&apos;</span>
          </div>
        </div>

        {/* Shifted Right COR-AUXIS Title */}
        <div className="liquid-hero__title-container">
          <h1 className="liquid-hero__title">{title}</h1>
        </div>

      </div>
    </section>
  );
}
