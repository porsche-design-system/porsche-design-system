import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import {
  BUTTON_LINK_SKELETON_WIDTH,
  ELEMENT_SKELETON_HEIGHT,
  extendPseudoWithTheme,
  getBaseSkeletonStyles,
  getSkeletonElementHeight,
  PDS_SKELETON_CLASS_PREFIX,
} from './';
import { pxToRemWithUnit } from '../common-styles';

export const getSelectTextFieldWrapperSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-select-wrapper, p-text-field-wrapper': {
        '&:not(.hydrated)': {
          ...extendPseudoWithTheme('light', getBaseSkeletonStyles),

          minWidth: pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH),
          height: getSkeletonElementHeight(ELEMENT_SKELETON_HEIGHT),
          // TODO: mark skeletons as experimental in changelog
          // TODO: use constants for getComponentMeta for "property" class and values
          [`&[hide-label=true], &.${PDS_SKELETON_CLASS_PREFIX}hide-label`]: {
            height: getSkeletonElementHeight(ELEMENT_SKELETON_HEIGHT, false),
            '&::before': {
              content: 'none',
            },
            '&::after': {
              top: 0,
              minHeight: '100%',
            },
          },
          [`&[theme=dark], &.${PDS_SKELETON_CLASS_PREFIX}theme-dark`]: {
            ...extendPseudoWithTheme('dark'),
          },
        },
      },
    },
  });
};
