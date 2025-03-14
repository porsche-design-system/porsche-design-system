<template>
  <div class="menu-desktop">
    <Navigation />
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Footer from '@/components/Footer.vue';
import Navigation from '@/components/Navigation.vue';

@Component({
  components: {
    Navigation,
    Footer,
  },
})
export default class MenuDesktop extends Vue {}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  @use '@/styles/internal.variables.scss' as *;

  .menu-desktop {
    display: flex;
    flex-direction: column;
    gap: $pds-spacing-fluid-large;
    box-sizing: border-box;
    overflow: hidden auto;
    -webkit-overflow-scrolling: touch;
    grid-column: $pds-grid-wide-column-start / 5;
    position: sticky; // with sticky we can use a fixed positioned scroll area with top/height definitions as well as position it on the Porsche Grid
    top: $header-height;
    height: calc(100vh - #{$header-height});
    background: var(--theme-background-base); // to ensure scrollbar coloring is optimal
    // Enlarge vertical scrollable area to be visually aligned with the main section
    margin: calc(#{$pds-spacing-fluid-x-large} * -1) // Compensate vertical gap of Porsche Grid
      calc(#{$pds-grid-gap} * -1) // Move scrollbar out of Porsche Grid to keep navigation content properly aligned
      0 calc(
        #{$pds-grid-wide-offset-s} * -1
      ); // Enables the scrollable area of the sidebar to the left side of the viewport while the content is still being placed on the Porsche Grid
    padding: $pds-spacing-fluid-x-large $pds-grid-gap
      // Move scrollbar out of Porsche Grid to keep navigation content properly aligned
      $pds-spacing-fluid-x-large $pds-grid-wide-offset-s; // Enables the scrollable area of the sidebar to the left side of the viewport while the content is still being placed on the Porsche Grid

    @include pds-media-query-max('m') {
      display: none;
    }
    @include pds-media-query-min('xxl') {
      margin-inline-start: calc(#{$pds-grid-wide-offset-xxl} * -1);
      padding-inline-start: $pds-grid-wide-offset-xxl;
    }
  }
</style>
