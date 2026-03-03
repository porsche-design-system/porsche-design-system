import {
  addImportantToEachRule,
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
        display: 'block',
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
            transition: `${getTransition('color', 'moderate')}, ${getTransition('background-color')}`,
          },
          '&(a:focus-visible),&(button:focus-visible)': getFocusBaseStyles(),
          ...hoverMediaQuery({
            '&(a:not([aria-current="true"]):hover),&(button:not([aria-selected="true"]):hover)': {
              background: colorFrostedStrong,
            },
          }),
          '&(a[aria-current="true"]),&(button[aria-selected="true"])': {
            color: colorCanvas,
            background: colorPrimary,
            transition: `${getTransition('color', 'moderate')}, background-color 0s linear ${durationMd}`, // the background shall be changed immediately after the bar transition has finished
          },
        },
      }),
    },
    scroller: {
      borderRadius: radiusFull,
      ...(background !== 'none' && {
        background: backgroundMap[background],
        padding: spacingStaticXs,
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
