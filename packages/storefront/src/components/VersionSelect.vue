<template>
  <label>
    <select v-on:change="onVersionChange" class="versionSelect" aria-label="Switch Version">
      <optgroup class="versionSelectOptGroup" label="">
        <option disabled selected>Switch Version</option>
        <option v-for="option in versionOptions" :key="option" v-bind:value="option">{{ option }}</option>
      </optgroup>
    </select>
  </label>
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
  export default class Header extends Vue {
    public version: string = version;

    public versionOptions: string[] = ['v1', 'v2', 'v3', 'latest'];
    public onVersionChange = (event: Event): void => {
      window.location.href = `https://designsystem.porsche.com/${(event.target as HTMLInputElement).value}/`;
    };
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  .versionSelect {
    border: 0px;
    background: transparent;
  }
</style>
