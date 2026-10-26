import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site-config";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = projects.map((project) => ({
    url: `${siteConfig.siteUrl}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: siteConfig.siteUrl,
      lastModified: new Date(),
    },
    ...projectEntries,
  ];
}
