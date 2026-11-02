import { readdirSync, readFileSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";
import GithubSlugger from "github-slugger";

const root = process.cwd();
const docsDir = join(root, "content", "docs");

function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });
}

function routeFor(file) {
  let rel = relative(docsDir, file).split(sep).join("/");
  rel = rel.slice(0, -extname(rel).length);
  if (rel === "index") {
    return "/docs";
  }
  if (rel.endsWith("/index")) {
    return `/docs/${rel.slice(0, -"/index".length)}`;
  }
  return `/docs/${rel}`;
}

function stripCodeFences(source) {
  return source.replace(/```[\s\S]*?```/g, "");
}

function headingText(raw) {
  return raw
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[*_~]/g, "")
    .trim();
}

function headings(source) {
  const slugger = new GithubSlugger();
  const ids = new Set();
  for (const line of source.split("\n")) {
    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (match) {
      ids.add(slugger.slug(headingText(match[2])));
    }
  }
  return ids;
}

const pages = new Map();
for (const file of files(docsDir).filter((path) => /\.(md|mdx)$/.test(path))) {
  const source = readFileSync(file, "utf8");
  pages.set(routeFor(file), {
    file,
    headings: headings(stripCodeFences(source)),
    source: stripCodeFences(source),
  });
}

const knownStaticRoutes = new Set(["/", "/demo"]);
const errors = [];
const linkPattern = /\]\((\/[^)\s]+)\)/g;

for (const [route, page] of pages) {
  for (const match of page.source.matchAll(linkPattern)) {
    const href = match[1];
    const url = new URL(href, "https://wicklib.com");
    const pathname = url.pathname.replace(/\/$/, "") || "/";
    if (!pathname.startsWith("/docs")) {
      if (!knownStaticRoutes.has(pathname)) {
        continue;
      }
      continue;
    }

    const target = pathname === "/docs" ? pages.get("/docs") : pages.get(pathname);
    if (!target) {
      errors.push(`${relative(root, page.file)}: missing route ${pathname}`);
      continue;
    }

    if (url.hash) {
      const anchor = decodeURIComponent(url.hash.slice(1));
      if (!target.headings.has(anchor)) {
        errors.push(`${relative(root, page.file)}: missing anchor ${pathname}#${anchor}`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error("Documentation check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Documentation check passed: ${pages.size} pages.`);
