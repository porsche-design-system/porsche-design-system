<template>
  <svg width="250" height="250" viewbox="0 0 250 250">
    <rect
      x="25"
      y="25"
      width="200"
      height="200"
      :fill="this.isThemeDark ? themeDarkBackgroundBase : themeLightBackgroundBase"
    />
    <path
      :id="path"
      :d="this.easingPath"
      :class="{
        'motion-path': true,
        'motion-path--dark': this.isThemeDark,
        'motion-path--light': !this.isThemeDark,
      }"
    />
    <circle
      :class="{ circle: true, 'circle circle--dark': this.isThemeDark, 'circle circle--light': !this.isThemeDark }"
      r="10"
    >
      <animateMotion
        repeatCount="indefinite"
        :dur="motionDurationVeryLong"
        keyPoints="0;1"
        keyTimes="0;1"
        calcMode="spline"
        :keySplines="this.keySplines"
      >
        <mpath :href="'#' + path" />
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
  motionEasingIn,
  motionEasingOut,
  themeDarkBackgroundBase,
  themeLightBackgroundBase,
} from '@porsche-design-system/components-js/styles';
import type { StorefrontTheme } from '@/models';
import { isPreferredColorSchemeDark } from '@/utils';
import { Prop } from 'vue-property-decorator';

@Component
export default class ExampleStylesMotionCurve extends Vue {
  @Prop({ default: 'easing-base' }) public path: 'easing-base' | 'easing-in' | 'easing-out';
  motionDurationVeryLong = motionDurationVeryLong;
  themeDarkBackgroundBase = themeDarkBackgroundBase;
  themeLightBackgroundBase = themeLightBackgroundBase;

  get easingPath(): string {
    switch (this.path) {
      case 'easing-base':
        return 'M25,225 C65,115 185,115 225,25';
      case 'easing-in':
        return 'M25,225 C25,225 65,25 225,25';
      case 'easing-out':
        return 'M25,225 C65,225 185,25 225,25';
      default:
        return 'M25,225 C65,115 185,115 225,25';
    }
  }

  get keySplines(): string {
    switch (this.path) {
      case 'easing-base':
        return this.extractEasingValues(motionEasingBase);
      case 'easing-in':
        return this.extractEasingValues(motionEasingIn);
      case 'easing-out':
        return this.extractEasingValues(motionEasingOut);
      default:
        return this.extractEasingValues(motionEasingBase);
    }
  }

  get storefrontTheme(): StorefrontTheme {
    return this.$store.getters.storefrontTheme;
  }

  get isThemeDark(): boolean {
    return (this.storefrontTheme === 'auto' && isPreferredColorSchemeDark()) || this.storefrontTheme === 'dark';
  }

  extractEasingValues = (easingFunction: string): string => {
    return easingFunction.replace(/.+\((.+)\)/g, '$1');
  };
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
