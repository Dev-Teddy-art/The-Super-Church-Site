"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

type CurrencyCode = "USD" | "NGN" | "GBP";

const CURRENCY_CONFIG: Record<
  CurrencyCode,
  { symbol: string; label: string; presets: number[] }
> = {
  USD: {
    symbol: "$",
    label: "USD ($)",
    presets: [20, 50, 100, 250, 500],
  },
  NGN: {
    symbol: "₦",
    label: "NGN (₦)",
    presets: [5000, 10000, 25000, 50000, 100000],
  },
  GBP: {
    symbol: "£",
    label: "GBP (£)",
    presets: [20, 50, 100, 250, 500],
  },
};

const HELP_OPTIONS = [
  "I'm planning a visit",
  "I want to join a group or serve",
  "I need prayer",
  "Pastoral counseling & support",
  "Share a testimony",
  "General inquiry",
];

const CHURCH_LOCATIONS = [
  "Lagos (Global Headquarters)",
  "Swindon, UK",
  "Port Harcourt",
  "Abuja",
  "Owerri",
  "Online / Global Family",
];

const GIVING_FUNDS = [
  "Tithe",
  "Offering",
  "Kingdom Expansion & Missions",
  "The Gathering / Conference Seed",
  "Building & Sanctuary Project",
  "Welfare & Community Outreach",
];

export default function ContactAndGivePage() {
  // Contact Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [helpTopic, setHelpTopic] = useState(HELP_OPTIONS[0]);
  const [selectedLocation, setSelectedLocation] = useState(CHURCH_LOCATIONS[0]);
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  // Giving Card State
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [selectedPreset, setSelectedPreset] = useState<number | "Other">(100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [givingFund, setGivingFund] = useState(GIVING_FUNDS[0]);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [giveModalOpen, setGiveModalOpen] = useState(false);

  const activeCurrency = CURRENCY_CONFIG[currency];

  const handleCurrencyChange = (newCurr: CurrencyCode) => {
    setCurrency(newCurr);
    setSelectedPreset(CURRENCY_CONFIG[newCurr].presets[2]); // Default to middle tier (e.g., $100 / ₦25,000 / £100)
    setCustomAmount("");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 400);
  };

  const handleCopyBank = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2200);
  };

  const finalGivingAmount =
    selectedPreset === "Other"
      ? customAmount
        ? `${activeCurrency.symbol}${Number(customAmount).toLocaleString()}`
        : `${activeCurrency.symbol}0`
      : `${activeCurrency.symbol}${selectedPreset.toLocaleString()}`;

  return (
    <div className="relative min-h-screen bg-[#FAF9F5] text-[#181916] overflow-x-hidden">
      <Navbar />

      {/* SUBTLE WARM AMBIENT LINEAR GRADIENTS */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-[420px] z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(238,236,226,0.85) 0%, rgba(250,249,245,1) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute top-[280px] -left-32 w-[500px] h-[500px] rounded-full blur-[120px] z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(247,230,0,0.16) 0%, rgba(58,42,29,0.04) 70%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute top-[460px] -right-32 w-[500px] h-[500px] rounded-full blur-[120px] z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(58,42,29,0.12) 0%, rgba(247,230,0,0.08) 70%, transparent 100%)",
        }}
      />

      {/* =========================================================
          1. HERO HEADER SECTION
         ========================================================= */}
      <section className="relative z-10 pt-32 pb-12 border-b border-[#E6E4DC] bg-[#F3F2EC]/70">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl sm:text-[64px] font-black tracking-[-0.035em] text-[#181916] leading-[1.02]">
            Get in touch &amp; give
          </h1>
          <p className="text-[17px] text-[#5C5E58] mt-3 max-w-xl font-medium">
            Send us a message, or give to the work of the church.
          </p>
        </div>
      </section>

      {/* =========================================================
          2. MAIN 2-COLUMN SPLIT (GET IN TOUCH + GIVE)
         ========================================================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: GET IN TOUCH (7 Cols on Desktop) */}
          <motion.div
            id="contact"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 bg-white rounded-[28px] border border-[#E5E3DC] shadow-[0_20px_60px_rgba(24,25,22,0.06)] overflow-hidden"
          >
            {/* Electric Yellow Header Banner */}
            <div
              className="p-8 sm:p-10 border-b border-black/5"
              style={{
                background:
                  "linear-gradient(135deg, #F7E600 0%, #F7E600 75%, #E8D300 100%)",
              }}
            >
              <h2 className="text-3xl sm:text-[34px] font-black text-[#181916] tracking-tight">
                Get in touch
              </h2>
              <p className="text-[15px] text-[#181916]/85 mt-2 max-w-lg leading-relaxed font-medium">
                Planning a visit, want to join a group or serve, or need prayer?
                Send us a message and we&apos;ll get back to you.
              </p>
            </div>

            {/* Form Body */}
            <div className="p-8 sm:p-10">
              {messageSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 px-6 text-center space-y-4 bg-[#FAF9F5] rounded-2xl border border-[#E5E3DC]"
                >
                  <div className="w-14 h-14 rounded-full bg-[#F7E600] text-[#181916] mx-auto flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-black text-[#181916]">
                    Message received!
                  </h3>
                  <p className="text-sm text-[#5C5E58] max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to The Super Church ({selectedLocation}).
                    Our pastoral and welcome team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setMessageSent(false)}
                    className="inline-flex items-center justify-center bg-[#181916] text-white text-xs font-extrabold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-[#3A2A1D] transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  {/* Your Name */}
                  <div>
                    <label className="block text-xs font-extrabold text-[#181916] mb-2">
                      Your name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full h-12 rounded-xl border border-[#D8D6CE] bg-white px-4 text-sm text-[#181916] placeholder-[#8C8E87] focus:outline-none focus:border-[#3A2A1D] focus:ring-2 focus:ring-[#3A2A1D]/15 transition-all"
                    />
                  </div>

                  {/* Email & Phone 2-Col */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-[#181916] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full h-12 rounded-xl border border-[#D8D6CE] bg-white px-4 text-sm text-[#181916] placeholder-[#8C8E87] focus:outline-none focus:border-[#3A2A1D] focus:ring-2 focus:ring-[#3A2A1D]/15 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#181916] mb-2">
                        Phone{" "}
                        <span className="font-normal text-[#787A74]">
                          (optional)
                        </span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234 or +44..."
                        className="w-full h-12 rounded-xl border border-[#D8D6CE] bg-white px-4 text-sm text-[#181916] placeholder-[#8C8E87] focus:outline-none focus:border-[#3A2A1D] focus:ring-2 focus:ring-[#3A2A1D]/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* What can we help with? */}
                  <div>
                    <label className="block text-xs font-extrabold text-[#181916] mb-2">
                      What can we help with?
                    </label>
                    <div className="relative">
                      <select
                        value={helpTopic}
                        onChange={(e) => setHelpTopic(e.target.value)}
                        className="w-full h-12 appearance-none rounded-xl border border-[#D8D6CE] bg-white px-4 pr-10 text-sm font-medium text-[#181916] focus:outline-none focus:border-[#3A2A1D] focus:ring-2 focus:ring-[#3A2A1D]/15 transition-all cursor-pointer"
                      >
                        {HELP_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C5E58]" />
                    </div>
                  </div>

                  {/* Which location? */}
                  <div>
                    <label className="block text-xs font-extrabold text-[#181916] mb-2">
                      Which location?
                    </label>
                    <div className="relative">
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full h-12 appearance-none rounded-xl border border-[#D8D6CE] bg-white px-4 pr-10 text-sm font-medium text-[#181916] focus:outline-none focus:border-[#3A2A1D] focus:ring-2 focus:ring-[#3A2A1D]/15 transition-all cursor-pointer"
                      >
                        {CHURCH_LOCATIONS.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C5E58]" />
                    </div>
                  </div>

                  {/* Your message */}
                  <div>
                    <label className="block text-xs font-extrabold text-[#181916] mb-2">
                      Your message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we pray for you or help you get connected?"
                      className="w-full rounded-xl border border-[#D8D6CE] bg-white p-4 text-sm text-[#181916] placeholder-[#8C8E87] focus:outline-none focus:border-[#3A2A1D] focus:ring-2 focus:ring-[#3A2A1D]/15 transition-all resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center bg-[#222420] hover:bg-[#3A2A1D] text-white font-extrabold text-sm px-8 py-4 rounded-full shadow-md transition-all active:scale-95"
                    >
                      Send message
                    </button>
                  </div>
                </form>
              )}

              {/* Bottom Direct Contact Strip (CALL / EMAIL / VISIT) */}
              <div className="mt-10 pt-7 border-t border-[#EAE8E1] grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <div className="text-[10.5px] font-black uppercase tracking-wider text-[#787A74] mb-1">
                    CALL
                  </div>
                  <a
                    href="tel:+234000000000"
                    className="font-extrabold text-sm text-[#181916] hover:text-[#3A2A1D]"
                  >
                    [Phone number]
                  </a>
                </div>

                <div>
                  <div className="text-[10.5px] font-black uppercase tracking-wider text-[#787A74] mb-1">
                    EMAIL
                  </div>
                  <a
                    href="mailto:info@thesuperchurch.org"
                    className="font-extrabold text-sm text-[#181916] hover:text-[#3A2A1D]"
                  >
                    [Email address]
                  </a>
                </div>

                <div>
                  <div className="text-[10.5px] font-black uppercase tracking-wider text-[#787A74] mb-1">
                    VISIT
                  </div>
                  <Link
                    href="/locations"
                    className="inline-flex items-center gap-1 font-extrabold text-sm text-[#181916] hover:text-[#3A2A1D]"
                  >
                    Our locations <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: GIVE (5 Cols on Desktop) */}
          <motion.div
            id="give"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="lg:col-span-5 bg-white rounded-[28px] border border-[#E5E3DC] shadow-[0_20px_60px_rgba(24,25,22,0.06)] overflow-hidden"
          >
            {/* Deep Charcoal / Espresso Header Banner */}
            <div
              className="p-8 sm:p-10 text-white"
              style={{
                background:
                  "linear-gradient(135deg, #222420 0%, #2B241E 60%, #3A2A1D 100%)",
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-3xl sm:text-[34px] font-black text-[#F7E600] tracking-tight">
                  Give
                </h2>

                {/* Currency Switcher Pill for Global Sanctuaries */}
                <div className="inline-flex items-center bg-black/35 p-1 rounded-full border border-white/10">
                  {(["USD", "NGN", "GBP"] as CurrencyCode[]).map((curr) => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => handleCurrencyChange(curr)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold transition-all ${
                        currency === curr
                          ? "bg-[#F7E600] text-[#181916]"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-[15px] text-white/85 mt-2 leading-relaxed font-medium">
                Your giving keeps the light shining, here and among the nations.
              </p>
            </div>

            {/* Giving Interactive Body */}
            <div className="p-8 sm:p-10 space-y-6">
              {/* Step 1: Choose an amount */}
              <div>
                <label className="block text-xs font-extrabold text-[#181916] mb-3">
                  1. Choose an amount
                </label>

                <div className="grid grid-cols-3 gap-2.5">
                  {activeCurrency.presets.map((amt) => {
                    const isSelected = selectedPreset === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setSelectedPreset(amt)}
                        className={`h-12 rounded-xl font-extrabold text-sm transition-all ${
                          isSelected
                            ? "bg-[#F7E600] text-[#181916] border-2 border-[#181916] shadow-sm"
                            : "bg-white text-[#181916] border border-[#D8D6CE] hover:border-[#181916]"
                        }`}
                      >
                        {activeCurrency.symbol}
                        {amt.toLocaleString()}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setSelectedPreset("Other")}
                    className={`h-12 rounded-xl font-extrabold text-sm transition-all ${
                      selectedPreset === "Other"
                        ? "bg-[#F7E600] text-[#181916] border-2 border-[#181916] shadow-sm"
                        : "bg-white text-[#181916] border border-[#D8D6CE] hover:border-[#181916]"
                    }`}
                  >
                    Other
                  </button>
                </div>

                {/* Custom Amount Input if "Other" is active */}
                <AnimatePresence>
                  {selectedPreset === "Other" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-3 overflow-hidden"
                    >
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-extrabold text-sm text-[#5C5E58]">
                          {activeCurrency.symbol}
                        </span>
                        <input
                          type="number"
                          min="1"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          placeholder="Enter custom amount"
                          className="w-full h-12 rounded-xl border border-[#181916] bg-[#FAF9F5] pl-9 pr-4 text-sm font-extrabold text-[#181916] focus:outline-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Step 2: What is it for? */}
              <div>
                <label className="block text-xs font-extrabold text-[#181916] mb-2">
                  2. What is it for?
                </label>
                <div className="relative">
                  <select
                    value={givingFund}
                    onChange={(e) => setGivingFund(e.target.value)}
                    className="w-full h-12 appearance-none rounded-xl border border-[#D8D6CE] bg-white px-4 pr-10 text-sm font-medium text-[#181916] focus:outline-none focus:border-[#3A2A1D] cursor-pointer"
                  >
                    {GIVING_FUNDS.map((fund) => (
                      <option key={fund} value={fund}>
                        {fund}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C5E58]" />
                </div>
              </div>

              {/* Step 3: Give securely CTA */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setGiveModalOpen(true)}
                  className="w-full h-13 py-4 rounded-full bg-[#222420] hover:bg-[#3A2A1D] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
                >
                  <Lock className="w-4 h-4 text-[#F7E600]" />
                  <span>
                    3. Give securely ({finalGivingAmount})
                  </span>
                </button>
                <p className="text-[12px] text-[#787A74] text-center">
                  You&apos;ll go to [payment provider] to finish. A receipt comes by
                  email.
                </p>
              </div>

              {/* Divider: Other ways to give */}
              <div className="pt-6 border-t border-[#EAE8E1] space-y-4">
                <h3 className="text-sm font-black text-[#181916]">
                  Other ways to give
                </h3>

                {/* Bank Transfer Box with 1-Click Copy */}
                <div className="space-y-1.5">
                  <div className="text-xs font-extrabold text-[#181916]">
                    Bank transfer
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E5E3DC] flex items-center justify-between gap-2">
                    <div className="text-xs text-[#5C5E58] leading-relaxed">
                      <div className="font-bold text-[#181916]">
                        The Super Church Global
                      </div>
                      <div>[Account name and details]</div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyBank("The Super Church - [Account Number]", "bank-1")
                      }
                      className="inline-flex items-center gap-1 text-[11px] font-extrabold bg-white border border-[#D8D6CE] hover:border-[#181916] text-[#181916] px-3 py-1.5 rounded-lg transition-colors shrink-0"
                    >
                      {copiedAccount === "bank-1" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-700" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* In Person */}
                <div className="space-y-0.5">
                  <div className="text-xs font-extrabold text-[#181916]">
                    In person
                  </div>
                  <p className="text-xs text-[#5C5E58]">
                    During a Sunday service at any location
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          3. SECURE PAYMENT CHECKOUT PREVIEW MODAL
         ========================================================= */}
      <AnimatePresence>
        {giveModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              className="w-full max-w-md bg-white rounded-[28px] overflow-hidden border border-[#E5E3DC] shadow-2xl p-8 space-y-6 text-[#181916]"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest bg-[#F7E600] text-[#181916] px-3 py-1 rounded-full">
                  <Lock className="w-3 h-3" />
                  Secure Giving Checkout
                </span>
                <button
                  onClick={() => setGiveModalOpen(false)}
                  className="text-xs font-extrabold text-[#5C5E58] hover:text-[#181916]"
                >
                  Close ✕
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E5E3DC] space-y-2">
                <div className="text-xs text-[#5C5E58] font-bold uppercase">
                  Summary
                </div>
                <div className="text-3xl font-black text-[#181916]">
                  {finalGivingAmount}
                </div>
                <div className="text-xs font-semibold text-[#3A2A1D]">
                  Fund: {givingFund}
                </div>
              </div>

              <p className="text-xs text-[#5C5E58] leading-relaxed">
                Connect your preferred payment gateway link (Paystack, Flutterwave,
                or Stripe) to redirect givers seamlessly.
              </p>

              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => setGiveModalOpen(false)}
                  className="w-full py-3.5 rounded-full bg-[#F7E600] hover:bg-[#e5d500] text-[#181916] font-extrabold text-sm shadow-md transition-transform active:scale-95"
                >
                  Proceed to Payment Gateway
                </button>
                <button
                  onClick={() => setGiveModalOpen(false)}
                  className="w-full py-3 rounded-full border border-[#D8D6CE] text-xs font-bold text-[#5C5E58] hover:text-[#181916]"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          4. FOOTER
         ========================================================= */}
      <footer className="relative z-10 w-full bg-[#222420] text-white pt-20 pb-12 mt-16">
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
              <div className="text-white/85">Abuja &amp; Owerri</div>
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
                <Link href="/contact" className="text-white/85 hover:text-white">
                  Get in Touch
                </Link>
              </div>
              <div>
                <Link
                  href="/contact#give"
                  className="text-white/85 hover:text-white"
                >
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