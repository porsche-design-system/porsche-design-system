import type { Direction } from '../table/table-utils';
import { getCss } from '../../../utils';
import {
  addImportantToEachRule,
  getFocusJssStyle,
  getHiddenTextJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../../../styles';
import {
  borderRadiusSmall,
  frostedGlassStyle,
  spacingFluidSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/utilities-v2';
import { isDirectionAsc, isSortable } from './table-head-cell-utils';
import { cssVariableTableHeadCellIconFilter } from '../table/table-styles';

const { hoverColor } = getThemedColors('light'); // hover color and focus color are the same for light and dark

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
      ':host': {
        display: 'table-cell',
        ...addImportantToEachRule({
          padding: `2px ${spacingFluidSmall} ${spacingFluidSmall}`,
          verticalAlign: 'bottom',
          whiteSpace: multiline ? 'normal' : 'nowrap',
          ...hostHiddenStyles,
        }),
      },
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
              WebkitAppearance: 'none', // iOS safari
              appearance: 'none',
              background: 'transparent',
              textAlign: 'start',
              border: 0,
              zIndex: 0,
              cursor: 'pointer',
              // TODO: re-think if ::before is still needed
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: `${buttonBeforeOffsetVertical} ${buttonBeforeOffsetHorizontal}`,
                borderRadius: borderRadiusSmall,
                zIndex: -1, // needed so that text behind element is selectable and/or visible
                transition: getTransition('background-color'),
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
              // TODO: to be future proof, we need to pass theme parameter
              ...getFocusJssStyle('light', { pseudo: true, offset: '-2px' }),
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
        transition: getTransition('opacity'),
        opacity: active ? 1 : 0,
        transform: `rotate3d(0,0,1,${isDirectionAsc(direction) ? 0 : 180}deg)`,
        transformOrigin: '50% 50%', // for iOS
        filter: `var(${cssVariableTableHeadCellIconFilter})`,
      },
    }),
  });
};
