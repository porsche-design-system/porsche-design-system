<template>
  <header>
    <router-link to="/" v-slot="{ href, navigate }">
      <p-marque :href="href" @click="navigate"></p-marque>
    </router-link>

    <p-headline class="spacing-mt-8" variant="headline-4" tag="h1" align="center"> Design System </p-headline>

    <p-text size="x-small" align="center">
      <strong>Web v{{ this.version.replace('-skeletons', '') }}</strong>
    </p-text>

    <label>
      <select
        v-on:change="onVersionChange"
        class="versionSelect"
        style="margin-top: 0.5rem"
        aria-label="Switch Version"
      >
        <optgroup class="versionSelectOptGroup" label="">
          <option disabled selected>Switch Version</option>
          <option v-for="option in versionOptions" :key="option" v-bind:value="option">{{ option }}</option>
        </optgroup>
      </select>
    </label>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { version } from '@porsche-design-system/components-js/package.json';

  @Component
  export default class Header extends Vue {
    public version: string = version;

    public versionOptions: string[] = ['v1', 'v2', 'latest'];
    public onVersionChange = (event: Event): void => {
      window.location.href = `https://designsystem.porsche.com/${(event.target as HTMLInputElement).value}/`;
    };
  }
</script>

<style scoped lang="scss">
  header {
    text-align: center;
  }
</style>
