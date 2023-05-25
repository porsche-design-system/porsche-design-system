<template>
  <header>
    <div>
      <p-heading size="small" class="heading">Porsche Design System</p-heading>
      <VersionSelect class="select" />
    </div>
    <router-link to="/" v-slot="{ href, navigate }">
      <p-wordmark :href="href" @click="navigate"></p-wordmark>
    </router-link>
    <div>
      <Search class="search" />
      <p-link-pure
        class="anchor"
        :icon-source="require('@/assets/github.svg')"
        href="https://github.com/porsche-design-system/porsche-design-system"
        target="_blank"
        hide-label="true"
        style="padding: 13px"
      >
        Navigate to GitHub repository of Porsche Design System
      </p-link-pure>
      <Menu class="menu"></Menu>
    </div>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import VersionSelect from '@/components/VersionSelect.vue';
  import Search from '@/components/Search.vue';
  import Menu from '@/components/Menu.vue';

  @Component({
    components: {
      VersionSelect,
      Search,
      Menu,
    },
  })
  export default class Header extends Vue {}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  header {
    @include pds-frosted-glass;
    position: fixed;
    inset: 0 0 auto;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    gap: $pds-grid-gap;
    align-items: center;
    padding: $pds-spacing-static-medium $pds-grid-wide-offset-base;
    border-bottom: 1px solid $pds-theme-light-background-surface;
    background-color: rgb(255 255 255 / 79%);
    -webkit-backdrop-filter: blur(8px); // TODO: remove, as soon as "pds-frosted-glass" mixin was adjusted to 8px blur
    backdrop-filter: blur(8px); // TODO: remove, as soon as "pds-frosted-glass" mixin was adjusted to 8px blur

    @include pds-media-query-min('s') {
      padding: $pds-spacing-static-medium $pds-grid-wide-offset-s;
    }

    @include pds-media-query-min('xxl') {
      padding: $pds-spacing-static-medium $pds-grid-wide-offset-xxl;
    }

    & > :first-child,
    & > :last-child {
      display: flex;
      align-items: center;
      gap: $pds-spacing-static-small;
    }

    & > :last-child {
      justify-content: flex-end;
    }
  }

  .heading,
  .select,
  .search,
  .anchor {
    @include pds-media-query-max('s') {
      display: none;
    }
  }

  .menu {
    @include pds-media-query-min('s') {
      display: none;
    }
  }
</style>
