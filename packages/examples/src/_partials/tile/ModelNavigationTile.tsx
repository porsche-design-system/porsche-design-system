import { Comment } from '../Comment.tsx';
import { Anchor } from './blocks/Anchor.tsx';
import { joinClasses, type TileHeadingTag, type TileImageSource, type TileProps } from './blocks/shared.ts';
import { tileComments } from './comments.ts';

type ModelNavigationTileProps = TileProps & {
  /** The model, which heads the tile and names its link. */
  heading: string;
  tag?: TileHeadingTag;
  href: string;
  /** The vehicle in side view – decorative, since the tile names the model. */
  image: TileImageSource;
  /** What tells the model apart from the others of the navigation, e.g. its drive. */
  tagLabel: string;
};

/**
 * A model of the navigation: its name, the vehicle and a tag, the whole tile being its link.
 *
 * The tile shows the canvas color on hover only, so it belongs on a page or a section with the surface color.
 */
export const ModelNavigationTile = ({
  as: Root = 'div',
  class: placement,
  aspect = 'aspect-16/9',
  heading,
  tag = 'h2',
  href,
  image,
  tagLabel,
}: ModelNavigationTileProps) => (
  <>
    <Comment>{tileComments.anchorTile}</Comment>
    <Comment>
      Without a background of its own at rest, the tile blends into the surface it is placed on and reveals its
      background on hover.
    </Comment>
    <Comment>{tileComments.ownHeight}</Comment>
    <Root
      class={joinClasses(
        placement,
        'self-start group relative isolate flex flex-col justify-between gap-fluid-xs',
        aspect,
        'rounded-3xl p-fluid-md motion-safe:transition-colors duration-sm ease-in-out hover:bg-canvas'
      )}
    >
      <Anchor href={href} label={heading} />
      <p-heading tag={tag} size="md">
        {heading}
      </p-heading>
      <Comment>{tileComments.modelImage}</Comment>
      <Comment>
        Its width is a share of the tile, so the vehicle keeps its scale at every size, and the room beside it is the
        space it moves into.
      </Comment>
      <Comment>
        Moves towards the end while the tile is hovered, mirrored for right to left, unless the user prefers reduced
        motion.
      </Comment>
      <img
        class="self-center w-4/5 motion-safe:transition-[translate] duration-md ease-in-out motion-safe:group-hover:translate-x-static-md motion-safe:rtl:group-hover:-translate-x-static-md"
        src={image.src}
        alt=""
        width={image.width}
        height={image.height}
      />
      <p-tag>{tagLabel}</p-tag>
    </Root>
  </>
);
