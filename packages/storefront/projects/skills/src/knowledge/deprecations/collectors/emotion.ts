import { emotionDeprecations } from '@porsche-design-system/emotion/meta';
import type { DeprecationSource } from '../types';
import { styleAliasSource } from './styleAlias';

/**
 * Adapts the Emotion package's own deprecation catalog into index entries.
 *
 * `emotionDeprecationsMeta` is generated from the `@deprecated` annotations the legacy exports carry,
 * so a deprecated export cannot reach a consumer without appearing here, with the wording that
 * consumer's IDE shows.
 *
 * That replaces the filesystem walk this collector used to do over another package's private
 * directory layout, and the prose guessing that duly reported `variables directly` as a migration
 * target.
 */
export const collectEmotionDeprecations = (): DeprecationSource =>
  styleAliasSource({
    category: 'emotion',
    origin:
      'the `emotionDeprecationsMeta` catalog of `@porsche-design-system/emotion`, generated from the ' +
      '`@deprecated` annotations on its legacy exports',
    reference: 'references/styles/emotion.md',
    deprecations: emotionDeprecations,
  });
