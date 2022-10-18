import { getTagName } from '../../utils';

export const LINK_TILE_WEIGHTS = ['regular', 'semibold', 'bold'] as const;
export type LinkTileWeight = typeof LINK_TILE_WEIGHTS[number];

export const LINK_TILE_ALIGN = ['top', 'bottom'] as const;
export type LinkTileAlign = typeof LINK_TILE_ALIGN[number];

export const LINK_TILE_ASPECT_RATIOS = ['1:1', '4:3', '3:4', '16:9', '9:16'] as const;
export type LinkTileAspectRatio = typeof LINK_TILE_ASPECT_RATIOS[number];

export const throwIfAlignTopWithoutCompact = (host: HTMLElement, align: LinkTileAlign, compact: boolean): void => {
  if (align === 'top' && !compact) {
    throw new Error(`Usage of ${getTagName(host)} is not valid. Top alignment is only possible when compact is true.`);
  }
};
