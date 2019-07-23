<template>
  <div class="code-block" :class="{'light': (theme === 'light'), 'dark': (theme === 'dark')}">
    <ul class="tabs">
      <li>
        <button type="button" :class="{'is-active': isVanillaJS}" @click="updateFramework('vanilla-js')">Vanilla JS</button>
      </li>
      <li>
        <button type="button" :class="{'is-active': isAngular}" @click="updateFramework('angular')">Angular</button>
      </li>
      <li>
        <button type="button" :class="{'is-active': isReact}" @click="updateFramework('react')">React</button>
      </li>
    </ul>
    <pre><code v-html="formattedMarkup"></code></pre>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import Prism from 'prismjs';
  import {html} from 'js-beautify';
  import {camelCase, upperFirst} from 'lodash';

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
          return this.convertToAngular(markup);
        case 'react':
          return this.convertToReact(markup);
        default:
          return markup;
      }
    }

    private convertToAngular(markup: string): string {
      return (
        markup
        // transform all attributes to camel case
          .replace(/(\S+)=["'](.*?)["']/g, (m, $1, $2) => {
            return camelCase($1) + '="' + $2 + '"';
          })
      );
    }

    private convertToReact(markup: string): string {
      return (
        markup
          // transform all attributes to camel case
          .replace(/(\S+)=["'](.*?)["']/g, (m, $1, $2) => {
            return camelCase($1) + '="' + $2 + '"';
          })
          // remove quotes from object values
          .replace(/=['"]{(.*?)}['"]/g, (m, $1) => {
            return '={' + $1 + '}';
          })
          // transform class attribute to JSX compatible one
          .replace(/class=["'](.*?)["']/g, (m, $1) => {
            return 'className="' + $1 + '"';
          })
          // transform custom element opening tags to pascal case
          .replace(/<(p-[\w-]+)(.*?)>/g, (m, $1, $2) => {
            return '<' + upperFirst(camelCase($1)) + '' + $2 + '>';
          })
          // transform custom element closing tags to pascal case
          .replace(/<\/(p-[\w-]+)>/g, (m, $1) => {
            return '</' + upperFirst(camelCase($1)) + '>';
          })
      );
    }

    private removeAttr(markup: string): string {
      return (
        markup
        // remove all attributes added by Vue JS
          .replace(/data-v-[a-zA-Z0-9]+(=["']{1}["']{1})?/g, '')
          // remove all class values added by Stencil JS
          .replace(/class=["'](.*?)hydrated(.*?)["']/g, (m, $1, $2) => {
            if (/\S/.test($1) || /\S/.test($2)) {
              return 'class="' + ($1.trim() + ' ' + $2.trim()).trim() + '"';
            }
            return '';
          })
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

      ul.tabs {
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

    &.dark {
      border-color: $p-color-surface-dark;
      background: $p-color-surface-dark;

      ul.tabs {
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

  ul.tabs {
    @include p-text-copy;
    list-style: none;
    display: flex;

    li {
      &:not(:last-child) {
        margin-right: $p-spacing-16;
      }
    }

    button {
      cursor: pointer;
      border: none;
      font: inherit;
      color: inherit;
      background-color: transparent;
      transition: color $p-animation-hover-duration $p-animation-hover-bezier;

      &:hover {
        color: $p-color-porsche-red;
      }

      &:focus {
        outline: 1px solid $p-color-state-focus;
        outline-offset: 4px;
      }

      &.is-active {
        cursor: default;
        color: $p-color-porsche-red;
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
    max-height: 20rem;
    overflow: auto;
    margin-top: $p-spacing-16;
    padding-top: $p-spacing-16;
    border-top: 1px solid transparent;

    code ::v-deep {
      .namespace {
        opacity: .7;
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
