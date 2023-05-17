<template>
  <div class="brand">
    <p-heading class="spacing-mt-8" size="medium" tag="h1" align="center">Digital Design System</p-heading>
    <p-tag color="background-surface">Web</p-tag>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Brand extends Vue {}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  .brand {
    display: flex;
    align-items: end;
    flex-shrink: 0;
    gap: $pds-spacing-static-x-small;
    padding-left: $pds-spacing-static-large;
    width: 17.5rem; // => width of sidebar
  }
</style>
