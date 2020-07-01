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
    | 'background-shading'
    | 'neutral-contrast-high'
    | 'neutral-contrast-medium'
    | 'neutral-contrast-low'
    | 'notification-success'
    | 'notification-warning'
    | 'notification-error'
    | 'notification-neutral'
    | 'state-hover'
    | 'state-active'
    | 'state-focus'
    | 'state-disabled'
    | 'external-facebook'
    | 'external-google'
    | 'external-instagram'
    | 'external-linkedin'
    | 'external-pinterest'
    | 'external-twitter'
    | 'external-wechat'
    | 'external-whatsapp'
    | 'external-xing'
    | 'external-youtube';

  @Component
  export default class ColorBadge extends Vue {
    @Prop({default: 'light'}) public theme!: Theme;
    @Prop({default: 'brand'}) public color!: Color;
  }
</script>

<style scoped lang="scss">
  @import "~@porsche-design-system/utilities/scss";

  .color-badge {
    width: p-rem(160px);
    height: p-rem(40px);
    border: 1px solid $p-color-neutral-contrast-medium;

    // Theme light
    &.light {
      &.brand {
        background: $p-color-brand;
      }

      &.default {
        background: $p-color-default;
      }

      &.surface {
        background: $p-color-surface;
      }

      &.background {
        background: $p-color-background;
      }

      &.background-shading {
        background: $p-color-background-shading;
      }

      &.neutral-contrast-high {
        background: $p-color-neutral-contrast-high;
      }

      &.neutral-contrast-medium {
        background: $p-color-neutral-contrast-medium;
      }

      &.neutral-contrast-low {
        background: $p-color-neutral-contrast-low;
      }

      &.notification-success {
        background: $p-color-notification-success;
      }

      &.notification-warning {
        background: $p-color-notification-warning;
      }

      &.notification-error {
        background: $p-color-notification-error;
      }

      &.notification-neutral {
        background: $p-color-notification-neutral;
      }

      &.state-hover {
        background: $p-color-state-hover;
      }

      &.state-active {
        background: $p-color-state-active;
      }

      &.state-focus {
        background: $p-color-state-focus;
      }

      &.state-disabled {
        background: $p-color-state-disabled;
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

      &.background-shading {
        background: $p-color-theme-dark-background-shading;
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

      &.notification-neutral {
        background: $p-color-theme-dark-notification-neutral;
      }

      &.state-hover {
        background: $p-color-theme-dark-state-hover;
      }

      &.state-active {
        background: $p-color-theme-dark-state-active;
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

    &.external-pinterest {
      background: $p-color-external-pinterest;
    }

    &.external-twitter {
      background: $p-color-external-twitter;
    }

    &.external-wechat {
      background: $p-color-external-wechat;
    }

    &.external-whatsapp {
      background: $p-color-external-whatsapp;
    }

    &.external-xing {
      background: $p-color-external-xing;
    }

    &.external-youtube {
      background: $p-color-external-youtube;
    }
  }
</style>
