import {
  addImportantToEachRule,
  forcedColorsMediaQuery,
  getFocusBaseStyles,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
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
  spacingStaticMd,
  spacingStaticSm,
  spacingStaticXs,
  typescaleMd,
  typescaleSm,
} from '../../styles/css-variables';
import type { BreakpointCustomizable } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import type { TabsBarBackground, TabsBarSize } from './tabs-bar-utils';

export const delayTabStyleAttribute = 'data-delay';

const backgroundMap: Record<Exclude<TabsBarBackground, 'none'>, string> = {
  canvas: colorCanvas,
  surface: colorSurface,
  frosted: colorFrosted,
};

const fontSizeText = {
  small: typescaleSm,
  medium: typescaleMd,
};

export const getComponentCss = (
  background: TabsBarBackground,
  size: BreakpointCustomizable<TabsBarSize>,
  isCompact: boolean
): string => {
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
            padding: isCompact ? `2px ${spacingStaticSm}` : `12px ${spacingStaticMd}`,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            borderRadius: `var(${legacyRadiusSmall}, ${radiusFull})`,
            ...(background === 'none' && {
              background: colorFrosted,
            }),
            font: `${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
            ...buildResponsiveStyles(size, (sizeValue: TabsBarSize) => ({
              fontSize: fontSizeText[sizeValue],
            })),
            color: colorPrimary,
          },
          '&(a:focus-visible),&(button:focus-visible)': getFocusBaseStyles(),
          ...hoverMediaQuery({
            '&(a:not([aria-current="true"]):hover),&(button:not([aria-selected="true"]):hover)': {
              // Only applied on hover since applying it globally causes the active tab to visually flash when navigating in SPAs (where the tabs-bar persist across routes but the children tabs change).
              transition: `${getTransition('color', 'moderate')}, ${getTransition('background-color')}`,
              background: colorFrostedStrong,
            },
          }),
          // The data attribute is applied before the tabs switching animation runs in the utils to delay the selected tab styles until the animation is finished
          [`&(a[${delayTabStyleAttribute}]),&(button[${delayTabStyleAttribute}])`]: {
            transition: `${getTransition('color', 'moderate')}, background-color 0s linear ${durationMd}`, // the background shall be changed immediately after the bar transition has finished
          },
          '&(a[aria-current="true"]),&(button[aria-selected="true"])': {
            color: colorCanvas,
            background: colorPrimary,
          },
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
            '&(a[aria-current="true"]),&(button[aria-selected="true"])': {
              transition: 'unset',
            },
          }),
        },
      }),
    },
    scroller: {
      placeSelf: 'flex-start', // ensures scroller doesn't get stretched in x- or y-axis in case the tabs-bar is taller than the scroller (e.g. when placed in flex or grid context)
      borderRadius: `var(${legacyRadiusSmall}, ${radiusFull})`,
      ...(background !== 'none' && {
        background: backgroundMap[background],
        padding: spacingStaticXs,
        ...forcedColorsMediaQuery({
          forcedColorAdjust: 'none',
          outline: '1px solid CanvasText',
        }),
      }),
      ...(background === 'frosted' && {
        WebkitBackdropFilter: blurFrosted,
        backdropFilter: blurFrosted,
      }),
    },
    bar: {
      position: 'absolute',
      insetInlineStart: 0, // necessary for the bar animation to calculate the tab items position correctly in rtl mode
      width: '0px', // ensures element is not visible after `.animate()` has finished
      height: '100%',
      zIndex: -1,
      pointerEvents: 'none',
      borderRadius: `var(${legacyRadiusSmall}, ${radiusFull})`,
      background: colorPrimary,
    },
  });
};
