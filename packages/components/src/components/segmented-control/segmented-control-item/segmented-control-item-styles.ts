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
import { formElementPaddingVertical } from '../../../styles/form-styles';
import type { Theme } from '../../../types';
import { getCss, isHighContrastMode } from '../../../utils';

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
  theme: Theme
): {
  buttonColor: string;
  labelColor: string;
  borderColor: string;
  hoverBorderColor: string;
} => {
  const { primaryColor, contrastMediumColor, disabledColor, contrastLowColor } = getThemedColors(theme);
  const { highlightColor } = getHighContrastColors();

  return {
    buttonColor: isDisabled ? disabledColor : primaryColor,
    labelColor: isDisabled ? disabledColor : contrastMediumColor,
    borderColor: isSelected
      ? isDisabled
        ? disabledColor
        : isHighContrastMode
          ? highlightColor
          : primaryColor
      : contrastLowColor,
    hoverBorderColor: primaryColor,
  };
};

export const getScalableItemStyles = (
  hasIconAndSlottedContent: boolean,
  compact: boolean
): { padding: string; dimension: string } => {
  const scalingVar = getScalingVar(compact);

  const verticalPadding = `max(2px, ${formElementPaddingVertical})`;
  const horizontalPadding = `calc(${verticalPadding} + ${ICON_OFFSET})`;

  const padding = hasIconAndSlottedContent
    ? `${verticalPadding} ${horizontalPadding} ${verticalPadding} ${verticalPadding}`
    : `${verticalPadding} ${horizontalPadding}`;

  const dimension = `calc(max(${fontLineHeight}, ${scalingVar} * (${fontLineHeight} + 10px)) + (${verticalPadding} + ${borderWidthBase}) * 2)`;

  return { padding, dimension };
};

export const getComponentCss = (
  compact: boolean,
  isDisabled: boolean,
  isSelected: boolean,
  hasIcon: boolean,
  hasSlottedContent: boolean,
  theme: Theme
): string => {
  const { buttonColor, labelColor, borderColor, hoverBorderColor } = getColors(isDisabled, isSelected, theme);
  const {
    buttonColor: buttonColorDark,
    labelColor: labelColorDark,
    borderColor: borderColorDark,
    hoverBorderColor: hoverBorderColorDark,
  } = getColors(isDisabled, isSelected, 'dark');
  const scalableItemStyles = getScalableItemStyles(hasIcon && hasSlottedContent, compact);

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
        minHeight: scalableItemStyles.dimension,
        minWidth: scalableItemStyles.dimension,
        width: '100%',
        padding: scalableItemStyles.padding,
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
