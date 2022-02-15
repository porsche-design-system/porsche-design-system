import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { pxToRemWithUnit } from '../common-styles';
import { getBaseSkeletonStyles } from './skeleton-base-styles';

export const getHeadlineSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-headline': {
        '&:not(.hydrated)': {
          display: 'block',
          position: 'relative',
          height: pxToRemWithUnit(36),
          margin: `${pxToRemWithUnit(6)} 0`,
          ...getBaseSkeletonStyles(false),
        },
      },
    },
  });
};
