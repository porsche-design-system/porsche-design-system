# Content Wrapper

The `p-content-wrapper` defines the outer spacings between the content area and the left and right screen sides, as well
as centering its content and setting a max-width.

<p-inline-notification heading="Deprecation hint" state="error" persistent="true">
This component is deprecated and will be removed with the next major release. 
In general, please use native <a href="https://css-tricks.com/snippets/css/complete-guide-grid">CSS Grid</a> instead for better performance and more standardized layout technique.
Additionally, we provide a <b>Porsche Grid</b> utility instead based on CSS Grid covering the specific layout needs for a harmonic appearance across all digital touch-points.
</p-inline-notification>

<TableOfContents></TableOfContents>

## Width

<Playground :markup="basic" :config="config">
  <select v-model="width" aria-label="Select width">
    <option disabled>Select width</option>
    <option value="basic">Basic</option>
    <option value="narrow">Narrow</option>
    <option value="extended">Extended</option>
    <option value="full">Full</option>
    <option value="fluid">Fluid (deprecated)</option>
  </select>
</Playground>

## Background color

<p-inline-notification heading="Deprecation hint" state="warning" persistent="true">
Background color is deprecated and has no effect anymore. Instead, it's possible to define a custom color on the host.
</p-inline-notification>

<Playground :markup="transparent" class="playground-content-wrapper-background-color" :config="config">
  <select v-model="backgroundColor" aria-label="Select background color">
    <option disabled>Select background color</option>
    <option value="transparent">Transparent</option>
    <option value="default">Default</option>    
  </select>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  width = 'basic';
  backgroundColor = 'transparent';
  config = { themeable: true };    
  
  get basic(){
    return `<p-content-wrapper width="${this.width}">
  <div class="example-content">Some content</div>
</p-content-wrapper>`;
  }

  get transparent(){
    return `<p-content-wrapper background-color="${this.backgroundColor}">
  <div class="example-content">Some content</div>
</p-content-wrapper>`;
  }
}
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/components-js/utilities/scss';

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
