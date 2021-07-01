<template>
  <div class="playground">
    <p-tabs-bar
      v-if="mergedConfig.themeable"
      :active-tab-index="activeThemeTabIndex"
      v-on:tabChange="handleActiveTabIndex"
    >
      <button type="button" @click="switchTheme('light')">Light theme</button>
      <button type="button" @click="switchTheme('dark')">Dark theme</button>
    </p-tabs-bar>
    <div
      class="playground-static"
      :class="{
        'playground-static--light': (mergedConfig.themeable && theme === 'light') || mergedConfig.themeable === false,
        'playground-static--dark': mergedConfig.themeable && theme === 'dark',
      }"
    >
      <div class="demo" v-if="isSlotSet || this.markup">
        <div v-if="isSlotSet">
          <slot :theme="theme" />
        </div>
        <div v-if="this.markup" v-html="patchedMarkup"></div>
      </div>
      <CodeBlock
        class="code-block"
        :markup="patchedFrameworkMarkup"
        :theme="theme"
        :frameworks="Object.keys(frameworks)"
      ></CodeBlock>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import type { Framework, FrameworkMarkup } from '@/models';
  import CodeBlock from '@/components/CodeBlock.vue';
  import { Theme } from '@/models';
  import { patchThemeIntoMarkup } from '@/utils';

  export type PlaygroundStaticConfig = {
    themeable: boolean;
  };

  export const initialConfig: PlaygroundStaticConfig = {
    themeable: false,
  };

  @Component({
    components: {
      CodeBlock,
    },
  })
  export default class PlaygroundStatic extends Vue {
    @Prop({ default: () => ({}) }) public config!: Partial<PlaygroundStaticConfig>;
    @Prop({ default: {} }) public frameworks!: FrameworkMarkup;
    @Prop({ default: '' }) public markup!: string;

    public theme: Theme = 'light';
    public activeThemeTabIndex = 0;

    public handleActiveTabIndex(event: CustomEvent<{ activeTabIndex: number }>): void {
      const { activeTabIndex } = event.detail;
      this.activeThemeTabIndex = activeTabIndex;
    }

    public get mergedConfig(): PlaygroundStaticConfig {
      return { ...initialConfig, ...this.config };
    }

    public get framework(): Framework {
      return this.$store.getters.selectedFramework;
    }

    public get frameworkMarkup(): string {
      return this.frameworks[this.framework]!;
    }

    public get isSlotSet(): boolean {
      return !!this.$scopedSlots.default;
    }

    public switchTheme(theme: Theme): void {
      this.theme = theme;
    }

    public get patchedFrameworkMarkup(): string {
      return patchThemeIntoMarkup(this.frameworkMarkup, this.theme);
    }

    public get patchedMarkup(): string {
      return patchThemeIntoMarkup(this.markup, this.theme);
    }
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';

  .playground-static {
    padding: $p-spacing-32;
    overflow-x: auto;
    border: 1px solid $p-color-neutral-contrast-low;
    background: $p-color-background-default;

    // Theme
    &--light {
      border-color: $p-color-neutral-contrast-low;
      background-color: $p-color-background-default;
    }

    &--dark {
      border-color: $p-color-theme-dark-background-default;
      background-color: $p-color-theme-dark-background-default;
    }
  }

  .code-block ::v-deep pre {
    max-height: 40rem;
  }

  .demo {
    margin-bottom: $p-spacing-32;
  }
</style>
