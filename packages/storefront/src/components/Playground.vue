<template>
  <div class="playground">
    <p-tabs-bar v-if="mergedConfig.themeable" :active-tab-index="activeThemeTabIndex">
      <button type="button" @click="switchTheme('light')">Light theme</button>
      <button type="button" @click="switchTheme('dark')">Dark theme</button>
    </p-tabs-bar>
    <div
      :class="{
        example: true,
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
      <div
        v-if="isSlotSet"
        :class="{
          configurator: !hasFrameworkMarkup,
          demo: hasFrameworkMarkup,
        }"
      >
        <slot :theme="theme" />
      </div>
      <div v-if="markup" ref="demo" class="demo" v-html="cleanedDemoMarkup"></div>
      <template v-if="codeBlockMarkup">
        <CodeBlock
          :class="{ 'code-block--framework': hasFrameworkMarkup }"
          :markup="codeBlockMarkup"
          :convert-markup="!hasFrameworkMarkup"
          :theme="theme"
          :frameworks="frameworks"
        ></CodeBlock>
        <CodeEditor
          v-if="!hasFrameworkMarkup"
          :markup="cleanedEditorMarkup"
          :theme="theme"
          :framework="activeFramework"
        ></CodeEditor>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import CodeBlock from '@/components/CodeBlock.vue';
  import CodeEditor from '@/components/CodeEditor.vue';
  import type { Framework, FrameworkMarkup, Theme } from '@/models';
  import { cleanMarkup, patchThemeIntoMarkup } from '@/utils';
  import { componentMeta } from '@porsche-design-system/shared';

  export type PlaygroundConfig = {
    themeable: boolean;
    colorScheme: 'default' | 'surface';
    height: 'auto' | 'fixed';
    spacing: 'none' | 'inline' | 'block' | 'block-small';
    overflowX: 'auto' | 'visible';
    withoutDemo: boolean;
  };

  export const initialConfig: PlaygroundConfig = {
    themeable: false,
    colorScheme: 'default',
    height: 'auto',
    spacing: 'none',
    overflowX: 'auto',
    withoutDemo: false,
  };

  const themableComponentsSelector = Object.entries(componentMeta)
    .filter(([, meta]) => meta.isThemeable)
    .map(([tagName]) => tagName)
    .join(',');

  @Component({
    components: {
      CodeBlock,
      CodeEditor,
    },
  })
  export default class Playground extends Vue {
    @Prop({ default: () => ({}) }) public config!: Partial<PlaygroundConfig>;
    @Prop({ default: () => ({}) }) public frameworkMarkup!: FrameworkMarkup;
    @Prop({ default: '' }) public markup!: string;

    public mounted(): void {
      this.syncThemeIntoDemoComponents();
    }

    public updated(): void {
      this.syncThemeIntoDemoComponents();
    }

    public switchTheme(theme: Theme): void {
      this.$store.commit('setTheme', theme);
    }

    public get cleanedEditorMarkup(): string {
      return cleanMarkup(this.codeBlockMarkup);
    }

    public get mergedConfig(): PlaygroundConfig {
      return { ...initialConfig, ...this.config };
    }

    public get codeBlockMarkup(): string {
      return patchThemeIntoMarkup(this.activeFrameworkMarkup ?? this.markup, this.theme);
    }

    public get cleanedDemoMarkup(): string {
      return this.config.withoutDemo ? '' : this.markup.replace(/\n/g, '');
    }

    public get frameworks(): Framework[] {
      return this.hasFrameworkMarkup
        ? (Object.keys(this.frameworkMarkup) as Framework[])
        : (undefined as unknown as Framework[]);
    }

    public get activeFramework(): Framework {
      return this.$store.getters.selectedFramework;
    }

    public get activeFrameworkMarkup(): string {
      return this.frameworkMarkup[this.activeFramework]!;
    }

    public get isSlotSet(): boolean {
      return !!this.$scopedSlots.default;
    }

    public get hasFrameworkMarkup(): boolean {
      return Object.keys(this.frameworkMarkup).length !== 0;
    }

    public get activeThemeTabIndex(): number {
      return ['light', 'dark'].indexOf(this.theme);
    }

    public get theme(): Theme {
      return this.config.themeable ? this.$store.getters.theme : 'light';
    }

    private syncThemeIntoDemoComponents(): void {
      (this.$refs.demo as HTMLElement)
        ?.querySelectorAll(themableComponentsSelector)
        .forEach((el) => ((el as any).theme = this.theme));
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

    .code-block ~ form {
      margin-top: $p-spacing-16;
    }

    .code-block {
      &--framework ::v-deep pre {
        max-height: 40rem;
      }
    }
  }
</style>
