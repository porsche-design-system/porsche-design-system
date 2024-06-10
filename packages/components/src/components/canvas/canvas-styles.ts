import { getCss } from '../../utils';
import { addImportantToEachRule, colorSchemeStyles, getTransition, hostHiddenStyles } from '../../styles';
import { getMediaQueryMin, spacingStaticXSmall } from '@porsche-design-system/utilities-v2';
import { type CanvasSidebarWidth } from './canvas-utils';

const cssVariableSidebarLeftWidth = '--p-canvas-sidebar-left-width';
const cssVariableSidebarRightWidth = '--p-canvas-sidebar-right-width';

const gridProductiveGap = 'clamp(16px, 1.25vw + 12px, 24px)';
const mediaQueryDesktopView = getMediaQueryMin('m');
const sidebarWidths: { [key in CanvasSidebarWidth]: string } = {
  medium: '320px',
  large: '480px',
};

export const getComponentCss = (
  isSidebarLeftOpen: boolean,
  sidebarLeftWidth: CanvasSidebarWidth,
  isSidebarRightOpen: boolean,
  sidebarRightWidth: CanvasSidebarWidth
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
        position: 'relative',
        transition: getTransition('margin'),
        '&:first-of-type': {
          gridArea: 'sidebar-left',
          [mediaQueryDesktopView]: {
            width: `var(${cssVariableSidebarLeftWidth}, ${sidebarWidths[sidebarLeftWidth]})`,
            marginInlineStart: isSidebarLeftOpen
              ? 0
              : `calc(var(${cssVariableSidebarLeftWidth}, ${sidebarWidths[sidebarLeftWidth]}) * -1)`,
          },
        },
        '&:last-of-type': {
          gridArea: 'sidebar-right',
          [mediaQueryDesktopView]: {
            width: `var(${cssVariableSidebarRightWidth}, ${sidebarWidths[sidebarRightWidth]})`,
            marginInlineEnd: isSidebarRightOpen
              ? 0
              : `calc(var(${cssVariableSidebarRightWidth}, ${sidebarWidths[sidebarRightWidth]}) * -1)`,
          },
        },
      },
    },
    canvas: {
      display: 'grid',
      gridTemplateAreas: '"header" "sidebar-left" "main" "sidebar-right" "footer"',
      minWidth: '320px',
      minHeight: '100dvh',
      [mediaQueryDesktopView]: {
        gridTemplate: 'auto minmax(0, 1fr) auto / auto minmax(0, 1fr) auto',
        gridTemplateAreas:
          '"header header header" "sidebar-left main sidebar-right" "sidebar-left footer sidebar-right"',
      },
    },
    close: {
      position: 'absolute',
      inset: `${spacingStaticXSmall} ${spacingStaticXSmall} auto auto`,
    },
  });
};
