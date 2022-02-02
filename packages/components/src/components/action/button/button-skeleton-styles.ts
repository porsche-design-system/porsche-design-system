import { pxToRemWithUnit } from '../../../styles';
import { getMinifiedStyles } from '../../../../../shared/src/styles/getMinifiedStyles';
import { Styles } from 'jss';

export const getButtonSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-button:not(.hydrated)': {
        width: pxToRemWithUnit(300),
        height: pxToRemWithUnit(150),
        ...getBaseSkeletonStyles(),
      },
    },
  });
};

export const SKELETON_COLOR_THEME_PLACEHOLDER = 'PDS_REPLACE_WITH_THEME_COLOR';
export const SKELETON_LINEAR_GRADIENT_COLOR = 'PDS_REPLACE_WITH_LINEAR_GRADIENT';

export const getBaseSkeletonStyles = (): Styles => {
  return {
    // TODO: hide select / slotted
    display: 'block',
    background: `${SKELETON_COLOR_THEME_PLACEHOLDER}`,
    visibility: 'visible',
    position: 'relative',
    color: 'transparent',
    '& > *': {
      display: 'none',
    },
    '&::before': {
      position: 'absolute',
      content: '""',
      height: '100%',
      width: '100%',
      backgroundImage: `linear-gradient(to right, ${SKELETON_COLOR_THEME_PLACEHOLDER} 0%, ${SKELETON_LINEAR_GRADIENT_COLOR} 20%, ${SKELETON_COLOR_THEME_PLACEHOLDER} 40%, ${SKELETON_COLOR_THEME_PLACEHOLDER} 100%)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '450px 400px',
      animation: 'shimmer 1s linear infinite',
      left: '0',
      top: '0',
    },
  };
};
