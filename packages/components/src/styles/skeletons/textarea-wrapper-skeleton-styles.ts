import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { getBaseSkeletonStyles } from './';
import { pxToRemWithUnit } from '../common-styles';

export const getTextareaWrapperSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-textarea-wrapper': {
        '&:not(.hydrated)': {
          display: 'block',
          height: '100%',
          minHeight: pxToRemWithUnit(192),
          ...getBaseSkeletonStyles(),
        },
      },
    },
  });
};
