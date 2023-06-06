<template>
  <header>
    <div>
      <p-button-pure @click="toggleMenuVisibility()" class="open-menu-button" icon="menu-lines" hide-label="true">Open menu</p-button-pure>
      <VersionSelect class="version-select" />
    </div>
    <router-link to="/" v-slot="{ href, navigate }">
      <p-wordmark :href="href" @click="navigate"></p-wordmark>
    </router-link>
    <div>
      <Search class="search-field" />
      <p-link-pure
        class="github-anchor"
        :icon-source="require('@/assets/github.svg')"
        href="https://github.com/porsche-design-system/porsche-design-system"
        target="_blank"
        hide-label="true"
      >
        Navigate to GitHub repository of Porsche Design System
      </p-link-pure>
    </div>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import VersionSelect from '@/components/VersionSelect.vue';
  import Search from '@/components/Search.vue';

  @Component({
    components: {
      VersionSelect,
      Search,
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
    border-bottom: 1px solid $pds-theme-light-background-surface;
    background-color: rgb(255 255 255 / 79%);
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
  .github-anchor {
    padding: 13px; // apply custom padding to make button/anchor in hover state as large as search field height
  }

  .open-menu-button {
    margin-left: -13px; // compensate alignment because of custom padding
  }

  .github-anchor {
    margin-right: -13px; // compensate alignment because of custom padding
  }

  .heading,
  .version-select,
  .search-field {
    @include pds-media-query-max('m') {
      display: none;
    }
  }

  .open-menu-button {
    @include pds-media-query-min('m') {
      display: none;
    }
  }
</style>
