import type { Styles } from '../../../utils';
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

const getMainColors = (variant: LinkVariant, isDarkTheme: boolean): { defaultColor: string; hoverColor: string } => {
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

const getMainColorStyles = (variant: LinkVariant, isDarkTheme: boolean): Styles => {
  const { defaultColor, hoverColor } = getMainColors(variant, isDarkTheme);
  const isTertiary = variant === 'tertiary';

  return {
    color: defaultColor,
    backgroundColor: defaultColor,
    ...(isTertiary && {
      backgroundColor: 'transparent',
    }),
    borderColor: defaultColor,
    '&:hover, &:active': {
      color: hoverColor,
      backgroundColor: hoverColor,
      borderColor: hoverColor,
      ...(isTertiary && {
        color: isDarkTheme ? color.default : darkTheme.default,
      }),
    },
  };
};

export const getComponentCss = (variant: LinkVariant, theme: Theme): string => {
  const isDarkTheme = isDark(theme);
  const iconColor = getIconColor(variant, isDarkTheme);

  return getCss({
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
      border: '1px solid',
      ...getMainColorStyles(variant, isDarkTheme),
      transition: `background-color ${transitionDuration} ${transitionTimingFunction},
        border-color ${transitionDuration} ${transitionTimingFunction},
        color ${transitionDuration} ${transitionTimingFunction}`,
      ...getFocusStyles(),
    },
    label: {
      display: 'block',
      boxSizing: 'border-box',
      color: iconColor,
    },
    icon: {
      position: 'absolute',
      width: pxToRemWithUnit(24),
      height: pxToRemWithUnit(24),
      color: iconColor,
    },
  });
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

export const addComponentCss = (host: HTMLElement, variant: LinkVariant, theme: Theme): void => {
  attachCss(host, getComponentCss(variant, theme));
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};
