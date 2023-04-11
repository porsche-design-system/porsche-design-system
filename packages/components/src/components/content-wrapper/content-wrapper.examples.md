# Content Wrapper

The `p-content-wrapper` defines the outer spacings between the content area and the left and right screen sides, as well
as centering its content and setting a max-width.

<p-inline-notification heading="Deprecation hint" state="error" dismiss-button="false">
This component is deprecated and will be removed with the next major release. 
In general, please use native <a href="https://css-tricks.com/snippets/css/complete-guide-grid">CSS Grid</a> instead for better performance and more standardized layout technique.
Additionally, we provide a <b>Porsche Grid</b> utility instead based on CSS Grid covering the specific layout needs for a harmonic appearance across all digital touch-points.
</p-inline-notification>

<TableOfContents></TableOfContents>

## Width

<Playground :markup="widthMarkup" :config="config">
  <SelectOptions v-model="width" :values="widths" name="width"></SelectOptions>
</Playground>

## Background color

<p-inline-notification heading="Deprecation hint" state="warning" dismiss-button="false">
Background color is deprecated and has no effect anymore. Instead, it's possible to define a custom color on the host.
</p-inline-notification>

<Playground :markup="backgroundColorMarkup" class="playground-content-wrapper-background-color" :config="config">
  <SelectOptions v-model="backgroundColor" :values="backgroundColors" name="backgroundColor"></SelectOptions>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { CONTENT_WRAPPER_BACKGROUND_COLORS, CONTENT_WRAPPER_WIDTHS } from './content-wrapper-utils'; 

@Component
export default class Code extends Vue {
  config = { themeable: true };    
  
  width = 'extended';
  widths = CONTENT_WRAPPER_WIDTHS.map(item => item === 'fluid' ? item + ' (deprecated)' : item);
  get widthMarkup(){
    return `<p-content-wrapper width="${this.width}">
  <div class="example-content">Some content</div>
</p-content-wrapper>`;
  }

  backgroundColor = 'transparent';
  backgroundColors = CONTENT_WRAPPER_BACKGROUND_COLORS;
  get backgroundColorMarkup(){
    return `<p-content-wrapper background-color="${this.backgroundColor}">
  <div class="example-content">Some content</div>
</p-content-wrapper>`;
  }
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  :deep(.playground-content-wrapper-background-color .demo){
    background-color: deeppink;
  }  
  
  :deep(.example-content) {
    @include pds-text-small;
    color: $pds-theme-light-primary;
    text-align: center;
    background: lightskyblue;
  }
</style>
