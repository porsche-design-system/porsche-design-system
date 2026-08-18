import { emotionDeprecationsMeta } from '@porsche-design-system/emotion/meta';
import type { DeprecationSource } from '../types';

/**
 * Adapts the Emotion package's own deprecation catalog into index entries.
 *
 * `emotionDeprecationsMeta` is generated from the `@deprecated` annotations the legacy exports carry,
 * so a deprecated export cannot reach a consumer without appearing here, with the wording that
 * consumer's IDE shows. This file adds only the rule-ID scheme, source category and reference path.
 *
 * That replaces the filesystem walk this collector used to do over another package's private
 * directory layout, and the prose guessing that duly reported `variables directly` as a migration
 * target.
 */

/** The reference documenting the current Emotion API every entry points at. */
const REFERENCE = 'references/styles/emotion.md';

export const collectEmotionDeprecations = (): DeprecationSource => ({
  category: 'emotion',
  origin:
    'the `emotionDeprecationsMeta` catalog of `@porsche-design-system/emotion`, generated from the ' +
    '`@deprecated` annotations on its legacy exports',
  // Catalog order is the rendered order: the package decides how the section reads.
  entries: Object.values(emotionDeprecationsMeta)
    .flat()
    .map(({ name, deprecation }) => ({
      id: `styleAlias/emotion/${name}`,
      kind: 'styleAlias',
      source: 'emotion',
      identifier: name,
      message: deprecation.message,
      reference: REFERENCE,
    })),
});
