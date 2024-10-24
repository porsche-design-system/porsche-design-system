import { getCss, isThemeDark, type Theme } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getFocusJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  borderRadiusSmall,
  breakpointS,
  getMediaQueryMin,
  gridGap,
  spacingFluidSmall,
  spacingStaticSmall,
  textSmallStyle,
  textXSmallStyle,
} from '@porsche-design-system/styles';

// public css classes
const cssClassGrid = '-p-canvas-grid';

// public css variables
const cssVarSidebarStartWidth = '--p-canvas-sidebar-start-width';
const cssVarSidebarEndWidth = '--p-canvas-sidebar-end-width';

// default values for public css variables
const sidebarStartWidth = `var(${cssVarSidebarStartWidth},320px)`;
const sidebarEndWidth = `var(${cssVarSidebarEndWidth},320px)`;

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
        '&:not([name]),&[name="footer"]': {
          [`&::slotted(.${cssClassGrid})`]: {
            display: 'grid',
            gridTemplateColumns: 'repeat(12,minmax(0,1fr))',
            columnGap: spacingBase,
            marginInline: 'auto',
            containerType: 'inline-size',
          },
        },
        '&[name="title"]::slotted': {
          '&(a)': {
            textDecoration: 'none',
            color: 'inherit',
            borderRadius: borderRadiusSmall,
          },
          ...getFocusJssStyle(theme, { slotted: 'a' }),
        },
        '&[name="background"]': {
          zIndex: 3,
          display: 'block',
          gridArea: '1/1/-1/-1',
          position: 'sticky',
          top: 0,
          height: '100dvh',
          pointerEvents: 'none',
          overflow: 'hidden',
          transform: 'translate3d(0,0,0)', // needed for Safari to force GPU acceleration
          [mediaQueryS]: {
            gridColumn: '2/3',
          },
          '&::slotted(video),&::slotted(img)': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: getTransition('opacity', 'veryLong'),
            pointerEvents: 'none',
          },
        },
      },
      h2: {
        font: textXSmallStyle.font,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        margin: 0,
        padding: '4px', // preserve enough spacing for focus state
        textTransform: 'uppercase',
        letterSpacing: '2px',
      },
    },
    root: {
      [cssVarColorPrimary]: primaryColor,
      [cssVarColorBackgroundBase]: backgroundColor,
      [cssVarColorBackgroundSurface]: backgroundSurfaceColor,
      [cssVarColorContrastLow]: contrastLowColor,
      [cssVarColorFooterGradient]: `0,0%,${isThemeDark(theme) ? '0%' : '100%'}`,
      [cssVarTemplateSidebarStartWidth]: isSidebarStartOpen ? sidebarStartWidth : '0px',
      [cssVarTemplateSidebarEndWidth]: isSidebarEndOpen ? sidebarEndWidth : '0px',
      display: 'grid',
      gridTemplateRows: 'auto minmax(0,1fr) auto',
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
        [cssVarColorFooterGradient]: '0,0%,0%',
      }),
      [mediaQueryS]: {
        gridTemplateColumns: `var(${cssVarTemplateSidebarStartWidth}) minmax(0,1fr)`,
        gridTemplateAreas: '"sidebar-start header" "sidebar-start main" "sidebar-start footer"',
      },
      [mediaQueryM]: {
        gridTemplateColumns: `var(${cssVarTemplateSidebarStartWidth}) minmax(0,1fr) var(${cssVarTemplateSidebarEndWidth})`,
        gridTemplateAreas:
          '"sidebar-start header sidebar-end" "sidebar-start main sidebar-end" "sidebar-start footer sidebar-end"',
      },
      '&::after': {
        [mediaQueryM]: {
          content: '""',
          zIndex: 2,
          gridArea: '1/2/-1/3',
          boxShadow: `1px 0 0 0 var(${cssVarColorContrastLow})`,
          background: `var(${cssVarColorBackgroundBase})`,
          pointerEvents: 'none',
        },
      },
    },
    header: {
      zIndex: 6,
      gridArea: 'header',
      containerType: 'inline-size',
      position: 'sticky',
      top: 0,
      minHeight: '56px',
      boxSizing: 'border-box',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)',
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
    blur: {
      zIndex: -1,
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      '& > div': {
        position: 'absolute',
        inset: 0,
      },
      '& > div:nth-of-type(1)': {
        zIndex: 1,
        WebkitBackdropFilter: 'blur(64px)',
        backdropFilter: 'blur(64px)',
        WebkitMaskImage:
          'linear-gradient(to bottom,rgba(0,0,0,100%) 0%,rgba(0,0,0,1) 12.5%,rgba(0,0,0,1) 25%,rgba(0,0,0,0) 37.5%)',
        maskImage:
          'linear-gradient(to bottom,rgba(0,0,0,100%) 0%,rgba(0,0,0,1) 12.5%,rgba(0,0,0,1) 25%,rgba(0,0,0,0) 37.5%)',
      },
      '& > div:nth-of-type(2)': {
        zIndex: 2,
        WebkitBackdropFilter: 'blur(32px)',
        backdropFilter: 'blur(32px)',
        WebkitMaskImage:
          'linear-gradient(to bottom,rgba(0,0,0,0) 12.5%,rgba(0,0,0,1) 25%,rgba(0,0,0,1) 37.5%,rgba(0,0,0,0) 50%)',
        maskImage:
          'linear-gradient(to bottom,rgba(0,0,0,0) 12.5%,rgba(0,0,0,1) 25%,rgba(0,0,0,1) 37.5%,rgba(0,0,0,0) 50%)',
      },
      '& > div:nth-of-type(3)': {
        zIndex: 3,
        WebkitBackdropFilter: 'blur(16px)',
        backdropFilter: 'blur(16px)',
        WebkitMaskImage:
          'linear-gradient(to bottom,rgba(0,0,0,0) 25%,rgba(0,0,0,1) 37.5%,rgba(0,0,0,1) 50%,rgba(0,0,0,0) 62.5%)',
        maskImage:
          'linear-gradient(to bottom,rgba(0,0,0,0) 25%,rgba(0,0,0,1) 37.5%,rgba(0,0,0,1) 50%,rgba(0,0,0,0) 62.5%)',
      },
      '& > div:nth-of-type(4)': {
        zIndex: 4,
        WebkitBackdropFilter: 'blur(8px)',
        backdropFilter: 'blur(8px)',
        WebkitMaskImage:
          'linear-gradient(to bottom,rgba(0,0,0,0) 37.5%,rgba(0,0,0,1) 50%,rgba(0,0,0,1) 62.5%,rgba(0,0,0,0) 75%)',
        maskImage:
          'linear-gradient(to bottom,rgba(0,0,0,0) 37.5%,rgba(0,0,0,1) 50%,rgba(0,0,0,1) 62.5%,rgba(0,0,0,0) 75%)',
      },
      '& > div:nth-of-type(5)': {
        zIndex: 5,
        WebkitBackdropFilter: 'blur(4px)',
        backdropFilter: 'blur(4px)',
        WebkitMaskImage:
          'linear-gradient(to bottom,rgba(0,0,0,0) 50%,rgba(0,0,0,1) 62.5%,rgba(0,0,0,1) 75%,rgba(0,0,0,0) 87.5%)',
        maskImage:
          'linear-gradient(to bottom,rgba(0,0,0,0) 50%,rgba(0,0,0,1) 62.5%,rgba(0,0,0,1) 75%,rgba(0,0,0,0) 87.5%)',
      },
      '& > div:nth-of-type(6)': {
        zIndex: 6,
        WebkitBackdropFilter: 'blur(2px)',
        backdropFilter: 'blur(2px)',
        WebkitMaskImage:
          'linear-gradient(to bottom,rgba(0,0,0,0) 62.5%,rgba(0,0,0,1) 75%,rgba(0,0,0,1) 87.5%,rgba(0,0,0,0) 100%)',
        maskImage:
          'linear-gradient(to bottom,rgba(0,0,0,0) 62.5%,rgba(0,0,0,1) 75%,rgba(0,0,0,1) 87.5%,rgba(0,0,0,0) 100%)',
      },
      '& > div:nth-of-type(7)': {
        zIndex: 7,
        WebkitBackdropFilter: 'blur(1px)',
        backdropFilter: 'blur(1px)',
        WebkitMaskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 75%,rgba(0,0,0,1) 87.5%,rgba(0,0,0,1) 100%)',
        maskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 75%,rgba(0,0,0,1) 87.5%,rgba(0,0,0,1) 100%)',
      },
      '& > div:nth-of-type(8)': {
        zIndex: 8,
        WebkitBackdropFilter: 'blur(.5px)',
        backdropFilter: 'blur(.5px)',
        WebkitMaskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 87.5%,rgba(0,0,0,1) 100%)',
        maskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 87.5%,rgba(0,0,0,1) 100%)',
      },
    },
    main: {
      zIndex: 4,
      gridArea: 'main',
      padding: spacingBase,
    },
    footer: {
      zIndex: 5,
      gridArea: 'footer',
      padding: `${spacingBase} ${spacingBase} ${spacingFluidSmall}`,
      position: 'sticky',
      bottom: 0,
      '&::before': {
        content: '""',
        zIndex: -1,
        position: 'absolute',
        inset: '-140px 0 0',
        pointerEvents: 'none',
        background: `linear-gradient(to bottom,hsla(var(${cssVarColorFooterGradient}),0) 0%,hsla(var(${cssVarColorFooterGradient}),0.013) 8.1%,hsla(var(${cssVarColorFooterGradient}),0.049) 15.5%,hsla(var(${cssVarColorFooterGradient}),0.104) 22.5%,hsla(var(${cssVarColorFooterGradient}),0.175) 29%,hsla(var(${cssVarColorFooterGradient}),0.259) 35.3%,hsla(var(${cssVarColorFooterGradient}),0.352) 41.2%,hsla(var(${cssVarColorFooterGradient}),0.45) 47.1%,hsla(var(${cssVarColorFooterGradient}),0.55) 52.9%,hsla(var(${cssVarColorFooterGradient}),0.648) 58.8%,hsla(var(${cssVarColorFooterGradient}),0.741) 64.7%,hsla(var(${cssVarColorFooterGradient}),0.825) 71%,hsla(var(${cssVarColorFooterGradient}),0.896) 77.5%,hsla(var(${cssVarColorFooterGradient}),0.951) 84.5%,hsla(var(${cssVarColorFooterGradient}),0.987) 91.9%,hsl(var(${cssVarColorFooterGradient})) 100%)`,
      },
    },
    sidebar: {
      position: 'sticky',
      top: 0,
      height: '100dvh',
      '&--start': {
        zIndex: 7,
        gridArea: 'sidebar-start',
        justifySelf: 'flex-end',
        width: sidebarStartWidth,
        backgroundColor: `var(${cssVarColorBackgroundSurface})`,
        '&::before': {
          content: '""',
          zIndex: -1,
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
        zIndex: 1,
        gridArea: 'sidebar-end',
        justifySelf: 'flex-end',
        width: sidebarEndWidth,
        backgroundColor: `var(${cssVarColorBackgroundBase})`,
      },
      '&__scroller': {
        position: 'absolute',
        inset: 0,
        overflow: 'hidden auto',
        overscrollBehaviorY: 'contain',
        background: 'inherit', // ensures correct scrollbar coloring in light / dark mode
      },
      '&__header': {
        zIndex: 1,
        display: 'flex',
        gap: spacingStaticSmall,
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        padding: `${spacingStaticSmall} ${spacingBase}`,
        minHeight: '56px',
        boxSizing: 'border-box',
        '&--start': {
          justifyContent: 'flex-start',
          '&::before': {
            background: `linear-gradient(180deg,var(${cssVarColorBackgroundSurface}) 0%,var(${cssVarColorBackgroundSurface}) 65%,transparent 100%)`,
          },
        },
        '&--end': {
          justifyContent: 'flex-end',
          '&::before': {
            background: `linear-gradient(180deg,var(${cssVarColorBackgroundBase}) 0%,var(${cssVarColorBackgroundBase}) 65%,transparent 100%)`,
          },
        },
        '&::before': {
          content: '""',
          zIndex: -1,
          position: 'absolute',
          inset: '0 0 -8px',
          pointerEvents: 'none',
        },
      },
      '&__content': {
        position: 'relative', // needed for z-index to work
        zIndex: 0, // ensures slotted dom nodes can't be on top of sidebar header
        display: 'block',
        padding: spacingBase,
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
