import { getCss, isThemeDark, type Theme } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  breakpointM,
  breakpointS,
  getMediaQueryMin,
  gridGap,
  spacingStaticLarge,
  spacingStaticMedium,
  spacingStaticSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';

const cssVarSidebarStartWidth = '--p-canvas-sidebar-start-width';
const cssVarSidebarEndWidth = '--p-canvas-sidebar-end-width';
const cssVarBackground = '--p-canvas-background';

const spacingBase = gridGap.replace('36px', '24px');
const mainGridColumnGap = gridGap.replace('36px', '24px').replace('vw', 'cqw');
const mainGridRowGap = gridGap.replace('vw', 'cqw');
const mediaQueryTabletView = getMediaQueryMin('s');
const mediaQueryDesktopView = getMediaQueryMin('m');
const sidebarWidth = '320px';

const sidebarStartWidth = `var(${cssVarSidebarStartWidth}, ${sidebarWidth})`;
const sidebarEndWidth = `var(${cssVarSidebarEndWidth}, ${sidebarWidth})`;

const sidebarTransition = getTransition('margin');

const borderRadius = '16px';

const headerPadding = spacingStaticSmall;

export const getComponentCss = (
  theme: Theme,
  isSidebarStartOpen: boolean,
  isSidebarEndOpen: boolean,
  gridMaxWidth: boolean
): string => {
  const { primaryColor, backgroundColor, backgroundSurfaceColor, contrastLowColor } = getThemedColors(theme);

  const headerColor = isThemeDark(theme) ? 'rgba(14, 14, 18, 0.79)' : 'hsla(0, 0%, 100%, 0.79)';

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
        '&([slot*="sidebar"])': {
          // display: 'flex',
          // flexDirection: 'column',
          // gap: spacingStaticSmall,
        },
        // pre-defined utility classes
        '&(.p-module)': {
          gridColumn: '1/-1',
        },
        '&(.p-module--subgrid)': {
          display: 'grid',
          gridTemplateColumns: 'subgrid',
          rowGap: spacingBase,
        },
        '&(.p-module--more-space-above-small)': {
          marginTop: spacingStaticSmall,
        },
        '&(.p-module--more-space-above-medium)': {
          marginTop: spacingStaticMedium,
        },
        '&(.p-module--more-space-above-large)': {
          marginTop: spacingStaticLarge,
        },
        '&(.p-module--less-space-above-small)': {
          marginTop: `max(calc(-1 * ${spacingBase}), calc(-1 * ${spacingStaticSmall}))`,
        },
        '&(.p-module--less-space-above-medium)': {
          marginTop: `max(calc(-1 * ${spacingBase}), calc(-1 * ${spacingStaticMedium}))`,
        },
        '&(.p-module--less-space-above-large)': {
          marginTop: `max(calc(-1 * ${spacingBase}), calc(-1 * ${spacingStaticLarge}))`,
        },
        '&(.p-flex)': {
          display: 'flex',
        },
        '&(.p-align-items--center)': {
          alignItems: 'center',
        },
        '&(.p-gap--small)': {
          gap: spacingStaticSmall,
        },
        '&(.p-gap--medium)': {
          gap: spacingStaticMedium,
        },
        '&(.p-gap--large)': {
          gap: spacingStaticLarge,
        },
      },
      'slot[name="title"]::slotted(a)': {
        textDecoration: 'none',
        color: 'inherit',
      },
      'slot[name="sidebar-start"]': {
        display: 'block',
      },
      h2: {
        ...textSmallStyle,
        margin: 0,
        color: primaryColor,
        textTransform: 'uppercase',
        letterSpacing: '2px',
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
        minHeight: '56px',

        top: 0,
        zIndex: 100,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
        gap: spacingBase,
        backgroundColor: headerColor,
        WebkitBackdropFilter: 'blur(32px)',
        backdropFilter: 'blur(32px)',
        alignItems: 'center',
      },
      'main, footer': {
        '--p-canvas-grid-columns': '6',
        '--p-canvas-grid-span-full': 'span 6',
        '--p-canvas-grid-span-one-half': 'span 3',
        '--p-canvas-grid-span-one-third': 'span 2',
        '--p-canvas-grid-span-two-thirds': 'span 4',
        ...(gridMaxWidth && {
          maxWidth: '1311px', // TODO: should be aligned with Porsche Marketing Grid
          marginInline: 'auto',
        }),
        display: 'grid',
        gridTemplateColumns: 'repeat(var(--p-canvas-grid-columns), minmax(0, 1fr))',
        gap: `${mainGridRowGap} ${mainGridColumnGap}`,
        alignContent: 'flex-start',
        [`@container(min-width:${breakpointM}px)`]: {
          '--p-canvas-grid-columns': '12',
          '--p-canvas-grid-span-full': 'span 12',
          '--p-canvas-grid-span-one-half': 'span 6',
          '--p-canvas-grid-span-one-third': 'span 4',
          '--p-canvas-grid-span-two-thirds': 'span 8',
        },
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
        // backgroundColor,
        '&::before': {
          content: '""',

          position: 'absolute',
          inset: '-60px -500px 0',
          pointerEvents: 'none',
          background: `linear-gradient(0deg, ${backgroundColor} 0%, ${backgroundColor} 65%, rgba(255,255,255,0) 100%)`,
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
      justifyContent: 'var(--p-internal-justify)',
      position: 'sticky',
      top: `calc(${spacingBase} * -1)`,
      padding: `${headerPadding} ${spacingBase}`,
      marginBlockStart: `calc(${spacingBase} * -1)`,
      marginInline: `calc(${spacingBase} * -1)`,
      zIndex: 1,
      '&::before': {
        content: '""',
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
      '&::before': {
        content: '""',
        position: 'absolute',
        backgroundColor: 'transparent',
        right: `-${borderRadius}`,
        height: `calc(${borderRadius} * 2)`,
        width: borderRadius,
        pointerEvents: 'none',
        top: 0,
        borderTopLeftRadius: borderRadius,

        boxShadow: `0 -${borderRadius} 0 0 ${backgroundSurfaceColor}`,
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
      backgroundColor,
      [mediaQueryTabletView]: {
        gridTemplate: 'auto minmax(0, 1fr) / auto minmax(0, 1fr) auto',
        gridTemplateAreas: '"sidebar-start header" "sidebar-start main" "sidebar-start footer"',
      },
      [mediaQueryDesktopView]: {
        gridTemplate: 'auto minmax(0, 1fr) auto / auto minmax(0, 1fr) auto',
        gridTemplateAreas:
          '"sidebar-start header sidebar-end" "sidebar-start main sidebar-end" "sidebar-start footer sidebar-end"',
      },
      '&::after': {
        content: '""',

        gridColumn: '1 / -1',
        gridRow: '1 / -1',
        pointerEvents: 'none',
        background: `var(${cssVarBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        filter: 'blur(32px)',
        opacity: 0.5,
      },
    },
    crest: {
      [`@container(min-width:${breakpointS}px)`]: {
        // [getMediaQueryMin('s')]: {
        display: 'none',
      },
    },
    wordmark: {
      height: '10px',
      [`@container(max-width:${breakpointS - 1}px)`]: {
        // [getMediaQueryMax('s')]: {
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
      '--p-flyout-max-width': 'min(100dvw, 400px)',
    },
    'flyout-end': {
      '--p-flyout-max-width': 'min(100dvw, 400px)',
    },
  });
};
