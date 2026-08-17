import {
  flatten,
  isDeprecated,
  type ScssBranch,
  scssDeprecationMessage,
  scssDeprecationsMeta,
  scssIdentifier,
} from '@porsche-design-system/scss';
import type { DeprecationEntry, DeprecationSource } from '../types';

/**
 * Adapts the SCSS package's own deprecation catalog into index entries.
 *
 * The catalog is authored beside the declarations it describes and is what the shipped partials are
 * generated from, so a deprecated variable or mixin cannot reach a consumer without appearing here.
 * That replaces the earlier approach of re-reading the generated `_*.scss` files and scraping
 * `(deprecated)` markers out of them — a parser that had to tell a top-level declaration from a
 * deprecated map key, and that only ever recovered wording the package had already thrown away.
 *
 * Identity, canonical spelling and message wording all stay package-owned; this file adds only what
 * the audit needs and the package has no business knowing: the rule-ID scheme, the source category
 * and the skill-relative reference path.
 */

/** The reference documenting the current SCSS API every entry points at. */
const REFERENCE = 'references/styles/scss.md';

export const collectScssDeprecations = (): DeprecationSource => {
  // Catalog order is the rendered order: the package decides how the section reads, and rule ids
  // depend only on identifiers, so rows stay comparable across runs regardless of position.
  const entries: DeprecationEntry[] = flatten(scssDeprecationsMeta as ScssBranch)
    .filter(isDeprecated)
    .map((node) => {
      const identifier = scssIdentifier(node);
      return {
        id: `styleAlias/scss/${identifier}`,
        kind: 'styleAlias',
        source: 'scss',
        identifier,
        message: scssDeprecationMessage(node),
        ...(node.deprecation.replacement ? { replacement: node.deprecation.replacement } : {}),
        reference: REFERENCE,
      };
    });

  return {
    category: 'scss',
    origin:
      'the `scssDeprecationsMeta` catalog of `@porsche-design-system/scss`, which the shipped SCSS ' +
      'partials (`@porsche-design-system/components-{js|angular|react|vue}/scss`) are generated from',
    entries,
  };
};
