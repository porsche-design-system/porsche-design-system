import { getMinifiedStyles } from '@porsche-design-system/shared-src/src/styles/getMinifiedStyles';
import { getBaseSkeletonStyles, getCheckboxRadioButtonSkeletonStyles } from './';

export const getRadioButtonWrapperSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-radio-button-wrapper:not(.hydrated)': {
        ...getCheckboxRadioButtonSkeletonStyles(),
        ...getBaseSkeletonStyles(),
      },
    },
  });
};
