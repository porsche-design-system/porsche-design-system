<template>
  <select v-model="version" v-on:change="onVersionChange" aria-label="Switch Porsche Design System version">
    <option v-for="option in versionOptions" :key="option" :value="option">{{ option }}</option>
  </select>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  // import { version } from '@porsche-design-system/components-js/package.json';

  @Component({
    components: {},
  })
  export default class VersionSelect extends Vue {
    // public version: string = version;

    public version = 'v3';
    public versionOptions: string[] = ['v3', 'v2', 'v1'];

    public onVersionChange = (event: Event): void => {
      window.location.href = `https://designsystem.porsche.com/${(event.target as HTMLInputElement).value}`;
    };
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  select {
    @include pds-focus;
    @include pds-text-x-small;
    -webkit-appearance: none;
    appearance: none;
    border: 0;
    min-width: 2rem;
    padding: $pds-spacing-static-x-small $pds-spacing-static-small;
    cursor: pointer;
    box-sizing: content-box;
    border-radius: $pds-border-radius-small;
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJtMjAgOC43NS04IDYtOC02djEuMjZMMTIgMTZsOC01Ljk5VjguNzV6Ii8+PC9zdmc+')
      $pds-theme-light-background-surface no-repeat center right 7px / 14px;
  }
</style>
