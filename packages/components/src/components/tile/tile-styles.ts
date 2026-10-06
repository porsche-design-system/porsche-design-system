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
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { buildResponsiveBooleanStyles, buildResponsiveStyles, getCss, type TileAspectRatio } from '../../utils';
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
 * @css-variable {"name": "--p-tile-bg", "description": "Background color of the tile, overrides the `background` prop.", "defaultValue": "depends on `background` prop"}
 */
const cssVarBackground = '--p-tile-bg';
/**
 * @css-variable {"name": "--p-tile-gradient-fade", "description": "Distance the gradient extends beyond its slot towards the center of the tile.", "defaultValue": "spacing-fluid-lg"}
 */
const cssVarGradientFade = '--p-tile-gradient-fade';
/**
 * @css-variable {"name": "--p-tile-{top|bottom|start|end|main}-align", "description": "Overrides `align-items` (cross axis) of the slot.", "defaultValue": "depends on slot"}
 * @css-variable {"name": "--p-tile-{top|bottom|start|end|main}-justify", "description": "Overrides `justify-content` (main axis) of the slot.", "defaultValue": "depends on slot"}
 */
const getCssVarAlign = (area: TileArea): string => `--p-tile-${area}-align`;
const getCssVarJustify = (area: TileArea): string => `--p-tile-${area}-justify`;

// internal resolved values, needed to extend gradients through the padding to the edges of the tile
const cssVarResolvedPaddingInline = '--_p-tile-px';
const cssVarResolvedPaddingBlock = '--_p-tile-py';
const cssVarResolvedGapInline = '--_p-tile-gap-x';
const cssVarResolvedGapBlock = '--_p-tile-gap-y';

type TileArea = TileEdge | 'main';

const backgroundMap: Record<TileBackground, string> = {
  surface: ref(colorSurface),
  canvas: ref(colorCanvas),
  frosted: ref(colorFrosted),
};

const areaLayoutMap: Record<TileArea, { flexDirection: 'row' | 'column'; align: string; justify: string }> = {
  top: { flexDirection: 'row', align: 'flex-start', justify: 'flex-start' },
  bottom: { flexDirection: 'row', align: 'flex-end', justify: 'flex-start' },
  start: { flexDirection: 'column', align: 'flex-start', justify: 'center' },
  end: { flexDirection: 'column', align: 'flex-end', justify: 'center' },
  main: { flexDirection: 'column', align: 'center', justify: 'center' },
};

const getAreaLayoutStyles = (area: TileArea): JssStyle => {
  const { flexDirection, align, justify } = areaLayoutMap[area];
  return {
    display: 'flex',
    flexDirection,
    ...(flexDirection === 'row' && { flexWrap: 'wrap' }),
    alignItems: ref(getCssVarAlign(area), align),
    justifyContent: ref(getCssVarJustify(area), justify),
    gap: `${ref(cssVarResolvedGapBlock)} ${ref(cssVarResolvedGapInline)}`,
    minWidth: 0,
    gridArea: area,
    zIndex: 3, // above anchor overlay
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
  slotState: TileSlotState
): string => {
  const { anchor: hasAnchor } = slotState;

  return getCss({
    '@global': {
      ':host': {
        display: 'flex',
        alignItems: 'stretch',
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
          ...getAreaLayoutStyles('main'),
          textAlign: 'center',
        },
        ...Object.fromEntries(
          TILE_EDGES.map((edge) => [
            `&[name="${edge}"]`,
            slotState[edge] ? getAreaLayoutStyles(edge) : { display: 'none' },
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
      position: 'relative', // containing block of background and anchor
      isolation: 'isolate',
      display: 'grid',
      ...getGridTemplateStyles(slotState),
      width: '100%', // necessary in case tile content overflows in grid or flex context
      // Safari workaround to scale the tile properly
      '@supports (-webkit-hyphens: auto)': {
        height: '100%',
      },
      boxSizing: 'border-box',
      ...buildResponsiveBooleanStyles(compact, (isCompact: boolean) => ({
        [cssVarResolvedPaddingInline]: ref(cssVarPaddingInline, ref(isCompact ? spacingFluidSm : spacingFluidMd)),
        [cssVarResolvedPaddingBlock]: ref(cssVarPaddingBlock, ref(isCompact ? spacingFluidSm : spacingFluidMd)),
        [cssVarResolvedGapInline]: ref(cssVarGapInline, ref(isCompact ? spacingFluidXs : spacingFluidSm)),
        [cssVarResolvedGapBlock]: ref(cssVarGapBlock, ref(isCompact ? spacingFluidXs : spacingFluidSm)),
      })),
      padding: `${ref(cssVarResolvedPaddingBlock)} ${ref(cssVarResolvedPaddingInline)}`,
      gap: `${ref(cssVarResolvedGapBlock)} ${ref(cssVarResolvedGapInline)}`,
      borderRadius: radius,
      color: ref(colorPrimary),
      backgroundColor: ref(cssVarBackground, backgroundMap[background]),
      ...(background === 'frosted' && {
        WebkitBackdropFilter: ref(blurFrosted),
        backdropFilter: ref(blurFrosted),
      }),
      ...buildResponsiveStyles(aspectRatio, (aspectRatioValue: TileAspectRatio) => ({
        aspectRatio: aspectRatioValue,
      })),
    },
    background: {
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      overflow: 'hidden', // clips slotted media to the border-radius, also when it is scaled by custom styles
      borderRadius: 'inherit',
      pointerEvents: 'none',
    },
    gradient: {
      zIndex: 1,
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
