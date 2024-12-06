<template>
  <main v-if="isStandalone">
    <!-- patterns are rendered here  -->
    <router-view />
  </main>
  <div v-else id="app">
    <Header />
    <MenuMobile />
    <MenuDesktop />
    <Main>
      <router-view class="router-view" />
    </Main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Header from '@/components/Header.vue';
import Main from '@/components/Main.vue';
import MenuMobile from '@/components/MenuMobile.vue';
import MenuDesktop from '@/components/MenuDesktop.vue';
import { Watch } from 'vue-property-decorator';

@Component({
  components: {
    Header,
    Main,
    MenuMobile,
    MenuDesktop,
  },
})
export default class App extends Vue {
  public get isStandalone(): boolean {
    return this.$route.meta?.standalone;
  }

  public get isLoading(): boolean {
    return this.$store.getters.isLoading;
  }

  @Watch('$route')
  private onRouteChange(): void {
    this.$store.commit('setIsMenuActive', false);
  }
}
</script>

<style lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  body {
    --theme-primary: #{$pds-theme-light-primary};
    --theme-background-base: #{$pds-theme-light-background-base};
    --theme-background-surface: #{$pds-theme-light-background-surface};
    --theme-background-shading: #{$pds-theme-light-background-shading};
    --theme-state-hover: #{$pds-theme-light-state-hover};
    --theme-contrast-medium: #{$pds-theme-light-contrast-medium};
    --theme-contrast-low: #{$pds-theme-light-contrast-low};
    --theme-notification-success: #{$pds-theme-light-notification-success};
    --theme-notification-error: #{$pds-theme-light-notification-error};
    --theme-custom-background-aside: #{$pds-theme-light-background-base};
    --theme-custom-background-search: #{$pds-theme-light-background-base};
    --theme-custom-background-header: rgba(255, 255, 255, 0.79);
    --theme-custom-background-code: rgba(0, 0, 0, 0.06);
    --theme-custom-teaser-gradient-1: #c5c8df;
    --theme-custom-teaser-gradient-2: #ebddf9;
    --theme-custom-teaser-background: url('~@/assets/tablet-light.png');

    @media (prefers-color-scheme: dark) {
      --theme-primary: #{$pds-theme-dark-primary};
      --theme-background-base: #{$pds-theme-dark-background-base};
      --theme-background-surface: #{$pds-theme-dark-background-surface};
      --theme-background-shading: #{$pds-theme-dark-background-shading};
      --theme-state-hover: #{$pds-theme-dark-state-hover};
      --theme-contrast-medium: #{$pds-theme-dark-contrast-medium};
      --theme-contrast-low: #{$pds-theme-dark-contrast-low};
      --theme-notification-success: #{$pds-theme-dark-notification-success};
      --theme-notification-error: #{$pds-theme-dark-notification-error};
      --theme-custom-background-aside: #{$pds-theme-dark-background-surface};
      --theme-custom-background-search: #{$pds-theme-dark-background-surface};
      --theme-custom-background-header: rgba(14, 14, 18, 0.79);
      --theme-custom-background-code: rgba(255, 255, 255, 0.08);
      --theme-custom-teaser-gradient-1: #010a28;
      --theme-custom-teaser-gradient-2: #010a28;
      --theme-custom-teaser-background: url('~@/assets/tablet-dark.png');
    }

    &.light-mode {
      --theme-primary: #{$pds-theme-light-primary} !important;
      --theme-background-base: #{$pds-theme-light-background-base} !important;
      --theme-background-surface: #{$pds-theme-light-background-surface} !important;
      --theme-background-shading: #{$pds-theme-light-background-shading} !important;
      --theme-state-hover: #{$pds-theme-light-state-hover} !important;
      --theme-contrast-medium: #{$pds-theme-light-contrast-medium} !important;
      --theme-contrast-low: #{$pds-theme-light-contrast-low} !important;
      --theme-notification-success: #{$pds-theme-light-notification-success} !important;
      --theme-notification-error: #{$pds-theme-light-notification-error} !important;
      --theme-custom-background-aside: #{$pds-theme-light-background-base} !important;
      --theme-custom-background-search: #{$pds-theme-light-background-base} !important;
      --theme-custom-background-header: rgba(255, 255, 255, 0.79) !important;
      --theme-custom-background-code: rgba(0, 0, 0, 0.06) !important;
      --theme-custom-teaser-gradient-1: #c5c8df !important;
      --theme-custom-teaser-gradient-2: #ebddf9 !important;
      --theme-custom-teaser-background: url('~@/assets/tablet-light.png') !important;
    }

    &.dark-mode {
      --theme-primary: #{$pds-theme-dark-primary} !important;
      --theme-background-base: #{$pds-theme-dark-background-base} !important;
      --theme-background-surface: #{$pds-theme-dark-background-surface} !important;
      --theme-background-shading: #{$pds-theme-dark-background-shading} !important;
      --theme-state-hover: #{$pds-theme-dark-state-hover} !important;
      --theme-contrast-medium: #{$pds-theme-dark-contrast-medium} !important;
      --theme-contrast-low: #{$pds-theme-dark-contrast-low} !important;
      --theme-notification-success: #{$pds-theme-dark-notification-success} !important;
      --theme-notification-error: #{$pds-theme-dark-notification-error} !important;
      --theme-custom-background-aside: #{$pds-theme-dark-background-surface} !important;
      --theme-custom-background-search: #{$pds-theme-dark-background-surface} !important;
      --theme-custom-background-header: rgba(14, 14, 18, 0.79) !important;
      --theme-custom-background-code: rgba(255, 255, 255, 0.08) !important;
      --theme-custom-teaser-gradient-1: #010a28 !important;
      --theme-custom-teaser-gradient-2: #010a28 !important;
      --theme-custom-teaser-background: url('~@/assets/tablet-dark.png') !important;
    }
  }

  body {
    background: var(--theme-background-base);
    color: var(--theme-primary);
  }

  // TODO: we shouldn't define most of the following styles globally
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
    margin-inline-end: $pds-spacing-static-small;
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
    margin-inline-end: $pds-spacing-static-large;
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
    padding-inline-end: $pds-spacing-static-small;
  }

  .spacing-pb-8 {
    padding-bottom: $pds-spacing-static-small;
  }

  .spacing-pl-8 {
    padding-inline-start: $pds-spacing-static-small;
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
    margin-inline-start: -$pds-spacing-static-small;
    margin-inline-end: -$pds-spacing-static-small;
  }

  .form-grid-item {
    padding-inline-start: $pds-spacing-static-small;
    padding-inline-end: $pds-spacing-static-small;
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

  .no-before::before {
    display: none;
  }
</style>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  @use '@/styles/internal.variables.scss' as *;

  #app {
    @include pds-grid;
    & {
      grid-row-gap: $pds-spacing-fluid-x-large;
      grid-template-rows: repeat(3, auto);
    }
  }
</style>
