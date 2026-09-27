import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createServer as createViteServer } from "vite";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = 3001;

function payloadScript(payload) {
  const json = JSON.stringify(payload).replace(/</g, "\\u003c");
  return `<script type="application/json" id="rulecms-payload">${json}</script>`;
}

async function start() {
  const app = express();
  const vite = await createViteServer({
    root: projectRoot,
    server: { middlewareMode: true, hmr: { port: 3002 } },
    appType: "custom",
  });
  app.use(vite.middlewares);
  app.use(async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let template = fs.readFileSync(path.resolve(projectRoot, "index.html"), "utf8");
      template = await vite.transformIndexHtml(url, template);
      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
      const rendered = await render(url);
      const html = template
        .replace("<!--app-html-->", rendered.html)
        .replace("<!--payload-->", payloadScript(rendered.payload));
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (error) {
      vite.ssrFixStacktrace(error);
      next(error);
    }
  });
  const server = app.listen(port, "127.0.0.1", () => {
    const address = server.address();
    console.log(`listening ${JSON.stringify(address)}`);
  });
}

start();
