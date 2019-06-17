<template>
  <div id="app">
    <aside>
      <Header/>
      <Divider spacing="small"/>
      <Sidebar/>
      <Footer/>
    </aside>
    <main>
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
  aside {
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

  main {
    margin-left: 320px;
    display: block;
    padding: 32px;
    max-width: 1620px;
    transition: margin-left 400ms ease-out;
  }
</style>
