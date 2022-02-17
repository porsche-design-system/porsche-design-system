import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { pxToRemWithUnit } from '../common-styles';
import { getTextSkeletonStyles } from './text-skeleton-styles';

export const getTextListItemSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-text-list-item': {
        '&:not(.hydrated)': {
          ...getTextSkeletonStyles(),
          minHeight: pxToRemWithUnit(24),
          height: 'auto',
        },
      },
    },
  });
};
