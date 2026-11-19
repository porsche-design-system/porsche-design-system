import type { ComponentChildren } from 'preact';
import { Comment } from '../Comment.tsx';
import { tileComments } from './comments.ts';
import { joinClasses } from './tile.ts';

type TileGradientProps = {
  /** How the content on the gradient is laid out, and its padding – the top padding is how far the gradient reaches. */
  class: string;
  children: ComponentChildren;
};

/** The text at the lower edge of a tile covered by its media, on the gradient that keeps it legible. */
export const TileGradient = ({ class: layout, children }: TileGradientProps) => (
  <>
    <Comment>{tileComments.gradient}</Comment>
    <div class={joinClasses('self-end', layout, 'rounded-b-[inherit] bg-fade-to-t')}>{children}</div>
  </>
);
