import {
  breakpointS,
  getMediaQueryMax,
  getMediaQueryMin,
  gridGap,
  spacingFluidSmall,
  spacingStaticSmall,
  textXSmallStyle,
} from '@porsche-design-system/emotion';
import { spacingStaticXs } from '@porsche-design-system/tokens';
import {
  addImportantToEachRule,
  getFocusBaseStyles,
  getTransition,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  colorCanvas,
  colorContrastLower,
  colorPrimary,
  colorSurface,
  legacyRadiusSmall,
  radius3Xl,
  radiusSm,
} from '../../styles/css-variables';
import { getCss } from '../../utils';
import type { CanvasBackground } from './canvas-utils';

/**
 * @css-variable {"name": "--p-canvas-sidebar-start-width", "description": "Width of the sidebar start.", "defaultValue": "320px"}
 */
const cssVarSidebarStartWidth = '--p-canvas-sidebar-start-width';
/**
 * @css-variable {"name": "--p-canvas-sidebar-end-width", "description": "Width of the sidebar end.", "defaultValue": "320px"}
 */
const cssVarSidebarEndWidth = '--p-canvas-sidebar-end-width';

// public css classes
const cssClassGrid = '-p-canvas-grid';

// default values for public css variables
const minWidth = '320px';
const sidebarStartWidthMobile = `min(100vw,var(${cssVarSidebarStartWidth},${minWidth}))`;
const sidebarEndWidthMobile = `min(100vw,var(${cssVarSidebarEndWidth},${minWidth}))`;
const sidebarStartWidthDesktop = `min(calc(100vw - ${minWidth}),var(${cssVarSidebarStartWidth},${minWidth}))`;
const sidebarEndWidthDesktop = `min(calc(100vw - ${minWidth}),var(${cssVarSidebarEndWidth},${minWidth}))`;

// media queries
const mediaQueryMinM = getMediaQueryMin('m');
const mediaQueryMaxM = getMediaQueryMax('m');

// others
const spacingBase = gridGap.replace('36px', '24px');

export const getComponentCss = (
  isSidebarStartOpen: boolean,
  isSidebarEndOpen: boolean,
  background: CanvasBackground
): string => {
  const isBackgroundSurface = background === 'surface';
  const primaryBackgroundColor = isBackgroundSurface ? colorSurface : colorCanvas;
  const secondaryBackgroundColor = isBackgroundSurface ? colorCanvas : colorSurface;

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          // prevents horizontal scroll due to sidebar transform. `overflow: clip` clips content like hidden but doesn't
          // establish a scrolling context, so sticky positioning still works.
          overflowX: 'clip',
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      slot: {
        '&:not([name]),&[name="footer"]': {
          [`&::slotted(.${cssClassGrid})`]: addImportantToEachRule({
            display: 'grid',
            gridTemplateColumns: 'repeat(12,minmax(0,1fr))',
            columnGap: spacingBase,
            marginInline: 'auto',
            containerType: 'inline-size',
          }),
        },
        '&[name="sidebar-end-header"]': {
          display: 'block', // ensures header section of sidebar-end area is aligned correctly
        },
        '&[name="background"]': {
          zIndex: 1,
          display: 'block',
          gridArea: '1/2/-1/3',
          position: 'sticky',
          top: 0,
          height: '100lvh', // viewport when Safari's UI is completely hidden (maximum space)
          pointerEvents: 'none',
          overflow: 'hidden',
          transform: 'translate3d(0,0,0)', // needed for Safari to force GPU acceleration
          '&::slotted(video),&::slotted(img)': addImportantToEachRule({
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }),
        },
        '&[name="title"]::slotted': addImportantToEachRule({
          '&(a)': {
            all: 'unset',
            cursor: 'pointer',
            color: 'inherit',
            borderRadius: `var(${legacyRadiusSmall}, ${radiusSm})`,
          },
          '&(a:focus-visible)': getFocusBaseStyles(),
        }),
      },
      h2: {
        all: 'unset',
        padding: spacingStaticXs, // preserve enough spacing for focus state
        font: textXSmallStyle.font,
        color: colorPrimary,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
        letterSpacing: '2px',
      },
    },
    root: {
      display: 'grid',
      gridTemplate: `auto minmax(0,1fr) auto / ${sidebarStartWidthMobile} 100vw ${sidebarEndWidthMobile}`,
      gridTemplateAreas:
        '"sidebar-start header sidebar-end" "sidebar-start main sidebar-end" "sidebar-start footer sidebar-end"',
      minHeight: '100lvh', // viewport when Safari's UI is completely hidden (maximum space)
      [mediaQueryMaxM]: {
        transition: getTransition('transform'),
        transform: `translate3d(${isSidebarEndOpen ? `calc(-1 * ${sidebarStartWidthMobile} - ${sidebarEndWidthMobile})` : isSidebarStartOpen ? '0' : `calc(-1 * ${sidebarStartWidthMobile})`},0,0)`,
        '&:dir(rtl)': {
          transform: `translate3d(${isSidebarEndOpen ? `calc(${sidebarStartWidthMobile} + ${sidebarEndWidthMobile})` : isSidebarStartOpen ? '0' : sidebarEndWidthMobile},0,0)`,
        },
      },
      [mediaQueryMinM]: {
        transition: getTransition('grid-template-columns'),
        gridTemplateColumns: `${isSidebarStartOpen ? sidebarStartWidthDesktop : '0px'} minmax(${minWidth},1fr) ${isSidebarEndOpen ? sidebarEndWidthDesktop : '0px'}`,
      },
      '&::before': {
        content: '""',
        zIndex: 0,
        gridArea: '1/2/-1/3',
        background: primaryBackgroundColor,
        pointerEvents: 'none',
        borderEndStartRadius: isSidebarStartOpen ? radius3Xl : 0,
        transition: getTransition('border-radius'),
      },
    },
    header: {
      zIndex: 4,
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
      padding: `${spacingStaticSmall} ${spacingBase}`,
      '&:focus-visible': {
        outline: 'none',
      },
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
        WebkitBackdropFilter: 'blur(64px)',
        backdropFilter: 'blur(64px)',
        WebkitMaskImage:
          'linear-gradient(to bottom,rgba(0,0,0,100%) 0%,rgba(0,0,0,1) 12.5%,rgba(0,0,0,1) 25%,rgba(0,0,0,0) 37.5%)',
        maskImage:
          'linear-gradient(to bottom,rgba(0,0,0,100%) 0%,rgba(0,0,0,1) 12.5%,rgba(0,0,0,1) 25%,rgba(0,0,0,0) 37.5%)',
      },
      '& > div:nth-of-type(2)': {
        WebkitBackdropFilter: 'blur(32px)',
        backdropFilter: 'blur(32px)',
        WebkitMaskImage:
          'linear-gradient(to bottom,rgba(0,0,0,0) 12.5%,rgba(0,0,0,1) 25%,rgba(0,0,0,1) 37.5%,rgba(0,0,0,0) 50%)',
        maskImage:
          'linear-gradient(to bottom,rgba(0,0,0,0) 12.5%,rgba(0,0,0,1) 25%,rgba(0,0,0,1) 37.5%,rgba(0,0,0,0) 50%)',
      },
      '& > div:nth-of-type(3)': {
        WebkitBackdropFilter: 'blur(16px)',
        backdropFilter: 'blur(16px)',
        WebkitMaskImage:
          'linear-gradient(to bottom,rgba(0,0,0,0) 25%,rgba(0,0,0,1) 37.5%,rgba(0,0,0,1) 50%,rgba(0,0,0,0) 62.5%)',
        maskImage:
          'linear-gradient(to bottom,rgba(0,0,0,0) 25%,rgba(0,0,0,1) 37.5%,rgba(0,0,0,1) 50%,rgba(0,0,0,0) 62.5%)',
      },
      '& > div:nth-of-type(4)': {
        WebkitBackdropFilter: 'blur(8px)',
        backdropFilter: 'blur(8px)',
        WebkitMaskImage:
          'linear-gradient(to bottom,rgba(0,0,0,0) 37.5%,rgba(0,0,0,1) 50%,rgba(0,0,0,1) 62.5%,rgba(0,0,0,0) 75%)',
        maskImage:
          'linear-gradient(to bottom,rgba(0,0,0,0) 37.5%,rgba(0,0,0,1) 50%,rgba(0,0,0,1) 62.5%,rgba(0,0,0,0) 75%)',
      },
      '& > div:nth-of-type(5)': {
        WebkitBackdropFilter: 'blur(4px)',
        backdropFilter: 'blur(4px)',
        WebkitMaskImage:
          'linear-gradient(to bottom,rgba(0,0,0,0) 50%,rgba(0,0,0,1) 62.5%,rgba(0,0,0,1) 75%,rgba(0,0,0,0) 87.5%)',
        maskImage:
          'linear-gradient(to bottom,rgba(0,0,0,0) 50%,rgba(0,0,0,1) 62.5%,rgba(0,0,0,1) 75%,rgba(0,0,0,0) 87.5%)',
      },
      '& > div:nth-of-type(6)': {
        WebkitBackdropFilter: 'blur(2px)',
        backdropFilter: 'blur(2px)',
        WebkitMaskImage:
          'linear-gradient(to bottom,rgba(0,0,0,0) 62.5%,rgba(0,0,0,1) 75%,rgba(0,0,0,1) 87.5%,rgba(0,0,0,0) 100%)',
        maskImage:
          'linear-gradient(to bottom,rgba(0,0,0,0) 62.5%,rgba(0,0,0,1) 75%,rgba(0,0,0,1) 87.5%,rgba(0,0,0,0) 100%)',
      },
      '& > div:nth-of-type(7)': {
        WebkitBackdropFilter: 'blur(1px)',
        backdropFilter: 'blur(1px)',
        WebkitMaskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 75%,rgba(0,0,0,1) 87.5%,rgba(0,0,0,1) 100%)',
        maskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 75%,rgba(0,0,0,1) 87.5%,rgba(0,0,0,1) 100%)',
      },
      '& > div:nth-of-type(8)': {
        WebkitBackdropFilter: 'blur(.5px)',
        backdropFilter: 'blur(.5px)',
        WebkitMaskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 87.5%,rgba(0,0,0,1) 100%)',
        maskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 87.5%,rgba(0,0,0,1) 100%)',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        insetInlineStart: 0,
        width: radius3Xl,
        height: `calc(2 * ${radius3Xl})`,
        borderStartStartRadius: isSidebarStartOpen ? radius3Xl : 0,
        boxShadow: `0 calc(-1 * ${radius3Xl}) 0 0 ${secondaryBackgroundColor}`,
        transition: getTransition('border-radius'),
      },
    },
    main: {
      zIndex: 3,
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
        background: `linear-gradient(to bottom,hsl(from ${primaryBackgroundColor} h s l / 0) 0%,hsl(from ${primaryBackgroundColor} h s l / 0.013) 8.1%,hsl(from ${primaryBackgroundColor} h s l / 0.049) 15.5%,hsl(from ${primaryBackgroundColor} h s l / 0.104) 22.5%,hsl(from ${primaryBackgroundColor} h s l / 0.175) 29%,hsl(from ${primaryBackgroundColor} h s l / 0.259) 35.3%,hsl(from ${primaryBackgroundColor} h s l / 0.352) 41.2%,hsl(from ${primaryBackgroundColor} h s l / 0.45) 47.1%,hsl(from ${primaryBackgroundColor} h s l / 0.55) 52.9%,hsl(from ${primaryBackgroundColor} h s l / 0.648) 58.8%,hsl(from ${primaryBackgroundColor} h s l / 0.741) 64.7%,hsl(from ${primaryBackgroundColor} h s l / 0.825) 71%,hsl(from ${primaryBackgroundColor} h s l / 0.896) 77.5%,hsl(from ${primaryBackgroundColor} h s l / 0.951) 84.5%,hsl(from ${primaryBackgroundColor} h s l / 0.987) 91.9%,${primaryBackgroundColor} 100%)`,
        borderEndStartRadius: isSidebarStartOpen ? radius3Xl : 0,
        transition: getTransition('border-radius'),
      },
    },
    sidebar: {
      zIndex: 2,
      position: 'sticky',
      top: 0,
      height: '100dvh', // transitions between svh (viewport when Safari's address bar and bottom bar are visible (~60-90px less)) and lvh (viewport when Safari's UI is completely hidden (maximum space)) as you scroll (causes reflows)
      padding: spacingBase,
      boxSizing: 'border-box',
      overflow: 'hidden auto',
      overscrollBehaviorY: 'contain',
      '&:focus-visible': {
        outline: 'none',
      },
      '&--start': {
        gridArea: 'sidebar-start',
        justifySelf: 'flex-end',
        background: secondaryBackgroundColor,
        width: sidebarStartWidthMobile,
        [mediaQueryMinM]: {
          width: sidebarStartWidthDesktop,
        },
      },
      '&--end': {
        gridArea: 'sidebar-end',
        justifySelf: 'flex-start',
        borderInlineStart: `1px solid ${colorContrastLower}`,
        background: primaryBackgroundColor,
        width: sidebarEndWidthMobile,
        [mediaQueryMinM]: {
          width: sidebarEndWidthDesktop,
        },
      },
      '&__header': {
        zIndex: 9999999,
        display: 'flex',
        gap: spacingStaticSmall,
        alignItems: 'center',
        position: 'sticky',
        top: `calc(-1 * ${spacingBase})`,
        margin: `calc(-1 * ${spacingBase}) calc(-1 * ${spacingBase}) ${spacingBase}`,
        padding: `${spacingStaticSmall} ${spacingBase}`,
        minHeight: '56px',
        boxSizing: 'border-box',
        '&--start': {
          justifyContent: 'flex-start',
          '&::before': {
            background: `linear-gradient(180deg,${secondaryBackgroundColor} 0%,${secondaryBackgroundColor} 65%,transparent 100%)`,
          },
        },
        '&--end': {
          justifyContent: 'space-between',
          '&::before': {
            background: `linear-gradient(180deg,${primaryBackgroundColor} 0%,${primaryBackgroundColor} 65%,transparent 100%)`,
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
    },
  });
};
