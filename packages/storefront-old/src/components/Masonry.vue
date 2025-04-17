<template>
  <div>
    <p-link-tile
      @click="onTileClick"
      href="designing/introduction"
      aspect-ratio="{ base: '4:3', xs: '16:9', s: '3:4' }"
      description="Start Designing"
      label="Start Designing"
      weight="regular"
      compact="true"
    >
      <img src="@/assets/start-designing.jpg" alt="Some wireframes" />
    </p-link-tile>
    <p-link-tile
      @click="onTileClick"
      href="developing/introduction"
      aspect-ratio="{ base: '4:3', xs: '16:9', s: '3:4' }"
      description="Start Developing"
      label="Start Developing"
      weight="regular"
      compact="true"
    >
      <img src="@/assets/start-developing.jpg" alt="Some woman developing with Porsche Design System version 3" />
    </p-link-tile>
    <p-link-tile
      @click="onTileClick"
      href="news/migration-guide/porsche-design-system"
      aspect-ratio="{ base: '4:3', xs: '16:9' }"
      description="Migrate from v2 to v3"
      label="Migrate from v2 to v3"
      weight="regular"
      compact="true"
    >
      <picture>
        <source
          v-if="storefrontTheme === 'auto'"
          srcset="@/assets/migrate-v2-to-v3-light.jpg"
          media="(prefers-color-scheme: light)"
        />
        <source
          v-if="storefrontTheme === 'auto'"
          srcset="@/assets/migrate-v2-to-v3-dark.jpg"
          media="(prefers-color-scheme: dark)"
        />
        <img
          v-if="storefrontTheme === 'dark'"
          src="@/assets/migrate-v2-to-v3-dark.jpg"
          alt="Sample Porsche web application with Porsche Design System version 3."
        />
        <img
          v-else
          src="@/assets/migrate-v2-to-v3-light.jpg"
          alt="Sample Porsche web application with Porsche Design System version 3."
        />
      </picture>
    </p-link-tile>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { type StorefrontTheme } from '@/models';

@Component({})
export default class Masonry extends Vue {
  public get storefrontTheme(): StorefrontTheme {
    return this.$store.getters.storefrontTheme;
  }

  public onTileClick(e: Event): void {
    e.preventDefault();
    this.$router.push('/' + e.target?.href);
  }
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  div {
    display: grid;
    gap: $pds-spacing-fluid-medium;

    @include pds-media-query-min('s') {
      grid-template-columns: repeat(2, minmax(0, 1fr));

      & > *:last-child {
        grid-column: span 2;
      }
    }
  }
</style>
