<template>
  <main v-if="isStandalone">
    <router-view />
  </main>
  <div id="app" v-else class="content" :class="{ 'content--menu-active': isMenuActive }">
    <Header class="header" />
    <aside class="aside">
      <Sidebar class="sidebar" />
      <Footer class="footer" />
    </aside>
    <main class="main" :class="{ 'main--animate': isAnimated }">
      <router-view class="router-view" :class="{ 'router-view--loading': isLoading }" />
      <p-spinner class="spinner" v-if="isLoading" size="medium" aria="{ 'aria-label': 'Loading page' }"></p-spinner>
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Watch } from 'vue-property-decorator';
  import Component from 'vue-class-component';
  import Disclaimer from '@/components/Disclaimer.vue';
  import Header from '@/components/Header.vue';
  import Sidebar from '@/components/Sidebar.vue';
  import Footer from '@/components/Footer.vue';
  import VersionSelect from '@/components/VersionSelect.vue';
  import Search from '@/components/Search.vue';

  const TRANSITION_DURATION = 300;

  @Component({
    components: {
      Disclaimer,
      Header,
      Sidebar,
      Footer,
      VersionSelect,
      Search,
    },
  })
  export default class App extends Vue {
    private isAnimated = false;
    private isMenuActive = false;

    // transition of main is applied via separate flag in order to not mess up our modal
    @Watch('$store.state.isMenuActive')
    private onIsMenuActiveChange(isMenuActive: boolean): void {
      if (isMenuActive) {
        this.isAnimated = isMenuActive;
        Vue.nextTick(() => {
          this.isMenuActive = isMenuActive;
        });
      } else {
        this.isMenuActive = isMenuActive;

        setTimeout(() => {
          this.isAnimated = isMenuActive;
        }, TRANSITION_DURATION);
      }
    }

    public get isLoading(): boolean {
      return this.$store.getters.isLoading;
    }

    public get isStandalone(): boolean {
      return this.$route.meta?.standalone;
    }
  }
</script>

<style lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  // TODO: we should not rely on * selector reset
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
    margin-top: $pds-spacing-static-small;
  }

  .spacing-mr-8 {
    margin-right: $pds-spacing-static-small;
  }

  .spacing-mt-16 {
    margin-top: $pds-spacing-static-medium;
  }

  .spacing-mt-24 {
    margin-top: 1.5rem;
  }

  .spacing-mt-32 {
    margin-top: $pds-spacing-static-large;
  }

  .spacing-mr-32 {
    margin-right: $pds-spacing-static-large;
  }

  .spacing-mt-48 {
    margin-top: $pds-spacing-static-x-large;
  }

  .spacing-mt-56 {
    margin-top: 3.5rem;
  }

  .spacing-mt-80 {
    margin-top: $pds-spacing-static-xx-large;
  }

  // padding
  .spacing-pt-8 {
    padding-top: $pds-spacing-static-small;
  }

  .spacing-pr-8 {
    padding-right: $pds-spacing-static-small;
  }

  .spacing-pb-8 {
    padding-bottom: $pds-spacing-static-small;
  }

  .spacing-pl-8 {
    padding-left: $pds-spacing-static-small;
  }

  .divider-spacing-small {
    margin: 1.5rem 0;
  }

  @include pds-media-query-min('m') {
    .spacing-mt-0-min-m {
      margin-top: 0;
    }
  }

  // form top spacing
  .form-top-spacing {
    margin-top: $pds-spacing-static-x-large;

    @include pds-media-query-min('m') {
      margin-top: 4rem;
    }
  }

  // form bottom spacing
  .form-bottom-spacing {
    padding-bottom: 4rem;

    @include pds-media-query-min('m') {
      padding-bottom: $pds-spacing-static-xx-large;
    }
  }

  // form section and fieldset spacing
  .form-section-spacing {
    margin-top: 2.5rem;

    @include pds-media-query-min('m') {
      margin-top: $pds-spacing-static-x-large;
    }
  }

  // form row spacing
  .form-row-spacing {
    margin-top: $pds-spacing-static-medium;
    @include pds-media-query-min('xs') {
      &--xs {
        margin-top: $pds-spacing-static-medium;
      }
      &--zero-xs {
        margin-top: 0;
      }
    }

    @include pds-media-query-min('s') {
      &--s {
        margin-top: $pds-spacing-static-medium;
      }
      &--zero-s {
        margin-top: 0;
      }
    }

    @include pds-media-query-min('m') {
      &--m {
        margin-top: $pds-spacing-static-medium;
      }
      &--zero-m {
        margin-top: 0;
      }
    }

    @include pds-media-query-min('l') {
      &--l {
        margin-top: $pds-spacing-static-medium;
      }
      &--zero-l {
        margin-top: 0;
      }
    }

    @include pds-media-query-min('xl') {
      &--xl {
        margin-top: $pds-spacing-static-medium;
      }
      &--zero-xl {
        margin-top: 0;
      }
    }
  }

  // form grid
  .form-grid-item-container {
    margin-left: -$pds-spacing-static-small;
    margin-right: -$pds-spacing-static-small;
  }

  .form-grid-item {
    padding-left: $pds-spacing-static-small;
    padding-right: $pds-spacing-static-small;
  }

  .form-fieldset {
    display: block;
    border: 0;
    padding: 0;
    min-width: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-block-start: 0;
    padding-inline-start: 0;
    padding-inline-end: 0;
    padding-block-end: 0;

    legend {
      display: block;
      font-weight: $pds-font-weight-semi-bold;
    }
  }
</style>

<style scoped lang="scss">
  @use 'sass:math';
  @use '@porsche-design-system/components-js/styles' as *;
  @use '@/styles/internal.variables.scss' as *;

  #app {
    @include pds-grid;

    /* &--menu-active {
      @include pds-media-query-min-max('base', 's') {
        .header {
          pointer-events: none;
          opacity: 0;
        }
        .aside {
          opacity: 1;
          width: 23.75rem;
          width: 100%;
          z-index: 1;

          transform: translate3d(0, 0, 0);
        }
        .main {
          transform: translate3d(17.5rem, 0, 0);
        }
        .router-view {
          opacity: 0.05;
          pointer-events: none;
        }
      }
    }*/
  }

  // TODO: still not ideal, in edge cases > 2560px
  .aside {
    position: sticky;
    top: 87px;
    height: calc(100vh - 87px);
    padding: calc(#{$p-content-offset - 87px}) $pds-spacing-static-medium $pds-spacing-fluid-x-large
      $pds-grid-wide-offset-base;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    grid-column: full-start / 5;

    @include pds-media-query-min-max('base', 's') {
      opacity: 0;
      transform: translate3d(-8.75rem, 0, 0);
      transition: transform 0.3s, opacity 0.3s;
    }

    @include pds-media-query-min('s') {
      padding: calc(#{$p-content-offset - 87px}) $pds-spacing-static-medium $pds-spacing-fluid-x-large
        $pds-grid-wide-offset-s;
    }

    @include pds-media-query-min('xxl') {
      padding: calc(#{$p-content-offset - 87px}) $pds-spacing-static-medium $pds-spacing-fluid-x-large
        $pds-grid-wide-offset-xxl;
    }
  }

  .footer {
    margin-top: $pds-spacing-fluid-small;
  }

  .main {
    margin-top: $p-content-offset;
    margin-bottom: $pds-spacing-fluid-x-large;
    grid-column: wide-start / wide-end;

    @include pds-media-query-min-max('base', 's') {
      &--animate {
        transform: translate3d(0, 0, 0);
        transition: transform 0.3s;
      }
    }

    @include pds-media-query-min('s') {
      grid-column: 6 / wide-end;
    }
  }

  .router-view {
    @include pds-media-query-min-max('base', 's') {
      opacity: 1;
      transition: opacity 0.3s;
    }

    &--loading {
      opacity: 0;
      pointer-events: none;
    }
  }

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 10;

    @include pds-media-query-min('s') {
      left: calc(50% + #{math.div(17.5rem, 2)});
    }
  }
</style>
