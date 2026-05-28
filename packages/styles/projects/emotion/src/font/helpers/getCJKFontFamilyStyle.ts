import { fontPorscheNextJa } from './family/fontPorscheNextJa';
import { fontPorscheNextKo } from './family/fontPorscheNextKo';
import { fontPorscheNextZhHans } from './family/fontPorscheNextZhHans';
import { fontPorscheNextZhHant } from './family/fontPorscheNextZhHant';

/**
 * Applies locale-specific **Porsche Next** font stacks for **CJK** languages (Simplified Chinese, Traditional Chinese, Japanese, Korean) based on the element's `lang` attribute.
 * @signature getCJKFontFamilyStyle()
 */
export const getCJKFontFamilyStyle = () => {
  return {
    /* Simplified Chinese */
    '&:lang(zh-Hans), &:lang(zh-CN), &:lang(zh-SG)': {
      fontFamily: fontPorscheNextZhHans,
    },
    /* Traditional Chinese */
    '&:lang(zh-Hant), &:lang(zh-TW), &:lang(zh-HK), &:lang(zh-MO)': {
      fontFamily: fontPorscheNextZhHant,
    },
    /* Japanese */
    '&:lang(ja)': {
      fontFamily: fontPorscheNextJa,
    },
    /* Korean */
    '&:lang(ko)': {
      fontFamily: fontPorscheNextKo,
    },
  } as const;
};
