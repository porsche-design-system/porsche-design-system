import { getCss, isThemeDark, type Theme } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  breakpointS,
  getMediaQueryMin,
  gridGap,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingStaticSmall,
  textSmallStyle,
  textXSmallStyle,
} from '@porsche-design-system/styles';

// TODO: styling needs to be cleaned up

const cssVarSidebarStartWidth = '--p-canvas-sidebar-start-width';
const cssVarSidebarEndWidth = '--p-canvas-sidebar-end-width';
const cssVarGridColumns = '--p-canvas-grid-columns';
const cssVarGridMaxWidth = '--p-canvas-grid-max-width';

const spacingBase = gridGap.replace('36px', '24px');
const mainGridColumnGap = gridGap.replace('36px', '24px').replace('vw', 'cqw');
// const mainGridRowGap = gridGap.replace('vw', 'cqw');
const mediaQueryTabletView = getMediaQueryMin('s');
const mediaQueryDesktopView = getMediaQueryMin('m');
const sidebarWidth = '320px';

const sidebarStartWidth = `var(${cssVarSidebarStartWidth}, ${sidebarWidth})`;
const sidebarEndWidth = `var(${cssVarSidebarEndWidth}, ${sidebarWidth})`;

const sidebarTransition = getTransition('margin');

const borderRadius = '16px';

const headerPadding = spacingStaticSmall;

const headerMinHeight = '56px';

export const getComponentCss = (theme: Theme, isSidebarStartOpen: boolean, isSidebarEndOpen: boolean): string => {
  const { primaryColor, backgroundColor, backgroundSurfaceColor, contrastLowColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    backgroundColor: backgroundColorDark,
    backgroundSurfaceColor: backgroundSurfaceColorDark,
    contrastLowColor: contrastLowColorDark,
  } = getThemedColors('dark');

  const footerGradientDark = '0%';
  const footerGradient = isThemeDark(theme) ? footerGradientDark : '100%';

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
          containerType: 'inline-size',
          marginInlineStart: isSidebarStartOpen ? sidebarStartWidth : 0,
          marginInlineEnd: isSidebarEndOpen ? sidebarEndWidth : 0,
          transition: sidebarTransition,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      '::slotted': {
        '&([slot*="header"])': {
          display: 'flex',
          alignItems: 'center',
          gap: spacingStaticSmall,
        },
      },
      'slot[name="background"]': {
        display: 'block',
        gridArea: '1/1/-1/-1',
        position: 'sticky',
        top: 0,
        zIndex: 0,
        width: '100dvw',
        height: '100dvh',
        pointerEvents: 'none',
        overflow: 'hidden',
        transform: 'translate3d(0,0,0)', // needed for Safari to force GPU acceleration
        '&::slotted(video), &::slotted(img)': {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: getTransition('opacity', 'veryLong'),
        },
      },
      'slot[name="title"]::slotted(a)': {
        textDecoration: 'none',
        color: 'inherit',
      },
      'slot[name="sidebar-start"]': {
        display: 'block',
        marginTop: spacingFluidMedium,
        [mediaQueryTabletView]: {
          marginTop: 0,
        },
      },
      h2: {
        ...textXSmallStyle,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        margin: 0,
        color: primaryColor,
        textTransform: 'uppercase',
        letterSpacing: '2px',
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: primaryColorDark,
        }),
      },
      'header, main, footer, aside': {
        padding: spacingBase,
        boxSizing: 'border-box',
        zIndex: 0,
      },
      header: {
        paddingBlock: headerPadding,
        gridArea: 'header',
        position: 'sticky',
        minHeight: headerMinHeight,
        boxSizing: 'border-box',
        top: 0,
        zIndex: 100,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
        gap: spacingBase,
        alignItems: 'center',
      },
      'header .blur-layers': {
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        height: '100%',
        width: '100%',
      },
      'header .blur-layers:before': {
        content: '""',
        zIndex: 1,
        WebkitBackdropFilter: 'blur(64px)',
        backdropFilter: 'blur(64px)',
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0, 0, 0, 100%) 0%, rgba(0, 0, 0, 1) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0) 37.5%)', // Safari prefix
        maskImage:
          'linear-gradient(to bottom, rgba(0, 0, 0, 100%) 0%, rgba(0, 0, 0, 1) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0) 37.5%)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      'header .blur-layers > div': {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      'header .blur-layers > div:nth-of-type(1)': {
        zIndex: 2,
        WebkitBackdropFilter: 'blur(32px)',
        backdropFilter: 'blur(32px)',
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0, 0, 0, 0) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 0) 50%)',
        maskImage:
          'linear-gradient(to bottom, rgba(0, 0, 0, 0) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 0) 50%)',
      },
      'header .blur-layers > div:nth-of-type(2)': {
        zIndex: 3,
        WebkitBackdropFilter: 'blur(16px)',
        backdropFilter: 'blur(16px)',
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 62.5%)',
        maskImage:
          'linear-gradient(to bottom, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 62.5%)',
      },
      'header .blur-layers > div:nth-of-type(3)': {
        zIndex: 4,
        WebkitBackdropFilter: 'blur(8px)',
        backdropFilter: 'blur(8px)',
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0, 0, 0, 0) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 0) 75%)',
        maskImage:
          'linear-gradient(to bottom, rgba(0, 0, 0, 0) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 0) 75%)',
      },
      'header .blur-layers > div:nth-of-type(4)': {
        zIndex: 5,
        WebkitBackdropFilter: 'blur(4px)',
        backdropFilter: 'blur(4px)',
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 87.5%)',
        maskImage:
          'linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 87.5%)',
      },
      'header .blur-layers > div:nth-of-type(5)': {
        zIndex: 6,
        WebkitBackdropFilter: 'blur(2px)',
        backdropFilter: 'blur(2px)',
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0, 0, 0, 0) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 0) 100%)',
        maskImage:
          'linear-gradient(to bottom, rgba(0, 0, 0, 0) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 0) 100%)',
      },
      'header .blur-layers > div:nth-of-type(6)': {
        zIndex: 7,
        WebkitBackdropFilter: 'blur(1px)',
        backdropFilter: 'blur(1px)',
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 1) 100%)',
        maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 1) 100%)',
      },
      'header .blur-layers:after': {
        content: '""',
        zIndex: 8,
        WebkitBackdropFilter: 'blur(0.5px)',
        backdropFilter: 'blur(0.5px)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 87.5%, rgba(0, 0, 0, 1) 100%)',
        maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 87.5%, rgba(0, 0, 0, 1) 100%)',
      },
      'main, footer': {
        display: 'grid',
        gridTemplateColumns: `repeat(var(${cssVarGridColumns}, 12), minmax(0, 1fr))`,
        columnGap: mainGridColumnGap,
        alignContent: 'flex-start',
        maxWidth: `var(${cssVarGridMaxWidth}, none)`,
        marginInline: 'auto',
      },
      main: {
        zIndex: 10,
        gridArea: 'main',
        width: '100%',
      },
      footer: {
        position: 'sticky',
        bottom: 0,
        width: '100%',
        gridArea: 'footer',
        zIndex: 200,
        paddingBottom: spacingFluidSmall,
        '&::before': {
          content: '""',
          zIndex: '-1',
          position: 'absolute',
          inset: '-140px -50dvw 0',
          pointerEvents: 'none',
          background: `linear-gradient(to bottom, hsla(0, 0%, ${footerGradient}, 0) 0%, hsla(0, 0%, ${footerGradient}, 0.013) 8.1%, hsla(0, 0%, ${footerGradient}, 0.049) 15.5%, hsla(0, 0%, ${footerGradient}, 0.104) 22.5%, hsla(0, 0%, ${footerGradient}, 0.175) 29%, hsla(0, 0%, ${footerGradient}, 0.259) 35.3%, hsla(0, 0%, ${footerGradient}, 0.352) 41.2%, hsla(0, 0%, ${footerGradient}, 0.45) 47.1%, hsla(0, 0%, ${footerGradient}, 0.55) 52.9%, hsla(0, 0%, ${footerGradient}, 0.648) 58.8%, hsla(0, 0%, ${footerGradient}, 0.741) 64.7%, hsla(0, 0%, ${footerGradient}, 0.825) 71%, hsla(0, 0%, ${footerGradient}, 0.896) 77.5%, hsla(0, 0%, ${footerGradient}, 0.951) 84.5%, hsla(0, 0%, ${footerGradient}, 0.987) 91.9%, hsl(0, 0%, ${footerGradient}) 100%)`,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            background: `linear-gradient(to bottom, hsla(0, 0%, ${footerGradientDark}, 0) 0%, hsla(0, 0%, ${footerGradientDark}, 0.013) 8.1%, hsla(0, 0%, ${footerGradientDark}, 0.049) 15.5%, hsla(0, 0%, ${footerGradientDark}, 0.104) 22.5%, hsla(0, 0%, ${footerGradientDark}, 0.175) 29%, hsla(0, 0%, ${footerGradientDark}, 0.259) 35.3%, hsla(0, 0%, ${footerGradientDark}, 0.352) 41.2%, hsla(0, 0%, ${footerGradientDark}, 0.45) 47.1%, hsla(0, 0%, ${footerGradientDark}, 0.55) 52.9%, hsla(0, 0%, ${footerGradientDark}, 0.648) 58.8%, hsla(0, 0%, ${footerGradientDark}, 0.741) 64.7%, hsla(0, 0%, ${footerGradientDark}, 0.825) 71%, hsla(0, 0%, ${footerGradientDark}, 0.896) 77.5%, hsla(0, 0%, ${footerGradientDark}, 0.951) 84.5%, hsla(0, 0%, ${footerGradientDark}, 0.987) 91.9%, hsl(0, 0%, ${footerGradientDark}) 100%)`,
          }),
        },
      },
      aside: {
        zIndex: 200,
        transition: sidebarTransition,
        position: 'sticky',
        top: 0,
        height: '100dvh',
      },
    },
    scroller: {
      position: 'absolute',
      inset: 0,
      padding: spacingBase,
      overflow: 'hidden auto',
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
      gap: spacingBase,
    },
    'sidebar-header': {
      display: 'flex',
      gap: spacingStaticSmall,
      alignItems: 'center',
      justifyContent: 'var(--p-internal-justify)',
      position: 'sticky',
      top: `calc(${spacingBase} * -1)`,
      padding: `${headerPadding} ${spacingBase}`,
      marginBlockStart: `calc(${spacingBase} * -1)`,
      marginInline: `calc(${spacingBase} * -1)`,
      zIndex: 1,
      minHeight: headerMinHeight,
      boxSizing: 'border-box',
      '&::before': {
        content: '""',
        zIndex: '-1',
        position: 'absolute',
        inset: '0 0 -8px',
        background: 'var(--p-internal-gradient)',
        pointerEvents: 'none',
      },
    },
    'sidebar-start': {
      '--p-internal-gradient': `linear-gradient(180deg, ${backgroundSurfaceColor} 0%, ${backgroundSurfaceColor} 65%, rgba(255,255,255,0) 100%)`,
      '--p-internal-justify': 'flex-start',
      backgroundColor: backgroundSurfaceColor,
      gridArea: 'sidebar-start',
      width: sidebarStartWidth,
      marginInlineStart: isSidebarStartOpen
        ? 0
        : `calc((var(${cssVarSidebarStartWidth}, ${sidebarWidth}) + ${borderRadius}) * -1)`,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        '--p-internal-gradient': `linear-gradient(180deg, ${backgroundSurfaceColorDark} 0%, ${backgroundSurfaceColorDark} 65%, rgba(255,255,255,0) 100%)`,
        backgroundColor: backgroundSurfaceColorDark,
      }),
      '&::before': {
        content: '""',
        zIndex: '-1',
        position: 'absolute',
        backgroundColor: 'transparent',
        right: `-${borderRadius}`,
        height: `calc(${borderRadius} * 2)`,
        width: borderRadius,
        pointerEvents: 'none',
        top: 0,
        borderTopLeftRadius: borderRadius,
        boxShadow: `0 -${borderRadius} 0 0 ${backgroundSurfaceColor}`,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          boxShadow: `0 -${borderRadius} 0 0 ${backgroundSurfaceColorDark}`,
        }),
      },
    },
    'sidebar-end': {
      '--p-internal-gradient': `linear-gradient(180deg, ${backgroundColor} 0%, ${backgroundColor} 65%, rgba(255,255,255,0) 100%)`,
      '--p-internal-justify': 'flex-end',
      borderInlineStart: `1px solid ${contrastLowColor}`,
      backgroundColor,
      gridArea: 'sidebar-end',
      width: sidebarEndWidth,
      marginInlineEnd: isSidebarEndOpen ? 0 : `calc(var(${cssVarSidebarEndWidth}, ${sidebarWidth}) * -1)`,
      overflow: 'hidden auto',
      ...prefersColorSchemeDarkMediaQuery(theme, {
        borderColor: contrastLowColorDark,
        backgroundColor: backgroundColorDark,
        '--p-internal-gradient': `linear-gradient(180deg, ${backgroundColorDark} 0%, ${backgroundColorDark} 65%, rgba(255,255,255,0) 100%)`,
      }),
    },
    canvas: {
      marginInlineStart: isSidebarStartOpen ? `calc(${sidebarStartWidth} * -1)` : 0,
      marginInlineEnd: isSidebarEndOpen ? `calc(${sidebarEndWidth} * -1)` : 0,
      transition: sidebarTransition,
      display: 'grid',
      gridTemplateRows: 'auto minmax(0, 1fr) auto',
      gridTemplateAreas: '"header" "main" "footer"',
      minWidth: '320px',
      minHeight: '100dvh',
      font: textSmallStyle.font,
      color: primaryColor,
      backgroundColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: primaryColorDark,
        backgroundColor: backgroundColorDark,
      }),
      [mediaQueryTabletView]: {
        gridTemplate: 'auto minmax(0, 1fr) / auto minmax(0, 1fr) auto',
        gridTemplateAreas: '"sidebar-start header" "sidebar-start main" "sidebar-start footer"',
      },
      [mediaQueryDesktopView]: {
        gridTemplate: 'auto minmax(0, 1fr) auto / auto minmax(0, 1fr) auto',
        gridTemplateAreas:
          '"sidebar-start header sidebar-end" "sidebar-start main sidebar-end" "sidebar-start footer sidebar-end"',
      },
    },
    crest: {
      [`@container(min-width:${breakpointS}px)`]: {
        display: 'none',
      },
    },
    wordmark: {
      height: '10px',
      [`@container(max-width:${breakpointS - 1}px)`]: {
        display: 'none',
      },
    },
    header: {
      display: 'flex',
      gap: spacingStaticSmall,
      alignItems: 'center',
      '&:last-of-type': {
        justifyContent: 'end',
      },
    },
    'flyout-start': {
      // TODO: why does the flyout component has a fixed min-width defined, should be a CSS variable too?
      '--p-flyout-width': '100dvw',
      '--p-flyout-max-width': sidebarStartWidth,
    },
    'flyout-end': {
      // TODO: why does the flyout component has a fixed min-width defined, should be a CSS variable too?
      '--p-flyout-width': '100dvw',
      '--p-flyout-max-width': sidebarEndWidth,
    },
  });
};
