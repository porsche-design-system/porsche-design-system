import { BreakpointCustomizable } from '../breakpoint-customizable';
import { getTagName } from '../tag-name';

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
