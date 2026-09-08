import {
  proseHeading2XlStyle,
  proseHeading2XsStyle,
  proseHeading3XlStyle,
  proseHeading4XlStyle,
  proseHeading5XlStyle,
  proseHeadingLgStyle,
  proseHeadingMdStyle,
  proseHeadingSmStyle,
  proseHeadingXlStyle,
  proseHeadingXsStyle,
  proseText2XlStyle,
  proseText2XsStyle,
  proseText3XlStyle,
  proseText4XlStyle,
  proseText5XlStyle,
  proseTextLgStyle,
  proseTextMdStyle,
  proseTextSmStyle,
  proseTextXlStyle,
  proseTextXsStyle,
} from '../../src/typography/';
import type { VanillaExtractMeta, VanillaExtractUtility } from '../types';

const headingDescription = (variant: string): string =>
  `Applies the **${variant}** heading typography variant primarily to \`<h1>\`, \`<h2>\`, \`<h3>\`, \`<h4>\`, \`<h5>\`, \`<h6>\` tags.`;
const textDescription = (variant: string): string =>
  `Applies the **${variant}** text typography variant primarily to \`<p>\`, \`<ul>\`, \`<ol>\`, \`<blockquote>\` tags.`;

const heading = {
  '5xl': { name: 'proseHeading5XlStyle', description: headingDescription('5x-large'), styles: proseHeading5XlStyle },
  '4xl': { name: 'proseHeading4XlStyle', description: headingDescription('4x-large'), styles: proseHeading4XlStyle },
  '3xl': { name: 'proseHeading3XlStyle', description: headingDescription('3x-large'), styles: proseHeading3XlStyle },
  '2xl': { name: 'proseHeading2XlStyle', description: headingDescription('2x-large'), styles: proseHeading2XlStyle },
  xl: { name: 'proseHeadingXlStyle', description: headingDescription('x-large'), styles: proseHeadingXlStyle },
  lg: { name: 'proseHeadingLgStyle', description: headingDescription('large'), styles: proseHeadingLgStyle },
  md: { name: 'proseHeadingMdStyle', description: headingDescription('medium'), styles: proseHeadingMdStyle },
  sm: { name: 'proseHeadingSmStyle', description: headingDescription('small'), styles: proseHeadingSmStyle },
  xs: { name: 'proseHeadingXsStyle', description: headingDescription('x-small'), styles: proseHeadingXsStyle },
  '2xs': { name: 'proseHeading2XsStyle', description: headingDescription('2x-small'), styles: proseHeading2XsStyle },
} satisfies Record<string, VanillaExtractUtility>;

const text = {
  '5xl': { name: 'proseText5XlStyle', description: textDescription('5x-large'), styles: proseText5XlStyle },
  '4xl': { name: 'proseText4XlStyle', description: textDescription('4x-large'), styles: proseText4XlStyle },
  '3xl': { name: 'proseText3XlStyle', description: textDescription('3x-large'), styles: proseText3XlStyle },
  '2xl': { name: 'proseText2XlStyle', description: textDescription('2x-large'), styles: proseText2XlStyle },
  xl: { name: 'proseTextXlStyle', description: textDescription('x-large'), styles: proseTextXlStyle },
  lg: { name: 'proseTextLgStyle', description: textDescription('large'), styles: proseTextLgStyle },
  md: { name: 'proseTextMdStyle', description: textDescription('medium'), styles: proseTextMdStyle },
  sm: { name: 'proseTextSmStyle', description: textDescription('small'), styles: proseTextSmStyle },
  xs: { name: 'proseTextXsStyle', description: textDescription('x-small'), styles: proseTextXsStyle },
  '2xs': { name: 'proseText2XsStyle', description: textDescription('2x-small'), styles: proseText2XsStyle },
} satisfies Record<string, VanillaExtractUtility>;

export const typography = {
  heading,
  text,
  // No documented display variants — the `display*Style` entries are deprecated. Kept empty for
  // 1:1 shape parity with `ScssMeta['typography'].display`.
  display: {},
} satisfies VanillaExtractMeta['typography'];
