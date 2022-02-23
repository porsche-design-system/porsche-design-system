import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import {
  BUTTON_LINK_SKELETON_WIDTH,
  ELEMENT_SKELETON_DIMENSION,
  extendPseudoWithTheme,
  getBaseSkeletonStyle,
  getSkeletonElementHeight,
  getThemedPseudoStyle,
  PDS_SKELETON_CLASS_PREFIX,
} from './';
import { pxToRemWithUnit } from '../common-styles';

export const getSelectTextFieldWrapperSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-select-wrapper, p-text-field-wrapper': {
        '&:not(.hydrated)': {
          ...extendPseudoWithTheme({
            stylesFunction: getBaseSkeletonStyle,
            pseudosToExtend: ['&::before', '&::after'],
          }),

          minWidth: pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH),
          height: getSkeletonElementHeight(ELEMENT_SKELETON_DIMENSION),

          // TODO: use constants for getComponentMeta for "property" class and values
          [`&[hide-label=true], &.${PDS_SKELETON_CLASS_PREFIX}hide-label`]: {
            height: getSkeletonElementHeight(ELEMENT_SKELETON_DIMENSION, false),
            '&::before': {
              content: 'none',
            },
            '&::after': {
              top: 0,
              minHeight: '100%',
            },
          },
          ...getThemedPseudoStyle(true),
        },
      },
    },
  });
};
