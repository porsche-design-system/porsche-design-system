<template>
  <footer>
    <p-link-pure
      :theme="storefrontTheme"
      href="https://brand.porsche.com"
      target="_blank"
      icon="external"
      align-label="start"
    >
      brand.porsche.com
    </p-link-pure>
    <p-text :theme="storefrontTheme" size="xx-small" color="contrast-high">
      <span>© {{ year }} Dr. Ing. h.c. F. Porsche AG.</span>
      <br />
      <a href="https://brand.porsche.com/d/aXCSDnXaTiSY">Privacy Policy</a>
      &nbsp;
      <a href="https://brand.porsche.com/d/S5pRV9qVeHyf">Legal Notice</a>
      &nbsp;
      <router-link :to="'/license'">License</router-link>
    </p-text>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { type StorefrontTheme } from '@/models';

@Component
export default class Footer extends Vue {
  year = new Date().getFullYear();

  public get storefrontTheme(): StorefrontTheme {
    return this.$store.getters.storefrontTheme;
  }
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  footer {
    display: flex;
    flex-direction: column;
    gap: $pds-spacing-fluid-medium;
  }

  a {
    // increase size of links for a11y wcag22aa compliance
    padding: 3px 4px !important;
    margin: 0 -4px !important;
  }
</style>
