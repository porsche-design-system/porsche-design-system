import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { getTextHeadlineSkeletonStyle } from './text-skeleton-styles';
import {
  extendPseudoWithTheme,
  getElementBackgroundGradient,
  getSkeletonElementHeight,
  getThemedPseudoStyle,
  PDS_SKELETON_CLASS_PREFIX,
} from './base-skeleton-styles';
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
            styleFunction: () => getTextHeadlineSkeletonStyle(getTypographyElementHeight(headline1)),
          }),
          ...getHeadlineSkeletonStyle(headline1),
          [`&[variant=large-title], &.${PDS_SKELETON_CLASS_PREFIX}variant-large-title`]: {
            ...extendPseudoWithTheme({
              styleFunction: () => getTextHeadlineSkeletonStyle(getTypographyElementHeight(titleLarge)),
            }),
            ...getHeadlineSkeletonStyle(titleLarge),
          },
          [`&[variant=headline-2], &.${PDS_SKELETON_CLASS_PREFIX}variant-headline-2`]: {
            ...extendPseudoWithTheme({
              styleFunction: () => getTextHeadlineSkeletonStyle(getTypographyElementHeight(headline2)),
            }),
            ...getHeadlineSkeletonStyle(headline2),
          },
          [`&[variant=headline-3], &.${PDS_SKELETON_CLASS_PREFIX}variant-headline-3`]: {
            ...extendPseudoWithTheme({
              styleFunction: () => getTextHeadlineSkeletonStyle(getTypographyElementHeight(headline3)),
            }),
            ...getHeadlineSkeletonStyle(headline3),
          },
          [`&[variant=headline-4], &.${PDS_SKELETON_CLASS_PREFIX}variant-headline-4`]: {
            ...extendPseudoWithTheme({
              styleFunction: () => getTextHeadlineSkeletonStyle(getTypographyElementHeight(headline4)),
            }),
            ...getHeadlineSkeletonStyle(headline4),
          },
          [`&[variant=headline-5], &.${PDS_SKELETON_CLASS_PREFIX}variant-headline-5`]: {
            ...extendPseudoWithTheme({
              styleFunction: () => getTextHeadlineSkeletonStyle(getTypographyElementHeight(headline5)),
            }),
          },
          ...getThemedPseudoStyle(),
        },
      },
    },
  });
};

const getFontSizeInPx = (fontSize: string): number => parseFloat(fontSize.replace('rem', '')) * 16;

const getHeadlineSkeletonStyle = (headline: HeadlineType): JssStyle => ({
  ...getHeadlineStyleByBreakpoint(headline, mediaQueryMinMax('s', 'm')),
  ...getHeadlineStyleByBreakpoint(headline, mediaQueryMinMax('m', 'l')),
  ...getHeadlineStyleByBreakpoint(headline, mediaQueryMinMax('l', 'xl')),
  ...getHeadlineStyleByBreakpoint(headline, mediaQueryMin('xl')),
});

const getHeadlineStyleByBreakpoint = (headline: HeadlineType, breakpoint: string): JssStyle => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return { [breakpoint]: getHeadlineBreakpointStyle(headline[breakpoint].fontSize, headline[breakpoint].lineHeight) };
};

const getHeadlineBreakpointStyle = (fontSize: string, lineHeight: number): JssStyle => {
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
