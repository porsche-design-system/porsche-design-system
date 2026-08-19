import { type PublishedDeprecation, publishDeprecations } from '@porsche-design-system/shared/deprecation';
import { emotionDeprecationsMeta } from './deprecations';
import type { DeprecatedEmotionNode } from './types';

/**
 * The published deprecated surface: the generated catalog as an ordered flat list of identifiers and
 * markers. This is what consumers read — the domain keys only record which domains were checked.
 * Kept beside the generated catalog rather than inside it, since that file is emitted by
 * `scripts/build.ts`.
 */
export const emotionDeprecations: PublishedDeprecation[] = publishDeprecations<DeprecatedEmotionNode>(
  emotionDeprecationsMeta,
  ({ name }) => name
);
