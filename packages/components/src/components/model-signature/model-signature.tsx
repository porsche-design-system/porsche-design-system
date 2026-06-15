import { Component, Element, Host, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes } from '../../types';
import { AllowedTypes, attachComponentCss, validateProps } from '../../utils';
import { getComponentCss } from './model-signature-styles';
import {
  getSvgUrl,
  MODEL_SIGNATURE_COLORS,
  MODEL_SIGNATURE_FETCH_PRIORITY,
  MODEL_SIGNATURE_MODELS,
  MODEL_SIGNATURE_SIZES,
  type ModelSignatureColor,
  type ModelSignatureFetchPriority,
  type ModelSignatureModel,
  type ModelSignatureSize,
} from './model-signature-utils';

const propTypes: PropTypes<typeof ModelSignature> = {
  model: AllowedTypes.oneOf<ModelSignatureModel>(MODEL_SIGNATURE_MODELS),
  safeZone: AllowedTypes.boolean,
  fetchPriority: AllowedTypes.oneOf<ModelSignatureFetchPriority>(MODEL_SIGNATURE_FETCH_PRIORITY),
  lazy: AllowedTypes.boolean,
  size: AllowedTypes.oneOf<ModelSignatureSize>(MODEL_SIGNATURE_SIZES),
  color: AllowedTypes.oneOf<ModelSignatureColor>(MODEL_SIGNATURE_COLORS),
};

/**
 * @slot {"name": "", "description": "Default slot for an img or video tag when using the model-signature as a mask." }
 */
@Component({
  tag: 'p-model-signature',
  shadow: true,
})
export class ModelSignature {
  @Element() public host!: HTMLElement;

  /** Selects the Porsche model whose typographic signature SVG is displayed. */
  @Prop() public model?: ModelSignatureModel = '911';

  /** When enabled, adds invisible padding so all model signatures visually align to a consistent baseline. */
  @Prop() public safeZone?: boolean = true;

  /** Sets the browser's fetch priority hint for the signature asset (`auto`, `high`, `low`). */
  @Prop() public fetchPriority?: ModelSignatureFetchPriority = 'auto';

  /** Defers loading the signature until it enters the viewport to improve initial page performance. */
  @Prop() public lazy?: boolean = false;

  /** Sets the display size of the signature using predefined PDS sizes. Use `inherit` with a CSS `width` or `height` on the host for custom sizing. */
  @Prop() public size?: ModelSignatureSize = 'small';

  /** Sets the fill color of the signature using PDS color tokens. */
  @Prop() public color?: ModelSignatureColor = 'primary';

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.model, this.safeZone, this.size, this.color);

    const fetchPriority: Exclude<ModelSignatureFetchPriority, 'auto'> | null =
      this.fetchPriority !== 'auto' ? this.fetchPriority : null;
    const loading: 'lazy' | null = this.lazy === true ? 'lazy' : null;

    return (
      <Host>
        <slot />
        {/* @ts-expect-error although `fetchpriority` should already be supported by TSX, it's not with Stencil/TSX */}
        <img fetchpriority={fetchPriority} loading={loading} src={getSvgUrl(this.model)} alt={this.model} />
      </Host>
    );
  }
}
