<template>
  <div class="menu-desktop">
    <Navigation />
    <Footer />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Footer from '@/components/Footer.vue';
  import Navigation from '@/components/Navigation.vue';

  @Component({
    components: {
      Navigation,
      Footer,
    },
  })
  export default class MenuDesktop extends Vue {}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  @use '@/styles/internal.variables.scss' as *;

  .menu-desktop {
    display: flex;
    flex-direction: column;
    gap: $pds-spacing-fluid-large;
  }
</style>
