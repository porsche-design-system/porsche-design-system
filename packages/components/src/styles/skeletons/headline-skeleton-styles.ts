import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { getSkeletonElementHeight, SKELETON_COLOR_THEME_PLACEHOLDER } from './skeleton-base-styles';

export const getHeadlineSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-headline': {
        '&:not(.hydrated)': {
          display: 'block',
          position: 'relative',
          height: getSkeletonElementHeight(72, false),
          color: 'transparent',
          '&::after': {
            content: '""',
            position: 'absolute',
            left: '0',
            top: '0',
            visibility: 'visible',
            animation: 'pulse 2s linear infinite',
            background: `linear-gradient(transparent, transparent 6px, ${SKELETON_COLOR_THEME_PLACEHOLDER} 6px, ${SKELETON_COLOR_THEME_PLACEHOLDER} 66px, transparent 66px, transparent 72px)`,
            width: '100%',
            height: '100%',
          },
        },
      },
    },
  });
};
