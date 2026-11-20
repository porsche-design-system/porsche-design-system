import { Comment } from '../Comment.tsx';
import { Anchor } from './blocks/Anchor.tsx';
import { tileComments } from './blocks/comments.ts';
import { ModelStage, type TileModel } from './blocks/ModelStage.tsx';
import { joinClasses, type TileImageSource, type TileProps } from './blocks/shared.ts';

type ModelSelectionTileProps = TileProps & {
  model: TileModel;
  /** The name of the model range, the accessible name of the tile. */
  label: string;
  href: string;
  /** The vehicle in side view, with free room above its roof. */
  image: TileImageSource;
  /** The width of the signature as a share of the vehicle, through its custom property – see the comment in the markup. */
  signatureWidth?: string;
};

/**
 * A model range as entry point: nothing but the vehicle in front of its signature, the whole tile being its link.
 *
 * The tile has the canvas color, so it belongs on a page or a section with the surface color.
 */
export const ModelSelectionTile = ({
  as: Root = 'div',
  class: placement,
  aspect = 'aspect-16/9',
  model,
  label,
  href,
  image,
  signatureWidth = '[--p-model-signature-width:85%]',
}: ModelSelectionTileProps) => (
  <>
    <Comment>{tileComments.anchorTile}</Comment>
    <Comment>{tileComments.ownHeight}</Comment>
    <Root
      class={joinClasses(
        placement,
        'self-start group relative isolate grid place-items-center',
        aspect,
        'rounded-3xl bg-canvas p-fluid-md'
      )}
    >
      <Comment>
        The vehicle covers the lower part of the signature, which takes the surface color to stand out subtly from the
        canvas of the tile.
      </Comment>
      <Comment>{tileComments.vehicleWidth}</Comment>
      <ModelStage
        class="w-4/5"
        model={model}
        signature={joinClasses(signatureWidth, '[--p-model-signature-color:var(--color-surface)]')}
        image={image}
      />
      <Anchor
        href={href}
        label={label}
        note="It follows the vehicle, which shares its stacking order, so that the link stays on top."
      />
    </Root>
  </>
);
