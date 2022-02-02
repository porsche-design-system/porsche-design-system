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

export const getBaseSkeletonStyles = (): Styles => {
  return {
    // TODO: hide select / slotted
    display: 'block',
    background: `${SKELETON_COLOR_THEME_PLACEHOLDER}`,
    visibility: 'visible',
    color: 'transparent',

    '&::before': {
      position: 'absolute',
      content: '""',
      height: '100%',
      width: '100%',
      backgroundImage: `linear-gradient(to right, ${SKELETON_COLOR_THEME_PLACEHOLDER} 0%, rgba(0,0,0,0.05) 20%, ${SKELETON_COLOR_THEME_PLACEHOLDER} 40%, ${SKELETON_COLOR_THEME_PLACEHOLDER} 100%)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '450px 400px',
      animation: 'shimmer 1s linear infinite',
      left: '0',
      top: '0',
    },
  };
};
