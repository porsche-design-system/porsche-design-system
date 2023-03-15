import { getTagName } from '../../utils';
import type { BreakpointCustomizable } from '../../utils/breakpoint-customizable';
import type { LinkTarget } from '../../utils/link-button/link-target';
import type { LinkAriaAttribute } from '../link/link-utils';

/** @deprecated */
export const LINK_TILE_WEIGHTS_DEPRECATED = ['semibold'] as const;
/** @deprecated */
export type LinkTileWeightDeprecated = (typeof LINK_TILE_WEIGHTS_DEPRECATED)[number];
// find a name to have those seperated + joined
export const LINK_TILE_WEIGHTS = ['regular', 'semi-bold'] as const;
export type LinkTileWeight = (typeof LINK_TILE_WEIGHTS)[number];

export const LINK_TILE_WEIGHTS_WITH_DEPRECATED = ['regular', 'semi-bold', ...LINK_TILE_WEIGHTS_DEPRECATED] as const;
export type LinkTileWeightWithDeprecated = (typeof LINK_TILE_WEIGHTS_WITH_DEPRECATED)[number];

export const LINK_TILE_SIZES = ['default', 'inherit'] as const;
export type LinkTileSize = (typeof LINK_TILE_SIZES)[number];

export const LINK_TILE_ALIGNS = ['top', 'bottom'] as const;
export type LinkTileAlign = (typeof LINK_TILE_ALIGNS)[number];

export const LINK_TILE_ASPECT_RATIOS = ['1:1', '4:3', '3:4', '16:9', '9:16'] as const;
export type LinkTileAspectRatio = (typeof LINK_TILE_ASPECT_RATIOS)[number];

export type LinkTileTarget = LinkTarget;
export type LinkTileAriaAttribute = LinkAriaAttribute;

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
