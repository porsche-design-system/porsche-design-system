import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { getElementBackgroundGradient, getPseudoElementStyles, getSkeletonElementHeight } from './skeleton-base-styles';
import type { Styles } from 'jss';

export const getTextSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-text, p-text-list-item': {
        '&:not(.hydrated)': getTextHeadlineSkeletonStyles(),
      },
    },
  });
};
export const getTextHeadlineSkeletonStyles = (elHeight = 24): Styles => ({
  display: 'block',
  position: 'relative',
  color: 'transparent',
  height: getSkeletonElementHeight(elHeight, false),
  '&::after': {
    ...getPseudoElementStyles(),
    top: '0',
    background: getElementBackgroundGradient(elHeight),
    width: '100%',
    height: '100%',
  },
});
