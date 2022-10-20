import { pxToRemWithUnit } from '../common-styles';
import {
  BUTTON_LINK_SKELETON_WIDTH,
  ELEMENT_SKELETON_DIMENSION,
  extendPseudoWithThemeJssStyle,
  getBaseSkeletonJssStyle,
  getSkeletonPropertyNames,
  getThemedPseudoJssStyle,
} from './base-skeleton-styles';
import { Styles } from 'jss';
import { PDS_SKELETON_CLASS_PREFIX } from '@porsche-design-system/shared';

export const getCheckboxRadioWrapperSkeletonStyles = (): Styles<'@global'> => {
  const checkboxRadioElementHeight = ELEMENT_SKELETON_DIMENSION / 2;
  const skeletonPropertyNames = getSkeletonPropertyNames('p-checkbox-wrapper');

  return {
    '@global': {
      'p-checkbox-wrapper, p-radio-button-wrapper': {
        '&:not(.hydrated)': {
          ...extendPseudoWithThemeJssStyle({
            jssStyle: getBaseSkeletonJssStyle(false, checkboxRadioElementHeight),
          }),
          display: 'block',
          minWidth: pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH),
          [`&[${skeletonPropertyNames.hideLabel}=true], &.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.hideLabel}`]:
            {
              minWidth: pxToRemWithUnit(checkboxRadioElementHeight),
            },
          ...getThemedPseudoJssStyle(),
        },
      },
    },
  };
};
