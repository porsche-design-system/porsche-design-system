import type { Styles } from 'jss';
import { buildResponsiveStyles, hasVisibleIcon } from '../utils';
import type { BreakpointCustomizable, LinkButtonIconName, LinkButtonVariant, Theme } from '../types';
import { addImportantToEachRule, getInsetJssStyle, getThemedColors, getTransition } from './';
import { hoverMediaQuery } from './hover-media-query';
import {
  borderRadiusMedium,
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  frostedGlassStyle,
  spacingStaticSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { hostHiddenStyles } from './host-hidden-styles';

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
  const { primaryColor, contrastHighColor, contrastMediumColor, hoverColor } = getThemedColors(theme);

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
      backgroundColor: 'transparent',
      backgroundColorHover: hoverColor,
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
  theme: Theme
): Styles => {
  const isPrimary = variant === 'primary';
  const { textColor, borderColor, borderColorHover, backgroundColor, backgroundColorHover } = getVariantColors(
    variant,
    theme
  );
  const { focusColor } = getThemedColors(theme);
  const hasIcon = hasVisibleIcon(icon, iconSource) || hideLabel;

  return {
    '@global': {
      ':host': addImportantToEachRule({
        ...hostHiddenStyles,
        display: 'inline-block',
        verticalAlign: 'top',
        outline: 0, // custom element is able to delegate the focus
      }),
    },
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      width: '100%',
      minWidth: '54px', // ensure space is already reserved until icon component is loaded (ssr)
      minHeight: '54px', // ensure space is already reserved until icon component is loaded (ssr)
      boxSizing: 'border-box',
      outline: 0,
      textAlign: 'left',
      appearance: 'none',
      textDecoration: 'none',
      border: `2px solid ${borderColor}`,
      borderRadius: borderRadiusSmall,
      transform: 'translate3d(0,0,0)', // creates new stacking context
      backgroundColor,
      color: textColor,
      ...textSmallStyle,
      transition: ['background-color', 'border-color', 'color'].map(getTransition).join(),
      ...buildResponsiveStyles(hideLabel, (hideLabelValue: boolean) => ({
        padding: hideLabelValue ? '13px' : hasIcon ? '13px 26px 13px 18px' : '13px 26px',
        gap: hideLabelValue ? 0 : spacingStaticSmall,
      })),
      ...(!hasSlottedAnchor && {
        '&:focus::before': {
          content: '""',
          position: 'fixed',
          border: `${borderWidthBase} solid ${focusColor}`,
          borderRadius: borderRadiusMedium,
          ...getInsetJssStyle(-6),
        },
        '&:not(:focus-visible)::before': {
          border: 0,
        },
      }),
      ...(!isDisabledOrLoading &&
        hoverMediaQuery({
          '&:hover': {
            backgroundColor: backgroundColorHover,
            borderColor: borderColorHover,
            ...(!isPrimary && frostedGlassStyle),
          },
        })),
    },
    label: {
      ...buildResponsiveStyles(hideLabel, (hideLabelValue: boolean) =>
        hideLabelValue
          ? {
              width: 0,
              height: '1px',
              textIndent: '-999999px',
            }
          : {
              width: 'auto',
              height: 'auto',
              textIndent: 0,
            }
      ),
    },
    ...(hasIcon && {
      icon: {
        width: fontLineHeight,
        height: fontLineHeight,
      },
    }),
  };
};
