<template>
  <footer class="footer">
    <p-text variant="small" align="center">
      © 2019 Dr. Ing. h.c. F. Porsche AG.
      <br />
      <a href="https://www.porsche.com/international/legal-notice/">Legal notice</a> /
      <a href="https://www.porsche.com/international/legal-notice/">Imprint</a> /
      <router-link :to="`/${area}/license`">License</router-link>
    </p-text>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
  get area(): string {
    return (this.$route.meta.area || this.$route.params.area || '').toLowerCase();
  }
}
</script>
