import { getCss, isThemeDark, scrollShadowColor, scrollShadowColorDark, type Theme } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  cssVariableTransitionDuration,
  getFrostedGlassBackgroundJssStyles,
  getInsetJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import { FLYOUT_Z_INDEX } from '../../constants';
import {
  gridGap,
  motionDurationLong,
  spacingFluidLarge,
  spacingStaticMedium,
} from '@porsche-design-system/utilities-v2';
import type { FlyoutPosition } from './flyout-utils';

export const headerShadowClass = 'header--shadow';
export const footerShadowClass = 'footer--shadow';

export const getComponentCss = (
  isOpen: boolean,
  position: FlyoutPosition,
  hasFooter: boolean,
  hasSubFooter: boolean,
  theme: Theme
): string => {
  const { primaryColor, backgroundColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark, backgroundColor: backgroundColorDark } = getThemedColors('dark');
  const isPositionStart = position === 'start';
  const contentPadding = `${spacingStaticMedium} ${spacingFluidLarge}`;
  const isDark = isThemeDark(theme);
  const shadowColor = isDark ? scrollShadowColorDark : scrollShadowColor;
  const transparentColorDark = 'rgba(14, 14, 18, 0)';
  const transparentColor = isDark ? transparentColorDark : 'rgba(255, 255, 255, 0)';
  const duration = 'long';

  return getCss({
    '@global': {
      ':host': {
        display: 'flex',
        ...addImportantToEachRule({
          // needed for correct alignment of the Porsche Grid within the Flyout
          '--pds-internal-grid-outer-column': `calc(${spacingFluidLarge} - ${gridGap})`,
          '--pds-internal-grid-margin': `calc(${spacingFluidLarge} * -1)`,
          position: 'fixed',
          zIndex: FLYOUT_Z_INDEX,
          justifyContent: isPositionStart ? 'flex-start' : 'flex-end',
          ...(isOpen
            ? {
                visibility: 'inherit',
              }
            : {
                visibility: 'hidden',
                transition: `visibility 0s linear var(${cssVariableTransitionDuration}, ${motionDurationLong})`,
              }),
          ...getInsetJssStyle(),
          '&::before': {
            content: '""',
            position: 'fixed',
            ...getInsetJssStyle(),
            ...getFrostedGlassBackgroundJssStyles(isOpen, theme),
            transition: `${getTransition('opacity', duration, 'base')}, ${getTransition(
              'backdrop-filter',
              duration,
              'base'
            )}, ${getTransition('-webkit-backdrop-filter', duration, 'base')}`,
          },
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
    },
    root: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      ...(hasSubFooter && {
        overflowY: 'auto',
        overscrollBehaviorY: 'none',
      }),
      width: 'var(--p-flyout-width, auto)',
      height: '100%',
      minWidth: '320px',
      maxWidth: 'var(--p-flyout-max-width, 1180px)',
      color: primaryColor, // enables color inheritance for slotted content
      background: backgroundColor,
      ...(isOpen
        ? {
            opacity: 1,
            transform: 'initial',
            transition: `${getTransition('opacity', 'long', 'in')}, ${getTransition('transform', 'long', 'in')}`,
          }
        : {
            opacity: 0,
            transform: `translate3d(${isPositionStart ? '-100%' : '100%'}, 0, 0)`,
            transition: `${getTransition('opacity', 'short', 'out', 'long')}, ${getTransition(
              'transform',
              'long',
              'out'
            )}`,
          }),
      boxShadow: `${isPositionStart ? '3px' : '-3px'} 0px 30px rgba(0, 0, 0, 0.25)`,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: primaryColorDark,
        background: backgroundColorDark,
      }),
    },
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 2,
      display: 'grid',
      gridTemplateColumns: `minmax(0, 1fr) ${spacingFluidLarge}`,
      alignItems: 'flex-start',
      padding: `${spacingStaticMedium} 0`,
      paddingInlineStart: spacingFluidLarge,
      background: backgroundColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        background: backgroundColorDark,
      }),
    },
    [headerShadowClass]: {
      boxShadow: `${isDark ? scrollShadowColorDark : scrollShadowColor} 0px 5px 10px`,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        boxShadow: `${scrollShadowColorDark} 0px 5px 10px`,
      }),
    },
    dismiss: {
      gridArea: '1 / 2',
      justifySelf: 'center',
    },
    content: {
      padding: contentPadding,
      position: 'relative',
      zIndex: 0,
      backgroundColor, // to ensure scrollbar coloring is optimal for light theme
      ...prefersColorSchemeDarkMediaQuery(theme, {
        backgroundColor: backgroundColorDark, // to ensure scrollbar coloring is optimal for dark theme
      }),
      // If sub-footer is used scroll shadows have to be done via JS
      ...(!hasSubFooter && {
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        backgroundImage: `linear-gradient(to top, ${backgroundColor}, ${backgroundColor}), linear-gradient(to top, ${backgroundColor}, ${backgroundColor}), linear-gradient(to top, ${shadowColor}, ${transparentColor}), linear-gradient(to bottom, ${shadowColor}, ${transparentColor})`,
        backgroundPosition: 'bottom center, top center, bottom center, top center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 20px, 100% 20px, 100% 10px, 100% 10px',
        backgroundAttachment: 'local, local, scroll, scroll',
        overscrollBehaviorY: 'none',
        ...prefersColorSchemeDarkMediaQuery(theme, {
          backgroundImage: `linear-gradient(to top, ${backgroundColorDark}, ${backgroundColorDark}), linear-gradient(to top, ${backgroundColorDark}, ${backgroundColorDark}), linear-gradient(to top, ${scrollShadowColorDark}, ${transparentColorDark}), linear-gradient(to bottom, ${scrollShadowColorDark}, ${transparentColorDark})`,
          backgroundColor: backgroundColorDark, // to ensure scrollbar coloring is optimal for dark theme
        }),
      }),
    },
    ...(hasFooter && {
      footer: {
        position: 'sticky',
        bottom: 0,
        zIndex: 1,
        padding: contentPadding,
        background: backgroundColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          background: backgroundColorDark,
        }),
      },
      [footerShadowClass]: {
        boxShadow: `${isDark ? scrollShadowColorDark : scrollShadowColor} 0px -5px 10px`,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          boxShadow: `${scrollShadowColorDark} 0px -5px 10px`,
        }),
      },
    }),
    ...(hasSubFooter && {
      'sub-footer': {
        padding: contentPadding,
      },
    }),
  });
};
