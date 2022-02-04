import { getMinifiedStyles } from '@porsche-design-system/shared-src/src/styles/getMinifiedStyles';
import { getBaseSkeletonStyles, getSelectTextFieldSkeletonStyles } from './';

export const getTextFieldWrapperSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-text-field-wrapper:not(.hydrated)': {
        ...getSelectTextFieldSkeletonStyles(),
        ...getBaseSkeletonStyles(),
      },
    },
  });
};
