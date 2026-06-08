import { colorPrimary } from '../color';
import {
  fontFamily,
  fontLineHeight,
  fontPorscheNext,
  fontSizeHeadingLarge,
  fontSizeHeadingMedium,
  fontSizeHeadingSmall,
  fontSizeHeadingXLarge,
  fontSizeHeadingXXLarge,
  fontSizeTextLarge,
  fontSizeTextMedium,
  fontSizeTextSmall,
  fontSizeTextXLarge,
  fontSizeTextXSmall,
  fontSizeTextXXSmall,
  fontStyleNormal,
  fontVariant,
  fontWeightNormal,
  fontWeightRegular,
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
} from '../font';
import type { Meta, MetaEntry } from '../meta.types';

const deprecatedFontPartA = `${fontStyleNormal} ${fontVariant} ${fontWeightRegular} `;
const deprecatedFontPartB = `/${fontLineHeight} ${fontFamily}`;

export const typographyMeta: Meta = {
  proseHeading5XlStyle: {
    name: 'proseHeading5XlStyle',
    description:
      'Applies the **5x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    value: {
      ...getCJKFontFamilyStyle(),
      font: `${fontWeightNormal} ${typescale5Xl} / ${leadingNormal} ${fontPorscheNext}`,
      color: colorPrimary,
    },
  },
  proseText5XlStyle: {
    name: 'proseText5XlStyle',
    description:
      'Applies the **5x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    value: {
      ...getCJKFontFamilyStyle(),
      font: `${fontWeightNormal} ${typescale5Xl} / ${leadingNormal} ${fontPorscheNext}`,
      color: colorPrimary,
    },
  },
  proseHeading4XlStyle: {
    name: 'proseHeading4XlStyle',
    description:
      'Applies the **4x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    value: {
      ...getCJKFontFamilyStyle(),
      font: `${fontWeightNormal} ${typescale4Xl} / ${leadingNormal} ${fontPorscheNext}`,
      color: colorPrimary,
    },
  },
  proseText4XlStyle: {
    name: 'proseText4XlStyle',
    description:
      'Applies the **4x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    value: {
      ...getCJKFontFamilyStyle(),
      font: `${fontWeightNormal} ${typescale4Xl} / ${leadingNormal} ${fontPorscheNext}`,
      color: colorPrimary,
    },
  },
  proseHeading3XlStyle: {
    name: 'proseHeading3XlStyle',
    description:
      'Applies the **3x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    value: {
      ...getCJKFontFamilyStyle(),
      font: `${fontWeightNormal} ${typescale3Xl} / ${leadingNormal} ${fontPorscheNext}`,
      color: colorPrimary,
    },
  },
  proseText3XlStyle: {
    name: 'proseText3XlStyle',
    description:
      'Applies the **3x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    value: {
      ...getCJKFontFamilyStyle(),
      font: `${fontWeightNormal} ${typescale3Xl} / ${leadingNormal} ${fontPorscheNext}`,
      color: colorPrimary,
    },
  },
  proseHeading2XlStyle: {
    name: 'proseHeading2XlStyle',
    description:
      'Applies the **2x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    value: {
      ...getCJKFontFamilyStyle(),
      font: `${fontWeightNormal} ${typescale2Xl} / ${leadingNormal} ${fontPorscheNext}`,
      color: colorPrimary,
    },
  },
  proseText2XlStyle: {
    name: 'proseText2XlStyle',
    description:
      'Applies the **2x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    value: {
      ...getCJKFontFamilyStyle(),
      font: `${fontWeightNormal} ${typescale2Xl} / ${leadingNormal} ${fontPorscheNext}`,
      color: colorPrimary,
    },
  },
  proseHeadingXlStyle: {
    name: 'proseHeadingXlStyle',
    description:
      'Applies the **x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    value: {
      ...getCJKFontFamilyStyle(),
      font: `${fontWeightNormal} ${typescaleXl} / ${leadingNormal} ${fontPorscheNext}`,
      color: colorPrimary,
    },
  },
  proseTextXlStyle: {
    name: 'proseTextXlStyle',
    description:
      'Applies the **x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    value: {
      ...getCJKFontFamilyStyle(),
      font: `${fontWeightNormal} ${typescaleXl} / ${leadingNormal} ${fontPorscheNext}`,
      color: colorPrimary,
    },
  },
  proseHeadingLgStyle: {
    name: 'proseHeadingLgStyle',
    description:
      'Applies the **large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    value: {
      ...getCJKFontFamilyStyle(),
      font: `${fontWeightNormal} ${typescaleLg} / ${leadingNormal} ${fontPorscheNext}`,
      color: colorPrimary,
    },
  },
  proseTextLgStyle: {
    name: 'proseTextLgStyle',
    description:
      'Applies the **large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    value: {
      ...getCJKFontFamilyStyle(),
      font: `${fontWeightNormal} ${typescaleLg} / ${leadingNormal} ${fontPorscheNext}`,
      color: colorPrimary,
    },
  },
  proseHeadingMdStyle: {
    name: 'proseHeadingMdStyle',
    description:
      'Applies the **medium** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    value: {
      ...getCJKFontFamilyStyle(),
      font: `${fontWeightNormal} ${typescaleMd} / ${leadingNormal} ${fontPorscheNext}`,
      color: colorPrimary,
    },
  },
  proseTextMdStyle: {
    name: 'proseTextMdStyle',
    description:
      'Applies the **medium** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    value: {
      ...getCJKFontFamilyStyle(),
      font: `${fontWeightNormal} ${typescaleMd} / ${leadingNormal} ${fontPorscheNext}`,
      color: colorPrimary,
    },
  },
  proseHeadingSmStyle: {
    name: 'proseHeadingSmStyle',
    description:
      'Applies the **small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    value: {
      ...getCJKFontFamilyStyle(),
      font: `${fontWeightSemibold} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
      color: colorPrimary,
    },
  },
  proseTextSmStyle: {
    name: 'proseTextSmStyle',
    description:
      'Applies the **small** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    value: {
      ...getCJKFontFamilyStyle(),
      font: `${fontWeightNormal} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
      color: colorPrimary,
    },
  },
  proseHeadingXsStyle: {
    name: 'proseHeadingXsStyle',
    description:
      'Applies the **x-small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    value: {
      ...getCJKFontFamilyStyle(),
      font: `${fontWeightSemibold} ${typescaleXs} / ${leadingNormal} ${fontPorscheNext}`,
      color: colorPrimary,
    },
  },
  proseTextXsStyle: {
    name: 'proseTextXsStyle',
    description:
      'Applies the **x-small** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    value: {
      ...getCJKFontFamilyStyle(),
      font: `${fontWeightNormal} ${typescaleXs} / ${leadingNormal} ${fontPorscheNext}`,
      color: colorPrimary,
    },
  },
  proseHeading2XsStyle: {
    name: 'proseHeading2XsStyle',
    description:
      'Applies the **2x-small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags.',
    value: {
      ...getCJKFontFamilyStyle(),
      font: `${fontWeightSemibold} ${typescale2Xs} / ${leadingNormal} ${fontPorscheNext}`,
      color: colorPrimary,
    },
  },
  proseText2XsStyle: {
    name: 'proseText2XsStyle',
    description:
      'Applies the **2x-small** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags.',
    value: {
      ...getCJKFontFamilyStyle(),
      font: `${fontWeightNormal} ${typescale2Xs} / ${leadingNormal} ${fontPorscheNext}`,
      color: colorPrimary,
    },
  },
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use proseHeading5XlStyle instead. */
const deprecatedDisplayLargeStyle: MetaEntry = {
  name: 'displayLargeStyle',
  description: 'deprecated since v4.0.0, will be removed with next major release. Use proseHeading5XlStyle instead.',
  value: {
    font: `${deprecatedFontPartA}${typescale5Xl}${deprecatedFontPartB}`,
  } as const,
};

/** @deprecated since v4.0.0, will be removed with next major release. Use proseHeading4XlStyle instead. */
const deprecatedDisplayMediumStyle: MetaEntry = {
  name: 'displayMediumStyle',
  description: 'deprecated since v4.0.0, will be removed with next major release. Use proseHeading4XlStyle instead.',
  value: {
    font: `${deprecatedFontPartA}${typescale4Xl}${deprecatedFontPartB}`,
  } as const,
};

/** @deprecated since v4.0.0, will be removed with next major release. Use proseHeading3XlStyle instead. */
const deprecatedDisplaySmallStyle: MetaEntry = {
  name: 'displaySmallStyle',
  description: 'deprecated since v4.0.0, will be removed with next major release. Use proseHeading3XlStyle instead.',
  value: {
    font: `${deprecatedFontPartA}${typescale3Xl}${deprecatedFontPartB}`,
  } as const,
};

/** @deprecated since v4.0.0, will be removed with next major release. Use proseHeading2Xl instead. */
const deprecatedHeadingXXLargeStyle: MetaEntry = {
  name: 'headingXXLargeStyle',
  description: 'deprecated since v4.0.0, will be removed with next major release. Use proseHeading2Xl instead.',
  value: {
    font: `${deprecatedFontPartA}${fontSizeHeadingXXLarge}${deprecatedFontPartB}`,
  } as const,
};

/** @deprecated since v4.0.0, will be removed with next major release. Use proseHeadingXl instead. */
const deprecatedHeadingXLargeStyle: MetaEntry = {
  name: 'headingXLargeStyle',
  description: 'deprecated since v4.0.0, will be removed with next major release. Use proseHeadingXl instead.',
  value: {
    font: `${deprecatedFontPartA}${fontSizeHeadingXLarge}${deprecatedFontPartB}`,
  } as const,
};

/** @deprecated since v4.0.0, will be removed with next major release. Use proseHeadingLg instead. */
const deprecatedHeadingLargeStyle: MetaEntry = {
  name: 'headingLargeStyle',
  description: 'deprecated since v4.0.0, will be removed with next major release. Use proseHeadingLg instead.',
  value: {
    font: `${deprecatedFontPartA}${fontSizeHeadingLarge}${deprecatedFontPartB}`,
  } as const,
};

/** @deprecated since v4.0.0, will be removed with next major release. Use proseHeadingMd instead. */
const deprecatedHeadingMediumStyle: MetaEntry = {
  name: 'headingMediumStyle',
  description: 'deprecated since v4.0.0, will be removed with next major release. Use proseHeadingMd instead.',
  value: {
    font: `${deprecatedFontPartA}${fontSizeHeadingMedium}${deprecatedFontPartB}`,
  } as const,
};

/** @deprecated since v4.0.0, will be removed with next major release. Use proseHeadingSm instead. */
const deprecatedHeadingSmallStyle: MetaEntry = {
  name: 'headingSmallStyle',
  description: 'deprecated since v4.0.0, will be removed with next major release. Use proseHeadingSm instead.',
  value: {
    font: `${deprecatedFontPartA}${fontSizeHeadingSmall}${deprecatedFontPartB}`,
  } as const,
};

/** @deprecated since v4.0.0, will be removed with next major release. Use proseTextXl instead. */
const deprecatedTextXLargeStyle: MetaEntry = {
  name: 'textXLargeStyle',
  description: 'deprecated since v4.0.0, will be removed with next major release. Use proseTextXl instead.',
  value: {
    font: `${deprecatedFontPartA}${fontSizeTextXLarge}${deprecatedFontPartB}`,
  } as const,
};

/** @deprecated since v4.0.0, will be removed with next major release. Use proseTextLg instead. */
const deprecatedTextLargeStyle: MetaEntry = {
  name: 'textLargeStyle',
  description: 'deprecated since v4.0.0, will be removed with next major release. Use proseTextLg instead.',
  value: {
    font: `${deprecatedFontPartA}${fontSizeTextLarge}${deprecatedFontPartB}`,
  } as const,
};

/** @deprecated since v4.0.0, will be removed with next major release. Use proseTextMd instead. */
const deprecatedTextMediumStyle: MetaEntry = {
  name: 'textMediumStyle',
  description: 'deprecated since v4.0.0, will be removed with next major release. Use proseTextMd instead.',
  value: {
    font: `${deprecatedFontPartA}${fontSizeTextMedium}${deprecatedFontPartB}`,
  } as const,
};

/** @deprecated since v4.0.0, will be removed with next major release. Use proseTextSm instead. */
const deprecatedTextSmallStyle: MetaEntry = {
  name: 'textSmallStyle',
  description: 'deprecated since v4.0.0, will be removed with next major release. Use proseTextSm instead.',
  value: {
    font: `${deprecatedFontPartA}${fontSizeTextSmall}${deprecatedFontPartB}`,
  } as const,
};

/** @deprecated since v4.0.0, will be removed with next major release. Use proseTextXs instead. */
const deprecatedTextXSmallStyle: MetaEntry = {
  name: 'textXSmallStyle',
  description: 'deprecated since v4.0.0, will be removed with next major release. Use proseTextXs instead.',
  value: {
    font: `${deprecatedFontPartA}${fontSizeTextXSmall}${deprecatedFontPartB}`,
  } as const,
};

/** @deprecated since v4.0.0, will be removed with next major release. Use proseText2Xs instead. */
const deprecatedTextXXSmallStyle: MetaEntry = {
  name: 'textXXSmallStyle',
  description: 'deprecated since v4.0.0, will be removed with next major release. Use proseText2Xs instead.',
  value: {
    font: `${deprecatedFontPartA}${fontSizeTextXXSmall}${deprecatedFontPartB}`,
  } as const,
};

export const deprecatedTypographyMeta: Meta = {
  display: {
    displayLargeStyle: deprecatedDisplayLargeStyle,
    displayMediumStyle: deprecatedDisplayMediumStyle,
    displaySmallStyle: deprecatedDisplaySmallStyle,
  },
  heading: {
    headingXXLargeStyle: deprecatedHeadingXXLargeStyle,
    headingXLargeStyle: deprecatedHeadingXLargeStyle,
    headingLargeStyle: deprecatedHeadingLargeStyle,
    headingMediumStyle: deprecatedHeadingMediumStyle,
    headingSmallStyle: deprecatedHeadingSmallStyle,
  },
  text: {
    textXLargeStyle: deprecatedTextXLargeStyle,
    textLargeStyle: deprecatedTextLargeStyle,
    textMediumStyle: deprecatedTextMediumStyle,
    textSmallStyle: deprecatedTextSmallStyle,
    textXSmallStyle: deprecatedTextXSmallStyle,
    textXXSmallStyle: deprecatedTextXXSmallStyle,
  },
} as const;
