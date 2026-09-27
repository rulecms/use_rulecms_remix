import type { RuleCMSWidgetData } from "@rulecms/widget-react/server";
import type { RenderMode } from "./widget-setup";

export type LoadedWidget = {
  label: string;
  publishedKey: string;
  initialData: RuleCMSWidgetData | null;
  error: string | null;
};

export type PagePayload = {
  slug: string;
  mode: Exclude<RenderMode, "csr">;
  widgets: LoadedWidget[];
};
