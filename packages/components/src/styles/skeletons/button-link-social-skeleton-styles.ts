import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import {
  BUTTON_LINK_SKELETON_WIDTH,
  ELEMENT_SKELETON_DIMENSION,
  extendPseudoWithTheme,
  getBaseSkeletonStyle,
  getSkeletonPropertyNames,
  getThemedPseudoStyle,
  PDS_SKELETON_CLASS_PREFIX,
} from './';
import { pxToRemWithUnit } from '../common-styles';

export const getButtonLinkSocialSkeletonCss = (): string => {
  const skeletonPropertyNames = getSkeletonPropertyNames('p-button');

  return getMinifiedCss({
    '@global': {
      'p-button, p-link, p-link-social': {
        '&:not(.hydrated)': {
          ...extendPseudoWithTheme({ styleFunction: () => getBaseSkeletonStyle(false) }),
          display: 'inline-flex',
          minWidth: pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH),
          [`&[${skeletonPropertyNames.hideLabel}=true], &.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.hideLabel}`]:
            {
              minWidth: pxToRemWithUnit(ELEMENT_SKELETON_DIMENSION),
            },
          ...getThemedPseudoStyle(),
        },
      },
    },
  });
};
