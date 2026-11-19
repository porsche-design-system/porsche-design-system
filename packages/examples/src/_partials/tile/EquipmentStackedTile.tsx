import { Comment } from '../Comment.tsx';
import { tileComments } from './blocks/comments.ts';
import { joinClasses, type TileHeadingTag, type TileImageSource, type TilePlacement } from './blocks/shared.ts';

type EquipmentStackedTileProps = TilePlacement & {
  /** The option, which names the tile. */
  heading: string;
  tag?: TileHeadingTag;
  text: string;
  /** What qualifies the heading or the text, e.g. the note a marker refers to. */
  note?: string;
  /** A photograph of the option – decorative, since the heading names it. */
  image: TileImageSource;
};

/**
 * An equipment option with its panels stacked: the photograph above, its name and its description below.
 *
 * It carries no action and nothing else to interact with. The tile is sized by its content, so it takes no aspect
 * ratio.
 */
export const EquipmentStackedTile = ({
  as: Root = 'div',
  class: placement,
  heading,
  tag = 'h2',
  text,
  note,
  image,
}: EquipmentStackedTileProps) => (
  <>
    <Comment>
      The radius of the panel plus the padding around it make the radius of the tile, so the two curves stay parallel.
      Nothing in the tile is interactive, so no focus indicator has to stay outside the frame.
    </Comment>
    <Root class={joinClasses(placement, 'grid gap-static-sm rounded-3xl bg-surface p-static-sm')}>
      <Comment>The photograph is the upper panel: cropped to its ratio, it rounds its corners itself.</Comment>
      <Comment>{tileComments.optionImage}</Comment>
      <img
        class="aspect-9/4 w-full object-cover rounded-2xl"
        src={image.src}
        alt=""
        width={image.width}
        height={image.height}
      />
      <div class="grid gap-static-md p-fluid-md">
        <p-heading tag={tag} size="lg">
          {heading}
        </p-heading>
        <p-text size="sm" color="contrast-medium">
          {text}
        </p-text>
        {note && (
          <>
            <Comment>The marker ties the note to the claim it qualifies, so it is read in context.</Comment>
            <p-text class="mt-fluid-sm" size="2xs" color="contrast-medium">
              {note}
            </p-text>
          </>
        )}
      </div>
    </Root>
  </>
);
