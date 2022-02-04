import { getMinifiedStyles } from '@porsche-design-system/shared-src/src/styles/getMinifiedStyles';
import { ELEMENT_SKELETON_HEIGHT, getBaseSkeletonStyles } from './';
import { pxToRemWithUnit } from '../common-styles';

export const getSelectTextFieldWrapperSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-select-wrapper, p-text-field-wrapper': {
        '&:not(.hydrated)': {
          maxWidth: pxToRemWithUnit(450),
          height: pxToRemWithUnit(ELEMENT_SKELETON_HEIGHT),
          margin: `${pxToRemWithUnit(28)} 0 0 0`,
          ...getBaseSkeletonStyles(),
        },
      },
    },
  });
};
