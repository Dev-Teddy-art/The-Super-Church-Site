"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Locations", href: "/locations" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events", href: "/events" },
  { label: "Get in Touch", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const getActiveTab = () => {
    if (pathname.startsWith("/locations")) return "Locations";
    if (pathname.startsWith("/sermons")) return "Sermons";
    if (pathname.startsWith("/events")) return "Events";
    if (pathname.startsWith("/contact")) return "Get in Touch";
    return "Home";
  };

  const activeTab = getActiveTab();
  const currentIndicator = hoveredTab || activeTab;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 bg-[#F7E600] rounded-lg flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105">
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
          <div className="flex flex-col">
            <span className="font-extrabold text-[17px] tracking-tight text-[#181916] leading-none">
              The Super Church
            </span>
            <span className="text-[9.5px] font-semibold tracking-[0.14em] uppercase text-[#5C5E58] mt-1">
              A Shining Light to the Nations
            </span>
          </div>
        </Link>

        <nav
          className="hidden md:flex items-center gap-8"
          onMouseLeave={() => setHoveredTab(null)}
        >
          <div className="flex items-center gap-7">
            {NAV_ITEMS.map((item) => {
              const isSelected = currentIndicator === item.label;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setHoveredTab(item.label)}
                  className="relative py-2 text-[14px] font-medium text-[#181916] transition-colors"
                >
                  <span
                    className={
                      activeTab === item.label
                        ? "font-bold text-[#181916]"
                        : "text-[#181916]/75"
                    }
                  >
                    {item.label}
                  </span>

                  {isSelected && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#181916] rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                        mass: 0.8,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <motion.a
            href="/contact"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#F7E600] text-[#181916] font-bold text-[14px] px-6 py-2.5 rounded-full shadow-sm"
          >
            Give
          </motion.a>
        </nav>
      </div>
    </header>
  );
}