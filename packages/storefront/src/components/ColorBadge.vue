<template>
  <div class="color-badge" :class="[theme, color]"></div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import { Theme } from '@/models';

  type Color =
    | 'brand'
    | 'default'
    | 'background-default'
    | 'background-surface'
    | 'background-shading'
    | 'neutral-contrast-high'
    | 'neutral-contrast-medium'
    | 'neutral-contrast-low'
    | 'notification-success'
    | 'notification-success-soft'
    | 'notification-warning'
    | 'notification-warning-soft'
    | 'notification-error'
    | 'notification-error-soft'
    | 'notification-neutral'
    | 'notification-neutral-soft'
    | 'state-hover'
    | 'state-active'
    | 'state-focus'
    | 'state-disabled'
    | 'external-facebook'
    | 'external-google'
    | 'external-instagram'
    | 'external-kakaotalk'
    | 'external-linkedin'
    | 'external-naver'
    | 'external-pinterest'
    | 'external-reddit'
    | 'external-tiktok'
    | 'external-twitter'
    | 'external-wechat'
    | 'external-whatsapp'
    | 'external-xing'
    | 'external-youtube';

  @Component
  export default class ColorBadge extends Vue {
    @Prop({ default: 'light' }) public theme!: Theme;
    @Prop({ default: 'brand' }) public color!: Color;
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';

  .color-badge {
    width: p-px-to-rem(160px);
    height: p-px-to-rem(40px);
    border: 1px solid $p-color-neutral-contrast-medium;

    // Theme light
    &.light {
      &.brand {
        background: $p-color-brand;
      }

      &.default {
        background: $p-color-default;
      }

      &.background-default {
        background: $p-color-background-default;
      }

      &.background-surface {
        background: $p-color-background-surface;
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

      &.notification-success-soft {
        background: $p-color-notification-success-soft;
      }

      &.notification-warning {
        background: $p-color-notification-warning;
      }

      &.notification-warning-soft {
        background: $p-color-notification-warning-soft;
      }

      &.notification-error {
        background: $p-color-notification-error;
      }

      &.notification-error-soft {
        background: $p-color-notification-error-soft;
      }

      &.notification-neutral {
        background: $p-color-notification-neutral;
      }

      &.notification-neutral-soft {
        background: $p-color-notification-neutral-soft;
      }

      &.state-hover {
        background: $p-color-state-hover;
      }

      &.state-active {
        background: $p-color-state-active;
      }

      &.state-focus {
        color: $p-color-default;
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

      &.background-default {
        background: $p-color-theme-dark-background-default;
      }

      &.background-surface {
        background: $p-color-theme-dark-background-surface;
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

      &.notification-success-soft {
        background: $p-color-theme-dark-notification-success-soft;
      }

      &.notification-warning {
        background: $p-color-theme-dark-notification-warning;
      }

      &.notification-warning-soft {
        background: $p-color-theme-dark-notification-warning-soft;
      }

      &.notification-error {
        background: $p-color-theme-dark-notification-error;
      }

      &.notification-error-soft {
        background: $p-color-theme-dark-notification-error-soft;
      }

      &.notification-neutral {
        background: $p-color-theme-dark-notification-neutral;
      }

      &.notification-neutral-soft {
        background: $p-color-theme-dark-notification-neutral-soft;
      }

      &.state-hover {
        background: $p-color-theme-dark-state-hover;
      }

      &.state-active {
        background: $p-color-theme-dark-state-active;
      }

      &.state-focus {
        color: $p-color-theme-dark-default;
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

    &.external-kakaotalk {
      background: $p-color-external-kakaotalk;
    }

    &.external-linkedin {
      background: $p-color-external-linkedin;
    }

    &.external-naver {
      background: $p-color-external-naver;
    }

    &.external-pinterest {
      background: $p-color-external-pinterest;
    }

    &.external-reddit {
      background: $p-color-external-reddit;
    }

    &.external-tiktok {
      background: $p-color-external-tiktok;
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
