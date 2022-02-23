import { pxToRemWithUnit } from '../common-styles';
import {
  BUTTON_LINK_SKELETON_WIDTH,
  ELEMENT_SKELETON_DIMENSION,
  extendPseudoWithTheme,
  getBaseSkeletonStyle,
  getThemedPseudoStyle,
  PDS_SKELETON_CLASS_PREFIX,
} from './base-skeleton-styles';
import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';

export const getButtonLinkPureSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-button-pure, p-link-pure': {
        '&:not(.hydrated)': {
          ...extendPseudoWithTheme({
            styleFunction: () => getBaseSkeletonStyle(false, ELEMENT_SKELETON_DIMENSION / 2),
          }),
          display: 'inline-block',
          minWidth: pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH),
          ...getThemedPseudoStyle(),

          [`&[hide-label=true], &.${PDS_SKELETON_CLASS_PREFIX}hide-label`]: {
            minWidth: pxToRemWithUnit(ELEMENT_SKELETON_DIMENSION),
          },
          [`&[stretch=true], &.${PDS_SKELETON_CLASS_PREFIX}stretch`]: {
            display: 'block',
          },
          [`&[size=medium], &.${PDS_SKELETON_CLASS_PREFIX}size-medium`]: {
            minHeight: pxToRemWithUnit(36),
          },
          [`&[size=x-small], &.${PDS_SKELETON_CLASS_PREFIX}size-x-small`]: {
            minHeight: pxToRemWithUnit(20),
          },
          [`&[size=large], &.${PDS_SKELETON_CLASS_PREFIX}size-large`]: {
            minHeight: pxToRemWithUnit(48),
          },
          [`&[size=x-large], &.${PDS_SKELETON_CLASS_PREFIX}size-x-large`]: {
            minHeight: pxToRemWithUnit(64),
          },
        },
      },
    },
  });
};
