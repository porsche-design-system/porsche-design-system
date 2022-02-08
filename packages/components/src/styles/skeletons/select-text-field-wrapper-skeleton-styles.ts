import { getMinifiedStyles } from '@porsche-design-system/shared-src/src/styles/getMinifiedStyles';
import { BUTTON_LINK_SKELETON_WIDTH, ELEMENT_SKELETON_HEIGHT, getBaseSkeletonStyles } from './';
import { pxToRemWithUnit } from '../common-styles';

export const getSelectTextFieldWrapperSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-select-wrapper, p-text-field-wrapper': {
        '&:not(.hydrated)': {
          minWidth: pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH),
          height: pxToRemWithUnit(ELEMENT_SKELETON_HEIGHT),
          margin: `${pxToRemWithUnit(28)} 0 0 0`,
          ...getBaseSkeletonStyles(),
        },
      },
    },
  });
};
