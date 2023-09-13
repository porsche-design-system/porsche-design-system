<template>
  <div class="playground">
    <p-tabs-bar
      v-if="mergedConfig.themeable"
      :theme="$store.getters.platformTheme"
      :active-tab-index="activeThemeTabIndex"
    >
      <button type="button" @click="switchTheme('light')">Light theme</button>
      <button type="button" @click="switchTheme('dark')">Dark theme</button>
    </p-tabs-bar>
    <div
      :class="{
        example: true,
        'example--light': (mergedConfig.themeable && theme === 'light') || mergedConfig.themeable === false,
        'example--dark': mergedConfig.themeable && theme === 'dark',
        'example--surface': mergedConfig.backgroundColor === 'background-surface',
        'example--height-fixed': mergedConfig.height === 'fixed',
        'example--spacing-inline': mergedConfig.spacing === 'inline',
        'example--spacing-block': mergedConfig.spacing === 'block',
        'example--spacing-block-small': mergedConfig.spacing === 'block-small',
        'example--overflow-x-visible': mergedConfig.overflowX === 'visible',
        'example--fullscreen': isFullWindow,
      }"
    >
      <p-button
        v-if="config.supportsFullWindow"
        class="btn-fullscreen"
        type="button"
        :icon="isFullWindow ? 'zoom-in' : 'zoom-out'"
        :aria="JSON.stringify({ 'aria-expanded': isFullWindow })"
        @click="toggleFullscreen()"
      >
        {{ isFullWindow ? 'Minimize' : 'Maximize' }}
      </p-button>

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
          :backgroundColor="config.backgroundColor"
          :frameworks="frameworks"
        ></CodeBlock>
        <CodeEditor
          v-if="showCodeEditor"
          :markup="cleanedEditorMarkup"
          :theme="theme"
          :framework="activeFramework"
          :externalStackBlitzDependencies="getExternalDependenciesOrThrow(this.externalStackBlitzDependencies)"
          :sharedImportKeys="sharedImportKeys"
          :backgroundColor="config.backgroundColor"
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
  import { cleanMarkup, patchThemeIntoMarkup } from '../utils';
  import { componentMeta } from '@porsche-design-system/component-meta';
  import type { BackgroundColor, Framework, FrameworkMarkup, PlaygroundTheme } from '../models';
  import type { ExternalDependency, SharedImportKey } from '../utils';
  import { getExternalDependenciesOrThrow } from '@/utils/stackblitz/helper';

  export type PlaygroundConfig = {
    themeable: boolean;
    backgroundColor: BackgroundColor;
    height: 'auto' | 'fixed';
    spacing: 'none' | 'inline' | 'block' | 'block-small';
    overflowX: 'auto' | 'visible';
    withoutDemo: boolean;
    supportsFullWindow: boolean;
  };

  export const initialConfig: PlaygroundConfig = {
    themeable: false,
    backgroundColor: 'background-base',
    height: 'auto',
    spacing: 'none',
    overflowX: 'auto',
    withoutDemo: false,
    supportsFullWindow: false,
  };

  const themeableComponentsSelector = Object.entries(componentMeta)
    .filter(([, meta]) => meta.isThemeable)
    .map(([tagName]) => tagName)
    .join();

  @Component({
    components: {
      CodeBlock,
      CodeEditor,
    },
  })
  export default class Playground extends Vue {
    @Prop({ default: () => ({}) }) public config!: Partial<PlaygroundConfig>;
    @Prop({ default: () => ({}) }) public frameworkMarkup!: FrameworkMarkup;
    @Prop({ default: () => [] }) public externalStackBlitzDependencies!: ExternalDependency[];
    @Prop({ default: true }) public showCodeEditor!: boolean;
    @Prop({ default: '' }) public markup!: string;

    getExternalDependenciesOrThrow = getExternalDependenciesOrThrow;
    isFullWindow = false;

    public mounted(): void {
      if (this.config.themeable) {
        this.syncThemeIntoDemoComponents();
      }
    }

    public updated(): void {
      if (this.config.themeable) {
        this.syncThemeIntoDemoComponents();
      }
    }

    public switchTheme(theme: PlaygroundTheme): void {
      this.$store.commit('setPlaygroundTheme', theme);
    }

    public toggleFullscreen(): void {
      this.isFullWindow = !this.isFullWindow;
      document.body.style.overflow = this.isFullWindow ? 'hidden' : '';
      document.body[this.isFullWindow ? 'addEventListener' : 'removeEventListener'](
        'keydown',
        this.onFullScreenKeyDown
      );
    }

    private onFullScreenKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.toggleFullscreen();
      }
    };

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
      // in case there aren't all frameworks available we use the first one as fallback
      return this.frameworkMarkup[this.activeFramework] || Object.values(this.frameworkMarkup)[0];
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

    public get theme(): PlaygroundTheme {
      return this.config.themeable ? this.$store.getters.playgroundTheme : 'light';
    }

    public get sharedImportKeys(): SharedImportKey[] {
      if (this.hasFrameworkMarkup && this.frameworks.includes('shared')) {
        return (
          (this.frameworkMarkup
            .react!.match(/import { (.+) } from '@porsche-design-system\/shared';/)?.[1]
            .match(/\b([a-z][a-zA-Z]+)/g) as SharedImportKey[]) || []
        ); // extract consts, ignore types;
      } else {
        return [];
      }
    }

    private syncThemeIntoDemoComponents(): void {
      (this.$refs.demo as HTMLElement)
        ?.querySelectorAll(themeableComponentsSelector)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .forEach((el) => ((el as any).theme = this.theme));
    }
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  @import '../styles/internal.variables';

  .example {
    position: relative;
    padding: $pds-spacing-static-large;
    overflow-x: auto;
    margin-top: $pds-spacing-static-small;
    border: 1px solid transparent;
    border-radius: $pds-border-radius-large;

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
      border-color: $pds-theme-dark-contrast-low;
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
        margin-top: -$pds-spacing-static-medium;
      }

      :deep(> *) {
        margin-top: $pds-spacing-static-medium;
      }
    }

    &--spacing-inline .demo {
      :deep(> *) {
        &:not(:last-child) {
          margin-right: $pds-spacing-static-medium;
        }
      }
    }

    &--spacing-block-small .demo {
      &::before {
        content: '';
        display: block;
        margin-top: -$pds-spacing-static-small;
      }

      :deep(> *) {
        margin-top: $pds-spacing-static-small;
      }
    }

    .configurator ~ .demo {
      margin-top: $pds-spacing-static-large;
    }

    .demo ~ .code-block {
      margin-top: $pds-spacing-static-large;
    }

    .code-block ~ p-button {
      margin-top: $pds-spacing-static-medium;
    }

    .code-block {
      &--framework :deep(pre) {
        max-height: 40rem;
      }
    }

    &--fullscreen {
      position: fixed;
      inset: 0;
      overflow: auto;
      z-index: 999;
      margin: 0;
      padding-top: 0;
      border: 0;
      border-radius: 0;

      .demo {
        margin: 0 (-$pds-spacing-static-large);
      }
    }
  }

  .btn-fullscreen {
    position: absolute;
    top: $pds-spacing-static-small;
    right: $pds-spacing-static-small;
    z-index: 1; // to be above certain examples
  }
</style>
