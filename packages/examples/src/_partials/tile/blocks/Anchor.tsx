import { Comment } from '../../Comment.tsx';
import { tileComments } from '../comments.ts';

type AnchorProps = {
  href: string;
  /** The accessible name of the link, and with it of the tile. */
  label: string;
  /** What else the tile has to say about its link, e.g. on where it stands in the markup. */
  note?: string;
};

/** The link spanning a tile that carries no `p-link` to cover it – the tile is its positioned ancestor. */
export const Anchor = ({ href, label, note }: AnchorProps) => (
  <>
    <Comment>{tileComments.anchorLink}</Comment>
    {note && <Comment>{note}</Comment>}
    <a href={href} class="absolute inset-0 z-1 rounded-[inherit] focus-visible:outline outline-focus outline-offset-2">
      <span class="sr-only">{label}</span>
    </a>
  </>
);
