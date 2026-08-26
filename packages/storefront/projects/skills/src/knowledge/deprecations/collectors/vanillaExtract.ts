import { vanillaExtractDeprecations } from '@porsche-design-system/vanilla-extract/meta';
import { type DeprecationSource, publicWrapperExport } from '../types';
import { publishedSource } from './published';

/**
 * Adapts the vanilla-extract package's own published deprecations into index entries.
 *
 * `vanillaExtractDeprecations` is generated from the `@deprecated` annotations the legacy exports
 * carry, so a deprecated export cannot reach a consumer without appearing here, with the wording that
 * consumer's IDE shows.
 *
 * That replaces the re-export-graph parser this collector used to be — the last filesystem walk over
 * another package's private directory layout — and the prose guessing that duly reported
 * `variables directly` as a migration target.
 */
export const collectVanillaExtractDeprecations = (): DeprecationSource =>
  publishedSource({
    category: 'vanillaExtract',
    origin: (framework) => `the vanilla-extract API exposed by ${publicWrapperExport(framework, '/vanilla-extract')}`,
    reference: 'references/styles/vanilla-extract.md',
    deprecations: vanillaExtractDeprecations,
  });
