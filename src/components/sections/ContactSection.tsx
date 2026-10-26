"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Mail,
  Phone,
  Copy,
  Check,
  FileText,
  Send,
  PlaneTakeoff,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/ui/Icons";

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2400);
    }
  };

  return (
    <footer
      id="contact"
      className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        number="08"
        badge="FINAL APPROACH & DISPATCH"
        title="Get in Touch"
        subtitle="Open for full-time AI/ML engineering, software development opportunities, and high-impact technical initiatives."
      />

      <div className="max-w-4xl mx-auto mb-16">
        <div className="glass-card rounded-3xl p-6 sm:p-12 border-sky-500/25 relative overflow-hidden">
          {/* Flight Runway Background Graphic Accent */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cyan-500/10 to-transparent" />

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-sky-500/15">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-cyan-400 bg-sky-500/10 border border-sky-400/25 mb-3">
                <PlaneTakeoff className="h-3.5 w-3.5 text-cyan-400" />
                <span>FLIGHT DESPATCH &bull; DIRECT CONTACT</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white light:text-slate-900">
                Let&apos;s Build Something Intelligent.
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={portfolioData.personal.resumeUrl}
                download="Raj_Dwivedi_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-200 light:text-slate-800 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-400/30 hover:border-cyan-400 transition-all"
              >
                <FileText className="h-4 w-4 text-cyan-400" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>

          {/* Interactive Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-sky-500/20 flex items-center justify-between gap-4 group hover:border-cyan-400/50 transition-all">
              <div className="flex items-center gap-3.5 overflow-hidden">
                <div className="h-11 w-11 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="font-mono text-[11px] text-sky-400 uppercase tracking-wider block">
                    Electronic Mail
                  </span>
                  <a
                    href={`mailto:${portfolioData.personal.email}`}
                    className="text-sm sm:text-base font-semibold text-white light:text-slate-900 hover:text-cyan-400 transition-colors truncate block"
                  >
                    {portfolioData.personal.email}
                  </a>
                </div>
              </div>

              {/* Copy to clipboard button */}
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(portfolioData.personal.email, "email")
                }
                title="Copy email address"
                className="h-9 w-9 rounded-lg bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 transition-all shrink-0"
              >
                {copiedEmail ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-5 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-sky-500/20 flex items-center justify-between gap-4 group hover:border-cyan-400/50 transition-all">
              <div className="flex items-center gap-3.5 overflow-hidden">
                <div className="h-11 w-11 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="font-mono text-[11px] text-sky-400 uppercase tracking-wider block">
                    Telephone Line
                  </span>
                  <a
                    href={`tel:${portfolioData.personal.phone}`}
                    className="text-sm sm:text-base font-semibold text-white light:text-slate-900 hover:text-cyan-400 transition-colors truncate block"
                  >
                    {portfolioData.personal.phone}
                  </a>
                </div>
              </div>

              {/* Copy to clipboard button */}
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(portfolioData.personal.phone, "phone")
                }
                title="Copy phone number"
                className="h-9 w-9 rounded-lg bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 transition-all shrink-0"
              >
                {copiedPhone ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Social Profiles Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-sky-500/15">
            <span className="font-mono text-xs text-slate-400 light:text-slate-600">
              CONNECT VIA TELEMETRY:
            </span>

            <div className="flex items-center gap-3">
              <a
                href={portfolioData.personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-slate-300 light:text-slate-700 bg-slate-900/60 light:bg-slate-100 border border-sky-400/25 hover:border-cyan-400 hover:text-cyan-300 transition-all"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub</span>
                <ExternalLink className="h-3 w-3 text-slate-400" />
              </a>

              <a
                href={portfolioData.personal.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-slate-300 light:text-slate-700 bg-slate-900/60 light:bg-slate-100 border border-sky-400/25 hover:border-cyan-400 hover:text-cyan-300 transition-all"
              >
                <LinkedinIcon className="h-4 w-4 text-sky-400" />
                <span>LinkedIn</span>
                <ExternalLink className="h-3 w-3 text-slate-400" />
              </a>

              <a
                href={portfolioData.personal.social.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode Profile"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-slate-300 light:text-slate-700 bg-slate-900/60 light:bg-slate-100 border border-sky-400/25 hover:border-cyan-400 hover:text-cyan-300 transition-all"
              >
                <LeetcodeIcon className="h-4 w-4 text-amber-400" />
                <span>LeetCode</span>
                <ExternalLink className="h-3 w-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Technical Sub-footer */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-sky-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 light:text-slate-600">
        <div className="flex items-center gap-2">
          <span>&copy; 2026 {portfolioData.personal.name}</span>
          <span>&bull;</span>
          <span>All Flight Paths Reserved</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-sky-400/70">
          <span>NEXT.JS APP ROUTER</span>
          <span>&bull;</span>
          <span>THREE.JS WEBGL</span>
          <span>&bull;</span>
          <span>TAILWIND CSS</span>
        </div>
      </div>
    </footer>
  );
};
