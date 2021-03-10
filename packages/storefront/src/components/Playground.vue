<template>
  <div class="playground">
    <p-tabs-bar v-if="mergedConfig.themeable" :active-tab-index="0">
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
        'example--spacing-block-small': mergedConfig.spacing === 'block-small',
        'example--overflow-x-visible': mergedConfig.overflowX === 'visible',
      }"
    >
      <div v-if="isSlotSet" class="configurator">
        <slot :theme="theme" />
      </div>
      <div class="demo" v-html="cleanDemoMarkup(patchedMarkup)"></div>
      <CodeBlock :markup="patchedMarkup" :theme="theme"></CodeBlock>
      <CodeEditor :markup="cleanEditorMarkup(patchedMarkup)" :theme="theme" :framework="framework"></CodeEditor>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import CodeBlock from '@/components/CodeBlock.vue';
  import CodeEditor from '@/components/CodeEditor.vue';
  import { Framework, Theme } from '@/models';
  import { cleanMarkup, patchThemeIntoMarkup } from '@/utils';

  export type PlaygroundConfig = {
    themeable: boolean;
    colorScheme: 'default' | 'surface';
    height: 'auto' | 'fixed';
    spacing: 'none' | 'inline' | 'block' | 'block-small';
    overflowX: 'auto' | 'visible';
  };

  export const initialConfig: PlaygroundConfig = {
    themeable: false,
    colorScheme: 'default',
    height: 'auto',
    spacing: 'none',
    overflowX: 'auto',
  };

  @Component({
    components: {
      CodeBlock,
      CodeEditor,
    },
  })
  export default class Playground extends Vue {
    @Prop({ default: () => ({}) }) public config!: Partial<PlaygroundConfig>;
    @Prop({ default: '' }) public markup!: string;

    public theme: Theme = 'light';
    public cleanEditorMarkup = cleanMarkup;

    public get mergedConfig(): PlaygroundConfig {
      return { ...initialConfig, ...this.config };
    }

    public get patchedMarkup(): string {
      return patchThemeIntoMarkup(this.markup, this.theme);
    }

    public cleanDemoMarkup(input: string): string {
      return input.replace(/\n/g, '');
    }

    public switchTheme(theme: Theme): void {
      this.theme = theme;
    }

    public get framework(): Framework {
      return this.$store.getters.selectedFramework;
    }

    public get isSlotSet(): boolean {
      return !!this.$scopedSlots.default;
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

    &--overflow-x-visible {
      overflow-x: visible;
    }

    // Child Layout "height"
    &--height-fixed .demo {
      ::v-deep > * {
        height: p-px-to-rem(180px);
      }
    }

    // Child layout "spacing"
    &--spacing-block .demo,
    &--spacing-inline .demo {
      &::before {
        content: '';
        display: block;
        margin-top: -$p-spacing-16;
      }

      ::v-deep > * {
        margin-top: $p-spacing-16;
      }
    }

    &--spacing-inline .demo {
      ::v-deep > * {
        &:not(:last-child) {
          margin-right: $p-spacing-16;
        }
      }
    }

    &--spacing-block-small .demo {
      &::before {
        content: '';
        display: block;
        margin-top: -$p-spacing-8;
      }

      ::v-deep > * {
        margin-top: $p-spacing-8;
      }
    }

    .configurator ~ .demo {
      margin-top: $p-spacing-32;
    }

    .demo ~ .code-block {
      margin-top: $p-spacing-32;
    }
  }
</style>
