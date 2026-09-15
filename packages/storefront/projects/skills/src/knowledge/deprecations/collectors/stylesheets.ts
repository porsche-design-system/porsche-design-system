import { stylesheetsDeprecations } from '@porsche-design-system/stylesheets/meta';
import { type DeprecationSource, publicWrapperExport } from '../types';
import { publishedSource } from './published';

/**
 * Adapts the stylesheets package's own deprecated surface into index entries.
 *
 * `stylesheetsDeprecations` is derived from the single catalog the shipped global stylesheets are
 * generated from, so a deprecated CSS variable or color-scheme class cannot reach a consumer without
 * appearing here. That replaces the marker scan this collector used to run over the package's source
 * directory — a grep that could only ever report a file path, never a custom property, and that
 * reported "nothing deprecated" both when there was nothing and when nobody had written the marker
 * it was looking for.
 *
 * It is empty today, which is a derived result rather than a declaration: the day a declaration
 * gains a `deprecation`, the entry appears here with the replacement it names.
 */
export const collectStylesheetDeprecations = (): DeprecationSource =>
  publishedSource({
    category: 'stylesheets',
    origin: (framework) =>
      `the global CSS exposed by ${publicWrapperExport(framework, '/index.css')}, including ` +
      `${publicWrapperExport(framework, '/variables.css')} and ${publicWrapperExport(framework, '/color-scheme.css')}`,
    reference: 'references/stylesheets.md',
    deprecations: stylesheetsDeprecations,
  });
