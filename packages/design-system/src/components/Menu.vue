<template>
  <div class="menu" :class="{'is-active': isActive}" @click="toggleMenu()">
    <span class="stripe"></span>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';

  @Component
  export default class Menu extends Vue {

    public isActive: boolean = false;

    public toggleMenu() {
      this.isActive = !this.isActive;
      this.$emit('toggle', this.isActive);
    }

    @Watch('$route')
    private onRouteChange(): void {
      this.isActive = false;
      this.$emit('toggle', this.isActive);
    }
  }
</script>

<style scoped lang="scss">
  @import "~@porscheui/ui-kit-js/src/styles/utility/index";

  .menu {
    width: rem(40px);
    height: rem(40px);
    padding: $p-spacing-8;
    cursor: pointer;

    &:hover {
      .stripe {
        background: $p-color-porsche-dark-red;

        &::before {
          background: $p-color-porsche-dark-red;
        }

        &::after {
          background: $p-color-porsche-dark-red;
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
    width: rem(24px);
    height: 2px;
    display: block;
    background: $p-color-porsche-red;
    transition-property: transform;
    transition-timing-function: cubic-bezier(.55, .055, .675, .19);
    transition-duration: 75ms;

    &::before {
      content: "";
      position: absolute;
      top: rem(-11px);
      width: rem(24px);
      height: 2px;
      display: block;
      transition-timing-function: ease;
      transition-duration: .15s;
      transition-property: transform;
      background: $p-color-porsche-red;
      transition: top 75ms ease .12s, opacity 75ms ease;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: rem(-11px);
      width: rem(24px);
      height: 2px;
      display: block;
      transition-timing-function: ease;
      transition-duration: .15s;
      transition-property: transform;
      background: $p-color-porsche-red;
      transition: bottom 75ms ease .12s, transform 75ms cubic-bezier(.55, .055, .675, .19);
    }
  }
</style>
