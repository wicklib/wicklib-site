import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { Wordmark } from "@/components/wordmark";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Wordmark className="h-7" />,
    },
    links: [
      {
        text: "Documentation",
        url: "/docs",
      },
      {
        text: "Live demo",
        url: "/demo",
      },
      {
        text: "GitHub",
        url: "https://github.com/wicklib/wicklib",
        external: true,
      },
    ],
  };
}
