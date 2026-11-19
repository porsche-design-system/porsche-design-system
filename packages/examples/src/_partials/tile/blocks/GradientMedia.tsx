import type { ComponentChildren } from 'preact';
import { Comment } from '../../Comment.tsx';
import { tileComments } from './comments.ts';
import { joinClasses } from './shared.ts';

type GradientMediaProps = {
  /** Why the media is clipped by a wrapper rather than by the tile, where the tile has a reason of its own. */
  clip?: string;
  children: ComponentChildren;
};

/**
 * The image or video lying behind the text of a tile and covering it, clipped to the corners of the tile, with the
 * gradient that keeps the text legible.
 *
 * The tile has two rows, `grid-rows-[minmax(0,1fr)_auto]`, and its text lies in the lower one. This block spans both
 * and adopts them, which is how the gradient knows the height of the text without containing it: it is twice as high,
 * so the text lies where the gradient is dark enough for any image. The media in it is positioned to cover it.
 */
export const GradientMedia = ({ clip = tileComments.clip, children }: GradientMediaProps) => (
  <>
    <Comment>{clip}</Comment>
    <Comment>{tileComments.mediaRows}</Comment>
    <Comment>{tileComments.textGradient}</Comment>
    <div
      class={joinClasses(
        'relative -z-1 col-start-1 row-start-1 row-span-2 grid grid-rows-subgrid overflow-clip rounded-[inherit]',
        'after:absolute after:row-start-2 after:inset-x-0 after:bottom-0 after:h-[200%] after:bg-fade-to-t'
      )}
    >
      {children}
    </div>
  </>
);
