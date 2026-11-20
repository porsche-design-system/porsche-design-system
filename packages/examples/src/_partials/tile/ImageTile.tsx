import { Comment } from '../Comment.tsx';
import { tileComments } from './blocks/comments.ts';
import { GradientMedia } from './blocks/GradientMedia.tsx';
import { joinClasses, type TileHeadingTag, type TileImageSource, type TileProps } from './blocks/shared.ts';
import { ZoomImage } from './blocks/ZoomImage.tsx';

type ImageTileProps = TileProps & {
  /** What the tile leads to, which names the tile and its link. */
  heading: string;
  tag?: TileHeadingTag;
  href: string;
  image: TileImageSource & { alt: string };
};

/** A category with a mood image: the image covers the tile, an icon-only link sits at the top, the heading at the bottom. */
export const ImageTile = ({
  as: Root = 'div',
  class: placement,
  aspect = 'aspect-square',
  heading,
  tag = 'h2',
  href,
  image,
}: ImageTileProps) => (
  <>
    <Comment>{tileComments.coverTile}</Comment>
    <Comment>{tileComments.darkScheme}</Comment>
    <Comment>{tileComments.ownHeight}</Comment>
    <Root
      class={joinClasses(
        placement,
        'self-start group relative isolate grid grid-rows-[minmax(0,1fr)_auto]',
        aspect,
        'rounded-3xl scheme-only-dark [--p-link-cover-radius:var(--radius-3xl)]'
      )}
    >
      <GradientMedia>
        <ZoomImage class="absolute inset-0 size-full object-cover" {...image} />
      </GradientMedia>
      <Comment>{tileComments.coverLink}</Comment>
      <p-link
        class="col-start-1 row-start-1 self-start justify-self-end mt-fluid-md me-fluid-md"
        variant="secondary"
        icon="arrow-up-right"
        hide-label="true"
        compact="true"
        cover={true}
      >
        <a href={href}>{heading}</a>
      </p-link>
      <div class="col-start-1 row-start-2 p-fluid-md">
        <p-heading tag={tag} size="xl">
          {heading}
        </p-heading>
      </div>
    </Root>
  </>
);
