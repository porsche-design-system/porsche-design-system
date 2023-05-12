<template>
  <header>
    <div class="header-sidebar">
      <p-heading class="spacing-mt-8" size="medium" tag="h1" align="center"> Design System </p-heading>
      <p-text size="x-small" align="center">
        <strong>Web v{{ this.version }}</strong>
      </p-text>
    </div>
    <nav>
      <div class="marque">
        <router-link to="/" v-slot="{ href, navigate }">
          <p-wordmark :href="href" @click="navigate"></p-wordmark>
        </router-link>
      </div>
      <label>
        <select v-on:change="onVersionChange" class="versionSelect" aria-label="Switch Version">
          <optgroup class="versionSelectOptGroup" label="">
            <option disabled selected>Switch Version</option>
            <option v-for="option in versionOptions" :key="option" v-bind:value="option">{{ option }}</option>
          </optgroup>
        </select>
      </label>
      <Search class="search" :hideNavigation="this.hideNavigation" v-on:onSearchActiveChange="shouldHideNavigation" />
    </nav>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { version } from '@porsche-design-system/components-js/package.json';
  import Search from '@/components/Search.vue';

  @Component({
    components: {
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

  header {
    width: 100%;
    height: 10rem;
    position: fixed;
    top: 0;
    display: flex;
    z-index: 1;
    align-items: center;
    background: #fff;
  }

  .header-sidebar {
    width: 17.5rem;
    flex-shrink: 0;

    @include pds-media-query-min-max('base', 's') {
      display: none;
    }
  }

  nav {
    display: flex;
    flex-grow: 1;
    gap: $pds-spacing-static-medium;
    padding: 0 $pds-spacing-static-medium 0 $pds-spacing-static-medium;
    justify-content: space-between;
    align-items: center;
  }

  .marque {
    width: 65%;
    display: flex;
    justify-content: center;
  }

  .versionSelect {
    border: 0px;
  }

  .search {
    width: 25%;
  }
</style>
