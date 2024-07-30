import type { Styles } from 'jss';
import { buildResponsiveStyles, darken, hasVisibleIcon, isHighContrastMode, lighten } from '../utils';
import type { BreakpointCustomizable, LinkButtonIconName, LinkButtonVariant, Theme } from '../types';
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
} from './';
import {
  borderRadiusSmall,
  borderWidth,
  fontLineHeight,
  frostedGlassStyle,
  spacingStaticSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';

const { primaryColor: darkThemePrimaryColor } = getThemedColors('dark');
const { primaryColor: lightThemePrimaryColor } = getThemedColors('light');

type Colors = {
  textColor: string;
  borderColor: string;
  borderColorHover: string;
  backgroundColor: string;
  backgroundColorHover: string;
};

const getVariantColors = (variant: LinkButtonVariant, theme: Theme): Colors => {
  const { primaryColor, contrastHighColor, contrastMediumColor, hoverColor, backgroundFrostedColor } =
    getThemedColors(theme);
  const { canvasColor } = getHighContrastColors();

  const colors: {
    [v in Exclude<LinkButtonVariant, 'tertiary'>]: Colors;
  } = {
    primary: {
      textColor: theme === 'dark' ? lightThemePrimaryColor : darkThemePrimaryColor,
      borderColor: primaryColor,
      borderColorHover: contrastHighColor,
      backgroundColor: primaryColor,
      backgroundColorHover: contrastHighColor,
    },
    secondary: {
      textColor: primaryColor,
      borderColor: primaryColor,
      borderColorHover: contrastMediumColor,
      backgroundColor: isHighContrastMode ? canvasColor : 'transparent',
      backgroundColorHover: hoverColor,
    },
    ghost: {
      textColor: primaryColor,
      borderColor: backgroundFrostedColor,
      borderColorHover: theme === 'dark' ? lighten(backgroundFrostedColor) : darken(backgroundFrostedColor),
      backgroundColor: backgroundFrostedColor,
      backgroundColorHover: theme === 'dark' ? lighten(backgroundFrostedColor) : darken(backgroundFrostedColor),
    },
  };

  return colors[variant === 'tertiary' ? 'secondary' : variant];
};

export const getLinkButtonStyles = (
  icon: LinkButtonIconName,
  iconSource: string,
  variant: LinkButtonVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  isDisabledOrLoading: boolean,
  hasSlottedAnchor: boolean,
  compact: boolean,
  cssVariablePadding: string,
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

  const paddingBlock = compact ? '4px' : '13px';
  const paddingInline = compact ? '12px' : '26px';

  const minSizeHideLabel = `calc(${fontLineHeight} + ${paddingBlock} + ${borderWidth.base})`;

  return {
    '@global': {
      ':host': {
        display: 'inline-block',
        ...addImportantToEachRule({
          verticalAlign: 'top',
          outline: 0, // custom element is able to delegate the focus
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
    },
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      width: '100%',
      ...(hideLabel && {
        minWidth: minSizeHideLabel, // ensure space is already reserved until icon component is loaded (ssr)
        minHeight: minSizeHideLabel, // ensure space is already reserved until icon component is loaded (ssr)
      }),
      boxSizing: 'border-box',
      textAlign: 'start',
      WebkitAppearance: 'none', // iOS safari
      appearance: 'none',
      textDecoration: 'none',
      border: `${borderWidth.base} solid ${borderColor}`,
      borderRadius: borderRadiusSmall,
      transform: 'translate3d(0,0,0)', // creates new stacking context (for slotted anchor + focus)
      backgroundColor,
      ...(variant === 'ghost' && { ...frostedGlassStyle, backgroundClip: 'padding-box' }), // background color overlays border-color otherwise
      color: textColor,
      ...textSmallStyle,
      transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`,
      ...buildResponsiveStyles(hideLabel, (hideLabelValue: boolean) => ({
        padding: hideLabelValue
          ? `var(${cssVariablePadding},${paddingBlock})`
          : `var(${cssVariablePadding},${paddingBlock} ${paddingInline})`,
        gap: hideLabelValue ? 0 : spacingStaticSmall,
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
        width: fontLineHeight,
        height: fontLineHeight,
        ...buildResponsiveStyles(hideLabel, (hideLabelValue: boolean) => ({
          marginInlineStart: hideLabelValue ? 0 : '-8px', // compensate white space of svg icon and optimize visual alignment
        })),
      },
    }),
  };
};
