import {
  blurFrosted,
  colorCanvas,
  colorFrosted,
  colorFrostedStrong,
  colorPrimary,
  colorSurface,
  durationMd,
  fontPorscheNext,
  leadingNormal,
  legacyRadiusSmall,
  radiusFull,
  ref,
  spacingStaticMd,
  spacingStaticSm,
  spacingStaticXs,
  typescaleMd,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import {
  addImportantToEachRule,
  forcedColorsMediaQuery,
  getFocusBaseStyles,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import type { BreakpointCustomizable } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import { animatingAttribute, type TabsBarBackground, type TabsBarSize } from './tabs-bar-utils';

const backgroundMap: Record<Exclude<TabsBarBackground, 'none'>, string> = {
  canvas: ref(colorCanvas),
  surface: ref(colorSurface),
  frosted: ref(colorFrosted),
};

const fontSizeText = {
  small: ref(typescaleSm),
  medium: ref(typescaleMd),
};

export const getComponentCss = (
  background: TabsBarBackground,
  size: BreakpointCustomizable<TabsBarSize>,
  isCompact: boolean,
  activeTabIndex: number | undefined
): string => {
  const hasActive = activeTabIndex !== undefined;
  // :nth-child is 1-based
  const nth = hasActive ? activeTabIndex + 1 : 0;
  const activeSelector = `&(a:nth-child(${nth})),&(button:nth-child(${nth}))`;
  const notActiveHoverSelector = hasActive
    ? `&(a:not(:nth-child(${nth})):hover),&(button:not(:nth-child(${nth})):hover)`
    : '&(a:hover),&(button:hover)';

  return getCss({
    '@global': {
      ':host': {
        display: 'grid',
        ...addImportantToEachRule({
          position: 'relative', // necessary for the bar animation to calculate the tab items position correctly
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      ...addImportantToEachRule({
        '::slotted': {
          '&(a),&(button)': {
            all: 'unset',
            padding: isCompact ? `2px ${ref(spacingStaticSm)}` : `12px ${ref(spacingStaticMd)}`,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            borderRadius: ref(legacyRadiusSmall, ref(radiusFull)),
            ...(background === 'none' && {
              background: ref(colorFrosted),
            }),
            font: `${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
            ...buildResponsiveStyles(size, (sizeValue: TabsBarSize) => ({
              fontSize: fontSizeText[sizeValue],
            })),
            color: ref(colorPrimary),
          },
          '&(a:focus-visible),&(button:focus-visible)': getFocusBaseStyles(),
          ...hoverMediaQuery({
            [notActiveHoverSelector]: {
              // Only applied on hover since applying it globally causes the active tab to visually flash when navigating in SPAs (where the tabs-bar persist across routes but the children tabs change).
              transition: `${getTransition('color', 'moderate')}, ${getTransition('background-color')}`,
              background: ref(colorFrostedStrong),
            },
          }),
          ...(hasActive && {
            [activeSelector]: {
              color: ref(colorCanvas),
            },
            // Transition color and background when animation is playing
            [`&(a:nth-child(${nth})[${animatingAttribute}]),&(button:nth-child(${nth})[${animatingAttribute}])`]: {
              transition: `${getTransition('color', 'moderate')}, background-color 0s linear ${ref(durationMd)}`,
            },
            // Apply background only when no active animation is playing
            [`&(a:nth-child(${nth}):not([${animatingAttribute}])),&(button:nth-child(${nth}):not([${animatingAttribute}]))`]:
              {
                background: ref(colorPrimary),
              },
          }),
          ...forcedColorsMediaQuery({
            '&(a),&(button)': {
              forcedColorAdjust: 'none',
              background: 'Canvas',
            },
            '&(a)': {
              color: 'LinkText',
              boxShadow: 'inset 0 0 0 2px LinkText',
            },
            '&(button)': {
              color: 'ButtonText',
              boxShadow: 'inset 0 0 0 2px ButtonBorder',
            },
            ...(hasActive && {
              [activeSelector]: {
                transition: 'unset',
              },
            }),
          }),
        },
      }),
    },
    scroller: {
      placeSelf: 'flex-start', // ensures scroller doesn't get stretched in x- or y-axis in case the tabs-bar is taller than the scroller (e.g. when placed in flex or grid context)
      borderRadius: ref(legacyRadiusSmall, ref(radiusFull)),
      ...(background !== 'none' && {
        background: backgroundMap[background],
        padding: ref(spacingStaticXs),
        ...forcedColorsMediaQuery({
          forcedColorAdjust: 'none',
          outline: '1px solid CanvasText',
        }),
      }),
      ...(background === 'frosted' && {
        WebkitBackdropFilter: ref(blurFrosted),
        backdropFilter: ref(blurFrosted),
      }),
    },
    bar: {
      position: 'absolute',
      insetInlineStart: 0, // necessary for the bar animation to calculate the tab items position correctly in rtl mode
      width: '0px', // ensures element is not visible after `.animate()` has finished
      height: '100%',
      zIndex: -1,
      pointerEvents: 'none',
      borderRadius: ref(legacyRadiusSmall, ref(radiusFull)),
      background: ref(colorPrimary),
    },
  });
};
