import { borderWidthThin, fontFamily, fontLineHeight, fontSizeTextSmall } from '@porsche-design-system/emotion';
import type { JssStyle } from 'jss';
import { isDisabledOrLoading } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getTransition } from '../common-styles';
import { legacyRadiusSmall, radiusLg, radiusMd } from '../css-variables';
import { getThemedFormStateColors } from '../form-state-color-styles';

export const cssVarInternalCheckboxScaling = '--p-internal-checkbox-scaling';

export const getCheckboxBaseStyles = (
  isDisabled: boolean,
  isLoading: boolean,
  isCompact: boolean,
  state: FormState
): JssStyle => {
  const { formStateBackgroundColor, formStateBorderColor } = getThemedFormStateColors(state);

  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);

  const checkboxBorderWidth = borderWidthThin;
  const checkboxDimension = `calc(var(${cssVarInternalCheckboxScaling}) * 1.75rem)`;
  const checkboxMarginBlock = `max(0px, calc((${fontLineHeight} - ${checkboxDimension}) / 2))`;
  const checkboxTouchInset = `calc(-${checkboxBorderWidth} - max(0px, calc(24px - ${checkboxDimension}) / 2))`;

  return {
    all: 'unset',
    display: 'grid', // ensures the pseudo-element can be positioned correctly
    width: checkboxDimension,
    height: checkboxDimension,
    marginBlock: checkboxMarginBlock,
    boxSizing: 'border-box',
    font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
    background: formStateBackgroundColor,
    transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
    border: `${checkboxBorderWidth} solid ${formStateBorderColor}`,
    borderRadius: `var(${legacyRadiusSmall}, ${isCompact ? radiusMd : radiusLg})`,
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
      margin: checkboxTouchInset,
      gridArea: '1/1',
    },
  };
};
