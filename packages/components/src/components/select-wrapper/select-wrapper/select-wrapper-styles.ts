import { borderWidthBase, spacingStaticXSmall } from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getTransition,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import {
  formButtonOrIconPadding,
  formElementLayeredSafeZone,
  formElementPaddingHorizontal,
  formElementPaddingVertical,
  getCalculatedFormElementPaddingHorizontal,
  getSlottedTextFieldTextareaSelectStyles,
} from '../../../styles/form-styles';
import type { BreakpointCustomizable, Theme } from '../../../types';
import { getCss } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../../common/label/label-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
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
      ...preventFoucOfNestedElementsStyles,
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
      // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character plus the ellipsis dots.
      minWidth: `calc(1rem + ${formElementPaddingHorizontal} + ${borderWidthBase} * 2 + ${getCalculatedFormElementPaddingHorizontal(1)})`,
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
