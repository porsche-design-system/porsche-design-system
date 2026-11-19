import type { JSX } from 'preact';

/** What every tile partial takes from the page it is rendered in. */
export type TileProps = {
  /** The element of the tile – a list item where the page lists its tiles. */
  as?: 'div' | 'li';
  /** Where the tile sits in the layout of the page: its column, its alignment, its width limit, its span. */
  class?: string;
  /**
   * The aspect ratio utilities of the tile. They replace the ratio the tile is designed in rather than adding to it,
   * since two ratios on one element would leave the choice to the order of the stylesheet.
   */
  aspect?: string;
};

/** The level of the heading of a tile – the second in a section of its own, the third below the heading of a group. */
export type TileHeadingTag = NonNullable<JSX.IntrinsicElements['p-heading']['tag']>;

/** An image of a tile, with the intrinsic size the browser reserves its room with. */
export type TileImageSource = { src: string; width: number; height: number };

/** Zooms the media in while the tile is hovered – `tileComments.zoom` says so in the markup. */
export const tileZoom = 'motion-safe:transition-[scale] duration-md ease-in-out motion-safe:group-hover:scale-105';

/** Joins the classes of an element in the order given, leaving out what is not set. */
export const joinClasses = (...classes: (string | false | undefined)[]): string => classes.filter(Boolean).join(' ');
