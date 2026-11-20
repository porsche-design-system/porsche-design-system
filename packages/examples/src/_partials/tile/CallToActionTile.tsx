import { Comment } from '../Comment.tsx';
import { tileComments } from './blocks/comments.ts';
import { GradientMedia } from './blocks/GradientMedia.tsx';
import { joinClasses, type TileHeadingTag, type TileImageSource, type TileProps } from './blocks/shared.ts';
import { ZoomImage } from './blocks/ZoomImage.tsx';

type CallToActionTileProps = TileProps & {
  heading: string;
  tag?: TileHeadingTag;
  text: string;
  /** The action the tile calls for – its link covers the tile. */
  link: { label: string; href: string };
  /** The mood image, decorative. */
  image: TileImageSource;
};

/**
 * A service promoted with a mood image: the image covers the tile, the heading, a text and the link lie on it.
 *
 * The placement goes to a wrapper around the tile, which is the container its aspect ratio follows.
 */
export const CallToActionTile = ({
  as: Root = 'div',
  class: placement,
  aspect,
  heading,
  tag = 'h2',
  text,
  link,
  image,
}: CallToActionTileProps) => (
  <>
    <Comment>
      The tile takes its shape from the width of this wrapper rather than of the window, so it fits the column it is
      placed in.
    </Comment>
    <Root class={joinClasses(placement, '@container')}>
      <Comment>{tileComments.coverTile}</Comment>
      <Comment>{tileComments.darkScheme}</Comment>
      {!aspect && (
        <Comment>
          Upright in a narrow column, where the text needs the height, and wide from a column of 32rem on. Text that
          needs more space than the aspect ratio provides extends the tile beyond it.
        </Comment>
      )}
      <div
        class={joinClasses(
          'group relative isolate grid grid-rows-[minmax(0,1fr)_auto]',
          aspect ?? 'aspect-3/4 @lg:aspect-16/9',
          'rounded-3xl scheme-only-dark [--p-link-cover-radius:var(--radius-3xl)]'
        )}
      >
        <GradientMedia>
          <Comment>{tileComments.moodImage}</Comment>
          <ZoomImage class="absolute inset-0 size-full object-cover" alt="" {...image} />
        </GradientMedia>
        <div class="col-start-1 row-start-2 grid justify-items-start gap-fluid-md p-fluid-lg">
          <Comment>
            The character limit holds the lines of heading and text at a readable length, however wide the tile is.
          </Comment>
          <div class="grid gap-fluid-sm max-w-[40ch]">
            <p-heading tag={tag} size="lg">
              {heading}
            </p-heading>
            <p-text>{text}</p-text>
          </div>
          <Comment>{tileComments.coverLink}</Comment>
          <p-link variant="secondary" cover={true}>
            <a href={link.href}>{link.label}</a>
          </p-link>
        </div>
      </div>
    </Root>
  </>
);
