"use client";

import React from "react";
import { portfolioData, Achievement } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  ShieldAlert,
  Compass,
  Languages,
  Award,
  CheckCircle2,
  Sparkles,
  Target,
} from "lucide-react";

export const AchievementsSection: React.FC = () => {
  return (
    <section
      id="achievements"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        number="07"
        badge="HONORS & LINGUISTICS"
        title="Achievements & Languages"
        subtitle="Officer selection leadership evaluation and multilingual communication capabilities."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SSB Interview Achievement Hero Card */}
        <div className="lg:col-span-8 glass-card rounded-3xl p-6 sm:p-10 border-sky-500/25 relative overflow-hidden group">
          {/* Subtle Radar Background Target Circles */}
          <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 h-80 w-80 rounded-full border border-sky-500/10" />
          <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 h-56 w-56 rounded-full border border-sky-500/10" />
          <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 h-32 w-32 rounded-full border border-cyan-400/15" />

          <div className="relative z-10">
            {/* Insignia & Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-amber-300 bg-amber-500/10 border border-amber-400/30">
                <Target className="h-4 w-4 text-amber-400" />
                <span>OFFICER SELECTION BOARD</span>
              </div>
              <span className="font-mono text-xs text-sky-400">
                2x Recommended / Candidate
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors mb-2">
              Services Selection Board (SSB) Interview
            </h3>
            <p className="text-sm font-semibold text-cyan-300 light:text-sky-700 mb-5">
              Indian Armed Forces Officer Selection Evaluation
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 light:text-slate-700 leading-relaxed font-light mb-6">
              Appeared for the comprehensive 5-day Services Selection Board (SSB) interview on two separate occasions for Indian Armed Forces officer selection. Tested across Officer Like Qualities (OLQs), psychological assessments, group task obstacle dynamics (GTO), and personal interview panels evaluating situational awareness, stress resilience, decisiveness, and team leadership.
            </p>

            {/* Key Tested Attributes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-sky-500/15">
              <div className="p-3 rounded-xl bg-slate-900/50 light:bg-slate-100 text-center">
                <span className="block font-mono text-xs text-cyan-400 font-semibold">
                  Leadership
                </span>
                <span className="text-[11px] text-slate-400">Team Command</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/50 light:bg-slate-100 text-center">
                <span className="block font-mono text-xs text-cyan-400 font-semibold">
                  Resilience
                </span>
                <span className="text-[11px] text-slate-400">High Stress</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/50 light:bg-slate-100 text-center">
                <span className="block font-mono text-xs text-cyan-400 font-semibold">
                  Decision-Making
                </span>
                <span className="text-[11px] text-slate-400">Critical Scenarios</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/50 light:bg-slate-100 text-center">
                <span className="block font-mono text-xs text-cyan-400 font-semibold">
                  Synergy
                </span>
                <span className="text-[11px] text-slate-400">Group Dynamics</span>
              </div>
            </div>
          </div>
        </div>

        {/* Languages Card */}
        <div className="lg:col-span-4 glass-card rounded-3xl p-6 sm:p-8 border-sky-500/25 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                <Languages className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white light:text-slate-900">
                  Languages
                </h3>
                <span className="font-mono text-xs text-sky-400/70">
                  Linguistic Proficiency
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {portfolioData.languages.map((lang) => (
                <div
                  key={lang.language}
                  className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-sky-500/15 group hover:border-cyan-400/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-base font-bold text-white light:text-slate-900">
                      {lang.language}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold text-cyan-400 bg-sky-950 border border-sky-400/25">
                      {lang.code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 light:text-slate-600">
                    {lang.proficiency}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-sky-500/15">
            <span className="font-mono text-xs text-sky-400/60 block">
              STATUS: READY FOR GLOBAL COLLABORATION
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
