import type { Direction } from '../table/table-utils';
import { getCss } from '../../../utils';
import {
  addImportantToEachRule,
  getTextHiddenJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../../../styles';
import {
  borderRadiusSmall,
  borderWidthBase,
  fontWeight,
  frostedGlassStyle,
  spacingFluidSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { isDirectionAsc, isSortable } from './table-head-cell-utils';
import { getFontSizeText } from '../../../styles/font-size-text-styles';
import { offsetHorizontal, offsetVertical } from '../../../styles/link-button-pure-styles';
import { cssVariableTableHeadCellIconFilter } from '../table/table-styles';

const { hoverColor, focusColor } = getThemedColors('light'); // hover color and focus color are the same for light and dark
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
        padding: `2px ${spacingFluidSmall} ${spacingFluidSmall}`,
        verticalAlign: 'bottom',
        fontWeight: fontWeightSemiBold,
        whiteSpace: multiline ? 'normal' : 'nowrap',
        ...hostHiddenStyles,
      }),
      ...(sortable
        ? {
            button: {
              transform: 'translate3d(0,0,0)', // creates new stacking context
              display: 'flex',
              gap: spacingStaticXSmall,
              width: 'auto',
              margin: 0,
              padding: 0,
              color: 'inherit',
              outline: 0,
              ...textSmallStyle,
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              fontSize: getFontSizeText('small'),
              appearance: 'none',
              background: 'transparent',
              textAlign: 'left',
              border: 0,
              cursor: 'pointer',
              '&::before': {
                content: '""',
                position: 'absolute', // mobile Safari -> prevent lagging active state
                top: offsetVertical,
                bottom: offsetVertical,
                right: offsetHorizontal,
                left: offsetHorizontal,
                borderRadius: borderRadiusSmall,
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
              '&:focus::before': {
                border: `${borderWidthBase} solid ${focusColor}`,
              },
              '&:not(:focus-visible)::before': {
                border: 0,
              },
            },
            '.label': {
              position: 'relative', // needed for hover state
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
        filter: `var(${cssVariableTableHeadCellIconFilter})`,
      },
    }),
  });
};
