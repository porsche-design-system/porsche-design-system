import { getMinifiedStyles } from '@porsche-design-system/shared-src/src/styles/getMinifiedStyles';
import { getBaseSkeletonStyles, getCheckboxRadioButtonSkeletonStyles } from './';

export const getCheckboxWrapperSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-checkbox-wrapper:not(.hydrated)': {
        ...getCheckboxRadioButtonSkeletonStyles(),
        ...getBaseSkeletonStyles(),
      },
    },
  });
};
