import type { Direction } from '../table/table-utils';
import { getCss } from '../../../../utils';
import {
  addImportantToEachRule,
  getFocusStyles,
  getHoverStyles,
  getTextHiddenJssStyle,
  getTransition,
  pxToRemWithUnit,
  getThemedColors,
} from '../../../../styles';
import { fontWeight, spacing, textSmall } from '@porsche-design-system/utilities-v2';
import { isDirectionAsc, isSortable } from './table-head-cell-utils';

const { contrastMediumColor, baseColor } = getThemedColors('light');

export const getComponentCss = (active: boolean, direction: Direction, hideLabel: boolean): string => {
  const _isSortable = isSortable(active, direction);

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
      ...(_isSortable && {
        button: {
          display: 'flex',
          alignItems: 'flex-end',
          padding: 0,
          boxSizing: 'border-box',
          appearance: 'none',
          border: 'none',
          ...textSmall,
          fontWeight: fontWeight.semibold,
          color: baseColor,
          textDecoration: 'none',
          textAlign: 'left',
          background: 'transparent',
          cursor: 'pointer',
          ...getHoverStyles(),
          ...getFocusStyles({ offset: 1 }),
          '&:hover, &:focus': {
            '& .icon': {
              opacity: 1,
            },
          },
        },
      }),
      ...(!_isSortable &&
        hideLabel && {
          span: {
            ...getTextHiddenJssStyle(true),
            display: 'block',
            border: 0,
          },
        }),
    },
    ...(_isSortable && {
      icon: {
        marginLeft: spacing[4],
        opacity: active ? 1 : 0,
        transform: `rotate3d(0,0,1,${isDirectionAsc(direction) ? 0 : 180}deg)`,
        transformOrigin: '50% 50%', // for iOS
        transition: getTransition('opacity'),
      },
    }),
  });
};
