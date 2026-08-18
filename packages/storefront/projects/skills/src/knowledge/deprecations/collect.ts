import { collectComponentDeprecations } from './collectors/componentMeta';
import { collectEmotionDeprecations } from './collectors/emotion';
import {
  collectIconDeprecations,
  collectPartialDeprecations,
  collectStylesheetDeprecations,
  collectTokenDeprecations,
} from './collectors/scanned';
import { collectScssDeprecations } from './collectors/scss';
import { collectTailwindcssDeprecations } from './collectors/tailwindcss';
import { collectVanillaExtractDeprecations } from './collectors/vanillaExtract';
import type { DeprecationSource, SourceCategory } from './types';
import { SOURCE_CATEGORIES } from './types';

/**
 * Assembles the deprecation index from every source, in the order {@link SOURCE_CATEGORIES} declares.
 *
 * The index is derived, never hand-authored — that is the property the whole audit rests on. A
 * deprecation that exists anywhere in the shipped surface cannot be missing from here without a
 * collector changing, and the completeness gates fail the build when one is.
 */
const COLLECTORS: Record<SourceCategory, () => DeprecationSource> = {
  components: collectComponentDeprecations,
  scss: collectScssDeprecations,
  emotion: collectEmotionDeprecations,
  vanillaExtract: collectVanillaExtractDeprecations,
  tailwindcss: collectTailwindcssDeprecations,
  tokens: collectTokenDeprecations,
  icons: collectIconDeprecations,
  stylesheets: collectStylesheetDeprecations,
  partials: collectPartialDeprecations,
};

/** Every source category, populated or verified-empty, in declaration order. */
export const collectDeprecations = (): DeprecationSource[] =>
  SOURCE_CATEGORIES.map((category) => COLLECTORS[category]());
