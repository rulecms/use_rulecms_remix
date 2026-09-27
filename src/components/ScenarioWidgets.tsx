import { RuleCMSWidget } from "@rulecms/widget-react";
import { rulecmsLibraries } from "../lib/rulecms-libraries";
import type { PagePayload } from "../lib/payload";
import {
  missingEnvNames,
  ruleCmsToken,
  widgetInstances,
  type RenderMode,
  type WidgetInstance,
} from "../lib/widget-setup";

function ClientWidget({ instance }: { instance: WidgetInstance }) {
  const token = ruleCmsToken();
  const shared = {
    token,
    libraries: rulecmsLibraries,
    placeholderValues: instance.placeholderValues,
    componentProps: instance.componentProps,
  };
  if (instance.rulesetPublishedKey) {
    return (
      <RuleCMSWidget
        {...shared}
        rulesetPublishedKey={instance.rulesetPublishedKey}
        params={instance.params}
        anonymousId={false}
      />
    );
  }
  return <RuleCMSWidget {...shared} publishedKey={instance.publishedKey ?? ""} />;
}

export function ScenarioWidgets({
  slug,
  mode,
  payload,
}: {
  slug: string;
  mode: RenderMode;
  payload: PagePayload | null;
}) {
  const instances = widgetInstances(slug) ?? [];
  const missing = missingEnvNames(instances);
  if (missing.length > 0) {
    return (
      <p>
        Not configured. Set {missing.join(" and ")} and restart the server.
      </p>
    );
  }

  if (mode === "csr") {
    return (
      <>
        {instances.map((instance) => (
          <ClientWidget key={instance.label} instance={instance} />
        ))}
      </>
    );
  }

  const widgets = payload?.slug === slug && payload.mode === mode ? payload.widgets : [];
  if (widgets.length === 0) {
    return <p>This {mode.toUpperCase()} page is rendered by the server.</p>;
  }

  return (
    <>
      {widgets.map((widget, index) => {
        const instance = instances[index];
        if (!widget.initialData || !widget.publishedKey) {
          return <p key={widget.label}>{widget.error}</p>;
        }
        return (
          <RuleCMSWidget
            key={widget.label}
            mode="pre-fetched"
            publishedKey={widget.publishedKey}
            initialData={widget.initialData}
            libraries={rulecmsLibraries}
            placeholderValues={instance?.placeholderValues}
            componentProps={instance?.componentProps}
          />
        );
      })}
    </>
  );
}
