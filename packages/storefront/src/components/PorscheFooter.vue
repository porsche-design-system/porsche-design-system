<template>
  <div class="main-footer"></div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class PorscheFooter extends Vue {}
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/components-js/utilities/scss';

  .main-footer {
    margin-top: $pds-spacing-xx-large;
    height: 40rem;
    background: $pds-theme-dark-background-surface;
  }
</style>
