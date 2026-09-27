import {
  fetchRuleCMSWidget,
  FetchRuleCMSWidgetError,
} from "@rulecms/widget-react/server";
import type { LoadedWidget } from "../lib/payload";
import type { RenderMode, WidgetInstance } from "../lib/widget-setup";
import { ruleCmsToken, widgetInstances } from "../lib/widget-setup";

const ssgCache = new Map<string, LoadedWidget[]>();

async function loadInstance(instance: WidgetInstance): Promise<LoadedWidget> {
  const token = ruleCmsToken();
  if (!token || instance.missingEnv.length > 0) {
    return {
      label: instance.label,
      publishedKey: "",
      initialData: null,
      error: instance.errorFallback,
    };
  }
  try {
    const initialData = instance.rulesetPublishedKey
      ? await fetchRuleCMSWidget({
          token,
          rulesetPublishedKey: instance.rulesetPublishedKey,
          params: instance.params,
          fetchOptions: { cache: "no-store" },
        })
      : await fetchRuleCMSWidget({
          token,
          publishedKey: instance.publishedKey as string,
          fetchOptions: { cache: "no-store" },
        });
    const publishedKey =
      instance.publishedKey || initialData.selection?.widgetPublishedKey || "";
    return {
      label: instance.label,
      publishedKey,
      initialData,
      error: null,
    };
  } catch (error) {
    const message =
      error instanceof FetchRuleCMSWidgetError ? error.message : "request failed";
    return {
      label: instance.label,
      publishedKey: "",
      initialData: null,
      error: `${instance.errorFallback} (${message})`,
    };
  }
}

export async function loadScenario(
  slug: string,
  mode: Exclude<RenderMode, "csr">,
): Promise<LoadedWidget[]> {
  if (mode === "ssg") {
    const cached = ssgCache.get(slug);
    if (cached) {
      return cached;
    }
  }
  const instances = widgetInstances(slug) ?? [];
  const widgets = await Promise.all(instances.map((instance) => loadInstance(instance)));
  if (mode === "ssg") {
    ssgCache.set(slug, widgets);
  }
  return widgets;
}
