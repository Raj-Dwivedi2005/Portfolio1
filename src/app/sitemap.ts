import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://rajdwivedi.dev",
      lastModified: new Date("2026-10-26T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
