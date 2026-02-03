import {
  borderWidthBase,
  borderWidthThin,
  fontLineHeight,
  textSmallStyle,
  textXSmallStyle,
} from '@porsche-design-system/emotion';
import {
  addImportantToEachRule,
  colors,
  forcedColorsMediaQuery,
  getDisabledBaseStyles,
  getFocusBaseStyles,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { legacyRadiusSmall, radiusLg, radiusXl } from '../../../styles/css-variables';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import { formElementPaddingVertical } from '../../../styles/form-styles';
import { getCss } from '../../../utils';
import type { SegmentedControlState } from '../segmented-control/segmented-control-utils';

export const cssVarInternalSegmentedControlScaling = '--p-internal-segmented-control-scaling';
export const getScalingVar = (compact: boolean) =>
  `var(${cssVarInternalSegmentedControlScaling}, ${compact ? 0.5 : 1})`;

export const ICON_OFFSET = '4px';

export const { font: BUTTON_FONT } = textSmallStyle;
export const { font: LABEL_FONT } = textXSmallStyle;
export const ICON_SIZE = '1.5rem';
export const ICON_MARGIN = '.25rem';

const { primaryColor, contrastMediumColor } = colors;

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
  isCompact: boolean,
  isDisabled: boolean,
  isSelected: boolean,
  state: SegmentedControlState,
  hasIcon: boolean,
  hasSlottedContent: boolean
): string => {
  const { formStateBackgroundColor, formStateBorderColor, formStateBorderHoverColor } = getThemedFormStateColors(state);

  const { dimension, padding } = getScalableItemStyles(hasIcon && hasSlottedContent, isCompact);

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...(isDisabled && getDisabledBaseStyles()),
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
        border: `${borderWidthThin} solid ${isSelected ? formStateBorderHoverColor : formStateBorderColor}`,
        borderRadius: `var(${legacyRadiusSmall}, ${isCompact ? radiusLg : radiusXl})`,
        background: formStateBackgroundColor,
        color: primaryColor,
        ...textSmallStyle,
        ...(isDisabled
          ? {
              cursor: 'not-allowed',
              ...forcedColorsMediaQuery({
                color: 'GrayText',
                borderColor: 'GrayText',
              }),
            }
          : {
              cursor: 'pointer',
              ...(!isSelected &&
                hoverMediaQuery({
                  transition: getTransition('border-color'),
                  '&:hover': {
                    borderColor: formStateBorderHoverColor,
                  },
                })),
            }),
        '&:focus-visible': getFocusBaseStyles(),
      },
      // label
      span: {
        display: 'block',
        ...textXSmallStyle,
        overflowWrap: 'normal',
        color: contrastMediumColor,
        ...(isDisabled &&
          forcedColorsMediaQuery({
            color: 'GrayText',
          })),
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
