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

  /** Adapts the model of the component. */
  @Prop() public model?: ModelSignatureModel = '911';

  /** When set to `true`, then all model signatures are visually aligned with each other. When set to `false` the model signature comes without any safe zone. */
  @Prop() public safeZone?: boolean = true;

  /** Defines the fetch priority of the model signature. In the end it is just a recommendation to the browser, but it defines the priority on its own. */
  @Prop() public fetchPriority?: ModelSignatureFetchPriority = 'auto';

  /** Defines whether the model signature is always loaded or only loaded when it is in the viewport (this feature may not work reliably). */
  @Prop() public lazy?: boolean = false;

  /** Adapts the size of the component. When set to `inherit` a CSS `width` or `height` needs to be defined on the host but not both. */
  @Prop() public size?: ModelSignatureSize = 'small';

  /** Adapts the color of the component. */
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
