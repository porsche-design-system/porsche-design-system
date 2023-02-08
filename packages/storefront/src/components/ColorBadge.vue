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
  @import '~@porsche-design-system/components-js/styles/scss';

  .color-badge {
    width: 10rem;
    height: 2.5rem;
    border: 1px solid $pds-theme-light-contrast-medium;

    // Theme light
    &.light {
      &.primary {
        background: $pds-theme-light-primary;
      }

      &.background-default {
        background: $pds-theme-light-background-base;
      }

      &.background-surface {
        background: $pds-theme-light-background-surface;
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
        background: $pds-theme-light-notification-info;
      }

      &.notification-neutral-soft {
        background: $pds-theme-light-notification-info-soft;
      }

      &.state-hover {
        background: $pds-theme-light-state-hover;
      }

      &.state-active {
        background: $pds-theme-light-state-active;
      }

      &.state-focus {
        color: $pds-theme-light-primary;
        background: $pds-theme-light-state-focus;
      }

      &.state-disabled {
        background: $pds-theme-light-state-disabled;
      }
    }

    // Theme dark
    &.dark {
      &.primary {
        background: $pds-theme-dark-primary;
      }

      &.background-default {
        background: $pds-theme-dark-background-base;
      }

      &.background-surface {
        background: $pds-theme-dark-background-surface;
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
        background: $pds-theme-dark-notification-info;
      }

      &.notification-neutral-soft {
        background: $pds-theme-dark-notification-info-soft;
      }

      &.state-hover {
        background: $pds-theme-dark-state-hover;
      }

      &.state-active {
        background: $pds-theme-dark-state-active;
      }

      &.state-focus {
        color: $pds-theme-dark-primary;
        background: $pds-theme-dark-state-focus;
      }

      &.state-disabled {
        background: $pds-theme-dark-state-disabled;
      }
    }
  }
</style>
