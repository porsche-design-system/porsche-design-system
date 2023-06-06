<template>
  <header>
    <p-display class="heading" size="small" tag="h2">Welcome to the new digital</p-display>
    <p-text class="paragraph" color="contrast-high" size="large">
      Become today a part of tomorrow’s Porsche new design language with the new Porsche Design System v3.
    </p-text>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({})
  export default class Teaser extends Vue {}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  header {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: $pds-spacing-fluid-medium;
    padding: clamp(120px, 5.882vw + 100px, 160px) 0;
    z-index: 0;

    &::before {
      content: '';
      position: absolute;
      inset: 0 calc(#{$pds-grid-extended-offset-base} * -1) 0 0;
      background: url('~@/assets/tablet.png') no-repeat bottom -6vw right 10% / min(50%, 600px),
        radial-gradient(54.76% 107.92% at 64.08% 89.73%, #c5c8df 0%, #ebddf9 52.6%, #ffffff 100%);
      z-index: -1;

      @include pds-media-query-min('s') {
        right: calc(#{$pds-grid-extended-offset-s} * -1);
      }

      @include pds-media-query-min('m') {
        right: calc(#{$pds-grid-wide-offset-s} * -1);
      }

      @include pds-media-query-min('xxl') {
        right: calc(#{$pds-grid-wide-offset-xxl} * -1);
      }
    }
  }

  .heading,
  .paragraph {
    @include pds-media-query-min('xs') {
      max-width: 50%;
    }
  }
</style>
