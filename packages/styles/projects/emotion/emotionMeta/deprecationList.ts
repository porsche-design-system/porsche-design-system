import type { Deprecations } from '@porsche-design-system/shared/deprecation';
import { emotionDeprecationsMeta } from './deprecations';

/**
 * The published deprecated surface: the generated catalog as an ordered flat list of export names
 * and markers. This is what consumers read — the domain keys only record which domains were checked.
 * Kept beside the generated catalog rather than inside it, since that file is emitted by
 * `scripts/build.ts`.
 */
export const emotionDeprecations: Deprecations = Object.values(emotionDeprecationsMeta)
  .flat()
  .map(({ name, deprecation }) => ({ identifier: name, deprecation }));
