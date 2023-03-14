# Model Signature

The `p-model-signature` component is purely visual and renders the different signatures of Porsche car models.  
It can be used to overlay background images or enhance cards and teasers to be more dynamic and recognizable.

<TableOfContents></TableOfContents>

## Models

The `model` prop's default is `{{ meta.props.model }}`, which can be changed to the following values.

<Playground :markup="modelMarkup" :config="config">
  <SelectOptions v-model="model" :values="models" name="model"></SelectOptions>
</Playground>

## Colors

The `color` prop's default is `{{ meta.props.color }}`, which can be changed to the following values.

<Playground :markup="colorMarkup" :config="config">
  <SelectOptions v-model="color" :values="colors" name="color"></SelectOptions>
</Playground>

## Sizes

The `size` prop's default is `{{ meta.props.size }}`, which can be changed to the following values.

<Playground :markup="sizeMarkup" :config="config">
  <SelectOptions v-model="size" :values="sizes" name="size"></SelectOptions>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { ModelSignatureColor, MODEL_SIGNATURE_COLORS, ModelSignatureModel, MODEL_SIGNATURE_MODELS, ModelSignatureSize, MODEL_SIGNATURE_SIZES } from './model-signature-utils';
import { getComponentMeta } from '@porsche-design-system/component-meta';

@Component
export default class Code extends Vue {
  config = { themeable: true };

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
}
</script>
