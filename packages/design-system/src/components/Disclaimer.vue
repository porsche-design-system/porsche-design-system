<template>
  <div class="disclaimer">
    <p-text color="porsche-light">
      A stable version of the Porsche Design System 1.0 is not released yet. The available alpha version of Porsche Design System 1.0
      is meant to be used for testing purpose only.
    </p-text>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class Disclaimer extends Vue {
  }
</script>

<style scoped lang="scss">
  @import "~@porsche-ui/ui-kit-scss-utils/index";

  .disclaimer {
    padding: $p-spacing-8 $p-spacing-32;
    background: $p-color-porsche-red;
  }
</style>
