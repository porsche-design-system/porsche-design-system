<template>
  <div class="code-block" :class="`code-block--${theme}`">
    <p-tabs-bar :theme="theme" :active-tab-index="activeTabIndex">
      <button type="button" v-for="(framework, index) in usedFrameworks" :key="index" @click="setFramework(index)">
        {{ framework }}
      </button>
    </p-tabs-bar>
    <pre
      :class="highlightedLanguage"
      tabindex="0"
      role="region"
      aria-label="Code sample"
    ><code v-html="highlightedMarkup"></code></pre>
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
          // source: https://github.com/ericwbailey/a11y-syntax-highlighting/blob/main/dist/prism/a11y-light.css#L52-L107

          .token.comment,
          .token.prolog,
          .token.doctype,
          .token.cdata {
            color: #696969;
          }

          .token.punctuation {
            color: #545454;
          }

          .token.property,
          .token.tag,
          .token.constant,
          .token.symbol,
          .token.deleted {
            color: #007299;
          }

          .token.boolean,
          .token.number {
            color: #008000;
          }

          .token.selector,
          .token.attr-name,
          .token.string,
          .token.char,
          .token.builtin,
          .token.inserted {
            color: #aa5d00;
          }

          .token.operator,
          .token.entity,
          .token.url,
          .language-css .token.string,
          .style .token.string,
          .token.variable {
            color: #008000;
          }

          .token.atrule,
          .token.attr-value,
          .token.function {
            color: #418340; // NOTE: this is custom and not from the theme
          }

          .token.keyword {
            color: #d91e18;
          }

          .token.regex,
          .token.important {
            color: #d91e18;
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
          // source: https://github.com/ericwbailey/a11y-syntax-highlighting/blob/main/dist/prism/a11y-dark.css#L52-L107

          .token.comment,
          .token.prolog,
          .token.doctype,
          .token.cdata {
            color: #d4d0ab;
          }

          .token.punctuation {
            color: #fefefe;
          }

          .token.property,
          .token.tag,
          .token.constant,
          .token.symbol,
          .token.deleted {
            color: #ffa07a;
          }

          .token.boolean,
          .token.number {
            color: #00e0e0;
          }

          .token.selector,
          .token.attr-name,
          .token.string,
          .token.char,
          .token.builtin,
          .token.inserted {
            color: #abe338;
          }

          .token.operator,
          .token.entity,
          .token.url,
          .language-css .token.string,
          .style .token.string,
          .token.variable {
            color: #00e0e0;
          }

          .token.atrule,
          .token.attr-value,
          .token.function {
            color: #ffd700;
          }

          .token.keyword {
            color: #00e0e0;
          }

          .token.regex,
          .token.important {
            color: #ffd700;
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
    &:focus-visible {
      @include p-focus;
    }

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
