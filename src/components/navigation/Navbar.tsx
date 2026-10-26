"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { portfolioData } from "@/data/portfolio";
import {
  Sun,
  Moon,
  Menu,
  X,
  FileText,
  Compass,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/ui/Icons";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const Navbar: React.FC = () => {
  const { theme, toggleTheme, isMounted } = useTheme();
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Section scroll spy
      const sections = ["hero", ...NAV_ITEMS.map((item) => item.href.slice(1))];
      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "glass-panel py-3 bg-[#030712]/80 light:bg-[#ffffff]/85 border-b border-sky-500/15"
            : "bg-transparent py-5"
        }`}
      >
        {/* Real-time scroll progress bar */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Callsign */}
            <a
              href="#hero"
              className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
            >
              <div className="h-9 w-9 rounded-lg bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:scale-105 transition-all">
                <Compass className="h-5 w-5 animate-spin-slow" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-slate-100 light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                  {portfolioData.personal.name}
                </span>
                <span className="font-mono text-[10px] tracking-widest text-sky-400/70">
                  {portfolioData.personal.callsign}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links (Scrollspy) */}
            <nav className="hidden xl:flex items-center gap-1 rounded-full px-3 py-1.5 glass-panel bg-slate-900/50 light:bg-slate-100/60 border-sky-500/20">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`relative px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                      isActive
                        ? "text-cyan-300 light:text-sky-700 bg-sky-500/15 border border-sky-400/30 shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                        : "text-slate-300 light:text-slate-600 hover:text-white light:hover:text-slate-900 hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Action Buttons & Socials */}
            <div className="flex items-center gap-2.5">
              {/* GitHub */}
              <a
                href={portfolioData.personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="hidden sm:flex h-8 w-8 rounded-lg items-center justify-center text-slate-300 light:text-slate-700 hover:text-cyan-400 hover:bg-sky-500/10 border border-transparent hover:border-sky-400/20 transition-all"
              >
                <GithubIcon className="h-4 w-4" />
              </a>

              {/* LinkedIn */}
              <a
                href={portfolioData.personal.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="hidden sm:flex h-8 w-8 rounded-lg items-center justify-center text-slate-300 light:text-slate-700 hover:text-cyan-400 hover:bg-sky-500/10 border border-transparent hover:border-sky-400/20 transition-all"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>

              {/* LeetCode */}
              <a
                href={portfolioData.personal.social.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode Profile"
                className="hidden sm:flex h-8 w-8 rounded-lg items-center justify-center text-slate-300 light:text-slate-700 hover:text-cyan-400 hover:bg-sky-500/10 border border-transparent hover:border-sky-400/20 transition-all"
              >
                <LeetcodeIcon className="h-4 w-4" />
              </a>

              {/* Resume download quick link */}
              <a
                href="/resume.pdf"
                download="Raj_Dwivedi_Resume.pdf"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 light:text-slate-800 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-400/30 hover:border-sky-400/60 transition-all"
              >
                <FileText className="h-3.5 w-3.5 text-cyan-400" />
                <span>Resume</span>
              </a>

              {/* Theme Toggle Button */}
              {isMounted && (
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-300 light:text-slate-700 hover:text-cyan-400 hover:bg-sky-500/10 border border-sky-400/20 transition-all"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4 text-amber-400" />
                  ) : (
                    <Moon className="h-4 w-4 text-sky-600" />
                  )}
                </button>
              )}

              {/* Mobile menu trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="xl:hidden h-8 w-8 rounded-lg flex items-center justify-center text-slate-300 light:text-slate-700 hover:bg-sky-500/10 border border-sky-400/20 transition-all"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden glass-panel mt-3 mx-4 p-4 rounded-2xl bg-slate-950/95 light:bg-white/95 border border-sky-500/25 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
                      isActive
                        ? "text-cyan-400 light:text-sky-700 bg-sky-500/15 border border-sky-400/30"
                        : "text-slate-300 light:text-slate-700 hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-sky-500/15 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <a
                  href={portfolioData.personal.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="text-slate-400 hover:text-cyan-400"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href={portfolioData.personal.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="text-slate-400 hover:text-cyan-400"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
                <a
                  href={portfolioData.personal.social.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode Profile"
                  className="text-slate-400 hover:text-cyan-400"
                >
                  <LeetcodeIcon className="h-4 w-4" />
                </a>
              </div>
              <a
                href="/resume.pdf"
                download="Raj_Dwivedi_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
