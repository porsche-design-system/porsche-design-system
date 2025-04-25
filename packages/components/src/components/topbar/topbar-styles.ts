import { getCss } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getThemedColors,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  getMediaQueryMax,
  getMediaQueryMin,
  gradientToBottomStyle,
  gridWideOffsetBase,
  gridWideOffsetS,
  gridWideOffsetXXL,
  spacingStaticMedium,
  spacingStaticSmall,
} from '@porsche-design-system/styles';

// public css variables
const cssVarTopBackground = '--p-topbar-top-background';

// private css variables
const cssVarGridWideOffset = '--_p-a';

export const getComponentCss = (hasGradient: boolean): string => {
  const { backgroundSurfaceColor: backgroundSurfaceColorDark } = getThemedColors('dark');

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
        '&[name="top"],&[name="bottom"]': {
          display: 'grid',
          gridTemplateColumns: 'subgrid',
        },
        '&[name="top"]': {
          gridArea: '1/1/2/-1',
          background: `var(${cssVarTopBackground}, ${backgroundSurfaceColorDark})`,
        },
        '&[name="bottom"]': {
          gridArea: '3/1/4/-1',
        },
        '&[name="start"],&[name="end"]': {
          display: 'flex',
          gap: `${spacingStaticSmall} ${spacingStaticMedium}`,
          flexFlow: 'wrap',
          alignItems: 'center',
        },
        '&[name="start"]': {
          gridArea: '2/2',
          justifyContent: 'start',
        },
        '&[name="end"]': {
          gridArea: '2/4',
          justifyContent: 'end',
        },
      },
      header: {
        [cssVarGridWideOffset]: `calc(${gridWideOffsetBase} - ${spacingStaticMedium})`,
        position: 'relative',
        zIndex: 0,
        display: 'grid',
        gridTemplate: `auto minmax(48px,auto) auto / var(${cssVarGridWideOffset}) minmax(0,1fr) auto minmax(0,1fr) var(${cssVarGridWideOffset})`,
        gap: spacingStaticMedium,
        alignItems: 'center',
        [getMediaQueryMin('s')]: {
          [cssVarGridWideOffset]: `calc(${gridWideOffsetS} - ${spacingStaticMedium})`,
        },
        [getMediaQueryMin('xxl')]: {
          [cssVarGridWideOffset]: `calc(${gridWideOffsetXXL} - ${spacingStaticMedium})`,
        },
        ...(hasGradient && {
          '&::before': {
            content: '""',
            gridArea: '2/1/-1/-1',
            alignSelf: 'stretch',
            marginBlock: `-${spacingStaticMedium} calc(-60px - ${spacingStaticMedium})`,
            zIndex: -1,
            pointerEvents: 'none',
            ...gradientToBottomStyle,
          },
        }),
      },
    },
    crest: {
      gridArea: '2/3',
      [getMediaQueryMin('s')]: {
        display: 'none',
      },
    },
    wordmark: {
      gridArea: '2/3',
      [getMediaQueryMax('s')]: {
        display: 'none',
      },
    },
  });
};
