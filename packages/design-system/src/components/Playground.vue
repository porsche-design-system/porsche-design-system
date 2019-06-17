<template>
  <div class="playground">
    <p-text class="tab" type="20" v-if="themeable">
      <span class="link"
            :class="{'is-active': (theme === 'light')}"
            @click="switchTheme('light')">Light</span>
    </p-text>
    <p-text class="tab" type="20" v-if="themeable">
      <span class="link"
              :class="{'is-active': (theme === 'dark')}"
              @click="switchTheme('dark')">Dark
      </span>
    </p-text>
    <div
      class="example"
      :class="{'light':(themeable === false || theme === 'light'), 'dark':(themeable && theme === 'dark')}">
      <slot :theme="theme"/>
    </div>
  </div>
</template>

<script lang="ts">
  type Theme = 'light' | 'dark';

  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component
  export default class Playground extends Vue {
    @Prop({default: true}) public themeable!: boolean;

    public theme: Theme = 'light';

    public switchTheme(theme: Theme): void {
      this.theme = theme;
    }
  }
</script>

<style scoped lang="scss">
  @import "~@porscheui/ui-kit-js/src/styles/utility/index";

  .example {
    padding: $p-spacing-32;
    overflow-x: auto;
    border: 1px solid transparent;

    &.light {
      border-color: $p-color-neutral-grey-2;
      background-color: $p-color-porsche-light;
    }

    &.dark {
      border-color: $p-color-surface-dark;
      background-color: $p-color-surface-dark;
    }

    &::before {
      content: "";
      display: block;
      margin-top: - $p-spacing-16;
    }

    > * {
      margin-top: $p-spacing-16;

      &:not(:last-child) {
        margin-right: $p-spacing-16;
      }
    }
  }

  .tab {
    display: inline-block;

    &:not(:last-child) {
      margin-right: $p-spacing-24;
    }
  }

  .link {
    display: block;
    padding-bottom: $p-spacing-4;
    text-decoration: none;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    font-weight: 200;
    color: $p-color-neutral-grey-6;
    transition: color $p-animation-hover-duration $p-animation-hover-bezier;

    &:hover {
      color: $p-color-porsche-red;
    }

    &:focus {
      outline: 1px solid $p-color-state-focus;
      outline-offset: 4px;
    }

    &.is-active {
      color: $p-color-porsche-black;
      border-bottom-color: $p-color-porsche-red;
    }
  }
</style>
