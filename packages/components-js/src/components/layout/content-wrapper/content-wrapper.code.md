# Content Wrapper

Defines the outer spacings between the content area and the left and right screen
sides, as well as centering its content and setting a max-width.

Can be used along with [Grid](#/components/grid), [Flex](#/components/flex) or with any custom content.

### Width

* **Basic**: max width 1920px including 7-10% safe zone
* **Extended**: max width 1920px
* **Fluid**: full width

<Playground>
  <template #configurator>
    <select v-model="width">
      <option disabled>Select a width mode</option>
      <option value="basic">Basic</option>
      <option value="extended">Extended</option>
      <option value="fluid">Fluid</option>
    </select>
  </template>
  <template>
    <p-content-wrapper :width="width">
      <div class="example-content">Some content</div>
    </p-content-wrapper>
  </template>
</Playground>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundContentWrapper extends Vue {
    public width: string = 'basic';
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';

  .example-content {
    @include p-text;
    color: $p-color-theme-dark-default;
    text-align: center;
    background: lightskyblue;
  }
</style>