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
    background-color: #fff;
    width: 300px;
    height: 100vh;
    z-index: 1;
    border-right: 1px solid #ccc;
    transition: transform 400ms ease-out, opacity 400ms ease-out;
    will-change: transform, opacity;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: 2.5rem 2rem 150px;
  }

  .content {
    margin-left: 320px;
    max-width: 1620px;
    transition: margin-left 400ms ease-out;
    display: block;
    padding: $p-spacing-32;

    @include breakpoint("s") {
      padding: $p-spacing-64;
    }

    @include breakpoint("m") {
      margin-left: 300px;
      padding: $p-spacing-64;
    }
  }
</style>
