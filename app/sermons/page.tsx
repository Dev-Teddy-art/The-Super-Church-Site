"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Search,
  ArrowUpRight,
  Clock,
  X,
} from "lucide-react";
import Link from "next/link";

// Clean inline YouTube SVG component to prevent any package icon mismatches
const YouTubeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

interface Sermon {
  id: string;
  title: string;
  series: string;
  category: "Faith" | "Prayer" | "Family" | "Purpose" | "Healing";
  speaker: string;
  date: string;
  duration: string;
  youtubeId: string;
  thumbnailUrl: string;
}

const FEATURED_SERMON: Sermon = {
  id: "featured-1",
  title: "[Sermon title] Walk in Divine Authority",
  series: "Kingdom Mastery Series",
  category: "Faith",
  speaker: "Rev. Walter Timothy",
  date: "Oct 26, 2026",
  duration: "58 mins",
  youtubeId: "dQw4w9WgXcQ",
  thumbnailUrl: "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?q=80&w=1600&auto=format&fit=crop",
};

const SERMON_SERIES = [
  {
    id: "series-1",
    title: "[Series title] Dimensions of Grace",
    count: "6 messages",
    bg: "bg-[#222420]",
    textColor: "text-white",
  },
  {
    id: "series-2",
    title: "[Series title] Walking in the Spirit",
    count: "4 messages",
    bg: "bg-[#F7E600]",
    textColor: "text-[#181916]",
  },
  {
    id: "series-3",
    title: "[Series title] Financial Dominion",
    count: "5 messages",
    bg: "bg-[#3A2A1D]",
    textColor: "text-white",
  },
  {
    id: "series-4",
    title: "[Series title] The Victorious Mindset",
    count: "8 messages",
    bg: "bg-[#F7E600]",
    textColor: "text-[#181916]",
  },
];

const ALL_SERMONS: Sermon[] = [
  {
    id: "s-1",
    title: "[Sermon title] Unlocking Spiritual Sight",
    series: "Dimensions of Grace",
    category: "Faith",
    speaker: "Rev. Walter Timothy",
    date: "Oct 19, 2026",
    duration: "45 mins",
    youtubeId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "s-2",
    title: "[Sermon title] The Power of Fervent Prayer",
    series: "Walking in the Spirit",
    category: "Prayer",
    speaker: "[Pastor Name]",
    date: "Oct 12, 2026",
    duration: "52 mins",
    youtubeId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "s-3",
    title: "[Sermon title] Building a God-First Household",
    series: "Kingdom Mastery Series",
    category: "Family",
    speaker: "[Pastor Name]",
    date: "Oct 05, 2026",
    duration: "48 mins",
    youtubeId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "s-4",
    title: "[Sermon title] Discovering Your Divine Assignment",
    series: "The Victorious Mindset",
    category: "Purpose",
    speaker: "Rev. Walter Timothy",
    date: "Sep 28, 2026",
    duration: "55 mins",
    youtubeId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "s-5",
    title: "[Sermon title] Supernatural Healing & Wholeness",
    series: "Dimensions of Grace",
    category: "Healing",
    speaker: "[Pastor Name]",
    date: "Sep 21, 2026",
    duration: "50 mins",
    youtubeId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "s-6",
    title: "[Sermon title] Overcoming Anxiety with Faith",
    series: "The Victorious Mindset",
    category: "Faith",
    speaker: "Rev. Walter Timothy",
    date: "Sep 14, 2026",
    duration: "42 mins",
    youtubeId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800&auto=format&fit=crop",
  },
];

const CATEGORIES = ["All", "Faith", "Prayer", "Family", "Purpose", "Healing"] as const;

export default function SermonsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeVideoModal, setActiveVideoModal] = useState<Sermon | null>(null);

  const filteredSermons = ALL_SERMONS.filter((s) => {
    const matchesCategory =
      selectedCategory === "All" || s.category === selectedCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#181916]">
      <Navbar />

      {/* HEADER & FEATURED SERMON HERO */}
      <section className="relative pt-32 pb-24 bg-[#3A2A1D] text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-15">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(#F7E600 1.5px, transparent 1.5px), radial-gradient(#FAF9F5 1.5px, #3A2A1D 1.5px)",
              backgroundSize: "32px 32px",
              backgroundPosition: "0 0, 16px 16px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.18em] uppercase bg-[#F7E600] text-[#181916] px-3.5 py-1.5 rounded-sm mb-3">
                <YouTubeIcon className="w-3.5 h-3.5" />
                The Super Church Broadcasts
              </span>
              <h1 className="text-5xl sm:text-[64px] font-black tracking-[-0.035em] text-white leading-[1.02]">
                Sermons
              </h1>
              <p className="text-[17px] text-white/80 mt-2 max-w-xl">
                Watch or listen to life-transforming messages from Rev. Walter
                Timothy and our global ministry team.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-white/60 uppercase tracking-wider">
                Direct YouTube Integration
              </span>
            </div>
          </div>

          <div className="rounded-[32px] bg-[#222420] border-2 border-[#F7E600]/40 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.4)] grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div
              onClick={() => setActiveVideoModal(FEATURED_SERMON)}
              className="lg:col-span-7 relative aspect-[16/10] w-full bg-black cursor-pointer group overflow-hidden"
            >
              <img
                src={FEATURED_SERMON.thumbnailUrl}
                alt={FEATURED_SERMON.title}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#F7E600] text-[#181916] text-[11px] font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-md">
                  ★ This Week&apos;s Sermon
                </span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-20 w-20 rounded-full bg-[#F7E600] opacity-40" />
                  <div className="relative w-16 h-16 rounded-full bg-[#F7E600] text-[#181916] border-2 border-[#181916] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-[#181916] ml-1" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-white/85 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                <span className="font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#F7E600]" />
                  {FEATURED_SERMON.duration}
                </span>
                <span className="text-[#F7E600] font-bold">
                  Click to Watch on YouTube →
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#F7E600] bg-[#F7E600]/10 px-3 py-1 rounded-md">
                    {FEATURED_SERMON.series}
                  </span>
                  <span className="text-xs text-white/60">
                    {FEATURED_SERMON.date}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  {FEATURED_SERMON.title}
                </h2>

                <p className="text-sm text-white/75 leading-relaxed">
                  Join us for a profound exploration of scripture, designed to
                  strengthen your faith and empower your daily walk in Christ.
                </p>

                <div className="text-xs text-white/60 font-medium">
                  Speaker: <strong className="text-white">{FEATURED_SERMON.speaker}</strong>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3.5">
                <button
                  onClick={() => setActiveVideoModal(FEATURED_SERMON)}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#F7E600] hover:bg-[#e5d500] text-[#181916] font-extrabold text-sm px-6 py-3.5 rounded-full shadow-lg transition-transform active:scale-95"
                >
                  <Play className="w-4 h-4 fill-[#181916]" />
                  Watch Now
                </button>
                <a
                  href={`https://www.youtube.com/watch?v=${FEATURED_SERMON.youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm px-5 py-3.5 rounded-full transition-colors"
                >
                  <YouTubeIcon className="w-4 h-4 text-[#F7E600]" />
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SMOOTH ESPRESSO-TO-CREAM GRADIENT TRANSITION */}
      <div className="w-full h-24 bg-gradient-to-b from-[#3A2A1D] to-[#FAF9F5]" />

      {/* 4-CARD SERMON SERIES GRID */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl sm:text-2xl font-black text-[#181916] tracking-tight">
            Sermon series
          </h3>
          <span className="text-xs font-bold text-[#5C5E58] uppercase tracking-wider">
            Explore curated playlists
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERMON_SERIES.map((series, idx) => (
            <div
              key={series.id}
              className={`p-6 rounded-[24px] ${series.bg} ${series.textColor} shadow-lg flex flex-col justify-between aspect-[16/10] sm:aspect-[4/3] group cursor-pointer hover:-translate-y-1.5 transition-transform`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] font-black tracking-widest uppercase opacity-75">
                  Series 0{idx + 1}
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <div>
                <h4 className="text-lg font-black tracking-tight mb-1">
                  {series.title}
                </h4>
                <p className="text-xs font-semibold opacity-80">
                  {series.count}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ALL SERMONS LIST + CATEGORY FILTERS & SEARCH */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#EBEAE4]">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#181916] tracking-tight">
              All sermons
            </h3>
            <p className="text-sm text-[#5C5E58] mt-1">
              Browse our complete message library by topic or search keywords.
            </p>
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C5E58]" />
            <input
              type="text"
              placeholder="Search sermons, series..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#EBEAE4] rounded-full pl-11 pr-4 py-3 text-sm text-[#181916] placeholder-[#5C5E58] focus:outline-none focus:border-[#3A2A1D] shadow-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 py-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? "bg-[#3A2A1D] text-[#F7E600] shadow-md"
                  : "bg-white text-[#5C5E58] border border-[#EBEAE4] hover:text-[#181916]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="divide-y divide-[#EBEAE4] bg-white rounded-[24px] border border-[#EBEAE4] shadow-sm overflow-hidden my-4">
          {filteredSermons.length > 0 ? (
            filteredSermons.map((sermon) => (
              <div
                key={sermon.id}
                onClick={() => setActiveVideoModal(sermon)}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F9F8F4] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="relative w-14 h-14 rounded-2xl bg-[#3A2A1D] text-[#F7E600] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                    <Play className="w-5 h-5 fill-[#F7E600] ml-0.5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10.5px] font-black uppercase tracking-wider bg-[#F7E600] text-[#181916] px-2.5 py-0.5 rounded">
                        {sermon.category}
                      </span>
                      <span className="text-xs font-semibold text-[#5C5E58]">
                        {sermon.series}
                      </span>
                    </div>

                    <h4 className="text-lg font-extrabold text-[#181916] group-hover:text-[#3A2A1D] transition-colors">
                      {sermon.title}
                    </h4>

                    <div className="flex items-center gap-4 text-xs text-[#5C5E58] font-medium">
                      <span>{sermon.speaker}</span>
                      <span>•</span>
                      <span>{sermon.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {sermon.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="self-start sm:self-center inline-flex items-center justify-center gap-1.5 bg-[#F7E600] hover:bg-[#e5d500] text-[#181916] font-extrabold text-xs px-5 py-2.5 rounded-full shadow-sm transition-transform active:scale-95 shrink-0">
                  <Play className="w-3.5 h-3.5 fill-[#181916]" />
                  Watch
                </button>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-[#5C5E58]">
              No sermons found matching your filter or search query.
            </div>
          )}
        </div>

        <div className="pt-8 text-center">
          <button className="inline-flex items-center justify-center border-[1.5px] border-[#181916] text-[#181916] hover:bg-[#181916] hover:text-white font-extrabold text-sm px-8 py-4 rounded-full transition-colors">
            Show more sermons
          </button>
        </div>
      </section>

      {/* YOUTUBE PREVIEW / EMBED MODAL */}
      <AnimatePresence>
        {activeVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#181916] rounded-[28px] overflow-hidden border border-white/20 shadow-2xl flex flex-col"
            >
              <div className="px-6 h-20 flex items-center justify-between border-b border-white/10 bg-[#222420]">
                <div className="flex items-center gap-3">
                  <YouTubeIcon className="w-5 h-5 text-[#F7E600]" />
                  <span className="font-extrabold text-base text-white truncate max-w-md">
                    {activeVideoModal.title}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://www.youtube.com/watch?v=${activeVideoModal.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#F7E600] text-[#181916] px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider"
                  >
                    Open on YouTube
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setActiveVideoModal(null)}
                    className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoModal.youtubeId}?autoplay=1`}
                  title={activeVideoModal.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="w-full bg-[#222420] text-white pt-20 pb-12 mt-20">
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