import { WidgetCallDialog } from "./WidgetCallDialog";
import { widgetCallFor } from "../lib/widget-calls";
import type { RenderMode } from "../lib/widget-setup";

export function HowWidgetIsCalled({
  slug,
  mode,
}: {
  slug: string;
  mode: RenderMode;
}) {
  const call = widgetCallFor(slug, mode);
  if (!call) {
    return null;
  }
  return <WidgetCallDialog paragraphs={call.paragraphs} code={call.code} />;
}
