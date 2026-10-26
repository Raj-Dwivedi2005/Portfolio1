"use client";

import { LinkButton } from "@/components/ui/button";
import { siteConfig } from "@/data/site-config";
import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6"
    >
      {/* ambient background accent — restrained, top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, var(--accent-2) 45%, transparent 70%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-3xl"
      >
        <motion.p
          variants={item}
          className="mb-6 font-mono text-xs uppercase tracking-widest text-[var(--accent)]"
        >
          Software Engineer · AI/ML
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-6xl"
        >
          {siteConfig.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-lg text-[var(--muted)] sm:text-xl"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
          <LinkButton href="#projects" variant="primary">
            View Projects
          </LinkButton>
          <LinkButton href="#resume" variant="outline">
            Resume
          </LinkButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
