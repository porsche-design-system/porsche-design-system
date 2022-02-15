import { Styles } from 'jss';
import { pxToRemWithUnit } from '../common-styles';

export const SKELETON_COLOR_THEME_PLACEHOLDER = 'PDS_REPLACE_WITH_THEME_COLOR';
export const SKELETON_LINEAR_GRADIENT_COLOR_1 = 'PDS_REPLACE_WITH_LINEAR_GRADIENT_1';
export const SKELETON_LINEAR_GRADIENT_COLOR_2 = 'PDS_REPLACE_WITH_LINEAR_GRADIENT_2';
// Firefox has the widest input field with 192px
// to prevent layout shift when shadow dom is appended
export const BUTTON_LINK_SKELETON_WIDTH = 192;
export const ELEMENT_SKELETON_HEIGHT = 48;

const getPseudoElementStyles = (): Styles => {
  return {
    position: 'absolute',
    content: '""',
    visibility: 'visible',
    left: '0',
    animation: 'pulse 2s linear infinite',
    background: `${SKELETON_COLOR_THEME_PLACEHOLDER}`,
  };
};

export const getBaseSkeletonStyles = (withLabel = true): Styles => {
  return {
    display: 'block',
    position: 'relative',
    color: 'transparent',
    ...(withLabel && {
      '&::before': {
        ...getPseudoElementStyles(),
        height: pxToRemWithUnit(24),
        width: pxToRemWithUnit(128),
        top: '0',
      },
    }),
    '&::after': {
      ...getPseudoElementStyles(),
      top: pxToRemWithUnit(withLabel ? 28 : 0),
      width: '100%',
      height: withLabel ? 'calc(100% - 28px)' : '100%',
    },
  };
};
