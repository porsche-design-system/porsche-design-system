import { textSmallStyle, textXSmallStyle } from '@porsche-design-system/emotion';
import {
  addImportantToEachRule,
  forcedColorsMediaQuery,
  getDisabledBaseStyles,
  getFocusBaseStyles,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import {
  colorContrastMedium,
  colorFrostedStrong,
  colorPrimary,
  leadingNormal,
  radiusLg,
  radiusXl,
  ref,
} from '@porsche-design-system/stylesheets';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import { formElementPaddingVertical } from '../../../styles/form-styles';
import { getCss } from '../../../utils';
import type { SegmentedControlState } from '../segmented-control/segmented-control-utils';

export const cssVarInternalSegmentedControlScaling = '--_p-segmented-control-a';
export const getScalingVar = (compact: boolean) => ref(cssVarInternalSegmentedControlScaling, compact ? 0.5 : 1);

export const ICON_OFFSET = '4px';

export const { font: BUTTON_FONT } = textSmallStyle;
export const { font: LABEL_FONT } = textXSmallStyle;
export const ICON_SIZE = '1.5rem';
export const ICON_MARGIN = '.25rem';

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

  const dimension = `calc(max(${ref(leadingNormal)}, ${scalingVar} * (${ref(leadingNormal)} + 10px)) + (${verticalPadding} + 1px) * 2)`;

  return { padding, dimension };
};

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
        border: `1px solid ${isSelected ? formStateBorderHoverColor : formStateBorderColor}`,
        borderRadius: isCompact ? ref(radiusLg) : ref(radiusXl),
        background: isSelected ? ref(colorFrostedStrong) : formStateBackgroundColor,
        color: ref(colorPrimary),
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
                  transition: getTransition('background-color'),
                  '&:hover': {
                    backgroundColor: ref(colorFrostedStrong),
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
        color: ref(colorContrastMedium),
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
