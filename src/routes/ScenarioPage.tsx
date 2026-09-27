import { useParams } from "react-router-dom";
import { HowWidgetIsCalled } from "../components/HowWidgetIsCalled";
import { ModeBar } from "../components/ModeBar";
import { ScenarioWidgets } from "../components/ScenarioWidgets";
import { TestNotes } from "../components/TestNotes";
import { usePagePayload } from "../lib/page-payload";
import { getScenario } from "../lib/scenarios";
import { isRenderMode } from "../lib/widget-setup";

export function ScenarioPage() {
  const params = useParams();
  const payload = usePagePayload();
  const slug = params.slug ?? "";
  const mode = params.mode ?? "";
  const scenario = getScenario(slug);

  if (!scenario || !isRenderMode(mode)) {
    return <p>Unknown scenario.</p>;
  }

  return (
    <>
      <TestNotes title={scenario.title} details={scenario.details} />
      <ModeBar slug={scenario.slug} mode={mode} />
      <HowWidgetIsCalled slug={scenario.slug} mode={mode} />
      <ScenarioWidgets slug={scenario.slug} mode={mode} payload={payload} />
    </>
  );
}
