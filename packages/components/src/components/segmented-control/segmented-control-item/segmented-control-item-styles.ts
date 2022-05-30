import { getCss } from '../../../utils';
import {
  addImportantToEachRule,
  getFocusJssStyle,
  getHoverJssStyle,
  getThemedColors,
  pxToRemWithUnit,
} from '../../../styles';
import { fontWeight, textSmall, textXSmall } from '@porsche-design-system/utilities-v2';
import type { Theme } from '../../../types';
import type { SegmentedControlBackgroundColor } from '../segmented-control/segmented-control-utils';

export const ITEM_PADDING = pxToRemWithUnit(40);
export const { font: ITEM_FONT } = textSmall;
export const ICON_SIZE = pxToRemWithUnit(24);
export const ICON_MARGIN = pxToRemWithUnit(4);

export const getComponentCss = (
  isSelected: boolean,
  isDisabled: boolean,
  bgColor: SegmentedControlBackgroundColor,
  theme: Theme
): string => {
  const { disabledColor, baseColor, backgroundColor, backgroundSurfaceColor, contrastMediumColor } =
    getThemedColors(theme);

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        outline: 0,
      }),
      button: {
        display: 'block',
        // minHeight: pxToRemWithUnit(48),
        height: '100%',
        width: '100%',
        padding: `${pxToRemWithUnit(11)} ${ITEM_PADDING}`,
        margin: 0,
        background: bgColor === 'background-surface' ? backgroundColor : backgroundSurfaceColor,
        border: '1px solid transparent',
        ...textSmall,
        ...(isSelected && {
          fontWeight: fontWeight.semiBold,
          borderColor: baseColor,
        }),
        ...(isDisabled
          ? {
              color: disabledColor,
              cursor: 'not-allowed',
              outline: 0,
            }
          : {
              color: baseColor,
              cursor: 'pointer',
              ...getHoverJssStyle(),
              ...getFocusJssStyle(),
            }),
      },
      // label
      span: {
        display: 'block',
        ...textXSmall,
        color: isDisabled ? disabledColor : contrastMediumColor,
      },
    },
    icon: {
      height: ICON_SIZE,
      width: ICON_SIZE,
      marginRight: ICON_MARGIN,
    },
  });
};
