<template>
  <main>
    <router-view class="router-view" :class="{ 'router-view--loading': isLoading }" />
    <p-spinner v-if="isLoading" size="medium" aria="{ 'aria-label': 'Loading page' }"></p-spinner>
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

  .router-view {
    @include pds-media-query-min-max('base', 's') {
      opacity: 1;
      transition: opacity 0.3s;
    }

    &--loading {
      opacity: 0;
      pointer-events: none;
    }
  }

  p-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 10;

    @include pds-media-query-min('s') {
      left: calc(50% + #{math.div(17.5rem, 2)});
    }
  }
</style>
