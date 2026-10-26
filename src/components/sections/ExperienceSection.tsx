"use client";

import React, { useRef, useEffect, useState } from "react";
import { portfolioData, Experience } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Cpu,
  ChevronRight,
  Plane,
} from "lucide-react";

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const total = rect.height;
      const current = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, current / (total + windowHeight * 0.5)));
      setScrollPercentage(progress * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        number="04"
        badge="FLIGHT LOG / MISSIONS"
        title="Professional Experience"
        subtitle="Industry internships focused on artificial intelligence pipelines and end-to-end full-stack architectures."
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Animated Self-Drawing Flight Timeline Line */}
        <div className="absolute left-4 sm:left-8 top-3 bottom-3 w-[2px] bg-slate-800 light:bg-slate-300">
          <div
            className="w-full bg-gradient-to-b from-cyan-400 via-sky-400 to-blue-500 shadow-[0_0_12px_#00f0ff] transition-all duration-150"
            style={{ height: `${scrollPercentage}%` }}
          />
        </div>

        <div className="space-y-12 sm:space-y-16">
          {portfolioData.experience.map((exp: Experience, idx: number) => {
            return (
              <div
                key={exp.id}
                className="relative pl-12 sm:pl-20 group"
              >
                {/* Timeline Waypoint Node with Pulsing Beacon */}
                <div className="absolute left-[7px] sm:left-[23px] top-6 -translate-x-1/2 flex items-center justify-center">
                  <div className="h-6 w-6 rounded-full bg-slate-950 light:bg-white border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_16px_rgba(0,240,255,0.4)] group-hover:scale-125 transition-transform">
                    <div className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                  </div>
                </div>

                {/* Experience Glass Card */}
                <div className="glass-card rounded-2xl p-6 sm:p-8 border-sky-500/20 group-hover:border-cyan-400/40 transition-all">
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-sky-500/15">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                          MISSION 0{idx + 1}
                        </span>
                        <span className="text-sky-500/40">/</span>
                        <span className="font-mono text-xs text-sky-400">
                          {exp.type}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-base font-medium text-sky-300 light:text-sky-700">
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1">
                      <div className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-300 light:text-slate-600 bg-slate-900/50 light:bg-slate-100 px-3 py-1 rounded-full border border-sky-500/15">
                        <Calendar className="h-3 w-3 text-cyan-400" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-400 light:text-slate-500">
                        <MapPin className="h-3 w-3 text-sky-400" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary Description */}
                  <p className="text-sm sm:text-base text-slate-300 light:text-slate-700 leading-relaxed font-light mb-5">
                    {exp.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2.5 mb-6">
                    {exp.bullets.map((bullet: string, bIdx: number) => (
                      <div
                        key={bIdx}
                        className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 light:text-slate-700 leading-normal"
                      >
                        <ChevronRight className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Chips */}
                  <div className="pt-4 border-t border-sky-500/15 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] text-sky-400 uppercase tracking-wider mr-1">
                      Stack:
                    </span>
                    {exp.technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium text-cyan-300 light:text-sky-800 bg-sky-950/60 light:bg-sky-100 border border-sky-400/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
