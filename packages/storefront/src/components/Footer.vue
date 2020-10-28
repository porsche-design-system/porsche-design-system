<template>
  <footer class="footer">
    <p-text size="x-small" align="center">
      <span>© 2020 Dr. Ing. h.c. F. Porsche AG.</span>
      <br/>
      <a href="https://www.porsche.com/international/legal-notice/">Legal notice</a>
      <span> / </span>
      <a href="https://www.porsche.com/international/legal-notice/">Imprint</a>
      <span> / </span>
      <router-link :to="`/license`">License</router-link>
    </p-text>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Footer extends Vue {
}
</script>

<style scoped lang="scss">
@import '~@porsche-design-system/utilities/scss';
@import '../styles/internal.variables';

a {
  outline: none;
  text-decoration: underline;
  color: $p-color-default;
  transition: color $p-animation-hover-duration $p-animation-hover-bezier;

  &:hover {
    color: $p-color-state-hover;
  }

  &:focus {
    outline-offset: 1px;
    outline: $p-color-state-focus solid 1px;
  }
}
</style>
