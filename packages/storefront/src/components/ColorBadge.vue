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
  @import '~@porsche-design-system/components-js/utilities/scss';

  .color-badge {
    width: 10rem;
    height: 2.5rem;
    border: 1px solid $pds-theme-light-contrast-medium;

    // Theme light
    &.light {
      &.brand {
        background: $pds-theme-light-brand;
      }

      &.default {
        background: $pds-theme-light-base;
      }

      &.background-default {
        background: $pds-theme-light-background-base;
      }

      &.background-surface {
        background: $pds-theme-light-background-surface;
      }

      &.background-shading {
        background: $pds-theme-light-background-shading;
      }

      &.neutral-contrast-high {
        background: $pds-theme-light-contrast-high;
      }

      &.neutral-contrast-medium {
        background: $pds-theme-light-contrast-medium;
      }

      &.neutral-contrast-low {
        background: $pds-theme-light-contrast-low;
      }

      &.notification-success {
        background: $pds-theme-light-notification-success;
      }

      &.notification-success-soft {
        background: $pds-theme-light-notification-success-soft;
      }

      &.notification-warning {
        background: $pds-theme-light-notification-warning;
      }

      &.notification-warning-soft {
        background: $pds-theme-light-notification-warning-soft;
      }

      &.notification-error {
        background: $pds-theme-light-notification-error;
      }

      &.notification-error-soft {
        background: $pds-theme-light-notification-error-soft;
      }

      &.notification-neutral {
        background: $pds-theme-light-notification-neutral;
      }

      &.notification-neutral-soft {
        background: $pds-theme-light-notification-neutral-soft;
      }

      &.state-hover {
        background: $pds-theme-light-state-hover;
      }

      &.state-active {
        background: $pds-theme-light-state-active;
      }

      &.state-focus {
        color: $pds-theme-light-base;
        background: $pds-theme-light-state-focus;
      }

      &.state-disabled {
        background: $pds-theme-light-state-disabled;
      }
    }

    // Theme dark
    &.dark {
      &.brand {
        background: $pds-theme-dark-brand;
      }

      &.default {
        background: $pds-theme-dark-base;
      }

      &.background-default {
        background: $pds-theme-dark-background-base;
      }

      &.background-surface {
        background: $pds-theme-dark-background-surface;
      }

      &.background-shading {
        background: $pds-theme-dark-background-shading;
      }

      &.neutral-contrast-high {
        background: $pds-theme-dark-contrast-high;
      }

      &.neutral-contrast-medium {
        background: $pds-theme-dark-contrast-medium;
      }

      &.neutral-contrast-low {
        background: $pds-theme-dark-contrast-low;
      }

      &.notification-success {
        background: $pds-theme-dark-notification-success;
      }

      &.notification-success-soft {
        background: $pds-theme-dark-notification-success-soft;
      }

      &.notification-warning {
        background: $pds-theme-dark-notification-warning;
      }

      &.notification-warning-soft {
        background: $pds-theme-dark-notification-warning-soft;
      }

      &.notification-error {
        background: $pds-theme-dark-notification-error;
      }

      &.notification-error-soft {
        background: $pds-theme-dark-notification-error-soft;
      }

      &.notification-neutral {
        background: $pds-theme-dark-notification-neutral;
      }

      &.notification-neutral-soft {
        background: $pds-theme-dark-notification-neutral-soft;
      }

      &.state-hover {
        background: $pds-theme-dark-state-hover;
      }

      &.state-active {
        background: $pds-theme-dark-state-active;
      }

      &.state-focus {
        color: $pds-theme-dark-base;
        background: $pds-theme-dark-state-focus;
      }

      &.state-disabled {
        background: $pds-theme-dark-state-disabled;
      }
    }

    // External brand colors
    &.external-facebook {
      background: $pds-color-external-facebook;
    }

    &.external-google {
      background: $pds-color-external-google;
    }

    &.external-instagram {
      background: $pds-color-external-instagram;
    }

    &.external-kakaotalk {
      background: $pds-color-external-kakaotalk;
    }

    &.external-linkedin {
      background: $pds-color-external-linkedin;
    }

    &.external-naver {
      background: $pds-color-external-naver;
    }

    &.external-pinterest {
      background: $pds-color-external-pinterest;
    }

    &.external-reddit {
      background: $pds-color-external-reddit;
    }

    &.external-tiktok {
      background: $pds-color-external-tiktok;
    }

    &.external-twitter {
      background: $pds-color-external-twitter;
    }

    &.external-wechat {
      background: $pds-color-external-wechat;
    }

    &.external-whatsapp {
      background: $pds-color-external-whatsapp;
    }

    &.external-xing {
      background: $pds-color-external-xing;
    }

    &.external-youtube {
      background: $pds-color-external-youtube;
    }
  }
</style>
