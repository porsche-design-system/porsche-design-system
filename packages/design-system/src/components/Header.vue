<template>
  <header class="header">
    <router-link class="link" :to="`/${encodeUrl(area)}`">
      <Marque />
    </router-link>
    <p-headline class="p-spacing-mt-16" variant="headline-4" tag="h1" align="center">
      Porsche UI Kit
      <span v-show="area === 'app'">App</span>
    </p-headline>
    <p-text variant="small" align="center">Current Release: v{{version}}</p-text>
  </header>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Marque from '@/components/Marque.vue';
import {decodeUrl, encodeUrl} from '@/services/utils';
// import {version} from '@porscheui/ui-kit-js/package.json';

@Component({
  components: {
    Marque
  }
})
export default class Header extends Vue {
  public encodeUrl = encodeUrl;

  get version() {
    return this.area === 'web' ? '1.0.0-alpha.3' : '1.0.0-alpha.1';
  }

  get area(): string {
    let area = '';
    if (this.$route.meta.area) {
      area = decodeUrl(this.$route.meta.area).toLowerCase();
    } else if (this.$route.params.area) {
      area = decodeUrl(this.$route.params.area).toLowerCase();
    }

    if (['web', 'app'].includes(area)) {
      return area;
    }
    return 'web';
  }
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
