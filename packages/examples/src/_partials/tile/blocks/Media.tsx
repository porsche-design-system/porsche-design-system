import type { ComponentChildren } from 'preact';
import { Comment } from '../../Comment.tsx';
import { tileComments } from '../comments.ts';

/** The image or video lying behind the content of a tile and covering it, clipped to the corners of the tile. */
export const Media = ({ children }: { children: ComponentChildren }) => (
  <>
    <Comment>{tileComments.clip}</Comment>
    <div class="absolute inset-0 -z-1 overflow-clip rounded-[inherit]">{children}</div>
  </>
);
