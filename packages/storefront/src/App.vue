<template>
  <main v-if="isStandalone" id="app-standalone">
    <router-view/>
  </main>
  <div v-else id="app">
    <div class="content">
      <div class="sidebar" :class="{ 'is-menu-active': isMenuActive }">
        <div>
          <Header/>
          <p-divider class="divider-spacing-small"></p-divider>
          <Sidebar/>
          <p-divider class="divider-spacing-small"></p-divider>
          <Footer/>
        </div>
      </div>
      <main class="main" :class="{ 'is-menu-active': isMenuActive }">
        <router-view class="router-view" :class="{ 'is-menu-active': isMenuActive, 'is-loading': isLoading }"/>
        <p-spinner class="spinner" :class="{ 'is-loading': isLoading }" size="medium"
                   aria-label="Loading page"></p-spinner>
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
  import Menu from '@/components/Menu.vue';

  @Component({
    components: {
      Disclaimer,
      Header,
      Sidebar,
      Footer,
      Menu
    }
  })
  export default class App extends Vue {
    public get isLoading(): boolean {
      return this.$store.getters.isLoading;
    }

    public get isMenuActive(): boolean {
      return this.$store.getters.isMenuActive;
    }

    public get isStandalone(): boolean {
      return this.$route.meta.standalone;
    }
  }
</script>

<style lang="scss">
  @import '~@porsche-design-system/scss-utils/index';

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  main {
    display: block;
  }

  .router-link {
    display: inline-block;
    outline: none;
    text-decoration: none;
  }

  .spacing-mt-8 {
    margin-top: $p-layout-small;
  }

  .spacing-mr-8 {
    margin-right: $p-layout-small;
  }

  .spacing-mt-16 {
    margin-top: $p-layout-medium;
  }

  .spacing-mt-24 {
    margin-top: $p-spacing-24;
  }

  .spacing-mt-32 {
    margin-top: $p-layout-large;
  }

  .spacing-mr-32 {
    margin-right: $p-layout-large;
  }

  .spacing-mt-48 {
    margin-top: $p-layout-x-large;
  }

  .spacing-mt-56 {
    margin-top: $p-spacing-56;
  }

  .spacing-mt-80 {
    margin-top: $p-layout-xx-large;
  }

  // padding
  .spacing-pt-8 {
    padding-top: $p-layout-small;
  }

  .spacing-pr-8 {
    padding-right: $p-layout-small;
  }

  .spacing-pb-8 {
    padding-bottom: $p-layout-small;
  }

  .spacing-pl-8 {
    padding-left: $p-layout-small;
  }

  .divider-spacing-small {
      margin: $p-spacing-24 0;
  }

  @include p-breakpoint('m') {
    .spacing-mt-0-min-m {
      margin-top: 0;
    }
  }

  // TODO: this is a temporary class to add the missing behaviour to add safe-zone spacings to our grid component.
  .safe-zone {
    padding-left: calc(100vw - 100%);
    width: calc(100vw - 7vw * 2);
    max-width: 96rem;
    margin-left: auto;
    margin-right: auto;
    box-sizing: content-box;

    @include p-breakpoint('xl') {
      width: calc(100vw - 10vw * 2);
    }
  }

  // form top spacing
  .form-top-spacing {
    margin-top: p-rem(48px);

    @include p-breakpoint('s') {
      margin-top: p-rem(56px);
    }

    @include p-breakpoint('m') {
      margin-top: p-rem(64px);
    }

    @include p-breakpoint('l') {
      margin-top: p-rem(72px);
    }

    @include p-breakpoint('xl') {
      margin-top: p-rem(80px);
    }
  }

  // form bottom spacing
  .form-bottom-spacing {
    padding-bottom: $p-spacing-64;

    @include p-breakpoint('s') {
      padding-bottom: $p-spacing-72;
    }

    @include p-breakpoint('m') {
      padding-bottom: $p-spacing-80;
    }

    @include p-breakpoint('l') {
      padding-bottom: p-rem(88px);
    }

    @include p-breakpoint('xl') {
      padding-bottom: p-rem(96px);
    }
  }

  // form section and fieldset spacing
  .form-section-spacing {
    margin-top: $p-spacing-40;

    @include p-breakpoint('m') {
      margin-top: $p-spacing-48;
    }
  }

  // form row spacing
  .form-row-spacing {
    margin-top: $p-spacing-16;
    @include p-breakpoint('xs') {
      &--xs {
        margin-top: $p-spacing-16;
      }
      &--xs-zero {
        margin-top: 0;
      }
    }

    @include p-breakpoint('s') {
      &--s {
        margin-top: $p-spacing-16;
      }
      &--s-zero {
        margin-top: 0;
      }
    }

    @include p-breakpoint('m') {
      &--m {
        margin-top: $p-spacing-16;
      }
      &--m-zero {
        margin-top: 0;
      }
    }

    @include p-breakpoint('l') {
      &--l {
        margin-top: $p-spacing-16;
      }
      &--l-zero {
        margin-top: 0;
      }
    }

    @include p-breakpoint('xl') {
      &--xl {
        margin-top: $p-spacing-16;
      }
      &--xl-zero {
        margin-top: 0;
      }
    }
  }

  // form grid
  .form-grid-item-container {
    margin-left: - $p-spacing-8;
    margin-right: - $p-spacing-8;
  }
  .form-grid-item {
    width: 100%;
    padding-left: $p-spacing-8;
    padding-right: $p-spacing-8;

    &--quarter {
      width: 25%;
      @include p-breakpoint('xs') {
        &-xs {
          width: 25%;
        }
      }
      @include p-breakpoint('s') {
        &-s {
          width: 25%;
        }
      }
      @include p-breakpoint('m') {
        &-m {
          width: 25%;
        }
      }
      @include p-breakpoint('l') {
        &-l {
          width: 25%;
        }
      }
      @include p-breakpoint('xl') {
        &-xl {
          width: 25%;
        }
      }
    }

    &--third {
      width: 33.333%;
      @include p-breakpoint('xs') {
        &-xs {
          width: 33.333%;
        }
      }
      @include p-breakpoint('s') {
        &-s {
          width: 33.333%;
        }
      }
      @include p-breakpoint('m') {
        &-m {
          width: 33.333%;
        }
      }
      @include p-breakpoint('l') {
        &-l {
          width: 33.333%;
        }
      }
      @include p-breakpoint('xl') {
        &-xl {
          width: 33.333%;
        }
      }
    }

    &--half {
      width: 100%;
      @include p-breakpoint('xs') {
        &-xs {
          width: 50%;
        }
      }
      @include p-breakpoint('s') {
        &-s {
          width: 50%;
        }
      }
      @include p-breakpoint('m') {
        &-m {
          width: 50%;
        }
      }
      @include p-breakpoint('l') {
        &-l {
          width: 50%;
        }
      }
      @include p-breakpoint('xl') {
        &-xl {
          width: 50%;
        }
      }
    }

    &--two-thirds {
      width: 66.666%;
      @include p-breakpoint('xs') {
        &-xs {
          width: 66.666%;
        }
      }
      @include p-breakpoint('s') {
        &-s {
          width: 66.666%;
        }
      }
      @include p-breakpoint('m') {
        &-m {
          width: 66.666%;
        }
      }
      @include p-breakpoint('l') {
        &-l {
          width: 66.666%;
        }
      }
      @include p-breakpoint('xl') {
        &-xl {
          width: 66.666%;
        }
      }
    }

    &--three-quarters {
      width: 75%;
      @include p-breakpoint('xs') {
        &-xs {
          width: 75%;
        }
      }
      @include p-breakpoint('s') {
        &-s {
          width: 75%;
        }
      }
      @include p-breakpoint('m') {
        &-m {
          width: 75%;
        }
      }
      @include p-breakpoint('l') {
        &-l {
          width: 75%;
        }
      }
      @include p-breakpoint('xl') {
        &-xl {
          width: 75%;
        }
      }
    }

    /*+ .form-grid-item {
      margin-top:  $p-spacing-16;
      @include p-breakpoint('m') {
        margin-top: 0;
      }
    }*/
  }
</style>

<style scoped lang="scss">
  @import '~@porsche-design-system/scss-utils/index';

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
        width: p-rem(280px);
        padding: $p-spacing-24 $p-spacing-32 $p-spacing-40;
        border-right: 1px solid $p-color-theme-light-neutral-contrast-low;
        background: $p-color-theme-light-background;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;

        @include p-breakpoint('xxs', 's') {
          opacity: 0;
          transform: translate3d(p-rem(-140px), 0, 0);
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
        background: $p-color-theme-light-background;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;

        @include p-breakpoint('xxs', 's') {
          transform: translate3d(0, 0, 0);
          transition: transform 0.3s;
        }

        @include p-breakpoint('s') {
          left: p-rem(280px);
        }

        &.is-menu-active {
          @include p-breakpoint('xxs', 's') {
            transform: translate3d(p-rem(280px), 0, 0);
          }
        }

        .router-view {
          position: relative;
          padding: $p-spacing-32;
          z-index: 20;
          background: $p-color-theme-light-background;
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
