import { vanillaExtractDeprecations } from '@porsche-design-system/vanilla-extract/meta';
import type { DeprecationSource } from '../types';
import { styleAliasSource } from './styleAlias';

/**
 * Adapts the vanilla-extract package's own deprecation catalog into index entries.
 *
 * `vanillaExtractDeprecationsMeta` is generated from the `@deprecated` annotations the legacy exports
 * carry, so a deprecated export cannot reach a consumer without appearing here, with the wording that
 * consumer's IDE shows.
 *
 * That replaces the re-export-graph parser this collector used to be — the last filesystem walk over
 * another package's private directory layout — and the prose guessing that duly reported
 * `variables directly` as a migration target.
 */
export const collectVanillaExtractDeprecations = (): DeprecationSource =>
  styleAliasSource({
    category: 'vanillaExtract',
    origin:
      'the `vanillaExtractDeprecationsMeta` catalog of `@porsche-design-system/vanilla-extract`, ' +
      'generated from the `@deprecated` annotations on its legacy exports',
    reference: 'references/styles/vanilla-extract.md',
    deprecations: vanillaExtractDeprecations,
  });
