import {
  addImportantToEachRule,
  attachCss,
  BreakpointCustomizable,
  buildHostStyles,
  buildResponsiveStyles,
  getCss,
  getFocusStyles,
  GetStylesFunction,
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

const { darkTheme } = color;

const getColors = (isDarkTheme: boolean, icon: SocialIconName): { baseColor: string; baseColorHover: string; textColor: string; textColorHover: string; } => {
  return {
    baseColor: isDarkTheme ? darkTheme.default : color.neutralContrast.high,
    baseColorHover: color.external[icon.split('-')[1]],
    textColor: isDarkTheme ? color.default : darkTheme.default,
    textColorHover: darkTheme.default
  };
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

const linkPadding = `${pxToRemWithUnit(12)} ${pxToRemWithUnit(16)} ${pxToRemWithUnit(12)} ${pxToRemWithUnit(40)}`;

const getRootStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => ({
  root: {
    padding: hideLabel ? 0 : linkPadding,
  },
});

const getIconLabelStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => {
  return hideLabel ? {
    icon: {
      left: '50%',
      top: '50%',
      transform: 'translate3d(-50%, -50%, 0)',
    },
    label: getVisibilityStyle(!hideLabel)
  } : {
    icon: {
      left: pxToRemWithUnit(12),
      top: pxToRemWithUnit(12),
      transform: 'translate3d(0,0,0)',
    },
    label: getVisibilityStyle(!hideLabel),
  };
};

const getSlottedLinkStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => {
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
  icon: SocialIconName,
  hideLabel: BreakpointCustomizable<boolean>,
  hasHref: boolean,
  theme: Theme
): string => {
  const isDarkTheme = isDark(theme);
  const { baseColor, baseColorHover, textColor, textColorHover } = getColors(isDarkTheme, icon);

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
          backgroundColor: 'currentColor',
          color: baseColor,
          transition: `background-color ${transitionDuration} ${transitionTimingFunction},`+
            `color ${transitionDuration} ${transitionTimingFunction}`,
          '&:hover, &:active': {
            color: baseColorHover,
            '& $label, & $icon': {
              color: textColorHover
            }
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
            outlineOffset: '2px',
          },
          '::slotted(a::-moz-focus-inner)': {
            border: 0,
          },
          '::slotted(a:focus)': {
            outlineColor: baseColor,
          },
          '::slotted(a:hover:focus)': {
            outlineColor: baseColorHover,
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
  icon: SocialIconName,
  hideLabel: BreakpointCustomizable<boolean>,
  hasHref: boolean,
  theme: Theme
): void => {
  attachCss(host, getComponentCss(icon, hideLabel, hasHref, theme));
};
