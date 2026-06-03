import {
  fontPorscheNext,
  fontPorscheNextJa,
  fontPorscheNextKo,
  fontPorscheNextZhHans,
  fontPorscheNextZhHant,
  fontWeightBold,
  fontWeightNormal,
  fontWeightSemibold,
  leadingNormal,
  typescale2Xl,
  typescale2Xs,
  typescale3Xl,
  typescale4Xl,
  typescale5Xl,
  typescaleLg,
  typescaleMd,
  typescaleSm,
  typescaleXl,
  typescaleXs,
} from '@porsche-design-system/tokens';
import { getCJKFontFamilyStyle } from './helpers';

export const fontMeta = {
  family: {
    fontPorscheNext: {
      name: 'fontPorscheNext',
      value: fontPorscheNext,
      description: 'Holds the **Porsche Next** font family along with fallback fonts.',
    },
    fontPorscheNextJa: {
      name: 'fontPorscheNextJa',
      value: fontPorscheNextJa,
      description: 'Holds the **Porsche Next** font family (Japanese) along with fallback fonts.',
    },
    fontPorscheNextKo: {
      name: 'fontPorscheNextKo',
      value: fontPorscheNextKo,
      description: 'Holds the **Porsche Next** font family (Korean) along with fallback fonts.',
    },
    fontPorscheNextZhHans: {
      name: 'fontPorscheNextZhHans',
      value: fontPorscheNextZhHans,
      description: 'Holds the **Porsche Next** font family (Simplified Chinese) along with fallback fonts.',
    },
    fontPorscheNextZhHant: {
      name: 'fontPorscheNextZhHant',
      value: fontPorscheNextZhHant,
      description: 'Holds the **Porsche Next** font family (Traditional Chinese) along with fallback fonts.',
    },
  },
  lineHeight: {
    leadingNormal: {
      name: 'leadingNormal',
      value: leadingNormal,
      description: 'Holds a dynamic default line height specifically optimized for the Porsche Next typeface.',
    },
  },
  size: {
    typescale2Xs: {
      name: 'typescale2Xs',
      value: typescale2Xs,
      description: 'Holds the **2x-small** font size optimized for the Porsche Next typeface.',
    },
    typescaleXs: {
      name: 'typescaleXs',
      value: typescaleXs,
      description: 'Holds the **x-small** font size optimized for the Porsche Next typeface.',
    },
    typescaleSm: {
      name: 'typescaleSm',
      value: typescaleSm,
      description: 'Holds the **small** font size optimized for the Porsche Next typeface.',
    },
    typescaleMd: {
      name: 'typescaleMd',
      value: typescaleMd,
      description: 'Holds the **medium** font size optimized for the Porsche Next typeface.',
    },
    typescaleLg: {
      name: 'typescaleLg',
      value: typescaleLg,
      description: 'Holds the **large** font size optimized for the Porsche Next typeface.',
    },
    typescaleXl: {
      name: 'typescaleXl',
      value: typescaleXl,
      description: 'Holds the **x-large** font size optimized for the Porsche Next typeface.',
    },
    typescale2Xl: {
      name: 'typescale2Xl',
      value: typescale2Xl,
      description: 'Holds the **2x-large** font size optimized for the Porsche Next typeface.',
    },
    typescale3Xl: {
      name: 'typescale3Xl',
      value: typescale3Xl,
      description: 'Holds the **3x-large** font size optimized for the Porsche Next typeface.',
    },
    typescale4Xl: {
      name: 'typescale4Xl',
      value: typescale4Xl,
      description: 'Holds the **4x-large** font size optimized for the Porsche Next typeface.',
    },
    typescale5Xl: {
      name: 'typescale5Xl',
      value: typescale5Xl,
      description: 'Holds the **5x-large** font size optimized for the Porsche Next typeface.',
    },
  },
  weight: {
    fontWeightNormal: {
      name: 'fontWeightNormal',
      value: fontWeightNormal,
      description: 'Holds the **normal** font weight optimized for the Porsche Next typeface.',
    },
    fontWeightSemibold: {
      name: 'fontWeightSemibold',
      value: fontWeightSemibold,
      description: 'Holds the **semibold** font weight optimized for the Porsche Next typeface.',
    },
    fontWeightBold: {
      name: 'fontWeightBold',
      value: fontWeightBold,
      description: 'Holds the **bold** font weight optimized for the Porsche Next typeface.',
    },
  },
  getCJKFontFamilyStyle: {
    name: 'getCJKFontFamilyStyle',
    description:
      "Applies locale-specific **Porsche Next** font stacks for **CJK** languages (Simplified Chinese, Traditional Chinese, Japanese, Korean) based on the element's `lang` attribute.",
    value: getCJKFontFamilyStyle,
  },
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use typescale2Xs instead. */
const deprecatedFontSizeTextXXSmall = {
  name: 'fontSizeTextXXSmall',
  value: typescale2Xs,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use typescale2Xs instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use typescaleXs instead. */
const deprecatedFontSizeTextXSmall = {
  name: 'fontSizeTextXSmall',
  value: typescaleXs,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use typescaleXs instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use typescaleSm instead. */
const deprecatedFontSizeHeadingSmall = {
  name: 'fontSizeHeadingSmall',
  value: typescaleSm,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use typescaleSm instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use typescaleSm instead. */
const deprecatedFontSizeTextSmall = {
  name: 'fontSizeTextSmall',
  value: typescaleSm,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use typescaleSm instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use typescaleMd instead. */
const deprecatedFontSizeHeadingMedium = {
  name: 'fontSizeHeadingMedium',
  value: typescaleMd,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use typescaleMd instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use typescaleMd instead. */
const deprecatedFontSizeTextMedium = {
  name: 'fontSizeTextMedium',
  value: typescaleMd,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use typescaleMd instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use typescaleLg instead. */
const deprecatedFontSizeHeadingLarge = {
  name: 'fontSizeHeadingLarge',
  value: typescaleLg,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use typescaleLg instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use typescaleLg instead. */
const deprecatedFontSizeTextLarge = {
  name: 'fontSizeTextLarge',
  value: typescaleLg,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use typescaleLg instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use typescaleXl instead. */
const deprecatedFontSizeHeadingXLarge = {
  name: 'fontSizeHeadingXLarge',
  value: typescaleXl,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use typescaleXl instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use typescaleXl instead. */
const deprecatedFontSizeTextXLarge = {
  name: 'fontSizeTextXLarge',
  value: typescaleXl,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use typescaleXl instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use typescale2Xl instead. */
const deprecatedFontSizeHeadingXXLarge = {
  name: 'fontSizeHeadingXXLarge',
  value: typescale2Xl,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use typescale2Xl instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use fontPorscheNext instead. */
const deprecatedFontFamily = {
  name: 'fontFamily',
  value: fontPorscheNext,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use fontPorscheNext instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use leadingNormal instead. */
const deprecatedFontLineHeight = {
  name: 'fontLineHeight',
  value: leadingNormal,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use leadingNormal instead',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use typescale variables instead. */
const deprecatedFontSize = {
  name: 'fontSize',
  value: {
    text: {
      xxSmall: typescale2Xs,
      xSmall: typescaleXs,
      small: typescaleSm,
      medium: typescaleMd,
      large: typescaleLg,
      xLarge: typescaleXl,
    },
    heading: {
      small: typescaleSm,
      medium: typescaleMd,
      large: typescaleLg,
      xLarge: typescaleXl,
      xxLarge: typescale2Xl,
    },
    display: { small: typescale3Xl, medium: typescale4Xl, large: typescale5Xl },
  } as const,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use typescale variables instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use variables directly instead. */
const deprecatedFontSizeDisplay = {
  name: 'fontSizeDisplay',
  value: { small: typescale3Xl, medium: typescale4Xl, large: typescale5Xl } as const,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use variables directly instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use typescale variables instead. */
const deprecatedFontSizeHeading = {
  name: 'fontSizeHeading',
  value: {
    small: typescaleSm,
    medium: typescaleMd,
    large: typescaleLg,
    xLarge: typescaleXl,
    xxLarge: typescale2Xl,
  } as const,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use typescale variables instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use typescale variables instead. */
const deprecatedFontSizeText = {
  name: 'fontSizeText',
  value: {
    xxSmall: typescale2Xs,
    xSmall: typescaleXs,
    small: typescaleSm,
    medium: typescaleMd,
    large: typescaleLg,
    xLarge: typescaleXl,
  } as const,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use typescale variables instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use 'normal' | 'italic' instead. */
const deprecatedFontStyle = {
  name: 'fontStyle',
  value: { normal: 'normal', italic: 'italic' } as const,
  description: "since v4.0.0, will be removed with next major release. Use 'normal' | 'italic' instead.",
};

/** @deprecated since v4.0.0, will be removed with next major release. Use 'italic' instead. */
const deprecatedFontStyleItalic = {
  name: 'fontStyleItalic',
  value: 'italic',
  description: "since v4.0.0, will be removed with next major release. Use 'italic' instead.",
};

/** @deprecated since v4.0.0, will be removed with next major release. Use 'normal' instead. */
const deprecatedFontStyleNormal = {
  name: 'fontStyleNormal',
  value: 'normal',
  description: "since v4.0.0, will be removed with next major release. Use 'normal' instead.",
};

/** @deprecated since v4.0.0, will be removed with next major release. Use 'normal' instead. */
const deprecatedFontVariant = {
  name: 'fontVariant',
  value: 'normal',
  description: "since v4.0.0, will be removed with next major release. Use 'normal' instead.",
};

/** @deprecated since v4.0.0, will be removed with next major release. Use variables directly instead. */
const deprecatedFontWeight = {
  name: 'fontWeight',
  value: { regular: fontWeightNormal, semiBold: fontWeightSemibold, bold: fontWeightBold } as const,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use variables directly instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use fontWeightNormal instead. */
const deprecatedFontWeightRegular = {
  name: 'fontWeightRegular',
  value: fontWeightNormal,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use fontWeightNormal instead.',
};

/** @deprecated since v4.0.0, will be removed with next major release. Use fontWeightSemibold instead. */
const deprecatedFontWeightSemiBold = {
  name: 'fontWeightSemiBold',
  value: fontWeightSemibold,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use fontWeightSemibold instead.',
};

export const deprecatedFontMeta = {
  fontSizeTextXXSmall: deprecatedFontSizeTextXXSmall,
  fontSizeTextXSmall: deprecatedFontSizeTextXSmall,
  fontSizeHeadingSmall: deprecatedFontSizeHeadingSmall,
  fontSizeTextSmall: deprecatedFontSizeTextSmall,
  fontSizeHeadingMedium: deprecatedFontSizeHeadingMedium,
  fontSizeTextMedium: deprecatedFontSizeTextMedium,
  fontSizeHeadingLarge: deprecatedFontSizeHeadingLarge,
  fontSizeTextLarge: deprecatedFontSizeTextLarge,
  fontSizeHeadingXLarge: deprecatedFontSizeHeadingXLarge,
  fontSizeTextXLarge: deprecatedFontSizeTextXLarge,
  fontSizeHeadingXXLarge: deprecatedFontSizeHeadingXXLarge,
  fontFamily: deprecatedFontFamily,
  fontLineHeight: deprecatedFontLineHeight,
  fontSize: deprecatedFontSize,
  fontSizeDisplay: deprecatedFontSizeDisplay,
  fontSizeHeading: deprecatedFontSizeHeading,
  fontSizeText: deprecatedFontSizeText,
  fontStyle: deprecatedFontStyle,
  fontStyleItalic: deprecatedFontStyleItalic,
  fontStyleNormal: deprecatedFontStyleNormal,
  fontVariant: deprecatedFontVariant,
  fontWeight: deprecatedFontWeight,
  fontWeightRegular: deprecatedFontWeightRegular,
  fontWeightSemiBold: deprecatedFontWeightSemiBold,
} as const;
