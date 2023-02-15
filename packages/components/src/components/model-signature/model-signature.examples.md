# Model Signature

The `p-model-signature` ...

<TableOfContents></TableOfContents>

## Models

The `model` prop's default is `718`, which can be changed to the following values.

<Playground :markup="modelMarkup" :config="config">
  <select v-model="model" aria-label="Select model">
    <option disabled>Select model</option>
    <template v-for="(value) in models">
      <option :value="value">{{ value }}</option>
    </template>
  </select>
</Playground>

## Colors

The `color` prop's default is `primary`, which can be changed to the following values.

<Playground :markup="colorMarkup" :config="config">
  <select v-model="color" aria-label="Select color">
    <option disabled>Select color</option>
    <template v-for="(value) in colors">
      <option :value="value">{{ value }}</option>
    </template>
  </select>
</Playground>

## Size

The `size` prop's default is `small`, which can be changed to the following values.

<Playground :markup="sizeMarkup" :config="config">
  <select v-model="size" aria-label="Select size">
    <option disabled>Select size</option>
    <template v-for="(value) in sizes">
      <option :value="value">{{ value }}</option>
    </template>
  </select>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { ModelSignatureColor, MODEL_SIGNATURE_COLORS, ModelSignatureModel, MODEL_SIGNATURE_MODELS, ModelSignatureSize, MODEL_SIGNATURE_SIZES } from './model-signature-utils'; 

@Component
export default class Code extends Vue {
  config = { themeable: true };

  model: ModelSignatureModel = '718';
  models = MODEL_SIGNATURE_MODELS;

  get modelMarkup() {
    return `<p-model-signature model="${this.model}"></p-model-signature>`;
  }

  size: ModelSignatureSize = 'small';
  sizes = MODEL_SIGNATURE_SIZES;

  get sizeMarkup() {
    const style = this.size === 'inherit' ? ' style="height: 100px"' : '';
    return `<p-model-signature size="${this.size}"${style}></p-model-signature>`;
  }

  color: ModelSignatureColor = 'primary';
  colors = MODEL_SIGNATURE_COLORS;

  get colorMarkup() {
    const style = this.color === 'inherit' ? ' style="filter: invert(24%) sepia(70%) saturate(5969%) hue-rotate(316deg) brightness(102%) contrast(102%)"' : '';
    return `<p-model-signature color="${this.color}"${style}></p-model-signature>`;
  }
}
</script>
