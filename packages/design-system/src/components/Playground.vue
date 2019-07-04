<template>
  <div class="playground">
    <p-text class="tab" type="20" v-if="themeable">
      <span
        class="link"
        :class="{'is-active': (theme === 'light')}"
        @click="switchTheme('light')"
      >Light theme</span>
    </p-text>
    <p-text class="tab" type="20" v-if="themeable">
      <span
        class="link"
        :class="{'is-active': (theme === 'dark')}"
        @click="switchTheme('dark')"
      >Dark theme</span>
    </p-text>
    <div
      class="example"
      :class="{
        'light': (themeable === false || theme === 'light'),
        'dark': (themeable && theme === 'dark'),
        'children-height-fixed': (childrenHeight === 'fixed')
      }"
    >
      <slot :theme="theme" />
    </div>
  </div>
</template>

<script lang="ts">
type Theme = 'light' | 'dark';

import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Playground extends Vue {
  @Prop({ default: true }) public themeable!: boolean;
  @Prop({ default: 'auto' }) public childrenHeight!: 'auto' | 'fixed';

  public theme: Theme = 'light';

  public switchTheme(theme: Theme): void {
    this.theme = theme;
  }
}
</script>

<style scoped lang="scss">
@import '~@porscheui/ui-kit-js/src/styles/utility/index';

$color-blue-1: lightskyblue;
$color-blue-2: deepskyblue;
$color-blue-3: dodgerblue;
$color-blue-4: royalblue;
$color-highlight: deeppink;

.example {
  padding: $p-spacing-32;
  overflow-x: auto;
  white-space: nowrap;
  border: 1px solid transparent;

  // Mode
  &.light {
    border-color: $p-color-neutral-grey-2;
    background-color: $p-color-porsche-light;
  }

  &.dark {
    border-color: $p-color-surface-dark;
    background-color: $p-color-surface-dark;
  }

  &.children-height-fixed {
    > * {
      height: rem(180px);
    }
  }

  // Common
  &::before {
    content: '';
    display: block;
    margin-top: -$p-spacing-16;
  }

  > * {
    margin-top: $p-spacing-16;

    &:not(:last-child):not(.p-grid) {
      margin-right: $p-spacing-16;
    }
  }

  // Flex - web component code example visualization
  p-flex {
    // spacing between flex blocks
    + p-flex:not([flow='inline']) {
      margin-top: $p-spacing-8;
    }

    // styling to colorize flex items
    p-flex-item {
      &:nth-child(1n) {
        background-color: $color-blue-1;
      }

      &:nth-child(2n) {
        background-color: $color-blue-2;
      }

      &:nth-child(3n) {
        background-color: $color-blue-3;
      }

      &:nth-child(4n) {
        background-color: $color-blue-4;
      }

      // styling to visualize baseline
      &[align-self='baseline'] {
        margin-top: $p-spacing-24;
      }
    }

    // styling to visualize align items behaviour
    &[align-items] {
      p-flex-item:not([align-self='stretch']) {
        &:nth-child(1n) {
          height: 40px;
        }

        &:nth-child(2n) {
          height: 80px;
        }

        &:nth-child(3n) {
          height: 54px;
        }
      }
    }

    // special case for visualizing gap styling
    &[gap] {
      p-flex-item {
        background-color: transparent !important;

        &:nth-child(1n) p {
          background-color: $color-blue-1;
        }

        &:nth-child(2n) p {
          background-color: $color-blue-2;
        }

        &:nth-child(3n) p {
          background-color: $color-blue-3;
        }

        &:nth-child(4n) p {
          background-color: $color-blue-4;
        }
      }
    }

    // styling to visualize baseline
    &[align-items='baseline'] {
      p-flex-item {
        margin-top: $p-spacing-24;
      }
    }
  }

  // Grid - web component code example visualization
  p-grid {
    + .p-grid {
      margin-top: $p-spacing-8;
    }

    p-grid-child {
      > p {
        padding: $p-spacing-4;
        background: $color-blue-1;
      }
    }
  }

  // Spacing - code example visualization
  > .example-spacing-visual {
    display: inline-flex;
    > div {
      background-color: $color-blue-1;
      width: fit-content;
    }
  }
  > .example-spacing {
    display: inline-block;
    vertical-align: top;
    background-color: $color-blue-1;

    &.negative {
      padding: $p-spacing-40;
    }

    &.negative-responsive {
      @include p-spacing-d('padding', '', '');

      > [class*='p-spacing-'] {
        width: 2 * $p-spacing-d;
        height: 2 * $p-spacing-d;

        @include breakpoint('s') {
          width: 2 * $p-spacing-d-s;
          height: 2 * $p-spacing-d-s;
        }
        @include breakpoint('m') {
          width: 2 * $p-spacing-d-m;
          height: 2 * $p-spacing-d-m;
        }
        @include breakpoint('l') {
          width: 2 * $p-spacing-d-l;
          height: 2 * $p-spacing-d-l;
        }
        @include breakpoint('xl') {
          width: 2 * $p-spacing-d-xl;
          height: 2 * $p-spacing-d-xl;
        }
      }
    }

    > [class*='p-spacing-'] {
      position: relative;
      width: $p-spacing-80;
      height: $p-spacing-80;

      &::before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        background-color: $color-blue-2;
      }
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
