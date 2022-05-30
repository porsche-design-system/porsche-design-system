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
        padding: `${pxToRemWithUnit(11)} ${pxToRemWithUnit(40)}`,
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
      height: pxToRemWithUnit(24),
      width: pxToRemWithUnit(24),
      marginRight: pxToRemWithUnit(4),
    },
  });
};
