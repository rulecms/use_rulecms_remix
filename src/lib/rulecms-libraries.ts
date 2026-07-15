import * as sourceComponents from '@rulecms/source-components-react';
import type { LibraryRegistrationMap } from '@rulecms/widget-react';

/**
 * Required since @rulecms/widget-react v15 — the widget package no longer
 * depends on any concrete component library. Eager (static) registration keeps
 * SSR/SSG HTML and hydration in sync.
 */
export const rulecmsLibraries: LibraryRegistrationMap = {
  default: sourceComponents,
};
