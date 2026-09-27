import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import type { PagePayload } from "./lib/payload";

const payloadElement = document.getElementById("rulecms-payload");
const payload = payloadElement?.textContent
  ? (JSON.parse(payloadElement.textContent) as PagePayload | null)
  : null;

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <BrowserRouter>
      <App payload={payload} />
    </BrowserRouter>
  </StrictMode>,
);
