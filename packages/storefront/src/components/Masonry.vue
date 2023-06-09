<template>
  <div>
    <p-link-tile
      href="designing/introduction"
      aspect-ratio="{ base: '4:3', xs: '16:9', s: '3:4' }"
      description="Start Designing"
      weight="regular"
      compact="true"
    >
      <img src="@/assets/start-designing.jpg" alt="Some wireframes" />
    </p-link-tile>
    <p-link-tile
      href="developing/introduction"
      aspect-ratio="{ base: '4:3', xs: '16:9', s: '3:4' }"
      description="Start Developing"
      weight="regular"
      compact="true"
    >
      <img src="@/assets/start-developing.jpg" alt="Some woman developing with Porsche Design System version 3" />
    </p-link-tile>
    <p-link-tile
      href="news/migration-guide/porsche-design-system"
      aspect-ratio="{ base: '4:3', xs: '16:9' }"
      description="Migrate from v2 to v3"
      weight="regular"
      compact="true"
    >
      <img
        src="@/assets/migrate-v2-to-v3.jpg"
        alt="Sample Porsche web application with Porsche Design System version 3."
      />
    </p-link-tile>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({})
  export default class Masonry extends Vue {}
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
