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
  spacingFluidMd,
} from '@porsche-design-system/vanilla-extract';
import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const vanillaExtractTypographyWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: spacingFluidMd,
  padding: spacingFluidMd,
  color: vars.primary,
});

export const heading5Xl = style({
  ...proseHeading5XlStyle,
  margin: 0,
});

export const heading4Xl = style({
  ...proseHeading4XlStyle,
  margin: 0,
});

export const heading3Xl = style({
  ...proseHeading3XlStyle,
  margin: 0,
});

export const heading2Xl = style({
  ...proseHeading2XlStyle,
  margin: 0,
});

export const headingXl = style({
  ...proseHeadingXlStyle,
  margin: 0,
});

export const headingLg = style({
  ...proseHeadingLgStyle,
  margin: 0,
});

export const headingMd = style({
  ...proseHeadingMdStyle,
  margin: 0,
});

export const headingSm = style({
  ...proseHeadingSmStyle,
  margin: 0,
});

export const headingXs = style({
  ...proseHeadingXsStyle,
  margin: 0,
});

export const heading2Xs = style({
  ...proseHeading2XsStyle,
  margin: 0,
});

export const text5Xl = style({
  ...proseText5XlStyle,
  margin: 0,
});

export const text4Xl = style({
  ...proseText4XlStyle,
  margin: 0,
});

export const text3Xl = style({
  ...proseText3XlStyle,
  margin: 0,
});

export const text2Xl = style({
  ...proseText2XlStyle,
  margin: 0,
});

export const textXl = style({
  ...proseTextXlStyle,
  margin: 0,
});

export const textLg = style({
  ...proseTextLgStyle,
  margin: 0,
});

export const textMd = style({
  ...proseTextMdStyle,
  margin: 0,
});

export const textSm = style({
  ...proseTextSmStyle,
  margin: 0,
});

export const textXs = style({
  ...proseTextXsStyle,
  margin: 0,
});

export const text2Xs = style({
  ...proseText2XsStyle,
  margin: 0,
});
