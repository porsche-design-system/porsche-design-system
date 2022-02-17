import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import {
  getPseudoElementStyles,
  getSkeletonElementHeight,
  SKELETON_COLOR_THEME_PLACEHOLDER,
} from './skeleton-base-styles';
import type { Styles } from 'jss';

export const getTextSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-text, p-text-list-item': {
        '&:not(.hydrated)': getTextSkeletonStyles(),
      },
    },
  });
};
export const getTextSkeletonStyles = (): Styles => ({
  display: 'block',
  position: 'relative',
  color: 'transparent',
  height: getSkeletonElementHeight(24, false),
  '&::after': {
    ...getPseudoElementStyles(),
    top: '0',
    background: `linear-gradient(transparent, transparent 4px, ${SKELETON_COLOR_THEME_PLACEHOLDER} 4px, ${SKELETON_COLOR_THEME_PLACEHOLDER} 20px, transparent 20px, transparent 24px)`,
    width: '100%',
    height: '100%',
  },
});
