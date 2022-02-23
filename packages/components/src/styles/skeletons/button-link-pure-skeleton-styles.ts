import { pxToRemWithUnit } from '../common-styles';
import {
  BUTTON_LINK_SKELETON_WIDTH,
  ELEMENT_SKELETON_DIMENSION,
  extendPseudoWithTheme,
  getBaseSkeletonStyles,
  getThemedPseudoStyles,
} from './skeleton-base-styles';
import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';

export const getButtonLinkPureSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-button-pure, p-link-pure': {
        '&:not(.hydrated)': {
          ...extendPseudoWithTheme({
            stylesFunction: () => getBaseSkeletonStyles(false, ELEMENT_SKELETON_DIMENSION / 2),
          }),
          display: 'inline-block',
          minWidth: pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH),
          ...getThemedPseudoStyles(),
        },
      },
    },
  });
};
