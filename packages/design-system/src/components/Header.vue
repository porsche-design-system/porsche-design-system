<template>
  <header class="header">
    <router-link class="link" to="/">
      <Marque/>
    </router-link>
    <p-headline class="p-spacing-mt-16" variant="headline-4" tag="h1" align="center">Porsche UI Kit</p-headline>
    <p-text variant="small" align="center">Current Release: v{{version}}</p-text>
  </header>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Marque from '@/components/Marque.vue';
  // import {version} from '@porscheui/ui-kit-js/package.json';

  @Component({
    components: {
      Marque,
    },
  })
  export default class Header extends Vue {
    public version = '1.0.0-alpha.1';
  }
</script>

<style scoped lang="scss">
  @import "~@porscheui/ui-kit-scss-utils/index";

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
