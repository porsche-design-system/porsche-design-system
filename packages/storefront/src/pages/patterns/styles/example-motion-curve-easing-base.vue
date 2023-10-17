<template>
  <svg width="250" height="250" viewbox="0 0 250 250">
    <rect
      x="25"
      y="25"
      width="200"
      height="200"
      :fill="
        (this.storefrontTheme === 'auto' && isPreferredColorSchemeDark) || this.storefrontTheme === 'dark'
          ? themeDarkBackgroundBase
          : themeLightBackgroundBase
      "
    />
    <path
      id="motion-path1"
      d="M25,225 C65,115 185,115 225,25"
      :class="
        (this.storefrontTheme === 'auto' && isPreferredColorSchemeDark) || this.storefrontTheme === 'dark'
          ? 'motion-path motion-path--dark'
          : 'motion-path motion-path--light'
      "
    />
    <circle
      :class="
        (this.storefrontTheme === 'auto' && isPreferredColorSchemeDark) || this.storefrontTheme === 'dark'
          ? 'circle circle--dark'
          : 'circle circle--light'
      "
      r="10"
    >
      <animateMotion
        repeatCount="indefinite"
        :dur="motionDurationVeryLong"
        keyPoints="0;1"
        keyTimes="0;1"
        calcMode="spline"
        :keySplines="motionEasingBase"
      >
        <mpath href="#motion-path1" />
      </animateMotion>
    </circle>
  </svg>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {
    motionDurationVeryLong,
    motionEasingBase,
    themeDarkBackgroundBase,
    themeLightBackgroundBase,
  } from '@porsche-design-system/components-js/styles';
  import { StorefrontTheme } from '@/models';
  import { isPreferredColorSchemeDark } from '@/utils';

  @Component
  export default class ExampleStylesMotionCurveEasingBase extends Vue {
    motionDurationVeryLong = motionDurationVeryLong;
    motionEasingBase = motionEasingBase.replace(/.*\((.*)\)/g, '$1');
    themeDarkBackgroundBase = themeDarkBackgroundBase;
    themeLightBackgroundBase = themeLightBackgroundBase;
    isPreferredColorSchemeDark = isPreferredColorSchemeDark();

    public get storefrontTheme(): StorefrontTheme {
      return this.$store.getters.storefrontTheme;
    }
  }
</script>

<style lang="scss" scoped>
  // TODO: we should import from vue, but we need to prepare CI first
  @use '@porsche-design-system/components-js/styles' as *;

  // Graph
  .motion-path {
    fill: none;
    stroke-width: 1;

    &--light {
      stroke: $pds-theme-light-contrast-low;
    }

    &--dark {
      stroke: $pds-theme-dark-contrast-low;
    }
  }

  // Motion
  .circle {
    stroke: #333;
    stroke-width: 2;
    width: 20px;
    height: 20px;

    &--light {
      stroke: $pds-theme-light-primary;
      fill: $pds-theme-light-primary;
    }

    &--dark {
      stroke: $pds-theme-dark-primary;
      fill: $pds-theme-dark-primary;
    }
  }
</style>
