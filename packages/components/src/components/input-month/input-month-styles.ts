import type { BreakpointCustomizable } from '../../types';
import { getCss } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import {
  cssVarButtonPureMargin,
  cssVarButtonPurePadding,
  getFunctionalComponentInputBaseStyles,
} from '../common/input-base/input-base-styles';

// CSS Variables defined in base input
/**
 * @css-variable {"name": "--ref-p-input-slotted-padding", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `padding` in oder to adjust the alignment correctly."}
 */
/**
 * @css-variable {"name": "--ref-p-input-slotted-margin", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `margin` in oder to adjust the spacings correctly."}
 */
// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
export const getComponentCss = (
  disabled: boolean,
  loading: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  compact: boolean,
  readOnly: boolean
): string => {
  return getCss({
    ...getFunctionalComponentInputBaseStyles(disabled, loading, hideLabel, state, compact, readOnly, {
      textOverflow: 'ellipsis',
      MozAppearance: 'textfield',
      '&::-webkit-calendar-picker-indicator': {
        display: 'none',
      },
    }),
    button: {
      padding: `var(${cssVarButtonPurePadding})`,
      margin: `var(${cssVarButtonPureMargin})`,
    },
  });
};
