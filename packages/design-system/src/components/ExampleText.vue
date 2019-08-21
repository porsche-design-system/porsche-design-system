<template>
  <p class="example-text">
    <slot/>
  </p>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class ExampleText extends Vue {}
</script>

<style scoped lang="scss">
  @import "~@porsche-ui/ui-kit-scss-utils/index";

  .example-text {
    @include p-text-copy;
    padding: $p-spacing-4 $p-spacing-80;
    color: $p-color-porsche-light;
    text-align: center;
  }
</style>
