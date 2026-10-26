"use client";

import React, { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";
import {
  ArrowDown,
  FileText,
  Send,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export const HeroSection: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect cycling through roles
  useEffect(() => {
    const roles = portfolioData.personal.roles;
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 85;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentRole.length) {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentRole.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full z-10 text-center">
        {/* Flight Clearance / Callsign Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest text-cyan-400 light:text-sky-700 bg-sky-500/10 light:bg-sky-500/20 border border-sky-400/30 backdrop-blur-md mb-8 animate-fade-in shadow-[0_0_20px_rgba(0,240,255,0.15)]">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-beacon" />
          <span className="font-semibold">FLIGHT FL-2027</span>
          <span className="text-sky-500/40">|</span>
          <span>AIRSPACE: SRM CHENNAI</span>
          <span className="text-sky-500/40">|</span>
          <span className="text-emerald-400">CLEARED FOR DEPARTURE</span>
        </div>

        {/* Main Name Heading */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white light:text-slate-900 mb-6">
          <span className="block drop-shadow-lg">
            {portfolioData.personal.name}
          </span>
        </h1>

        {/* Animated Role Cycling */}
        <div className="h-12 sm:h-14 flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 text-xl sm:text-3xl font-mono font-medium text-cyan-400 light:text-sky-600 bg-sky-950/40 light:bg-sky-100/70 px-5 py-2 rounded-xl border border-sky-500/30">
            <span>&gt;</span>
            <span className="min-w-[200px] text-left">
              {displayedText}
              <span className="inline-block w-2 h-6 bg-cyan-400 ml-1 animate-pulse align-middle" />
            </span>
          </div>
        </div>

        {/* Short Tagline */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 light:text-slate-600 font-light leading-relaxed mb-10">
          {portfolioData.personal.tagline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-16">
          {/* View Projects */}
          <a
            href="#projects"
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_24px_rgba(0,240,255,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="h-4 w-4" />
            <span>View Projects</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Download Resume */}
          <a
            href="/resume.pdf"
            download="Raj_Dwivedi_Resume.pdf"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm text-slate-200 light:text-slate-800 bg-slate-900/60 light:bg-white/80 border border-sky-400/30 hover:border-cyan-400 hover:bg-sky-500/10 transition-all backdrop-blur-md transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <FileText className="h-4 w-4 text-cyan-400" />
            <span>Download Resume</span>
          </a>

          {/* Contact */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm text-slate-300 light:text-slate-700 bg-slate-900/40 light:bg-white/60 border border-slate-700/60 light:border-slate-300 hover:border-sky-400 hover:text-white transition-all backdrop-blur-md transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Send className="h-4 w-4 text-sky-400" />
            <span>Contact</span>
          </a>
        </div>

        {/* Scroll Down Indicator */}
        <a
          href="#about"
          className="inline-flex flex-col items-center gap-2 text-xs font-mono tracking-widest text-sky-400/70 hover:text-cyan-400 transition-colors group"
        >
          <span>SCROLL TO CRUISE</span>
          <div className="h-8 w-5 rounded-full border border-sky-400/40 flex items-start justify-center p-1 group-hover:border-cyan-400">
            <div className="h-1.5 w-1 rounded-full bg-cyan-400 animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
};
