# Content Wrapper

Defines the outer spacings between the content area and the left and right screen
sides, as well as centering its content and setting a max-width. Additionally it prevents horizontal overflow of its content.

Can be used along with [Grid](#/components/layout/grid), [Flex](#/components/layout/flex) or with any custom content.

### Safe Zone

* **None**: full width
* **Basic**: max width 1920px including 7-10% safe zone
* **Enhanced**: max width 1920px

<Playground>
  <template #configurator>
    <select v-model="safeZone">
      <option disabled>Select a safe-zone mode</option>
      <option value="none">None</option>
      <option value="basic">Basic</option>
      <option value="enhanced">Enhanced</option>
    </select>
  </template>
  <template>
    <p-content-wrapper :safe-zone="safeZone">
      <div class="example-content">Some content</div>
    </p-content-wrapper>
  </template>
</Playground>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundContentWrapper extends Vue {
    public safeZone: string = 'basic';
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/scss-utils/index';

  .example-content {
    @include p-text;
    color: $p-color-theme-dark-default;
    text-align: center;
    background: lightskyblue;
  }
</style>