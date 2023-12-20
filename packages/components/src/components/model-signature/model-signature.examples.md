<ComponentHeading name="Model Signature"></ComponentHeading>

The `p-model-signature` component is purely visual and renders the different signatures of Porsche car models.  
It can be used to overlay background images or enhance cards and teasers to be more dynamic and recognizable.

<TableOfContents></TableOfContents>

## Models

The `model` prop's default is `{{ meta.props.model }}`, which can be changed to the following values.

<Playground :markup="modelMarkup" :config="config">
  <PlaygroundSelect v-model="model" :values="models" name="model"></PlaygroundSelect>
</Playground>

## Colors

The `color` prop's default is `{{ meta.props.color }}`, which can be changed to the following values.

<Playground :markup="colorMarkup" :config="config">
  <PlaygroundSelect v-model="color" :values="colors" name="color"></PlaygroundSelect>
</Playground>

## Sizes

The `size` prop's default is `{{ meta.props.size }}`, which can be changed to the following values.

<Playground :markup="sizeMarkup" :config="config">
  <PlaygroundSelect v-model="size" :values="sizes" name="size"></PlaygroundSelect>
</Playground>

## Blend Mode

In case, `p-model-signature` shall be blended with its background, the CSS property
[mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode) can be used (`{{ blendMode }}` will
bring the best results). Depending on the use case it may be important to use it together with the CSS property
[isolation](https://developer.mozilla.org/en-US/docs/Web/CSS/isolation) to create a new stacking context. It's also
important to mention, that the `p-model-signature` has to be used together with `contrast-{high|medium}` color to have
proper blend mode results.

<Playground :markup="blendModeMarkup" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { ModelSignatureColor, MODEL_SIGNATURE_COLORS, ModelSignatureModel, MODEL_SIGNATURE_MODELS, ModelSignatureSize, MODEL_SIGNATURE_SIZES } from './model-signature-utils';
import { getComponentMeta } from '@porsche-design-system/component-meta';

@Component
export default class Code extends Vue {
  config = { themeable: true, spacing: 'inline' };

  meta = getComponentMeta('p-model-signature');

  model: ModelSignatureModel = this.meta.props.model;
  models = MODEL_SIGNATURE_MODELS;
  get modelMarkup() {
    return `<p-model-signature model="${this.model}"></p-model-signature>`;
  }

  size: ModelSignatureSize = this.meta.props.size;
  sizes = MODEL_SIGNATURE_SIZES;
  get sizeMarkup() {
    const style = this.size === 'inherit' ? ' style="height: 100px"' : '';
    return `<p-model-signature size="${this.size}"${style}></p-model-signature>`;
  }

  color: ModelSignatureColor = this.meta.props.color;
  colors = MODEL_SIGNATURE_COLORS;
  get colorMarkup() {
    const style = this.color === 'inherit' ? ' style="filter: invert(24%) sepia(70%) saturate(5969%) hue-rotate(316deg) brightness(102%) contrast(102%)"' : '';
    return `<p-model-signature color="${this.color}"${style}></p-model-signature>`;
  }

  blendMode = 'overlay';
  get blendModeMarkup() {
    return `<div style="isolation: isolate; background: #00aa3680; display: inline-block; padding: 32px;">
  <p-model-signature color="contrast-medium" style="mix-blend-mode: ${this.blendMode}"></p-model-signature>
</div>
<div style="isolation: isolate; background: #f2f2f280; display: inline-block; padding: 32px;">
  <p-model-signature color="contrast-medium" style="mix-blend-mode: ${this.blendMode}"></p-model-signature>
</div>
<div style="isolation: isolate; background: #1f1f1f80; display: inline-block; padding: 32px;">
  <p-model-signature color="contrast-medium" style="mix-blend-mode: ${this.blendMode}"></p-model-signature>
</div>
<div style="isolation: isolate; background: #c5004280; display: inline-block; padding: 32px;">
  <p-model-signature color="contrast-medium" style="mix-blend-mode: ${this.blendMode}"></p-model-signature>
</div>
<div style="isolation: isolate; background: #e1d4a480; display: inline-block; padding: 32px;">
  <p-model-signature color="contrast-medium" style="mix-blend-mode: ${this.blendMode}"></p-model-signature>
</div>
<div style="isolation: isolate; background: #0099e080; display: inline-block; padding: 32px;">
  <p-model-signature color="contrast-medium" style="mix-blend-mode: ${this.blendMode}"></p-model-signature>
</div>`;
  }
}
</script>
