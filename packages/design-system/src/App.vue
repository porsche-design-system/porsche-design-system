<template>
  <div id="app">
    <aside class="sidebar">
      <Header/>
      <Divider spacing="small"/>
      <Sidebar/>
      <Divider spacing="small"/>
      <Footer/>
    </aside>
    <main class="content">
      <router-view/>
    </main>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Header from '@/components/Header.vue';
  import Sidebar from '@/components/Sidebar.vue';
  import Footer from '@/components/Footer.vue';
  import Divider from '@/components/Divider.vue';

  @Component({
    components: {
      Header,
      Sidebar,
      Footer,
      Divider,
    },
  })
  export default class App extends Vue {}
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>

<style scoped lang="scss">
  @import "~@porscheui/ui-kit-js/src/styles/utility/index";

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 300px;
    height: 100vh;
    padding: $p-spacing-40 $p-spacing-32;
    border-right: 1px solid $p-color-neutral-grey-2;
    background: $p-color-porsche-light;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .content {
    margin-left: 300px;
    padding: $p-spacing-32;

    @include breakpoint("s") {
      padding: $p-spacing-64;
    }
  }
</style>
