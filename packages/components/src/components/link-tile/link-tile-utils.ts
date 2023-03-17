import type { PropTypes } from '../../utils/validation/validateProps';
import type { ButtonTile } from '../button-tile/button-tile';
import type { LinkTile } from './link-tile';
import {
  AllowedTypes,
  ButtonTileAlign,
  ButtonTileAspectRatio,
  ButtonTileSize,
  LINK_BUTTON_TILE_ALIGNS,
  LINK_BUTTON_TILE_ASPECT_RATIOS,
  LINK_BUTTON_TILE_SIZES,
  LinkTileAlign,
  LinkTileAspectRatio,
  LinkTileSize,
} from '../../utils';
import { LinkTarget } from '../../utils/link-button/link-target';
import { LinkAriaAttribute } from '../link/link-utils';

export type LinkTileTarget = LinkTarget;

export type LinkTileAriaAttribute = LinkAriaAttribute;

type CommonButtonAndLinkTileProps = {
  [K in keyof PropTypes<typeof ButtonTile> & keyof PropTypes<typeof LinkTile>]:
    | PropTypes<typeof ButtonTile>[K]
    | PropTypes<typeof LinkTile>[K];
};

export const sharedTilePropTypes: Omit<CommonButtonAndLinkTileProps, 'aria' | 'weight'> = {
  size: AllowedTypes.breakpoint<ButtonTileSize | LinkTileSize>(LINK_BUTTON_TILE_SIZES),
  aspectRatio: AllowedTypes.breakpoint<ButtonTileAspectRatio | LinkTileAspectRatio>(LINK_BUTTON_TILE_ASPECT_RATIOS),
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  align: AllowedTypes.oneOf<ButtonTileAlign | LinkTileAlign>(LINK_BUTTON_TILE_ALIGNS),
  gradient: AllowedTypes.boolean,
  compact: AllowedTypes.breakpoint('boolean'),
};
