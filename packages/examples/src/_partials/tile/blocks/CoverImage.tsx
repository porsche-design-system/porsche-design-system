import { Comment } from '../../Comment.tsx';
import { tileComments } from '../comments.ts';
import { joinClasses, type TileImageSource } from './shared.ts';

type CoverImageProps = TileImageSource & {
  /** What the image does besides covering the tile, e.g. dimming. */
  class?: string;
  /** Why it does so – a comment of its own before the image. */
  note?: string;
};

/**
 * The mood image lying behind the content of a tile and covering it – decorative, and at rest: an image that zooms is
 * a `ZoomImage` in a `Media` instead, which clips it.
 */
export const CoverImage = ({ class: effect, note, src, width, height }: CoverImageProps) => (
  <>
    <Comment>{tileComments.moodImage}</Comment>
    <Comment>{tileComments.coverImage}</Comment>
    {note && <Comment>{note}</Comment>}
    <img
      class={joinClasses('absolute inset-0 -z-1 size-full object-cover rounded-[inherit]', effect)}
      src={src}
      alt=""
      width={width}
      height={height}
    />
  </>
);
