<template>
  <aside>
    <Sidebar class="sidebar" />
    <Footer class="footer" />
  </aside>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Sidebar from '@/components/Sidebar.vue';
  import Footer from '@/components/Footer.vue';

  @Component({
    components: {
      Sidebar,
      Footer,
    },
  })
  export default class Aside extends Vue {}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  @use '@/styles/internal.variables.scss' as *;

  aside {
    position: sticky; // with sticky we can use a fixed positioned scroll area with top/height definitions as well as position it on the Porsche Grid
    top: $p-header-height;
    height: calc(100vh - #{$p-header-height});
    overflow: hidden auto;
    -webkit-overflow-scrolling: touch;
  }

  .footer {
    margin-top: $pds-spacing-fluid-small;
  }
</style>
