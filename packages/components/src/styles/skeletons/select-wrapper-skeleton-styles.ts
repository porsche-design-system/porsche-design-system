import { getMinifiedStyles } from '@porsche-design-system/shared-src/src/styles/getMinifiedStyles';
import { getBaseSkeletonStyles, getSelectTextFieldSkeletonStyles } from './';

export const getSelectWrapperSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-select-wrapper:not(.hydrated)': {
        ...getSelectTextFieldSkeletonStyles(),
        ...getBaseSkeletonStyles(),
      },
    },
  });
};
