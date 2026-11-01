"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Search,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface ChurchEvent {
  id: string;
  title: string;
  category: "Conferences" | "Campaigns" | "UK Special" | "Global Gathering";
  location: string;
  dateRange: string;
  dateMonth: string;
  dateDay: string;
  daySpan: string;
  time: string;
  shortHook: string;
  description: string;
  image: string;
}

const MAJOR_EVENTS: ChurchEvent[] = [
  {
    id: "doulos-conference",
    title: "Doulos Conference",
    category: "Conferences",
    location: "Lagos Global Headquarters",
    dateRange: "Tuesday 3 – Sunday 8 November",
    dateMonth: "NOV",
    dateDay: "03",
    daySpan: "03–08 Nov",
    time: "Morning & Evening Sessions • WAT",
    shortHook:
      "Six days of intensive ministry training, sound doctrine, and spiritual equipping for leaders and believers.",
    description:
      "Doulos Conference (3rd – 8th November) is our premier equipping convocation dedicated to raising faithful stewards of the Gospel through deep scriptural exposition, leadership sessions, and prophetic worship.",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "the-gathering",
    title: "The Gathering",
    category: "Global Gathering",
    location: "Lagos Global Headquarters & All Sanctuaries",
    dateRange: "31 March – 5 April",
    dateMonth: "MAR",
    dateDay: "31",
    daySpan: "31 Mar – 05 Apr",
    time: "Daily Morning & Evening • WAT",
    shortHook:
      "Our flagship global convocation uniting every sanctuary for six days of word, worship, and outpouring.",
    description:
      "The Gathering (31st March – 5th April) brings together the entire Super Church global family across Nigeria and the UK for six unforgettable days of teaching, revival fire, and fellowship.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "two-nights-of-faith-uk",
    title: "2 Nights of Faith · UK Swindon",
    category: "UK Special",
    location: "Swindon Sanctuary, United Kingdom",
    dateRange: "15 – 16 August",
    dateMonth: "AUG",
    dateDay: "15",
    daySpan: "15–16 Aug",
    time: "6:00 PM Daily • BST / GMT",
    shortHook:
      "Two power-packed nights of faith, miracles, and apostolic teaching in Swindon, United Kingdom.",
    description:
      "Join believers from across the United Kingdom in Swindon (15th – 16th August) for 2 Nights of Faith—an intimate yet explosive atmosphere of the Word, healing, and supernatural expectation.",
    image:
      "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "victory-campaign",
    title: "Victory Campaign",
    category: "Campaigns",
    location: "Lagos & Regional Sanctuaries",
    dateRange: "18 – 20 September",
    dateMonth: "SEP",
    dateDay: "18",
    daySpan: "18–20 Sep",
    time: "5:00 PM Daily • WAT",
    shortHook:
      "Three days of triumphant faith declarations, city-wide evangelism, and supernatural breakthroughs.",
    description:
      "Victory Campaign (18th – 20th September) is a three-day spiritual offensive designed to enforce the believer's authority in Christ, win souls, and establish lasting testimonies.",
    image:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1600&auto=format&fit=crop",
  },
];

const CATEGORIES = [
  "All",
  "Conferences",
  "Global Gathering",
  "UK Special",
  "Campaigns",
] as const;

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [featuredIndex, setFeaturedIndex] = useState<number>(0);
  const [activeModalEvent, setActiveModalEvent] = useState<ChurchEvent | null>(
    null
  );

  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const activeFeaturedEvent = MAJOR_EVENTS[featuredIndex];

  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        setShowLeftArrow(scrollLeft > 10);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };
    const el = sliderRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      handleScroll();
    }
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollCategorySlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmt = direction === "left" ? -220 : 220;
      sliderRef.current.scrollBy({ left: scrollAmt, behavior: "smooth" });
    }
  };

  const nextFeatured = () =>
    setFeaturedIndex((prev) => (prev + 1) % MAJOR_EVENTS.length);
  const prevFeatured = () =>
    setFeaturedIndex(
      (prev) => (prev - 1 + MAJOR_EVENTS.length) % MAJOR_EVENTS.length
    );

  const filteredEvents = MAJOR_EVENTS.filter((ev) => {
    const matchesCategory =
      selectedCategory === "All" || ev.category === selectedCategory;
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.dateRange.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.shortHook.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-[#FAF9F5] text-[#181916] overflow-x-hidden">
      <Navbar />

      {/* CREATIVE LINEAR GRADIENT & HALFTONE AMBIENT MESHES */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-[560px] z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(58,42,29,0.12) 0%, rgba(247,230,0,0.06) 48%, rgba(250,249,245,0) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute top-[520px] -right-24 w-[480px] h-[680px] rounded-full blur-[95px] z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(247,230,0,0.22) 0%, rgba(58,42,29,0.06) 60%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-[380px] -left-24 w-[460px] h-[560px] rounded-full blur-[110px] z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(58,42,29,0.12) 0%, rgba(247,230,0,0.12) 55%, transparent 100%)",
        }}
      />
      {/* Subtle diagonal dot matrix on right edge */}
      <div
        className="pointer-events-none absolute top-[680px] right-0 w-72 h-96 opacity-20 z-0"
        style={{
          backgroundImage: "radial-gradient(#3A2A1D 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
      />

      {/* =========================================================
          1. EVENTS HEADER SECTION
         ========================================================= */}
      <section className="relative z-10 pt-32 pb-8 max-w-7xl mx-auto px-6">
        <h1 className="text-5xl sm:text-[64px] font-black tracking-[-0.035em] text-[#181916] leading-none">
          Events
        </h1>
        <p className="text-[17px] text-[#5C5E58] mt-3">
          Our weekly services and everything else coming up.
        </p>
      </section>

      {/* =========================================================
          2. "EVERY WEEK" BANNER (Exact Wireframe Match)
         ========================================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-4">
        <div
          className="rounded-[24px] p-6 sm:px-9 sm:py-7 border border-[#181916]/10 shadow-[0_14px_40px_rgba(247,230,0,0.22)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(105deg, #F7E600 0%, #F7E600 72%, #E5C700 100%)",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5 z-10">
            <h2 className="text-2xl sm:text-[26px] font-black text-[#181916] tracking-tight shrink-0">
              Every week
            </h2>
            <p className="text-[15px] font-semibold text-[#181916]/85">
              Sunday and midweek services run at every location. Times differ
              from place to place.
            </p>
          </div>

          <Link
            href="/locations"
            className="bg-[#181916] hover:bg-[#3A2A1D] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md transition-all active:scale-95 shrink-0 z-10"
          >
            See service times
          </Link>
        </div>
      </section>

      {/* =========================================================
          3. INTERACTIVE FEATURED MAJOR EVENT SLIDER ("NEXT BIG EVENT")
         ========================================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#3A2A1D]">
            <Sparkles className="w-4 h-4 text-[#3A2A1D]" />
            Featured Major Gatherings ({featuredIndex + 1} /{" "}
            {MAJOR_EVENTS.length})
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-2">
            {MAJOR_EVENTS.map((ev, idx) => (
              <button
                key={ev.id}
                onClick={() => setFeaturedIndex(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  idx === featuredIndex
                    ? "w-8 bg-[#3A2A1D]"
                    : "w-2.5 bg-[#3A2A1D]/25 hover:bg-[#3A2A1D]/50"
                }`}
                aria-label={`View ${ev.title}`}
              />
            ))}
            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={prevFeatured}
                className="w-9 h-9 rounded-full bg-white border border-[#DEDAD0] flex items-center justify-center hover:bg-[#3A2A1D] hover:text-[#F7E600] transition-colors shadow-sm"
                aria-label="Previous major event"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextFeatured}
                className="w-9 h-9 rounded-full bg-white border border-[#DEDAD0] flex items-center justify-center hover:bg-[#3A2A1D] hover:text-[#F7E600] transition-colors shadow-sm"
                aria-label="Next major event"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeaturedEvent.id}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="rounded-[28px] overflow-hidden border-2 border-[#3A2A1D]/30 shadow-[0_28px_80px_rgba(24,25,22,0.16)] grid grid-cols-1 lg:grid-cols-12"
            style={{
              background:
                "linear-gradient(135deg, #1E201D 0%, #27221D 55%, #3A2A1D 100%)",
            }}
          >
            {/* Left Flyer / Photo Preview */}
            <div
              onClick={() => setActiveModalEvent(activeFeaturedEvent)}
              className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto min-h-[320px] w-full bg-[#181916] cursor-pointer group overflow-hidden"
            >
              <img
                src={activeFeaturedEvent.image}
                alt={activeFeaturedEvent.title}
                className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                <span className="bg-[#F7E600] text-[#181916] text-[11px] font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-md">
                  {activeFeaturedEvent.daySpan}
                </span>
                <span className="bg-black/65 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/15">
                  {activeFeaturedEvent.category}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between text-xs text-white/90 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                <span className="font-semibold">
                  📍 {activeFeaturedEvent.location}
                </span>
                <span className="text-[#F7E600] font-bold">
                  View Flyer & Details →
                </span>
              </div>
            </div>

            {/* Right Event Details */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-3.5">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#F7E600]">
                  NEXT BIG EVENT
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  {activeFeaturedEvent.title}
                </h2>

                <div className="text-[15px] font-extrabold text-white pt-1">
                  {activeFeaturedEvent.dateRange} · {activeFeaturedEvent.time}
                </div>

                <div className="text-sm font-semibold text-white/70">
                  {activeFeaturedEvent.location}
                </div>

                <p className="text-sm text-white/80 leading-relaxed pt-1 max-w-xl">
                  {activeFeaturedEvent.shortHook}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveModalEvent(activeFeaturedEvent)}
                  className="inline-flex items-center justify-center bg-[#F7E600] hover:bg-[#e5d500] text-[#181916] font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg transition-transform active:scale-95"
                >
                  Sign up
                </button>
                <button
                  onClick={nextFeatured}
                  className="inline-flex items-center justify-center border border-white/20 hover:border-[#F7E600] text-white/85 hover:text-[#F7E600] font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-full transition-colors"
                >
                  Next Major Event →
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* =========================================================
          4. "COMING UP" + CATEGORY SLIDER + 4 MAJOR EVENT ROWS
         ========================================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-10 space-y-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-2xl sm:text-3xl font-black text-[#181916] tracking-tight">
            Coming up
          </h3>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C5E58]" />
            <input
              type="text"
              placeholder="Search The Gathering, Doulos, UK..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#DEDAD0] rounded-full pl-11 pr-4 py-3 text-sm text-[#181916] placeholder-[#5C5E58] focus:outline-none focus:border-[#3A2A1D] shadow-sm"
            />
          </div>
        </div>

        {/* Category Pill Carousel */}
        <div className="relative">
          {showLeftArrow && (
            <button
              onClick={() => scrollCategorySlider("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white shadow-md border border-[#EBEAE4] text-[#181916] rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          {showRightArrow && (
            <button
              onClick={() => scrollCategorySlider("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white shadow-md border border-[#EBEAE4] text-[#181916] rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          <div
            ref={sliderRef}
            className="flex items-center gap-2.5 overflow-x-auto scrollbar-none py-1"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider shrink-0 transition-all ${
                  selectedCategory === cat
                    ? "bg-[#3A2A1D] text-[#F7E600] shadow-md"
                    : "bg-white text-[#5C5E58] border border-[#DEDAD0] hover:text-[#181916]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Major Events List (Exact Wireframe Row Structure) */}
        <div className="divide-y divide-[#E6E3D8] border-t border-b border-[#E6E3D8]">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                onClick={() => setActiveModalEvent(event)}
                whileHover={{ x: 4 }}
                className="py-6 px-4 sm:px-5 hover:bg-white/90 rounded-2xl transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-5 group cursor-pointer"
              >
                <div className="flex items-start sm:items-center gap-5">
                  {/* Wireframe Yellow Square Date Badge */}
                  <div className="w-16 h-16 sm:w-[70px] sm:h-[70px] bg-[#F7E600] text-[#181916] rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <span className="text-[10px] font-black tracking-widest uppercase leading-none mb-1">
                      {event.dateMonth}
                    </span>
                    <span className="text-2xl sm:text-[26px] font-black leading-none tracking-tight">
                      {event.dateDay}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-lg sm:text-xl font-black text-[#181916] group-hover:text-[#3A2A1D] transition-colors">
                        {event.title}
                      </h4>
                      <span className="text-[10.5px] font-extrabold uppercase tracking-wider bg-[#3A2A1D]/10 text-[#3A2A1D] px-2.5 py-0.5 rounded-full">
                        {event.daySpan}
                      </span>
                    </div>

                    <div className="text-xs sm:text-[13.5px] text-[#5C5E58] font-semibold">
                      {event.dateRange} · {event.time} · {event.location}
                    </div>

                    <p className="text-xs sm:text-sm text-[#5C5E58] leading-relaxed max-w-2xl">
                      {event.shortHook}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalEvent(event);
                  }}
                  className="self-start sm:self-center inline-flex items-center justify-center bg-[#F7E600] hover:bg-[#e5d500] text-[#181916] font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full shadow-sm transition-transform active:scale-95 shrink-0"
                >
                  Sign up
                </button>
              </motion.div>
            ))
          ) : (
            <div className="py-12 text-center text-[#5C5E58]">
              No events found matching your search.
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          5. EVENT REGISTRATION & DETAILS MODAL
         ========================================================= */}
      <AnimatePresence>
        {activeModalEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[28px] overflow-hidden shadow-2xl flex flex-col my-auto text-[#181916]"
            >
              <div className="relative aspect-[16/8.5] w-full bg-black">
                <img
                  src={activeModalEvent.image}
                  alt={activeModalEvent.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <button
                  onClick={() => setActiveModalEvent(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-5 left-6 right-6">
                  <span className="bg-[#F7E600] text-[#181916] text-[11px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md">
                    {activeModalEvent.daySpan}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight">
                    {activeModalEvent.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-[#F6F5F0] p-4 rounded-2xl border border-[#E5E2D7]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#3A2A1D] text-[#F7E600] flex items-center justify-center shrink-0">
                      <CalendarIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#5C5E58] uppercase">
                        Dates
                      </div>
                      <div className="font-extrabold text-xs sm:text-sm">
                        {activeModalEvent.dateRange}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#3A2A1D] text-[#F7E600] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#5C5E58] uppercase">
                        Schedule
                      </div>
                      <div className="font-extrabold text-xs sm:text-sm">
                        {activeModalEvent.time}
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2 flex items-center gap-3 pt-2 border-t border-[#E5E2D7]">
                    <div className="w-10 h-10 rounded-xl bg-[#3A2A1D] text-[#F7E600] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#5C5E58] uppercase">
                        Sanctuary / Venue
                      </div>
                      <div className="font-extrabold text-xs sm:text-sm">
                        {activeModalEvent.location}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#5C5E58] leading-relaxed">
                  {activeModalEvent.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/#contact"
                    className="flex-1 inline-flex items-center justify-center bg-[#F7E600] hover:bg-[#e5d500] text-[#181916] font-extrabold text-sm px-6 py-3.5 rounded-full shadow-md transition-transform active:scale-95"
                  >
                    Register / Reserve Seat
                  </Link>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      activeModalEvent.location
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 border border-[#181916] text-[#181916] hover:bg-[#181916] hover:text-white font-bold text-sm px-6 py-3.5 rounded-full transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    Directions
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          6. FOOTER
         ========================================================= */}
      <footer className="relative z-10 w-full bg-[#222420] text-white pt-20 pb-12 mt-20">
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
                <Link href="/sermons" className="text-white/85 hover:text-white">
                  Sermons
                </Link>
              </div>
              <div>
                <Link href="/events" className="text-white/85 hover:text-white">
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