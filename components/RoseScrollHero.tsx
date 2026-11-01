"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { location: "Lagos (Headquarters)", time: "8:30 AM & 10:30 AM" },
  { location: "Swindon, UK", time: "10:00 AM & 12:00 PM" },
  { location: "Port Harcourt · Abuja · Owerri", time: "9:00 AM" },
  { location: "Online", time: "Live on this site" },
];

export default function RoseScrollHero({
  totalFrames = 240,
}: {
  totalFrames?: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beat1Ref = useRef<HTMLDivElement>(null);
  const beat2Ref = useRef<HTMLDivElement>(null);

  // Refs for the Dynamic Scroll-Triggered Headline Accent & Underline
  const shiningWordRef = useRef<HTMLSpanElement>(null);
  const nationsWordRef = useRef<HTMLSpanElement>(null);
  const headlineUnderlineRef = useRef<HTMLSpanElement>(null);

  // Refs for the 3-Layer Left-to-Right Liquid Splash Transition
  const brownSplashRef = useRef<SVGPathElement>(null);
  const yellowSplashRef = useRef<SVGPathElement>(null);
  const whiteSplashRef = useRef<SVGPathElement>(null);

  const scrollProgress = useRef<number>(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // 3D Tilt Physics for the Sunday Services Card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 260,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 260,
    damping: 25,
  });

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  // 1. Preload WebP frames
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const indexStr = String(i).padStart(4, "0");
      img.src = `/frames/hero/frame_${indexStr}.webp`;
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, [totalFrames]);

  // 2. Render frame onto 60fps Canvas (Capped at frame 192 before white fog)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let smoothFrame = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const renderLoop = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const maxPetalFrame = Math.floor(totalFrames * 0.8);
      const targetFrame = Math.min(
        maxPetalFrame,
        Math.max(0, scrollProgress.current * maxPetalFrame)
      );

      smoothFrame += (targetFrame - smoothFrame) * 0.2;
      const frameIdx = Math.round(smoothFrame);
      const currentImg = imagesRef.current[frameIdx];

      if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
        ctx.clearRect(0, 0, w, h);
        const scale = Math.max(w / currentImg.width, h / currentImg.height);
        const x = w / 2 - (currentImg.width / 2) * scale;
        const y = h / 2 - (currentImg.height / 2) * scale;
        ctx.drawImage(
          currentImg,
          x,
          y,
          currentImg.width * scale,
          currentImg.height * scale
        );
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [totalFrames]);

  // 3. GSAP ScrollTrigger + Headline Color Transformation & Left-to-Right Splash Wipe
  useEffect(() => {
    const ctx = gsap.context(() => {
      const midSplashCurve =
        "M 0,0 L 65,0 C 115,20 35,50 95,75 C 125,90 70,100 65,100 L 0,100 Z";
      const fullCovered =
        "M 0,0 L 100,0 C 100,25 100,50 100,75 C 100,90 100,100 100,100 L 0,100 Z";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=230%",
          pin: true,
          scrub: 0.45,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
          },
        },
      });

      // Shift Rose to center
      tl.fromTo(
        canvasWrapRef.current,
        { xPercent: 8, scale: 1.05 },
        { xPercent: 0, scale: 1.0, duration: 1.2, ease: "power2.out" },
        0
      );

      // Scroll-Driven Headline Transformation ("Shining" & "Nations" Turn Yellow + Underline)
      tl.to(
        [shiningWordRef.current, nationsWordRef.current],
        {
          color: "#F7E600",
          textShadow: "0 0 35px rgba(247, 230, 0, 0.65)",
          duration: 0.6,
          ease: "power2.out",
        },
        0.05
      ).to(
        headlineUnderlineRef.current,
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        },
        0.1
      );

      // Fade out Beat 1 (Hero Content)
      tl.to(
        beat1Ref.current,
        { opacity: 0, y: -60, scale: 0.96, duration: 0.85, ease: "power2.inOut" },
        0.4
      );

      // Beat 2 Reveal
      tl.fromTo(
        beat2Ref.current,
        { opacity: 0, y: 50, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power2.out" },
        1.0
      ).to(
        beat2Ref.current,
        { opacity: 0, x: 80, duration: 0.55, ease: "power2.in" },
        1.95
      );

      // Left-to-Right Splash Slider Wipe
      tl.to(
        brownSplashRef.current,
        { attr: { d: midSplashCurve }, duration: 0.45, ease: "power2.in" },
        1.85
      ).to(
        brownSplashRef.current,
        { attr: { d: fullCovered }, duration: 0.4, ease: "power2.out" },
        2.3
      );

      tl.to(
        yellowSplashRef.current,
        { attr: { d: midSplashCurve }, duration: 0.45, ease: "power2.in" },
        1.98
      ).to(
        yellowSplashRef.current,
        { attr: { d: fullCovered }, duration: 0.4, ease: "power2.out" },
        2.43
      );

      tl.to(
        whiteSplashRef.current,
        { attr: { d: midSplashCurve }, duration: 0.45, ease: "power2.in" },
        2.12
      ).to(
        whiteSplashRef.current,
        { attr: { d: fullCovered }, duration: 0.4, ease: "power2.out" },
        2.57
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#141513] text-white overflow-hidden select-none"
    >
      <div ref={canvasWrapRef} className="absolute inset-0 w-full h-full z-0">
        <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#141513]/90 via-[#141513]/45 to-transparent pointer-events-none z-[1]" />

      {/* BEAT 1: Hero Typography + Sunday Services Card */}
      <div
        ref={beat1Ref}
        className="relative z-10 max-w-7xl mx-auto px-6 h-full pt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
      >
        <div className="lg:col-span-7 space-y-6">
          <span className="inline-block text-[11px] font-extrabold tracking-[0.16em] uppercase bg-[#F7E600] text-[#181916] px-3.5 py-1.5 rounded-sm shadow-sm">
            Welcome Home
          </span>

          {/* DYNAMIC SCROLL HEADLINE */}
          <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-black tracking-[-0.035em] text-white leading-[1.03] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            A{" "}
            <span
              ref={shiningWordRef}
              className="inline-block transition-colors duration-300 text-white will-change-[color,text-shadow]"
            >
              Shining
            </span>{" "}
            Light to <br />
            <span className="relative inline-block mt-1">
              the{" "}
              <span
                ref={nationsWordRef}
                className="inline-block transition-colors duration-300 text-white will-change-[color,text-shadow]"
              >
                Nations
              </span>
              {/* Dynamic Yellow Underline that expands on scroll */}
              <span
                ref={headlineUnderlineRef}
                className="absolute -bottom-2 left-0 w-full h-[5px] bg-[#F7E600] rounded-full origin-left scale-x-0 opacity-0 shadow-[0_0_18px_rgba(247,230,0,0.85)]"
              />
            </span>
          </h1>

          <p className="text-[18px] text-white/90 max-w-xl leading-relaxed drop-shadow">
            Join us this Sunday in person or online, and grow with us in the
            Word every day of the week.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#sermons"
              className="inline-flex items-center gap-3 bg-[#F7E600] text-[#181916] font-bold text-[15px] px-7 py-3.5 rounded-full shadow-xl hover:scale-105 transition-transform"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#181916] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#181916]" />
              </span>
              Watch Live
            </a>

            <a
              href="#plan-visit"
              className="inline-flex items-center justify-center border-[1.5px] border-white/60 bg-black/35 backdrop-blur-md text-white font-semibold text-[15px] px-7 py-3.5 rounded-full hover:bg-white hover:text-[#181916] transition-colors"
            >
              Plan Your Visit
            </a>
          </div>
        </div>

        {/* Right: 3D Perspective Sunday Services Card (Lagos Headquarters First) */}
        <div
          className="lg:col-span-5 flex justify-center lg:justify-end"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleCardMove}
            onMouseLeave={() => {
              mouseX.set(0);
              mouseY.set(0);
            }}
            className="w-full max-w-[405px] bg-white text-[#181916] rounded-[24px] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.65)] border border-black/5"
          >
            <div style={{ transform: "translateZ(20px)" }}>
              <h2 className="text-[20px] font-extrabold text-[#181916] mb-4">
                Sunday services
              </h2>
              <div className="divide-y divide-[#EBEAE4]">
                {SERVICES.map((item, idx) => (
                  <div
                    key={idx}
                    className="py-3.5 flex items-center justify-between gap-4 text-[14.5px]"
                  >
                    <span className="font-bold text-[#181916]">
                      {item.location}
                    </span>
                    <span className="text-[#5C5E58] font-medium text-right shrink-0">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-1">
                <Link
                  href="/locations"
                  className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#181916] underline underline-offset-4 group"
                >
                  Find a location near you
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* BEAT 2: Macro Rose Dive Overlay */}
      <div
        ref={beat2Ref}
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 opacity-0"
      >
        <span className="text-[11px] font-extrabold tracking-[0.16em] uppercase bg-[#F7E600] text-[#181916] px-3.5 py-1 rounded-sm mb-5">
          Find Your Place
        </span>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight max-w-3xl leading-[1.06] drop-shadow-2xl">
          Growing Together in the Word <br />
          Every Day of the Week
        </h2>
      </div>

      {/* 3-Layer Liquid Splash Overlay */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 w-full h-full z-20"
      >
        <path
          ref={brownSplashRef}
          fill="#3A2A1D"
          d="M 0,0 L 0,0 C 0,20 0,50 0,75 C 0,90 0,100 0,100 L 0,100 Z"
        />
        <path
          ref={yellowSplashRef}
          fill="#F7E600"
          d="M 0,0 L 0,0 C 0,20 0,50 0,75 C 0,90 0,100 0,100 L 0,100 Z"
        />
        <path
          ref={whiteSplashRef}
          fill="#FFFFFF"
          d="M 0,0 L 0,0 C 0,20 0,50 0,75 C 0,90 0,100 0,100 L 0,100 Z"
        />
      </svg>
    </section>
  );
}