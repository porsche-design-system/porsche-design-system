import { collectComponentDeprecations } from './collectors/componentMeta';
import { collectEmotionDeprecations } from './collectors/emotion';
import { collectIconDeprecations } from './collectors/icons';
import { collectScssDeprecations } from './collectors/scss';
import { collectStylesheetDeprecations } from './collectors/stylesheets';
import { collectTailwindcssDeprecations } from './collectors/tailwindcss';
import { collectTokenDeprecations } from './collectors/tokens';
import { collectVanillaExtractDeprecations } from './collectors/vanillaExtract';
import type { DeprecationSource, SourceCategory } from './types';
import { SOURCE_CATEGORIES } from './types';

/**
 * Derives the index from every collector in `SOURCE_CATEGORIES` order.
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
};

export const collectDeprecations = (): DeprecationSource[] =>
  SOURCE_CATEGORIES.map((category) => COLLECTORS[category]());
