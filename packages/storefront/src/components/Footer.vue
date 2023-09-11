<template>
  <footer>
    <p-link-pure
      :theme="$store.getters.platformTheme"
      href="https://brand.porsche.com"
      target="_blank"
      icon="external"
      align-label="left"
    >
      brand.porsche.com
    </p-link-pure>
    <p-text :theme="$store.getters.platformTheme" size="xx-small" color="contrast-high">
      <span>© {{ year }} Dr. Ing. h.c. F. Porsche AG.</span>
      <br />
      <a href="https://ux.porsche.com/privacy-policy">Privacy Policy</a>
      &nbsp;
      <a href="https://ux.porsche.com/imprint">Imprint</a>
      &nbsp;
      <router-link :to="'/license'">License</router-link>
    </p-text>
  </footer>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Footer extends Vue {
    year = new Date().getFullYear();
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  footer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: $pds-spacing-fluid-medium;
  }
</style>
