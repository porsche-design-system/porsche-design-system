<template>
  <header class="header">
    <router-link class="link" :to="`/${area}`">
      <p-marque/>
    </router-link>
    <p-headline class="spacing-mt-16" variant="headline-4" tag="h1" align="center">
      Porsche UI Kit
    </p-headline>
    <p-text variant="small" align="center">{{subtitle}}</p-text>
  </header>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
// import {version} from '@porsche-ui/ui-kit-js/package.json';

@Component
export default class Header extends Vue {
  get subtitle() {
    switch (this.area) {
      case 'app':
        return `App Design System (v1)`;
      case 'web':
        return `Web Design System (v1)`;
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
  @import "~@porsche-ui/ui-kit-scss-utils/index";

  .header {
    text-align: center;
  }

  .link {
    display: inline-block;

    &:focus {
      outline: 1px solid $p-color-state-focus;
      outline-offset: 4px;
    }
  }
</style>
