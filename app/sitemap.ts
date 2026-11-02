import type { MetadataRoute } from "next";

import { source } from "@/lib/source";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wicklib.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = source
    .getPages()
    .filter((page) => page.url !== "/docs")
    .map((page) => ({
      url: `${baseUrl}${page.url}`,
      changeFrequency: "weekly" as const,
      priority: page.url.startsWith("/docs/api") ? 0.6 : 0.8,
    }));

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/docs`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demo`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...docs,
  ];
}
