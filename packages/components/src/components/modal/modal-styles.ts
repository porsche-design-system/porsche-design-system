import type { JssStyle } from 'jss';
import type { GetJssStyleFunction, Theme } from '../../utils';
import {
  buildResponsiveStyles,
  getCss,
  isHighContrastMode,
  isThemeDark,
  mergeDeep,
  parseJSON,
  scrollShadowColor,
  scrollShadowColorDark,
} from '../../utils';
import type { Breakpoint } from '@porsche-design-system/utilities-v2';
import {
  borderRadiusMedium,
  borderWidthBase,
  breakpoints,
  getMediaQueryMin,
  gridExtendedOffsetBase,
  headingLargeStyle,
} from '@porsche-design-system/utilities-v2';
import type { BreakpointCustomizable } from '../../types';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getBackdropJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import { MODAL_Z_INDEX } from '../../constants';
import { type ModalBackdrop } from './modal-utils';

const cssVariableSpacingTop = '--p-modal-spacing-top';
const cssVariableSpacingBottom = '--p-modal-spacing-bottom';

const mediaQueryXl = getMediaQueryMin('xl');
const { primaryColor: darkThemePrimaryColor, contrastHighColor: darkThemeContrastHighColor } = getThemedColors('dark');

export const stretchToFullModalWidthClassName = 'stretch-to-full-modal-width';

const marginTopBottomFallback = 'clamp(16px, 7vh, 192px)';
const marginTopBottomXlandXxlFallback = 'min(192px, 10vh)';
export const footerShadowClass = 'footer--shadow';

export const getFullscreenJssStyles: GetJssStyleFunction = (fullscreen: boolean): JssStyle => {
  return fullscreen
    ? {
        minWidth: '100%',
        maxWidth: 'none',
        minHeight: '100%',
        margin: 0,
        borderRadius: 0,
      }
    : {
        minWidth: '276px', // on viewport 320px: calc(${gridColumnWidthBase} * 6 + ${gridGap} * 5)
        maxWidth: '1535.5px', // on viewport 1920px: `calc(${gridColumnWidthXXL} * 14 + ${gridGap} * 13)`
        minHeight: 'auto',
        margin: `var(${cssVariableSpacingTop},${marginTopBottomFallback}) ${gridExtendedOffsetBase} var(${cssVariableSpacingBottom},${marginTopBottomFallback})`,
        borderRadius: borderRadiusMedium,
      };
};

export const isFullscreenForXl = (fullscreen: BreakpointCustomizable<boolean>): boolean => {
  const fullscreenParsed = parseJSON(fullscreen);

  if (typeof fullscreenParsed === 'boolean') {
    return fullscreenParsed;
  } else {
    const entries = Object.entries(fullscreenParsed) as [Breakpoint, boolean][];
    const [lastTrueBreakpoint] = entries.filter(([, val]) => val).pop() || [];
    const [lastFalseBreakpoint] = entries.filter(([, val]) => !val).pop() || [];

    return breakpoints.indexOf(lastTrueBreakpoint) > breakpoints.indexOf(lastFalseBreakpoint);
  }
};

const getSlottedJssStyle = (marginValue: number, hasHeader: boolean, hasDismissButton: boolean): JssStyle => {
  const marginPx = `${-marginValue}px`;
  return {
    [`&(.${stretchToFullModalWidthClassName})`]: {
      width: `calc(100% + ${marginValue * 2}px)`,
      margin: `0 ${marginPx}`,
    },
    ...(!hasHeader && {
      [`&(.${stretchToFullModalWidthClassName}:first-child)`]: {
        marginTop: hasDismissButton ? `${-marginValue / 16}rem` : marginPx,
      },
    }),
    [`&(.${stretchToFullModalWidthClassName}:last-child)`]: {
      marginBottom: marginPx,
    },
  };
};

export const getComponentCss = (
  isOpen: boolean,
  backdrop: ModalBackdrop,
  isFullscreen: BreakpointCustomizable<boolean>,
  hasDismissButton: boolean,
  hasHeader: boolean,
  hasFooter: boolean,
  theme: Theme
): string => {
  const { primaryColor, backgroundColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark, backgroundColor: backgroundColorDark } = getThemedColors('dark');
  const isFullscreenForXlAndXxl = isFullscreenForXl(isFullscreen);
  const duration = isOpen ? 'moderate' : 'short';
  const easing = isOpen ? 'in' : 'out';
  const contentPadding = '32px';

  return getCss({
    '@global': {
      ':host': {
        overflowY: 'auto', // overrideable
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
          ...getBackdropJssStyle(isOpen, MODAL_Z_INDEX, theme, duration, backdrop),
        }),
      },
      '::slotted': addImportantToEachRule(
        mergeDeep(
          getSlottedJssStyle(32, hasHeader, hasDismissButton),
          buildResponsiveStyles(isFullscreen, (fullscreenValue: boolean) => ({
            [`&(.${stretchToFullModalWidthClassName}`]: {
              '&:first-child)': {
                borderRadius: fullscreenValue ? 0 : '8px 8px 0 0',
              },
              '&:last-child)': {
                borderRadius: fullscreenValue ? 0 : '0 0 8px 8px',
              },
            },
          }))
        )
      ),
      h2: {
        ...headingLargeStyle,
        margin: 0,
        color: primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: primaryColorDark,
        }),
      },
    },
    'scroll-container': {
      display: 'flex',
      inset: 0, // TODO: is this still needed?
      height: '100%',
      overflowY: 'inherit',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    root: mergeDeep(
      {
        color: primaryColor, // enables color inheritance for slotted content
        position: 'relative',
        boxSizing: 'border-box',
        transform: isOpen ? 'translateY(0%)' : 'translateY(25%)',
        opacity: isOpen ? 1 : 0,
        transition: `${getTransition('opacity', duration, easing)}, ${getTransition('transform', duration, easing)}`,
        paddingTop: hasDismissButton ? '2rem' : contentPadding, // rem value needed to prevent overlapping of close button and contents in scaling mode
        ...(!hasFooter && { paddingBottom: contentPadding }),
        background: backgroundColor,
        outline: isHighContrastMode ? '1px solid transparent' : 0,
        // TODO: getFocusJssStyle() can't be re-used atm, but as soon as component is refactored to `<dialog />` then no
        //  focus should be necessary at all because focus is auto forwarded to dismiss button.
        // ::after to be above sticky footer without z-index games
        '&:focus::after': {
          content: '""',
          position: 'fixed',
          border: `${borderWidthBase} solid`,
          pointerEvents: 'none', // fix text selection in focus state
          ...buildResponsiveStyles(isFullscreen, (fullscreenValue: boolean) => ({
            borderRadius: fullscreenValue ? 0 : '12px',
            borderColor: fullscreenValue ? primaryColor : darkThemePrimaryColor,
            inset: fullscreenValue ? 0 : '-4px',
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: darkThemePrimaryColor,
            }),
          })),
        },
        '&:not(:focus-visible)::before': {
          border: 0,
        },
        [mediaQueryXl]: {
          margin: isFullscreenForXlAndXxl
            ? 0
            : `var(${cssVariableSpacingTop},${marginTopBottomXlandXxlFallback}) ${gridExtendedOffsetBase} var(${cssVariableSpacingBottom},${marginTopBottomXlandXxlFallback})`,
        },
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: primaryColorDark,
          background: backgroundColorDark,
        }),
      },
      buildResponsiveStyles(isFullscreen, getFullscreenJssStyles) as any // potentially needs to be merged with mediaQueryXl
    ),
    ...(hasHeader && {
      header: {
        padding: `0 ${contentPadding} 8px`,
      },
    }),
    content: {
      ...(hasFooter && {
        position: 'relative', // to make sure content isn't above sticky footer, but might affect consumer's absolute positioning
        zIndex: 0,
      }),
      padding: `0 ${contentPadding}`,
    },
    ...(hasFooter && {
      footer: {
        position: 'sticky',
        background: backgroundColor,
        padding: contentPadding,
        bottom: 0,
        borderBottomLeftRadius: borderRadiusMedium,
        borderBottomRightRadius: borderRadiusMedium,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          background: backgroundColorDark,
        }),
      },
      [footerShadowClass]: {
        boxShadow: `${isThemeDark(theme) ? scrollShadowColorDark : scrollShadowColor} 0 -5px 10px`,
        clipPath: 'inset(-20px 0 0 0)', // crop leaking box-shadow on left and right side
        ...prefersColorSchemeDarkMediaQuery(theme, {
          boxShadow: `${scrollShadowColorDark} 0 -5px 10px`,
        }),
      },
    }),
    ...(hasDismissButton && {
      controls: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        left: '8px',
        display: 'flex',
        justifyContent: 'flex-end',
        zIndex: 1, // To assure controls are on top when using stretchToFullModalWidthClassName and transformed slotted content
      },
      dismiss: {
        border: `2px solid ${backgroundColor}`, // needed to enlarge button slightly without affecting the hover area (are equal now).
        borderRadius: '4px',
        background: backgroundColor,
        ...hoverMediaQuery({
          '&:hover': {
            background: darkThemeContrastHighColor,
            borderColor: darkThemeContrastHighColor,
          },
        }),
        ...prefersColorSchemeDarkMediaQuery(theme, {
          background: backgroundColorDark,
          borderColor: backgroundColorDark,
        }),
      },
    }),
  });
};
