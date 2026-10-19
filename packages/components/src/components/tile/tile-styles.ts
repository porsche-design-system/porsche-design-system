import {
  blurFrosted,
  colorCanvas,
  colorFrosted,
  colorPrimary,
  colorSurface,
  radius3Xl,
  ref,
  spacingFluidLg,
  spacingFluidMd,
  spacingFluidSm,
  spacingFluidXs,
} from '@porsche-design-system/stylesheets';
import { gradientStopsFadeDark } from '@porsche-design-system/tokens';
import type { JssStyle, Styles } from 'jss';
import {
  addImportantToEachRule,
  forcedColorsMediaQuery,
  getFocusBaseStyles,
  getTransition,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  buildResponsiveBooleanStyles,
  buildResponsiveStyles,
  getCss,
  isTruthyForAnyBreakpoint,
  type TileAspectRatio,
} from '../../utils';
import type { BreakpointCustomizable } from '../../utils/breakpoint-customizable';
import {
  isGradientActiveForEdge,
  TILE_EDGES,
  type TileBackground,
  type TileEdge,
  type TileGradient,
  type TileSlotState,
  tileAnchorSlot,
  tileBackgroundSlot,
} from './tile-utils';

/**
 * @css-variable {"name": "--p-tile-px", "description": "Horizontal padding of the tile.", "defaultValue": "spacing-fluid-md (spacing-fluid-sm when compact)"}
 */
const cssVarPaddingInline = '--p-tile-px';
/**
 * @css-variable {"name": "--p-tile-py", "description": "Vertical padding of the tile.", "defaultValue": "spacing-fluid-md (spacing-fluid-sm when compact)"}
 */
const cssVarPaddingBlock = '--p-tile-py';
/**
 * @css-variable {"name": "--p-tile-gap-x", "description": "Horizontal gap between the slots and between the elements within a slot.", "defaultValue": "spacing-fluid-sm (spacing-fluid-xs when compact)"}
 */
const cssVarGapInline = '--p-tile-gap-x';
/**
 * @css-variable {"name": "--p-tile-gap-y", "description": "Vertical gap between the slots and between the elements within a slot.", "defaultValue": "spacing-fluid-sm (spacing-fluid-xs when compact)"}
 */
const cssVarGapBlock = '--p-tile-gap-y';
/**
 * @css-variable {"name": "--p-tile-radius", "description": "Corner radius of the tile.", "defaultValue": "radius-3xl"}
 */
const cssVarRadius = '--p-tile-radius';
/**
 * @css-variable {"name": "--p-tile-bg", "description": "Background color of the tile, overrides the `background` prop. Changes are animated, e.g. to reveal the background on hover.", "defaultValue": "depends on `background` prop"}
 */
const cssVarBackground = '--p-tile-bg';
/**
 * @css-variable {"name": "--p-tile-gradient-fade", "description": "Distance the gradient extends beyond its slot towards the center of the tile.", "defaultValue": "spacing-fluid-lg"}
 */
const cssVarGradientFade = '--p-tile-gradient-fade';

// resolved values are set on an element inside the shadow DOM, so they are inherited by slotted content but can't be
// overridden from outside, which makes them read-only
/**
 * @css-variable {"name": "--ref-p-tile-px", "description": "Exposes the internally used padding-inline of the Tile as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the full horizontal size of the Tile."}
 */
const cssVarResolvedPaddingInline = '--ref-p-tile-px';
/**
 * @css-variable {"name": "--ref-p-tile-py", "description": "Exposes the internally used padding-block of the Tile as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the top or bottom of the Tile."}
 */
const cssVarResolvedPaddingBlock = '--ref-p-tile-py';
/**
 * @css-variable {"name": "--ref-p-tile-radius", "description": "Exposes the internally used corner radius of the Tile as read only CSS variable. A slotted `p-link` with `cover` uses it to render its focus ring around the Tile."}
 */
const cssVarResolvedRadius = '--ref-p-tile-radius';
const cssVarResolvedGapInline = '--_p-tile-gap-x';
const cssVarResolvedGapBlock = '--_p-tile-gap-y';

type TileArea = TileEdge | 'main';

const backgroundMap: Record<TileBackground, string> = {
  none: 'transparent',
  surface: ref(colorSurface),
  canvas: ref(colorCanvas),
  frosted: ref(colorFrosted),
};

// rows of top and bottom are sized by their content, so centering only aligns the items to each other (e.g. a heading
// next to an icon-only button), while the slot itself stays at the edge of the tile
const areaLayoutMap: Record<TileArea, { flexDirection: 'row' | 'column'; align: string; justify: string }> = {
  top: { flexDirection: 'row', align: 'center', justify: 'flex-start' },
  bottom: { flexDirection: 'row', align: 'center', justify: 'flex-start' },
  start: { flexDirection: 'column', align: 'flex-start', justify: 'center' },
  end: { flexDirection: 'column', align: 'flex-end', justify: 'center' },
  main: { flexDirection: 'column', align: 'center', justify: 'center' },
};

const getAreaLayoutStyles = (area: TileArea, hasAnchor: boolean): JssStyle => {
  const { flexDirection, align, justify } = areaLayoutMap[area];
  return {
    display: 'flex',
    flexDirection,
    ...(flexDirection === 'row' && { flexWrap: 'wrap' }),
    alignItems: align,
    justifyContent: justify,
    gap: `${ref(cssVarResolvedGapBlock)} ${ref(cssVarResolvedGapInline)}`,
    minWidth: 0,
    gridArea: area,
    // above the anchor overlay; without anchor, the slots don't create stacking contexts, so a slotted `p-link` with
    // `cover` can be placed above all content of the tile
    ...(hasAnchor && { zIndex: 3 }),
  };
};

// gradient color follows the color scheme by deriving it from the canvas color
const gradientStops = gradientStopsFadeDark.replaceAll('hsla(0,0%,0%,', `hsl(from ${ref(colorCanvas)} h s l / `);
const negate = (value: string): string => `calc(${value} * -1)`;

const gradientEdgeStyleMap: Record<TileEdge, JssStyle> = {
  top: {
    gridArea: 'top',
    marginBlock: `${negate(ref(cssVarResolvedPaddingBlock))} ${negate(ref(cssVarGradientFade, ref(spacingFluidLg)))}`,
    marginInline: negate(ref(cssVarResolvedPaddingInline)),
    background: `linear-gradient(to bottom, ${gradientStops})`,
    borderStartStartRadius: 'inherit',
    borderStartEndRadius: 'inherit',
  },
  bottom: {
    gridArea: 'bottom',
    marginBlock: `${negate(ref(cssVarGradientFade, ref(spacingFluidLg)))} ${negate(ref(cssVarResolvedPaddingBlock))}`,
    marginInline: negate(ref(cssVarResolvedPaddingInline)),
    background: `linear-gradient(to top, ${gradientStops})`,
    borderEndStartRadius: 'inherit',
    borderEndEndRadius: 'inherit',
  },
  start: {
    gridRow: '1/-1',
    gridColumn: 'start',
    marginBlock: negate(ref(cssVarResolvedPaddingBlock)),
    marginInline: `${negate(ref(cssVarResolvedPaddingInline))} ${negate(ref(cssVarGradientFade, ref(spacingFluidLg)))}`,
    background: `linear-gradient(to right, ${gradientStops})`,
    borderStartStartRadius: 'inherit',
    borderEndStartRadius: 'inherit',
    '&:dir(rtl)': {
      background: `linear-gradient(to left, ${gradientStops})`,
    },
  },
  end: {
    gridRow: '1/-1',
    gridColumn: 'end',
    marginBlock: negate(ref(cssVarResolvedPaddingBlock)),
    marginInline: `${negate(ref(cssVarGradientFade, ref(spacingFluidLg)))} ${negate(ref(cssVarResolvedPaddingInline))}`,
    background: `linear-gradient(to left, ${gradientStops})`,
    borderStartEndRadius: 'inherit',
    borderEndEndRadius: 'inherit',
    '&:dir(rtl)': {
      background: `linear-gradient(to right, ${gradientStops})`,
    },
  },
};

const getGridTemplateStyles = ({ top, bottom, start, end }: TileSlotState): JssStyle => {
  const columns: TileArea[] = [...(start ? ['start' as const] : []), 'main', ...(end ? ['end' as const] : [])];
  const rows: TileArea[][] = [
    ...(top ? [columns.map(() => 'top' as const)] : []),
    columns,
    ...(bottom ? [columns.map(() => 'bottom' as const)] : []),
  ];

  return {
    gridTemplateAreas: rows.map((row) => `"${row.join(' ')}"`).join(' '),
    gridTemplateColumns: columns.map((area) => (area === 'main' ? 'minmax(0,1fr)' : 'fit-content(50%)')).join(' '),
    // `1fr` keeps the content based minimum, so the tile grows beyond its aspect-ratio instead of overflowing
    gridTemplateRows: [...(top ? ['auto'] : []), '1fr', ...(bottom ? ['auto'] : [])].join(' '),
  };
};

const radius = ref(cssVarRadius, ref(radius3Xl));

// negative margins equal to the padding let the default slot reach the edges that aren't occupied by another layout slot
const getBleedStyles = (isBleed: boolean, { top, bottom, start, end }: TileSlotState): JssStyle => {
  const marginBlock = negate(ref(cssVarResolvedPaddingBlock));
  const marginInline = negate(ref(cssVarResolvedPaddingInline));
  return {
    marginBlockStart: isBleed && !top ? marginBlock : 0,
    marginBlockEnd: isBleed && !bottom ? marginBlock : 0,
    marginInlineStart: isBleed && !start ? marginInline : 0,
    marginInlineEnd: isBleed && !end ? marginInline : 0,
  };
};

export const getSlottedBackgroundPictureStyles = (tagName: string): Styles => ({
  '@global': {
    [`${tagName} > picture[slot="${tileBackgroundSlot}"] img`]: {
      ...addImportantToEachRule({
        display: 'block',
        width: '100%',
        height: '100%',
      }),
      objectFit: 'cover',
    },
  },
});

export const getComponentCss = (
  background: TileBackground,
  gradient: BreakpointCustomizable<TileGradient>,
  aspectRatio: BreakpointCustomizable<TileAspectRatio>,
  compact: BreakpointCustomizable<boolean>,
  bleed: BreakpointCustomizable<boolean>,
  slotState: TileSlotState
): string => {
  const { anchor: hasAnchor } = slotState;
  const hasBleed = isTruthyForAnyBreakpoint(bleed);

  return getCss({
    '@global': {
      ':host': {
        display: 'flex',
        alignItems: 'stretch',
        borderRadius: radius,
        // Safari workaround to scale the tile properly
        '@supports (-webkit-hyphens: auto)': {
          alignItems: 'baseline',
        },
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      slot: {
        '&:not([name])': {
          ...getAreaLayoutStyles('main', hasAnchor),
          textAlign: 'center',
          ...(hasBleed &&
            buildResponsiveBooleanStyles(bleed, (isBleed: boolean) => getBleedStyles(isBleed, slotState))),
        },
        ...Object.fromEntries(
          TILE_EDGES.map((edge) => [
            `&[name="${edge}"]`,
            slotState[edge] ? getAreaLayoutStyles(edge, hasAnchor) : { display: 'none' },
          ])
        ),
        [`&[name="${tileBackgroundSlot}"]`]: {
          display: 'block',
          position: 'absolute',
          inset: 0,
        },
        [`&[name="${tileAnchorSlot}"]`]: hasAnchor
          ? {
              display: 'block',
              position: 'absolute',
              inset: 0,
              zIndex: 2, // above background and gradient, below content
            }
          : { display: 'none' },
        ...(hasAnchor && {
          // content becomes click-through to reach the anchor, interactive elements opt in via `pointer-events: auto`
          [`&:not([name="${tileAnchorSlot}"])`]: {
            pointerEvents: 'none',
          },
        }),
      },
      ...(hasBleed &&
        Object.fromEntries(
          // media fills the default slot; with a fixed aspect ratio it doesn't increase the height of the tile, with
          // `auto` it defines the height by its own aspect ratio
          ['img', 'video'].map((tag) => [
            `::slotted(${tag}:not([slot]))`,
            {
              display: 'block',
              alignSelf: 'stretch',
              width: '100%',
              maxWidth: 'none',
              objectFit: 'cover',
              ...buildResponsiveStyles(aspectRatio, (aspectRatioValue: TileAspectRatio) =>
                aspectRatioValue === 'auto'
                  ? { flexGrow: 0, flexBasis: 'auto', minHeight: 'auto' }
                  : { flexGrow: 1, flexBasis: 0, minHeight: 0 }
              ),
            },
          ])
        )),
      [`::slotted([slot="${tileBackgroundSlot}"])`]: {
        ...addImportantToEachRule({
          position: 'absolute',
          inset: 0,
          display: 'block',
          width: '100%',
          height: '100%',
        }),
        objectFit: 'cover', // can be overridden, e.g. `contain` for transparent images on the background color
      },
      '::slotted': addImportantToEachRule({
        [`&([slot="${tileAnchorSlot}"])`]: {
          position: 'absolute',
          inset: 0,
          borderRadius: radius,
          pointerEvents: 'auto', // necessary in case the tile itself is nested in a click-through tile
          fontSize: 0, // hides the label visually while keeping it accessible
          color: 'transparent',
          ...forcedColorsMediaQuery({
            forcedColorAdjust: 'none',
            boxShadow: 'inset 0 0 0 2px LinkText',
          }),
        },
        [`&([slot="${tileAnchorSlot}"]:focus-visible)`]: getFocusBaseStyles(),
      }),
    },
    root: {
      position: 'relative', // containing block of the anchor, the background and a slotted `p-link` with `cover`
      isolation: 'isolate', // stacking context in which background, gradient, anchor and content are layered
      display: 'grid',
      width: '100%', // necessary in case tile content overflows in grid or flex context
      // Safari workaround to scale the tile properly
      '@supports (-webkit-hyphens: auto)': {
        height: '100%',
      },
      ...buildResponsiveBooleanStyles(compact, (isCompact: boolean) => ({
        [cssVarResolvedPaddingInline]: ref(cssVarPaddingInline, ref(isCompact ? spacingFluidSm : spacingFluidMd)),
        [cssVarResolvedPaddingBlock]: ref(cssVarPaddingBlock, ref(isCompact ? spacingFluidSm : spacingFluidMd)),
        [cssVarResolvedGapInline]: ref(cssVarGapInline, ref(isCompact ? spacingFluidXs : spacingFluidSm)),
        [cssVarResolvedGapBlock]: ref(cssVarGapBlock, ref(isCompact ? spacingFluidXs : spacingFluidSm)),
      })),
      [cssVarResolvedRadius]: radius,
      borderRadius: radius,
      color: ref(colorPrimary),
      backgroundColor: ref(cssVarBackground, backgroundMap[background]),
      // animates a changed `--p-tile-bg`, e.g. on hover, unless the user prefers reduced motion
      '@media (prefers-reduced-motion: no-preference)': {
        transition: getTransition('background-color'),
      },
      ...(background === 'frosted' && {
        WebkitBackdropFilter: ref(blurFrosted),
        backdropFilter: ref(blurFrosted),
      }),
      ...buildResponsiveStyles(aspectRatio, (aspectRatioValue: TileAspectRatio) => ({
        aspectRatio: aspectRatioValue,
      })),
    },
    content: {
      // not positioned, so a slotted `p-link` with `cover` is positioned relative to the root and its focus ring isn't
      // clipped
      display: 'grid',
      ...getGridTemplateStyles(slotState),
      boxSizing: 'border-box',
      padding: `${ref(cssVarResolvedPaddingBlock)} ${ref(cssVarResolvedPaddingInline)}`,
      gap: `${ref(cssVarResolvedGapBlock)} ${ref(cssVarResolvedGapInline)}`,
      // clips content bleeding to the edges (e.g. media) to the border-radius, `clip` instead of `hidden` to not create a
      // scroll container, the anchor is placed outside, so its focus ring isn't clipped
      overflow: 'clip',
      borderRadius: 'inherit',
    },
    background: {
      position: 'absolute',
      inset: 0,
      zIndex: -2, // below the content, which doesn't need to create stacking contexts
      pointerEvents: 'none',
      // positioned relative to the root, so it isn't clipped by the content
      overflow: 'clip',
      borderRadius: 'inherit',
    },
    gradient: {
      zIndex: -1, // above the background, below the content
      display: 'none',
      pointerEvents: 'none',
    },
    ...Object.fromEntries(
      TILE_EDGES.filter((edge) => slotState[edge]).map((edge) => [
        `gradient-${edge}`,
        {
          ...gradientEdgeStyleMap[edge],
          ...buildResponsiveStyles(gradient, (gradientValue: TileGradient) => ({
            display: isGradientActiveForEdge(gradientValue, edge) ? 'block' : 'none',
          })),
        },
      ])
    ),
  });
};
