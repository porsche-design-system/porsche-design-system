<template>
  <nav>
    <div class="wordmark">
      <router-link to="/" v-slot="{ href, navigate }">
        <p-wordmark :href="href" @click="navigate"></p-wordmark>
      </router-link>
    </div>
    <VersionSelect class="versionSelect" />
    <Search class="search" />
  </nav>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { version } from '@porsche-design-system/components-js/package.json';
  import Search from '@/components/Search.vue';
  import Brand from '@/components/Brand.vue';
  import VersionSelect from '@/components/VersionSelect.vue';

  @Component({
    components: {
      VersionSelect,
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

  nav {
    display: flex;
    flex-grow: 1;
    gap: $pds-spacing-static-medium;
    align-items: center;
    padding: 0 $pds-spacing-static-medium;
    // background: #fff;
  }

  .wordmark {
    flex: 1 0 auto;
    text-align: center;
    @include pds-media-query-min-max('base', 's') {
      flex: 1 0 100%;
    }
  }

  p-wordmark {
    vertical-align: middle;
    @include pds-media-query-min-max('base', 's') {
      vertical-align: top;
    }
  }

  .versionSelect {
    @include pds-media-query-min-max('base', 's') {
      display: none;
    }
  }

  .search {
    position: relative;
    flex: 0 1 auto;
    max-width: 17.5rem;
    @include pds-media-query-min-max('base', 's') {
      display: none;
    }
  }
</style>
