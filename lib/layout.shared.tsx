import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "Wicklib",
    },
    links: [
      {
        text: "Documentation",
        url: "/docs",
      },
      {
        text: "GitHub",
        url: "https://github.com/wicklib/wicklib",
        external: true,
      },
    ],
  };
}
