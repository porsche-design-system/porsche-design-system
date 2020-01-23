<template>
  <header class="header">
    <router-link class="link" :to="`/${area}`">
      <p-marque/>
    </router-link>
    <p-headline class="spacing-mt-16" variant="headline-4" tag="h1" align="center">
      Design System
    </p-headline>
    <p-text size="x-small" align="center">{{subtitle}}</p-text>
  </header>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
// import {version} from '@porsche-design-system/components-js/package.json';

@Component
export default class Header extends Vue {
  get subtitle() {
    switch (this.area) {
      case 'app':
        return `App (v1)`;
      case 'web':
        return `Web (v1)`;
      default:
        return '';
    }
  }

  get area(): string {
    return this.$route.meta.area;
  }
}
</script>

<style scoped lang="scss">
  @import "~@porsche-design-system/scss-utils/index";

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
