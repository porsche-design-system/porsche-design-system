<template>
  <footer class="footer">
    <p-text variant="small" align="center">
      © 2019 Dr. Ing. h.c. F. Porsche AG.
      <br />
      <a href="https://www.porsche.com/international/legal-notice/">Legal notice</a> /
      <a href="https://www.porsche.com/international/legal-notice/">Imprint</a> /
      <router-link :to="`/${encodeUrl(area)}/license`">License</router-link>
    </p-text>
  </footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {decodeUrl, encodeUrl} from '@/services/utils';

@Component
export default class Footer extends Vue {
  public encodeUrl = encodeUrl;

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
