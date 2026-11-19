import { Comment } from '../Comment.tsx';
import { joinClasses, type TileHeadingTag, type TileImageSource, type TilePlacement } from './blocks/shared.ts';
import { tileComments } from './comments.ts';

type EquipmentTileProps = TilePlacement & {
  /** The option, which names the tile. */
  heading: string;
  tag?: TileHeadingTag;
  text: string;
  /** The label of the one action the option has. */
  action: string;
  /** A photograph of the option – decorative, since the heading names it. */
  image: TileImageSource;
};

/**
 * An equipment option of a vehicle: a photograph in one panel, its name, its description and one action in the other.
 *
 * The tile is sized by its content, so it takes no aspect ratio. The placement goes to a wrapper around the tile,
 * which is the container its arrangement follows.
 */
export const EquipmentTile = ({
  as: Root = 'div',
  class: placement,
  heading,
  tag = 'h2',
  text,
  action,
  image,
}: EquipmentTileProps) => (
  <>
    <Comment>
      The tile takes its arrangement from the width of this wrapper rather than of the window, so it fits the column it
      is placed in.
    </Comment>
    <Root class={joinClasses(placement, '@container')}>
      <Comment>
        The radius of the panel plus the padding around it make the radius of the tile, so the two curves stay parallel.
      </Comment>
      <Comment>
        The photograph sets the height of the tile, and a description longer than it makes the tile taller still rather
        than running out of it.
      </Comment>
      <div class="flex flex-col gap-static-sm rounded-3xl bg-surface p-static-sm @lg:flex-row @lg:gap-0">
        <Comment>The photograph is cropped to the panel, so it follows its corners.</Comment>
        <Comment>
          The ratio sits on the photograph rather than on the panel, so it gives the row its height while a longer
          description can still make the panel taller. On the panel it would set the height once and leave empty space
          under the photograph.
        </Comment>
        <Comment>Nothing separates the two panels but the padding of the text, as in the design.</Comment>
        <div class="shrink-0 overflow-clip rounded-2xl @lg:w-1/2 @2xl:w-2/3">
          <Comment>{tileComments.optionImage}</Comment>
          <img
            class="aspect-5/4 size-full object-cover"
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
          />
        </div>
        <Comment>
          The text follows the photograph in a narrow column. From a column of 32rem on it shares the tile with the
          photograph in halves, and from one of 42rem on it takes the third of the design, which would leave a few words
          per line before. Its action sits at the lower edge, however short the description is.
        </Comment>
        <div class="flex grow flex-col justify-between gap-fluid-md p-fluid-md">
          <div class="grid gap-static-md">
            <p-heading tag={tag} size="sm">
              {heading}
            </p-heading>
            <p-text color="contrast-medium">{text}</p-text>
          </div>
          <Comment>
            The one action of the option, and the only interactive element of the tile – which is why nothing spans the
            tile the way a covering link would.
          </Comment>
          <p-button class="self-start" type="button" variant="secondary" compact={true}>
            {action}
          </p-button>
        </div>
      </div>
    </Root>
  </>
);
