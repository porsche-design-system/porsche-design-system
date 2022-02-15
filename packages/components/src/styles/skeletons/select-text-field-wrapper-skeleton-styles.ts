import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { BUTTON_LINK_SKELETON_WIDTH, ELEMENT_SKELETON_HEIGHT, getBaseSkeletonStyles } from './';
import { pxToRemWithUnit } from '../common-styles';

export const getSelectTextFieldWrapperSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-select-wrapper, p-text-field-wrapper': {
        '&:not(.hydrated)': {
          minWidth: pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH),
          height: pxToRemWithUnit(ELEMENT_SKELETON_HEIGHT + 28), // function for this logic?
          ...getBaseSkeletonStyles(),
        },
      },
    },
  });
};
