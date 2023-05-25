<template>
  <header>
    <p-display size="small" tag="h2">{{ heading }}</p-display>
    <p-text color="contrast-high" size="large">{{ description }}</p-text>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({})
  export default class Teaser extends Vue {
    public heading = 'Welcome to the new digital';
    public description =
      'Become today a part of tomorrow’s Porsche new design language with the new Porsche Design System v3.';
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  header {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: $pds-spacing-fluid-medium;
    padding: 160px 0;
    z-index: 0;

    &::before {
      content: '';
      position: absolute;
      inset: 0 calc(#{$pds-grid-wide-offset-s} * -1) 0 0;
      background: url('~@/assets/tablet.png') no-repeat bottom -6vw right 10% / min(50%, 600px),
        radial-gradient(54.76% 107.92% at 64.08% 89.73%, #c5c8df 0%, #ebddf9 52.6%, #ffffff 100%);
      z-index: -1;
    }

    & > * {
      max-width: 50%;
    }
  }
</style>
