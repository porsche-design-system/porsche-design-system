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
const headerHeight = 'calc(1.5rem + 28px)';

export const getComponentCss = (theme: Theme, isSidebarStartOpen: boolean, isSidebarEndOpen: boolean): string => {
  const { primaryColor, backgroundColor, backgroundSurfaceColor } = getThemedColors(theme);

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
      h2: {
        ...textSmallStyle,
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
        gridArea: 'header',
        position: 'sticky',
        top: 0,
        zIndex: 9999999,
        height: headerHeight,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
        gap: gridProductiveGap,
        backgroundColor: backgroundSurfaceColor,
        alignItems: 'center',
        paddingBlock: 0,
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          backgroundColor: 'transparent',
          bottom: `calc(${borderRadiusLarge} * -2)`,
          height: `calc(${borderRadiusLarge} * 2)`,
          width: borderRadiusLarge,
          boxShadow: `0 -${borderRadiusLarge} 0 0 ${backgroundSurfaceColor}`,
          pointerEvents: 'none',
        },
        '&::before': {
          left: 0,
          borderTopLeftRadius: borderRadiusLarge,
        },
        '&::after': {
          right: 0,
          borderTopRightRadius: borderRadiusLarge,
        },
      },
      main: {
        gridArea: 'main',
        '--p-canvas-grid-span-full': 'span 6',
        '--p-canvas-grid-span-one-half': 'span 3',
        '--p-canvas-grid-span-one-third': 'span 2',
        '--p-canvas-grid-span-two-thirds': 'span 4',
        display: 'grid',
        gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
        gap: gridProductiveGap,
        alignContent: 'flex-start',
        backgroundColor,
        [mediaQueryDesktopView]: {
          '--p-canvas-grid-span-full': 'span 12',
          '--p-canvas-grid-span-one-half': 'span 6',
          '--p-canvas-grid-span-one-third': 'span 4',
          '--p-canvas-grid-span-two-thirds': 'span 8',
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
        },
      },
      footer: {
        gridArea: 'footer',
        backgroundColor,
      },
      aside: {
        transition: getTransition('margin'),
        position: 'sticky',
        top: headerHeight,
        height: `calc(100dvh - ${headerHeight})`,
        overflow: 'hidden auto',
      },
    },
    'sidebar-start': {
      borderInlineEnd: `1px solid ${backgroundSurfaceColor}`,
      backgroundColor,
      gridArea: 'sidebar-start',
      width: `var(${cssVarSidebarStartWidth}, ${sidebarWidth})`,
      marginInlineStart: isSidebarStartOpen ? 0 : `calc(var(${cssVarSidebarStartWidth}, ${sidebarWidth}) * -1)`,
    },
    'sidebar-end': {
      borderInlineStart: `1px solid ${backgroundSurfaceColor}`,
      backgroundColor,
      gridArea: 'sidebar-end',
      width: `var(${cssVarSidebarEndWidth}, ${sidebarWidth})`,
      marginInlineEnd: isSidebarEndOpen ? 0 : `calc(var(${cssVarSidebarEndWidth}, ${sidebarWidth}) * -1)`,
    },
    canvas: {
      display: 'grid',
      gridTemplateRows: 'auto minmax(0, 1fr) auto',
      gridTemplateAreas: '"header" "main" "footer"',
      minWidth: '320px',
      minHeight: '100dvh',
      [mediaQueryDesktopView]: {
        gridTemplate: 'auto minmax(0, 1fr) auto / auto minmax(0, 1fr) auto',
        gridTemplateAreas: '"header header header" "sidebar-start main sidebar-end" "sidebar-start footer sidebar-end"',
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
