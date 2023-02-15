import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, THEMES, validateProps } from '../../utils';
import type { PropTypes, Theme } from '../../types';
import { getComponentCss } from './model-signature-styles';
import type { ModelSignatureModel, ModelSignatureSize } from './model-signature-utils';
import { MODEL_SIGNATURE_MODELS, MODEL_SIGNATURE_SIZES } from './model-signature-utils';

const propTypes: PropTypes<typeof ModelSignature> = {
  model: AllowedTypes.oneOf<ModelSignatureModel>(MODEL_SIGNATURE_MODELS),
  size: AllowedTypes.oneOf<ModelSignatureSize>(MODEL_SIGNATURE_SIZES),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-model-signature',
  shadow: true,
})
export class ModelSignature {
  @Element() public host!: HTMLElement;

  /** Adapts the size of the component. */
  @Prop() public model?: ModelSignatureModel = '718';

  /** Adapts the size of the component. */
  @Prop() public size?: ModelSignatureSize = 'small';

  /** Adapts color depending on theme. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.model, this.size, this.theme);

    return null;
  }
}
