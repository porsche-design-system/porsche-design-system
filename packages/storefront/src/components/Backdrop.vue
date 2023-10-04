<template>
  <div :class="isMenuVisible ? 'fade-in' : 'fade-out'" @click="toggleMenuVisibility()"></div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Backdrop extends Vue {
    public get isMenuVisible(): boolean {
      return this.$store.getters.isMenuActive;
    }

    public toggleMenuVisibility(): void {
      this.$store.commit('toggleIsMenuActive');
    }
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  @use '@/styles/internal.variables.scss' as *;

  div {
    @include pds-frosted-glass;
    content: '';
    position: fixed;
    inset: 0;
    z-index: 2;
    background: var(--theme-background-shading);
    -webkit-backdrop-filter: blur(8px); // TODO: remove, as soon as "pds-frosted-glass" mixin was adjusted to 8px blur
    backdrop-filter: blur(8px); // TODO: remove, as soon as "pds-frosted-glass" mixin was adjusted to 8px blur

    @include pds-media-query-min('m') {
      display: none;
    }

    &.fade-in {
      transition: opacity $transition-duration;
      opacity: 1;
      transform: translateX(0);
    }

    &.fade-out {
      transition:
        opacity $transition-duration,
        transform 0s $transition-duration;
      opacity: 0;
      transform: translateX(-100%);
    }
  }
</style>
