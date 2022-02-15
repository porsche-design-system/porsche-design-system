import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import {
  BUTTON_LINK_SKELETON_WIDTH,
  ELEMENT_SKELETON_HEIGHT,
  getBaseSkeletonStyles,
  getSkeletonElementHeight,
} from './';
import { pxToRemWithUnit } from '../common-styles';

export const getButtonLinkSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-button, p-link': {
        '&:not(.hydrated)': {
          display: 'flex',
          minWidth: pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH),
          minHeight: getSkeletonElementHeight(ELEMENT_SKELETON_HEIGHT, false),
          ...getBaseSkeletonStyles(false),
        },
      },
    },
  });
};
