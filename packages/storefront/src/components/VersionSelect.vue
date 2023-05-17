<template>
  <!--<p-select-wrapper label="Some label" hide-label="true">
    <select name="some-name">
      <option v-for="option in versionOptions" :key="option" v-bind:value="option">{{ option }}</option>
    </select>
  </p-select-wrapper>-->
  <select v-on:change="onVersionChange" aria-label="Switch Porsche Design System version">
      <option v-for="option in versionOptions" :key="option" v-bind:value="option">{{ option }}</option>
  </select>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { version } from '@porsche-design-system/components-js/package.json';
  import Search from '@/components/Search.vue';
  import Brand from '@/components/Brand.vue';

  @Component({
    components: {
      Brand,
      Search,
    },
  })
  export default class VersionSelect extends Vue {
    public version: string = version;

    public versionOptions: string[] = ['v1', 'v2', 'v3'];
    public onVersionChange = (event: Event): void => {
      window.location.href = `https://designsystem.porsche.com/${(event.target as HTMLInputElement).value}/`;
    };
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  select {
    @include pds-focus;
    @include pds-text-x-small;
    width: 2rem;
    border: 0;
    padding: 2px $pds-spacing-static-small;
    box-sizing: content-box;
    border-radius: $pds-border-radius-small;
    -webkit-appearance: none;
    appearance: none;
    background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJtMjAgOC43NS04IDYtOC02djEuMjZMMTIgMTZsOC01Ljk5VjguNzV6Ii8+PC9zdmc+") $pds-theme-light-background-surface no-repeat center right 7px;
    background-size: 14px;
  }

  option {
    font: inherit;
  }
</style>
