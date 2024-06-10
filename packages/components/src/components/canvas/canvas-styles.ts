import { getCss } from '../../utils';
import { addImportantToEachRule, colorSchemeStyles, getTransition, hostHiddenStyles } from '../../styles';
import { getMediaQueryMin, spacingStaticXSmall, gridGap } from '@porsche-design-system/utilities-v2';
import { type CanvasSidebarWidth } from './canvas-utils';

const cssVariableSidebarStartWidth = '--p-canvas-sidebar-start-width';
const cssVariableSidebarEndWidth = '--p-canvas-sidebar-end-width';

// TODO: maybe default grid gap would also work
const gridProductiveGap = gridGap.replace('36px', '24px');
const mediaQueryDesktopView = getMediaQueryMin('m');
const sidebarWidths: { [key in CanvasSidebarWidth]: string } = {
  medium: '320px',
  large: '480px', // TODO: won't work at viewport 1000px when both sidebars are opened
};

export const getComponentCss = (
  isSidebarStartOpen: boolean,
  sidebarStartWidth: CanvasSidebarWidth,
  isSidebarEndOpen: boolean,
  sidebarEndWidth: CanvasSidebarWidth
): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
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
      },
      aside: {
        // TODO: box-shadows or colored surface must be defined, design is missing
        position: 'relative',
        transition: getTransition('margin'),
        '&:first-of-type': {
          gridArea: 'sidebar-start',
          width: `var(${cssVariableSidebarStartWidth}, ${sidebarWidths[sidebarStartWidth]})`,
          marginInlineStart: isSidebarStartOpen
            ? 0
            : `calc(var(${cssVariableSidebarStartWidth}, ${sidebarWidths[sidebarStartWidth]}) * -1)`,
        },
        '&:last-of-type': {
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
      [mediaQueryDesktopView]: {
        gridTemplate: 'auto minmax(0, 1fr) auto / auto minmax(0, 1fr) auto',
        gridTemplateAreas: '"header header header" "sidebar-start main sidebar-end" "sidebar-start footer sidebar-end"',
      },
    },
    close: {
      // TODO: must be positioned properly, design is missing
      position: 'absolute',
      inset: `${spacingStaticXSmall} ${spacingStaticXSmall} auto auto`,
    },
  });
};
