import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { SKELETON_COLOR_THEME_PLACEHOLDER, getSkeletonElementHeight } from './skeleton-base-styles';

export const getTextSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-text': {
        '&:not(.hydrated)': {
          display: 'block',
          position: 'relative',
          color: 'transparent',
          height: getSkeletonElementHeight(24, false),
          '&::after': {
            content: '""',
            position: 'absolute',
            left: '0',
            top: '0',
            visibility: 'visible',
            animation: 'pulse 2s linear infinite',
            background: `linear-gradient(transparent, transparent 4px, ${SKELETON_COLOR_THEME_PLACEHOLDER} 4px, ${SKELETON_COLOR_THEME_PLACEHOLDER} 20px, transparent 20px, transparent 24px)`,
            width: '100%',
            height: '100%',
          },
        },
      },
    },
  });
};
