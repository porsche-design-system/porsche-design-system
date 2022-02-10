import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { pxToRemWithUnit } from '../common-styles';
import { BUTTON_LINK_SKELETON_WIDTH, ELEMENT_SKELETON_HEIGHT, getBaseSkeletonStyles } from './skeleton-base-styles';

export const getCheckboxRadioWrapperSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-checkbox-wrapper, p-radio-button-wrapper': {
        '&:not(.hydrated)': {
          minWidth: pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH),
          minHeight: pxToRemWithUnit(ELEMENT_SKELETON_HEIGHT / 2),
          ...getBaseSkeletonStyles(),
        },
      },
    },
  });
};
