import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import {
  getTextHeadlineSkeletonBaseJssStyle,
  getTextHeadlineSkeletonSubJssStyle,
  TextType,
} from './text-skeleton-styles';
import {
  extendPseudoWithThemeJssStyle,
  getElementBackgroundGradient,
  getSkeletonElementHeight,
  getSkeletonPropertyNames,
  getThemedPseudoJssStyle,
  PDS_SKELETON_CLASS_PREFIX,
} from './base-skeleton-styles';
import { mediaQueryMin, mediaQueryMinMax } from '@porsche-design-system/utilities-v2/src/jss';
import type { JssStyle } from 'jss';
import { headline1, headline2, headline3, headline4, headline5, titleLarge } from '@porsche-design-system/utilities-v2';
import { VariantType } from '../../components/basic/typography/headline/headline-utils';

type HeadlineType = typeof headline1;

export const getTypographyElementHeight = (typography: HeadlineType | TextType): number => {
  const fontSizeInPx = getFontSizeInPx(typography.fontSize);
  return Math.round(fontSizeInPx * typography.lineHeight);
};

export const getHeadlineSkeletonCss = (): string => {
  const skeletonPropertyNames = getSkeletonPropertyNames('p-headline');

  const variantToTypographyMap: { [key in Exclude<VariantType, 'headline-5'>]: HeadlineType } = {
    'large-title': titleLarge,
    'headline-1': headline1,
    'headline-2': headline2,
    'headline-3': headline3,
    'headline-4': headline4,
  };

  const getHeadlineVariantJssStyle = (): JssStyle =>
    Object.entries(variantToTypographyMap).map(([key, value]) => ({
      [`&[${skeletonPropertyNames.variant}=${key}, &.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.variant}-${key}`]:
        {
          ...getTextHeadlineSkeletonSubJssStyle(getTypographyElementHeight(value)),
          ...getHeadlineSkeletonJssStyle(value),
        },
    }));

  return getMinifiedCss({
    '@global': {
      'p-headline': {
        '&:not(.hydrated)': {
          ...extendPseudoWithThemeJssStyle({
            styleFunction: () => getTextHeadlineSkeletonBaseJssStyle(getTypographyElementHeight(headline1)),
          }),
          ...getHeadlineSkeletonJssStyle(headline1),
          ...getHeadlineVariantJssStyle(),
          [`&[${skeletonPropertyNames.variant}=headline-5], &.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.variant}-headline-5`]:
            getTextHeadlineSkeletonSubJssStyle(getTypographyElementHeight(headline5)),
          ...getThemedPseudoJssStyle(),
        },
      },
    },
  });
};

const getFontSizeInPx = (fontSize: string): number => parseFloat(fontSize.replace('rem', '')) * 16;

const getHeadlineSkeletonJssStyle = (headline: HeadlineType): JssStyle => ({
  ...getHeadlineStyleByBreakpoint(headline, mediaQueryMinMax('s', 'm')),
  ...getHeadlineStyleByBreakpoint(headline, mediaQueryMinMax('m', 'l')),
  ...getHeadlineStyleByBreakpoint(headline, mediaQueryMinMax('l', 'xl')),
  ...getHeadlineStyleByBreakpoint(headline, mediaQueryMin('xl')),
});

const getHeadlineStyleByBreakpoint = (headline: HeadlineType, breakpoint: string): JssStyle => {
  return {
    [breakpoint]: getHeadlineBreakpointJssStyle(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      headline[breakpoint].fontSize as string,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      headline[breakpoint].lineHeight as number
    ),
  };
};

const getHeadlineBreakpointJssStyle = (fontSize: string, lineHeight: number): JssStyle => {
  const fontSizeInPx = getFontSizeInPx(fontSize);
  const elementHeight = Math.round(fontSizeInPx * lineHeight);
  const topGradientSpacing = (elementHeight - fontSizeInPx) / 2;

  return {
    height: getSkeletonElementHeight(elementHeight, false),
    '&::after': {
      background: getElementBackgroundGradient(elementHeight, topGradientSpacing),
    },
  };
};
