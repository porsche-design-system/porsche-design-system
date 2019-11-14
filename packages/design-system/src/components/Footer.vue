<template>
  <footer class="footer">
    <p-text variant="x-small" align="center">
      <span>© 2019 Dr. Ing. h.c. F. Porsche AG.</span>
      <br />
      <a href="https://www.porsche.com/international/legal-notice/">Legal notice</a>
      <span> / </span>
      <a href="https://www.porsche.com/international/legal-notice/">Imprint</a>
      <span> / </span>
      <router-link :to="`/${area}/license`">License</router-link>
    </p-text>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
  get area(): string {
    return this.$route.meta.area;
  }
}
</script>
