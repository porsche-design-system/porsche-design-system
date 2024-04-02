<ComponentHeading name="Model Signature"></ComponentHeading>

The `p-model-signature` component is purely visual and renders the different signatures of Porsche car models.  
It can be used to overlay background images or enhance cards and teasers to be more dynamic and recognizable.

<TableOfContents></TableOfContents>

## Models

The `model` prop's default is `{{ meta.props.model }}`, which can be changed to the following values.

<Playground :markup="modelMarkup" :config="config">
  <PlaygroundSelect v-model="model" :values="models" name="model"></PlaygroundSelect>
</Playground>

## Safe Zone

The `safe-zone` prop's default is `{{ meta.props.safeZone }}`, which ensures a visual balance across all model
signatures. This is most likely the best option when the model signatures are used in combination or within tiles next
to each other. When `false` is set as value, the model signatures come without any safe zone which is probably preferred
when the element is positioned independently.

<Playground :markup="safeZoneMarkup" :config="config">
  <PlaygroundSelect v-model="safeZone" :values="safeZones" name="safe-zone"></PlaygroundSelect>
</Playground>

## Colors

The `color` prop's default is `{{ meta.props.color }}`, which can be changed to the following values.

<Playground :markup="colorMarkup" :config="config">
  <PlaygroundSelect v-model="color" :values="colors" name="color"></PlaygroundSelect>
</Playground>

## Sizes

The `size` prop's default is `{{ meta.props.size }}`. When `inherit` is set as value, the size of the model signature
can be defined with either CSS `width` or `height`. Depending on the use case it might make sense to use it in
combination with `safe-zone=false`.

<Playground :markup="sizeMarkup" :config="config">
  <PlaygroundSelect v-model="size" :values="sizes" name="size"></PlaygroundSelect>
</Playground>

## Mask: Blend Mode

In case, `p-model-signature` shall be blended with its background, the CSS property
[mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode) can be used (`{{ blendMode }}` will
bring the best results). Depending on the use case it may be important to use it together with the CSS property
[isolation](https://developer.mozilla.org/en-US/docs/Web/CSS/isolation) to create a new stacking context. It's also
important to mention, that the `p-model-signature` has to be used together with `contrast-{high|medium}` color to have
proper blend mode results.

<Playground :markup="blendModeMarkup" :config="config"></Playground>

## Mask: Gradient

<Notification heading="Experimental" state="warning">
  The following example shows what is technically possible but has not yet been approved by the Porsche Brand Guide.
</Notification>

<Playground :markup="gradientMarkup" :config="config"></Playground>

## Mask: Image

<Notification heading="Experimental" state="warning">
  The following example shows what is technically possible but has not yet been approved by the Porsche Brand Guide.
</Notification>

<Playground :markup="imageMarkup" :config="config"></Playground>

## Mask: Video

<Notification heading="Experimental" state="warning">
  The following example shows what is technically possible but has not yet been approved by the Porsche Brand Guide.
</Notification>

<Playground :markup="videoMarkup" :config="config"></Playground>

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

  safeZone: boolean = false;
  safeZones = [true, false];
  get safeZoneMarkup() {
    return MODEL_SIGNATURE_MODELS.map((model) => `<div style="background: #ff000033; display: inline-block;">
  <p-model-signature safe-zone="${this.safeZone}" model="${model}"></p-model-signature>
</div>`).join('\n');
  }

  size: ModelSignatureSize = this.meta.props.size;
  sizes = MODEL_SIGNATURE_SIZES;
  get sizeMarkup() {
    const style = this.size === 'inherit' ? ' style="width: clamp(240px, 100%, 640px)"' : '';
    return `<p-model-signature size="${this.size}"${style}></p-model-signature>`;
  }

  color: ModelSignatureColor = this.meta.props.color;
  colors = MODEL_SIGNATURE_COLORS;
  get colorMarkup() {
    const style = this.color === 'inherit' ? ' style="background: deeppink"' : '';
    return `<p-model-signature color="${this.color}"${style}></p-model-signature>`;
  }

  blendMode = 'overlay';
  get blendModeMarkup() {
    return `<div style="isolation: isolate; background: #00aa3680; display: inline-block; padding: 32px;">
  <p-model-signature color="contrast-medium" safe-zone="false" style="mix-blend-mode: ${this.blendMode}"></p-model-signature>
</div>
<div style="isolation: isolate; background: #f2f2f280; display: inline-block; padding: 32px;">
  <p-model-signature color="contrast-medium" safe-zone="false" style="mix-blend-mode: ${this.blendMode}"></p-model-signature>
</div>
<div style="isolation: isolate; background: #1f1f1f80; display: inline-block; padding: 32px;">
  <p-model-signature color="contrast-medium" safe-zone="false" style="mix-blend-mode: ${this.blendMode}"></p-model-signature>
</div>
<div style="isolation: isolate; background: #c5004280; display: inline-block; padding: 32px;">
  <p-model-signature color="contrast-medium" safe-zone="false" style="mix-blend-mode: ${this.blendMode}"></p-model-signature>
</div>
<div style="isolation: isolate; background: #e1d4a480; display: inline-block; padding: 32px;">
  <p-model-signature color="contrast-medium" safe-zone="false" style="mix-blend-mode: ${this.blendMode}"></p-model-signature>
</div>
<div style="isolation: isolate; background: #0099e080; display: inline-block; padding: 32px;">
  <p-model-signature color="contrast-medium" safe-zone="false" style="mix-blend-mode: ${this.blendMode}"></p-model-signature>
</div>`;
  }

  get gradientMarkup() {
    return `<p-model-signature color="inherit" safe-zone="false" size="inherit" style="width: clamp(240px, 100%, 640px); background: linear-gradient(0deg, rgba(216,216,219,1) 0%, rgba(107,109,112,1) 100%);"></p-model-signature>`;
  }

  get imageMarkup() {
    return `<p-model-signature safe-zone="false" size="inherit" style="width: clamp(240px, 100%, 640px);">
  <img src="https://porsche-design-system.github.io/porsche-design-system/dessert.jpg" alt="Dessert" />
</p-model-signature>`;
  }

  get videoMarkup() {
    return `<p-model-signature safe-zone="false" size="inherit" style="width: clamp(240px, 100%, 640px);">
  <video
    poster="https://porsche-design-system.github.io/porsche-design-system/ocean.jpg"
    src="https://porsche-design-system.github.io/porsche-design-system/ocean.mp4"
    autoplay
    playsinline
    loop
    muted
  ></video>
</p-model-signature>`;
  }
}
</script>
