<template>
  <div class="playground">
    <div class="header">
      <ThemeSelect v-if="mergedConfig.themeable" :theme="selectTheme" v-on:update="switchTheme" :hide-label="true" />
      <p-select-wrapper class="select" :theme="$store.getters.storefrontTheme" label="Direction" hide-label="true">
        <select name="dir" v-model="selectDir" v-on:change="switchDir">
          <option disabled>Select direction</option>
          <option value="ltr">LTR (left-to-right)</option>
          <option value="rtl">RTL (right-to-left)</option>
          <option value="auto">Auto</option>
        </select>
      </p-select-wrapper>
    </div>
    <div
      :class="{
        example: true,
        'example--light': (mergedConfig.themeable && theme === 'light') || !mergedConfig.themeable,
        'example--dark': mergedConfig.themeable && theme === 'dark',
        'example--auto': mergedConfig.themeable && theme === 'auto',
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
        :dir="dir"
      >
        <slot :theme="theme" />
      </div>

      <div v-if="markup" ref="demo" class="demo" v-html="cleanedDemoMarkup" :dir="dir"></div>

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
          :dir="dir"
          :framework="activeFramework"
          :externalStackBlitzDependencies="getExternalDependenciesOrThrow(externalStackBlitzDependencies)"
          :sharedImportKeys="sharedImportKeys"
          :backgroundColor="config.backgroundColor"
          :is-embedded="config.embedStackblitz"
        ></CodeEditor>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import CodeBlock from '@/components/CodeBlock.vue';
import CodeEditor from '@/components/CodeEditor.vue';
import ThemeSelect from '@/components/ThemeSelect.vue';
import { getExternalDependenciesOrThrow } from '@/utils/stackblitz/helper';
import { componentMeta } from '@porsche-design-system/component-meta';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import type { BackgroundColor, Framework, FrameworkMarkup, PlaygroundDir, PlaygroundTheme } from '../models';
import { cleanMarkup, patchThemeIntoMarkup } from '../utils';
import type { ExternalDependency, SharedImportKey } from '../utils';

export type PlaygroundConfig = {
  themeable: boolean;
  backgroundColor: BackgroundColor;
  height: 'auto' | 'fixed';
  spacing: 'none' | 'inline' | 'block' | 'block-small';
  overflowX: 'auto' | 'visible';
  withoutDemo: boolean;
  supportsFullWindow: boolean;
  embedStackblitz: boolean;
};

export const initialConfig: PlaygroundConfig = {
  themeable: false,
  backgroundColor: 'background-base',
  height: 'auto',
  spacing: 'none',
  overflowX: 'auto',
  withoutDemo: false,
  supportsFullWindow: false,
  embedStackblitz: false,
};

const themeableComponentsSelector = Object.entries(componentMeta)
  .filter(([, meta]) => meta.isThemeable)
  .map(([tagName]) => tagName)
  .join();

@Component({
  components: {
    ThemeSelect,
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
  selectDir: PlaygroundDir = 'ltr';
  selectTheme: PlaygroundTheme = 'light';

  public mounted(): void {
    this.selectDir = this.dir;
    if (this.config.themeable) {
      this.selectTheme = this.theme;
      this.syncThemeIntoDemoComponents();
    }
  }

  public updated(): void {
    this.selectDir = this.dir;
    if (this.config.themeable) {
      this.selectTheme = this.theme;
      this.syncThemeIntoDemoComponents();
    }
  }

  public switchTheme(e: Event): void {
    this.$store.commit('setPlaygroundTheme', (e.target as HTMLInputElement).value);
  }

  public switchDir = (e: Event): void => {
    this.$store.commit('setPlaygroundDir', (e.target as HTMLInputElement).value);
  };

  public toggleFullscreen(): void {
    this.isFullWindow = !this.isFullWindow;
    document.body.style.overflow = this.isFullWindow ? 'hidden' : '';
    document.body[this.isFullWindow ? 'addEventListener' : 'removeEventListener']('keydown', this.onFullScreenKeyDown);
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

  public get theme(): PlaygroundTheme {
    return this.config.themeable ? this.$store.getters.playgroundTheme : 'light';
  }

  public get dir(): PlaygroundDir {
    return this.$store.getters.playgroundDir || 'ltr';
  }

  public get sharedImportKeys(): SharedImportKey[] {
    if (this.hasFrameworkMarkup && this.frameworks.includes('shared')) {
      return (
        (this.frameworkMarkup
          .react!.match(/import { (.+) } from '@porsche-design-system\/shared';/)?.[1] // extract all imports
          .match(/(?!type)\b[a-z][a-zA-Z]+/g) as SharedImportKey[]) || [] // extract constants, ignore types
      );
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
  @use '../styles/internal.variables' as *;

  .playground {
    display: flex;
    flex-direction: column;
    gap: $pds-spacing-static-small;
  }

  .header {
    display: flex;
    gap: $pds-spacing-fluid-x-small;
    flex-direction: column;

    @include pds-media-query-min('xs') {
      flex-direction: row;
    }
  }

  .select {
    @include pds-media-query-min('xs') {
      width: min(calc(50% - #{$pds-spacing-fluid-x-small} / 2), 12.5rem);
    }
  }

  .example {
    position: relative;
    padding: $pds-spacing-static-large;
    overflow-x: auto;
    border: 1px solid var(--playground-border-color);
    border-radius: $pds-border-radius-large;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: $pds-spacing-static-large;
    background: var(--playground-background-color);

    &--light,
    &--auto {
      --playground-border-color: #{$pds-theme-light-contrast-low};
      --playground-background-color: #{$pds-theme-light-background-base};

      &.example--surface {
        --playground-border-color: #{$pds-theme-light-background-surface};
        --playground-background-color: #{$pds-theme-light-background-surface};
      }
    }

    &--dark {
      --playground-border-color: #{$pds-theme-dark-contrast-low};
      --playground-background-color: #{$pds-theme-dark-background-base};

      &.example--surface {
        --playground-border-color: #{$pds-theme-dark-background-surface};
        --playground-background-color: #{$pds-theme-dark-background-surface};
      }
    }

    &--auto {
      @media (prefers-color-scheme: dark) {
        --playground-border-color: #{$pds-theme-dark-contrast-low};
        --playground-background-color: #{$pds-theme-dark-background-base};

        &.example--surface {
          --playground-border-color: #{$pds-theme-dark-background-surface};
          --playground-background-color: #{$pds-theme-dark-background-surface};
        }
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
          margin-inline-end: $pds-spacing-static-medium;
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

  .demo,
  .configurator {
    width: 100%;
  }

  .code-block {
    &--framework :deep(pre) {
      max-height: 40rem;
    }
  }

  .btn-fullscreen {
    position: absolute;
    top: $pds-spacing-static-small;
    inset-inline-end: $pds-spacing-static-small;
    z-index: 1; // to be above certain examples
  }
</style>
