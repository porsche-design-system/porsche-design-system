import { Component, Element, h, Host, type JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, THEMES, validateProps } from '../../utils';
import type { PropTypes, Theme } from '../../types';
import type {
  ModelSignatureColor,
  ModelSignatureFetchPriority,
  ModelSignatureLoading,
  ModelSignatureModel,
  ModelSignatureSize,
} from './model-signature-utils';
import {
  getSvgUrl,
  MODEL_SIGNATURE_COLORS,
  MODEL_SIGNATURE_FETCH_PRIORITY,
  MODEL_SIGNATURE_LOADING,
  MODEL_SIGNATURE_MODELS,
  MODEL_SIGNATURE_SIZES,
} from './model-signature-utils';
import { getComponentCss } from './model-signature-styles';

const propTypes: PropTypes<typeof ModelSignature> = {
  model: AllowedTypes.oneOf<ModelSignatureModel>(MODEL_SIGNATURE_MODELS),
  safeZone: AllowedTypes.boolean,
  fetchPriority: AllowedTypes.oneOf<ModelSignatureFetchPriority>(MODEL_SIGNATURE_FETCH_PRIORITY),
  loading: AllowedTypes.oneOf<ModelSignatureLoading>(MODEL_SIGNATURE_LOADING),
  size: AllowedTypes.oneOf<ModelSignatureSize>(MODEL_SIGNATURE_SIZES),
  color: AllowedTypes.oneOf<ModelSignatureColor>(MODEL_SIGNATURE_COLORS),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

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
  @Prop() public loading?: ModelSignatureLoading = 'eager';

  /** Adapts the size of the component. When set to `inherit` a CSS `width` or `height` needs to be defined on the host but not both. */
  @Prop() public size?: ModelSignatureSize = 'small';

  /** Adapts the color of the component. */
  @Prop() public color?: ModelSignatureColor = 'primary';

  /** Adapts color depending on theme. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.model, this.safeZone, this.size, this.color, this.theme);

    const fetchPriority = this.fetchPriority !== 'auto' ? this.fetchPriority : null;
    const loading = this.loading !== 'eager' ? this.loading : null;

    return (
      <Host>
        <slot />
        {/* @ts-expect-error although `fetchPriority` should already be supported by TSX, it's not with Stencil/TSX */}
        <img fetchPriority={fetchPriority} loading={loading} src={getSvgUrl(this.model)} alt={this.model} />
      </Host>
    );
  }
}
