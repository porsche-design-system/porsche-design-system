<template>
  <div class="code-block" :class="{'light': (theme === 'light'), 'dark': (theme === 'dark')}">
    <ul>
      <li :class="{'is-active': isVanillaJS}" @click="updateFramework('vanilla-js')">Vanilla JS</li>
      <li :class="{'is-active': isAngular}" @click="updateFramework('angular')">Angular</li>
      <li :class="{'is-active': isReact}" @click="updateFramework('react')">React</li>
    </ul>
    <pre><code v-html="formattedMarkup"></code></pre>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import Prism from 'prismjs';
  import {html} from 'js-beautify';

  type Framework = 'vanilla-js' | 'angular' | 'react';
  type Theme = 'light' | 'dark';

  @Component
  export default class CodeBlock extends Vue {

    @Prop({default: ''}) public markup!: string;
    @Prop({default: 'light'}) public theme!: Theme;

    private framework: Framework = 'vanilla-js';

    public get isVanillaJS(): boolean {
      return this.framework === 'vanilla-js';
    }

    public get isAngular(): boolean {
      return this.framework === 'angular';
    }

    public get isReact(): boolean {
      return this.framework === 'react';
    }

    public get formattedMarkup(): string {
      return this.highlight(this.beautify(this.convert(this.removeAttr(this.markup), this.framework)));
    }

    public updateFramework(framework: Framework): void {
      this.framework = framework;
    }

    private convert(markup: string, framework: Framework): string {
      switch (framework) {
        case 'vanilla-js':
          return markup;
        case 'angular':
          return this.framework;
        case 'react':
          return this.framework;
        default:
          return markup;
      }
    }

    private removeAttr(markup: string): string {
      return (
        markup
          .replace(/data-v-[a-zA-Z0-9]+=""/g, '')
          .replace(/class="hydrated"/g, '')
      );
    }

    private beautify(markup: string): string {
      return html(markup, {indent_size: 2});
    }

    private highlight(markup: string): string {
      return Prism.highlight(markup, Prism.languages.markup, 'markup');
    }
  }
</script>

<style scoped lang="scss">
  @import '~@porscheui/ui-kit-js/src/styles/utility/index';

  .code-block {
    padding: $p-spacing-32;
    border: 1px solid transparent;
    border-top: 0;

    &.light {
      border-color: $p-color-neutral-grey-2;
      background: $p-color-porsche-light;

      ul {
        color: $p-color-porsche-black;
      }

      code,
      pre {
        color: $p-color-porsche-black;
        text-shadow: 0 1px rgba(255, 255, 255, .3);
      }

      pre {
        border-color: $p-color-neutral-grey-6;

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

          .namespace {
            opacity: .7;
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
          .language-css .token.string,
          .toke.variable,
          .token.inserted {
            color: yellowgreen;
          }

          .token.atrule,
          .token.attr-value,
          .token.keyword {
            color: deeppink;
          }

          .token.regex,
          .token.important {
            color: orange;
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

          .token.deleted {
            color: red;
          }
        }
      }
    }

    &.dark {
      border-color: $p-color-surface-dark;
      background: $p-color-surface-dark;

      ul {
        color: $p-color-porsche-light;
      }

      code,
      pre {
        color: $p-color-porsche-light;
        text-shadow: 0 1px rgba(0, 0, 0, .3);
      }

      pre {
        border-color: $p-color-neutral-grey-3;

        code ::v-deep {
          .token.comment,
          .token.prolog,
          .token.doctype,
          .token.cdata {
            color: slategray;
          }

          .token.punctuation {
            color: #f8f8f2;
          }

          .namespace {
            opacity: .7;
          }

          .token.property,
          .token.tag,
          .token.constant,
          .token.symbol,
          .token.deleted {
            color: #f92672;
          }

          .token.boolean,
          .token.number {
            color: #ae81ff;
          }

          .token.selector,
          .token.attr-name,
          .token.string,
          .token.char,
          .token.builtin,
          .token.inserted {
            color: #a6e22e;
          }

          .token.operator,
          .token.entity,
          .token.url,
          .language-css .token.string,
          .style .token.string,
          .token.variable {
            color: #f8f8f2;
          }

          .token.atrule,
          .token.attr-value,
          .token.function,
          .token.class-name {
            color: #e6db74;
          }

          .token.keyword {
            color: #66d9ef;
          }

          .token.regex,
          .token.important {
            color: #fd971f;
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
    }
  }

  ul {
    @include p-text-copy;
    list-style: none;
    display: flex;

    li {
      cursor: pointer;

      &:hover {
        color: $p-color-porsche-red;
      }

      &.is-active {
        cursor: default;
        color: $p-color-porsche-red;
      }

      &:not(:last-child) {
        margin-right: $p-spacing-16;
      }
    }
  }

  code,
  pre {
    background: transparent;
    font-family: Monaco, Menlo, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: .875rem;
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
    border-top: 1px solid transparent;
    margin-top: $p-spacing-16;
    padding-top: $p-spacing-16;
    overflow: auto;
  }
</style>
