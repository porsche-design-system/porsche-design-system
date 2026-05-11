import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  textSmallStyle,
  textXSmallStyle,
} from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  getFocusJssStyle,
  getHighContrastColors,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import type { Theme } from '../../../types';
import { getCss, isHighContrastMode } from '../../../utils';
import { formElementPaddingVertical } from '../../../styles/form-styles';
import type { SegmentedControlState } from '../segmented-control/segmented-control-utils';

export const cssVarInternalSegmentedControlScaling = '--p-internal-segmented-control-scaling';
export const getScalingVar = (compact: boolean) =>
  `var(${cssVarInternalSegmentedControlScaling}, ${compact ? 0.5 : 1})`;

export const ICON_OFFSET = '4px';

export const { font: BUTTON_FONT } = textSmallStyle;
export const { font: LABEL_FONT } = textXSmallStyle;
export const ICON_SIZE = '1.5rem';
export const ICON_MARGIN = '.25rem';

export const getColors = (
  isDisabled: boolean,
  isSelected: boolean,
  state: SegmentedControlState,
  theme: Theme
): {
  buttonColor: string;
  labelColor: string;
  borderColor: string;
  hoverBorderColor: string;
} => {
  const { primaryColor, contrastMediumColor, disabledColor, contrastLowColor } = getThemedColors(theme);
  const { highlightColor } = getHighContrastColors();

  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);

  return {
    buttonColor: isDisabled ? disabledColor : primaryColor,
    labelColor: isDisabled ? disabledColor : contrastMediumColor,
    borderColor: isSelected
      ? isDisabled
        ? disabledColor
        : isHighContrastMode
          ? highlightColor
          : state === 'success'
            ? formStateColor
            : primaryColor
      : state === 'error'
        ? formStateColor
        : contrastLowColor,
    hoverBorderColor: state === 'error' ? formStateHoverColor : primaryColor,
  };
};

export const getScalableItemStyles = (
  hasIconAndSlottedContent: boolean,
  compact: boolean
): { padding: string; dimension: string } => {
  const scalingVar = getScalingVar(compact);

  const verticalPadding = `max(2px, ${formElementPaddingVertical} * ${scalingVar})`;
  const horizontalPadding = `calc(${verticalPadding} + ${ICON_OFFSET})`;

  const padding = hasIconAndSlottedContent
    ? `${verticalPadding} ${horizontalPadding} ${verticalPadding} ${verticalPadding}`
    : `${verticalPadding} ${horizontalPadding}`;

  const dimension = `calc(max(${fontLineHeight}, ${scalingVar} * (${fontLineHeight} + 10px)) + (${verticalPadding} + ${borderWidthBase}) * 2)`;

  return { padding, dimension };
};

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
export const getComponentCss = (
  compact: boolean,
  isDisabled: boolean,
  isSelected: boolean,
  state: SegmentedControlState,
  hasIcon: boolean,
  hasSlottedContent: boolean,
  theme: Theme
): string => {
  const { buttonColor, labelColor, borderColor, hoverBorderColor } = getColors(isDisabled, isSelected, state, theme);
  const {
    buttonColor: buttonColorDark,
    labelColor: labelColorDark,
    borderColor: borderColorDark,
    hoverBorderColor: hoverBorderColorDark,
  } = getColors(isDisabled, isSelected, state, 'dark');
  const { dimension, padding } = getScalableItemStyles(hasIcon && hasSlottedContent, compact);

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          outline: 0,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      // All width relevant styling has to be kept in sync with the tempDiv of the p-segmented-control utils
      button: {
        position: 'relative',
        display: 'block',
        height: '100%',
        width: '100%',
        minHeight: dimension,
        minWidth: dimension,
        padding: padding,
        margin: 0, // Removes default button margin on safari 15
        border: `${borderWidthBase} solid ${borderColor}`,
        borderRadius: borderRadiusSmall,
        background: 'transparent',
        color: buttonColor,
        ...textSmallStyle,
        ...(isDisabled
          ? {
              cursor: 'not-allowed',
            }
          : {
              cursor: 'pointer',
              ...(!isSelected &&
                hoverMediaQuery({
                  transition: getTransition('border-color'),
                  '&:hover': {
                    borderColor: hoverBorderColor,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                      borderColor: hoverBorderColorDark,
                    }),
                  },
                })),
            }),
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: borderColorDark,
          color: buttonColorDark,
        }),
        ...getFocusJssStyle(theme),
      },
      // label
      span: {
        display: 'block',
        ...textXSmallStyle,
        overflowWrap: 'normal',
        color: labelColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: labelColorDark,
        }),
      },
    },
    ...(hasIcon && {
      icon: {
        height: ICON_SIZE,
        width: ICON_SIZE,
        ...(hasSlottedContent && {
          marginInlineEnd: ICON_MARGIN,
        }),
      },
    }),
  });
};
