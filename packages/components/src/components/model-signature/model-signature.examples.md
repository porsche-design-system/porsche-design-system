# Model Signature

The `p-model-signature` ...

<TableOfContents></TableOfContents>

## Models

The `model` prop's default is `718`, which can be changed to the following values.

<Playground :markup="modelMarkup" :config="config">
  <select v-model="model" aria-label="Select model">
    <option disabled>Select model</option>
    <template v-for="(m) in models">
      <option :value="m">{{ m }}</option>
    </template>
  </select>
</Playground>

## Size

The `size` prop's default is `small`, which can be changed to the following values.

<Playground :markup="sizeMarkup" :config="config">
  <select v-model="size" aria-label="Select size">
    <option disabled>Select size</option>
    <template v-for="(m) in sizes">
      <option :value="m">{{ m }}</option>
    </template>
  </select>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { ModelSignatureModel, MODEL_SIGNATURE_MODELS, ModelSignatureSize, MODEL_SIGNATURE_SIZES } from './model-signature-utils'; 

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
    return `<p-model-signature size="${this.size}"></p-model-signature>`;
  }
}
</script>
