import { type BreakpointCustomizable, type Theme } from '../../../types';
import { getCss } from '../../../utils';
import { addImportantToEachRule, colorSchemeStyles, getTransition, hostHiddenStyles } from '../../../styles';
import {
  formButtonOrIconPadding,
  formElementLayeredSafeZone,
  formElementPaddingHorizontal,
  formElementPaddingVertical,
  getCalculatedFormElementPaddingHorizontal,
  getSlottedTextFieldTextareaSelectStyles,
} from '../../../styles/form-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';
import { type FormState } from '../../../utils/form/form-state';
import { borderWidthBase, spacingStaticXSmall } from '@porsche-design-system/styles';
import { getFunctionalComponentLabelStyles } from '../../common/label/label-styles';

export const getComponentCss = (
  isDisabled: boolean,
  hasCustomDropdown: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  theme: Theme
): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      // ::slotted(select)
      ...addImportantToEachRule(
        getSlottedTextFieldTextareaSelectStyles('select', state, false, theme, {
          gridArea: '1/1/1/-1',
          position: 'static',
          zIndex: 0, // TODO: overrides global style.css in e2e and vrts
          cursor: 'pointer',
          // TODO: move into getSlottedTextFieldTextareaSelectStyles()
          padding: `${formElementPaddingVertical} ${formElementPaddingHorizontal}`,
          paddingInlineEnd: getCalculatedFormElementPaddingHorizontal(1),
          // TODO: needs to be aligned with multi-select
          ...(hasCustomDropdown && !isDisabled && { borderColor: 'transparent' }),
        })
      ),
    },
    root: {
      display: 'grid',
      gap: spacingStaticXSmall,
      // min width is needed for showing at least 1 character in very narrow containers
      minWidth: `calc(${formElementPaddingHorizontal} + ${borderWidthBase} * 2 + ${getCalculatedFormElementPaddingHorizontal(1)} + 1rem)`,
    },
    wrapper: {
      display: 'grid',
      gridTemplateColumns: `minmax(0, 1fr) auto ${formElementLayeredSafeZone}`,
    },
    // TODO: extract for multi-select, select-wrapper and text-field (not gridArea and placeSelf)
    icon: {
      gridArea: '1/2',
      placeSelf: 'center',
      position: 'relative',
      zIndex: 2, // ensures icon is above input or button of select dropdown
      pointerEvents: 'none',
      padding: formButtonOrIconPadding,
      transform: 'rotate3d(0,0,1,0.0001deg)', // needs to be a little more than 0 for correct direction in safari
      transition: getTransition('transform'),
      '&--open': {
        transform: 'rotate3d(0,0,1,180deg)',
      },
    },
    dropdown: {
      gridArea: '1/1/1/-1',
    },
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
