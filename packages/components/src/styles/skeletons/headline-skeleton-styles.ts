import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { getTextHeadlineSkeletonStyles } from './text-skeleton-styles';
import { getElementBackgroundGradient, getSkeletonElementHeight } from './skeleton-base-styles';

export const getHeadlineSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-headline': {
        '&:not(.hydrated)': {
          ...getTextHeadlineSkeletonStyles(72),
          // simple approach to set all headlines after the first one to a height of 24px
          '&:not(:first-child)': {
            height: getSkeletonElementHeight(24, false),
            '&::after': {
              background: getElementBackgroundGradient(24),
            },
          },
        },
      },
    },
  });
};
