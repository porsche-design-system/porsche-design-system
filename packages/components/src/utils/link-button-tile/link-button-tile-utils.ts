import type { BreakpointCustomizable } from '../breakpoint-customizable';
import { getTagName } from '../tag-name';

export const LINK_BUTTON_TILE_ASPECT_RATIOS = ['1:1', '4:3', '3:4', '16:9', '9:16'] as const;
export type LinkTileAspectRatio = typeof LINK_BUTTON_TILE_ASPECT_RATIOS[number];
export type ButtonTileAspectRatio = LinkTileAspectRatio;

export const LINK_BUTTON_TILE_SIZES = ['default', 'inherit'] as const;
export type LinkTileSize = typeof LINK_BUTTON_TILE_SIZES[number];
export type ButtonTileSize = LinkTileSize;

export const LINK_BUTTON_TILE_WEIGHTS = ['regular', 'semi-bold'] as const;
export type LinkTileWeight = typeof LINK_BUTTON_TILE_WEIGHTS[number];
export type ButtonTileWeight = LinkTileWeight;

export const LINK_BUTTON_TILE_ALIGNS = ['top', 'bottom'] as const;
export type LinkTileAlign = typeof LINK_BUTTON_TILE_ALIGNS[number];
export type ButtonTileAlign = LinkTileAlign;

// does not take care of breakpoint customizable
export const throwIfAlignTopAndNotCompact = (
  host: HTMLElement,
  align: LinkTileAlign | ButtonTileAlign,
  compact: BreakpointCustomizable<boolean>
): void => {
  if (align === 'top' && (!compact || (typeof compact === 'string' && compact === 'false'))) {
    throw new Error(`Usage of ${getTagName(host)} is not valid. Top alignment is only possible when compact is true.`);
  }
};

export type TileProps = {
  size?: BreakpointCustomizable<ButtonTileSize>;
  weight?: BreakpointCustomizable<ButtonTileWeight>;
  aspectRatio?: BreakpointCustomizable<ButtonTileAspectRatio>;
  label: string;
  description: string;
  align?: ButtonTileAlign;
  gradient?: boolean;
  compact?: BreakpointCustomizable<boolean>;
};
