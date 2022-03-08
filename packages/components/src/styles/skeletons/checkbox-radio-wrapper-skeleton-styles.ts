import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { pxToRemWithUnit } from '../common-styles';
import {
  BUTTON_LINK_SKELETON_WIDTH,
  ELEMENT_SKELETON_DIMENSION,
  extendPseudoWithTheme,
  getBaseSkeletonStyle,
  getSkeletonPropertyNames,
  getThemedPseudoStyle,
  PDS_SKELETON_CLASS_PREFIX,
} from './base-skeleton-styles';

export const getCheckboxRadioWrapperSkeletonCss = (): string => {
  const checkboxRadioElementHeight = ELEMENT_SKELETON_DIMENSION / 2;
  const skeletonPropertyNames = getSkeletonPropertyNames('p-checkbox-wrapper');

  return getMinifiedCss({
    '@global': {
      'p-checkbox-wrapper, p-radio-button-wrapper': {
        '&:not(.hydrated)': {
          ...extendPseudoWithTheme({
            styleFunction: () => getBaseSkeletonStyle(false, checkboxRadioElementHeight),
          }),
          display: 'block',
          minWidth: pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH),
          [`&[${skeletonPropertyNames.hideLabel}=true], &.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.hideLabel}`]:
            {
              minWidth: pxToRemWithUnit(checkboxRadioElementHeight),
            },
          ...getThemedPseudoStyle(),
        },
      },
    },
  });
};
