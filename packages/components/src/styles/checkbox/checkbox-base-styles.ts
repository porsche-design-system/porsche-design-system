import {
  borderRadiusSmall,
  borderWidthBase,
  fontFamily,
  fontLineHeight,
  fontSizeTextSmall,
} from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';
import { isDisabledOrLoading, type Theme } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getThemedColors } from '../colors';
import { addImportantToEachRule, getTransition, SCALING_BASE_VALUE } from '../common-styles';
import { getThemedFormStateColors } from '../form-state-color-styles';
import { prefersColorSchemeDarkMediaQuery } from '../prefers-color-scheme-dark-media-query';

export const cssVarInternalCheckboxScaling = '--p-internal-checkbox-scaling';

export const getCheckboxBaseStyles = (
  theme: Theme,
  isDisabled?: boolean,
  isLoading?: boolean,
  state?: FormState,
  compact?: boolean
): JssStyle => {
  const { contrast50Color, contrast40Color } = getThemedColors(theme);
  const { contrast50Color: contrast50ColorDark, contrast40Color: contrast40ColorDark } = getThemedColors('dark');
  const { formStateColor } = getThemedFormStateColors(theme, state);
  const { formStateColor: formStateColorDark } = getThemedFormStateColors('dark', state);
  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);

  // TODO: needs to be extracted into a color function
  const uncheckedColor = disabledOrLoading ? contrast40Color : formStateColor || contrast50Color;
  const uncheckedColorDark = disabledOrLoading ? contrast40ColorDark : formStateColorDark || contrast50ColorDark;

  const background = `transparent 0% 0% / ${fontLineHeight}`;

  const minimumTouchTargetSize = '24px'; // Minimum touch target size to comply with accessibility guidelines.
  const scalingVar = `var(${cssVarInternalCheckboxScaling}, ${compact ? 0.6668 : 1})`;
  // Determines the scaling factor for the checkbox size. In "compact" mode, it uses 0.6668 to achieve a 20px checkbox (compact size).
  // Defaults to 1 for the standard size and can be overridden by the CSS variable `cssVarInternalCheckboxScaling`.

  const dimension = `calc(max(${SCALING_BASE_VALUE} * 0.75, ${scalingVar} * ${fontLineHeight}))`;
  // Calculates the checkbox size and ensures a minimum size of 12px (0.75 * SCALING_BASE_VALUE).
  // Scales proportionally with the line height and the scaling factor.

  const dimensionFull = `calc(${dimension} + ${borderWidthBase} * 2)`; // Calculates the total size of the checkbox including its borders.
  const touchTargetSizeDiff = `calc(${minimumTouchTargetSize} - ${dimensionFull})`; // Difference between the minimum touch target size and the checkbox full size.
  const inset = `calc(-${borderWidthBase} - max(0px, ${touchTargetSizeDiff} / 2))`; // Positions the checkbox ::before pseudo-element with a negative offset to align it with the touch target.

  return {
    position: 'relative',
    '&::before': {
      // Ensures the touch target is at least 24px, even if the checkbox is smaller than the minimum touch target size.
      // This pseudo-element expands the clickable area without affecting the visual size of the checkbox itself.
      content: '""',
      position: 'absolute',
      inset,
    },
    width: dimension,
    height: dimension,
    font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
    display: 'block',
    margin: 0,
    padding: 0,
    WebkitAppearance: 'none', // iOS safari
    appearance: 'none',
    boxSizing: 'content-box',
    background,
    transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
    border: `${borderWidthBase} solid ${uncheckedColor}`,
    outline: 0, // TODO: only relevant for VRT testing with forced states - prevents :focus style (in case getFocusJssStyle() condition is not matching)
    ...(disabledOrLoading
      ? {
          pointerEvents: 'none', // to prevent form element becomes clickable/toggleable
        }
      : {
          cursor: 'pointer',
        }),
    ...prefersColorSchemeDarkMediaQuery(theme, {
      borderColor: uncheckedColorDark,
    }),
    gridArea: '1/1',
    borderRadius: borderRadiusSmall,
    ...addImportantToEachRule({
      backgroundSize: 'cover',
    }),
  };
};
