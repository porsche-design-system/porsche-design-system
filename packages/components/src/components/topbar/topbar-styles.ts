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
  gridGap,
  gridWideOffsetBase,
  gridWideOffsetS,
  gridWideOffsetXXL,
  spacingFluidMedium,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/styles';

// public css variables
const cssVarTopBackground = '--p-topbar-top-background';
const cssVarSlottedMargin = '--ref-p-topbar-slotted-margin';
const cssVarSlottedPadding = '--ref-p-topbar-slotted-padding';

// private css variables
const cssVarGridWideOffset = '--_p-a';

export const getComponentCss = (hasGradient: boolean): string => {
  const { backgroundSurfaceColor: backgroundSurfaceColorDark } = getThemedColors('dark');

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          [cssVarSlottedMargin]: `calc(-1 * ${spacingStaticXSmall})`, // keeps the alignment of e.g. a slotted p-button-pure in sync with the Porsche Grid
          [cssVarSlottedPadding]: spacingStaticXSmall, // keeps the sizing of e.g. a slotted p-button-pure in sync with e.g. a compact p-button or p-input-search
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      slot: {
        '&[name="top"]': {
          gridArea: '1/1/2/-1',
          background: `var(${cssVarTopBackground}, ${backgroundSurfaceColorDark})`,
        },
        '&[name="bottom"]': {
          gridArea: '3/1/4/-1',
        },
        '&[name="start"]': {
          gridArea: '2/2',
          justifyContent: 'start',
        },
        '&[name="end"]': {
          gridArea: '2/4',
          justifyContent: 'end',
        },
        '&[name="top"],&[name="bottom"]': {
          display: 'flex',
          gap: `${spacingStaticSmall} ${spacingStaticMedium}`,
          flexFlow: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '&[name="start"],&[name="end"]': {
          display: 'flex',
          gap: `${spacingStaticSmall} ${spacingStaticMedium}`,
          flexFlow: 'wrap',
          alignItems: 'center',
        },
      },
      header: {
        [cssVarGridWideOffset]: `calc(${gridWideOffsetBase} - ${gridGap})`,
        position: 'relative',
        zIndex: 0, // ensures gradient is above content behind the topbar
        display: 'grid',
        gridTemplate: `auto minmax(48px,auto) auto / var(${cssVarGridWideOffset}) minmax(0,1fr) auto minmax(0,1fr) var(${cssVarGridWideOffset})`,
        gap: `${spacingStaticMedium} ${gridGap}`,
        alignItems: 'center',
        [getMediaQueryMin('s')]: {
          [cssVarGridWideOffset]: `calc(${gridWideOffsetS} - ${gridGap})`,
        },
        [getMediaQueryMin('xxl')]: {
          [cssVarGridWideOffset]: `calc(${gridWideOffsetXXL} - ${gridGap})`,
        },
        ...(hasGradient && {
          '&::before': {
            content: '""',
            gridArea: '2/1/-1/-1',
            alignSelf: 'stretch',
            marginBlock: `-${spacingStaticMedium} calc(-60px - ${spacingStaticMedium})`,
            zIndex: -1, // ensures gradient is below slotted content
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
