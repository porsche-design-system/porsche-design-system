import type { BreakpointCustomizable, Theme } from '../../types';
import type { FormState } from '../../utils/form/form-state';
import { getCss, isDisabledOrLoading } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
  SCALING_BASE_VALUE,
} from '../../styles';
import {
  borderWidthBase,
  fontFamily,
  fontLineHeight,
  fontSizeTextSmall,
  spacingStaticSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';
import { getCheckboxStyles, cssVarInternalCheckboxScaling } from '../../styles/checkbox/checkbox-styles';

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  isLoading: boolean,
  compact: boolean,
  theme: Theme
): string => {
  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);
  const minimumTouchTargetSize = '24px'; // Minimum touch target size to comply with accessibility guidelines.
  const scalingVar = `var(${cssVarInternalCheckboxScaling}, ${compact ? 0.6668 : 1})`;
  const dimension = `calc(max(${SCALING_BASE_VALUE} * 0.75, ${scalingVar} * ${fontLineHeight}))`;
  const dimensionFull = `calc(${dimension} + ${borderWidthBase} * 2)`; // Calculates the total size of the checkbox including its borders.
  const touchTargetSizeDiff = `calc(${minimumTouchTargetSize} - ${dimensionFull})`; // Difference between the minimum touch target size and the checkbox full size.
  const paddingInlineStart = `calc(${spacingStaticSmall} - (max(0px, ${touchTargetSizeDiff})))`;
  const paddingTop = `calc((${dimensionFull} - ${fontLineHeight}) / 2)`; // Vertically centers the checkbox label relative to the checkbox size.
  const height = `calc(max(${fontLineHeight}, ${dimensionFull}))`; // Ensures the wrapper height matches either the font's line height or the full size of the checkbox, whichever is larger.

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
    },
    root: {
      display: 'grid',
      gridTemplateColumns: 'auto minmax(0, 1fr)',
      rowGap: spacingStaticXSmall,
      ...(disabledOrLoading && {
        cursor: 'not-allowed',
      }),
    },
    wrapper: {
      ...textSmallStyle,
      minWidth: minimumTouchTargetSize,
      minHeight: minimumTouchTargetSize,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'grid',
      gridArea: '1/1',
      alignSelf: 'flex-start', // in case label becomes multiline
      height,
    },
    ...(isLoading && {
      spinner: {
        position: 'relative', // ensure correct stacking, can be removed as soon as focus for input is handled with outline
        gridArea: '1/1',
        placeSelf: 'center',
        width: dimension,
        height: dimension,
        font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
        pointerEvents: 'none',
      },
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(
      isDisabled || isLoading,
      hideLabel,
      theme,
      {
        gridArea: '1/2',
        ...(isLoading && { pointerEvents: 'none' }), // prevent default htmlFor behavior. TODO: Remove as soon as label component for custom form components exists.
      },
      {
        paddingTop,
        paddingInlineStart,
      }
    ),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state, {
      gridColumn: '1/3',
    }),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
    // .checkbox
    ...getCheckboxStyles(theme, isDisabled, isLoading, state, compact),
  });
};
