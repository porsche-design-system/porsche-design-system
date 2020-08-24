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
