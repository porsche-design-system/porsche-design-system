import type { PropTypes } from '../../utils/validation/validateProps';
import type { ButtonTile } from '../button-tile/button-tile';
import type { LinkTile } from './link-tile';
import {
  AllowedTypes,
  LINK_BUTTON_TILE_ALIGNS,
  LINK_BUTTON_TILE_ASPECT_RATIOS,
  LINK_BUTTON_TILE_SIZES,
  LINK_BUTTON_TILE_WEIGHTS,
  LinkTileAlign,
  LinkTileAspectRatio,
  LinkTileSize,
  LinkTileWeight,
} from '../../utils';

export const sharedTilePropTypes:
  | Omit<PropTypes<typeof ButtonTile>, 'type' | 'disabled' | 'loading' | 'icon' | 'iconSource' | 'aria'>
  | Omit<PropTypes<typeof LinkTile>, 'href' | 'target' | 'download' | 'rel' | 'aria'> = {
  size: AllowedTypes.breakpoint<LinkTileSize>(LINK_BUTTON_TILE_SIZES),
  weight: AllowedTypes.breakpoint<LinkTileWeight>(LINK_BUTTON_TILE_WEIGHTS),
  aspectRatio: AllowedTypes.breakpoint<LinkTileAspectRatio>(LINK_BUTTON_TILE_ASPECT_RATIOS),
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  align: AllowedTypes.oneOf<LinkTileAlign>(LINK_BUTTON_TILE_ALIGNS),
  gradient: AllowedTypes.boolean,
  compact: AllowedTypes.breakpoint('boolean'),
};
