import { vanillaExtractDeprecationsMeta } from '@porsche-design-system/vanilla-extract/meta';
import type { DeprecationSource } from '../types';

/**
 * Adapts the vanilla-extract package's own deprecation catalog into index entries.
 *
 * `vanillaExtractDeprecationsMeta` is generated from the `@deprecated` annotations the legacy exports
 * carry, so a deprecated export cannot reach a consumer without appearing here, with the wording that
 * consumer's IDE shows. This file adds only the rule-ID scheme, source category and reference path.
 *
 * That replaces the re-export-graph parser this collector used to be — the last filesystem walk over
 * another package's private directory layout — and the prose guessing that duly reported
 * `variables directly` as a migration target.
 */

/** The reference documenting the current vanilla-extract API every entry points at. */
const REFERENCE = 'references/styles/vanilla-extract.md';

export const collectVanillaExtractDeprecations = (): DeprecationSource => ({
  category: 'vanillaExtract',
  origin:
    'the `vanillaExtractDeprecationsMeta` catalog of `@porsche-design-system/vanilla-extract`, ' +
    'generated from the `@deprecated` annotations on its legacy exports',
  // Catalog order is the rendered order: the package decides how the section reads.
  entries: Object.values(vanillaExtractDeprecationsMeta)
    .flat()
    .map(({ name, deprecation }) => ({
      id: `styleAlias/vanillaExtract/${name}`,
      kind: 'styleAlias',
      source: 'vanillaExtract',
      identifier: name,
      message: deprecation.message,
      reference: REFERENCE,
    })),
});
