# Content Wrapper

When designing a web page you have different possibilities to layout your content – be it limited to a dedicated width with spacings to the left and right of the viewport ("basic" version), stretched to the largest viewport without any spacing ("extended") or even to the largest total screen width ("fluid").
The `p-content-wrapper` defines the outer spacings between the content area and the left and right screen sides, as well as centering its content and setting a max-width.

Can be used along with [Grid](components/grid), [Flex](components/flex) or with any custom content.

<TableOfContents></TableOfContents>

## Width

* **Basic**: max width 1920px including 7-10% safe zone
* **Extended**: max width 1920px
* **Fluid**: full width

<Playground :markup="basic" :config="config">
  <select v-model="width" aria-label="Select width mode">
    <option disabled>Select a width mode</option>
    <option value="basic">Basic</option>
    <option value="extended">Extended</option>
    <option value="fluid">Fluid</option>
  </select>
</Playground>

## Background color

* **transparent**: does not set any background color
* **default**: uses surface color depending on theming

<Playground :markup="transparent" class="playground-content-wrapper-background-color" :config="config">
  <select v-model="backgroundColor" aria-label="Select background color">
    <option disabled>Select a background color</option>
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
  @import '~@porsche-design-system/utilities/scss';

  ::v-deep .playground-content-wrapper-background-color .demo{
    background-color: deeppink;
  }  
  
  ::v-deep .example-content {
    @include p-text-small;
    color: $p-color-theme-light-default;
    text-align: center;
    background: lightskyblue;
  }
</style>