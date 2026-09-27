export const renderModes = ["csr", "ssr", "ssg"] as const;

export type RenderMode = (typeof renderModes)[number];

export function isRenderMode(value: string): value is RenderMode {
  return (renderModes as readonly string[]).includes(value);
}

const modeLabels: Record<RenderMode, string> = {
  csr: "CSR",
  ssr: "SSR",
  ssg: "SSG",
};

export function renderModeLabel(mode: RenderMode): string {
  return modeLabels[mode];
}

export type WidgetInstance = {
  label: string;
  publishedKey?: string;
  rulesetPublishedKey?: string;
  params?: {
    [name: string]:
      | string
      | number
      | boolean
      | null
      | undefined
      | { [name: string]: string | number | boolean | null | undefined };
  };
  placeholderValues?: unknown;
  componentProps?: Record<string, { placeholderValues: { price: string } }>;
  errorFallback: string;
  missingEnv: string[];
};

const priceTextId = "5d7f0604-ddfa-4db4-9d2c-da677faba851";
const priceChildEmbeddingId = "fed4c349-6dca-478e-bba2-99cdebb8ceba";
const firstTreeEmbeddingId = "ddcabae5-0245-47b3-95db-f8fbc872ea26";
const secondTreeEmbeddingId = "e0a36146-d0d5-4358-a70e-5480ed898e0b";

function envValue(name: keyof ImportMetaEnv): string | undefined {
  const value = import.meta.env[name];
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed || undefined;
}

export function ruleCmsToken(): string | undefined {
  return envValue("VITE_RULECMS_TOKEN");
}

function key(name: keyof ImportMetaEnv): { value: string | undefined; name: string } {
  return { value: envValue(name), name: String(name) };
}

function publishedInstance(
  label: string,
  envName: keyof ImportMetaEnv,
  extras: Pick<
    WidgetInstance,
    "placeholderValues" | "componentProps" | "errorFallback"
  >,
): WidgetInstance {
  const resolved = key(envName);
  return {
    label,
    publishedKey: resolved.value,
    missingEnv: resolved.value ? [] : [resolved.name],
    ...extras,
  };
}

export function widgetInstances(slug: string): WidgetInstance[] | undefined {
  if (slug === "nested-collections") {
    return [
      publishedInstance(
        "Nested collections",
        "VITE_RULECMS_WIDGET_KEY_NESTED_COLLECTIONS",
        { errorFallback: "This widget could not be loaded." },
      ),
    ];
  }
  if (slug === "text-component") {
    return [
      publishedInstance(
        "Text component",
        "VITE_RULECMS_WIDGET_KEY_TEXT_COMPONENT",
        {
          placeholderValues: { price: 65 },
          errorFallback: "This widget could not be loaded.",
        },
      ),
    ];
  }
  if (slug === "collection-dynamic-price") {
    return [
      publishedInstance(
        "Collection dynamic price",
        "VITE_RULECMS_WIDGET_KEY_COLLECTION_DYNAMIC_PRICE",
        {
          placeholderValues: { price: "$125" },
          errorFallback: "This widget could not be loaded.",
        },
      ),
    ];
  }
  if (slug === "two-embedded-price-trees") {
    const firstPath = `${firstTreeEmbeddingId}/${priceChildEmbeddingId}/${priceTextId}`;
    const secondPath = `${secondTreeEmbeddingId}/${priceChildEmbeddingId}/${priceTextId}`;
    return [
      publishedInstance(
        "Two embedded price trees",
        "VITE_RULECMS_WIDGET_KEY_TWO_EMBEDDED_PRICE_TREES",
        {
          placeholderValues: null,
          componentProps: {
            [firstPath]: { placeholderValues: { price: "$125" } },
            [secondPath]: { placeholderValues: { price: "$250" } },
          },
          errorFallback: "This widget could not be loaded.",
        },
      ),
    ];
  }
  if (slug === "locale-ruleset") {
    const ruleset = key("VITE_RULECMS_RULESET_KEY_LOCALE");
    const missing = ruleset.value ? [] : [ruleset.name];
    return [
      {
        label: "German locale",
        rulesetPublishedKey: ruleset.value,
        params: { locale: "de-DE" },
        errorFallback: "The German locale could not be resolved.",
        missingEnv: missing,
      },
      {
        label: "Other locale",
        rulesetPublishedKey: ruleset.value,
        params: { locale: "en-US" },
        errorFallback: "The other locale could not be resolved.",
        missingEnv: missing,
      },
    ];
  }
  if (slug === "nested-ruleset") {
    const ruleset = key("VITE_RULECMS_RULESET_KEY_NESTED");
    const missing = ruleset.value ? [] : [ruleset.name];
    const shared = {
      rulesetPublishedKey: ruleset.value,
      missingEnv: missing,
    };
    return [
      {
        ...shared,
        label: "The Pro plan case",
        params: { user: { plan: "pro" }, cart: { value: 10 } },
        errorFallback: "The Pro plan case could not be resolved.",
      },
      {
        ...shared,
        label: "The high-cart case",
        params: { user: { plan: "free" }, cart: { value: 100 } },
        errorFallback: "The high-cart case could not be resolved.",
      },
      {
        ...shared,
        label: "The recent-purchase case",
        params: {
          user: { plan: "free", lastPurchaseAt: "2026-06-01T00:00:00Z" },
          cart: { value: 10 },
        },
        errorFallback: "The recent-purchase case could not be resolved.",
      },
      {
        ...shared,
        label: "The default case",
        params: { user: { plan: "free" }, cart: { value: 10 } },
        errorFallback: "The default case could not be resolved.",
      },
    ];
  }
  return undefined;
}

export function missingEnvNames(instances: WidgetInstance[]): string[] {
  const names = new Set<string>();
  if (!ruleCmsToken()) {
    names.add("VITE_RULECMS_TOKEN");
  }
  for (const instance of instances) {
    for (const name of instance.missingEnv) {
      names.add(name);
    }
  }
  return [...names];
}

export function scenarioPath(slug: string, mode: RenderMode): string {
  return `/scenarios/${slug}/${mode}`;
}
