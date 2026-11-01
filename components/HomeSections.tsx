"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Church,
  PlaySquare,
  Users,
  Heart,
  Sprout,
  Globe,
  Play,
  Share2,
  MapPin,
  Radio,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const YOUTUBE_VIDEO_ID = "jfKfPfyJRdk";
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com";
const INSTAGRAM_URL = "https://www.instagram.com";

const MINISTRIES = [
  {
    title: "Sunday Services",
    desc: "Worship, prayer and the preached Word, every Sunday.",
    cta: "Learn more",
    icon: Church,
  },
  {
    title: "Sermon Archive",
    desc: "Every message, searchable by series, book of the Bible and speaker.",
    cta: "Browse sermons",
    icon: PlaySquare,
  },
  {
    title: "Life Groups",
    desc: "Smaller groups that meet during the week to study and pray together.",
    cta: "Find a group",
    icon: Users,
  },
  {
    title: "Prayer",
    desc: "Send a prayer request or join the team that prays for the church.",
    cta: "Ask for prayer",
    icon: Heart,
  },
  {
    title: "Children & Youth",
    desc: "Teaching and community for the next generation.",
    cta: "Learn more",
    icon: Sprout,
  },
  {
    title: "Outreach",
    desc: "Serving our city and carrying the light to the nations.",
    cta: "Get involved",
    icon: Globe,
  },
];

const EVENTS = [
  { month: "OCT", day: "25", name: "[Event name]", meta: "[Time] · [Location]" },
  { month: "NOV", day: "01", name: "[Event name]", meta: "[Time] · [Location]" },
  { month: "NOV", day: "08", name: "[Event name]", meta: "[Time] · [Location]" },
];

export default function HomeSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const crossVideoRef = useRef<HTMLVideoElement>(null);
  const wavesParallaxRef = useRef<HTMLDivElement>(null);

  // Refs for the Airplane-Style Cloud Pullback + Horizontal Flyover Transition
  const transitionTriggerRef = useRef<HTMLDivElement>(null);
  const centerBeaconLineRef = useRef<HTMLDivElement>(null);
  const cloudLayerRef = useRef<HTMLDivElement>(null);
  const whiteWipeCurtainRef = useRef<HTMLDivElement>(null);
  const flyoverSculptureRef = useRef<HTMLDivElement>(null);
  const nextSectionContentRef = useRef<HTMLDivElement>(null);

  // Interactive YouTube Player State
  const [isPlayingYoutube, setIsPlayingYoutube] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Staggered 3D reveal for Ministry Cards
      gsap.fromTo(
        ".ministry-card",
        { opacity: 0, y: 50, rotateX: 12 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#ministries",
            start: "top 85%",
          },
        }
      );

      // 2. Concept 1 (Cross & Book 3D Sculpture)
      gsap.fromTo(
        ".concept-1-showcase",
        { opacity: 0, y: 40, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#ministries",
            start: "top 80%",
          },
        }
      );

      // 3. Concept 2 (Dark Obsidian Waves) Parallax
      gsap.fromTo(
        wavesParallaxRef.current,
        { yPercent: -10, scale: 1.08 },
        {
          yPercent: 10,
          scale: 1.0,
          ease: "none",
          scrollTrigger: {
            trigger: "#sermons",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // 4. Staggered Left/Right Callout Nodes
      gsap.fromTo(
        ".location-node-card",
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".location-nodes-grid",
            start: "top 80%",
          },
        }
      );

      // 5. Airplane-Style Cloud Pullback & Horizontal Flyover Wipe (00:07 -> 00:10)
      const flyTl = gsap.timeline({
        scrollTrigger: {
          trigger: transitionTriggerRef.current,
          start: "top top",
          end: "+=190%",
          pin: true,
          scrub: 0.5,
        },
      });

      flyTl
        .to(
          centerBeaconLineRef.current,
          { scale: 0.72, opacity: 0.25, duration: 0.8, ease: "power2.inOut" },
          0
        )
        .fromTo(
          cloudLayerRef.current,
          { opacity: 0, scale: 1.35 },
          { opacity: 1, scale: 1, duration: 0.85, ease: "power2.out" },
          0.15
        )
        .fromTo(
          whiteWipeCurtainRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: "power2.inOut",
          },
          0.75
        )
        .fromTo(
          flyoverSculptureRef.current,
          { xPercent: -120, scale: 1.15, rotate: -4 },
          {
            xPercent: 38,
            scale: 0.92,
            rotate: 0,
            duration: 1.35,
            ease: "power2.inOut",
          },
          0.7
        )
        .fromTo(
          nextSectionContentRef.current,
          { opacity: 0, y: 45 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          1.35
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative z-30 -mt-[48vh] bg-white pt-6">
      {/* =========================================================
          SECTION 2: MINISTRIES ("Find Your Place" + Concept 1 3D Sculpture)
         ========================================================= */}
      <section id="ministries" className="max-w-7xl mx-auto px-6 pt-16 pb-28">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#5C5E58]">
              Find Your Place
            </span>
            <h2 className="text-4xl sm:text-[44px] font-black tracking-[-0.03em] text-[#181916] mt-2">
              Ministries
            </h2>
          </div>
          <p className="text-[15.5px] text-[#5C5E58] max-w-md">
            Grounded in the preached Word and built for authentic community
            every day of the week.
          </p>
        </div>

        {/* Top 4 Ministry Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ perspective: "1000px" }}
        >
          {MINISTRIES.slice(0, 4).map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="ministry-card group bg-white border border-[#EBEAE4] hover:border-[#F7E600] rounded-[20px] p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F7E600] flex items-center justify-center text-[#181916] mb-6 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <h3 className="text-[19px] font-extrabold text-[#181916] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-[14.5px] text-[#5C5E58] leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <a
                  href={`#${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#181916] group-hover:underline underline-offset-4"
                >
                  {item.cta}
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                    →
                  </span>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Row 2: 2 Ministry Cards + Concept 1 3D Cross & Book Sculpture */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6"
          style={{ perspective: "1000px" }}
        >
          {MINISTRIES.slice(4, 6).map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="ministry-card group bg-white border border-[#EBEAE4] hover:border-[#F7E600] rounded-[20px] p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F7E600] flex items-center justify-center text-[#181916] mb-6 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <h3 className="text-[19px] font-extrabold text-[#181916] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-[14.5px] text-[#5C5E58] leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <a
                  href={`#${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#181916] group-hover:underline underline-offset-4"
                >
                  {item.cta}
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                    →
                  </span>
                </a>
              </motion.div>
            );
          })}

          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            className="concept-1-showcase lg:col-span-2 relative rounded-[20px] overflow-hidden border border-[#EBEAE4] bg-[#F9F9F7] min-h-[260px] flex items-center justify-between p-8 shadow-sm hover:shadow-xl transition-all group"
          >
            <video
              ref={crossVideoRef}
              src="/cross-book.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center mix-blend-multiply opacity-95 transition-transform duration-700 group-hover:scale-105 pointer-events-none"
            />
            <div className="relative z-10 max-w-[240px] bg-white/85 backdrop-blur-md p-5 rounded-2xl border border-black/5 shadow-sm">
              <span className="inline-block text-[10px] font-extrabold tracking-[0.14em] uppercase bg-[#F7E600] text-[#181916] px-2.5 py-1 rounded-sm mb-2.5">
                The Word & Cross
              </span>
              <h3 className="text-[17px] font-extrabold text-[#181916] leading-snug mb-1.5">
                Built on Scripture
              </h3>
              <p className="text-[13px] text-[#5C5E58] leading-relaxed">
                Every ministry flows from verse-by-verse teaching and the gospel
                of Christ.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          SECTION 3: LATEST MESSAGE, YOUTUBE EMBED & SOCIALS
         ========================================================= */}
      <section
        id="sermons"
        className="relative w-full bg-[#181916] text-white pt-28 pb-16 overflow-hidden"
      >
        <div
          ref={wavesParallaxRef}
          className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none z-0"
        >
          <video
            src="/dark-waves.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#181916]/85 via-[#181916]/45 to-[#181916]" />
        </div>

        <div className="sermon-block relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[16/10] w-full bg-[#121311]/90 backdrop-blur-xl rounded-[24px] overflow-hidden border border-white/15 flex items-center justify-center group shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
                {isPlayingYoutube ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
                    title="Sunday Sermon YouTube Player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <div className="absolute top-5 left-6 right-6 flex items-center justify-between z-10">
                      <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase bg-black/50 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full text-white/90">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 text-[#FF0000]"
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        YouTube Full Message · 4K
                      </span>
                      <span className="text-[11px] font-bold tracking-widest uppercase text-[#F7E600] bg-[#F7E600]/10 border border-[#F7E600]/30 px-3 py-1 rounded-full">
                        48:12
                      </span>
                    </div>

                    <motion.button
                      onClick={() => setIsPlayingYoutube(true)}
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.94 }}
                      className="relative z-10 w-20 h-20 rounded-full bg-[#F7E600] text-[#181916] flex items-center justify-center shadow-[0_0_50px_rgba(247,230,0,0.5)]"
                    >
                      <Play className="w-7 h-7 fill-[#181916] ml-1" />
                    </motion.button>

                    <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-xs text-white/60">
                      <span>Click to watch directly or open on YouTube</span>
                      <span className="text-white/90 font-semibold">
                        @TheSuperChurchOfficial
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3.5">
                <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                  Stream & Clip Channels:
                </span>
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={YOUTUBE_CHANNEL_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold bg-white/10 hover:bg-[#FF0000] hover:text-white px-3.5 py-1.5 rounded-full transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    YouTube Channel
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold bg-white/10 hover:bg-[#F7E600] hover:text-[#181916] px-3.5 py-1.5 rounded-full transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-3.5 h-3.5"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    Reels & Clips
                  </a>
                  <a
                    href="#podcast"
                    className="inline-flex items-center gap-2 text-xs font-bold bg-white/10 hover:bg-[#F7E600] hover:text-[#181916] px-3.5 py-1.5 rounded-full transition-colors"
                  >
                    <Radio className="w-3.5 h-3.5" />
                    Audio Podcast
                  </a>
                  <button
                    onClick={() =>
                      navigator.clipboard?.writeText(window.location.href)
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-[#F7E600] px-2.5 py-1.5 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Share
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <span className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#F7E600]">
                Latest Message
              </span>
              <h2 className="text-4xl sm:text-[44px] font-black tracking-[-0.03em] text-white leading-tight drop-shadow-md">
                [Sermon title]
              </h2>
              <p className="text-[14.5px] text-white/75 font-medium">
                Rev. Walter Timothy · [Date] · [Series]
              </p>
              <p className="text-[16px] text-white/90 leading-relaxed pt-1">
                [One or two lines summarising the message]
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <motion.button
                  onClick={() => setIsPlayingYoutube(true)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#F7E600] text-[#181916] font-bold text-[14.5px] px-7 py-3.5 rounded-full shadow-lg"
                >
                  Watch now
                </motion.button>
                <motion.a
                  whileHover={{
                    scale: 1.04,
                    backgroundColor: "rgba(255,255,255,0.15)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  href="#all-sermons"
                  className="border border-white/50 bg-black/25 backdrop-blur-md text-white font-semibold text-[14.5px] px-7 py-3.5 rounded-full"
                >
                  All sermons
                </motion.a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/15 mt-16 pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="block text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#F7E600] mb-1.5">
                Daily Devotionals
              </span>
              <p className="text-[15.5px] text-white/90">
                Chapter-by-chapter devotionals from Rev. Walter Timothy through
                the New Testament letters, posted every day.
              </p>
            </div>
            <a
              href="#devotional"
              className="text-[14.5px] font-bold text-white underline underline-offset-4 whitespace-nowrap hover:text-[#F7E600] transition-colors"
            >
              Read today&apos;s devotional →
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          THE "SHIP-TO-AIRPLANE" TRANSITION STAGE (Lagos Headquarters First)
         ========================================================= */}
      <div
        ref={transitionTriggerRef}
        className="relative w-full h-screen bg-[#181916] overflow-hidden select-none"
      >
        <div
          ref={centerBeaconLineRef}
          className="absolute inset-0 max-w-6xl mx-auto px-6 flex flex-col items-center justify-center z-10"
        >
          <span className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#F7E600] mb-3">
            Across Nigeria, UK & Online
          </span>
          <h3 className="text-3xl sm:text-5xl font-black text-white text-center tracking-tight mb-14 max-w-2xl leading-[1.08]">
            One Global Church Family. <br />
            Multiple Locations.
          </h3>

          <div className="location-nodes-grid relative w-full grid grid-cols-1 md:grid-cols-2 gap-x-28 gap-y-10 items-center">
            <div className="hidden md:flex flex-col items-center justify-between absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#F7E600] to-transparent">
              <div className="w-10 h-10 rounded-full bg-[#F7E600] text-[#181916] flex items-center justify-center shadow-[0_0_30px_#F7E600]">
                <MapPin className="w-5 h-5" />
              </div>
            </div>

            {/* Node 1: Lagos Headquarters */}
            <div className="location-node-card md:text-right space-y-1.5 bg-white/[0.04] md:bg-transparent p-5 md:p-0 rounded-2xl border border-white/10 md:border-none">
              <div className="text-[#F7E600] text-xs font-extrabold tracking-widest uppercase">
                01 · Global Headquarters
              </div>
              <h4 className="text-xl font-extrabold text-white">Lagos, Nigeria</h4>
              <p className="text-sm text-white/70 max-w-xs md:ml-auto">
                Sunday morning worship, expository teaching, and full children’s
                ministry at 8:30 AM & 10:30 AM WAT.
              </p>
            </div>

            {/* Node 2: Swindon UK */}
            <div className="location-node-card text-left space-y-1.5 bg-white/[0.04] md:bg-transparent p-5 md:p-0 rounded-2xl border border-white/10 md:border-none">
              <div className="text-[#F7E600] text-xs font-extrabold tracking-widest uppercase">
                02 · United Kingdom
              </div>
              <h4 className="text-xl font-extrabold text-white">Swindon, UK</h4>
              <p className="text-sm text-white/70 max-w-xs">
                Gathering every Sunday at 10:00 AM & 12:00 PM GMT with midweek
                study and fellowship.
              </p>
            </div>

            {/* Node 3: Regional Locations */}
            <div className="location-node-card md:text-right space-y-1.5 bg-white/[0.04] md:bg-transparent p-5 md:p-0 rounded-2xl border border-white/10 md:border-none">
              <div className="text-[#F7E600] text-xs font-extrabold tracking-widest uppercase">
                03 · Regional Locations
              </div>
              <h4 className="text-xl font-extrabold text-white">
                Port Harcourt · Abuja · Owerri
              </h4>
              <p className="text-sm text-white/70 max-w-xs md:ml-auto">
                Vibrant Sunday worship, the preached Word, and community outreach
                across Nigeria at 9:00 AM WAT.
              </p>
            </div>

            {/* Node 4: Online Live Stream */}
            <div className="location-node-card text-left space-y-1.5 bg-white/[0.04] md:bg-transparent p-5 md:p-0 rounded-2xl border border-white/10 md:border-none">
              <div className="text-[#F7E600] text-xs font-extrabold tracking-widest uppercase">
                04 · Global Broadcast
              </div>
              <h4 className="text-xl font-extrabold text-white">
                Online Live Stream
              </h4>
              <p className="text-sm text-white/70 max-w-xs">
                Streaming live in 4K from our Lagos Headquarters on YouTube and
                right here on our site every Sunday.
              </p>
            </div>
          </div>
        </div>

        {/* Cloud Veil */}
        <div
          ref={cloudLayerRef}
          className="pointer-events-none absolute inset-0 z-20 opacity-0"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.92) 0%, rgba(235,238,242,0.78) 45%, rgba(24,25,22,0.2) 100%)",
          }}
        />

        {/* Solid White Background Wiped In */}
        <div
          ref={whiteWipeCurtainRef}
          className="absolute inset-0 z-30 bg-white flex items-center"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          <div
            ref={nextSectionContentRef}
            id="events"
            className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          >
            <div className="lg:col-span-8 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="inline-block text-[11px] font-extrabold tracking-[0.16em] uppercase bg-[#F7E600] text-[#181916] px-3 py-1 rounded-sm mb-3">
                    Calendar & Gatherings
                  </span>
                  <h2 className="text-4xl sm:text-[48px] font-black tracking-[-0.035em] text-[#181916] leading-none">
                    Upcoming events
                  </h2>
                </div>
                <a
                  href="#all-events"
                  className="text-[14.5px] font-bold text-[#181916] underline underline-offset-4 hover:opacity-75"
                >
                  See all events →
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {EVENTS.map((ev, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="border border-[#EBEAE4] rounded-[20px] p-5 flex items-center gap-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-15 h-15 rounded-xl bg-[#F7E600] text-[#181916] flex flex-col items-center justify-center shrink-0 px-3.5 py-2.5">
                      <span className="text-[10px] font-extrabold tracking-widest uppercase">
                        {ev.month}
                      </span>
                      <span className="text-2xl font-black leading-none mt-0.5">
                        {ev.day}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[16px] text-[#181916]">
                        {ev.name}
                      </h3>
                      <p className="text-[13px] text-[#5C5E58] mt-0.5 mb-1.5">
                        {ev.meta}
                      </p>
                      <a
                        href="#register"
                        className="text-[13px] font-bold text-[#181916] underline underline-offset-4"
                      >
                        Register →
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3D Wing Flyover Sculpture */}
        <div
          ref={flyoverSculptureRef}
          className="pointer-events-none absolute inset-y-0 right-0 z-40 flex items-center justify-center w-[85vw] md:w-[60vw]"
        >
          <svg
            viewBox="0 0 800 700"
            className="w-full h-auto drop-shadow-[-25px_30px_50px_rgba(24,25,22,0.16)]"
            fill="none"
          >
            <defs>
              <linearGradient id="wingWhite" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="65%" stopColor="#F7F6F2" />
                <stop offset="100%" stopColor="#E6E4DC" />
              </linearGradient>
              <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F7E600" />
                <stop offset="100%" stopColor="#C9A800" />
              </linearGradient>
            </defs>

            <path
              d="M50 350 C240 310, 420 140, 560 30 L640 30 C550 180, 480 280, 740 325 C775 332, 790 345, 790 350 C790 355, 775 368, 740 375 C480 420, 550 520, 640 670 L560 670 C420 560, 240 390, 50 350 Z"
              fill="url(#wingWhite)"
              stroke="#EBEAE4"
              strokeWidth="2"
            />
            <path
              d="M120 350 L765 350"
              stroke="url(#goldAccent)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M280 350 C390 260, 480 150, 585 45"
              stroke="#181916"
              strokeWidth="3"
              strokeOpacity="0.18"
            />
            <path
              d="M280 350 C390 440, 480 550, 585 655"
              stroke="#181916"
              strokeWidth="3"
              strokeOpacity="0.18"
            />
            <circle cx="460" cy="350" r="34" fill="#F7E600" />
            <path
              d="M446 360 C454 355, 464 354, 476 361 C470 355, 465 352, 458 352 C452 352, 449 355, 446 360 Z M464 351 C468 346, 468 338, 462 334 C458 331, 454 332, 452 329 C450 332, 451 336, 448 336 C450 338, 450 341, 447 342 C450 344, 450 346, 448 348 C452 351, 458 353, 464 351 Z"
              fill="#181916"
            />
          </svg>
        </div>
      </div>

      {/* =========================================================
          SECTION 5: FIRST TIME? PLAN YOUR VISIT
         ========================================================= */}
      <section id="plan-visit" className="w-full bg-[#F4F3EE] py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#5C5E58]">
              First Time?
            </span>
            <h2 className="text-4xl sm:text-[44px] font-black tracking-[-0.03em] text-[#181916]">
              Plan your visit
            </h2>
            <p className="text-[16px] text-[#5C5E58] leading-relaxed">
              Here is what to expect on a Sunday. Let us know you are coming and
              someone will meet you at the door.
            </p>
            <div className="pt-2">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                className="inline-block bg-[#181916] text-white font-bold text-[14.5px] px-7 py-3.5 rounded-full"
              >
                Let us know you&apos;re coming
              </motion.a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-[20px] p-7 shadow-sm">
              <span className="block text-[10.5px] font-extrabold tracking-[0.14em] uppercase text-[#5C5E58] mb-2">
                When
              </span>
              <p className="font-extrabold text-[17px] text-[#181916]">
                Sunday mornings, about [length]
              </p>
            </div>

            <div className="bg-white rounded-[20px] p-7 shadow-sm">
              <span className="block text-[10.5px] font-extrabold tracking-[0.14em] uppercase text-[#5C5E58] mb-2">
                Where
              </span>
              <Link
                href="/locations"
                className="font-extrabold text-[17px] text-[#181916] underline underline-offset-4"
              >
                5 locations: find yours
              </Link>
            </div>

            <div className="bg-white rounded-[20px] p-7 shadow-sm">
              <span className="block text-[10.5px] font-extrabold tracking-[0.14em] uppercase text-[#5C5E58] mb-2">
                Kids
              </span>
              <p className="font-extrabold text-[17px] text-[#181916]">
                [What&apos;s on for children]
              </p>
            </div>

            <div className="bg-white rounded-[20px] p-7 shadow-sm">
              <span className="block text-[10.5px] font-extrabold tracking-[0.14em] uppercase text-[#5C5E58] mb-2">
                Getting Here
              </span>
              <p className="font-extrabold text-[17px] text-[#181916]">
                [Parking and transport]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 6: FOOTER
         ========================================================= */}
      <footer id="contact" className="w-full bg-[#222420] text-white pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
            <div className="space-y-4">
              <div className="w-11 h-11 bg-[#F7E600] rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 64 64"
                  fill="currentColor"
                  className="w-7 h-7 text-[#181916]"
                >
                  <path d="M6 52C18 45 36 44 58 54C50 46 42 42 32 42C22 42 13 46 6 52Z" />
                  <path d="M36 53C41 56 48 55 52 51C46 49 40 50 36 53Z" />
                  <path d="M41 42C41 33 46 25 53 23C53 31 48 39 41 42Z" />
                  <path d="M38 41C44 34 44 22 35 16C29 12 23 13 20 8C18 13 19 18 14 19C17 22 17 25 13 27C17 29 18 33 14 35C20 40 29 43 38 41ZM27 24C32 23 36 27 35 33C33 37 26 38 23 34C21 30 23 25 27 24Z" />
                </svg>
              </div>
              <div className="font-extrabold text-lg">The Super Church</div>
              <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#F7E600]">
                A Shining Light to the Nations
              </div>
            </div>

            <div className="space-y-2.5 text-sm">
              <div className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#F7E600] mb-4">
                Our Locations
              </div>
              <div className="text-white font-semibold">
                Lagos (Headquarters)
              </div>
              <div className="text-white/85">Swindon, UK</div>
              <div className="text-white/85">Port Harcourt</div>
              <div className="text-white/85">Abuja & Owerri</div>
              <div className="pt-2">
                <Link
                  href="/locations"
                  className="text-[#F7E600] font-bold underline underline-offset-4"
                >
                  Times and addresses →
                </Link>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#F7E600] mb-4">
                Explore
              </div>
              <div>
                <a href="#sermons" className="text-white/85 hover:text-white">
                  Sermons
                </a>
              </div>
              <div>
                <a href="#events" className="text-white/85 hover:text-white">
                  Events
                </a>
              </div>
              <div>
                <a href="#contact" className="text-white/85 hover:text-white">
                  Get in Touch
                </a>
              </div>
              <div>
                <a href="#give" className="text-white/85 hover:text-white">
                  Give
                </a>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#F7E600] mb-4">
                Contact Us
              </div>
              <div className="text-white/85">[Phone number]</div>
              <div className="text-white/85">[Email address]</div>
              <div className="flex flex-wrap gap-4 pt-2 text-white underline underline-offset-4 font-medium">
                <a href="#facebook">Facebook</a>
                <a href="#youtube">YouTube</a>
                <a href="#instagram">Instagram</a>
                <a href="#tiktok">TikTok</a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
            <span>© 2026 The Super Church</span>
            <a
              href="#privacy"
              className="underline underline-offset-4 hover:text-white"
            >
              Privacy policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}