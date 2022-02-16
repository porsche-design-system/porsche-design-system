import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import {
  SKELETON_COLOR_THEME_PLACEHOLDER,
  getSkeletonElementHeight,
  getPseudoElementStyles,
} from './skeleton-base-styles';

export const getTextAndTextListSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-text, p-text-list-item': {
        '&:not(.hydrated)': {
          display: 'block',
          position: 'relative',
          color: 'transparent',
          height: getSkeletonElementHeight(24, false),
          '&::after': {
            ...getPseudoElementStyles(),
            top: '0',
            background: `repeating-linear-gradient(transparent, transparent 4px, ${SKELETON_COLOR_THEME_PLACEHOLDER} 4px, ${SKELETON_COLOR_THEME_PLACEHOLDER} 20px, transparent 20px, transparent 24px)`,
            width: '100%',
            height: '100%',
          },
        },
      },
    },
  });
};
