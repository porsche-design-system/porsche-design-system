import type { JSX } from 'preact';
import { Comment } from '../../Comment.tsx';
import { tileComments } from './comments.ts';
import { joinClasses, type TileImageSource } from './shared.ts';
import { ZoomImage } from './ZoomImage.tsx';

export type TileModel = NonNullable<JSX.IntrinsicElements['p-model-signature']['model']>;

type ModelStageProps = {
  /** The width of the stage, and with it of the vehicle. */
  class: string;
  model: TileModel;
  /** The width of the signature as a share of the stage, and its color – both through its custom properties. */
  signature: string;
  /** The vehicle in side view, with free room above its roof. */
  image: TileImageSource;
};

/** The signature of a model and its vehicle in one cell, the vehicle in front and zooming in while the tile is hovered. */
export const ModelStage = ({ class: width, model, signature, image }: ModelStageProps) => (
  <div class={joinClasses('grid grid-cols-1', width)}>
    <Comment>{tileComments.signatureWidth}</Comment>
    <p-model-signature
      class={joinClasses('[grid-area:1/1] justify-self-center', signature)}
      model={model}
      safe-zone={false}
    ></p-model-signature>
    <Comment>{tileComments.modelImage}</Comment>
    <ZoomImage class="[grid-area:1/1] z-1 w-full origin-bottom mt-static-md sm:mt-static-lg" alt="" {...image} />
  </div>
);
