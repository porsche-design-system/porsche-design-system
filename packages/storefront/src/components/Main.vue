<template>
  <main>
    <slot />
    <p-spinner
      :theme="$store.getters.platformTheme"
      class="spinner"
      :class="{ 'spinner--loading': isLoading }"
      size="medium"
      aria="{ 'aria-label': 'Loading page' }"
    ></p-spinner>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    components: {},
  })
  export default class Main extends Vue {
    public get isLoading(): boolean {
      return this.$store.getters.isLoading;
    }
  }
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

  // TODO: loading state does not work properly because `setIsLoading` setter of Vue store is never called
  .spinner {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    pointer-events: none;
    opacity: 0;
    transition: opacity $transition-duration $transition-duration; // let spinner smoothly (delayed) fade out after loading

    &--loading {
      transition: opacity $transition-duration; // let spinner smoothly (immediately) fade in while loading
      opacity: 1;
    }
  }
</style>
