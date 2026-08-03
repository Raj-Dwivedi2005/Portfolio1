import { FadeInWhenVisible } from "@/components/ui/fade-in-when-visible";
import { SectionHeading } from "@/components/ui/section-heading";

export function EducationSection() {
  return (
    <section id="education" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <FadeInWhenVisible>
          <SectionHeading eyebrow="Education" title="Academic background" />
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.1}>
          <div className="grid gap-8 sm:grid-cols-[1.4fr_1fr]">
            <div>
              <h3 className="font-display text-lg font-semibold">
                Bachelor of Technology in Computer Science and Engineering
                (AI/ML)
              </h3>
              <p className="mt-1 text-sm text-[var(--muted)]">
                SRM Institute of Science and Technology, Ramapuram, Chennai
              </p>
              <p className="mt-1 font-mono text-xs text-[var(--muted)]">
                2023 – 2027 · CGPA: 8.88
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">Beyond the Classroom</p>
              <ul className="space-y-1.5 text-sm text-[var(--muted)]">
                <li>Solved 330+ Data Structures &amp; Algorithms problems on LeetCode</li>
                <li>Appeared for the SSB (Services Selection Board) interview on two occasions</li>
              </ul>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
