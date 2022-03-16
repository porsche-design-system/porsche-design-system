import {
  BUTTON_LINK_SKELETON_WIDTH,
  ELEMENT_SKELETON_DIMENSION,
  extendPseudoWithThemeJssStyle,
  getAfterMinHeight,
  getBaseSkeletonJssStyle,
  getElementBackgroundGradient,
  getHiddenLabelJssStyle,
  getSkeletonElementHeight,
  getSkeletonPropertyNames,
  getThemedPseudoJssStyle,
  LABEL_HEIGHT,
  LABEL_HEIGHT_SPACING,
  LABEL_HEIGHT_WITH_DESCRIPTION,
} from './';
import { PDS_SKELETON_CLASS_PREFIX } from '@porsche-design-system/shared';
import { pxToRemWithUnit } from '../common-styles';
import type { Styles } from 'jss';

export const getSelectTextFieldWrapperSkeletonStyles = (): Styles<'@global'> => {
  const skeletonPropertyNames = getSkeletonPropertyNames('p-select-wrapper');

  return {
    '@global': {
      'p-select-wrapper, p-text-field-wrapper': {
        '&:not(.hydrated)': {
          ...extendPseudoWithThemeJssStyle({
            styleFunction: getBaseSkeletonJssStyle,
            pseudosToExtend: ['&::before', '&::after'],
          }),

          minWidth: pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH),
          height: getSkeletonElementHeight(ELEMENT_SKELETON_DIMENSION),

          // TODO: use constants for getComponentMeta for "property" class and values
          // hideLabel or no description and no label
          [`&[${skeletonPropertyNames.hideLabel}=true], &.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.hideLabel}, &:not([${skeletonPropertyNames.description}]):not([${skeletonPropertyNames.label}]):not(.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.description}):not(.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.label})`]:
            getHiddenLabelJssStyle(),
          // description no label and no hideLabel
          [`&[${skeletonPropertyNames.description}]:not([${skeletonPropertyNames.label}]):not(.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.label}), &.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.description}:not(.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.label})`]:
            {
              height: getSkeletonElementHeight(ELEMENT_SKELETON_DIMENSION, false, true),
              '&::before': {
                height: pxToRemWithUnit(LABEL_HEIGHT),
                background: getElementBackgroundGradient(72, 6, true),
              },
              '&::after': {
                top: pxToRemWithUnit(LABEL_HEIGHT),
                minHeight: getAfterMinHeight(LABEL_HEIGHT),
              },
            },
          // description, label and not hideLabel
          [`&[${skeletonPropertyNames.description}][${skeletonPropertyNames.label}]:not([${skeletonPropertyNames.hideLabel}=true]), &.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.description}.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.label}:not(.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.hideLabel})`]:
            {
              height: getSkeletonElementHeight(ELEMENT_SKELETON_DIMENSION, true, true),
              '&::before': {
                height: pxToRemWithUnit(LABEL_HEIGHT_WITH_DESCRIPTION),
                background: getElementBackgroundGradient(LABEL_HEIGHT_WITH_DESCRIPTION, LABEL_HEIGHT_SPACING, true),
              },
              '&::after': {
                top: pxToRemWithUnit(LABEL_HEIGHT_WITH_DESCRIPTION),
                minHeight: getAfterMinHeight(LABEL_HEIGHT_WITH_DESCRIPTION),
              },
            },
          ...getThemedPseudoJssStyle(true),
        },
      },
    },
  };
};
