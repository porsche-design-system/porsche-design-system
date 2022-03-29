import {
  BUTTON_LINK_SKELETON_WIDTH,
  ELEMENT_SKELETON_DIMENSION,
  extendPseudoWithThemeJssStyle,
  getAfterMinHeight,
  getBaseSkeletonJssStyle,
  getDescriptionAndLabelSelector,
  getDescriptionOnlySelector,
  getElementBackgroundGradient,
  getHiddenLabelJssStyle,
  getHideLabelSelector,
  getLabelSkeletonJssStyle,
  getLabelSelector,
  getSkeletonElementHeight,
  getThemedPseudoJssStyle,
  LABEL_HEIGHT,
  LABEL_HEIGHT_SPACING,
  LABEL_HEIGHT_WITH_DESCRIPTION,
} from './';
import { pxToRemWithUnit } from '../common-styles';
import type { Styles } from 'jss';

export const getSelectTextFieldWrapperSkeletonStyles = (): Styles<'@global'> => {
  const selectWrapper = 'p-select-wrapper';
  return {
    '@global': {
      'p-select-wrapper, p-text-field-wrapper': {
        '&:not(.hydrated)': {
          ...extendPseudoWithThemeJssStyle({
            jssStyle: getBaseSkeletonJssStyle(),
            pseudosToExtend: ['&::before', '&::after'],
          }),

          minWidth: pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH),
          height: getSkeletonElementHeight(ELEMENT_SKELETON_DIMENSION),

          // TODO: use constants for getComponentMeta for "property" class and values
          [getLabelSelector(selectWrapper)]: getLabelSkeletonJssStyle(),
          [getHideLabelSelector(selectWrapper)]: getHiddenLabelJssStyle(),
          [getDescriptionOnlySelector(selectWrapper)]: {
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
          [getDescriptionAndLabelSelector(selectWrapper)]: {
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
