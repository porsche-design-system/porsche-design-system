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
import { encodeUrl } from '@/services/utils';

@Component
export default class Footer extends Vue {
  @Prop({ default: '' }) public area?: string;
  public encodeUrl = encodeUrl;
}
</script>
