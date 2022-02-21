import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { pxToRemWithUnit } from '../common-styles';
import { getTextHeadlineSkeletonStyles } from './text-skeleton-styles';

export const getTextListItemSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-text-list-item': {
        '&:not(.hydrated)': {
          ...getTextHeadlineSkeletonStyles(),
          minHeight: pxToRemWithUnit(24),
          height: 'auto',
        },
      },
    },
  });
};
