import type { Meta } from '..';
import {
  fontFamily,
  fontHyphenationStyle,
  fontLineHeight,
  fontPorscheNext,
  fontPorscheNextJa,
  fontPorscheNextKo,
  fontPorscheNextZhHans,
  fontPorscheNextZhHant,
  fontSize,
  fontSizeDisplay,
  fontSizeHeading,
  fontSizeHeadingLarge,
  fontSizeHeadingMedium,
  fontSizeHeadingSmall,
  fontSizeHeadingXLarge,
  fontSizeHeadingXXLarge,
  fontSizeText,
  fontSizeTextLarge,
  fontSizeTextMedium,
  fontSizeTextSmall,
  fontSizeTextXLarge,
  fontSizeTextXSmall,
  fontSizeTextXXSmall,
  fontStyle,
  fontStyleItalic,
  fontStyleNormal,
  fontVariant,
  fontWeight,
  fontWeightBold,
  fontWeightNormal,
  fontWeightRegular,
  fontWeightSemiBold,
  fontWeightSemibold,
  getCJKFontFamilyStyle,
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
} from '.';

export const fontMeta: Meta = {
  family: {
    fontPorscheNext: {
      name: 'fontPorscheNext',
      description: 'Holds the **Porsche Next** font family along with fallback fonts.',
      value: fontPorscheNext,
    },
    fontPorscheNextJa: {
      name: 'fontPorscheNextJa',
      description: 'Holds the **Porsche Next** font family along with fallback fonts for **Japanese**.',
      value: fontPorscheNextJa,
    },
    fontPorscheNextKo: {
      name: 'fontPorscheNextKo',
      description: 'Holds the **Porsche Next** font family along with fallback fonts for **Korean**.',
      value: fontPorscheNextKo,
    },
    fontPorscheNextZhHans: {
      name: 'fontPorscheNextZhHans',
      description: 'Holds the **Porsche Next** font family along with fallback fonts for **Simplified Chinese**.',
      value: fontPorscheNextZhHans,
    },
    fontPorscheNextZhHant: {
      name: 'fontPorscheNextZhHant',
      description: 'Holds the **Porsche Next** font family along with fallback fonts for **Traditional Chinese**.',
      value: fontPorscheNextZhHant,
    },
  },
  lineHeight: {
    leadingNormal: {
      name: 'leadingNormal',
      description: 'Holds a dynamic default line height specifically optimized for the Porsche Next typeface.',
      value: leadingNormal,
    },
  },
  size: {
    typescale2Xs: {
      name: 'typescale2Xs',
      description: 'Holds the **2x-small** font size optimized for the Porsche Next typeface.',
      value: typescale2Xs,
    },
    typescaleXs: {
      name: 'typescaleXs',
      description: 'Holds the **x-small** font size optimized for the Porsche Next typeface.',
      value: typescaleXs,
    },
    typescaleSm: {
      name: 'typescaleSm',
      description: 'Holds the **small** font size optimized for the Porsche Next typeface.',
      value: typescaleSm,
    },
    typescaleMd: {
      name: 'typescaleMd',
      description: 'Holds the **medium** font size optimized for the Porsche Next typeface.',
      value: typescaleMd,
    },
    typescaleLg: {
      name: 'typescaleLg',
      description: 'Holds the **large** font size optimized for the Porsche Next typeface.',
      value: typescaleLg,
    },
    typescaleXl: {
      name: 'typescaleXl',
      description: 'Holds the **x-large** font size optimized for the Porsche Next typeface.',
      value: typescaleXl,
    },
    typescale2Xl: {
      name: 'typescale2Xl',
      description: 'Holds the **2x-large** font size optimized for the Porsche Next typeface.',
      value: typescale2Xl,
    },
    typescale3Xl: {
      name: 'typescale3Xl',
      description: 'Holds the **3x-large** font size optimized for the Porsche Next typeface.',
      value: typescale3Xl,
    },
    typescale4Xl: {
      name: 'typescale4Xl',
      description: 'Holds the **4x-large** font size optimized for the Porsche Next typeface.',
      value: typescale4Xl,
    },
    typescale5Xl: {
      name: 'typescale5Xl',
      description: 'Holds the **5x-large** font size optimized for the Porsche Next typeface.',
      value: typescale5Xl,
    },
  },
  weight: {
    fontWeightNormal: {
      name: 'fontWeightNormal',
      description: 'Holds the **normal** font weight optimized for the Porsche Next typeface.',
      value: fontWeightNormal,
    },
    fontWeightSemibold: {
      name: 'fontWeightSemibold',
      description: 'Holds the **semibold** font weight optimized for the Porsche Next typeface.',
      value: fontWeightSemibold,
    },
    fontWeightBold: {
      name: 'fontWeightBold',
      description: 'Holds the **bold** font weight optimized for the Porsche Next typeface.',
      value: fontWeightBold,
    },
  },
  getCJKFontFamilyStyle: {
    name: 'getCJKFontFamilyStyle',
    description:
      "Applies locale-specific **Porsche Next** font stacks for **CJK** languages (Simplified Chinese, Traditional Chinese, Japanese, Korean) based on the element's `lang` attribute.",
    value: getCJKFontFamilyStyle,
  },
  fontHyphenationStyle: {
    name: 'fontHyphenationStyle',
    description: 'Applies **hyphenation** styles (`overflow-wrap` and `hyphens`) to break and hyphenate long words.',
    value: fontHyphenationStyle,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use typescale2Xs instead. */
  fontSizeTextXXSmall: {
    name: 'fontSizeTextXXSmall',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use typescale2Xs instead.',
    value: fontSizeTextXXSmall,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use typescaleXs instead. */
  fontSizeTextXSmall: {
    name: 'fontSizeTextXSmall',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use typescaleXs instead.',
    value: fontSizeTextXSmall,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use typescaleSm instead. */
  fontSizeHeadingSmall: {
    name: 'fontSizeHeadingSmall',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use typescaleSm instead.',
    value: fontSizeHeadingSmall,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use typescaleSm instead. */
  fontSizeTextSmall: {
    name: 'fontSizeTextSmall',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use typescaleSm instead.',
    value: fontSizeTextSmall,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use typescaleMd instead. */
  fontSizeHeadingMedium: {
    name: 'fontSizeHeadingMedium',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use typescaleMd instead.',
    value: fontSizeHeadingMedium,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use typescaleMd instead. */
  fontSizeTextMedium: {
    name: 'fontSizeTextMedium',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use typescaleMd instead.',
    value: fontSizeTextMedium,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use typescaleLg instead. */
  fontSizeHeadingLarge: {
    name: 'fontSizeHeadingLarge',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use typescaleLg instead.',
    value: fontSizeHeadingLarge,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use typescaleLg instead. */
  fontSizeTextLarge: {
    name: 'fontSizeTextLarge',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use typescaleLg instead.',
    value: fontSizeTextLarge,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use typescaleXl instead. */
  fontSizeHeadingXLarge: {
    name: 'fontSizeHeadingXLarge',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use typescaleXl instead.',
    value: fontSizeHeadingXLarge,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use typescaleXl instead. */
  fontSizeTextXLarge: {
    name: 'fontSizeTextXLarge',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use typescaleXl instead.',
    value: fontSizeTextXLarge,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use typescale2Xl instead. */
  fontSizeHeadingXXLarge: {
    name: 'fontSizeHeadingXXLarge',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use typescale2Xl instead.',
    value: fontSizeHeadingXXLarge,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use fontPorscheNext instead. */
  fontFamily: {
    name: 'fontFamily',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use fontPorscheNext instead.',
    value: fontFamily,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use leadingNormal instead. */
  fontLineHeight: {
    name: 'fontLineHeight',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use leadingNormal instead',
    value: fontLineHeight,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use typescale variables instead. */
  fontSize: {
    name: 'fontSize',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use typescale variables instead.',
    value: fontSize,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use variables directly instead. */
  fontSizeDisplay: {
    name: 'fontSizeDisplay',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use variables directly instead.',
    value: fontSizeDisplay,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use typescale variables instead. */
  fontSizeHeading: {
    name: 'fontSizeHeading',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use typescale variables instead.',
    value: fontSizeHeading,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use typescale variables instead. */
  fontSizeText: {
    name: 'fontSizeText',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use typescale variables instead.',
    value: fontSizeText,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use 'normal' | 'italic' instead. */
  fontStyle: {
    name: 'fontStyle',
    description: "since v4.0.0, will be removed with next major release. Use 'normal' | 'italic' instead.",
    value: fontStyle,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use 'italic' instead. */
  fontStyleItalic: {
    name: 'fontStyleItalic',
    description: "since v4.0.0, will be removed with next major release. Use 'italic' instead.",
    value: fontStyleItalic,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use 'normal' instead. */
  fontStyleNormal: {
    name: 'fontStyleNormal',
    description: "since v4.0.0, will be removed with next major release. Use 'normal' instead.",
    value: fontStyleNormal,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use 'normal' instead. */
  fontVariant: {
    name: 'fontVariant',
    description: "since v4.0.0, will be removed with next major release. Use 'normal' instead.",
    value: fontVariant,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use variables directly instead. */
  fontWeight: {
    name: 'fontWeight',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use variables directly instead.',
    value: fontWeight,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use fontWeightNormal instead. */
  fontWeightRegular: {
    name: 'fontWeightRegular',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use fontWeightNormal instead.',
    value: fontWeightRegular,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use fontWeightSemibold instead. */
  fontWeightSemiBold: {
    name: 'fontWeightSemiBold',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use fontWeightSemibold instead.',
    value: fontWeightSemiBold,
    deprecated: true,
  },
} as const;
