<template>
  <div id="app">
    <aside class="sidebar" :class="{ 'is-visible': isMenuActive }">
      <Header />
      <Divider spacing="small" />
      <Sidebar />
      <Divider spacing="small" />
      <Footer />
    </aside>
    <main class="content" :class="{ 'is-hidden': isMenuActive }">
      <router-view />
    </main>
    <Menu class="menu" @toggle="onToggleMenu"></Menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import Footer from '@/components/Footer.vue';
import Divider from '@/components/Divider.vue';
import Menu from '@/components/Menu.vue';

@Component({
  components: {
    Header,
    Sidebar,
    Footer,
    Divider,
    Menu
  }
})
export default class App extends Vue {
  public isMenuActive: boolean = false;

  public onToggleMenu(isActive: boolean): void {
    this.isMenuActive = isActive;
  }
}
</script>

<style lang="scss">
main {
  display: block;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>

<style scoped lang="scss">
@import '~@porscheui/ui-kit-js/src/styles/utility/index';

#app {
  overflow-x: hidden;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: rem(280px);
  height: 100vh;
  z-index: 10;
  padding: $p-spacing-40 $p-spacing-32;
  border-right: 1px solid $p-color-neutral-grey-2;
  background: $p-color-porsche-light;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @include breakpoint('xxs', 's') {
    padding-bottom: $p-spacing-80;
    opacity: 0;
    transition: transform .3s, opacity .3s;
    transform: translate3d(rem(-140px), 0, 0);

    &.is-visible {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
}

.content {
  position: relative;
  min-height: 100vh;
  padding: $p-spacing-32;
  background: $p-color-porsche-light;
  z-index: 20;

  @include breakpoint('xxs', 's') {
    transition: transform 0.3s;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 0;
      background: $p-color-porsche-light;
      opacity: 0;
      transition: opacity 0.3s;
    }

    &.is-hidden {
      transform: translate3d(rem(280px), 0, 0);

      &::after {
        min-height: 100vh;
        height: 100%;
        opacity: 0.95;
      }
    }
  }

  @include breakpoint('s') {
    padding: $p-spacing-64;
    margin-left: rem(280px);
  }
}

.menu {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 30;
  display: none;

  @include breakpoint('xxs', 's') {
    display: block;
  }
}
</style>
