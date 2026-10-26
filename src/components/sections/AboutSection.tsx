"use client";

import React, { useEffect, useState, useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Award, Briefcase, FolderGit2, GraduationCap, CheckCircle2 } from "lucide-react";

export const AboutSection: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        number="01"
        badge="FLIGHT BRIEFING"
        title="About & Professional Summary"
        subtitle="Bridging theoretical machine learning with production-ready software engineering."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Bio Glass Card */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 border-sky-500/20">
          <div className="flex items-center gap-2 mb-4 font-mono text-xs text-cyan-400 tracking-wider">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            <span>OPERATIONAL PROFILE</span>
          </div>

          <p className="text-base sm:text-lg text-slate-200 light:text-slate-800 leading-relaxed font-light mb-6">
            {portfolioData.personal.about}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-sky-500/15">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-300 light:text-slate-700">
                AI/ML pipelines & algorithmic problem solving
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-300 light:text-slate-700">
                High-performance FastAPI & Next.js full-stack systems
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-300 light:text-slate-700">
                Database-driven architectures (SQL & MongoDB)
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-300 light:text-slate-700">
                Clean code, robust Git workflows & Linux environments
              </span>
            </div>
          </div>
        </div>

        {/* Animated Verified Stats Cards (Strictly factual) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {portfolioData.personal.stats.map((stat, idx) => {
            return (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-5 sm:p-6 border-sky-500/20 group hover:border-cyan-400/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs text-sky-400/80 tracking-wider uppercase block mb-1">
                      {stat.label}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                        {hasAnimated ? stat.value : "0"}
                      </span>
                      {stat.suffix && (
                        <span className="text-sm font-mono text-slate-400 light:text-slate-600">
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 light:text-slate-600 mt-1">
                      {stat.subtext}
                    </p>
                  </div>

                  <div className="h-12 w-12 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    {idx === 0 && <Briefcase className="h-5 w-5" />}
                    {idx === 1 && <FolderGit2 className="h-5 w-5" />}
                    {idx === 2 && <GraduationCap className="h-5 w-5" />}
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
