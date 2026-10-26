"use client";

import React, { useEffect } from "react";
import { Project } from "@/data/portfolio";
import {
  X,
  ExternalLink,
  Layers,
  Sparkles,
  Calendar,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Backdrop click handler */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-10 bg-slate-950/95 light:bg-white/95 border border-cyan-400/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-6 right-6 h-9 w-9 rounded-full bg-slate-900 light:bg-slate-200 border border-sky-400/30 flex items-center justify-center text-slate-300 light:text-slate-700 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20 transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Category & Date */}
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-400/30">
            {project.category}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
            <Calendar className="h-3.5 w-3.5 text-cyan-400" />
            {project.date}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3
          id="modal-title"
          className="text-2xl sm:text-3xl font-extrabold text-white light:text-slate-900 mb-2"
        >
          {project.title}
        </h3>
        <p className="text-base font-medium text-sky-400 light:text-sky-600 mb-6">
          {project.subtitle}
        </p>

        {/* Tagline Box */}
        <div className="p-4 rounded-xl bg-sky-950/30 light:bg-sky-50 border border-sky-400/20 text-slate-200 light:text-slate-800 text-sm leading-relaxed mb-6">
          {project.tagline}
        </div>

        {/* Full Description */}
        <div className="mb-6">
          <h4 className="font-mono text-xs uppercase tracking-wider text-sky-400 mb-2">
            System Architecture & Overview
          </h4>
          <p className="text-sm sm:text-base text-slate-300 light:text-slate-700 leading-relaxed font-light">
            {project.description}
          </p>
        </div>

        {/* Key Architectural Details */}
        <div className="mb-8">
          <h4 className="font-mono text-xs uppercase tracking-wider text-sky-400 mb-3">
            Key Engineering Highlights & Implementations
          </h4>
          <div className="space-y-2.5">
            {project.details.map((detail, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/40 light:bg-slate-100 border border-sky-500/10 text-xs sm:text-sm text-slate-300 light:text-slate-700"
              >
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Pill Grid */}
        <div className="mb-8">
          <h4 className="font-mono text-xs uppercase tracking-wider text-sky-400 mb-3">
            Core Technical Metrics
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-sky-950/40 light:bg-sky-100/60 border border-sky-400/20 text-center"
              >
                <span className="block font-mono text-xs font-semibold text-cyan-300 light:text-sky-800">
                  {metric}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="mb-8">
          <h4 className="font-mono text-xs uppercase tracking-wider text-sky-400 mb-3">
            Technologies & Libraries
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-200 light:text-slate-800 bg-slate-900/80 light:bg-slate-100 border border-sky-400/25"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-sky-500/15 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 border border-sky-400/30 hover:border-cyan-400 transition-all"
            >
              <GithubIcon className="h-4 w-4 text-cyan-400" />
              <span>Source Repository</span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </a>

            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_16px_rgba(0,240,255,0.3)] transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>Live Demonstration</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
          >
            [CLOSE ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
