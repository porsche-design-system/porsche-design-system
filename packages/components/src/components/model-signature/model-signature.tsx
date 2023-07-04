import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, THEMES, validateProps } from '../../utils';
import type { PropTypes, Theme } from '../../types';
import type { ModelSignatureColor, ModelSignatureModel, ModelSignatureSize } from './model-signature-utils';
import { getComponentCss } from './model-signature-styles';
import {
  getSvgUrl,
  MODEL_SIGNATURE_COLORS,
  MODEL_SIGNATURE_MODELS,
  MODEL_SIGNATURE_SIZES,
  modelSignatureHeight,
} from './model-signature-utils';

const propTypes: PropTypes<typeof ModelSignature> = {
  model: AllowedTypes.oneOf<ModelSignatureModel>(MODEL_SIGNATURE_MODELS),
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

  /** Adapts the size of the component. */
  @Prop() public size?: ModelSignatureSize = 'small';

  /** Adapts the color of the component. */
  @Prop() public color?: ModelSignatureColor = 'primary';

  /** Adapts color depending on theme. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size, this.color, this.theme);

    return <img src={getSvgUrl(this.model)} height={modelSignatureHeight} alt={this.model} />;
  }
}
