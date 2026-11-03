import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const packages = [
  { name: "core", packageName: "@wicklib/core", title: "@wicklib/core" },
  { name: "indicators", packageName: "@wicklib/indicators", title: "@wicklib/indicators" },
  { name: "layouts", packageName: "@wicklib/layouts", title: "@wicklib/layouts" },
  { name: "react", packageName: "@wicklib/react", title: "@wicklib/react" },
  { name: "script", packageName: "@wicklib/script", title: "@wicklib/script" },
  { name: "script-editor", packageName: "@wicklib/script-editor", title: "@wicklib/script-editor" },
];

const outDir = join(process.cwd(), "content", "docs", "changelog");
mkdirSync(outDir, { recursive: true });

const generated = [];

for (const item of packages) {
  const installed = JSON.parse(
    readFileSync(join(process.cwd(), "node_modules", item.packageName, "package.json"), "utf8"),
  );
  const url = `https://raw.githubusercontent.com/wicklib/wicklib/main/packages/${item.name}/CHANGELOG.md`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not fetch ${url}: HTTP ${response.status}`);
  }
  const source = await response.text();
  const latest = /^##\s+(\S+)/m.exec(source)?.[1];
  if (!latest) {
    throw new Error(`Could not find a release heading in ${url}`);
  }
  if (latest !== installed.version) {
    throw new Error(
      `${item.packageName}: main changelog is ${latest}, installed package is ${installed.version}. Pin the site to the matching published release before generating.`,
    );
  }

  const body = source.replace(/^# .+\n+/, "");
  writeFileSync(
    join(outDir, `${item.name}.mdx`),
    `---\ntitle: "${item.title} changelog"\ndescription: "Released changes for ${item.title}."\n---\n\n${body}`,
  );
  generated.push({ ...item, version: installed.version });
}

writeFileSync(
  join(outDir, "index.mdx"),
  `---\ntitle: Changelog\ndescription: Released changes for the Wicklib packages.\n---\n\n${generated
    .map((item) => `- [${item.title} ${item.version}](/docs/changelog/${item.name})`)
    .join(
      "\n",
    )}\n\nThese pages are generated from the Changesets changelogs in the Wicklib repository at the version pinned by this site.\n`,
);
