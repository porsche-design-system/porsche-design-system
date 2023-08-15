import type { JssStyle } from 'jss';
import type { GetJssStyleFunction } from '../../utils';
import {
  buildResponsiveStyles,
  getCss,
  isHighContrastMode,
  mergeDeep,
  parseJSON,
  scrollShadowColor,
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
  getFrostedGlassBackgroundJssStyles,
  getInsetJssStyle,
  getThemedColors,
  hostHiddenStyles,
  hoverMediaQuery,
  pxToRemWithUnit,
} from '../../styles';
import { MODAL_Z_INDEX } from '../../constants';

const mediaQueryXl = getMediaQueryMin('xl');
const { backgroundColor, primaryColor: lightThemePrimaryColor } = getThemedColors('light');
const { primaryColor: darkThemePrimaryColor, contrastHighColor: darkThemeContrastHighColor } = getThemedColors('dark');

const transitionTimingFunction = 'cubic-bezier(.16,1,.3,1)';
export const stretchToFullModalWidthClassName = 'stretch-to-full-modal-width';

const marginTopBottom = 'clamp(16px, 7vh, 192px)';
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
        margin: `${marginTopBottom} ${gridExtendedOffsetBase}`,
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
        marginTop: hasDismissButton ? pxToRemWithUnit(-marginValue) : marginPx,
      },
    }),
    [`&(.${stretchToFullModalWidthClassName}:last-child)`]: {
      marginBottom: marginPx,
    },
  };
};

export const getComponentCss = (
  isOpen: boolean,
  isFullscreen: BreakpointCustomizable<boolean>,
  hasDismissButton: boolean,
  hasHeader: boolean,
  hasFooter: boolean
): string => {
  const isFullscreenForXlAndXxl = isFullscreenForXl(isFullscreen);
  const duration = isOpen ? '.6s' : '.2s';
  const contentPadding = '32px';

  return getCss({
    '@global': {
      ':host': {
        ...addImportantToEachRule({
          position: 'fixed',
          ...getInsetJssStyle(),
          zIndex: MODAL_Z_INDEX,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          ...(isOpen
            ? {
                visibility: 'inherit',
              }
            : {
                visibility: 'hidden',
                transition: 'visibility 0s linear .2s',
              }),
          ...hostHiddenStyles,
          ...getFrostedGlassBackgroundJssStyles(isOpen, duration),
        }),
        overflowY: 'auto', // overrideable
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
        color: lightThemePrimaryColor,
      },
    },
    root: mergeDeep(
      {
        position: 'relative',
        boxSizing: 'border-box',
        transform: isOpen ? 'scale3d(1,1,1)' : 'scale3d(.9,.9,1)',
        opacity: isOpen ? 1 : 0,
        transition: `opacity ${duration} ${transitionTimingFunction},transform ${duration} ${transitionTimingFunction}`,
        paddingTop: hasDismissButton ? pxToRemWithUnit(32) : contentPadding, // rem value needed to prevent overlapping of close button and contents in scaling mode
        ...(!hasFooter && { paddingBottom: contentPadding }),
        background: backgroundColor,
        outline: isHighContrastMode ? '1px solid transparent' : 0,
        '&:focus::before': {
          content: '""',
          position: 'fixed',
          border: `${borderWidthBase} solid`,
          pointerEvents: 'none', // fix text selection in focus state
          ...buildResponsiveStyles(isFullscreen, (fullscreenValue: boolean) => ({
            borderRadius: fullscreenValue ? 0 : '12px',
            borderColor: fullscreenValue ? lightThemePrimaryColor : darkThemePrimaryColor,
            ...getInsetJssStyle(fullscreenValue ? 0 : -4),
          })),
        },
        '&:not(:focus-visible)::before': {
          border: 0,
        },
        [mediaQueryXl]: {
          margin: isFullscreenForXlAndXxl ? 0 : `min(192px, 10vh) ${gridExtendedOffsetBase}`,
        },
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
      },
      [footerShadowClass]: {
        boxShadow: `${scrollShadowColor} 0 -5px 10px`,
        clipPath: 'inset(-20px 0 0 0)', // crop leaking box-shadow on left and right side
      },
    }),
    ...(hasDismissButton && {
      dismiss: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        border: `2px solid ${backgroundColor}`, // needed to enlarge button slightly without affecting the hover area (are equal now).
        borderRadius: '4px',
        background: backgroundColor,
        ...hoverMediaQuery({
          '&:hover': {
            background: darkThemeContrastHighColor,
            borderColor: darkThemeContrastHighColor,
          },
        }),
      },
    }),
  });
};
