import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { getTextHeadlineSkeletonStyles } from './text-skeleton-styles';
import {
  extendPseudoWithTheme,
  getElementBackgroundGradient,
  getSkeletonElementHeight,
  PDS_SKELETON_CLASS_PREFIX,
} from './skeleton-base-styles';
import { mediaQueryMin, mediaQueryMinMax } from '@porsche-design-system/utilities-v2/src/jss';
import type { Styles } from 'jss';
import {
  headline1,
  headline2,
  headline3,
  headline4,
  headline5,
  titleLarge,
} from '@porsche-design-system/utilities-v2/src/jss/typography';

type Headline = typeof headline2;

export const getHeadlineSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-headline': {
        '&:not(.hydrated)': {
          ...extendPseudoWithTheme({ stylesFunction: () => getTextHeadlineSkeletonStyles(40) }),
          ...getHeadlineSkeletonStyles(headline1),
          [`&[variant=large-title], &.${PDS_SKELETON_CLASS_PREFIX}variant-large-title`]: {
            ...extendPseudoWithTheme({ stylesFunction: () => getTextHeadlineSkeletonStyles(44) }),
            ...getHeadlineSkeletonStyles(titleLarge),
          },
          [`&[variant=headline-2], &.${PDS_SKELETON_CLASS_PREFIX}variant-headline-2`]: {
            ...extendPseudoWithTheme({ stylesFunction: () => getTextHeadlineSkeletonStyles(36) }),
            ...getHeadlineSkeletonStyles(headline2),
          },
          [`&[variant=headline-3], &.${PDS_SKELETON_CLASS_PREFIX}variant-headline-3`]: {
            ...extendPseudoWithTheme({ stylesFunction: () => getTextHeadlineSkeletonStyles(28) }),
            ...getHeadlineSkeletonStyles(headline3),
          },
          [`&[variant=headline-4], &.${PDS_SKELETON_CLASS_PREFIX}variant-headline-4`]: {
            ...extendPseudoWithTheme({ stylesFunction: () => getTextHeadlineSkeletonStyles(24) }),
            ...getHeadlineSkeletonStyles(headline4),
          },
          [`&[variant=headline-5], &.${PDS_SKELETON_CLASS_PREFIX}variant-headline-5`]: {
            ...extendPseudoWithTheme({ stylesFunction: () => getTextHeadlineSkeletonStyles(24) }),
            ...getHeadlineSkeletonStyles(headline5),
          },
          [`&[theme=dark], &.${PDS_SKELETON_CLASS_PREFIX}theme-dark`]: {
            ...extendPseudoWithTheme({ theme: 'dark' }),
          },
        },
      },
    },
  });
};

const getHeadlineSkeletonStyles = (headline: Headline): Styles => ({
  ...getHeadlineStylesByBreakpoint(headline, mediaQueryMinMax('s', 'm')),
  ...getHeadlineStylesByBreakpoint(headline, mediaQueryMinMax('m', 'l')),
  ...getHeadlineStylesByBreakpoint(headline, mediaQueryMinMax('l', 'xl')),
  ...getHeadlineStylesByBreakpoint(headline, mediaQueryMin('xl')),
});

const getHeadlineStylesByBreakpoint = (headline: Headline, breakpoint: string): Styles => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return { [breakpoint]: getHeadlineBreakpointStyles(headline[breakpoint].fontSize, headline[breakpoint].lineHeight) };
};

const getHeadlineBreakpointStyles = (fontSize: string, lineHeight: number): Styles => {
  const fontSizeInPx = parseFloat(fontSize.replace('rem', '')) * 16;
  const elHeight = fontSizeInPx * lineHeight;
  const topGradientSpacing = (elHeight - fontSizeInPx) / 2;

  return {
    height: getSkeletonElementHeight(elHeight, false),
    '&::after': {
      background: getElementBackgroundGradient(elHeight, topGradientSpacing),
    },
  };
};
