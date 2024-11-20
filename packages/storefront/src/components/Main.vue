<template>
  <main>
    <slot />
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  components: {},
})
export default class Main extends Vue {}
</script>

<style scoped lang="scss">
  @use 'sass:math';
  @use '@porsche-design-system/components-js/styles' as *;
  @use '@/styles/internal.variables.scss' as *;

  main {
    position: relative;
    grid-column: $pds-grid-extended-column-start / $pds-grid-extended-column-end;

    @include pds-media-query-min('m') {
      grid-column: 6 / $pds-grid-wide-column-end;
    }
  }
</style>
