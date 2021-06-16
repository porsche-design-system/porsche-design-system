<template>
  <div class="code-block">
    <p-tabs-bar :active-tab-index="activeTabIndex">
      <button type="button" v-for="(framework, index) in usedFrameworks" :key="index" @click="setFramework(index)">
        {{ framework }}
      </button>
    </p-tabs-bar>
    <pre><code v-html="highlightedMarkup"></code></pre>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import type { Framework, FrameworkMarkup } from '@/models';
  import { getHighlightedCode } from '@/utils';

  @Component
  export default class CodeBlockExtended extends Vue {
    @Prop({ default: [] }) public frameworks!: FrameworkMarkup;

    allFrameworks: Required<FrameworkMarkup> = {
      'vanilla-js': 'Vanilla JS',
      angular: 'Angular',
      react: 'React',
      shared: 'Shared',
    };

    public get usedFrameworks(): FrameworkMarkup {
      return Object.keys(this.frameworks).reduce((prev, key) => {
        prev[key as Framework] = this.allFrameworks[key as Framework];
        return prev;
      }, {} as FrameworkMarkup);
    }

    public get activeTabIndex(): number {
      return Object.keys(this.usedFrameworks).indexOf(this.framework);
    }

    public get framework(): Framework {
      return this.$store.getters.selectedFramework;
    }

    public setFramework(framework: Framework): void {
      this.$store.commit('setSelectedFramework', framework);
    }

    get highlightedMarkup(): string {
      const markup = this.frameworks[this.framework]!;
      return getHighlightedCode(markup, this.framework);
    }
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';
  @import '../styles/internal.variables';
  @import '../styles/code-highlighting';

  .code-block {
    @include codeHighlighting('light');
  }

  code,
  pre {
    background: transparent;
    font-family: Monaco, Menlo, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 0.875rem;
    line-height: 1.5;
    tab-size: 2;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    hyphens: none;
  }

  pre {
    max-height: 20rem;
    overflow: auto;
    margin: $p-spacing-16 0;

    code ::v-deep {
      .namespace {
        opacity: 0.7;
      }

      .token.important,
      .token.bold {
        font-weight: bold;
      }

      .token.italic {
        font-style: italic;
      }

      .token.entity {
        cursor: help;
      }
    }
  }
</style>
