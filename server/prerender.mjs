import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { applyTemplate } from "./html.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const slugs = [
  "nested-collections",
  "text-component",
  "collection-dynamic-price",
  "two-embedded-price-trees",
  "locale-ruleset",
  "nested-ruleset",
];

const { render } = await import(path.join(projectRoot, "server-dist/entry-server.mjs"));
const templatePath = path.join(projectRoot, "dist/index.html");
const template = fs.readFileSync(templatePath, "utf8");
fs.copyFileSync(templatePath, path.join(projectRoot, "server-dist/index.html"));
let failed = false;

for (const slug of slugs) {
  const rendered = await render(`/scenarios/${slug}/ssg`);
  const widgets = rendered.payload?.widgets ?? [];
  const errors = widgets.filter((widget) => !widget.initialData).map((widget) => widget.error);
  if (widgets.length === 0 || errors.length > 0) {
    failed = true;
    console.error(`SSG prerender failed for ${slug}: ${errors.join("; ") || "no widgets"}`);
    continue;
  }
  const directory = path.join(projectRoot, "dist/scenarios", slug, "ssg");
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, "index.html"), applyTemplate(template, rendered));
  console.log(`SSG ${slug}`);
}

if (failed) {
  process.exit(1);
}
