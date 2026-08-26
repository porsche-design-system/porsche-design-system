import { scssDeprecations } from '@porsche-design-system/scss';
import { type DeprecationSource, publicWrapperExport } from '../types';
import { publishedSource } from './published';

/**
 * Adapts the SCSS package's own deprecated surface into index entries.
 *
 * `scssDeprecations` is derived from the single catalog the shipped partials are generated from, so a
 * deprecated variable or mixin cannot reach a consumer without appearing here. That replaces the
 * earlier approach of re-reading the generated `_*.scss` files and scraping `(deprecated)` markers
 * out of them — a parser that had to tell a top-level declaration from a deprecated map key, and that
 * only ever recovered wording the package had already thrown away.
 */
export const collectScssDeprecations = (): DeprecationSource =>
  publishedSource({
    category: 'scss',
    origin: (framework) => `the SCSS API exposed by ${publicWrapperExport(framework, '/scss')}`,
    reference: 'references/styles/scss.md',
    deprecations: scssDeprecations,
  });
