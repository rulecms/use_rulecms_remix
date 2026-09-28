import type { RenderMode, WidgetInstance } from "./widget-setup";
import { widgetInstances } from "./widget-setup";

export type WidgetCall = {
  paragraphs: string[];
  code: string;
};

function sampleAccess(parts: string[]): string {
  // Kept in pieces so Vite does not replace this sample text during the build.
  return parts.join(".");
}

function sampleEnv(name: string): string {
  return sampleAccess(["import", "meta", "env", name]);
}

function sampleProcessEnv(name: string): string {
  return sampleAccess(["process", "env", name]);
}

function quoted(value: string | undefined, envName: string): string {
  return value ? `"${value}"` : `{${sampleEnv(envName)}}`;
}

function librariesLine(): string {
  return "libraries={rulecmsLibraries}";
}

function valueLiteral(value: unknown): string {
  if (value === null) {
    return "null";
  }
  if (typeof value === "string") {
    return `"${value}"`;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return JSON.stringify(value);
}

function paramsLiteral(params: Record<string, unknown> | undefined): string {
  if (!params) {
    return "";
  }
  return `params={${JSON.stringify(params)}}`;
}

function instanceLines(instance: WidgetInstance, mode: RenderMode): string[] {
  const lines: string[] = [];
  if (mode === "csr") {
    lines.push(`token={${sampleEnv("VITE_RULECMS_TOKEN")}}`);
  } else {
    lines.push('mode="pre-fetched"');
    lines.push("initialData={widgetData}");
  }
  if (instance.rulesetPublishedKey !== undefined || instance.missingEnv.length > 0) {
    const envName = instance.missingEnv[0] ?? "VITE_RULECMS_RULESET_KEY";
    lines.push(
      `rulesetPublishedKey=${quoted(instance.rulesetPublishedKey, envName)}`,
    );
    const params = paramsLiteral(instance.params);
    if (params) {
      lines.push(params);
    }
    lines.push("anonymousId={false}");
  } else {
    lines.push(
      `publishedKey=${quoted(instance.publishedKey, instance.missingEnv[0] ?? "VITE_RULECMS_WIDGET_KEY")}`,
    );
  }
  lines.push(librariesLine());
  if (instance.placeholderValues !== undefined) {
    lines.push(
      `placeholderValues={${valueLiteral(instance.placeholderValues)}}`,
    );
  }
  if (instance.componentProps) {
    lines.push(`componentProps={${JSON.stringify(instance.componentProps, null, 2)}}`);
  }
  return lines;
}

function tag(instance: WidgetInstance, mode: RenderMode): string {
  const body = instanceLines(instance, mode)
    .flatMap((line) => line.split("\n"))
    .map((line) => `  ${line}`)
    .join("\n");
  return `<RuleCMSWidget\n${body}\n/>`;
}

function fetchBlock(instance: WidgetInstance): string {
  const target = instance.rulesetPublishedKey
    ? `rulesetPublishedKey: ${quoted(instance.rulesetPublishedKey, instance.missingEnv[0] ?? "VITE_RULECMS_RULESET_KEY")},\n  params: ${JSON.stringify(instance.params)}`
    : `publishedKey: ${quoted(instance.publishedKey, instance.missingEnv[0] ?? "VITE_RULECMS_WIDGET_KEY")}`;
  return `const widgetData = await fetchRuleCMSWidget({\n  token: ${sampleProcessEnv("VITE_RULECMS_TOKEN")},\n  ${target},\n  fetchOptions: { cache: "no-store" },\n});`;
}

const sharedWhy =
  "rulecmsLibraries is the eager @rulecms/source-components-react module, so the server HTML and the hydrated page use the same components. Styles on this page stay in the notes, the mode bar, and this popup. The widget itself is not wrapped in host CSS.";

export function widgetCallFor(slug: string, mode: RenderMode): WidgetCall | undefined {
  const instances = widgetInstances(slug);
  if (!instances) {
    return undefined;
  }
  const paragraphs = [sharedWhy];
  if (mode === "csr") {
    paragraphs.unshift(
      "This page renders RuleCMSWidget in the browser. The server sends the page shell, and the widget fetches itself after JavaScript loads. The token is VITE_RULECMS_TOKEN. Its value is not shown here.",
    );
  } else if (mode === "ssr") {
    paragraphs.unshift(
      "This page calls fetchRuleCMSWidget on the server for every request, then renders RuleCMSWidget with mode pre-fetched. The widget HTML is already in the response. The token stays on the server and is not shown here.",
    );
  } else {
    paragraphs.unshift(
      "This page calls fetchRuleCMSWidget once, then reuses that result for later requests. The widget HTML is already in the response. A production build would write that same HTML to a static file. The token stays on the server and is not shown here.",
    );
  }
  if (instances.some((instance) => instance.rulesetPublishedKey !== undefined || instance.params)) {
    paragraphs.push(
      "anonymousId is false so the page does not add a stored visitor id. The params below are the only values sent to the ruleset.",
    );
  }
  const code = instances
    .map((instance) => {
      if (mode === "csr") {
        return tag(instance, mode);
      }
      return `${fetchBlock(instance)}\n\n${tag(instance, mode)}`;
    })
    .join("\n\n");
  return { paragraphs, code };
}
