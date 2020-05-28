<template>
  <div class="menu" :class="{'is-active': isActive}" @click="toggleMenu()">
    <span class="stripe"></span>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';

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
  @import "~@porsche-design-system/utilities/src/scss/index";

  .menu {
    width: p-rem(40px);
    height: p-rem(40px);
    padding: $p-spacing-8;
    cursor: pointer;

    &:hover {
      .stripe {
        background: darken($p-color-theme-light-state-hover, 10%);

        &::before {
          background: darken($p-color-theme-light-state-hover, 10%);
        }

        &::after {
          background: darken($p-color-theme-light-state-hover, 10%);
        }
      }
    }

    &.is-active {
      .stripe {
        transition-delay: .12s;
        transition-timing-function: cubic-bezier(.215, .61, .355, 1);
        transform: rotate(45deg);

        &::before {
          top: 0;
          transition: top 75ms ease, opacity 75ms ease .12s;
          opacity: 0;
        }

        &::after {
          bottom: 0;
          transition: bottom 75ms ease, transform 75ms cubic-bezier(.215, .61, .355, 1) .12s;
          transform: rotate(-90deg);
        }
      }
    }
  }

  .stripe {
    position: absolute;
    top: calc(50% - 1px);
    width: p-rem(24px);
    height: 2px;
    display: block;
    background: $p-color-theme-light-brand;
    transition-property: transform;
    transition-timing-function: cubic-bezier(.55, .055, .675, .19);
    transition-duration: 75ms;

    &::before {
      content: "";
      position: absolute;
      top: p-rem(-11px);
      width: p-rem(24px);
      height: 2px;
      display: block;
      transition-timing-function: ease;
      transition-duration: .15s;
      transition-property: transform;
      background: $p-color-theme-light-brand;
      transition: top 75ms ease .12s, opacity 75ms ease;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: p-rem(-11px);
      width: p-rem(24px);
      height: 2px;
      display: block;
      transition-timing-function: ease;
      transition-duration: .15s;
      transition-property: transform;
      background: $p-color-theme-light-brand;
      transition: bottom 75ms ease .12s, transform 75ms cubic-bezier(.55, .055, .675, .19);
    }
  }
</style>
