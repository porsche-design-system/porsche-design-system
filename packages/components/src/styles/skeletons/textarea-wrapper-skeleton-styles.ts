import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import {
  extendPseudoWithTheme,
  getAfterMinHeight,
  getBaseSkeletonStyle,
  getElementBackgroundGradient,
  getHiddenLabelStyle,
  getSkeletonElementHeight,
  getSkeletonPropertyNames,
  getThemedPseudoStyle,
  LABEL_HEIGHT,
  LABEL_HEIGHT_SPACING,
  LABEL_HEIGHT_WITH_DESCRIPTION,
  PDS_SKELETON_CLASS_PREFIX,
  TEXTAREA_SKELETON_HEIGHT,
} from './';
import { pxToRemWithUnit } from '../common-styles';

export const getTextareaWrapperSkeletonCss = (): string => {
  const skeletonPropertyNames = getSkeletonPropertyNames('p-textarea-wrapper');

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
          [`&[${skeletonPropertyNames.hideLabel}=true], &.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.hideLabel}, &:not([${skeletonPropertyNames.description}]):not([${skeletonPropertyNames.label}]):not(.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.description}):not(.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.label})`]:
            getHiddenLabelStyle(),
          [`&[${skeletonPropertyNames.description}]:not([${skeletonPropertyNames.label}]):not(.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.label}), &.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.description}:not(.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.label})`]:
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
          [`&[${skeletonPropertyNames.description}][${skeletonPropertyNames.label}], &.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.description}.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.label}`]:
            {
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
