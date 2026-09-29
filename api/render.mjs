import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "../server-dist/entry-server.mjs";
import { applyTemplate } from "../server/html.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export default async function handler(request, response) {
  const slug = request.query?.slug;
  if (typeof slug !== "string" || !/^[a-z0-9-]+$/.test(slug)) {
    response.status(404).setHeader("Content-Type", "text/plain; charset=utf-8").send("Unknown scenario.");
    return;
  }

  try {
    const template = fs.readFileSync(path.join(projectRoot, "server-dist/index.html"), "utf8");
    const rendered = await render(`/scenarios/${slug}/ssr`);
    if (!rendered.payload) {
      response.status(404).setHeader("Content-Type", "text/plain; charset=utf-8").send("Unknown scenario.");
      return;
    }
    response
      .status(200)
      .setHeader("Content-Type", "text/html; charset=utf-8")
      .setHeader("Cache-Control", "no-store")
      .send(applyTemplate(template, rendered));
  } catch {
    console.error("SSR render failed");
    response.status(500).setHeader("Content-Type", "text/plain; charset=utf-8").send("SSR render failed.");
  }
}
