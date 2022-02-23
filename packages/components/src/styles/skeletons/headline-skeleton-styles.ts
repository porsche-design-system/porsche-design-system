import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { getTextHeadlineSkeletonStyles } from './text-skeleton-styles';
import {
  extendPseudoWithTheme,
  getElementBackgroundGradient,
  getSkeletonElementHeight,
  getThemedPseudoStyles,
  PDS_SKELETON_CLASS_PREFIX,
} from './skeleton-base-styles';
import { mediaQueryMin, mediaQueryMinMax } from '@porsche-design-system/utilities-v2/src/jss';
import type { JssStyle } from 'jss';
import {
  headline1,
  headline2,
  headline3,
  headline4,
  headline5,
  titleLarge,
  textSmall,
} from '@porsche-design-system/utilities-v2';

type HeadlineType = typeof headline1;
type TextType = typeof textSmall;

export const getTypographyElementHeight = (typography: HeadlineType | TextType): number => {
  if (!typography?.fontSize) {
    process.stdout.write(`headline ${JSON.stringify(typography)}\n`);
  }
  const fontSizeInPx = getFontSizeInPx(typography.fontSize);
  return fontSizeInPx * typography.lineHeight;
};

export const getHeadlineSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-headline': {
        '&:not(.hydrated)': {
          ...extendPseudoWithTheme({
            stylesFunction: () => getTextHeadlineSkeletonStyles(getTypographyElementHeight(headline1)),
          }),
          ...getHeadlineSkeletonStyles(headline1),
          [`&[variant=large-title], &.${PDS_SKELETON_CLASS_PREFIX}variant-large-title`]: {
            ...extendPseudoWithTheme({
              stylesFunction: () => getTextHeadlineSkeletonStyles(getTypographyElementHeight(titleLarge)),
            }),
            ...getHeadlineSkeletonStyles(titleLarge),
          },
          [`&[variant=headline-2], &.${PDS_SKELETON_CLASS_PREFIX}variant-headline-2`]: {
            ...extendPseudoWithTheme({
              stylesFunction: () => getTextHeadlineSkeletonStyles(getTypographyElementHeight(headline2)),
            }),
            ...getHeadlineSkeletonStyles(headline2),
          },
          [`&[variant=headline-3], &.${PDS_SKELETON_CLASS_PREFIX}variant-headline-3`]: {
            ...extendPseudoWithTheme({
              stylesFunction: () => getTextHeadlineSkeletonStyles(getTypographyElementHeight(headline3)),
            }),
            ...getHeadlineSkeletonStyles(headline3),
          },
          [`&[variant=headline-4], &.${PDS_SKELETON_CLASS_PREFIX}variant-headline-4`]: {
            ...extendPseudoWithTheme({
              stylesFunction: () => getTextHeadlineSkeletonStyles(getTypographyElementHeight(headline4)),
            }),
            ...getHeadlineSkeletonStyles(headline4),
          },
          [`&[variant=headline-5], &.${PDS_SKELETON_CLASS_PREFIX}variant-headline-5`]: {
            ...extendPseudoWithTheme({
              stylesFunction: () => getTextHeadlineSkeletonStyles(getTypographyElementHeight(headline5)),
            }),
          },
          ...getThemedPseudoStyles(),
        },
      },
    },
  });
};

const getFontSizeInPx = (fontSize: string): number => parseFloat(fontSize.replace('rem', '')) * 16;

const getHeadlineSkeletonStyles = (headline: HeadlineType): JssStyle => ({
  ...getHeadlineStylesByBreakpoint(headline, mediaQueryMinMax('s', 'm')),
  ...getHeadlineStylesByBreakpoint(headline, mediaQueryMinMax('m', 'l')),
  ...getHeadlineStylesByBreakpoint(headline, mediaQueryMinMax('l', 'xl')),
  ...getHeadlineStylesByBreakpoint(headline, mediaQueryMin('xl')),
});

const getHeadlineStylesByBreakpoint = (headline: HeadlineType, breakpoint: string): JssStyle => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return { [breakpoint]: getHeadlineBreakpointStyles(headline[breakpoint].fontSize, headline[breakpoint].lineHeight) };
};

const getHeadlineBreakpointStyles = (fontSize: string, lineHeight: number): JssStyle => {
  const fontSizeInPx = getFontSizeInPx(fontSize);
  const elHeight = fontSizeInPx * lineHeight;
  const topGradientSpacing = (elHeight - fontSizeInPx) / 2;

  return {
    height: getSkeletonElementHeight(elHeight, false),
    '&::after': {
      background: getElementBackgroundGradient(elHeight, topGradientSpacing),
    },
  };
};
