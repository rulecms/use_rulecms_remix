/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RULECMS_TOKEN?: string;
  readonly VITE_RULECMS_WIDGET_KEY_NESTED_COLLECTIONS?: string;
  readonly VITE_RULECMS_WIDGET_KEY_TEXT_COMPONENT?: string;
  readonly VITE_RULECMS_WIDGET_KEY_COLLECTION_DYNAMIC_PRICE?: string;
  readonly VITE_RULECMS_WIDGET_KEY_TWO_EMBEDDED_PRICE_TREES?: string;
  readonly VITE_RULECMS_RULESET_KEY_LOCALE?: string;
  readonly VITE_RULECMS_RULESET_KEY_NESTED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
