<template>
  <footer class="footer">
    <p-text size="x-small" align="center">
      <span>© 2021 Dr. Ing. h.c. F. Porsche AG.</span>
      <br />
      <a href="https://ux.porsche.com/privacy-policy">Privacy Policy</a>
      <span> / </span>
      <a href="https://ux.porsche.com/imprint">Imprint</a>
      <span> / </span>
      <router-link :to="`/license`">License</router-link>
    </p-text>
  </footer>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Footer extends Vue {}
</script>
