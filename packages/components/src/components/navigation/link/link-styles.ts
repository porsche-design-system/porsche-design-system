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
    case 'secondary':
      return {
        defaultColor: isDarkTheme ? darkTheme.default : color.neutralContrast.high,
        hoverColor: isDarkTheme ? '#e0e0e0' : '#151718',
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

const getColorStyles = (variant: LinkVariant, isDarkTheme: boolean, hasSlottedAnchor: boolean): Styles => {
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

const getIconLabelStyles: GetStylesFunction = (hideLabel: boolean): JssStyle =>
  hideLabel
    ? {
        icon: {
          left: '50%',
          top: '50%',
          transform: 'translate3d(-50%, -50%, 0)',
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
      }
    : {
        icon: {
          left: pxToRemWithUnit(11),
          top: pxToRemWithUnit(11),
          transform: 'translate3d(0,0,0)',
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
      };
const linkPadding = `${pxToRemWithUnit(11)} ${pxToRemWithUnit(15)} ${pxToRemWithUnit(11)} ${pxToRemWithUnit(39)}`;

export const getRootStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => ({
  root: {
    padding: hideLabel ? 0 : linkPadding,
  },
});

export const getComponentCss = (
  hasSlottedAnchor: boolean,
  variant: LinkVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  hasHref: boolean,
  theme: Theme
): string => {
  const isDarkTheme = isDark(theme);
  const iconColor = getIconColor(variant, isDarkTheme);
  const { defaultColor, hoverColor } = getVariantColors(variant, isDarkTheme);
  const isTertiary = variant === 'tertiary';

  return getCss(
    mergeDeep<Styles>(
      {
        ...buildHostStyles({
          display: 'inline-flex',
          verticalAlign: 'top',
          cursor: 'pointer',
        }),

        ...(hasSlottedAnchor && {
          '::slotted(a)': addImportantToEachRule({
            display: 'block',
            position: 'static',
            textDecoration: 'none',
            color: 'inherit',
            lineHeight: 'inherit',
            outline: 'transparent none',
            padding: linkPadding,
            ...(isTertiary
              ? {
                  border: `1px solid ${defaultColor}`,
                  // background: 'purple',
                }
              : {
                  border: '1px solid transparent',
                }),
          }),
          //TODO
          '::slotted(a:hover)': addImportantToEachRule({
            backgroundColor: hoverColor,
            borderColor: hoverColor,
            background: isTertiary && hasSlottedAnchor ? '#151718' : hoverColor, //isDarkTheme ? '#c4001a' : '#980014',
          }),
          '::slotted(a:focus)': addImportantToEachRule({
            // outline: '1px transparent none',
            // outline: 'transparent solid 1px',
            outlineColor: 'purple',
            outlineOffset: '2px',
          }),
          '::slotted(a:focus:not(:focus-visible))': addImportantToEachRule({
            // background: 'red',
            outlineColor: 'purple',
            outlineOffset: '2px',
          }),
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
          ...(!hasSlottedAnchor && { border: '1px solid currentColor' }),
          ...getColorStyles(variant, isDarkTheme, hasSlottedAnchor), // overrides backgroundColor for tertiary
          transition: `background-color ${transitionDuration} ${transitionTimingFunction},
        border-color ${transitionDuration} ${transitionTimingFunction},
        color ${transitionDuration} ${transitionTimingFunction}`,
          border: '1px solid currentColor',
          ...getColorStyles(variant, isDarkTheme), // overrides backgroundColor for tertiary
          transition:
            `background-color ${transitionDuration} ${transitionTimingFunction},` +
            `border-color ${transitionDuration} ${transitionTimingFunction},` +
            `color ${transitionDuration} ${transitionTimingFunction}`,
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
        '::slotted(a)': addImportantToEachRule({
          display: 'block',
          position: 'static',
          textDecoration: 'none',
          color: 'inherit',
          lineHeight: 'inherit',
          outline: 'transparent none',
        }),
      },
      buildResponsiveStyles(hideLabel, getIconLabelStyles),
      !hasSlottedAnchor && buildResponsiveStyles(hideLabel, getRootStyles)
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
      buildSlottedStyles(host, getFocusPseudoStyles({ offset: 2, color: color.neutralContrast.high })),
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
  hasSlottedAnchor: boolean,
  variant: LinkVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  hasHref: boolean,
  theme: Theme
): void => {
  attachCss(host, getComponentCss(hasSlottedAnchor, variant, hideLabel, hasHref, theme));
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};
