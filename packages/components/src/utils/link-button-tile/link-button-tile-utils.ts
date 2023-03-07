import { BreakpointCustomizable } from '../breakpoint-customizable';
import { getTagName } from '../tag-name';

export const LINK_BUTTON_TILE_ASPECT_RATIOS = ['1:1', '4:3', '3:4', '16:9', '9:16'] as const;
export type LinkButtonTileAspectRatio = typeof LINK_BUTTON_TILE_ASPECT_RATIOS[number];

export const LINK_BUTTON_TILE_SIZES = ['default', 'inherit'] as const;
export type LinkButtonTileSize = typeof LINK_BUTTON_TILE_SIZES[number];

export const LINK_BUTTON_TILE_WEIGHTS = ['regular', 'semibold'] as const;
export type LinkButtonTileWeight = typeof LINK_BUTTON_TILE_WEIGHTS[number];

export const LINK_BUTTON_TILE_ALIGNS = ['top', 'bottom'] as const;
export type LinkButtonTileAlign = typeof LINK_BUTTON_TILE_ALIGNS[number];

// does not take care of breakpoint customizable
export const throwIfAlignTopAndNotCompact = (
  host: HTMLElement,
  align: LinkButtonTileAlign,
  compact: BreakpointCustomizable<boolean>
): void => {
  if (align === 'top' && (!compact || (typeof compact === 'string' && compact === 'false'))) {
    throw new Error(`Usage of ${getTagName(host)} is not valid. Top alignment is only possible when compact is true.`);
  }
};
