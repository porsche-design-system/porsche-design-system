import {
  borderWidthBase,
  fontFamily,
  fontLineHeight,
  fontSizeTextSmall,
  spacingStaticSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getDisabledBaseStyles,
  getFocusBaseStyles,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
  SCALING_BASE_VALUE,
} from '../../styles';
import { getCheckboxBaseStyles } from '../../styles/checkbox/checkbox-base-styles';
import { getCheckboxCheckedBaseStyles } from '../../styles/checkbox/checkbox-checked-base-styles';
import { getCheckboxIndeterminateBaseStyles } from '../../styles/checkbox/checkbox-indeterminate-base-styles';
import { getThemedFormStateColors } from '../../styles/form-state-color-styles';
import type { BreakpointCustomizable } from '../../types';
import { buildResponsiveStyles, getCss, isDisabledOrLoading } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import {
  cssVarCheckboxBorderColor,
  cssVarInternalCheckboxScaling,
} from '../../styles/checkbox/checkbox-css-vars';

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
  compact: boolean
): string => {
  const { formStateBorderHoverColor } = getThemedFormStateColors(state);
  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);

  const minimumTouchTargetSize = '24px'; // Minimum touch target size to comply with accessibility guidelines.
  const scalingVar = `var(${cssVarInternalCheckboxScaling}, ${compact ? 0.6668 : 1})`;
  const dimension = `calc(max(${SCALING_BASE_VALUE} * 0.75, ${scalingVar} * ${fontLineHeight}))`;
  const dimensionFull = `calc(${dimension} + ${borderWidthBase} * 2)`; // Calculates the total size of the checkbox including its borders.
  const touchTargetSizeDiff = `calc(${minimumTouchTargetSize} - ${dimensionFull})`; // Difference between the minimum touch target size and the checkbox full size.
  const paddingInlineStart = `calc(${spacingStaticSmall} - (max(0px, ${touchTargetSizeDiff})))`;
  const paddingTop = `calc((${dimensionFull} - ${fontLineHeight}) / 2)`; // Vertically centers the checkbox label relative to the checkbox size.

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
          ...(isDisabled && getDisabledBaseStyles()),
        }),
      },
      'slot[name="start"], slot[name="end"]': {
        display: 'inline-block',
        verticalAlign: 'top',
        cursor: disabledOrLoading ? 'not-allowed' : 'initial',
      },
      ...preventFoucOfNestedElementsStyles,
      input: {
        ...getCheckboxBaseStyles(isDisabled, isLoading, state, compact),
        '&:checked': getCheckboxCheckedBaseStyles(isLoading),
        '&:indeterminate': getCheckboxIndeterminateBaseStyles(isLoading),
        '&:focus-visible': getFocusBaseStyles(),
        ...(!disabledOrLoading &&
          hoverMediaQuery({
            '&:hover,label:hover~.wrapper>&': {
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
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'flex-start',
      minHeight: fontLineHeight, // necessary for compact mode
      cursor: disabledOrLoading ? 'not-allowed' : 'pointer',
    },
    'input-wrapper': {
      position: 'relative',
    },
    ...(isLoading && {
      spinner: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: dimension,
        height: dimension,
        font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
      },
    }),
    'label-wrapper': {
      ...buildResponsiveStyles(hideLabel, (hideLabelValue: boolean) => ({
        paddingTop: hideLabelValue ? 0 : paddingTop,
        paddingInlineStart: hideLabelValue ? 0 : paddingInlineStart,
      })),
    },
    // .label / .required
    ...getFunctionalComponentLabelStyles(
      isDisabled || isLoading,
      hideLabel,
      {
        display: 'inline',
      }
    ),
    // .message
    ...getFunctionalComponentStateMessageStyles(state),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
  });
};
