<template>
  <div class="playground">
    <p-tabs-bar v-if="config.themeable">
      <button type="button" @click="switchTheme('light')">Light theme</button>
      <button type="button" @click="switchTheme('dark')">Dark theme</button>
    </p-tabs-bar>
    <div
      class="example"
      :class="{
        light: (config.themeable && theme === 'light') || config.themeable === false,
        dark: config.themeable && theme === 'dark',
        surface: config.colorScheme === 'surface',
        'height-fixed': config.height === 'fixed',
        'spacing-inline': config.spacing === 'inline',
        'spacing-block': config.spacing === 'block',
        'spacing-block-small': config.spacing === 'block-small'
      }"
    >
      <div class="configurator" v-if="isSlotSet('configurator')">
        <slot name="configurator" :theme="theme" />
      </div>
      <div class="code" v-html="markup">
        <!--        <slot :theme="theme" />-->
      </div>
      <CodeBlock :markup="markup" :theme="theme" />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import CodeBlock from '@/components/CodeBlock.vue';
  import { Theme } from '@/models';

  export type PlaygroundConfig = {
    themeable: boolean;
    colorScheme: 'default' | 'surface';
    height: 'auto' | 'fixed';
    spacing: 'none' | 'inline' | 'block' | 'block-small';
  };

  export const initialConfig: PlaygroundConfig = {
    themeable: false,
    colorScheme: 'default',
    height: 'auto',
    spacing: 'none'
  };

  @Component({
    components: {
      CodeBlock
    }
  })
  export default class Playground2 extends Vue {
    @Prop({ default: () => initialConfig }) public config!: PlaygroundConfig;
    @Prop({ default: '' }) public markup!: string;

    public theme: Theme = 'light';

    public switchTheme(theme: Theme): void {
      this.theme = theme;
    }

    public isSlotSet(name: string): boolean {
      return this.$scopedSlots[name] !== undefined;
    }
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';
  @import '../styles/internal.variables';

  .example {
    padding: $p-spacing-32;
    overflow-x: auto;
    border: 1px solid transparent;

    // Theme
    &.light {
      border-color: $p-color-neutral-contrast-low;
      background-color: $p-color-background-default;

      &.surface {
        border-color: $p-color-background-surface;
        background-color: $p-color-background-surface;
      }
    }

    &.dark {
      border-color: $p-color-theme-dark-background-default;
      background-color: $p-color-theme-dark-background-default;

      &.surface {
        border-color: $p-color-theme-dark-background-surface;
        background-color: $p-color-theme-dark-background-surface;
      }
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
