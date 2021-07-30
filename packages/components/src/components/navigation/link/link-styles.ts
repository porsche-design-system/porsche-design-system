import type { BreakpointCustomizable, JssStyle, Styles } from '../../../utils';
import {
  addImportantToEachRule,
  attachCss,
  buildHostStyles,
  getCss,
  getFocusStyles,
  isDark,
  pxToRemWithUnit,
  mergeDeep,
  transitionDuration,
  transitionTimingFunction,
  GetStylesFunction,
  buildResponsiveStyles,
} from '../../../utils';
import { color } from '@porsche-design-system/utilities';
import type { LinkVariant, Theme } from '../../../types';

const { darkTheme } = color;

const getVariantColors = (variant: LinkVariant, isDarkTheme: boolean): { defaultColor: string; hoverColor: string; textColor: string; } => {
  switch (variant) {
    case 'primary':
      return {
        defaultColor: isDarkTheme ? darkTheme.brand : color.brand,
        hoverColor: isDarkTheme ? '#c4001a' : '#980014',
        textColor: darkTheme.default
      };
    case 'tertiary':
      return {
        defaultColor: isDarkTheme ? darkTheme.default : color.neutralContrast.high,
        hoverColor: isDarkTheme ? darkTheme.default : '#151718',
        textColor: isDarkTheme ? darkTheme.default : color.default
      };
    default:
      return {
        defaultColor: isDarkTheme ? darkTheme.default : color.neutralContrast.high,
        hoverColor: isDarkTheme ? '#e0e0e0' : '#151718',
        textColor: isDarkTheme ? color.default : darkTheme.default
      };
  }
};

// TODO: can be optimized by reducing getVisibilityStyle + getSlottedLinkStyles depending on hasHref prop
const getVisibilityStyle = (visible: boolean): JssStyle => {
  return visible ? {
    width: 'auto',
    height: 'auto',
    margin: 0,
    overflow: 'visible',
    textIndent: 0,
  } : {
    width: 1,
    height: 1,
    margin: '0 0 0 -1px',
    overflow: 'hidden',
    textIndent: -1,
  };
};

const linkPadding = `${pxToRemWithUnit(11)} ${pxToRemWithUnit(15)} ${pxToRemWithUnit(11)} ${pxToRemWithUnit(39)}`;

const getRootStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => ({
  root: {
    padding: hideLabel ? 0 : linkPadding,
  },
});

export const getIconLabelStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => {
  return hideLabel ? {
    icon: {
      left: '50%',
      top: '50%',
      transform: 'translate3d(-50%, -50%, 0)',
    },
    label: getVisibilityStyle(!hideLabel)
  } : {
    icon: {
      left: pxToRemWithUnit(11),
      top: pxToRemWithUnit(11),
      transform: 'translate3d(0,0,0)',
    },
    label: getVisibilityStyle(!hideLabel),
  };
};

export const getSlottedLinkStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => {
  return addImportantToEachRule({
    '::slotted(a)': hideLabel ? {
      position: 'absolute',
      inset: 0,
      padding: 0,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textIndent: '99999px',
    } : {
      position: 'static',
      inset: 'auto',
      padding: linkPadding,
      overflow: 'visible',
      whiteSpace: 'normal',
      textIndent: 0,
    }
  });
};

export const getComponentCss = (
  variant: LinkVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  hasHref: boolean,
  theme: Theme
): string => {
  const isDarkTheme = isDark(theme);
  const isTertiary = variant === 'tertiary';
  const { defaultColor, hoverColor, textColor } = getVariantColors(variant, isDarkTheme);

  return getCss(
    mergeDeep<Styles>(
      {
        ...buildHostStyles({
          display: 'inline-flex',
          verticalAlign: 'top',
          cursor: 'pointer',
        }),
        root: {
          display: 'flex',
          width: '100%',
          minWidth: pxToRemWithUnit(48),
          minHeight: pxToRemWithUnit(48),
          position: 'relative',
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          appearance: 'none',
          textDecoration: 'none',
          border: '1px solid currentColor',
          backgroundColor: isTertiary ? 'transparent' : 'currentColor',
          color: defaultColor,
          transition: `background-color ${transitionDuration} ${transitionTimingFunction},`+
            `border-color ${transitionDuration} ${transitionTimingFunction},`+
            `color ${transitionDuration} ${transitionTimingFunction}`,
          '&:hover, &:active': {
            color: hoverColor,
            ...(isTertiary && {
              backgroundColor: 'currentColor',
              '& $label, & $icon': {
                color: isDarkTheme ? color.default : darkTheme.default,
              },
            }),
          },
          ...(hasHref && getFocusStyles()),
        },
        icon: {
          position: 'absolute',
          width: pxToRemWithUnit(24),
          height: pxToRemWithUnit(24),
          color: textColor,
          pointerEvents: 'none',
        },
        label: {
          display: 'block',
          boxSizing: 'border-box',
          color: textColor,
        },
        ...(!hasHref && addImportantToEachRule({
          '::slotted(a)': {
            display: 'block',
            textDecoration: 'none',
            color: 'inherit',
            lineHeight: 'inherit',
            outline: 'transparent solid 1px',
            outlineOffset: '3px',
          },
          '::slotted(a::-moz-focus-inner)': {
            border: 0,
          },
          '::slotted(a:focus)': {
            outlineColor: defaultColor,
          },
          '::slotted(a:hover:focus)': {
            outlineColor: hoverColor,
          },
          '::slotted(a:focus:not(:focus-visible))': {
            outlineColor: 'transparent',
          },
        })),
      },
      // TODO: would be better to handle one responsive style prop by one style function
      buildResponsiveStyles(hideLabel, getIconLabelStyles),
      hasHref ? buildResponsiveStyles(hideLabel, getRootStyles) : buildResponsiveStyles(hideLabel, getSlottedLinkStyles)
    )
  );
};

export const addComponentCss = (
  host: HTMLElement,
  variant: LinkVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  hasHref: boolean,
  theme: Theme
): void => {
  attachCss(host, getComponentCss(variant, hideLabel, hasHref, theme));
};
