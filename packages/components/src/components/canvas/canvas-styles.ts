import { getCss, type Theme } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  borderRadiusLarge,
  getMediaQueryMax,
  getMediaQueryMin,
  gridGap,
  spacingStaticLarge,
  spacingStaticMedium,
  spacingStaticSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';

const cssVarSidebarStartWidth = '--p-canvas-sidebar-start-width';
const cssVarSidebarEndWidth = '--p-canvas-sidebar-end-width';

const gridProductiveGap = gridGap.replace('36px', '24px');
const mediaQueryDesktopView = getMediaQueryMin('m');
const sidebarWidth = '320px';

const borderRadius = '16px';

const headerPadding = spacingStaticSmall;

export const getComponentCss = (theme: Theme, isSidebarStartOpen: boolean, isSidebarEndOpen: boolean): string => {
  const { primaryColor, backgroundColor, backgroundSurfaceColor, contrastLowColor } = getThemedColors(theme);

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
      '::slotted': {
        '&([slot*="header"])': {
          display: 'flex',
          alignItems: 'center',
          gap: spacingStaticSmall,
        },
        '&([slot*="sidebar"])': {
          display: 'flex',
          flexDirection: 'column',
          gap: spacingStaticSmall,
        },
        // pre-defined utility classes
        '&(.p-module)': {
          gridColumn: '1/-1',
        },
        '&(.p-module--subgrid)': {
          display: 'grid',
          gridTemplateColumns: 'subgrid',
          rowGap: gridProductiveGap,
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
          marginTop: `max(calc(-1 * ${gridProductiveGap}), calc(-1 * ${spacingStaticSmall}))`,
        },
        '&(.p-module--less-space-above-medium)': {
          marginTop: `max(calc(-1 * ${gridProductiveGap}), calc(-1 * ${spacingStaticMedium}))`,
        },
        '&(.p-module--less-space-above-large)': {
          marginTop: `max(calc(-1 * ${gridProductiveGap}), calc(-1 * ${spacingStaticLarge}))`,
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
        padding: gridProductiveGap,
        boxSizing: 'border-box',
        zIndex: 0,
      },
      header: {
        paddingBlock: headerPadding,
        gridArea: 'header',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
        gap: gridProductiveGap,
        backgroundColor: 'hsla(0,0%,100%,0.79)',
        WebkitBackdropFilter: 'blur(32px)',
        backdropFilter: 'blur(32px)',
        alignItems: 'center',
      },
      main: {
        zIndex: 10,
        gridArea: 'main',
        '--p-canvas-grid-span-full': 'span 6',
        '--p-canvas-grid-span-one-half': 'span 3',
        '--p-canvas-grid-span-one-third': 'span 2',
        '--p-canvas-grid-span-two-thirds': 'span 4',
        display: 'grid',
        gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
        gap: gridProductiveGap,
        alignContent: 'flex-start',
        // backgroundColor,
        [mediaQueryDesktopView]: {
          '--p-canvas-grid-span-full': 'span 12',
          '--p-canvas-grid-span-one-half': 'span 6',
          '--p-canvas-grid-span-one-third': 'span 4',
          '--p-canvas-grid-span-two-thirds': 'span 8',
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
        },
      },
      footer: {
        position: 'sticky',
        bottom: 0,
        gridArea: 'footer',
        zIndex: 200,
        background: `linear-gradient(0deg, ${backgroundColor} 0%, ${backgroundColor} 65%, rgba(255,255,255,0) 100%)`,
        // backgroundColor,
      },
      aside: {
        zIndex: 200,
        transition: getTransition('margin'),
        position: 'sticky',
        top: 0,
        height: '100dvh',
      },
    },
    scroller: {
      position: 'absolute',
      inset: 0,
      padding: gridProductiveGap,
      overflow: 'hidden auto',
    },
    'sidebar-header': {
      position: 'sticky',
      top: `calc(${gridProductiveGap} * -1)`,
      padding: `${headerPadding} ${gridProductiveGap}`,
      marginBlockStart: `calc(${gridProductiveGap} * -1)`,
      marginInline: `calc(${gridProductiveGap} * -1)`,
      // backgroundColor: backgroundSurfaceColor,
      zIndex: 1,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: '-8px',
        left: 0,
        right: 0,
        background: `linear-gradient(180deg, ${backgroundSurfaceColor} 0%, ${backgroundSurfaceColor} 65%, rgba(255,255,255,0) 100%)`,
        pointerEvents: 'none',
      },
    },
    'sidebar-start': {
      backgroundColor: backgroundSurfaceColor,
      gridArea: 'sidebar-start',
      width: `var(${cssVarSidebarStartWidth}, ${sidebarWidth})`,
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
      borderInlineStart: `1px solid ${contrastLowColor}`,
      backgroundColor,
      gridArea: 'sidebar-end',
      width: `var(${cssVarSidebarEndWidth}, ${sidebarWidth})`,
      marginInlineEnd: isSidebarEndOpen ? 0 : `calc(var(${cssVarSidebarEndWidth}, ${sidebarWidth}) * -1)`,
      overflow: 'hidden auto',
    },
    canvas: {
      display: 'grid',
      gridTemplateRows: 'auto minmax(0, 1fr) auto',
      gridTemplateAreas: '"header" "main" "footer"',
      minWidth: '320px',
      minHeight: '100dvh',
      [mediaQueryDesktopView]: {
        gridTemplate: 'auto minmax(0, 1fr) auto / auto minmax(0, 1fr) auto',
        gridTemplateAreas:
          '"sidebar-start header sidebar-end" "sidebar-start main sidebar-end" "sidebar-start footer sidebar-end"',
      },
    },
    crest: {
      [getMediaQueryMin('s')]: {
        display: 'none',
      },
    },
    wordmark: {
      height: '10px',
      [getMediaQueryMax('s')]: {
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
  });
};
