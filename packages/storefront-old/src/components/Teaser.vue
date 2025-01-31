<template>
  <header>
    <p-display :theme="storefrontTheme" class="heading" size="small" tag="h1">Welcome to the new digital</p-display>
    <p-text :theme="storefrontTheme" class="paragraph" color="contrast-high" size="large">
      Become today a part of tomorrow’s Porsche new design language with the new Porsche Design System v3.
    </p-text>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { StorefrontTheme } from '@/models';

@Component({})
export default class Teaser extends Vue {
  public get storefrontTheme(): StorefrontTheme {
    return this.$store.getters.storefrontTheme;
  }
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  @use '@/styles/internal.variables.scss' as *;

  header {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: $pds-spacing-fluid-medium;
    // Custom padding-bottom to properly align background image
    padding: calc(#{$header-height} + #{$pds-spacing-fluid-x-large}) 0 clamp(340px, 5.882vw + 100px, 160px) 0;
    z-index: 0;

    &::before {
      content: '';
      position: absolute;
      inset: 0 calc(#{$pds-grid-extended-offset-base} * -1);
      // TODO: we should use a mixin, and maybe even split gradient and image into ::before and ::after
      background:
        var(--theme-custom-teaser-background) no-repeat bottom -6vw center / min(86%, 320px),
        radial-gradient(
          54.76% 107.92% at 64.08% 89.73%,
          var(--theme-custom-teaser-gradient-1) 0%,
          var(--theme-custom-teaser-gradient-2) 52.6%,
          transparent 100%
        );
      z-index: -1;

      @include pds-media-query-min('xs') {
        // TODO: we should use a mixin, and maybe even split gradient and image into ::before and ::after
        background:
          var(--theme-custom-teaser-background) no-repeat bottom -6vw center / min(70%, 380px),
          radial-gradient(
            54.76% 107.92% at 64.08% 89.73%,
            var(--theme-custom-teaser-gradient-1) 0%,
            var(--theme-custom-teaser-gradient-2) 52.6%,
            transparent 100%
          );
      }

      @include pds-media-query-min('s') {
        inset-inline-start: 0;
        inset-inline-end: calc(#{$pds-grid-extended-offset-s} * -1);
        // TODO: we should use a mixin, and maybe even split gradient and image into ::before and ::after
        background:
          var(--theme-custom-teaser-background) no-repeat bottom -6vw right 10% / min(50%, 600px),
          radial-gradient(
            54.76% 107.92% at 64.08% 89.73%,
            var(--theme-custom-teaser-gradient-1) 0%,
            var(--theme-custom-teaser-gradient-2) 52.6%,
            transparent 100%
          );
      }

      @include pds-media-query-min('m') {
        inset-inline-end: calc(#{$pds-grid-wide-offset-s} * -1);
        // TODO: we should use a mixin, and maybe even split gradient and image into ::before and ::after
        background:
          var(--theme-custom-teaser-background) no-repeat bottom -6vw right 10% / min(50%, 660px),
          radial-gradient(
            54.76% 107.92% at 64.08% 89.73%,
            var(--theme-custom-teaser-gradient-1) 0%,
            var(--theme-custom-teaser-gradient-2) 52.6%,
            transparent 100%
          );
      }

      @include pds-media-query-min('xxl') {
        inset-inline-end: calc(#{$pds-grid-wide-offset-xxl} * -1);
      }
    }

    // TODO: gradient needs to be mirrored too for RTL mode
    &:dir(rtl)::before {
      background:
        var(--theme-custom-teaser-background) no-repeat bottom -6vw center / min(86%, 320px),
        radial-gradient(
          54.76% 107.92% at 64.08% 89.73%,
          var(--theme-custom-teaser-gradient-1) 0%,
          var(--theme-custom-teaser-gradient-2) 52.6%,
          transparent 100%
        );

      @include pds-media-query-min('xs') {
        background:
          var(--theme-custom-teaser-background) no-repeat bottom -6vw center / min(70%, 380px),
          radial-gradient(
            54.76% 107.92% at 64.08% 89.73%,
            var(--theme-custom-teaser-gradient-1) 0%,
            var(--theme-custom-teaser-gradient-2) 52.6%,
            transparent 100%
          );
      }

      @include pds-media-query-min('s') {
        background:
          var(--theme-custom-teaser-background) no-repeat bottom -6vw left 10% / min(50%, 600px),
          radial-gradient(
            54.76% 107.92% at 64.08% 89.73%,
            var(--theme-custom-teaser-gradient-1) 0%,
            var(--theme-custom-teaser-gradient-2) 52.6%,
            transparent 100%
          );
      }

      @include pds-media-query-min('m') {
        background:
          var(--theme-custom-teaser-background) no-repeat bottom -6vw left 10% / min(50%, 660px),
          radial-gradient(
            54.76% 107.92% at 64.08% 89.73%,
            var(--theme-custom-teaser-gradient-1) 0%,
            var(--theme-custom-teaser-gradient-2) 52.6%,
            transparent 100%
          );
      }
    }
  }

  .heading,
  .paragraph {
    @include pds-media-query-min('xs') {
      max-width: 100%;
    }

    @include pds-media-query-min('s') {
      max-width: 50%;
    }
  }
</style>
