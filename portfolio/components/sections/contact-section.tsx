import { LinkButton } from "@/components/ui/button";
import { FadeInWhenVisible } from "@/components/ui/fade-in-when-visible";
import { siteConfig } from "@/data/site-config";
import { Code2, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export function ContactSection() {
  return (
    <section id="contact" className="px-6 py-24">
      <FadeInWhenVisible>
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
            Contact
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Let&apos;s talk
          </h2>
          <p className="mt-4 text-base text-[var(--muted)]">
            Open to Software Engineer Internship roles. The fastest way to
            reach me is email.
          </p>

          <div className="mt-8 flex justify-center">
            <LinkButton href={`mailto:${siteConfig.email}`} variant="primary">
              <Mail className="h-4 w-4" />
              {siteConfig.email}
            </LinkButton>
          </div>

          <div className="mt-8 flex justify-center gap-6">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.social.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode"
              className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              <Code2 className="h-5 w-5" />
            </a>
          </div>
        </div>
      </FadeInWhenVisible>
    </section>
  );
}
