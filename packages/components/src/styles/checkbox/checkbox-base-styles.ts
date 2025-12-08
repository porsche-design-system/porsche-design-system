import {
  borderRadiusSmall,
  borderWidthBase,
  borderWidthThin,
  fontFamily,
  fontLineHeight,
  fontSizeTextSmall,
} from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';
import { isDisabledOrLoading } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getTransition, SCALING_BASE_VALUE } from '../common-styles';
import { getThemedFormStateColors } from '../form-state-color-styles';

export const cssVarInternalCheckboxScaling = '--p-internal-checkbox-scaling';

export const getCheckboxBaseStyles = (
  isDisabled: boolean,
  isLoading: boolean,
  state: FormState,
  compact?: boolean
): JssStyle => {
  const { formStateBackgroundColor, formStateBorderColor } = getThemedFormStateColors(state);

  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);

  const minimumTouchTargetSize = '24px'; // Minimum touch target size to comply with accessibility guidelines.
  const scalingVar = `var(${cssVarInternalCheckboxScaling}, ${compact ? 0.6668 : 1})`;
  // Determines the scaling factor for the checkbox size. In "compact" mode, it uses 0.6668 to achieve a 20px checkbox (compact size).
  // Defaults to 1 for the standard size and can be overridden by the CSS variable `cssVarInternalCheckboxScaling`.

  const dimension = `calc(max(${SCALING_BASE_VALUE} * 0.75, ${scalingVar} * ${fontLineHeight}))`;
  // Calculates the checkbox size and ensures a minimum size of 12px (0.75 * SCALING_BASE_VALUE).
  // Scales proportionally with the line height and the scaling factor.

  const dimensionFull = `calc(${dimension} + ${borderWidthBase} * 2)`; // Calculates the total size of the checkbox including its borders.
  const touchTargetSizeDiff = `calc(${minimumTouchTargetSize} - ${dimensionFull})`; // Difference between the minimum touch target size and the checkbox full size.
  const margin = `calc(-${borderWidthBase} - max(0px, ${touchTargetSizeDiff} / 2))`; // Positions the checkbox ::before pseudo-element with a negative offset to align it with the touch target.

  return {
    all: 'unset',
    display: 'grid', // ensures the pseudo-element can be positioned correctly
    width: dimension,
    height: dimension,
    font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
    background: formStateBackgroundColor,
    transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
    border: `${borderWidthThin} solid ${formStateBorderColor}`,
    borderRadius: borderRadiusSmall,
    ...(disabledOrLoading && {
      pointerEvents: 'none', // to prevent form element becomes clickable/toggleable
    }),
    '&::before': {
      // This pseudo-element is used to render the checkmark or indeterminate icon when the checkbox is checked or indeterminate.
      content: '""',
      gridArea: '1/1',
    },
    '&::after': {
      // Ensures the touch target is at least 24px, even if the checkbox is smaller than the minimum touch target size.
      // This pseudo-element expands the clickable area without affecting the visual size of the checkbox itself.
      content: '""',
      margin,
      gridArea: '1/1',
    },
  };
};
