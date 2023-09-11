<template>
  <aside :class="isMenuVisible ? 'slide-in' : 'slide-out'">
    <Menu variant="close" class="close-menu-button" />
    <div class="scroll-area">
      <VersionSelect class="version-select" />
      <Search class="search-field" />
      <Navigation />
      <Footer />
    </div>
  </aside>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Menu from '@/components/Menu.vue';
  import VersionSelect from '@/components/VersionSelect.vue';
  import Search from '@/components/Search.vue';
  import Footer from '@/components/Footer.vue';
  import Navigation from '@/components/Navigation.vue';

  @Component({
    components: {
      Menu,
      VersionSelect,
      Search,
      Navigation,
      Footer,
    },
  })
  export default class Aside extends Vue {
    public get isMenuVisible(): boolean {
      return this.$store.getters.isMenuActive;
    }
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  @use '@/styles/internal.variables.scss' as *;

  aside {
    @include pds-media-query-max('m') {
      display: flex; // give scroll area proper context in mobile view
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      background: var(--theme-custom-aside-background);
      z-index: 3;
      transition: transform $transition-duration;

      &.slide-in {
        visibility: inherit;
        transform: translate3d(0, 0, 0);
      }

      &.slide-out {
        // TODO: maybe we can somehow apply this style at the correct moment, to have proper transition on mobile view
        // without flashing of the menu when viewport is adjusted from desktop to mobile view
        visibility: hidden;
        transform: translate3d(-130%, 0, 0); // we need some extra space (+30%) for the close menu button
      }
    }

    @include pds-media-query-min('m') {
      box-sizing: border-box;
      overflow: hidden auto; // we need to switch scroll area to host element, otherwise it wouldn't reflect position sticky properly
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
    }

    @include pds-media-query-min('xxl') {
      margin-left: calc(#{$pds-grid-wide-offset-xxl} * -1);
      padding-left: $pds-grid-wide-offset-xxl;
    }
  }

  .close-menu-button {
    position: absolute;
    top: $pds-spacing-fluid-medium;
    left: calc(100% + #{$pds-spacing-fluid-medium});

    @include pds-media-query-min('m') {
      display: none;
    }
  }

  .scroll-area {
    display: flex;
    flex-direction: column;
    gap: $pds-spacing-fluid-large;

    // dedicated scroll area is needed because the close menu button is aligned with a negative offset to the sidebar in
    // mobile view, otherwise it would get cut off in case host element would be scrollable
    @include pds-media-query-max('m') {
      position: relative;
      overflow: hidden auto;
      -webkit-overflow-scrolling: touch;
      padding: $pds-grid-wide-offset-base;
      box-sizing: content-box;
      width: clamp(11.875rem, 20.455vw + 7.784rem, 17.5rem);
    }
  }

  // TODO: maybe conditional rendering would be more advanced
  .version-select,
  .search-field {
    @include pds-media-query-min('m') {
      display: none;
    }
  }
</style>
