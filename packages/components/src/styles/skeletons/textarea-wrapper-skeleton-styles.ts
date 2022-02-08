import { getMinifiedStyles } from '@porsche-design-system/shared-src/src/styles/getMinifiedStyles';
import { getBaseSkeletonStyles } from './';
import { pxToRemWithUnit } from '../common-styles';

export const getTextareaWrapperSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-textarea-wrapper': {
        '&:not(.hydrated)': {
          display: 'block',
          minHeight: pxToRemWithUnit(192),
          height: '100%',
          margin: `${pxToRemWithUnit(28)} 0 0 0`,
          ...getBaseSkeletonStyles(),
        },
      },
    },
  });
};
