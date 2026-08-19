import { type PublishedDeprecation, publishDeprecations } from '@porsche-design-system/shared/deprecation';
import { vanillaExtractDeprecationsMeta } from './deprecations';
import type { DeprecatedVanillaExtractNode } from './types';

/**
 * The published deprecated surface: the generated catalog as an ordered flat list of identifiers and
 * markers. This is what consumers read — the domain keys only record which domains were checked.
 * Kept beside the generated catalog rather than inside it, since that file is emitted by
 * `scripts/build.ts`.
 */
export const vanillaExtractDeprecations: PublishedDeprecation[] = publishDeprecations<DeprecatedVanillaExtractNode>(
  vanillaExtractDeprecationsMeta,
  ({ name }) => name
);
