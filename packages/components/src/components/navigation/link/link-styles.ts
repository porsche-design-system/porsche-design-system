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
} from '../../../utils';
import { color } from '@porsche-design-system/utilities';
import type { LinkVariant, Theme } from '../../../types';

const P_LINK_SECONDARY_HOVER_COLOR = '#151718';
const P_LINK_SECONDARY_THEME_DARK_HOVER_COLOR = '#e0e0e0';

const P_LINK_PRIMARY_HOVER_COLOR = '#980014';
const P_LINK_PRIMARY_THEME_DARK_HOVER_COLOR = '#c4001a';

const getDefaultColorStyles = (theme: Theme): Styles => {
  const defaultColor = isDark(theme) ? color.darkTheme.default : color.neutralContrast.high;

  return {
    color: defaultColor,
    backgroundColor: defaultColor,
    borderColor: defaultColor,
  };
};

const getDefaultHoverColorStyles = (theme: Theme): Styles => {
  const defaultHoverColor = isDark(theme) ? P_LINK_SECONDARY_THEME_DARK_HOVER_COLOR : P_LINK_SECONDARY_HOVER_COLOR;

  return {
    '&:hover, &:active': {
      color: defaultHoverColor,
      backgroundColor: defaultHoverColor,
      borderColor: defaultHoverColor,
    },
  };
};

const getPrimaryColorStyles = (theme: Theme): Styles => {
  const primaryColor = isDark(theme) ? color.darkTheme.brand : color.brand;

  return {
    color: primaryColor,
    backgroundColor: primaryColor,
    borderColor: primaryColor,
  };
};

const getPrimaryHoverColorStyles = (theme: Theme): Styles => {
  const primaryHoverColor = isDark(theme) ? P_LINK_PRIMARY_THEME_DARK_HOVER_COLOR : P_LINK_PRIMARY_HOVER_COLOR;

  return {
    '&:hover, &:active': {
      color: primaryHoverColor,
      backgroundColor: primaryHoverColor,
      borderColor: primaryHoverColor,
    },
  };
};

const getTertiaryColorStyles = (theme: Theme): Styles => {
  const tertiaryColor = isDark(theme) ? color.darkTheme.default : color.neutralContrast.high;

  return {
    color: tertiaryColor,
    backgroundColor: 'transparent',
    borderColor: tertiaryColor,
  };
};

const getTertiaryHoverColorStyles = (theme: Theme): Styles => {
  const tertiaryHoverColor = isDark(theme) ? color.darkTheme.default : P_LINK_SECONDARY_HOVER_COLOR;

  return {
    '&:hover, &:active': {
      color: tertiaryHoverColor,
      backgroundColor: tertiaryHoverColor,
      borderColor: tertiaryHoverColor,
      '& $label, & $icon': {
        color: theme === 'light' ? color.darkTheme.default : color.default,
      },
    },
  };
};

const getDefaultIconLabelColor = (theme: Theme): Styles => {
  return { color: isDark(theme) ? color.default : color.darkTheme.default };
};
const getPrimaryIconLabelColor = (): Styles => {
  return { color: color.darkTheme.default };
};
const getTertiaryIconLabelColor = (theme: Theme): Styles => {
  return { color: isDark(theme) ? color.darkTheme.default : color.default };
};

export const getComponentCss = (theme: Theme, variant: LinkVariant): string => {
  const iconLabelColorStyle = mergeDeep(
    getDefaultIconLabelColor(theme),
    variant === 'primary' && getPrimaryIconLabelColor(),
    variant === 'tertiary' && getTertiaryIconLabelColor(theme)
  );

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
      outline: ' transparent none',
    }),
    root: {
      display: 'flex',
      width: '100%',
      minWidth: pxToRemWithUnit(48),
      minHeight: pxToRemWithUnit(48),
      position: 'relative',
      margin: '0',
      padding: '0',
      boxSizing: 'border-box',
      appearance: 'none',
      textDecoration: 'none',
      ...mergeDeep(
        getDefaultColorStyles(theme),
        variant === 'primary' && getPrimaryColorStyles(theme),
        variant === 'tertiary' && getTertiaryColorStyles(theme)
      ),
      border: '1px solid ',
      transition: `background-color ${transitionDuration} ${transitionTimingFunction},
        border-color ${transitionDuration} ${transitionTimingFunction},
        color ${transitionDuration} ${transitionTimingFunction}`,
      ...getFocusStyles(),
      ...mergeDeep(
        getDefaultHoverColorStyles(theme),
        variant === 'primary' && getPrimaryHoverColorStyles(theme),
        variant === 'tertiary' && getTertiaryHoverColorStyles(theme)
      ),
    },
    label: {
      display: 'block',
      boxSizing: 'border-box',
      ...iconLabelColorStyle,
    },
    icon: {
      position: 'absolute',
      width: pxToRemWithUnit(24),
      height: pxToRemWithUnit(24),
      ...iconLabelColorStyle,
    },
  });
};

export const getSlottedStyles = (): Styles => {
  return {
    ...getFocusPseudoStyles({ offset: 3, color: color.neutralContrast.high }),
    '&[theme="dark"] a:focus::before': {
      outlineColor: color.background.default,
    },
    '&[variant="primary"] a:focus::before, &[theme="dark"][variant="primary"] a:focus::before': {
      outlineColor: color.state.hover,
    },
    '&[theme="dark"] a:focus:not(:focus-visible)::before, &[variant="primary"] a:focus:not(:focus-visible)::before, &[theme="dark"][variant="primary"] a:focus:not(:focus-visible)::before':
      {
        outlineColor: 'transparent',
      },
  };
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getSlottedStyles()));
};

export const addComponentCss = (host: HTMLElement, theme: Theme, variant: LinkVariant): void => {
  attachCss(host, getComponentCss(theme, variant));
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};
