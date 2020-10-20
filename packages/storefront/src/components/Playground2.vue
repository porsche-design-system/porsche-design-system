<template>
  <div class="playground">
    <p-tabs-bar v-if="mergedConfig.themeable">
      <button type="button" @click="switchTheme('light')">Light theme</button>
      <button type="button" @click="switchTheme('dark')">Dark theme</button>
    </p-tabs-bar>
    <div
      class="example"
      :class="{
        'example--light': (mergedConfig.themeable && theme === 'light') || mergedConfig.themeable === false,
        'example--dark': mergedConfig.themeable && theme === 'dark',
        'example--surface': mergedConfig.colorScheme === 'surface',
        'example--height-fixed': mergedConfig.height === 'fixed',
        'example--spacing-inline': mergedConfig.spacing === 'inline',
        'example--spacing-block': mergedConfig.spacing === 'block',
        'example--spacing-block-small': mergedConfig.spacing === 'block-small'
      }"
    >
      <div v-if="isSlotSet('configurator')" class="configurator">
        <slot name="configurator" :theme="theme" />
      </div>
      <div class="code" v-html="cleanMarkup(markup)"></div>
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
    @Prop({ default: () => ({}) }) public config!: Partial<PlaygroundConfig>;
    @Prop({ default: '' }) public markup!: string;

    public theme: Theme = 'light';

    public get mergedConfig(): PlaygroundConfig {
      return { ...initialConfig, ...this.config };
    }

    public cleanMarkup(input: string): string {
      return input.replace(/\n/g, '');
    }

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
    &--light {
      border-color: $p-color-neutral-contrast-low;
      background-color: $p-color-background-default;

      &.example--surface {
        border-color: $p-color-background-surface;
        background-color: $p-color-background-surface;
      }
    }

    &--dark {
      border-color: $p-color-theme-dark-background-default;
      background-color: $p-color-theme-dark-background-default;

      &.example--surface {
        border-color: $p-color-theme-dark-background-surface;
        background-color: $p-color-theme-dark-background-surface;
      }
    }

    // Child Layout "height"
    &--height-fixed .code {
      ::v-deep * {
        height: p-px-to-rem(180px);
      }
    }

    // Child layout "spacing"
    &--spacing-block .code,
    &--spacing-inline .code {
      &::before {
        content: '';
        display: block;
        margin-top: -$p-spacing-16;
      }

      ::v-deep * {
        margin-top: $p-spacing-16;
      }
    }

    &--spacing-inline .code {
      ::v-deep * {
        &:not(:last-child) {
          margin-right: $p-spacing-16;
        }
      }
    }

    &--spacing-block-small .code {
      &::before {
        content: '';
        display: block;
        margin-top: -$p-spacing-8;
      }

      ::v-deep * {
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
