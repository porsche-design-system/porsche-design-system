import { getCss, isThemeDark, scrollShadowColor, scrollShadowColorDark, type Theme } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getBackdropJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import { FLYOUT_Z_INDEX } from '../../constants';
import { gridGap, spacingFluidLarge, spacingStaticMedium } from '@porsche-design-system/utilities-v2';
import type { FlyoutPosition } from './flyout-utils';
import { getFlyoutDialogResetStyles } from '../../styles/flyout-dialog-reset-styles';

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

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          // needed for correct alignment of the Porsche Grid within the Flyout
          '--pds-internal-grid-outer-column': `calc(${spacingFluidLarge} - ${gridGap})`,
          '--pds-internal-grid-margin': `calc(${spacingFluidLarge} * -1)`,
          ...getBackdropJssStyle(isOpen, FLYOUT_Z_INDEX, theme),
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      dialog: {
        ...getFlyoutDialogResetStyles(),
        insetInline: isPositionStart ? '0 0' : 'auto 0',
        insetBlock: '0 0',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        width: 'var(--p-flyout-width, fit-content)',
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
        '&:focus-visible': {
          outline: 'none', // ua-style reset
        },
        '&::backdrop': {
          // to improve browser backwards compatibility we visually style the backdrop on the :host,
          // although it's not on the #top-layer like it would be for modern browsers supporting ::backdrop
          opacity: 0, // to support backdrop click for modern browsers supporting ::backdrop
        },
      },
    },
    wrapper: {
      display: 'flex', // ua-style reset
      flexGrow: 1,
      height: 0,
      flexDirection: 'column',
      ...(hasSubFooter && {
        overflowY: 'auto',
        overscrollBehaviorY: 'none',
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
      maxWidth: `calc(100vw - calc(${spacingFluidLarge} * 2))`,
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
