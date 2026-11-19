import { Comment } from '../Comment.tsx';
import { tileComments } from './comments.ts';
import { joinClasses, type TileImageSource, tileZoom } from './tile.ts';

type TileImageProps = TileImageSource & {
  /** How the image is fitted into the room it is given. */
  class: string;
  /** Empty for a decorative image – the tile says why in a comment before it. */
  alt: string;
};

/** The image of a tile that zooms in while the tile is hovered. */
export const TileImage = ({ class: fit, src, alt, width, height }: TileImageProps) => (
  <>
    <Comment>{tileComments.zoom}</Comment>
    <img class={joinClasses(fit, tileZoom)} src={src} alt={alt} width={width} height={height} />
  </>
);
