import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { getTextHeadlineSkeletonStyles } from './text-skeleton-styles';
import { getElementBackgroundGradient, getSkeletonElementHeight } from './skeleton-base-styles';
import { mediaQueryMin, mediaQueryMinMax } from '@porsche-design-system/utilities-v2/src/jss';
import type { Styles } from 'jss';
import { headline1, headline3 } from '@porsche-design-system/utilities-v2/src/jss/typography';

type Headline = typeof headline1;

export const getHeadlineSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-headline': {
        '&:not(.hydrated)': {
          ...getTextHeadlineSkeletonStyles(40),
          ...getHeadlineSkeletonStyles(headline1),
          // simple approach to set all headlines after the first one to a height of a headline 3
          '&:not(:first-child)': getHeadlineSkeletonStyles(headline3),
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
  return {
    height: getSkeletonElementHeight(elHeight, false),
    '&::after': {
      background: getElementBackgroundGradient(elHeight),
    },
  };
};
