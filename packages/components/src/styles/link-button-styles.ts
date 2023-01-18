import type { Styles, JssStyle } from 'jss';
import type { GetJssStyleFunction } from '../utils';
import type { BreakpointCustomizable, LinkButtonVariant, Theme, LinkButtonIconName } from '../types';
import { buildResponsiveStyles, hasVisibleIcon } from '../utils';
import {
  addImportantToRule,
  getTransition,
  getThemedColors,
} from './';
import { hoverMediaQuery } from './hover-media-query';
import {
  textSmallStyle,
  borderRadiusSmall,
  frostedGlassStyle,
  spacingStaticSmall, borderRadiusMedium, borderWidthBase, fontLineHeight
} from '@porsche-design-system/utilities-v2';

const { primaryColor: darkThemePrimaryColor } = getThemedColors('dark');
const { primaryColor: lightThemePrimaryColor } = getThemedColors('light');

type Colors = {
  textColor: string;
  borderColor: string;
  borderColorHover: string;
  backgroundColor: string;
  backgroundColorHover: string;
};

const getVariantColors = (
  variant: LinkButtonVariant,
  theme: Theme,
): Colors => {
  const { primaryColor, contrastHighColor, contrastMediumColor, hoverColor } =
    getThemedColors(theme);

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

export const getRootJssStyle: GetJssStyleFunction = (hideLabel: boolean): JssStyle => {
  return {
    padding:  hideLabel ? '13px' : '13px 26px',
    gap: hideLabel ? 0 : spacingStaticSmall,
  };
};

export const getLabelJssStyle: GetJssStyleFunction = (hideLabel: boolean): JssStyle => {
  return hideLabel
    ? {
        width: 0,
        height: '1px',
        textIndent: '-999999px',
      }
    : {
        width: 'auto',
        height: 'auto',
        textIndent: 0,
      };
};

export const getFocusOffset = (backdrop: boolean): JssStyle => {
  return backdrop
  ? {
      top: '-6px',
      right: '-6px',
      bottom: '-6px',
      left: '-6px',
    }
  :
    {
      top: '-4px',
      right: '-4px',
      bottom: '-4px',
      left: '-4px',
    };
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
  const isTertiary = variant === 'tertiary';
  const isSecondary = variant === 'secondary';
  const { textColor, borderColor, borderColorHover, backgroundColor, backgroundColorHover } = getVariantColors(variant, theme);
  const { focusColor } = getThemedColors(theme);
  const hasIcon = hasVisibleIcon(icon, iconSource) || hideLabel;

  return {
    '@global': {
      ':host': {
        display: 'inline-block',
        verticalAlign: 'top',
        transform: 'translate3d(0,0,0)', // creates new stacking context
        outline: addImportantToRule(0),
      }
    },
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      width: '100%',
      minWidth: '54px',
      minHeight: '54px',
      boxSizing: 'border-box',
      outline: 0,
      appearance: 'none',
      textDecoration: 'none',
      border: `2px solid ${borderColor}`,
      borderRadius: borderRadiusSmall,
      backgroundColor,
      color: textColor,
      ...textSmallStyle,
      transition: ['background-color', 'border-color', 'color'].map(getTransition).join(),
      ...buildResponsiveStyles(hideLabel, getRootJssStyle),
      ...(!hasSlottedAnchor && {
        '&:focus::before': {
          content: '""',
          position: 'fixed',
          border: `${borderWidthBase} solid ${focusColor}`,
          borderRadius: borderRadiusMedium,
          ...getFocusOffset(false),
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
            ...((isSecondary || isTertiary) && {
              ...frostedGlassStyle,
              '&:focus::before': { // needed due to new stacking context because of `backdrop-filter` css property
                ...getFocusOffset(true),
              },
              '& > $label': {
                color: textColor,
              },
              ...(hasIcon && {
                '& > $icon': {
                  color: textColor,
                },
              }),
            }),
          },
        })),
    },
    label: {
      ...buildResponsiveStyles(hideLabel, getLabelJssStyle),
    },
    ...(hasIcon && {
      icon: {
        width: fontLineHeight,
        height: fontLineHeight,
        pointerEvents: 'none',
        ...buildResponsiveStyles(hideLabel, (hideLabelValue: boolean) => {
          return {
            marginLeft: hideLabelValue ? 0 : '-8px',
          };
        })
      }
    }),
  };
};
