import { getCss } from '../../../utils';
import {
  addImportantToRule,
  getFocusJssStyle,
  getHoverJssStyle,
  getThemedColors,
  pxToRemWithUnit,
} from '../../../styles';
import { fontWeight, textSmall } from '@porsche-design-system/utilities-v2';
import type { Theme } from '../../../types';
import type { SegmentedControlBackgroundColor } from '../segmented-control/segmented-control-utils';

export const getComponentCss = (
  isSelected: boolean,
  isDisabled: boolean,
  bgColor: SegmentedControlBackgroundColor,
  theme: Theme
): string => {
  const { disabledColor, baseColor, backgroundColor, backgroundSurfaceColor } = getThemedColors(theme);

  return getCss({
    '@global': {
      ':host': {
        display: addImportantToRule('block'),
      },
      button: {
        display: 'block',
        minHeight: pxToRemWithUnit(48),
        height: '100%',
        width: '100%',
        padding: `0 ${pxToRemWithUnit(40)}`,
        margin: 0,
        background: bgColor === 'background-surface' ? backgroundColor : backgroundSurfaceColor,
        ...textSmall,
        ...(isSelected
          ? {
              fontWeight: fontWeight.semiBold,
              border: `1px solid ${baseColor}`,
            }
          : {
              border: 0,
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
    },
    icon: {},
  });
};
