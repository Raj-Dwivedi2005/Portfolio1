import { FadeInWhenVisible } from "@/components/ui/fade-in-when-visible";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/data/site-config";

const stats = [
  { label: "Graduating", value: "2027" },
  { label: "CGPA", value: "8.88" },
  { label: "DSA Problems Solved", value: "330+" },
  { label: "Based in", value: siteConfig.location },
];

export function AboutSection() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <FadeInWhenVisible>
          <SectionHeading eyebrow="About" title="Who I am" />
        </FadeInWhenVisible>

        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <FadeInWhenVisible delay={0.1}>
            <div className="space-y-4 text-base leading-relaxed text-[var(--muted)]">
              <p>
                I&apos;m a Computer Science (AI/ML) undergraduate at SRM Institute
                of Science and Technology, drawn to the parts of software
                engineering where a system actually has to work end-to-end —
                not just in a notebook, but shipped, tested, and debugged
                across a real stack.
              </p>
              <p>
                That&apos;s shaped how I build: fullstack products like
                TaskFlow and HydroGuard.ai to get comfortable owning a
                feature from database to UI, and applied ML projects like a
                deepfake image classifier to go deep on a specific technical
                problem. Two AI-internship roles added the other half —
                working inside a real team&apos;s codebase, conventions, and
                review process, not just my own.
              </p>
              <p>
                I&apos;m looking for a Software Engineer Internship where I
                can keep doing both: building real product surfaces and
                going deep on the hard technical problems underneath them.
              </p>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-1">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-semibold">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[var(--muted)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}
