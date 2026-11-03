import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const packages = [
  {
    name: "core",
    packageName: "@wicklib/core",
    title: "@wicklib/core API",
    description: "Chart, series, panes, indicators, drawings, annotations, themes, and export.",
  },
  {
    name: "indicators",
    packageName: "@wicklib/indicators",
    title: "@wicklib/indicators API",
    description: "Built-in indicator definitions.",
  },
  {
    name: "layouts",
    packageName: "@wicklib/layouts",
    title: "@wicklib/layouts API",
    description: "Free multi-chart grid, synchronization, and layout state.",
  },
  {
    name: "react",
    packageName: "@wicklib/react",
    title: "@wicklib/react API",
    description: "React chart wrapper and useChart.",
  },
  {
    name: "script",
    packageName: "@wicklib/script",
    title: "@wicklib/script API",
    description: "WickScript authoring, compiler, sandbox, runtime, and ta helpers.",
  },
  {
    name: "script-editor",
    packageName: "@wicklib/script-editor",
    title: "@wicklib/script-editor API",
    description: "Monaco-based WickScript editor.",
  },
];

const root = process.cwd();
const typedoc = resolve("node_modules/.bin/typedoc");

for (const item of packages) {
  const out = resolve("content/docs/api", item.name);
  rmSync(out, { force: true, recursive: true });
  mkdirSync(out, { recursive: true });

  execFileSync(
    typedoc,
    [
      "--tsconfig",
      "tsconfig.typedoc.json",
      "--entryPoints",
      `node_modules/${item.packageName}/dist/index.d.ts`,
      "--entryPointStrategy",
      "resolve",
      "--plugin",
      "typedoc-plugin-markdown",
      "--plugin",
      "typedoc-plugin-frontmatter",
      "--fileExtension",
      ".mdx",
      "--entryFileName",
      "index",
      "--readme",
      "none",
      "--outputFileStrategy",
      "modules",
      "--hidePageHeader",
      "--hideBreadcrumbs",
      "--disableSources",
      "--excludePrivate",
      "--excludeInternal",
      "--out",
      out,
    ],
    { cwd: root, stdio: "inherit" },
  );

  const file = join(out, "index.mdx");
  const body = readFileSync(file, "utf8").replace(/^# .+\n+/, "");
  writeFileSync(
    file,
    `---\ntitle: "${item.title}"\ndescription: "${item.description}"\n---\n\n${body}`,
  );
}
