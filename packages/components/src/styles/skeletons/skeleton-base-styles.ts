import { Styles } from 'jss';

export const SKELETON_COLOR_THEME_PLACEHOLDER = 'PDS_REPLACE_WITH_THEME_COLOR';
export const SKELETON_LINEAR_GRADIENT_COLOR_1 = 'PDS_REPLACE_WITH_LINEAR_GRADIENT_1';
export const SKELETON_LINEAR_GRADIENT_COLOR_2 = 'PDS_REPLACE_WITH_LINEAR_GRADIENT_2';
export const BUTTON_LINK_SKELETON_WIDTH = 128;
export const ELEMENT_SKELETON_HEIGHT = 48;

export const getBaseSkeletonStyles = (): Styles => {
  return {
    display: 'block',
    background: `${SKELETON_COLOR_THEME_PLACEHOLDER}`,
    visibility: 'visible',
    position: 'relative',
    color: 'transparent',
    '& > *': {
      visibility: 'hidden',
    },
    '&::before': {
      position: 'absolute',
      content: '""',
      height: '100%',
      width: '100%',
      backgroundImage: `linear-gradient(to right, ${SKELETON_LINEAR_GRADIENT_COLOR_1} 0%, ${SKELETON_LINEAR_GRADIENT_COLOR_2} 20%, ${SKELETON_LINEAR_GRADIENT_COLOR_1} 40%, ${SKELETON_LINEAR_GRADIENT_COLOR_1} 100%)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '450px 400px',
      animation: 'shimmer 1s linear infinite',
      left: '0',
      top: '0',
    },
  };
};
