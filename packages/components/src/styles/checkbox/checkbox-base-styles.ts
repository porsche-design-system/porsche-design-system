import type { JssStyle } from '../../utils/css-serializer';
import { fontPorscheNext, leadingNormal, radiusLg, radiusMd, ref, typescaleSm } from '@porsche-design-system/stylesheets';
import { isDisabledOrLoading } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getTransition } from '../common-styles';
import { getThemedFormStateColors } from '../form-state-color-styles';
import { forcedColorsMediaQuery } from '../media-query/forced-colors-media-query';
import { hoverMediaQuery } from '../media-query/hover-media-query';
import {
  cssVarCheckboxBackgroundColor,
  cssVarCheckboxBorderColor,
  cssVarInternalCheckboxScaling,
} from './checkbox-css-vars';

export const getCheckboxBaseStyles = (
  isDisabled: boolean,
  isLoading: boolean,
  isCompact: boolean,
  state: FormState
): JssStyle => {
  const { formStateBackgroundColor, formStateBorderColor, formStateBorderHoverColor } = getThemedFormStateColors(state);

  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);

  const checkboxBorderWidth = '1px';
  const checkboxDimension = `calc(${ref(cssVarInternalCheckboxScaling)} * 1.75rem)`;
  const checkboxMarginBlock = `max(0px, calc((${ref(leadingNormal)} - ${checkboxDimension}) / 2))`;
  const checkboxTouchInset = `calc(-${checkboxBorderWidth} - max(0px, calc(24px - ${checkboxDimension}) / 2))`;

  return {
    all: 'unset',
    display: 'grid', // ensures the pseudo-element can be positioned correctly
    width: checkboxDimension,
    height: checkboxDimension,
    marginBlock: checkboxMarginBlock,
    boxSizing: 'border-box',
    font: `${ref(typescaleSm)} ${ref(fontPorscheNext)}`, // needed for correct width and height definition based on ex-unit
    background: ref(cssVarCheckboxBackgroundColor, formStateBackgroundColor),
    transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
    border: `${checkboxBorderWidth} solid ${ref(cssVarCheckboxBorderColor, formStateBorderColor)}`,
    ...(disabledOrLoading &&
      forcedColorsMediaQuery({
        borderColor: 'GrayText',
      })),
    borderRadius: isCompact ? ref(radiusMd) : ref(radiusLg),
    ...(disabledOrLoading && {
      pointerEvents: 'none', // to prevent form element becomes clickable/toggleable
    }),
    ...hoverMediaQuery({
      '&:hover': {
        borderColor: ref(cssVarCheckboxBorderColor, formStateBorderHoverColor),
      },
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
