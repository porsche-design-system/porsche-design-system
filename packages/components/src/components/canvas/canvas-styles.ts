import { getCss, isThemeDark, type Theme } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { getMediaQueryMax, getMediaQueryMin, gridGap, spacingStaticSmall } from '@porsche-design-system/styles';
import { type CanvasSidebarEndWidth, type CanvasSidebarStartWidth, type CanvasSidebarWidth } from './canvas-utils';

const cssVariableSidebarStartWidth = '--p-canvas-sidebar-start-width';
const cssVariableSidebarEndWidth = '--p-canvas-sidebar-end-width';

const gridProductiveGap = gridGap.replace('36px', '24px');
const mediaQueryDesktopView = getMediaQueryMin('m');
const sidebarWidths: { [key in CanvasSidebarWidth]: string } = {
  medium: '320px',
  large: '480px', // TODO: won't work at viewport 1000px when both sidebars are opened
};

const cssVarHeaderHeight = '--p-canvas-header-height';

export const getComponentCss = (
  theme: Theme,
  isSidebarStartOpen: boolean,
  sidebarStartWidth: CanvasSidebarStartWidth,
  isSidebarEndOpen: boolean,
  sidebarEndWidth: CanvasSidebarEndWidth
): string => {
  const { contrastLowColor, backgroundColor, backgroundSurfaceColor } = getThemedColors(theme);
  const headerColor = isThemeDark(theme) ? 'rgba(14,14,18,0.79)' : 'rgba(255, 255, 255, 0.79)';

  return getCss({
    '@global': {
      ':host': {
        [cssVarHeaderHeight]: 'calc(1.5rem + 28px)',
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
      },
      slot: {
        '&[name="header-start"]': {
          display: 'flex',
          justifyContent: 'flex-start',
        },
        '&[name="header-end"]': {
          display: 'flex',
          justifyContent: 'flex-end',
        },
      },
      ':is(header, main, footer, aside)': {
        padding: gridProductiveGap,
        boxSizing: 'border-box',
        zIndex: 0,
      },
      header: {
        gridArea: 'header',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        height: `var(${cssVarHeaderHeight})`,
        background: headerColor,
        WebkitBackdropFilter: 'blur(8px)',
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${contrastLowColor}`,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
        gap: gridProductiveGap,
        alignItems: 'center',
        paddingBlock: 0,
      },
      main: {
        gridArea: 'main',
        '--pds-grid-span-full': 'span 6',
        '--pds-grid-span-one-half': 'span 3',
        '--pds-grid-span-one-third': 'span 2',
        '--pds-grid-span-two-thirds': 'span 4',
        display: 'grid',
        gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
        gap: gridProductiveGap,
        alignContent: 'flex-start',
        backgroundColor,
        [mediaQueryDesktopView]: {
          '--pds-grid-span-full': 'span 12',
          '--pds-grid-span-one-half': 'span 6',
          '--pds-grid-span-one-third': 'span 4',
          '--pds-grid-span-two-thirds': 'span 8',
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
        },
      },
      footer: {
        gridArea: 'footer',
        backgroundColor,
      },
      aside: {
        // TODO: box-shadows or colored surface must be defined, design is missing
        transition: getTransition('margin'),
        position: 'sticky',
        top: `var(${cssVarHeaderHeight})`,
        height: `calc(100dvh - var(${cssVarHeaderHeight}))`,
        overflow: 'hidden auto',
        '&:first-of-type': {
          borderInlineEnd: `1px solid ${contrastLowColor}`,
          backgroundColor: backgroundSurfaceColor,
          gridArea: 'sidebar-start',
          width: `var(${cssVariableSidebarStartWidth}, ${sidebarWidths[sidebarStartWidth]})`,
          marginInlineStart: isSidebarStartOpen
            ? 0
            : `calc(var(${cssVariableSidebarStartWidth}, ${sidebarWidths[sidebarStartWidth]}) * -1)`,
        },
        '&:last-of-type': {
          borderInlineStart: `1px solid ${contrastLowColor}`,
          backgroundColor,
          gridArea: 'sidebar-end',
          width: `var(${cssVariableSidebarEndWidth}, ${sidebarWidths[sidebarEndWidth]})`,
          marginInlineEnd: isSidebarEndOpen
            ? 0
            : `calc(var(${cssVariableSidebarEndWidth}, ${sidebarWidths[sidebarEndWidth]}) * -1)`,
        },
      },
    },
    canvas: {
      display: 'grid',
      gridTemplateRows: 'auto minmax(0, 1fr) auto',
      gridTemplateAreas: '"header" "main" "footer"',
      minWidth: '320px',
      minHeight: '100dvh',
      backgroundColor,
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
      [getMediaQueryMax('s')]: {
        display: 'none',
      },
    },
  });
};
