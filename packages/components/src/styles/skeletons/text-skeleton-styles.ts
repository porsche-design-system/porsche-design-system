import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { pxToRemWithUnit } from '../common-styles';
import { SKELETON_COLOR_THEME_PLACEHOLDER } from './skeleton-base-styles';

export const getTextSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-text': {
        '&:not(.hydrated)': {
          display: 'block',
          position: 'relative',
          minHeight: pxToRemWithUnit(24),
          '&::before': {
            position: 'absolute',
            content: '""',
            height: '100%',
            width: '100%',
            visibility: 'visible',
            left: '0',
            top: '0',
            // background: `repeating-linear-gradient(180deg, ${SKELETON_COLOR_THEME_PLACEHOLDER}, ${SKELETON_COLOR_THEME_PLACEHOLDER} 16px, transparent 16px, transparent 24px)`,
            background: `linear-gradient(180deg, ${SKELETON_COLOR_THEME_PLACEHOLDER}, ${SKELETON_COLOR_THEME_PLACEHOLDER} 16px, transparent 16px, transparent 24px)`,
            animation: 'pulse 2s linear infinite',
          },
        },
      },
    },
  });
};
