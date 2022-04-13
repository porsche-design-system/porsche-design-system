<template>
  <div class="disclaimer" role="complementary" aria-label="disclaimer">
    <p-text theme="dark">
      We are very excited to announce the first stable release v1.0.0 of the Porsche Design System.
    </p-text>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Disclaimer extends Vue {}
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/components-js/utilities/scss';

  .disclaimer {
    padding: $pds-spacing-small $pds-spacing-large;
    background: $pds-theme-light-contrast-high;
  }
</style>
