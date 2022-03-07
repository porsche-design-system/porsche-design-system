import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import {
  extendPseudoWithTheme,
  getElementBackgroundGradient,
  getPseudoElementStyle,
  getSkeletonElementHeight,
  getThemedPseudoStyle,
  PDS_SKELETON_CLASS_PREFIX,
} from './base-skeleton-styles';
import { JssStyle } from 'jss';
import { getTypographyElementHeight } from './headline-skeleton-styles';
import { textLarge, textSmall, textMedium, textXLarge, textXSmall } from '@porsche-design-system/utilities-v2';

export const getTextSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-text, p-text-list-item': {
        '&:not(.hydrated)': {
          ...extendPseudoWithTheme({
            styleFunction: () => getTextHeadlineSkeletonBaseStyle(),
          }),
          [`&[size=x-small], &.${PDS_SKELETON_CLASS_PREFIX}size-x-small`]: getTextHeadlineSkeletonSubStyle(
            getTypographyElementHeight(textXSmall)
          ),
          [`&[size=medium], &.${PDS_SKELETON_CLASS_PREFIX}size-medium`]: getTextHeadlineSkeletonSubStyle(
            getTypographyElementHeight(textMedium)
          ),
          [`&[size=large], &.${PDS_SKELETON_CLASS_PREFIX}size-large`]: getTextHeadlineSkeletonSubStyle(
            getTypographyElementHeight(textLarge)
          ),
          [`&[size=x-large], &.${PDS_SKELETON_CLASS_PREFIX}size-x-large`]: getTextHeadlineSkeletonSubStyle(
            getTypographyElementHeight(textXLarge)
          ),
          ...getThemedPseudoStyle(),
        },
      },
    },
  });
};
export const getTextHeadlineSkeletonSubStyle = (elementHeight = getTypographyElementHeight(textSmall)): JssStyle => ({
  height: getSkeletonElementHeight(elementHeight, false),
  '&::after': {
    background: getElementBackgroundGradient(elementHeight),
  },
});

export const getTextHeadlineSkeletonBaseStyle = (elementHeight = getTypographyElementHeight(textSmall)): JssStyle => ({
  display: 'block',
  position: 'relative',
  color: 'transparent',
  height: getSkeletonElementHeight(elementHeight, false),
  '&::after': {
    ...getPseudoElementStyle(),
    top: '0',
    background: getElementBackgroundGradient(elementHeight),
    width: '100%',
    height: '100%',
  },
});
