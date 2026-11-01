"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Navigation,
  Phone,
  Globe2,
  X,
  ArrowUpRight,
  Clock,
  UserCheck,
  Map,
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface ChurchLocation {
  id: string;
  indexNumber: string;
  slideDirection: "left" | "right";
  name: string;
  region: "Nigeria" | "UK";
  timezoneLabel: string;
  isHeadquarters?: boolean;
  tagline: string;
  address: string;
  sundayTime: string;
  midweekTime: string;
  pastor: string;
  phone: string;
  coordinates: string;
  mapEmbedUrl: string;
  worshipAtmosphereNote: string;
  highlights: string[];
}

const LOCATIONS: ChurchLocation[] = [
  {
    id: "lagos",
    indexNumber: "01",
    slideDirection: "left",
    name: "Lagos",
    region: "Nigeria",
    timezoneLabel: "WAT (UTC+1)",
    isHeadquarters: true,
    tagline: "Global Headquarters",
    address: "[Street address, Lagos, Nigeria]",
    sundayTime: "8:30 AM & 10:30 AM WAT",
    midweekTime: "Thursdays · 6:00 PM WAT",
    pastor: "Rev. Walter Timothy",
    phone: "+234 [Phone number]",
    coordinates: "6.5244° N, 3.3792° E",
    mapEmbedUrl: "https://www.google.com/maps?q=Lagos,Nigeria&output=embed",
    worshipAtmosphereNote:
      "Experience the flagship Sunday worship gathering and verse-by-verse teaching at our Lagos Headquarters.",
    highlights: [
      "Global Headquarters",
      "Sunday Worship & Word",
      "4K Live Broadcast Hub",
    ],
  },
  {
    id: "swindon",
    indexNumber: "02",
    slideDirection: "right",
    name: "Swindon, UK",
    region: "UK",
    timezoneLabel: "GMT / BST",
    tagline: "United Kingdom Sanctuary",
    address: "[Street address, Swindon, United Kingdom]",
    sundayTime: "10:00 AM & 12:00 PM GMT",
    midweekTime: "Wednesdays · 7:00 PM GMT",
    pastor: "[Pastor Name]",
    phone: "+44 [Phone number]",
    coordinates: "51.5558° N, 1.7797° W",
    mapEmbedUrl: "https://www.google.com/maps?q=Swindon,UK&output=embed",
    worshipAtmosphereNote:
      "Step inside our Swindon sanctuary—vibrant praise, deep Scripture study, and warm fellowship in the UK.",
    highlights: ["Sunday Worship", "Children & Youth", "Midweek Bible Study"],
  },
  {
    id: "port-harcourt",
    indexNumber: "03",
    slideDirection: "left",
    name: "Port Harcourt",
    region: "Nigeria",
    timezoneLabel: "WAT (UTC+1)",
    tagline: "Rivers State Sanctuary",
    address: "[Street address, Port Harcourt, Rivers]",
    sundayTime: "9:00 AM WAT",
    midweekTime: "Wednesdays · 5:30 PM WAT",
    pastor: "[Pastor Name]",
    phone: "+234 [Phone number]",
    coordinates: "4.8156° N, 7.0498° E",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Port+Harcourt,Nigeria&output=embed",
    worshipAtmosphereNote:
      "Join hundreds of believers lifting high the name of Jesus every Sunday morning in Port Harcourt.",
    highlights: ["Expository Preaching", "Children's Ministry", "Life Groups"],
  },
  {
    id: "abuja",
    indexNumber: "04",
    slideDirection: "right",
    name: "Abuja",
    region: "Nigeria",
    timezoneLabel: "WAT (UTC+1)",
    tagline: "Capital City Sanctuary",
    address: "[Street address, Abuja, FCT]",
    sundayTime: "9:00 AM WAT",
    midweekTime: "Thursdays · 6:00 PM WAT",
    pastor: "[Pastor Name]",
    phone: "+234 [Phone number]",
    coordinates: "9.0765° N, 7.3986° E",
    mapEmbedUrl: "https://www.google.com/maps?q=Abuja,Nigeria&output=embed",
    worshipAtmosphereNote:
      "Experience passionate worship, fervent prayer, and the preached Word right in the heart of Abuja.",
    highlights: ["Sunday Service", "Midweek Prayer", "Life Groups"],
  },
  {
    id: "owerri",
    indexNumber: "05",
    slideDirection: "left",
    name: "Owerri",
    region: "Nigeria",
    timezoneLabel: "WAT (UTC+1)",
    tagline: "Imo State Sanctuary",
    address: "[Street address, Owerri, Imo]",
    sundayTime: "9:00 AM WAT",
    midweekTime: "Wednesdays · 5:30 PM WAT",
    pastor: "[Pastor Name]",
    phone: "+234 [Phone number]",
    coordinates: "5.4836° N, 7.0333° E",
    mapEmbedUrl: "https://www.google.com/maps?q=Owerri,Nigeria&output=embed",
    worshipAtmosphereNote:
      "Encounter a joyful, Word-centered church family passionately worshipping Christ in Owerri.",
    highlights: ["City Outreach", "Youth & Young Adults", "Sunday Worship"],
  },
];

function SectionCornerMosaic({ align }: { align: "right" | "left" }) {
  const rows = 26;
  const cols = 18;
  const tileSize = 14;
  const gap = 3;
  const step = tileSize + gap;

  const tiles: {
    r: number;
    c: number;
    fill: string;
    opacity: number;
    recessed: boolean;
  }[] = [];

  for (let r = 0; r < rows; r++) {
    const vProgress = r / rows;
    if (vProgress > 0.88) continue;

    const curveCenter =
      align === "right"
        ? 8 + Math.sin(vProgress * Math.PI * 1.65) * 4.2
        : 9 - Math.sin(vProgress * Math.PI * 1.65) * 4.2;

    const bandWidth = 5.2 * (1 - vProgress * 0.45);

    for (let c = 0; c < cols; c++) {
      const dist = Math.abs(c - curveCenter);
      if (dist > bandWidth) continue;

      let fill = "#F7E600";
      let opacity = 0.85;
      let recessed = false;

      if (dist < bandWidth * 0.34) {
        fill = (r * 3 + c) % 3 === 0 ? "#3A2A1D" : "#F7E600";
        opacity = 0.95 * (1 - vProgress * 0.25);
        recessed = true;
      } else if (dist < bandWidth * 0.68) {
        fill = (r + c) % 3 === 0 ? "#5C4028" : "#E5C700";
        opacity = 0.65 * (1 - vProgress * 0.3);
        recessed = (r + c) % 2 === 0;
      } else {
        fill = (r + c) % 2 === 0 ? "#F7E600" : "#D6C9A8";
        opacity = 0.28 * (1 - vProgress * 0.4);
        recessed = false;
      }

      tiles.push({ r, c, fill, opacity, recessed });
    }
  }

  return (
    <div
      className={`section-mosaic-cluster pointer-events-none absolute top-4 bottom-12 z-0 w-[280px] sm:w-[340px] opacity-90 ${
        align === "right" ? "right-2 sm:right-6" : "left-2 sm:left-6"
      }`}
    >
      <svg
        viewBox={`0 0 ${cols * step} ${rows * step}`}
        fill="none"
        className="w-full h-full overflow-visible"
      >
        {tiles.map((t, i) => {
          const x = t.c * step;
          const y = t.r * step;
          return (
            <g key={i} opacity={t.opacity}>
              <rect
                x={x}
                y={y}
                width={tileSize}
                height={tileSize}
                rx={1.5}
                fill={t.fill}
              />
              {t.recessed && (
                <path
                  d={`M ${x + 1.5} ${y + tileSize - 1.5} L ${x + 1.5} ${
                    y + 1.5
                  } L ${x + tileSize - 1.5} ${y + 1.5}`}
                  stroke="#181916"
                  strokeOpacity="0.38"
                  strokeWidth="2.2"
                  strokeLinecap="square"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function LocationsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedRegion, setSelectedRegion] = useState<"ALL" | "Nigeria" | "UK">(
    "ALL"
  );

  const [hoveredNavId, setHoveredNavId] = useState<string | null>(null);
  const [activeScrollId, setActiveScrollId] = useState<string | null>(null);

  // Google Maps Modal State
  const [activeMapModalLocation, setActiveMapModalLocation] =
    useState<ChurchLocation | null>(null);

  const filteredLocations = LOCATIONS.filter((loc) =>
    selectedRegion === "ALL" ? true : loc.region === selectedRegion
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stages = gsap.utils.toArray<HTMLElement>(".location-stage-section");

      stages.forEach((stage) => {
        const locId = stage.dataset.locid || "";
        const dir = stage.dataset.direction;
        const sliderBody = stage.querySelector(".location-Offscreen-slider");
        const speedRibbon = stage.querySelector(".location-speed-ribbon");
        const mosaicCluster = stage.querySelector(".section-mosaic-cluster");

        const offscreenX = dir === "left" ? "-105vw" : "105vw";
        const ribbonStartX = dir === "left" ? "-120vw" : "120vw";

        ScrollTrigger.create({
          trigger: stage,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => setActiveScrollId(locId),
          onEnterBack: () => setActiveScrollId(locId),
        });

        if (speedRibbon) {
          gsap.fromTo(
            speedRibbon,
            { x: ribbonStartX, opacity: 0 },
            {
              x: "0vw",
              opacity: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: stage,
                start: "top 88%",
                end: "top 32%",
                scrub: 0.55,
              },
            }
          );
        }

        if (sliderBody) {
          gsap.fromTo(
            sliderBody,
            {
              x: offscreenX,
              opacity: 0,
              scale: 0.94,
              skewX: dir === "left" ? 3 : -3,
            },
            {
              x: "0vw",
              opacity: 1,
              scale: 1,
              skewX: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: stage,
                start: "top 85%",
                end: "top 25%",
                scrub: 0.65,
              },
            }
          );
        }

        if (mosaicCluster) {
          gsap.fromTo(
            mosaicCluster,
            { y: -35, opacity: 0.15 },
            {
              y: 25,
              opacity: 0.95,
              ease: "none",
              scrollTrigger: {
                trigger: stage,
                start: "top 90%",
                end: "bottom 20%",
                scrub: true,
              },
            }
          );
        }
      });
    }, pageRef);

    return () => ctx.revert();
  }, [selectedRegion]);

  const scrollToLocationSection = (id: string) => {
    const el = document.getElementById(`location-stage-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-[#F6F5F0] text-[#181916]">
      <Navbar />

      <section className="relative pt-32 pb-16 bg-[#181916] text-white overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute -top-40 right-10 w-[520px] h-[520px] rounded-full bg-[#F7E600]/10 blur-[130px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 w-[420px] h-[320px] rounded-full bg-[#3A2A1D]/50 blur-[110px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/10">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.18em] uppercase bg-[#F7E600] text-[#181916] px-3.5 py-1.5 rounded-sm mb-4">
                <Globe2 className="w-3.5 h-3.5" />
                5 Sanctuaries · One Global Family
              </span>
              <h1 className="text-5xl sm:text-[64px] font-black tracking-[-0.035em] text-white leading-[1.02]">
                Our locations
              </h1>
              <p className="text-[17px] text-white/75 mt-3 max-w-2xl leading-relaxed">
                Select any sanctuary below or scroll down to explore our
                locations across Nigeria and the United Kingdom.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 bg-white/[0.06] backdrop-blur-md p-1.5 rounded-full border border-white/10 self-start lg:self-end">
              {(
                [
                  { id: "ALL", label: "All 5 Locations" },
                  { id: "Nigeria", label: "Nigeria (4)" },
                  { id: "UK", label: "United Kingdom (1)" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRegion(tab.id)}
                  className={`px-5 py-2 rounded-full text-xs font-extrabold tracking-wider uppercase transition-all ${
                    selectedRegion === tab.id
                      ? "bg-[#F7E600] text-[#181916] shadow-md"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div
            onMouseLeave={() => setHoveredNavId(null)}
            className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5"
          >
            {LOCATIONS.map((loc) => {
              const isHighlighted =
                hoveredNavId !== null
                  ? hoveredNavId === loc.id
                  : activeScrollId === loc.id;

              return (
                <button
                  key={loc.id}
                  onMouseEnter={() => setHoveredNavId(loc.id)}
                  onClick={() => scrollToLocationSection(loc.id)}
                  className="relative group text-left p-5 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                >
                  {isHighlighted && (
                    <motion.div
                      layoutId="location-nav-magnetic-highlight"
                      className="absolute inset-0 bg-gradient-to-br from-[#3A2A1D] via-[#2A2018] to-[#181916] border-2 border-[#F7E600] rounded-2xl z-0 shadow-[0_12px_35px_rgba(247,230,0,0.22)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between w-full mb-3">
                      <span
                        className={`text-[10.5px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full transition-colors ${
                          isHighlighted
                            ? "bg-[#F7E600] text-[#181916]"
                            : "bg-white/10 text-white/70"
                        }`}
                      >
                        {loc.indexNumber} ·{" "}
                        {loc.isHeadquarters ? "HQ" : loc.region}
                      </span>
                      <ArrowUpRight
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isHighlighted
                            ? "text-[#F7E600] translate-x-0.5 -translate-y-0.5"
                            : "text-white/40"
                        }`}
                      />
                    </div>

                    <div>
                      <div className="font-black text-[18px] text-white tracking-tight">
                        {loc.name}
                      </div>
                      <div
                        className={`text-[12px] mt-1 font-medium transition-colors ${
                          isHighlighted ? "text-[#F7E600]" : "text-white/60"
                        }`}
                      >
                        {loc.sundayTime}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="divide-y divide-[#E6E3D6]">
        {filteredLocations.map((loc) => {
          const isLeft = loc.slideDirection === "left";

          return (
            <section
              key={loc.id}
              id={`location-stage-${loc.id}`}
              data-locid={loc.id}
              data-direction={loc.slideDirection}
              className="location-stage-section relative w-full min-h-[84vh] py-20 flex items-center overflow-hidden"
            >
              <SectionCornerMosaic align={isLeft ? "right" : "left"} />

              <div
                className={`pointer-events-none select-none absolute top-10 font-black text-[150px] sm:text-[220px] leading-none tracking-tighter text-[#181916]/[0.04] z-0 ${
                  isLeft ? "left-6 sm:left-16" : "right-6 sm:right-16"
                }`}
              >
                {loc.indexNumber}
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <div
                  className={`location-speed-ribbon pointer-events-none hidden lg:block absolute top-1/2 -translate-y-1/2 h-[78%] w-[62%] rounded-[40px] z-0 shadow-2xl ${
                    isLeft
                      ? "-left-16 bg-gradient-to-r from-[#3A2A1D] via-[#3A2A1D] to-transparent border-l-[10px] border-[#F7E600]"
                      : "-right-16 bg-gradient-to-l from-[#3A2A1D] via-[#3A2A1D] to-transparent border-r-[10px] border-[#F7E600]"
                  }`}
                />

                <div className="location-Offscreen-slider relative z-10 rounded-[32px] bg-white/95 backdrop-blur-xl border border-[#DFDBD0] p-6 sm:p-10 lg:p-12 shadow-[0_32px_90px_rgba(24,25,22,0.14)]">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* INTERACTIVE GOOGLE MAP EMBED VIEWPORT */}
                    <div
                      className={`lg:col-span-6 ${
                        isLeft ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div
                        onClick={() => setActiveMapModalLocation(loc)}
                        className="relative aspect-[16/10.5] w-full rounded-[24px] overflow-hidden bg-[#181916] border border-black/10 shadow-2xl group cursor-pointer"
                      >
                        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                          <span className="bg-[#F7E600] text-[#181916] text-[11px] font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-md">
                            {loc.indexNumber} · {loc.tagline}
                          </span>
                        </div>

                        <div className="absolute top-4 right-4 z-20">
                          <span className="inline-flex items-center gap-1.5 bg-black/65 backdrop-blur-md text-white/90 text-[11px] font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full border border-white/15">
                            <span className="w-2 h-2 rounded-full bg-[#F7E600] animate-pulse" />
                            {loc.timezoneLabel}
                          </span>
                        </div>

                        <iframe
                          src={loc.mapEmbedUrl}
                          className="w-full h-full border-0 pointer-events-none opacity-85 group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`${loc.name} Map`}
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

                        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-white/90 bg-black/75 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15">
                          <span className="font-semibold flex items-center gap-1.5">
                            {loc.address}
                          </span>
                          <span className="text-[#F7E600] font-bold inline-flex items-center gap-1">
                            Open Map
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`lg:col-span-6 space-y-6 ${
                        isLeft ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-black uppercase tracking-[0.18em] bg-[#3A2A1D] text-[#F7E600] px-3 py-1 rounded-sm">
                            Sanctuary {loc.indexNumber}
                          </span>
                          {loc.isHeadquarters && (
                            <span className="text-[11px] font-black uppercase tracking-wider bg-[#F7E600] text-[#181916] px-3 py-1 rounded-sm">
                              ★ Global Headquarters
                            </span>
                          )}
                        </div>

                        <h2
                          onClick={() => setActiveMapModalLocation(loc)}
                          className="text-3xl sm:text-4xl font-black tracking-tight text-[#181916] hover:text-[#3A2A1D] cursor-pointer transition-colors"
                        >
                          The Super Church · {loc.name}
                        </h2>
                        <p className="text-[15.5px] text-[#5C5E58] flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#3A2A1D] shrink-0" />
                          {loc.address}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {loc.highlights.map((item, i) => (
                          <span
                            key={i}
                            className="text-xs font-bold bg-[#3A2A1D]/10 text-[#3A2A1D] border border-[#3A2A1D]/20 px-3.5 py-1.5 rounded-full"
                          >
                            ✦ {item}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="p-4 rounded-2xl bg-[#F6F5F0] border border-[#E5E2D7]">
                          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#5C5E58] mb-1">
                            <Clock className="w-3.5 h-3.5 text-[#3A2A1D]" />
                            Sunday Service
                          </div>
                          <div className="font-extrabold text-[15px] text-[#181916]">
                            {loc.sundayTime}
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#F6F5F0] border border-[#E5E2D7]">
                          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#5C5E58] mb-1">
                            <Clock className="w-3.5 h-3.5 text-[#3A2A1D]" />
                            Midweek Service
                          </div>
                          <div className="font-extrabold text-[15px] text-[#181916]">
                            {loc.midweekTime}
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#F6F5F0] border border-[#E5E2D7]">
                          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#5C5E58] mb-1">
                            <UserCheck className="w-3.5 h-3.5 text-[#3A2A1D]" />
                            Pastor
                          </div>
                          <div className="font-extrabold text-[15px] text-[#181916]">
                            {loc.pastor}
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#F6F5F0] border border-[#E5E2D7]">
                          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#5C5E58] mb-1">
                            <Phone className="w-3.5 h-3.5 text-[#3A2A1D]" />
                            Direct Line
                          </div>
                          <a
                            href={`tel:${loc.phone}`}
                            className="font-extrabold text-[15px] text-[#181916] underline underline-offset-4 hover:text-[#3A2A1D]"
                          >
                            {loc.phone}
                          </a>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center gap-3.5">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            loc.name + " " + loc.address
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 bg-[#F7E600] hover:bg-[#e5d500] text-[#181916] font-extrabold text-[14.5px] px-7 py-4 rounded-full shadow-md transition-transform active:scale-95"
                        >
                          <Navigation className="w-4 h-4" />
                          Get directions
                        </a>

                        <a
                          href="/#contact"
                          className="flex-1 min-w-[160px] inline-flex items-center justify-center border-[1.5px] border-[#181916] text-[#181916] hover:bg-[#181916] hover:text-white font-bold text-[14.5px] px-7 py-4 rounded-full transition-colors"
                        >
                          Contact
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="relative rounded-[28px] bg-[#222420] border-2 border-[#3A2A1D] text-white p-10 sm:p-12 overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl">
          <video
            src="/dark-waves.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#222420] via-[#3A2A1D]/80 to-transparent" />

          <div className="relative z-10 space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-black text-[#F7E600] tracking-tight">
              Can&apos;t make it in person?
            </h3>
            <p className="text-[16px] text-white/90">
              Join the Sunday service live online from our Lagos Headquarters,
              wherever you are.
            </p>
          </div>

          <Link
            href="/#sermons"
            className="relative z-10 inline-flex items-center justify-center bg-[#F7E600] hover:scale-105 text-[#181916] font-extrabold text-[15px] px-8 py-4 rounded-full shadow-lg transition-transform shrink-0"
          >
            Watch live
          </Link>
        </div>
      </section>

      {/* FULLSCREEN GOOGLE MAPS EMBED MODAL */}
      <AnimatePresence>
        {activeMapModalLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl h-[85vh] bg-[#181916] rounded-[28px] overflow-hidden border border-white/20 shadow-2xl flex flex-col"
            >
              <div className="px-6 h-20 flex items-center justify-between border-b border-white/10 bg-[#222420]">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#F7E600] animate-pulse" />
                  <span className="font-extrabold text-lg text-white">
                    Google Maps · The Super Church ({activeMapModalLocation.name})
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      activeMapModalLocation.name + " " + activeMapModalLocation.address
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#F7E600] text-[#181916] px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Open in Maps App
                  </a>
                  <button
                    onClick={() => setActiveMapModalLocation(null)}
                    className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="relative flex-1 w-full bg-black">
                <iframe
                  src={activeMapModalLocation.mapEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${activeMapModalLocation.name} Google Maps Navigation`}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="w-full bg-[#222420] text-white pt-20 pb-12">
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
                <Link href="/#sermons" className="text-white/85 hover:text-white">
                  Sermons
                </Link>
              </div>
              <div>
                <Link href="/#events" className="text-white/85 hover:text-white">
                  Events
                </Link>
              </div>
              <div>
                <Link href="/#contact" className="text-white/85 hover:text-white">
                  Get in Touch
                </Link>
              </div>
              <div>
                <Link href="/#give" className="text-white/85 hover:text-white">
                  Give
                </Link>
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