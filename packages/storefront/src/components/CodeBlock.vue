<template>
  <div class="code-block" :class="`code-block--${theme}`">
    <p-tabs-bar :theme="theme" :active-tab-index="activeTabIndex">
      <button type="button" v-for="(framework, index) in usedFrameworks" :key="index" @click="setFramework(index)">
        {{ framework }}
      </button>
    </p-tabs-bar>
    <pre :class="highlightedLanguage"><code v-html="highlightedMarkup"></code></pre>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import type { Framework, FrameworkMarkup, Theme } from '@/models';
  import { cleanMarkup, convertToAngular, convertToReact, getHighlightedCode, getHighlightedLanguage } from '@/utils';

  @Component
  export default class CodeBlock extends Vue {
    @Prop({ default: '' }) public markup!: string;
    @Prop({ default: 'light' }) public theme!: Theme;
    @Prop({ default: false }) public convertMarkup!: boolean;
    @Prop({ default: () => ['vanilla-js', 'angular', 'react'] }) public frameworks!: Framework[];

    allFrameworks: Required<FrameworkMarkup> = {
      'vanilla-js': 'Vanilla JS',
      angular: 'Angular',
      react: 'React',
      shared: 'Shared',
    };

    frameworkBeforeShared = this.framework;

    private destroyed(): void {
      // reset framework to what is was before selecting "shared" since that one is usually not available
      if (this.framework === 'shared') {
        this.$store.commit('setSelectedFramework', this.frameworkBeforeShared);
      }
    }

    public get usedFrameworks(): FrameworkMarkup {
      return this.frameworks.reduce((prev, key) => {
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
      if (framework === 'shared') {
        this.frameworkBeforeShared = this.framework;
      }
      this.$store.commit('setSelectedFramework', framework);
    }

    get highlightedLanguage(): string {
      return getHighlightedLanguage(this.framework);
    }

    get highlightedMarkup(): string {
      const markup = this.convertMarkup ? this.convert(this.markup) : this.markup;
      return getHighlightedCode(markup, this.framework);
    }

    private convert(markup: string): string {
      markup = cleanMarkup(markup);
      switch (this.framework) {
        case 'angular':
          return convertToAngular(markup);
        case 'react':
          return convertToReact(markup);
        default:
          return markup;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';
  @import '../styles/internal.variables';

  .code-block {
    &--light {
      code,
      pre {
        color: $p-color-default;
        text-shadow: 0 1px rgba(255, 255, 255, 0.3);
      }

      pre {
        code ::v-deep {
          // source: https://github.com/PrismJS/prism-themes/blob/master/themes/prism-vs.css#L60-L148

          .token.comment,
          .token.prolog,
          .token.doctype,
          .token.cdata {
            color: #008000;
            font-style: italic;
          }

          .token.namespace {
            opacity: 0.7;
          }

          .token.string {
            color: #a31515;
          }

          .token.punctuation,
          .token.operator {
            color: #393a34; /* no highlight */
          }

          .token.url,
          .token.symbol,
          .token.number,
          .token.boolean,
          .token.variable,
          .token.constant,
          .token.inserted {
            color: #36acaa;
          }

          .token.atrule,
          .token.keyword,
          .token.attr-value,
          .language-autohotkey .token.selector,
          .language-json .token.boolean,
          .language-json .token.number,
          code[class*='language-css'] {
            color: #0000ff;
          }

          .token.function {
            color: #393a34;
          }

          .token.deleted,
          .language-autohotkey .token.tag {
            color: #9a050f;
          }

          .token.selector,
          .language-autohotkey .token.keyword {
            color: #00009f;
          }

          .token.important {
            color: #e90;
          }

          .token.important,
          .token.bold {
            font-weight: bold;
          }

          .token.italic {
            font-style: italic;
          }

          .token.class-name,
          .language-json .token.property {
            color: #2b91af;
          }

          .token.tag,
          .token.selector {
            color: #800000;
          }

          .token.attr-name,
          .token.property,
          .token.regex,
          .token.entity {
            color: #ff0000;
          }

          .token.directive.tag .tag {
            background: #ffff00;
            color: #393a34;
          }
        }
      }
    }

    &--dark {
      code,
      pre {
        color: $p-color-theme-dark-default;
        text-shadow: 0 1px rgba(0, 0, 0, 0.3);
      }

      pre {
        code ::v-deep {
          // source: https://github.com/PrismJS/prism-themes/blob/master/themes/prism-vsc-dark-plus.css#L50-L262

          /*********************************************************
          * Tokens
          */
          .namespace {
            opacity: 0.7;
          }

          .token.doctype .token.doctype-tag {
            color: #569cd6;
          }

          .token.doctype .token.name {
            color: #9cdcfe;
          }

          .token.comment,
          .token.prolog {
            color: #6a9955;
          }

          .token.punctuation,
          .language-html .language-css .token.punctuation,
          .language-html .language-javascript .token.punctuation {
            color: #d4d4d4;
          }

          .token.property,
          .token.tag,
          .token.boolean,
          .token.number,
          .token.constant,
          .token.symbol,
          .token.inserted,
          .token.unit {
            color: #b5cea8;
          }

          .token.selector,
          .token.attr-name,
          .token.string,
          .token.char,
          .token.builtin,
          .token.deleted {
            color: #ce9178;
          }

          .language-css .token.string.url {
            text-decoration: underline;
          }

          .token.operator,
          .token.entity {
            color: #d4d4d4;
          }

          .token.operator.arrow {
            color: #569cd6;
          }

          .token.atrule {
            color: #ce9178;
          }

          .token.atrule .token.rule {
            color: #c586c0;
          }

          .token.atrule .token.url {
            color: #9cdcfe;
          }

          .token.atrule .token.url .token.function {
            color: #dcdcaa;
          }

          .token.atrule .token.url .token.punctuation {
            color: #d4d4d4;
          }

          .token.keyword {
            color: #569cd6;
          }

          .token.keyword.module,
          .token.keyword.control-flow {
            color: #c586c0;
          }

          .token.function,
          .token.function .token.maybe-class-name {
            color: #dcdcaa;
          }

          .token.regex {
            color: #d16969;
          }

          .token.important {
            color: #569cd6;
          }

          .token.italic {
            font-style: italic;
          }

          .token.constant {
            color: #9cdcfe;
          }

          .token.class-name,
          .token.maybe-class-name {
            color: #4ec9b0;
          }

          .token.console {
            color: #9cdcfe;
          }

          .token.parameter {
            color: #9cdcfe;
          }

          .token.interpolation {
            color: #9cdcfe;
          }

          .token.punctuation.interpolation-punctuation {
            color: #569cd6;
          }

          .token.boolean {
            color: #569cd6;
          }

          .token.property,
          .token.variable,
          .token.imports .token.maybe-class-name,
          .token.exports .token.maybe-class-name {
            color: #9cdcfe;
          }

          .token.selector {
            color: #d7ba7d;
          }

          .token.escape {
            color: #d7ba7d;
          }

          .token.tag {
            color: #569cd6;
          }

          .token.tag .token.punctuation {
            color: #808080;
          }

          .token.cdata {
            color: #808080;
          }

          .token.attr-name {
            color: #9cdcfe;
          }

          .token.attr-value,
          .token.attr-value .token.punctuation {
            color: #ce9178;
          }

          .token.attr-value .token.punctuation.attr-equals {
            color: #d4d4d4;
          }

          .token.entity {
            color: #569cd6;
          }

          .token.namespace {
            color: #4ec9b0;
          }

          /*********************************************************
          * Language Specific
          */

          pre[class*='language-javascript'],
          code[class*='language-javascript'],
          pre[class*='language-jsx'],
          code[class*='language-jsx'],
          pre[class*='language-typescript'],
          code[class*='language-typescript'],
          pre[class*='language-tsx'],
          code[class*='language-tsx'] {
            color: #9cdcfe;
          }

          pre[class*='language-css'],
          code[class*='language-css'] {
            color: #ce9178;
          }

          pre[class*='language-html'],
          code[class*='language-html'] {
            color: #d4d4d4;
          }

          .language-regex .token.anchor {
            color: #dcdcaa;
          }

          .language-html .token.punctuation {
            color: #808080;
          }
        }
      }
    }
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
    margin-top: $p-spacing-16;

    code ::v-deep {
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
