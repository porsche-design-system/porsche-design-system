<template>
  <div class="color-badge" :class="[theme, color]">
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  type Theme = 'light' | 'dark';

  type Color =
    'brand'
    | 'default'
    | 'surface'
    | 'background'
    | 'neutral-contrast-high'
    | 'neutral-contrast-medium'
    | 'neutral-contrast-low'
    | 'notification-success'
    | 'notification-warning'
    | 'notification-error'
    | 'state-focus'
    | 'state-disabled'
    | 'external-facebook'
    | 'external-google'
    | 'external-instagram'
    | 'external-linkedin'
    | 'external-twitter'
    | 'external-wechat'
    | 'external-youtube';

  @Component
  export default class ColorBadge extends Vue {
    @Prop({default: 'light'}) public theme!: Theme;
    @Prop({default: 'brand'}) public color!: Color;
  }
</script>

<style scoped lang="scss">
  @import "~@porsche-design-system/scss-utils/index";

  .color-badge {
    width: rem(160px);
    height: rem(40px);
    border: 1px solid $p-color-theme-light-neutral-contrast-medium;

    // Theme light
    &.light {
      &.brand {
        background: $p-color-theme-light-brand;
      }

      &.default {
        background: $p-color-theme-light-default;
      }

      &.surface {
        background: $p-color-theme-light-surface;
      }

      &.background {
        background: $p-color-theme-light-background;
      }

      &.neutral-contrast-high {
        background: $p-color-theme-light-neutral-contrast-high;
      }

      &.neutral-contrast-medium {
        background: $p-color-theme-light-neutral-contrast-medium;
      }

      &.neutral-contrast-low {
        background: $p-color-theme-light-neutral-contrast-low;
      }

      &.notification-success {
        background: $p-color-theme-light-notification-success;
      }

      &.notification-warning {
        background: $p-color-theme-light-notification-warning;
      }

      &.notification-error {
        background: $p-color-theme-light-notification-error;
      }

      &.state-focus {
        background: $p-color-theme-light-state-focus;
      }

      &.state-disabled {
        background: $p-color-theme-light-state-disabled;
      }
    }

    // Theme dark
    &.dark {
      &.brand {
        background: $p-color-theme-dark-brand;
      }

      &.default {
        background: $p-color-theme-dark-default;
      }

      &.surface {
        background: $p-color-theme-dark-surface;
      }

      &.background {
        background: $p-color-theme-dark-background;
      }

      &.neutral-contrast-high {
        background: $p-color-theme-dark-neutral-contrast-high;
      }

      &.neutral-contrast-medium {
        background: $p-color-theme-dark-neutral-contrast-medium;
      }

      &.neutral-contrast-low {
        background: $p-color-theme-dark-neutral-contrast-low;
      }

      &.notification-success {
        background: $p-color-theme-dark-notification-success;
      }

      &.notification-warning {
        background: $p-color-theme-dark-notification-warning;
      }

      &.notification-error {
        background: $p-color-theme-dark-notification-error;
      }

      &.state-focus {
        background: $p-color-theme-dark-state-focus;
      }

      &.state-disabled {
        background: $p-color-theme-dark-state-disabled;
      }
    }

    // External brand colors
    &.external-facebook {
      background: $p-color-external-facebook;
    }

    &.external-google {
      background: $p-color-external-google;
    }

    &.external-instagram {
      background: $p-color-external-instagram;
    }

    &.external-linkedin {
      background: $p-color-external-linkedin;
    }

    &.external-twitter {
      background: $p-color-external-twitter;
    }

    &.external-wechat {
      background: $p-color-external-wechat;
    }

    &.external-youtube {
      background: $p-color-external-youtube;
    }
  }
</style>
