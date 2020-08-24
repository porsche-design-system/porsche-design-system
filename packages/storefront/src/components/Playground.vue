<template>
  <div class="playground">
    <div class="tabs" role="tablist" v-if="themeable">
      <p-text class="tab" size="inherit" weight="thin" tag="div">
        <button
          type="button"
          role="tab"
          :aria-selected="theme === 'light' ? 'true' : 'false'"
          :class="{ 'is-active': theme === 'light' }"
          @click="switchTheme('light')"
        >
          Light theme
        </button>
      </p-text>
      <p-text class="tab" size="inherit" weight="thin" tag="div">
        <button
          type="button"
          role="tab"
          :aria-selected="theme === 'dark' ? 'true' : 'false'"
          :class="{ 'is-active': theme === 'dark' }"
          @click="switchTheme('dark')"
        >
          Dark theme
        </button>
      </p-text>
    </div>
    <div
      class="example"
      :class="{
        light: (themeable && theme === 'light') || themeable === false,
        dark: themeable && theme === 'dark',
        'height-fixed': childElementLayout.height === 'fixed',
        'spacing-inline': childElementLayout.spacing === 'inline',
        'spacing-block': childElementLayout.spacing === 'block',
        'spacing-block-small': childElementLayout.spacing === 'block-small'
      }"
    >
      <div class="configurator" v-if="isSlotSet('configurator')">
        <slot name="configurator" :theme="theme" />
      </div>
      <div class="code">
        <slot :theme="theme" />
      </div>
      <CodeBlock :markup="markup" :theme="theme" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import CodeBlock from '@/components/CodeBlock.vue';
  import { Theme } from '@/models';

  interface ChildElementLayout {
    height: 'auto' | 'fixed';
    spacing: 'none' | 'inline' | 'block' | 'block-small';
  }

  @Component({
    components: {
      CodeBlock
    }
  })
  export default class Playground extends Vue {
    @Prop({ default: false }) public themeable!: boolean;
    @Prop({ default: () => ({ height: 'auto', spacing: 'none' }) }) public childElementLayout!: ChildElementLayout;

    public theme: Theme = 'light';
    public markup = '';

    public switchTheme(theme: Theme): void {
      this.theme = theme;
    }

    public mounted(): void {
      this.markup = this.getMarkup();
    }

    public updated(): void {
      this.markup = this.getMarkup();
    }

    public isSlotSet(name: string): boolean {
      return this.$scopedSlots[name] !== undefined;
    }

    private getMarkup(): string {
      const el = this.$el.querySelector('.code');
      if (el) {
        return el.innerHTML;
      }
      return '';
    }
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';
  @import '../styles/internal.variables';

  .tabs {
    display: flex;

    .tab {
      @include p-generate-type-scale($p-font-size-20);

      &:not(:last-child) {
        margin-right: $p-spacing-24;
      }

      button {
        display: block;
        cursor: pointer;
        border: none;
        font: inherit;
        color: $p-color-theme-light-neutral-contrast-medium;
        background-color: transparent;
        transition: color $p-animation-hover-duration $p-animation-hover-bezier;
        padding-bottom: $p-spacing-4;
        border-bottom: 3px solid transparent;

        &:hover {
          color: $p-color-theme-light-state-hover;
        }

        &:focus {
          outline: 1px solid $p-color-theme-light-state-focus;
          outline-offset: 4px;
        }

        &.is-active {
          cursor: default;
          color: $p-color-theme-light-default;
          border-bottom-color: $p-color-theme-light-brand;
        }
      }
    }
  }

  .example {
    padding: $p-spacing-32;
    overflow-x: auto;
    border: 1px solid transparent;

    // Theme
    &.light {
      border-color: $p-color-theme-light-neutral-contrast-low;
      background-color: $p-color-theme-light-background;
    }

    &.dark {
      border-color: $p-color-theme-dark-background-surface;
      background-color: $p-color-theme-dark-background-surface;
    }

    // Child Layout "height"
    &.height-fixed .code {
      > * {
        height: p-px-to-rem(180px);
      }
    }

    // Child layout "spacing"
    &.spacing-inline .code {
      &::before {
        content: '';
        display: block;
        margin-top: -$p-spacing-16;
      }

      > * {
        margin-top: $p-spacing-16;

        &:not(:last-child) {
          margin-right: $p-spacing-16;
        }
      }
    }

    &.spacing-block .code {
      &::before {
        content: '';
        display: block;
        margin-top: -$p-spacing-16;
      }

      > * {
        margin-top: $p-spacing-16;
      }
    }

    &.spacing-block-small .code {
      &::before {
        content: '';
        display: block;
        margin-top: -$p-spacing-8;
      }

      > * {
        margin-top: $p-spacing-8;
      }
    }

    .configurator ~ .code {
      margin-top: $p-spacing-32;
    }

    .code ~ .code-block {
      margin-top: $p-spacing-40;
    }
  }
</style>
