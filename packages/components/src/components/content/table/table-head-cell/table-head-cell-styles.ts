import { getCss } from '../../../../utils';
import {
  addImportantToEachRule,
  getFocusStyle,
  getHoverStyle,
  getTextHiddenJssStyle,
  getTransition,
  pxToRemWithUnit,
  getThemedColors,
} from '../../../../styles';
import { fontFamily, fontSize, fontWeight, spacing } from '@porsche-design-system/utilities-v2';

const { contrastMediumColor, baseColor } = getThemedColors('light');

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'table-cell',
        padding: `${pxToRemWithUnit(2)} ${pxToRemWithUnit(12)} ${pxToRemWithUnit(8)}`,
        borderBottom: `1px solid ${contrastMediumColor}`,
        verticalAlign: 'bottom',
        fontWeight: fontWeight.semibold,
        whiteSpace: 'nowrap',
      }),
      button: {
        display: 'flex',
        alignItems: 'flex-end',
        padding: 0,
        boxSizing: 'border-box',
        appearance: 'none',
        border: 'none',
        fontFamily,
        fontWeight: fontWeight.semibold,
        ...fontSize.small,
        color: baseColor,
        textDecoration: 'none',
        textAlign: 'left',
        background: 'transparent',
        cursor: 'pointer',
        ...getHoverStyle(),
        ...getFocusStyle({ offset: 1 }),
        '&:hover, &:focus': {
          '& .icon': {
            opacity: 1,
          },
        },
      },
    },
    hidden: {
      ...getTextHiddenJssStyle(true),
      display: 'block',
      border: 0,
    },
    icon: {
      marginLeft: spacing[4],
      opacity: 0,
      transition: getTransition('opacity'),
      transform: 'rotate3d(0,0,1,0deg)',
      transformOrigin: '50% 50%', // for iOS
      '&--asc': {
        transform: 'rotate3d(0,0,1,180deg)',
      },
      '&--active': {
        opacity: 1,
      },
    },
  });
};
