import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import type { PagePayload } from "./lib/payload";
import { isRenderMode } from "./lib/widget-setup";
import { getScenario } from "./lib/scenarios";
import { loadScenario } from "./server/load-widgets";

function scenarioRequest(url: string): { slug: string; mode: "ssr" | "ssg" } | null {
  const path = url.split("?")[0] ?? "/";
  const match = path.match(/^\/scenarios\/([^/]+)\/(csr|ssr|ssg)\/?$/);
  if (!match) {
    return null;
  }
  const slug = decodeURIComponent(match[1]);
  const mode = match[2];
  if (!isRenderMode(mode) || mode === "csr" || !getScenario(slug)) {
    return null;
  }
  return { slug, mode };
}

export async function render(url: string): Promise<{
  html: string;
  payload: PagePayload | null;
}> {
  const request = scenarioRequest(url);
  const payload: PagePayload | null = request
    ? {
        slug: request.slug,
        mode: request.mode,
        widgets: await loadScenario(request.slug, request.mode),
      }
    : null;
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App payload={payload} />
      </StaticRouter>
    </StrictMode>,
  );
  return { html, payload };
}
