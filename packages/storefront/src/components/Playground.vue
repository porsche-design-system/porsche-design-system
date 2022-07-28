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
          :colorScheme="config.colorScheme"
          :frameworks="frameworks"
        ></CodeBlock>
        <CodeEditor
          :markup="cleanedEditorMarkup"
          :theme="theme"
          :framework="activeFramework"
          :has-framework-markup="hasFrameworkMarkup"
          :additional-dependencies="additionalDependencies"
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
    @Prop({ default: '' }) public additionalDependencies?: string[];

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
      return this.hasFrameworkMarkup ? this.codeBlockMarkup : cleanMarkup(this.codeBlockMarkup);
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .forEach((el) => ((el as any).theme = this.theme));
    }
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/components-js/utilities/scss';
  @import '../styles/internal.variables';

  .example {
    padding: $pds-spacing-large;
    overflow-x: auto;
    border: 1px solid transparent;

    // Theme
    &--light {
      border-color: $pds-theme-light-contrast-low;
      background-color: $pds-theme-light-background-base;

      &.example--surface {
        border-color: $pds-theme-light-background-surface;
        background-color: $pds-theme-light-background-surface;
      }
    }

    &--dark {
      border-color: $pds-theme-dark-background-base;
      background-color: $pds-theme-dark-background-base;

      &.example--surface {
        border-color: $pds-theme-dark-background-surface;
        background-color: $pds-theme-dark-background-surface;
      }
    }

    &--overflow-x-visible {
      overflow-x: visible;
    }

    // Child Layout "height"
    &--height-fixed .demo {
      :deep(> *) {
        height: 11.25rem;
      }
    }

    // Child layout "spacing"
    &--spacing-block .demo,
    &--spacing-inline .demo {
      &::before {
        content: '';
        display: block;
        margin-top: -$pds-spacing-medium;
      }

      :deep(> *) {
        margin-top: $pds-spacing-medium;
      }
    }

    &--spacing-inline .demo {
      :deep(> *) {
        &:not(:last-child) {
          margin-right: $pds-spacing-medium;
        }
      }
    }

    &--spacing-block-small .demo {
      &::before {
        content: '';
        display: block;
        margin-top: -$pds-spacing-small;
      }

      :deep(> *) {
        margin-top: $pds-spacing-small;
      }
    }

    .configurator ~ .demo {
      margin-top: $pds-spacing-large;
    }

    .demo ~ .code-block {
      margin-top: $pds-spacing-large;
    }

    .code-block ~ p-button {
      margin-top: $pds-spacing-medium;
    }

    .code-block {
      &--framework :deep(pre) {
        max-height: 40rem;
      }
    }
  }
</style>
