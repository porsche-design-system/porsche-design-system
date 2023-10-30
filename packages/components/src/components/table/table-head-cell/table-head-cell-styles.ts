import type { Direction } from '../table/table-utils';
import { getCss } from '../../../utils';
import {
  addImportantToEachRule,
  getHiddenTextJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../../../styles';
import {
  borderRadiusSmall,
  borderWidthBase,
  frostedGlassStyle,
  spacingFluidSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/utilities-v2';
import { isDirectionAsc, isSortable } from './table-head-cell-utils';
import { cssVariableTableHeadCellIconFilter } from '../table/table-styles';

const { hoverColor, focusColor } = getThemedColors('light'); // hover color and focus color are the same for light and dark

const buttonBeforeOffsetVertical = '-2px';
const buttonBeforeOffsetHorizontal = '-4px';

export const getComponentCss = (
  active: boolean,
  direction: Direction,
  hideLabel: boolean,
  multiline: boolean
): string => {
  const sortable = isSortable(active, direction);

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'table-cell',
        padding: `2px ${spacingFluidSmall} ${spacingFluidSmall}`,
        verticalAlign: 'bottom',
        whiteSpace: multiline ? 'normal' : 'nowrap',
        ...hostHiddenStyles,
      }),
      ...(sortable
        ? {
            button: {
              position: 'relative',
              display: 'flex',
              gap: spacingStaticXSmall,
              width: 'auto',
              margin: 0, // Removes default button margin on safari 15
              padding: 0,
              font: 'inherit',
              color: 'inherit',
              outline: 0,
              alignItems: 'flex-end',
              appearance: 'none',
              background: 'transparent',
              textAlign: 'start',
              border: 0,
              zIndex: 0,
              cursor: 'pointer',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: buttonBeforeOffsetVertical,
                bottom: buttonBeforeOffsetVertical,
                right: buttonBeforeOffsetHorizontal,
                left: buttonBeforeOffsetHorizontal,
                borderRadius: borderRadiusSmall,
                zIndex: -1, // needed so that text behind element is selectable and/or visible
                transition: getTransition('background-color', 'short', 'base'),
              },
              ...hoverMediaQuery({
                '&:hover, &:focus': {
                  '& .icon': {
                    opacity: 1,
                  },
                },
                '&:hover::before': {
                  ...frostedGlassStyle,
                  backgroundColor: hoverColor,
                },
              }),
              '&:focus::before': {
                border: `${borderWidthBase} solid ${focusColor}`,
              },
              '&:not(:focus-visible)::before': {
                border: 0,
              },
            },
          }
        : hideLabel && {
            span: {
              ...getHiddenTextJssStyle(),
              display: 'block',
              border: 0,
            },
          }),
    },
    ...(sortable && {
      icon: {
        transition: getTransition('opacity', 'short', 'base'),
        opacity: active ? 1 : 0,
        transform: `rotate3d(0,0,1,${isDirectionAsc(direction) ? 0 : 180}deg)`,
        transformOrigin: '50% 50%', // for iOS
        filter: `var(${cssVariableTableHeadCellIconFilter})`,
      },
    }),
  });
};
