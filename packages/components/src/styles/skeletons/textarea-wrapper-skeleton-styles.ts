import {
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
  TEXTAREA_SKELETON_HEIGHT,
} from './';
import { PDS_SKELETON_CLASS_PREFIX, TagName } from '@porsche-design-system/shared';
import { pxToRemWithUnit } from '../common-styles';
import { Styles } from 'jss';

type TextAreaSelectWrapperTagName = Extract<TagName, 'p-textarea-wrapper' | 'p-select-wrapper'>;

export const getHideLabelSelector = (tagName: TextAreaSelectWrapperTagName): string => {
  // hideLabel or no description and no label
  const skeletonPropertyNames = getSkeletonPropertyNames(tagName);
  return `&[${skeletonPropertyNames.hideLabel}=true], &.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.hideLabel}, &:not([${skeletonPropertyNames.description}]):not([${skeletonPropertyNames.label}]):not(.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.description}):not(.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.label})`;
};

export const getDescriptionOnlySelector = (tagName: TextAreaSelectWrapperTagName): string => {
  // description no label and no hideLabel
  const skeletonPropertyNames = getSkeletonPropertyNames(tagName);
  return `&[${skeletonPropertyNames.description}]:not([${skeletonPropertyNames.label}]):not(.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.label}), &.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.description}:not(.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.label})`;
};

export const getDescriptionAndLabelSelector = (tagName: TextAreaSelectWrapperTagName): string => {
  // description, label and not hideLabel
  const skeletonPropertyNames = getSkeletonPropertyNames(tagName);
  return `&[${skeletonPropertyNames.description}][${skeletonPropertyNames.label}]:not([${skeletonPropertyNames.hideLabel}=true]), &.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.description}.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.label}:not(.${PDS_SKELETON_CLASS_PREFIX}${skeletonPropertyNames.hideLabel})`;
};

export const getTextareaWrapperSkeletonStyles = (): Styles<'@global'> => {
  return {
    '@global': {
      'p-textarea-wrapper': {
        '&:not(.hydrated)': {
          ...extendPseudoWithThemeJssStyle({
            styleFunction: getBaseSkeletonJssStyle,
            pseudosToExtend: ['&::before', '&::after'],
          }),
          minHeight: getSkeletonElementHeight(TEXTAREA_SKELETON_HEIGHT),

          // TODO: use constants for getComponentMeta for "property" class and values

          [getHideLabelSelector('p-textarea-wrapper')]: getHiddenLabelJssStyle(),
          [getDescriptionOnlySelector('p-textarea-wrapper')]: {
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
          [getDescriptionAndLabelSelector('p-textarea-wrapper')]: {
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

          ...getThemedPseudoJssStyle(true),
        },
      },
    },
  };
};
