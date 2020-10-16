<template>
  <div class="menu" :class="{ 'menu--active': isActive }" @click="toggleMenu()">
    <span class="stripe"></span>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Watch } from 'vue-property-decorator';

  @Component
  export default class Menu extends Vue {
    public get isActive(): boolean {
      return this.$store.getters.isMenuActive;
    }

    public toggleMenu(): void {
      this.$store.commit('toggleIsMenuActive');
    }

    @Watch('$route')
    private onRouteChange(): void {
      this.$store.commit('setIsMenuActive', false);
    }
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';

  .menu {
    width: p-px-to-rem(40px);
    height: p-px-to-rem(40px);
    padding: $p-spacing-8;
    cursor: pointer;

    &:hover {
      .stripe {
        background: darken($p-color-state-hover, 10%);

        &::before,
        &::after {
          background: darken($p-color-state-hover, 10%);
        }
      }
    }

    &--active {
      .stripe {
        transition-delay: 0.12s;
        transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        transform: rotate(45deg);

        &::before {
          top: 0;
          transition: top 75ms ease, opacity 75ms ease 0.12s;
          opacity: 0;
        }

        &::after {
          bottom: 0;
          transition: bottom 75ms ease, transform 75ms cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
          transform: rotate(-90deg);
        }
      }
    }
  }

  .stripe {
    position: absolute;
    top: calc(50% - 1px);
    width: p-px-to-rem(24px);
    height: 2px;
    display: block;
    background: $p-color-brand;
    transition: transform 75ms cubic-bezier(0.55, 0.055, 0.675, 0.19);

    &::before,
    &::after {
      content: '';
      position: absolute;
      height: 2px;
      display: block;
      transition: transform 0.15s ease;
      background: $p-color-brand;
    }

    &::before {
      top: p-px-to-rem(-11px);
      width: p-px-to-rem(24px);
      transition: top 75ms ease 0.12s, opacity 75ms ease;
    }

    &::after {
      bottom: p-px-to-rem(-11px);
      width: p-px-to-rem(24px);
      background: $p-color-brand;
      transition: bottom 75ms ease 0.12s, transform 75ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
  }
</style>
