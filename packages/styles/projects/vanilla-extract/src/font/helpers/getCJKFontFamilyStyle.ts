import {
  fontPorscheNextJa,
  fontPorscheNextKo,
  fontPorscheNextZhHans,
  fontPorscheNextZhHant,
} from '@porsche-design-system/tokens';

export const getCJKFontFamilyStyle = () => {
  return {
    selectors: {
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
    },
  } as const;
};
