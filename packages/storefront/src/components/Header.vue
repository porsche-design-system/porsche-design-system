<template>
  <header class="header">
    <router-link class="link" :to="`/`">
      <p-marque />
    </router-link>
    <p-headline class="spacing-mt-8" variant="headline-4" tag="h1" align="center">
      Design System
    </p-headline>

    <p-text size="x-small" align="center">
      <strong>Web v{{ this.version }}</strong>
    </p-text>

    <select v-on:change="onVersionChange" class="versionSelect">
      <optgroup class="versionSelectOptGroup">
        <option disabled selected>Switch Version</option>
        <option v-for="option in versionOptions" :key="option" v-bind:value="option">{{ option }}</option>
      </optgroup>
    </select>
  </header>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { version } from '@porsche-design-system/components-js/package.json';

  @Component
  export default class Header extends Vue {
    public version: string = version;

    public versionOptions: string[] = ['v1', 'v2', 'latest'];
    public onVersionChange = (event: Event) => {
      window.location.href = `https://designsystem.porsche.com/${(event.target as HTMLInputElement).value}`;
    };
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';

  .versionSelect {
    appearance: none !important;
    -webkit-appearance: none !important;
    -moz-appearance: none !important;
    outline: none !important;
    font-family: $p-font-family;
    border-radius: 0;
    border: 1px solid $p-color-neutral-contrast-medium;
    background: url('https://cdn.ui.porsche.com/porsche-design-system/icons/arrow-head-down.min.fdb5ae2bcbe9e89a4ca462ff709c0ea8.svg');
    background-repeat: no-repeat;
    background-position-x: 100%;
    padding-right: 1rem;
    padding-left: 0.5rem;
    padding-bottom: 0.2rem;
    padding-top: 0.2rem;
    margin-top: 0.5rem;
  }
  .versionSelect:hover {
    border: 1px solid $p-color-neutral-contrast-high;
    animation-duration: 0.24s;
    transition-timing-function: ease;
  }
  .versionSelect:focus {
    border: 1px solid $p-color-theme-light-state-focus;
  }

  .header {
    text-align: center;
  }

  .link {
    display: inline-block;

    &:focus {
      outline: 1px solid $p-color-theme-light-state-focus;
      outline-offset: 4px;
    }
  }
</style>
