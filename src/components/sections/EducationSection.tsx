"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GraduationCap, MapPin, Calendar, Award, CheckCircle } from "lucide-react";

export const EducationSection: React.FC = () => {
  const edu = portfolioData.education;

  return (
    <section
      id="education"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        number="02"
        badge="FLIGHT CREDENTIALS"
        title="Academic Foundation"
        subtitle="Rigorous engineering curriculum specializing in artificial intelligence and machine learning."
      />

      <div className="max-w-4xl mx-auto">
        <div className="relative glass-card rounded-3xl p-6 sm:p-10 border-sky-500/25 overflow-hidden">
          {/* Subtle Aviation Radar Watermark */}
          <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-sky-500/10 pointer-events-none" />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-sky-500/10 pointer-events-none" />

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-sky-500/15">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                <GraduationCap className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white light:text-slate-900">
                  {edu.degree}
                </h3>
                <p className="text-cyan-400 light:text-sky-600 font-mono text-sm font-medium">
                  Specialization: {edu.specialization}
                </p>
              </div>
            </div>

            {/* Academic Standing Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400/10 border border-cyan-400/30 font-mono text-xs sm:text-sm text-cyan-300 light:text-sky-700 self-start sm:self-center">
              <Award className="h-4 w-4 text-cyan-400" />
              <span>CGPA: </span>
              <strong className="text-white light:text-slate-900 text-base">
                {edu.cgpa}
              </strong>
            </div>
          </div>

          {/* Institution & Metadata Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="glass-panel p-4 rounded-xl border-sky-500/15">
              <span className="text-[11px] font-mono text-slate-400 light:text-slate-600 uppercase tracking-wider block mb-1">
                Institution
              </span>
              <p className="text-sm font-semibold text-slate-200 light:text-slate-800">
                {edu.institution}
              </p>
              <p className="text-xs text-sky-400">Campus: {edu.campus}</p>
            </div>

            <div className="glass-panel p-4 rounded-xl border-sky-500/15">
              <span className="text-[11px] font-mono text-slate-400 light:text-slate-600 uppercase tracking-wider block mb-1">
                Location
              </span>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-200 light:text-slate-800">
                <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                <span>{edu.location}</span>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-xl border-sky-500/15">
              <span className="text-[11px] font-mono text-slate-400 light:text-slate-600 uppercase tracking-wider block mb-1">
                Timeline
              </span>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-200 light:text-slate-800">
                <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                <span>{edu.period}</span>
              </div>
            </div>
          </div>

          {/* Curriculum & Engineering Highlights */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-sky-400">
              Key Academic Highlights & Coursework
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {edu.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/30 light:bg-slate-100/50 border border-sky-500/10 text-xs sm:text-sm text-slate-300 light:text-slate-700"
                >
                  <CheckCircle className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
