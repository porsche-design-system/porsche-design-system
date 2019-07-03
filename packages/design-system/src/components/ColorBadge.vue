<template>
  <div class="color-badge" :class="color">
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  type Color =
    'porsche-red'
    | 'porsche-dark-red'
    | 'porsche-light'
    | 'porsche-dark'
    | 'porsche-black'
    | 'surface-light'
    | 'surface-dark'
    | 'neutral-grey-1'
    | 'neutral-grey-2'
    | 'neutral-grey-3'
    | 'neutral-grey-4'
    | 'neutral-grey-5'
    | 'neutral-grey-6'
    | 'neutral-grey-7'
    | 'neutral-grey-8'
    | 'status-red'
    | 'status-green'
    | 'status-yellow'
    | 'state-focus';

  @Component
  export default class ColorBadge extends Vue {
    @Prop({default: 'porsche-red'}) public color!: Color;
  }
</script>

<style scoped lang="scss">
  @import "~@porscheui/ui-kit-js/src/styles/utility/index";

  .color-badge {
    width: rem(160px);
    height: rem(40px);
    border: 1px solid $p-color-neutral-grey-2;

    &.porsche-red {
      background: $p-color-porsche-red;
    }

    &.porsche-dark-red {
      background: $p-color-porsche-dark-red;
    }

    &.porsche-light {
      background: $p-color-porsche-light;
    }

    &.porsche-dark {
      background: $p-color-porsche-dark;
    }

    &.porsche-black {
      background: $p-color-porsche-black;
    }

    &.surface-light {
      background: $p-color-surface-light;
    }

    &.surface-dark {
      background: $p-color-surface-dark;
    }

    &.neutral-grey-1 {
      background: $p-color-neutral-grey-1;
    }

    &.neutral-grey-2 {
      background: $p-color-neutral-grey-2;
    }

    &.neutral-grey-3 {
      background: $p-color-neutral-grey-3;
    }

    &.neutral-grey-4 {
      background: $p-color-neutral-grey-4;
    }

    &.neutral-grey-5 {
      background: $p-color-neutral-grey-5;
    }

    &.neutral-grey-6 {
      background: $p-color-neutral-grey-6;
    }

    &.neutral-grey-7 {
      background: $p-color-neutral-grey-7;
    }

    &.neutral-grey-8 {
      background: $p-color-neutral-grey-8;
    }

    &.status-red {
      background: $p-color-status-red;
    }

    &.status-green {
      background: $p-color-status-green;
    }

    &.status-yellow {
      background: $p-color-status-yellow;
    }

    &.state-focus {
      background: $p-color-state-focus;
    }
  }
</style>
