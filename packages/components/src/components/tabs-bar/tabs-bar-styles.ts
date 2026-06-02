import {
  addImportantToEachRule,
  forcedColorsMediaQuery,
  getFocusBaseStyles,
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
  durationSm,
  easeInOut,
  fontPorscheNext,
  leadingNormal,
  radiusLg,
  radiusMd,
  radiusXl,
  spacingStatic2Xs,
  spacingStaticMd,
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

const sizeMap: Record<TabsBarSize, string> = {
  small: typescaleSm,
  medium: typescaleMd,
};

export const getComponentCss = (
  background: TabsBarBackground,
  size: BreakpointCustomizable<TabsBarSize>,
  isCompact: boolean,
  activeTabIndex: number | undefined
): string => {
  const hasBackground = background !== 'none';
  const hasActiveTab = activeTabIndex !== undefined;
  const nthActiveTab = hasActiveTab ? activeTabIndex + 1 : 0; // :nth-child is 1-based

  const radiusButton = hasBackground ? (isCompact ? radiusMd : radiusLg) : isCompact ? radiusLg : radiusXl;

  return getCss({
    '@global': {
      ':host': {
        display: 'grid',
        ...addImportantToEachRule(hostHiddenStyles),
      },
      ...preventFoucOfNestedElementsStyles,
      ...addImportantToEachRule({
        '::slotted': {
          '&(a),&(button)': {
            all: 'unset',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            borderRadius: radiusButton,
            // When the scroller has its own inset padding (hasBackground), shrink the tab
            // padding by the same amount so the overall hit area / visual height stays stable.
            padding: hasBackground
              ? isCompact
                ? `calc(7 * ${spacingStatic2Xs} - ${spacingStaticXs}) calc(${spacingStaticMd} - ${spacingStaticXs})`
                : `calc(${spacingStaticMd} - ${spacingStaticXs}) calc(28 * ${spacingStatic2Xs} - ${spacingStaticXs})`
              : isCompact
                ? `calc(6 * ${spacingStatic2Xs}) ${spacingStaticMd}`
                : `${spacingStaticMd} calc(28 * ${spacingStatic2Xs})`,
            font: `${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
            ...buildResponsiveStyles(size, (sizeValue: TabsBarSize) => ({
              fontSize: sizeMap[sizeValue],
            })),
            color: colorPrimary,
            // The :hover and active states must be animated on different background longhands so they can transition
            // independently of each other:
            //   - :hover  -> animates `background-color` (instant fade in/out on pointer move)
            //   - active  -> animates `background-size` from 0% to 100% (delayed reveal of a gradient image)
            // This shorthand seeds the defaults required for the active-state size transition (position `0 0`,
            // size `0% 100%`, `no-repeat`) without setting a `background-image` or `background-color`, leaving both
            // longhands free for the hover and active rules below.
            background: '0 0 / 0% 100% no-repeat',
            transition: `background-color ${durationSm} ${easeInOut}`,
          },
          '&(a:focus-visible),&(button:focus-visible)': getFocusBaseStyles(),
          ...hoverMediaQuery({
            [hasActiveTab
              ? `&(a:not(:nth-child(${nthActiveTab})):hover),&(button:not(:nth-child(${nthActiveTab})):hover)`
              : '&(a:hover),&(button:hover)']: {
              // `background-color` (not `background-image`) so hover transitions independently of the active state
              backgroundColor: colorFrosted,
            },
          }),
          ...(hasActiveTab && {
            [`&(a:nth-child(${nthActiveTab})),&(button:nth-child(${nthActiveTab}))`]: {
              // `background-image` (not `background-color`) so the active state transitions independently of :hover
              backgroundImage: `linear-gradient(${colorFrostedStrong}, ${colorFrostedStrong})`,
              backgroundSize: '100% 100%',
              transition: `background-size 0s linear ${durationMd}`,
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
          }),
        },
      }),
    },
    scroller: {
      '--_p-scroller-focus-ring-radius': radiusButton,
      placeSelf: 'flex-start', // ensures scroller doesn't get stretched in x- or y-axis in case the tabs-bar is taller than the scroller (e.g. when placed in flex or grid context)
      ...(hasBackground && {
        background: backgroundMap[background],
        padding: isCompact ? `calc(3 * ${spacingStatic2Xs})` : spacingStaticXs,
        borderRadius: isCompact ? radiusLg : radiusXl, // radius for rail
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
      borderRadius: radiusButton,
      background: colorFrostedStrong,
      ...forcedColorsMediaQuery({
        display: 'none',
      }),
    },
  });
};
