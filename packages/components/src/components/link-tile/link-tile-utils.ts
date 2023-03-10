import type { PropTypes } from '../../utils/validation/validateProps';
import type { ButtonTile } from '../button-tile/button-tile';
import type { LinkTile } from './link-tile';
import {
  AllowedTypes,
  LINK_BUTTON_TILE_ALIGNS,
  LINK_BUTTON_TILE_ASPECT_RATIOS,
  LINK_BUTTON_TILE_SIZES,
  LinkTileAlign,
  LinkTileAspectRatio,
  LinkTileSize,
} from '../../utils';

type CommonButtonAndLinkTileProps = {
  [K in keyof PropTypes<typeof ButtonTile> & keyof PropTypes<typeof LinkTile>]:
    | PropTypes<typeof ButtonTile>[K]
    | PropTypes<typeof LinkTile>[K];
};

export const sharedTilePropTypes: Omit<CommonButtonAndLinkTileProps, 'aria' | 'weight'> = {
  size: AllowedTypes.breakpoint<LinkTileSize>(LINK_BUTTON_TILE_SIZES),
  aspectRatio: AllowedTypes.breakpoint<LinkTileAspectRatio>(LINK_BUTTON_TILE_ASPECT_RATIOS),
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  align: AllowedTypes.oneOf<LinkTileAlign>(LINK_BUTTON_TILE_ALIGNS),
  gradient: AllowedTypes.boolean,
  compact: AllowedTypes.breakpoint('boolean'),
};
