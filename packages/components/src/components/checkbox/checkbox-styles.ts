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
import { cssVarInternalCheckboxScaling, getCheckboxBaseStyles } from '../../styles/checkbox/checkbox-base-styles';
import { getCheckboxCheckedBaseStyles } from '../../styles/checkbox/checkbox-checked-base-styles';
import { getCheckboxIndeterminateBaseStyles } from '../../styles/checkbox/checkbox-indeterminate-base-styles';
import { getThemedFormStateColors } from '../../styles/form-state-color-styles';
import type { BreakpointCustomizable } from '../../types';
import { getCss, isDisabledOrLoading } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
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
      ...preventFoucOfNestedElementsStyles,
      input: {
        ...getCheckboxBaseStyles(isDisabled, isLoading, state, compact),
        '&:checked': getCheckboxCheckedBaseStyles(isLoading),
        '&:indeterminate': getCheckboxIndeterminateBaseStyles(isLoading),
        '&:focus-visible': getFocusBaseStyles(),
        ...(!disabledOrLoading &&
          hoverMediaQuery({
            '&:hover,label:hover~.wrapper>&': {
              borderColor: formStateBorderHoverColor,
            },
          })),
      },
    },
    root: {
      display: 'grid',
      gridTemplateColumns: 'auto minmax(0, 1fr)',
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
    // .label / .required
    ...getFunctionalComponentLabelStyles(
      isDisabled || isLoading,
      hideLabel,
      {
        gridArea: '1/2',
      },
      {
        paddingTop,
        paddingInlineStart,
      }
    ),
    // .message
    ...getFunctionalComponentStateMessageStyles(state, {
      gridColumn: '1/-1',
    }),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
  });
};
