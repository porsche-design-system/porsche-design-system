import type { ElementConfig, HTMLTagOrComponent } from '@porsche-design-system/story-generator';

/**
 * Stretches a link over its nearest positioned ancestor (the tile) via `::after`, which also renders the focus ring
 * around the whole tile. Interactive elements are placed above it via `relative z-2`.
 */
export const stretchedLinkClassName =
  'after:absolute after:inset-0 after:z-1 after:rounded-3xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-focus focus-visible:after:outline-offset-2';

/**
 * Same as `stretchedLinkClassName`, but for tiles without corner radius.
 */
export const stretchedLinkWithoutRadiusClassName = stretchedLinkClassName.replace(' after:rounded-3xl', '');

/**
 * Renders the `p-tile` example and its Tailwind CSS only counterpart side by side, or stacked for wide tiles. The
 * optional `p-tile` with a covering `p-link` follows in the next row.
 */
export const createComparison = (
  tile: ElementConfig<HTMLTagOrComponent>,
  tailwindTile: ElementConfig<HTMLTagOrComponent>,
  { stacked = false, coverTile }: { stacked?: boolean; coverTile?: ElementConfig<HTMLTagOrComponent> } = {}
): ElementConfig<HTMLTagOrComponent> => ({
  tag: 'div',
  properties: { className: stacked ? 'grid grid-cols-1 gap-static-md' : 'grid grid-cols-2 gap-static-md' },
  children: [tile, tailwindTile, ...(coverTile ? [coverTile] : [])],
});
