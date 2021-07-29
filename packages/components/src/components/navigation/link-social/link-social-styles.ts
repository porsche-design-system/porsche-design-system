import {
  addImportantToEachRule,
  addImportantToRule,
  attachCss,
  BreakpointCustomizable,
  buildHostStyles,
  buildResponsiveStyles,
  buildSlottedStyles,
  buildSlottedStylesForDarkTheme,
  getCss,
  getFocusPseudoStyles,
  getFocusStyles,
  GetStylesFunction,
  insertSlottedStyles,
  isDark,
  JssStyle,
  mergeDeep,
  pxToRemWithUnit,
  Styles,
  transitionDuration,
  transitionTimingFunction,
} from '../../../utils';
import { color } from '@porsche-design-system/utilities';
import type { Theme } from '../../../types';
import type { SocialIconName } from './link-social-utils';
import { getHideLabelStyles as getLinkHideLabelStyles } from '../link/link-styles';

const getHideLabelStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => {
  const baseHideLabelStyles = getLinkHideLabelStyles(hideLabel);
  return mergeDeep(
    baseHideLabelStyles,
    hideLabel
      ? {
          root: {
            padding: 0,
          },
        }
      : {
          root: {
            padding: `${pxToRemWithUnit(12)} ${pxToRemWithUnit(16)} ${pxToRemWithUnit(12)} ${pxToRemWithUnit(40)}`,
          },
          icon: {
            left: pxToRemWithUnit(11),
            top: pxToRemWithUnit(11),
          },
        }
  );
};

const getColorStyles = (icon: SocialIconName, isDarkTheme: boolean): Styles => {
  return {
    '&:hover, &:active': icon
      ? {
          color: color.darkTheme.default,
          backgroundColor: color.external[icon.split('-')[1]],
        }
      : {
          ...(isDarkTheme && { color: color.default }),
          backgroundColor: isDarkTheme ? '#e0e0e0' : '#151718',
        },
  };
};

export const getComponentCss = (
  icon: SocialIconName,
  hideLabel: BreakpointCustomizable<boolean>,
  theme: Theme
): string => {
  const isDarkTheme = isDark(theme);

  return getCss(
    mergeDeep<Styles>(
      {
        ...buildHostStyles({
          display: 'inline-flex',
          verticalAlign: 'top',
          position: addImportantToRule('relative'),
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
          backgroundColor: color.neutralContrast.high,
          color: color.darkTheme.default,
          ...getColorStyles(icon, isDarkTheme),
          transition:
            `background-color ${transitionDuration} ${transitionTimingFunction},` +
            `color ${transitionDuration} ${transitionTimingFunction}`,
          ...getFocusStyles({ theme }),
        },
        icon: {
          position: 'absolute',
          width: pxToRemWithUnit(24),
          height: pxToRemWithUnit(24),
        },
        '::slotted(a)': addImportantToEachRule({
          display: 'block',
          position: 'static',
          textDecoration: 'none',
          color: 'inherit',
          lineHeight: 'inherit',
          outline: 'transparent none',
        }),
      },
      buildResponsiveStyles(hideLabel, getHideLabelStyles)
    )
  );
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    mergeDeep(
      buildSlottedStyles(host, getFocusPseudoStyles({ color: color.default })),
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
  icon: SocialIconName,
  hideLabel: BreakpointCustomizable<boolean>,
  theme: Theme
): void => {
  attachCss(host, getComponentCss(icon, hideLabel, theme));
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};
