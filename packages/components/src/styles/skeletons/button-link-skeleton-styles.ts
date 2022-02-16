import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { BUTTON_LINK_SKELETON_WIDTH, getBaseSkeletonStyles } from './';
import { pxToRemWithUnit } from '../common-styles';

export const getButtonLinkSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-button, p-link': {
        '&:not(.hydrated)': {
          ...getBaseSkeletonStyles(false),
          display: 'inline-flex',
          minWidth: pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH),
        },
      },
    },
  });
};
