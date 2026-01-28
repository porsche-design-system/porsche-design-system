import { fontFamily, fontLineHeight, fontSizeTextSmall, spacingStaticXSmall } from '@porsche-design-system/emotion';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getDisabledBaseStyles,
  getFocusBaseStyles,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { getCheckboxBaseStyles } from '../../styles/checkbox/checkbox-base-styles';
import { getCheckboxCheckedBaseStyles } from '../../styles/checkbox/checkbox-checked-base-styles';
import { getCheckboxIndeterminateBaseStyles } from '../../styles/checkbox/checkbox-indeterminate-base-styles';
import { getThemedFormStateColors } from '../../styles/form-state-color-styles';
import type { BreakpointCustomizable } from '../../types';
import { getCss, isDisabledOrLoading } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import {
  getFunctionalComponentLabelAfterStyles,
  getFunctionalComponentLabelStyles,
} from '../common/label/label-styles';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import { cssVarCheckboxBorderColor, cssVarInternalCheckboxScaling } from '../../styles/checkbox/checkbox-css-vars';

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
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
  const { formStateBorderHoverColor } = getThemedFormStateColors(state);
  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);

  const checkboxDimension = `calc(var(${cssVarInternalCheckboxScaling}) * 1.75rem)`;
  const labelPaddingTop = `max(0px, calc((${checkboxDimension} - ${fontLineHeight}) / 2))`;
  const labelPaddingInlineStart = `calc(11.2px * (var(${cssVarInternalCheckboxScaling}) - 0.64285714) + 4px)`;

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
          ...(isDisabled && getDisabledBaseStyles()),
        }),
        [`${cssVarInternalCheckboxScaling}`]: isCompact ? 0.64285714 : 1,
      },
      ...getFunctionalComponentLabelAfterStyles(disabledOrLoading),
      ...preventFoucOfNestedElementsStyles,
      input: {
        ...getCheckboxBaseStyles(isDisabled, isLoading, isCompact, state),
        '&:checked': getCheckboxCheckedBaseStyles(isLoading),
        '&:indeterminate': getCheckboxIndeterminateBaseStyles(isLoading),
        '&:focus-visible': getFocusBaseStyles(),
        ...(!disabledOrLoading &&
          hoverMediaQuery({
            // is label-wrapper:hover needed? Or is this browser behaviour because of the "for" attribute?
            '&:hover,.label-wrapper:hover~.wrapper>&': {
              borderColor: `var(${cssVarCheckboxBorderColor}, ${formStateBorderHoverColor})`,
            },
          })),
      },
    },
    root: {
      display: 'grid',
      rowGap: spacingStaticXSmall,
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
      minHeight: fontLineHeight, // necessary for compact mode
      cursor: disabledOrLoading ? 'not-allowed' : 'pointer',
    },
    ...(isLoading && {
      spinner: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: checkboxDimension,
        height: checkboxDimension,
        font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
      },
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(
      isDisabled || isLoading,
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
