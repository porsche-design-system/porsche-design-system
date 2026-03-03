import {
  proseDisplayLgStyle,
  proseDisplayMdStyle,
  proseDisplaySmStyle,
  proseHeading2XlStyle,
  proseHeadingLgStyle,
  proseHeadingMdStyle,
  proseHeadingSmStyle,
  proseHeadingXlStyle,
  proseText2XsStyle,
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

export const displayLarge = style({
  ...proseDisplayLgStyle,
  margin: 0,
});

export const displayMedium = style({
  ...proseDisplayMdStyle,
  margin: 0,
});

export const displaySmall = style({
  ...proseDisplaySmStyle,
  margin: 0,
});

export const headingXXLarge = style({
  ...proseHeading2XlStyle,
  margin: 0,
});

export const headingXLarge = style({
  ...proseHeadingXlStyle,
  margin: 0,
});

export const headingLarge = style({
  ...proseHeadingLgStyle,
  margin: 0,
});

export const headingMedium = style({
  ...proseHeadingMdStyle,
  margin: 0,
});

export const headingSmall = style({
  ...proseHeadingSmStyle,
  margin: 0,
});

export const textXLarge = style({
  ...proseTextXlStyle,
  margin: 0,
});

export const textLarge = style({
  ...proseTextLgStyle,
  margin: 0,
});

export const textMedium = style({
  ...proseTextMdStyle,
  margin: 0,
});

export const textSmall = style({
  ...proseTextSmStyle,
  margin: 0,
});

export const textXSmall = style({
  ...proseTextXsStyle,
  margin: 0,
});

export const textXXSmall = style({
  ...proseText2XsStyle,
  margin: 0,
});
