"use client";

import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      {/* Sticky Glass Navbar */}
      <Navbar />

      <main className="flex-1 w-full relative">
        {/* 1. HERO SECTION */}
        <HeroSection />

        {/* 2. SUMMARY / ABOUT */}
        <AboutSection />

        {/* 3. EDUCATION */}
        <EducationSection />

        {/* 4. TECHNICAL SKILLS */}
        <SkillsSection />

        {/* 5. EXPERIENCE */}
        <ExperienceSection />

        {/* 6. PROJECTS */}
        <ProjectsSection />

        {/* 7. CERTIFICATIONS */}
        <CertificationsSection />

        {/* 8. ACHIEVEMENTS & LANGUAGES */}
        <AchievementsSection />

        {/* 9. CONTACT / FOOTER */}
        <ContactSection />
      </main>
    </>
  );
}
