import { pxToRemWithUnit } from '../common-styles';
import { BUTTON_LINK_SKELETON_WIDTH, ELEMENT_SKELETON_HEIGHT, getBaseSkeletonStyles } from './skeleton-base-styles';
import { getMinifiedStyles } from '@porsche-design-system/shared-src/src/styles/getMinifiedStyles';

export const getButtonLinkPureSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-button-pure, p-link-pure': {
        '&:not(.hydrated)': {
          display: 'flex',
          width: pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH),
          height: pxToRemWithUnit(ELEMENT_SKELETON_HEIGHT / 2),
          ...getBaseSkeletonStyles(),
        },
      },
    },
  });
};
