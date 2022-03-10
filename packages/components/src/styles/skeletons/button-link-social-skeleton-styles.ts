import {
  BUTTON_LINK_SKELETON_WIDTH,
  ELEMENT_SKELETON_DIMENSION,
  extendPseudoWithThemeJssStyle,
  getBaseSkeletonJssStyle,
  getSkeletonPropertyNames,
  getThemedPseudoJssStyle,
  PDS_SKELETON_CLASS_PREFIX,
} from './';
import { pxToRemWithUnit } from '../common-styles';
import type { Styles } from 'jss';

export const getButtonLinkSocialSkeletonStyles = (): Styles<'@global'> => {
  const skeletonPropertyNames = getSkeletonPropertyNames('p-button');

  return {
    '@global': {
      'p-button, p-link, p-link-social': {
        '&:not(.hydrated)': {
          ...extendPseudoWithThemeJssStyle({ styleFunction: () => getBaseSkeletonJssStyle(false) }),
          display: 'inline-flex',
          minWidth: pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH),
          [`&[${skeletonPropertyNames.hideLabel}=true], &.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.hideLabel}`]:
            {
              minWidth: pxToRemWithUnit(ELEMENT_SKELETON_DIMENSION),
            },
          ...getThemedPseudoJssStyle(),
        },
      },
    },
  };
};
