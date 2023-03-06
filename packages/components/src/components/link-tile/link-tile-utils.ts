import { getTagName } from '../../utils';
import type { BreakpointCustomizable } from '../../utils/breakpoint-customizable';

export const LINK_TILE_ALIGNS = ['top', 'bottom'] as const;
export type LinkTileAlign = typeof LINK_TILE_ALIGNS[number];

// does not take care of breakpoint customizable
export const throwIfAlignTopAndNotCompact = (
  host: HTMLElement,
  align: LinkTileAlign,
  compact: BreakpointCustomizable<boolean>
): void => {
  if (align === 'top' && (!compact || (typeof compact === 'string' && compact === 'false'))) {
    throw new Error(`Usage of ${getTagName(host)} is not valid. Top alignment is only possible when compact is true.`);
  }
};
