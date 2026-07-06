import { leadingNormal, ref, spacingStaticXs } from '@porsche-design-system/stylesheets';
import {
  addImportantToEachRule,
  getDisabledBaseStyles,
  getFocusBaseStyles,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { getCheckboxBaseStyles } from '../../styles/checkbox/checkbox-base-styles';
import { getCheckboxCheckedBaseStyles } from '../../styles/checkbox/checkbox-checked-base-styles';
import { cssVarInternalCheckboxScaling } from '../../styles/checkbox/checkbox-css-vars';
import { getCheckboxIndeterminateBaseStyles } from '../../styles/checkbox/checkbox-indeterminate-base-styles';
import type { BreakpointCustomizable } from '../../types';
import { getCss, isDisabledOrLoading } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import {
  getFunctionalComponentLabelAfterStyles,
  getFunctionalComponentLabelStyles,
} from '../common/label/label-styles';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';

// CSS Variables defined in checkbox-css-vars.ts
/**
 * @css-variable {"name": "--p-checkbox-border-color", "description": "🧪Experimental: Border colors of Checkbox. Should be used to override the default border color in different states (e.g., hover, focus, error), e.g. when the Checkbox is wrapped inside a custom label."}
 * @css-variable {"name": "--p-checkbox-background-color", "description": "🧪Experimental: Background color of Checkbox."}
 * @css-variable {"name": "--p-checkbox-icon-color", "description": "🧪Experimental: Checkmark icon color of Checkbox."}
 */
export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  isLoading: boolean,
  isCompact: boolean
): string => {
  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);

  const checkboxDimension = `calc(${ref(cssVarInternalCheckboxScaling)} * 1.75rem)`;
  const labelPaddingTop = `max(0px, calc((${checkboxDimension} - ${ref(leadingNormal)}) / 2))`;
  const labelPaddingInlineStart = `calc(11.2px * (${ref(cssVarInternalCheckboxScaling)} - 0.64285714) + 4px)`;

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
        [`${cssVarInternalCheckboxScaling}`]: isCompact ? 0.64285714 : 1,
      },
      ...getFunctionalComponentLabelAfterStyles(),
      ...preventFoucOfNestedElementsStyles,
      input: {
        ...getCheckboxBaseStyles(isDisabled, isLoading, isCompact, state),
        // `:indeterminate` must precede `:checked`: both target `::before` at equal specificity, so
        // for a checked+indeterminate checkbox the later rule wins. Ordering `:checked` last keeps
        // the checkmark visible (matching the pre-emotion baseline) instead of a black-on-black dash.
        '&:indeterminate': getCheckboxIndeterminateBaseStyles(isLoading, state),
        '&:checked': getCheckboxCheckedBaseStyles(isLoading, state),
        '&:focus-visible': getFocusBaseStyles(),
      },
    },
    root: {
      display: 'grid',
      rowGap: ref(spacingStaticXs),
    },
    wrapper: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: 'auto minmax(0, 1fr)',
    },
    'input-wrapper': {
      position: 'relative',
      alignItems: 'center',
      display: 'grid',
      alignSelf: 'flex-start',
      minHeight: ref(leadingNormal), // necessary for compact mode
      cursor: disabledOrLoading ? 'not-allowed' : 'pointer',
      ...(isDisabled && getDisabledBaseStyles()),
    },
    ...(isLoading && {
      spinner: {
        '--p-spinner-size': `calc(${checkboxDimension} - 2px)`, // compensates the 1px border of the checkbox
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      },
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(
      isDisabled,
      isLoading,
      hideLabel,
      {
        cursor: disabledOrLoading ? 'not-allowed' : 'pointer',
      },
      null,
      {
        paddingTop: labelPaddingTop,
        paddingInlineStart: labelPaddingInlineStart,
      }
    ),
    // .message
    ...getFunctionalComponentStateMessageStyles(state),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
  });
};
