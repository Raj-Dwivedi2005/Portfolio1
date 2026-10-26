import { LinkButton } from "@/components/ui/button";
import { FadeInWhenVisible } from "@/components/ui/fade-in-when-visible";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/data/site-config";
import { Download } from "lucide-react";

export function ResumeSection() {
  return (
    <section id="resume" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <FadeInWhenVisible>
          <SectionHeading
            eyebrow="Resume"
            title="Get the full picture"
            description="Everything above, plus the details that don't fit a webpage — in a single PDF."
          />
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.1}>
          <div className="flex flex-wrap items-center gap-4">
            <LinkButton href={siteConfig.resumeFile} variant="primary">
              <Download className="h-4 w-4" />
              Download PDF
            </LinkButton>
            <LinkButton href={siteConfig.resumeFile} variant="outline">
              View in new tab
            </LinkButton>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
