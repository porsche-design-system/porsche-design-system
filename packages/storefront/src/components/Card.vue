<template>
  <div
    :class="{
      card: true,
      'card--fit-cover': fit === 'cover',
      'card--fit-contain': fit === 'contain',
      'card--fit-block': fit === 'block',
      'card--position-top': position === 'top',
      'card--position-center': position === 'center',
      'card--position-bottom': position === 'bottom',
    }"
    :style="{ 'min-height': 'clamp(' + height.min + ', ' + height.val + ', ' + height.max + ')' }"
  >
    <div
      :class="{ card__content: true, 'card__content--top': shading, 'card__content--seamless': variant === 'seamless' }"
      v-if="hasTopSlot()"
    >
      <slot name="top"></slot>
    </div>
    <slot></slot>
    <div
      :class="{
        card__content: true,
        'card__content--bottom': shading,
        'card__content--seamless': variant === 'seamless',
      }"
      v-if="hasBottomSlot()"
    >
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';

  @Component
  export default class Card extends Vue {
    @Prop({ default: true }) public shading!: boolean;
    @Prop({ default: 'cover' }) public fit!: 'cover' | 'contain' | 'block';
    @Prop({ default: 'center' }) public position!: 'top' | 'center' | 'bottom';
    @Prop({ default: { min: '10rem', val: '40vh', max: '30rem' } }) public height!: {
      min: string;
      val: string;
      max: string;
    };
    @Prop({ default: 'box' }) public variant!: 'seamless' | 'box';

    hasTopSlot() {
      return !!this.$slots.top;
    }

    hasBottomSlot() {
      return !!this.$slots.bottom;
    }
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/components-js/utilities/scss';

  $border-radius: 12px;

  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: $pds-spacing-large;
    position: relative;
    background: $pds-theme-light-background-surface;
    border-radius: $border-radius;

    img {
      max-width: 100%;
    }

    &--fit-cover > img {
      object-fit: cover;
    }

    &--fit-contain > img {
      object-fit: contain;
    }

    &--fit-block > img {
      display: inline-block;
    }

    &--position-top > img {
      object-position: center top;
    }

    &--position-center > img {
      object-position: center center;
    }

    &--position-bottom > img {
      object-position: center bottom;
    }

    &--fit-cover,
    &--fit-contain {
      & > img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: $border-radius;
        z-index: 0;
      }
    }

    &__content {
      position: relative;
      padding: $pds-spacing-medium;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: $pds-spacing-small;
      z-index: 1;

      & > * {
        position: relative;
      }

      &--seamless {
        padding: 0;
      }

      &--top {
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(to bottom, rgb(23, 25, 32), rgba(13, 15, 22, 0));
          border-top-left-radius: $border-radius;
          border-top-right-radius: $border-radius;
        }
      }

      &--bottom {
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(to top, rgb(23, 25, 32), rgba(13, 15, 22, 0));
          border-bottom-left-radius: $border-radius;
          border-bottom-right-radius: $border-radius;
        }
      }
    }
  }
</style>
