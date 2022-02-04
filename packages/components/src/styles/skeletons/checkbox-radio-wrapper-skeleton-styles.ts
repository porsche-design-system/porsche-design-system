import { getMinifiedStyles } from '@porsche-design-system/shared-src/src/styles/getMinifiedStyles';
import { pxToRemWithUnit } from '../common-styles';
import { ELEMENT_SKELETON_HEIGHT, getBaseSkeletonStyles } from './skeleton-base-styles';

export const getCheckboxRadioWrapperSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-checkbox-wrapper, p-radio-button-wrapper': {
        '&:not(.hydrated)': {
          width: pxToRemWithUnit(81.5),
          height: pxToRemWithUnit(ELEMENT_SKELETON_HEIGHT / 2),
          ...getBaseSkeletonStyles(),
        },
      },
    },
  });
};
