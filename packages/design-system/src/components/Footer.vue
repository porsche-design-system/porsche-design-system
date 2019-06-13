<template>
  <footer>
    <p>
      © 2019 Dr. Ing. h.c. F. Porsche AG.
      <br />
      <a href="https://www.porsche.com/international/legal-notice/">Legal notice</a>
      <a href="https://www.porsche.com/international/legal-notice/">Imprint</a>
      <router-link to="/general/license">License</router-link>.
    </p>
  </footer>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class Footer extends Vue {}
</script>

<style scoped lang="scss">
</style>
