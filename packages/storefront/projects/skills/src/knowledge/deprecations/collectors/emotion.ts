import { emotionDeprecations } from '@porsche-design-system/emotion/meta';
import { type DeprecationSource, publicWrapperExport } from '../types';
import { publishedSource } from './published';

/**
 * Adapts the Emotion package's own published deprecations into index entries.
 *
 * `emotionDeprecations` is generated from the `@deprecated` annotations the legacy exports carry, so
 * a deprecated export cannot reach a consumer without appearing here, with the wording that
 * consumer's IDE shows.
 *
 * That replaces the filesystem walk this collector used to do over another package's private
 * directory layout, and the prose guessing that duly reported `variables directly` as a migration
 * target.
 */
export const collectEmotionDeprecations = (): DeprecationSource =>
  publishedSource({
    category: 'emotion',
    origin: (framework) => `the Emotion API exposed by ${publicWrapperExport(framework, '/emotion')}`,
    reference: 'references/styles/emotion.md',
    deprecations: emotionDeprecations,
  });
