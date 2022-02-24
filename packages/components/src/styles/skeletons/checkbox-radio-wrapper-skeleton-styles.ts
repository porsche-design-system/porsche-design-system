import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { pxToRemWithUnit } from '../common-styles';
import {
  BUTTON_LINK_SKELETON_WIDTH,
  ELEMENT_SKELETON_DIMENSION,
  extendPseudoWithTheme,
  getBaseSkeletonStyle,
  getThemedPseudoStyle,
  PDS_SKELETON_CLASS_PREFIX,
} from './base-skeleton-styles';

export const getCheckboxRadioWrapperSkeletonCss = (): string => {
  const checkboxRadioElementHeight = ELEMENT_SKELETON_DIMENSION / 2;
  return getMinifiedCss({
    '@global': {
      'p-checkbox-wrapper, p-radio-button-wrapper': {
        '&:not(.hydrated)': {
          ...extendPseudoWithTheme({
            styleFunction: () => getBaseSkeletonStyle(false, checkboxRadioElementHeight),
          }),
          display: 'block',
          minWidth: pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH),
          [`&[hide-label=true], &.${PDS_SKELETON_CLASS_PREFIX}hide-label`]: {
            minWidth: pxToRemWithUnit(checkboxRadioElementHeight),
          },
          ...getThemedPseudoStyle(),
        },
      },
    },
  });
};
