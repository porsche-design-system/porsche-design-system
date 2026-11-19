import { Comment } from '../Comment.tsx';
import { ModelStage, type TileModel } from './blocks/ModelStage.tsx';
import { joinClasses, type TileHeadingTag, type TileImageSource, type TileProps } from './blocks/shared.ts';
import { tileComments } from './comments.ts';

type ModelTeaserTileProps = TileProps & {
  model: TileModel;
  /** The vehicle in side view, with free room above its roof. */
  image: TileImageSource;
  /** The width of the signature as a share of the vehicle, through its custom property – see the comment in the markup. */
  signatureWidth?: string;
  heading: string;
  tag?: TileHeadingTag;
  /** The line below the heading, e.g. the starting price. */
  text: string;
  /** The link to the model, which covers the tile. */
  link: { label: string; href: string };
  /** A second link of its own. Its name identifies the model and contains the label it shows. */
  action: { label: string; name: string; href: string };
};

/** A model range with its starting price: the vehicle in front of its signature, a heading, a text and two links. */
export const ModelTeaserTile = ({
  as: Root = 'div',
  class: placement,
  aspect = 'aspect-16/9',
  model,
  image,
  signatureWidth = '[--p-model-signature-width:65%]',
  heading,
  tag = 'h2',
  text,
  link,
  action,
}: ModelTeaserTileProps) => (
  <>
    <Comment>{tileComments.coverTile}</Comment>
    <Comment>{tileComments.ownHeight}</Comment>
    <Comment>
      What the tile holds follows the width of the tile rather than of the window, so it fits the column the tile is
      placed in.
    </Comment>
    <Root
      class={joinClasses(
        placement,
        'self-start @container group relative isolate flex flex-col items-center justify-center gap-fluid-md',
        aspect,
        'rounded-3xl bg-surface p-fluid-lg [--p-link-cover-radius:var(--radius-3xl)]'
      )}
    >
      <Comment>
        Signature and vehicle share one cell, and the vehicle is placed in front of the signature. The image keeps free
        room above the roof, so the vehicle overlaps the lower part of the signature without being moved. The signature
        takes the canvas color, which stands out subtly from the surface of the tile.
      </Comment>
      <Comment>
        Its width fills the room inside the padding of a narrow tile, and once the tile offers 20rem inside its padding
        it is a share of the tile, so the vehicle keeps its scale at every size.
      </Comment>
      <ModelStage
        class="w-full @xs:w-4/5"
        model={model}
        signature={joinClasses(signatureWidth, '[--p-model-signature-color:var(--color-canvas)]')}
        image={image}
      />
      <div class="grid gap-static-xs">
        <p-heading tag={tag} size="md" align="center">
          {heading}
        </p-heading>
        <p-text size="xs" color="contrast-medium" align="center">
          {text}
        </p-text>
      </div>
      <Comment>
        One below the other and as wide as the tile while it is narrow, side by side once the tile offers 20rem inside
        its padding.
      </Comment>
      <div class="flex flex-col w-full gap-static-md @xs:w-auto @xs:flex-row @xs:flex-wrap @xs:justify-center">
        <Comment>{tileComments.coverLink}</Comment>
        <p-link variant="primary" cover={true}>
          <a href={link.href}>{link.label}</a>
        </p-link>
        <Comment>{tileComments.action}</Comment>
        <Comment>Its accessible name identifies the model and contains the label it shows.</Comment>
        <p-link class="relative z-2" variant="secondary" href={action.href} aria={`{ 'aria-label': '${action.name}' }`}>
          {action.label}
        </p-link>
      </div>
    </Root>
  </>
);
