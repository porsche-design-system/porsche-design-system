<template>
  <div class="code-block" :class="`code-block--${theme}`">
    <p-tabs-bar :theme="theme" :active-tab-index="activeTabIndex">
      <button
        type="button"
        v-for="(frameWork, index) in frameworks"
        :key="index"
        @click="setFramework(index)"
        v-text="frameWork"
      ></button>
    </p-tabs-bar>
    <pre><code v-html="highlightedMarkup"></code></pre>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import { highlight, languages } from 'prismjs';
  import 'prismjs/components/prism-jsx';
  import 'prismjs/components/prism-markup';
  import { Framework, Theme } from '@/models';
  import { cleanMarkup, convertToAngular, convertToReact } from '@/utils';

  @Component
  export default class CodeBlock extends Vue {
    @Prop({ default: '' }) public markup!: string;
    @Prop({ default: 'light' }) public theme!: Theme;

    frameworks: { [key in Framework]: string } = {
      'vanilla-js': 'Vanilla JS',
      angular: 'Angular',
      react: 'React',
    };

    public get activeTabIndex(): number {
      return Object.keys(this.frameworks).indexOf(this.framework);
    }

    public get framework(): Framework {
      return this.$store.getters.selectedFramework;
    }

    public setFramework(framework: Framework): void {
      this.$store.commit('setSelectedFramework', framework);
    }

    get highlightedMarkup(): string {
      return this.highlight(this.convert(this.markup));
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

    private highlight(markup: string): string {
      const isReact = this.framework === 'react';
      return highlight(markup, languages[isReact ? 'jsx' : 'markup'], isReact ? 'language-jsx' : 'markup');
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
          .token.comment,
          .token.prolog,
          .token.doctype,
          .token.cdata {
            color: #aaa;
          }

          .token.punctuation {
            color: #999;
          }

          .token.property,
          .token.tag,
          .token.boolean,
          .token.number,
          .token.constant,
          .token.symbol {
            color: #0cf;
          }

          .token.selector,
          .token.attr-name,
          .token.string,
          .token.char,
          .token.builtin {
            color: royalblue;
          }

          .token.operator,
          .token.entity,
          .token.url,
          .toke.variable,
          .token.inserted {
            color: yellowgreen;
          }

          .token.atrule,
          .token.attr-value,
          .token.keyword {
            color: deeppink;
          }

          .token.script {
            color: hotpink;
          }

          .token.regex,
          .token.important {
            color: orange;
          }

          .token.deleted {
            color: red;
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
          .token.comment,
          .token.prolog,
          .token.doctype,
          .token.cdata {
            color: #4a5f78;
          }

          .token.punctuation {
            color: #4a5f78;
          }

          .token.tag,
          .token.operator,
          .token.number {
            color: #0aa370;
          }

          .token.property,
          .token.function {
            color: #57718e;
          }

          .token.tag-id,
          .token.selector,
          .token.atrule-id {
            color: #ebf4ff;
          }

          .token.attr-name {
            color: #7eb6f6;
          }

          .token.boolean,
          .token.string,
          .token.entity,
          .token.url,
          .token.attr-value,
          .token.keyword,
          .token.control,
          .token.directive,
          .token.unit,
          .token.statement,
          .token.regex,
          .token.atrule,
          .token.placeholder,
          .token.variable {
            color: #47ebb4;
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
