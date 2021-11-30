import type { BreakpointCustomizable, JssStyle, Styles } from '../../../utils';
import {
  addImportantToEachRule,
  buildHostStyles,
  buildResponsiveStyles,
  colorDarken,
  getCss,
  getFocusStyles,
  getInset,
  GetStylesFunction,
  getTransition,
  isDark,
  mergeDeep,
  pxToRemWithUnit,
} from '../../../utils';
import { color } from '@porsche-design-system/utilities';
import type { LinkVariant, Theme } from '../../../types';

const { darkTheme } = color;

const getVariantColors = (
  variant: LinkVariant,
  isDarkTheme: boolean
): { baseColor: string; baseColorHover: string; textColor: string } => {
  switch (variant) {
    case 'primary':
      return {
        baseColor: isDarkTheme ? darkTheme.brand : color.brand,
        baseColorHover: isDarkTheme ? colorDarken.darkTheme.state.hover : colorDarken.state.hover,
        textColor: darkTheme.default,
      };
    case 'tertiary':
      return {
        baseColor: isDarkTheme ? darkTheme.default : color.neutralContrast.high,
        baseColorHover: isDarkTheme ? darkTheme.default : colorDarken.neutralContrast.high,
        textColor: isDarkTheme ? darkTheme.default : color.default,
      };
    default:
      return {
        baseColor: isDarkTheme ? darkTheme.default : color.neutralContrast.high,
        baseColorHover: isDarkTheme ? colorDarken.darkTheme.default : colorDarken.neutralContrast.high,
        textColor: isDarkTheme ? color.default : darkTheme.default,
      };
  }
};

// TODO: can be optimized by reducing getVisibilityStyle + getSlottedLinkStyles depending on hasHref prop
export const getVisibilityStyle = (visible: boolean): JssStyle => {
  return visible
    ? {
        width: '100%',
        height: 'auto',
        margin: 0,
        overflow: 'visible',
        textIndent: 0,
      }
    : {
        width: 1,
        height: 1,
        margin: '0 0 0 -1px',
        overflow: 'hidden',
        textIndent: -1,
      };
};

const linkPadding = `${pxToRemWithUnit(11)} ${pxToRemWithUnit(15)} ${pxToRemWithUnit(11)} ${pxToRemWithUnit(39)}`;

export const getRootStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => ({
  root: {
    padding: hideLabel ? 0 : linkPadding,
  },
});

export const getIconLabelStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => {
  return hideLabel
    ? {
        icon: {
          left: '50%',
          top: '50%',
          transform: 'translate3d(-50%, -50%, 0)',
        },
        label: getVisibilityStyle(!hideLabel),
      }
    : {
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
    '::slotted(a)': hideLabel
      ? {
          position: 'absolute',
          ...getInset(),
          padding: 0,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textIndent: '99999px',
        }
      : {
          position: 'static',
          ...getInset('auto'),
          padding: linkPadding,
          overflow: 'visible',
          whiteSpace: 'normal',
          textIndent: 0,
        },
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
  const { baseColor, baseColorHover, textColor } = getVariantColors(variant, isDarkTheme);

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
          color: baseColor,
          transition:
            getTransition('background-color') + ',' + getTransition('border-color') + ',' + getTransition('color'),
          '&:hover, &:active': {
            color: baseColorHover,
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
        ...(!hasHref &&
          addImportantToEachRule({
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
