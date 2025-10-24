import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  frostedGlassStyle,
  textSmallStyle,
} from '@porsche-design-system/styles';
import type { Styles } from 'jss';
import type { BreakpointCustomizable, LinkButtonIconName, LinkButtonVariant, Theme } from '../types';
import { buildResponsiveStyles, hasVisibleIcon, isHighContrastMode } from '../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getFocusJssStyle,
  getHiddenTextJssStyle,
  getHighContrastColors,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
  SCALING_BASE_VALUE,
} from './';

type Colors = {
  textColor: string;
  borderColor: string;
  borderColorHover: string;
  backgroundColor: string;
  backgroundColorHover: string;
};

const getVariantColors = (variant: LinkButtonVariant, theme: Theme): Colors => {
  const { primaryColor, canvasInvertedColor, primaryInvertedColor, contrast80Color, contrast50Color, frostedColor } =
    getThemedColors(theme);
  const { canvasColor } = getHighContrastColors();

  const colors: {
    [v in LinkButtonVariant]: Colors;
  } = {
    primary: {
      textColor: primaryInvertedColor,
      borderColor: canvasInvertedColor,
      borderColorHover: contrast80Color,
      backgroundColor: canvasInvertedColor,
      backgroundColorHover: contrast80Color,
    },
    secondary: {
      textColor: primaryColor,
      borderColor: primaryColor,
      borderColorHover: contrast50Color,
      backgroundColor: isHighContrastMode ? canvasColor : 'transparent',
      backgroundColorHover: frostedColor,
    },
    ghost: {
      textColor: primaryColor,
      borderColor: frostedColor,
      borderColorHover: frostedColor,
      backgroundColor: frostedColor,
      backgroundColorHover: frostedColor,
    },
  };

  return colors[variant];
};

export const getLinkButtonStyles = (
  icon: LinkButtonIconName,
  iconSource: string,
  variant: LinkButtonVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  isDisabledOrLoading: boolean,
  hasSlottedAnchor: boolean,
  compact: BreakpointCustomizable<boolean>,
  cssVariableInternalScaling: string,
  theme: Theme
): Styles => {
  const isPrimary = variant === 'primary';
  const { textColor, borderColor, borderColorHover, backgroundColor, backgroundColorHover } = getVariantColors(
    variant,
    theme
  );
  const {
    textColor: textColorDark,
    borderColor: borderColorDark,
    borderColorHover: borderColorHoverDark,
    backgroundColor: backgroundColorDark,
    backgroundColorHover: backgroundColorHoverDark,
  } = getVariantColors(variant, 'dark');

  const { focusColor } = getThemedColors(theme);
  const hasIcon = hasVisibleIcon(icon, iconSource) || hideLabel;

  const scalingVar = `var(${cssVariableInternalScaling}, var(--p-internal-scaling-factor))`;

  const borderCompensation = variant === 'ghost' ? `+ ${borderWidthBase}` : ''; // Compensate for missing border in ghost variant (Fixes border backdrop-filter blur rendering issue in safari)

  const paddingBlock = `calc(${scalingVar} * 0.8125 * ${SCALING_BASE_VALUE} ${borderCompensation})`; // 0.8125 * SCALING_BASE_VALUE corresponds to 13px
  const paddingInline = `max(calc(${scalingVar} * 1.625 * ${SCALING_BASE_VALUE} ${borderCompensation}), ${variant === 'ghost' ? '6px' : '4px'})`; // 1.625 * SCALING_BASE_VALUE corresponds to 26px
  const gap = `clamp(2px, calc(${scalingVar} * 0.5 * ${SCALING_BASE_VALUE}), 16px)`; // 0.5 * SCALING_BASE_VALUE corresponds to 8px
  const iconMarginInlineStart = `clamp(-16px, calc(${scalingVar} * -0.5 * ${SCALING_BASE_VALUE}), -2px)`; // -0.5 * SCALING_BASE_VALUE corresponds to -8px

  return {
    '@global': {
      ':host': {
        display: 'inline-block',
        ...addImportantToEachRule({
          verticalAlign: 'top',
          outline: 0, // custom element is able to delegate the focus
          borderRadius: borderRadiusSmall,
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
    },
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      width: '100%', // Allows for setting a width on the host
      minWidth: 'min-content', // Do not shrink beyond icon size + padding + border + label
      boxSizing: 'border-box',
      textAlign: 'start',
      WebkitAppearance: 'none', // iOS safari
      appearance: 'none',
      textDecoration: 'none',
      ...textSmallStyle,
      ...(variant === 'ghost'
        ? { ...frostedGlassStyle, border: 'none' } // We can't use a border in the ghost variant due to rendering issues with backdrop-filter in safari
        : { border: `${borderWidthBase} solid ${borderColor}` }),
      borderRadius: borderRadiusSmall,
      transform: 'translate3d(0,0,0)', // creates new stacking context (for slotted anchor + focus)
      backgroundColor,
      color: textColor,
      ...buildResponsiveStyles(compact, (compactValue: boolean) => ({
        '--p-internal-scaling-factor': compactValue ? 'calc(4 / 13)' : 1, // Compact mode needs to have 4px paddingBlock thus this scaling factor
      })),
      transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`,
      ...buildResponsiveStyles(hideLabel, (hideLabelValue: boolean) => ({
        padding: hideLabelValue ? paddingBlock : `${paddingBlock} ${paddingInline}`,
        gap: hideLabelValue ? 0 : gap,
      })),
      ...(!hasSlottedAnchor && getFocusJssStyle(theme)),
      ...(!isDisabledOrLoading &&
        hoverMediaQuery({
          '&:hover': {
            backgroundColor: backgroundColorHover,
            borderColor: isHighContrastMode ? focusColor : borderColorHover,
            ...(!isPrimary && frostedGlassStyle),
            ...prefersColorSchemeDarkMediaQuery(theme, {
              backgroundColor: backgroundColorHoverDark,
              borderColor: borderColorHoverDark,
            }),
          },
        })),
      ...prefersColorSchemeDarkMediaQuery(theme, {
        borderColor: borderColorDark,
        backgroundColor: backgroundColorDark,
        color: textColorDark,
      }),
    },
    label: buildResponsiveStyles(hideLabel, getHiddenTextJssStyle),
    ...(hasIcon && {
      icon: {
        width: fontLineHeight, // ensure space is already reserved until icon component is loaded (ssr)
        height: fontLineHeight, // ensure space is already reserved until icon component is loaded (ssr)
        ...buildResponsiveStyles(hideLabel, (hideLabelValue: boolean) => ({
          marginInlineStart: hideLabelValue ? 0 : iconMarginInlineStart, // compensate white space of svg icon and optimize visual alignment
        })),
      },
    }),
  };
};
