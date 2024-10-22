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
  spacingFluidSmall,
  spacingStaticSmall,
  textSmallStyle,
  textXSmallStyle,
} from '@porsche-design-system/styles';

// public css variables
const cssVarSidebarStartWidth = '--p-canvas-sidebar-start-width';
const cssVarSidebarEndWidth = '--p-canvas-sidebar-end-width';
const cssVarGridColumns = '--p-canvas-grid-columns';
const cssVarGridMaxWidth = '--p-canvas-grid-max-width';

// private css variables
const cssVarColorPrimary = '--_a';
const cssVarColorBackgroundBase = '--_b';
const cssVarColorBackgroundSurface = '--_c';
const cssVarColorContrastLow = '--_d';
const cssVarColorFooterGradient = '--_e';
const cssVarTemplateSidebarStartWidth = '--_f';
const cssVarTemplateSidebarEndWidth = '--_g';

// media queries
const mediaQueryS = getMediaQueryMin('s');
const mediaQueryM = getMediaQueryMin('m');

// others
const sidebarStartWidth = `var(${cssVarSidebarStartWidth}, 320px)`;
const sidebarEndWidth = `var(${cssVarSidebarEndWidth}, 320px)`;
const spacingBase = gridGap.replace('36px', '24px');

export const getComponentCss = (theme: Theme, isSidebarStartOpen: boolean, isSidebarEndOpen: boolean): string => {
  const { primaryColor, backgroundColor, backgroundSurfaceColor, contrastLowColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    backgroundColor: backgroundColorDark,
    backgroundSurfaceColor: backgroundSurfaceColorDark,
    contrastLowColor: contrastLowColorDark,
  } = getThemedColors('dark');

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      slot: {
        '&[name="title"]::slotted(a)': {
          textDecoration: 'none',
          color: 'inherit',
        },
        '&[name="header-start"], &[name="header-end"]': {
          display: 'flex',
          alignItems: 'center',
          gap: spacingStaticSmall,
        },
        '&[name="sidebar-start"], &[name="sidebar-end"]': {
          display: 'block',
          zIndex: 0,
        },
        '&[name="background"]': {
          display: 'block',
          gridArea: '1/1/-1/-1',
          position: 'sticky',
          top: 0,
          zIndex: 2,
          height: '100dvh',
          pointerEvents: 'none',
          overflow: 'hidden',
          transform: 'translate3d(0,0,0)', // needed for Safari to force GPU acceleration
          [mediaQueryS]: {
            gridColumn: '2/3',
          },
          '&::slotted(video), &::slotted(img)': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: getTransition('opacity', 'veryLong'),
            pointerEvents: 'none',
          },
        },
      },
      '::slotted(.-p-canvas-grid)': {
        display: 'grid',
        gridTemplateColumns: `repeat(var(${cssVarGridColumns}, 12), minmax(0, 1fr))`,
        columnGap: spacingBase,
        alignContent: 'flex-start',
        maxWidth: `var(${cssVarGridMaxWidth}, none)`,
        marginInline: 'auto',
        containerType: 'inline-size',
      },
      h2: {
        font: textXSmallStyle.font,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        margin: 0,
        textTransform: 'uppercase',
        letterSpacing: '2px',
      },
    },
    root: {
      [cssVarColorPrimary]: primaryColor,
      [cssVarColorBackgroundBase]: backgroundColor,
      [cssVarColorBackgroundSurface]: backgroundSurfaceColor,
      [cssVarColorContrastLow]: contrastLowColor,
      [cssVarColorFooterGradient]: `0, 0%, ${isThemeDark(theme) ? '0%' : '100%'}`,
      [cssVarTemplateSidebarStartWidth]: isSidebarStartOpen ? sidebarStartWidth : '0px',
      [cssVarTemplateSidebarEndWidth]: isSidebarEndOpen ? sidebarEndWidth : '0px',
      zIndex: 0,
      display: 'grid',
      gridTemplateRows: 'auto minmax(0, 1fr) auto',
      gridTemplateAreas: '"header" "main" "footer"',
      minWidth: '320px',
      minHeight: '100dvh',
      font: textSmallStyle.font,
      color: `var(${cssVarColorPrimary})`,
      background: `var(${cssVarColorBackgroundBase})`,
      transition: getTransition('grid-template-columns'),
      ...prefersColorSchemeDarkMediaQuery(theme, {
        [cssVarColorPrimary]: primaryColorDark,
        [cssVarColorBackgroundBase]: backgroundColorDark,
        [cssVarColorBackgroundSurface]: backgroundSurfaceColorDark,
        [cssVarColorContrastLow]: contrastLowColorDark,
        [cssVarColorFooterGradient]: '0, 0%, 0%',
      }),
      [mediaQueryS]: {
        gridTemplateColumns: `var(${cssVarTemplateSidebarStartWidth}) minmax(0, 1fr)`,
        gridTemplateAreas: '"sidebar-start header" "sidebar-start main" "sidebar-start footer"',
      },
      [mediaQueryM]: {
        gridTemplateColumns: `var(${cssVarTemplateSidebarStartWidth}) minmax(0, 1fr) var(${cssVarTemplateSidebarEndWidth})`,
        gridTemplateAreas:
          '"sidebar-start header sidebar-end" "sidebar-start main sidebar-end" "sidebar-start footer sidebar-end"',
      },
      '&::before': {
        [mediaQueryM]: {
          zIndex: 2,
          content: '""',
          gridArea: '1 / 2 / -1 / 3',
          boxShadow: `1px 0 0 0 var(${cssVarColorContrastLow})`,
          background: `var(${cssVarColorBackgroundBase})`,
          pointerEvents: 'none',
        },
      },
    },
    header: {
      containerType: 'inline-size',
      zIndex: 10,
      gridArea: 'header',
      position: 'sticky',
      minHeight: '56px',
      boxSizing: 'border-box',
      top: 0,
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
      gap: spacingBase,
      alignItems: 'center',
      paddingBlock: spacingStaticSmall,
      paddingInline: spacingBase,
      '&__area': {
        display: 'flex',
        gap: spacingStaticSmall,
        alignItems: 'center',
        '&--start': {
          justifyContent: 'flex-start',
        },
        '&--end': {
          justifyContent: 'flex-end',
        },
      },
      '&__crest': {
        [`@container(min-width:${breakpointS}px)`]: {
          display: 'none',
        },
      },
      '&__wordmark': {
        height: '10px',
        [`@container(max-width:${breakpointS - 1}px)`]: {
          display: 'none',
        },
      },
    },
    main: {
      zIndex: 5,
      gridArea: 'main',
      padding: spacingBase,
    },
    footer: {
      zIndex: 7,
      gridArea: 'footer',
      position: 'sticky',
      bottom: 0,
      paddingBottom: spacingFluidSmall,
      padding: spacingBase,
      boxSizing: 'border-box',
      '&::before': {
        content: '""',
        zIndex: '-1',
        position: 'absolute',
        inset: '-140px 0 0',
        pointerEvents: 'none',
        background: `linear-gradient(to bottom, hsla(var(${cssVarColorFooterGradient}), 0) 0%, hsla(var(${cssVarColorFooterGradient}), 0.013) 8.1%, hsla(var(${cssVarColorFooterGradient}), 0.049) 15.5%, hsla(var(${cssVarColorFooterGradient}), 0.104) 22.5%, hsla(var(${cssVarColorFooterGradient}), 0.175) 29%, hsla(var(${cssVarColorFooterGradient}), 0.259) 35.3%, hsla(var(${cssVarColorFooterGradient}), 0.352) 41.2%, hsla(var(${cssVarColorFooterGradient}), 0.45) 47.1%, hsla(var(${cssVarColorFooterGradient}), 0.55) 52.9%, hsla(var(${cssVarColorFooterGradient}), 0.648) 58.8%, hsla(var(${cssVarColorFooterGradient}), 0.741) 64.7%, hsla(var(${cssVarColorFooterGradient}), 0.825) 71%, hsla(var(${cssVarColorFooterGradient}), 0.896) 77.5%, hsla(var(${cssVarColorFooterGradient}), 0.951) 84.5%, hsla(var(${cssVarColorFooterGradient}), 0.987) 91.9%, hsl(var(${cssVarColorFooterGradient})) 100%)`,
      },
    },
    sidebar: {
      zIndex: 1,
      position: 'sticky',
      top: 0,
      height: '100dvh',
      '&--start': {
        zIndex: 5,
        gridArea: 'sidebar-start',
        justifySelf: 'flex-end',
        width: sidebarStartWidth,
        backgroundColor: `var(${cssVarColorBackgroundSurface})`,
        '&::before': {
          content: '""',
          zIndex: '-1',
          position: 'absolute',
          backgroundColor: 'transparent',
          right: '-16px',
          height: '32px',
          width: '16px',
          pointerEvents: 'none',
          top: 0,
          borderTopLeftRadius: '16px',
          boxShadow: `0 -16px 0 0 var(${cssVarColorBackgroundSurface})`,
        },
      },
      '&--end': {
        gridArea: 'sidebar-end',
        justifySelf: 'flex-end',
        width: sidebarEndWidth,
        backgroundColor: `var(${cssVarColorBackgroundBase})`,
      },
      '&__scroller': {
        position: 'absolute',
        inset: 0,
        padding: spacingBase,
        overflow: 'hidden auto',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gap: spacingBase,
      },
      '&__header': {
        display: 'flex',
        gap: spacingStaticSmall,
        alignItems: 'center',
        position: 'sticky',
        top: `calc(${spacingBase} * -1)`,
        padding: `${spacingStaticSmall} ${spacingBase}`,
        marginBlockStart: `calc(${spacingBase} * -1)`,
        marginInline: `calc(${spacingBase} * -1)`,
        zIndex: 1,
        minHeight: '56px',
        boxSizing: 'border-box',
        '&--start': {
          justifyContent: 'flex-start',
          '&::before': {
            background: `linear-gradient(180deg, var(${cssVarColorBackgroundSurface}) 0%, var(${cssVarColorBackgroundSurface}) 65%, transparent 100%)`,
          },
        },
        '&--end': {
          justifyContent: 'flex-end',
          '&::before': {
            background: `linear-gradient(180deg, var(${cssVarColorBackgroundBase}) 0%, var(${cssVarColorBackgroundBase}) 65%, transparent 100%)`,
          },
        },
        '&::before': {
          content: '""',
          zIndex: '-1',
          position: 'absolute',
          inset: '0 0 -8px',
          pointerEvents: 'none',
        },
      },
    },
    'flyout-start': {
      '--p-flyout-width': '100dvw',
      '--p-flyout-max-width': sidebarStartWidth,
    },
    'flyout-end': {
      '--p-flyout-width': '100dvw',
      '--p-flyout-max-width': sidebarEndWidth,
    },
  });
};
