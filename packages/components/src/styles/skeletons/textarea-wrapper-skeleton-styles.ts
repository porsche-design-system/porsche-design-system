import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import {
  ELEMENT_SKELETON_DIMENSION,
  extendPseudoWithTheme,
  getAfterMinHeight,
  getBaseSkeletonStyle,
  getElementBackgroundGradient,
  getSkeletonElementHeight,
  getThemedPseudoStyle,
  LABEL_HEIGHT_SPACING,
  LABEL_HEIGHT_WITH_DESCRIPTION,
  PDS_SKELETON_CLASS_PREFIX,
  TEXTAREA_SKELETON_HEIGHT,
} from './';
import { pxToRemWithUnit } from '../common-styles';

export const getTextareaWrapperSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-textarea-wrapper': {
        '&:not(.hydrated)': {
          ...extendPseudoWithTheme({
            styleFunction: getBaseSkeletonStyle,
            pseudosToExtend: ['&::before', '&::after'],
          }),
          minHeight: getSkeletonElementHeight(TEXTAREA_SKELETON_HEIGHT),

          // TODO: use constants for getComponentMeta for "property" class and values
          [`&[hide-label=true], &.${PDS_SKELETON_CLASS_PREFIX}hide-label`]: {
            minHeight: getSkeletonElementHeight(ELEMENT_SKELETON_DIMENSION, false),
            '&::before': {
              content: 'none',
            },
            '&::after': {
              top: 0,
              minHeight: '100%',
            },
          },
          [`&[description], &.${PDS_SKELETON_CLASS_PREFIX}description`]: {
            minHeight: getSkeletonElementHeight(TEXTAREA_SKELETON_HEIGHT, true, true),
            '&::before': {
              height: pxToRemWithUnit(LABEL_HEIGHT_WITH_DESCRIPTION),
              background: getElementBackgroundGradient(LABEL_HEIGHT_WITH_DESCRIPTION, LABEL_HEIGHT_SPACING, true),
            },
            '&::after': {
              top: pxToRemWithUnit(LABEL_HEIGHT_WITH_DESCRIPTION),
              minHeight: getAfterMinHeight(LABEL_HEIGHT_WITH_DESCRIPTION),
            },
          },

          ...getThemedPseudoStyle(true),
        },
      },
    },
  });
};
