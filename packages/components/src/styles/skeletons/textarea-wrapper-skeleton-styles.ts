import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import {
  extendPseudoWithTheme,
  getAfterMinHeight,
  getBaseSkeletonStyle,
  getElementBackgroundGradient,
  getHiddenLabelStyle,
  getSkeletonElementHeight,
  getThemedPseudoStyle,
  LABEL_HEIGHT,
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
          [`&[hide-label=true], &.${PDS_SKELETON_CLASS_PREFIX}hide-label, &:not([description]):not([label]):not(.${PDS_SKELETON_CLASS_PREFIX}description):not(.${PDS_SKELETON_CLASS_PREFIX}label)`]:
            getHiddenLabelStyle(),
          [`&[description]:not([label]):not(.${PDS_SKELETON_CLASS_PREFIX}label), &.${PDS_SKELETON_CLASS_PREFIX}description:not(.${PDS_SKELETON_CLASS_PREFIX}label)`]:
            {
              minHeight: getSkeletonElementHeight(TEXTAREA_SKELETON_HEIGHT, false, true),
              '&::before': {
                height: pxToRemWithUnit(LABEL_HEIGHT),
                background: getElementBackgroundGradient(72, 6, true),
              },
              '&::after': {
                top: pxToRemWithUnit(LABEL_HEIGHT),
                minHeight: getAfterMinHeight(LABEL_HEIGHT),
              },
            },
          [`&[description][label], &.${PDS_SKELETON_CLASS_PREFIX}description &.${PDS_SKELETON_CLASS_PREFIX}label`]: {
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
