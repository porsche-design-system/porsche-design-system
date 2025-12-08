import {
  borderRadiusSmall,
  frostedGlassStyle,
  spacingFluidSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colors,
  getFocusBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { getCss } from '../../../utils';
import { cssVariableTablePadding } from '../table/table-styles';
import type { Direction } from '../table/table-utils';
import { isDirectionAsc, isSortable } from './table-head-cell-utils';

const { frostedColor } = colors;

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
          padding: `2px var(${cssVariableTablePadding}, ${spacingFluidSmall}) var(${cssVariableTablePadding}, ${spacingFluidSmall})`,
          verticalAlign: 'bottom',
          whiteSpace: multiline ? 'normal' : 'nowrap',
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
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
                '&:hover, &:focus-visible': {
                  '& .icon': {
                    opacity: 1,
                  },
                },
                '&:hover::before': {
                  ...frostedGlassStyle,
                  backgroundColor: frostedColor,
                },
              }),
              '&:focus-visible::before': getFocusBaseStyles(),
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
      },
    }),
  });
};
