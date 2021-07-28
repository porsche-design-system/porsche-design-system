import type { BreakpointCustomizable, JssStyle, Styles } from '../../../utils';
import {
  addImportantToEachRule,
  attachCss,
  buildHostStyles,
  getCss,
  getFocusStyles,
  insertSlottedStyles,
  isDark,
  pxToRemWithUnit,
  mergeDeep,
  buildSlottedStyles,
  transitionDuration,
  transitionTimingFunction,
  getFocusPseudoStyles,
  buildSlottedStylesForDarkTheme,
  GetStylesFunction,
  buildResponsiveStyles,
} from '../../../utils';
import { color } from '@porsche-design-system/utilities';
import type { LinkVariant, Theme } from '../../../types';

const { darkTheme } = color;

const getIconColor = (variant: LinkVariant, isDarkTheme: boolean): string => {
  switch (variant) {
    case 'primary':
      return darkTheme.default;
    case 'tertiary':
      return isDarkTheme ? darkTheme.default : color.default;
    default:
      return isDarkTheme ? color.default : darkTheme.default;
  }
};

const getVariantColors = (variant: LinkVariant, isDarkTheme: boolean): { defaultColor: string; hoverColor: string } => {
  switch (variant) {
    case 'primary':
      return {
        defaultColor: isDarkTheme ? darkTheme.brand : color.brand,
        hoverColor: isDarkTheme ? '#c4001a' : '#980014',
      };
    case 'tertiary':
      return {
        defaultColor: isDarkTheme ? darkTheme.default : color.neutralContrast.high,
        hoverColor: isDarkTheme ? darkTheme.default : '#151718',
      };
    default:
      return {
        defaultColor: isDarkTheme ? darkTheme.default : color.neutralContrast.high,
        hoverColor: isDarkTheme ? '#e0e0e0' : '#151718',
      };
  }
};

const getColorStyles = (variant: LinkVariant, isDarkTheme: boolean): Styles => {
  const { defaultColor, hoverColor } = getVariantColors(variant, isDarkTheme);
  const isTertiary = variant === 'tertiary';

  return {
    color: defaultColor,
    ...(isTertiary && {
      backgroundColor: 'transparent',
    }),
    '&:hover, &:active': {
      color: hoverColor,
      ...(variant !== 'primary' && {
        ...(isTertiary && {
          backgroundColor: 'currentColor',
        }),
        '& $label, & $icon': {
          color: isDarkTheme ? color.default : darkTheme.default,
        },
      }),
    },
  };
};

const getHideLabelStyles: GetStylesFunction = (hideLabel: boolean): JssStyle =>
  hideLabel
    ? {
        root: {
          padding: 0,
        },
        label: {
          width: 1,
          height: 1,
          margin: '0 0 0 -1px',
          padding: 0,
          overflow: 'hidden',
          border: 0,
          textIndent: -1,
        },
        icon: {
          left: '50%',
          top: '50%',
          transform: 'translate3d(-50%, -50%, 0)',
        },
      }
    : {
        root: {
          padding: `${pxToRemWithUnit(11)} ${pxToRemWithUnit(15)} ${pxToRemWithUnit(11)} ${pxToRemWithUnit(39)}`,
        },
        label: {
          width: '100%',
          height: 'auto',
          margin: 0,
          padding: 0,
          overflow: 'visible',
          border: 0,
          textIndent: 0,
        },
        icon: {
          left: pxToRemWithUnit(11),
          top: pxToRemWithUnit(11),
          // transform: translateX(0) translateY(0),
        },
      };

export const getComponentCss = (
  variant: LinkVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  hasHref: boolean,
  theme: Theme
): string => {
  const isDarkTheme = isDark(theme);
  const iconColor = getIconColor(variant, isDarkTheme);

  return getCss(
    mergeDeep<Styles>(
      {
        ...buildHostStyles({
          display: 'inline-flex',
          verticalAlign: 'top',
          cursor: 'pointer',
        }),
        '::slotted(a)': addImportantToEachRule({
          display: 'block',
          position: 'static',
          textDecoration: 'none',
          color: 'inherit',
          lineHeight: 'inherit',
          outline: 'transparent none',
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
          backgroundColor: 'currentColor',
          border: '1px solid currentColor',
          ...getColorStyles(variant, isDarkTheme), // overrides backgroundColor for tertiary
          transition: `background-color ${transitionDuration} ${transitionTimingFunction},
        border-color ${transitionDuration} ${transitionTimingFunction},
        color ${transitionDuration} ${transitionTimingFunction}`,
          ...(hasHref && getFocusStyles()),
        },
        label: {
          color: iconColor,
        },
        icon: {
          position: 'absolute',
          width: pxToRemWithUnit(24),
          height: pxToRemWithUnit(24),
          color: iconColor,
        },
      },
      buildResponsiveStyles(hideLabel, getHideLabelStyles)
    )
  );
};

// export const getSlottedStyles = (): Styles => {
//   return {
//     '&[variant="primary"]': {
//       '&a:focus::before, &[theme="dark"] a:focus::before': {
//         outlineColor: color.state.hover,
//       },
//       'a:focus:not(:focus-visible)::before, &[theme="dark"] a:focus:not(:focus-visible)::before': {
//         outlineColor: 'transparent',
//       },
//     },
//   };
// };

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    mergeDeep(
      buildSlottedStyles(host, getFocusPseudoStyles({ offset: 3, color: color.neutralContrast.high })),
      buildSlottedStylesForDarkTheme(host, {
        '& a:focus::before': {
          outlineColor: color.background.default,
        },
      })
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

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};
