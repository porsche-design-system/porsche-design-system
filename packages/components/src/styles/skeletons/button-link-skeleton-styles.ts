import { getMinifiedStyles } from '@porsche-design-system/shared-src/src/styles/getMinifiedStyles';
import { BUTTON_LINK_SKELETON_WIDTH, ELEMENT_SKELETON_HEIGHT, getBaseSkeletonStyles } from './';
import { pxToRemWithUnit } from '../common-styles';

export const getButtonLinkSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-button, p-link': {
        '&:not(.hydrated)': {
          display: 'flex',
          width: pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH),
          height: pxToRemWithUnit(ELEMENT_SKELETON_HEIGHT),
          ...getBaseSkeletonStyles(),
        },
      },
    },
  });
};
