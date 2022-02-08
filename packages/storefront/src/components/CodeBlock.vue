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
      }

      pre {
        code ::v-deep {
          // source: https://github.com/PrismJS/prism-themes/blob/master/themes/prism-one-light.css#L81-L139

          .token.comment,
          .token.prolog,
          .token.cdata {
            color: hsl(230, 4%, 64%);
          }

          .token.doctype,
          .token.punctuation,
          .token.entity {
            color: hsl(230, 8%, 24%);
          }

          .token.attr-name,
          .token.class-name,
          .token.boolean,
          .token.constant,
          .token.number,
          .token.atrule {
            color: hsl(35, 99%, 36%);
          }

          .token.keyword {
            color: hsl(301, 63%, 40%);
          }

          .token.property,
          .token.tag,
          .token.symbol,
          .token.deleted,
          .token.important {
            color: hsl(5, 74%, 59%);
          }

          .token.selector,
          .token.string,
          .token.char,
          .token.builtin,
          .token.inserted,
          .token.regex,
          .token.attr-value,
          .token.attr-value > .token.punctuation {
            color: hsl(119, 34%, 47%);
          }

          .token.variable,
          .token.operator,
          .token.function {
            color: hsl(221, 87%, 60%);
          }

          .token.url {
            color: hsl(198, 99%, 37%);
          }

          /* HTML overrides */
          .token.attr-value > .token.punctuation.attr-equals,
          .token.special-attr > .token.attr-value > .token.value.css {
            color: hsl(230, 8%, 24%);
          }
        }
      }
    }

    &--dark {
      code,
      pre {
        color: $p-color-theme-dark-default;
      }

      pre {
        code ::v-deep {
          // source: https://github.com/PrismJS/prism-themes/blob/master/themes/prism-one-dark.css#L92-L150

          .token.comment,
          .token.prolog,
          .token.cdata {
            color: hsl(220, 10%, 40%);
          }

          .token.doctype,
          .token.punctuation,
          .token.entity {
            color: hsl(220, 14%, 71%);
          }

          .token.attr-name,
          .token.class-name,
          .token.boolean,
          .token.constant,
          .token.number,
          .token.atrule {
            color: hsl(29, 54%, 61%);
          }

          .token.keyword {
            color: hsl(286, 60%, 67%);
          }

          .token.property,
          .token.tag,
          .token.symbol,
          .token.deleted,
          .token.important {
            color: hsl(355, 65%, 65%);
          }

          .token.selector,
          .token.string,
          .token.char,
          .token.builtin,
          .token.inserted,
          .token.regex,
          .token.attr-value,
          .token.attr-value > .token.punctuation {
            color: hsl(95, 38%, 62%);
          }

          .token.variable,
          .token.operator,
          .token.function {
            color: hsl(207, 82%, 66%);
          }

          .token.url {
            color: hsl(187, 47%, 55%);
          }

          /* HTML overrides */
          .token.attr-value > .token.punctuation.attr-equals,
          .token.special-attr > .token.attr-value > .token.value.css {
            color: hsl(220, 14%, 71%);
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
      .token.namespace {
        opacity: 0.8;
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
