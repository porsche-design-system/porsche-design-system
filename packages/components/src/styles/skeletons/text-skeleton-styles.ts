import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import {
  extendPseudoWithTheme,
  getElementBackgroundGradient,
  getPseudoElementStyle,
  getSkeletonElementHeight,
  getThemedPseudoStyle,
} from './skeleton-base-styles';
import { textSmall } from '@porsche-design-system/utilities-v2';
import { JssStyle } from 'jss';
import { getTypographyElementHeight } from './headline-skeleton-styles';

export const getTextSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-text, p-text-list-item': {
        '&:not(.hydrated)': {
          ...extendPseudoWithTheme({
            styleFunction: () => getTextHeadlineSkeletonStyle(),
          }),
          ...getThemedPseudoStyle(),
        },
      },
    },
  });
};
export const getTextHeadlineSkeletonStyle = (elHeight = getTypographyElementHeight(textSmall)): JssStyle => ({
  display: 'block',
  position: 'relative',
  color: 'transparent',
  height: getSkeletonElementHeight(elHeight, false),
  '&::after': {
    ...getPseudoElementStyle(),
    top: '0',
    background: getElementBackgroundGradient(elHeight),
    width: '100%',
    height: '100%',
  },
});
