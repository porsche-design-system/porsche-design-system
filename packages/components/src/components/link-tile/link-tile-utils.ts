import { getTagName } from '../../utils';
import { BreakpointCustomizable } from '../../utils/breakpoint-customizable';

export const LINK_TILE_WEIGHTS = ['regular', 'semibold'] as const;
export type LinkTileWeight = typeof LINK_TILE_WEIGHTS[number];

export const LINK_TILE_SIZES = ['default', 'inherit'] as const;
export type LinkTileSize = typeof LINK_TILE_SIZES[number];

export const LINK_TILE_ALIGNS = ['top', 'bottom'] as const;
export type LinkTileAlign = typeof LINK_TILE_ALIGNS[number];

export const LINK_TILE_ASPECT_RATIOS = ['1:1', '4:3', '3:4', '16:9', '9:16'] as const;
export type LinkTileAspectRatio = typeof LINK_TILE_ASPECT_RATIOS[number];

// does not take care of breakpoint customizable
export const throwIfAlignTopAndNotCompact = (
  host: HTMLElement,
  align: LinkTileAlign,
  compact: BreakpointCustomizable<boolean>
): void => {
  if (align === 'top') {
    if (!compact || (typeof compact === 'string' && compact === 'false')) {
      throw new Error(
        `Usage of ${getTagName(host)} is not valid. Top alignment is only possible when compact is true.`
      );
    }
  }
};
