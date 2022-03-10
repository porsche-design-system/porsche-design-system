import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import {
  extendPseudoWithThemeJssStyle,
  getElementBackgroundGradient,
  getPseudoElementJssStyle,
  getSkeletonElementHeight,
  getSkeletonPropertyNames,
  getThemedPseudoJssStyle,
  PDS_SKELETON_CLASS_PREFIX,
} from './base-skeleton-styles';
import { JssStyle } from 'jss';
import { getTypographyElementHeight } from './headline-skeleton-styles';
import { textLarge, textSmall, textMedium, textXLarge, textXSmall } from '@porsche-design-system/utilities-v2';
import { TextSize } from '../../components/basic/typography/text/text-utils';

export type TextType = typeof textSmall;

export const getTextSkeletonCss = (): string => {
  const skeletonPropertyNames = getSkeletonPropertyNames('p-text');

  const textSizeToTypographyMap: { [key in Exclude<TextSize, 'inherit' | 'small'>]: TextType } = {
    'x-small': textXSmall,
    medium: textMedium,
    large: textLarge,
    'x-large': textXLarge,
  };

  const getTextSizeJssStyle = (): JssStyle =>
    Object.entries(textSizeToTypographyMap).reduce(
      (prevValue, [key, value]) => ({
        ...prevValue,
        [`&[${skeletonPropertyNames.size}=${key}], &.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.size}-${key}`]:
          getTextHeadlineSkeletonSubJssStyle(getTypographyElementHeight(value)),
      }),
      {}
    );

  return getMinifiedCss({
    '@global': {
      'p-text, p-text-list-item': {
        '&:not(.hydrated)': {
          ...extendPseudoWithThemeJssStyle({
            styleFunction: () => getTextHeadlineSkeletonBaseJssStyle(),
          }),
          ...getTextSizeJssStyle(),
          ...getThemedPseudoJssStyle(),
        },
      },
    },
  });
};
export const getTextHeadlineSkeletonSubJssStyle = (
  elementHeight = getTypographyElementHeight(textSmall)
): JssStyle => ({
  height: getSkeletonElementHeight(elementHeight, false),
  '&::after': {
    background: getElementBackgroundGradient(elementHeight),
  },
});

export const getTextHeadlineSkeletonBaseJssStyle = (
  elementHeight = getTypographyElementHeight(textSmall)
): JssStyle => ({
  display: 'block',
  position: 'relative',
  color: 'transparent',
  height: getSkeletonElementHeight(elementHeight, false),
  '&::after': {
    ...getPseudoElementJssStyle(),
    top: '0',
    background: getElementBackgroundGradient(elementHeight),
    width: '100%',
    height: '100%',
  },
});
