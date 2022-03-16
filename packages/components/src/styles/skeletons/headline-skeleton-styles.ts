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
} from './base-skeleton-styles';
import { PDS_SKELETON_CLASS_PREFIX } from '@porsche-design-system/shared';
import { mediaQueryMin, mediaQueryMinMax } from '@porsche-design-system/utilities-v2/src/jss';
import type { JssStyle, Styles } from 'jss';
import { headline1, headline2, headline3, headline4, headline5, titleLarge } from '@porsche-design-system/utilities-v2';
import { VariantType } from '../../components/basic/typography/headline/headline-utils';

export type HeadlineType = typeof headline1;

export const getTypographyElementHeight = (typography: HeadlineType | TextType): number => {
  const fontSizeInPx = getFontSizeInPx(typography.fontSize);
  return Math.round(fontSizeInPx * typography.lineHeight);
};

export const getHeadlineSkeletonStyles = (): Styles<'@global'> => {
  const skeletonPropertyNames = getSkeletonPropertyNames('p-headline');

  const variantToTypographyMap: { [key in Exclude<VariantType, 'headline-1' | 'headline-5'>]: HeadlineType } = {
    'large-title': titleLarge,
    'headline-2': headline2,
    'headline-3': headline3,
    'headline-4': headline4,
  };

  const getHeadlineVariantJssStyle = (): JssStyle =>
    Object.entries(variantToTypographyMap).reduce(
      (prevValue, [key, value]) => ({
        ...prevValue,
        [`&[${skeletonPropertyNames.variant}=${key}], &.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.variant}-${key}`]:
          {
            ...getTextHeadlineSkeletonSubJssStyle(getTypographyElementHeight(value)),
            ...getHeadlineSkeletonResponsiveJssStyle(value),
          },
      }),
      {}
    );

  return {
    '@global': {
      'p-headline': {
        '&:not(.hydrated)': {
          ...extendPseudoWithThemeJssStyle({
            jssStyle: getTextHeadlineSkeletonBaseJssStyle(getTypographyElementHeight(headline1)),
          }),
          ...getHeadlineSkeletonResponsiveJssStyle(headline1),
          ...getHeadlineVariantJssStyle(),
          [`&[${skeletonPropertyNames.variant}=headline-5], &.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.variant}-headline-5`]:
            getTextHeadlineSkeletonSubJssStyle(getTypographyElementHeight(headline5)),
          ...getThemedPseudoJssStyle(),
        },
      },
    },
  };
};

const getFontSizeInPx = (fontSize: string): number => parseFloat(fontSize.replace('rem', '')) * 16;

const getHeadlineSkeletonResponsiveJssStyle = (headline: HeadlineType): JssStyle => ({
  ...getHeadlineJssStyleByBreakpoint(headline, mediaQueryMinMax('s', 'm')),
  ...getHeadlineJssStyleByBreakpoint(headline, mediaQueryMinMax('m', 'l')),
  ...getHeadlineJssStyleByBreakpoint(headline, mediaQueryMinMax('l', 'xl')),
  ...getHeadlineJssStyleByBreakpoint(headline, mediaQueryMin('xl')),
});

const getHeadlineJssStyleByBreakpoint = (
  headline: HeadlineType,
  breakpoint:
    | '@media(min-width:760px) and (max-width:999px)'
    | '@media(min-width:1000px) and (max-width:1299px)'
    | '@media(min-width:1300px) and (max-width:1759px)'
    | '@media(min-width:1760px)'
): JssStyle => {
  return {
    [breakpoint]: getHeadlineBreakpointJssStyle(headline[breakpoint].fontSize, headline[breakpoint].lineHeight),
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
