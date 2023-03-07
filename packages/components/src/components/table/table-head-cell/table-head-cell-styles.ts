import type { Direction } from '../table/table-utils';
import { getCss } from '../../../utils';
import {
  addImportantToEachRule,
  getTextHiddenJssStyle,
  getThemedColors,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../../../styles';
import { fontWeight, spacingFluidSmall, spacingStaticXSmall } from '@porsche-design-system/utilities-v2';
import { isDirectionAsc, isSortable } from './table-head-cell-utils';
import { cssVariableTableBorderColor } from '../table/table-styles';

const { semiBold: fontWeightSemiBold } = fontWeight;

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
        padding: `2px ${spacingFluidSmall} ${spacingFluidSmall} ${spacingFluidSmall}`,
        borderBottom: `1px solid var(${cssVariableTableBorderColor}, ${getThemedColors('light').contrastLowColor})`,
        verticalAlign: 'bottom',
        fontWeight: fontWeightSemiBold,
        whiteSpace: multiline ? 'normal' : 'nowrap',
        ...hostHiddenStyles,
      }),
      ...(sortable
        ? {
            '.button-pure': {
              ...hoverMediaQuery({
                '&:hover, &:focus': {
                  '& .icon': {
                    opacity: 1,
                  },
                },
              }),
            },
          }
        : hideLabel && {
            span: {
              ...getTextHiddenJssStyle(true),
              display: 'block',
              border: 0,
            },
          }),
    },
    ...(sortable && {
      icon: {
        marginLeft: spacingStaticXSmall,
        opacity: active ? 1 : 0,
        transform: `rotate3d(0,0,1,${isDirectionAsc(direction) ? 0 : 180}deg)`,
        transformOrigin: '50% 50%', // for iOS
      },
    }),
  });
};
