<template>
  <div id="app">
    <div v-if="area === 'web'" class="topbar">
      <Disclaimer/>
    </div>
    <div class="content">
      <aside class="sidebar" :class="{ 'is-menu-active': isMenuActive }">
        <Header/>
        <Divider spacing="small"/>
        <Sidebar/>
        <Divider spacing="small"/>
        <Footer/>
      </aside>
      <main class="main" :class="{ 'is-menu-active': isMenuActive }">
        <router-view class="router-view" :class="{ 'is-menu-active': isMenuActive, 'is-loading': isLoading }"/>
        <p-spinner class="spinner" :class="{ 'is-loading': isLoading }" size="medium"
                   ally-label="Loading page"></p-spinner>
      </main>
      <Menu class="menu"></Menu>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Disclaimer from '@/components/Disclaimer.vue';
  import Header from '@/components/Header.vue';
  import Sidebar from '@/components/Sidebar.vue';
  import Footer from '@/components/Footer.vue';
  import Divider from '@/components/Divider.vue';
  import Menu from '@/components/Menu.vue';

  @Component({
    components: {
      Disclaimer,
      Header,
      Sidebar,
      Footer,
      Divider,
      Menu
    }
  })
  export default class App extends Vue {
    public get isLoading(): boolean {
      return this.$store.getters.isLoading;
    }

    get area(): string {
        return this.$route.meta.area;
    }

    public get isMenuActive(): boolean {
      return this.$store.getters.isMenuActive;
    }
  }
</script>

<style lang="scss">
  @import '~@porsche-ui/ui-kit-scss-utils/index';

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  main {
    display: block;
  }

  .spacing-mt-8 {
    margin-top: $p-layout-small;
  }

  .spacing-mt-16 {
    margin-top: $p-layout-medium;
  }

  .spacing-mt-32 {
    margin-top: $p-layout-large;
  }

  .spacing-mr-32 {
    margin-right: $p-layout-large;
  }

  @include p-breakpoint('m') {
    .spacing-mt-0-min-m {
      margin-top: 0;
    }
  }
</style>

<style scoped lang="scss">
  @import '~@porsche-ui/ui-kit-scss-utils/index';

  #app {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .topbar {
      height: auto;
    }

    .content {
      position: relative;
      height: 100%;

      .sidebar {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: rem(280px);
        padding: $p-spacing-40 $p-spacing-32;
        border-right: 1px solid $p-color-neutral-grey-2;
        background: $p-color-porsche-light;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;

        @include p-breakpoint('xxs', 's') {
          opacity: 0;
          transform: translate3d(rem(-140px), 0, 0);
          transition: transform .3s, opacity .3s;
        }

        &.is-menu-active {
          @include p-breakpoint('xxs', 's') {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
      }

      .main {
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: $p-color-porsche-light;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;

        @include p-breakpoint('xxs', 's') {
          transform: translate3d(0, 0, 0);
          transition: transform 0.3s;
        }

        @include p-breakpoint('s') {
          left: rem(280px);
        }

        &.is-menu-active {
          @include p-breakpoint('xxs', 's') {
            transform: translate3d(rem(280px), 0, 0);
          }
        }

        .router-view {
          position: relative;
          padding: $p-spacing-32;
          z-index: 20;
          background: $p-color-porsche-light;
          opacity: 1;
          transition: opacity .3s;

          @include p-breakpoint('s') {
            padding: $p-spacing-64;
          }

          &.is-menu-active {
            @include p-breakpoint('xxs', 's') {
              opacity: 0.05;
              pointer-events: none;
            }
          }

          &.is-loading {
            opacity: 0;
            pointer-events: none;
          }
        }

        .spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          visibility: hidden;
          z-index: 10;

          &.is-loading {
            visibility: visible;
          }
        }
      }

      .menu {
        position: absolute;
        z-index: 2;
        top: 0;
        right: 0;
        display: none;

        @include p-breakpoint('xxs', 's') {
          display: block;
        }
      }
    }
  }
</style>
