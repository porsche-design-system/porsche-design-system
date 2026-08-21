import { scssDeprecations } from '@porsche-design-system/scss';
import type { DeprecationSource } from '../types';
import { styleAliasSource } from './styleAlias';

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
  styleAliasSource({
    category: 'scss',
    origin:
      'the declaration catalog of `@porsche-design-system/scss`, which the shipped SCSS partials ' +
      '(`@porsche-design-system/components-{js|angular|react|vue}/scss`) are generated from',
    reference: 'references/styles/scss.md',
    deprecations: scssDeprecations,
  });
