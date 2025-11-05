import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  textSmallStyle,
  textXSmallStyle,
} from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colors,
  getFocusJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { formElementPaddingVertical } from '../../../styles/form-styles';
import { getCss } from '../../../utils';

export const cssVarInternalSegmentedControlScaling = '--p-internal-segmented-control-scaling';
export const getScalingVar = (compact: boolean) =>
  `var(${cssVarInternalSegmentedControlScaling}, ${compact ? 0.5 : 1})`;

export const ICON_OFFSET = '4px';

export const { font: BUTTON_FONT } = textSmallStyle;
export const { font: LABEL_FONT } = textXSmallStyle;
export const ICON_SIZE = '1.5rem';
export const ICON_MARGIN = '.25rem';

const { primaryColor, contrastMediumColor, contrastDisabledColor, contrastLowColor } = colors;

export const getColors = (
  isDisabled: boolean,
  isSelected: boolean
): {
  buttonColor: string;
  labelColor: string;
  borderColor: string;
  hoverBorderColor: string;
} => {
  return {
    buttonColor: isDisabled ? contrastDisabledColor : primaryColor,
    labelColor: isDisabled ? contrastDisabledColor : contrastMediumColor,
    borderColor: isSelected ? (isDisabled ? contrastDisabledColor : primaryColor) : contrastLowColor,
    hoverBorderColor: primaryColor,
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

export const getComponentCss = (
  compact: boolean,
  isDisabled: boolean,
  isSelected: boolean,
  hasIcon: boolean,
  hasSlottedContent: boolean
): string => {
  const { buttonColor, labelColor, borderColor, hoverBorderColor } = getColors(isDisabled, isSelected);
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
                  },
                })),
            }),
        ...getFocusJssStyle(),
      },
      // label
      span: {
        display: 'block',
        ...textXSmallStyle,
        overflowWrap: 'normal',
        color: labelColor,
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
