<template>
  <header>
    <div>
      <Menu variant="open" class="open-menu-button" />
      <VersionSelect class="version-select" />
    </div>
    <Wordmark />
    <div>
      <Search class="search-field" />
      <CyclePlatformTheme class="cycle-platform-theme" />
      <GitHubAnchor class="github-anchor" />
    </div>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import VersionSelect from '@/components/VersionSelect.vue';
  import Search from '@/components/Search.vue';
  import Menu from '@/components/Menu.vue';
  import Wordmark from '@/components/Wordmark.vue';
  import GitHubAnchor from '@/components/GitHubAnchor.vue';
  import CyclePlatformTheme from '@/components/CyclePlatformTheme.vue';

  @Component({
    components: {
      VersionSelect,
      Search,
      Menu,
      Wordmark,
      GitHubAnchor,
      CyclePlatformTheme,
    },
  })
  export default class Header extends Vue {
    public toggleMenuVisibility(): void {
      this.$store.commit('toggleIsMenuActive');
    }
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  @use '@/styles/internal.variables.scss' as *;

  header {
    @include pds-frosted-glass;
    position: sticky; // with sticky we can use fixed positioning as well as position it on the Porsche Grid
    grid-column: $pds-grid-extended-column-start / $pds-grid-extended-column-end;
    top: 0;
    height: $header-height; // relevant for a controlled text-zoom 200% support
    box-sizing: border-box; // relevant for a controlled text-zoom 200% support
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    gap: $pds-grid-gap;
    align-items: center;
    background-color: var(--theme-custom-header-background);
    border-bottom: 1px solid var(--theme-background-surface);
    -webkit-backdrop-filter: blur(8px); // TODO: remove, as soon as "pds-frosted-glass" mixin was adjusted to 8px blur
    backdrop-filter: blur(8px); // TODO: remove, as soon as "pds-frosted-glass" mixin was adjusted to 8px blur

    // margin/padding enables the frosted glass background of the header to be placed from side to side of the viewport
    // while the content is still being placed on the Porsche Grid
    margin: 0 calc(#{$pds-grid-extended-offset-base} * -1);
    padding: 0 $pds-grid-extended-offset-base;

    @include pds-media-query-min('s') {
      margin: 0 calc(#{$pds-grid-extended-offset-s} * -1);
      padding: 0 $pds-grid-extended-offset-s;
    }

    @include pds-media-query-min('m') {
      grid-column: $pds-grid-wide-column-start / $pds-grid-wide-column-end;
      margin: 0 calc(#{$pds-grid-wide-offset-s} * -1);
      padding: 0 $pds-grid-wide-offset-s;
    }

    @include pds-media-query-min('xxl') {
      margin: 0 calc(#{$pds-grid-wide-offset-xxl} * -1);
      padding: 0 $pds-grid-wide-offset-xxl;
    }

    & > :first-child,
    & > :last-child {
      display: flex;
      align-items: center;
      gap: $pds-spacing-static-small;
    }

    & > :first-child {
      justify-content: flex-start;
    }

    & > :last-child {
      justify-content: flex-end;
    }
  }

  .open-menu-button,
  .github-anchor,
  .cycle-platform-theme {
    padding: 13px; // apply custom padding to make button/anchor in hover state as large as search field height
  }

  .open-menu-button {
    margin-left: -13px; // compensate alignment because of custom padding
  }

  .github-anchor,
  .cycle-platform-theme {
    margin-right: -13px; // compensate alignment because of custom padding
  }

  // TODO: maybe conditional rendering would be more advanced
  .heading,
  .version-select,
  .search-field {
    @include pds-media-query-max('m') {
      display: none;
    }
  }

  // TODO: maybe conditional rendering would be more advanced
  .open-menu-button {
    @include pds-media-query-min('m') {
      display: none;
    }
  }
</style>
