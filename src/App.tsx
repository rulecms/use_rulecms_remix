import { Route, Routes } from "react-router-dom";
import { PagePayloadProvider } from "./lib/page-payload";
import type { PagePayload } from "./lib/payload";
import { Home } from "./routes/Home";
import { ScenarioPage } from "./routes/ScenarioPage";

export default function App({ payload }: { payload: PagePayload | null }) {
  return (
    <PagePayloadProvider payload={payload}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scenarios/:slug/:mode" element={<ScenarioPage />} />
      </Routes>
    </PagePayloadProvider>
  );
}
