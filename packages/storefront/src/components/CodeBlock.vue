<template>
  <div class="code-block" :class="{ light: theme === 'light', dark: theme === 'dark' }">
    <p-tabs-bar :theme="theme" :active-tab-index="activeTabIndex">
      <button v-for="(frameWork, index) in frameWorks" :key="index" @click="updateFramework(index)">
        {{ frameWork }}
      </button>
    </p-tabs-bar>
    <pre><code v-html="formattedMarkup"></code></pre>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import { highlight, languages } from 'prismjs';
  import 'prismjs/components/prism-jsx';
  import { html } from 'js-beautify';
  import { camelCase, upperFirst } from 'lodash';
  import { Framework, Theme } from '@/models';

  @Component
  export default class CodeBlock extends Vue {
    @Prop({ default: '' }) public markup!: string;
    @Prop({ default: 'light' }) public theme!: Theme;

    frameWorks: { [key in Framework]: string } = {
      'vanilla-js': 'Vanilla JS',
      angular: 'Angular',
      react: 'React'
    };

    public get activeTabIndex(): number {
      return Object.keys(this.frameWorks).indexOf(this.framework);
    }

    public get framework(): Framework {
      return this.$store.getters.selectedFramework;
    }

    get isReact(): boolean {
      return this.framework === 'react';
    }

    get formattedMarkup(): string {
      return this.highlight(this.beautify(this.convert(this.cleanup(this.markup), this.framework)));
    }

    public updateFramework(framework: Framework): void {
      this.$store.commit('setSelectedFramework', framework);
    }

    private convert(markup: string, framework: Framework): string {
      switch (framework) {
        case 'angular':
          return this.convertToAngular(markup);
        case 'react':
          return this.convertToReact(markup);
        default:
          return markup;
      }
    }

    private cleanup(markup: string): string {
      return (
        markup
          // remove default web component attributes
          .replace(/theme="light"/g, '')
          // remove empty comments
          .replace(/<!---->/g, '')
          // remove all attributes added by Vue JS
          .replace(/ data-v-[a-zA-Z0-9]+(=["']{2})?/g, '')
          // remove all class values added by Stencil JS
          .replace(/ class="(.*?)hydrated(.*?)"/g, (m, $1, $2) => {
            if (/\S/.test($1) || /\S/.test($2)) {
              return ' class="' + ($1.trim() + ' ' + $2.trim()).trim() + '"';
            }
            return '';
          })
          // add closing slash to inputs for valid jsx
          .replace(/(<input(?:.[^/]*?))>/g, '$1/>')
          // replace <br> tags with new line
          .replace(/<br[\s/]*>/g, '\n')
          // add line breaks between tags that are not followed by comment
          .replace(/(><)([^!])/g, '>\n<$2')
          // remove line breaks between tags that close immediately
          .replace(/<([\w-]+)(.*)>\n<\/\1>/g, '<$1$2></$1>')
          // remove multiple new lines
          .replace(/\n{3,}/g, '\n\n')
          // clean checked, disabled, readonly and selected attributes
          .replace(/(checked|disabled|readonly|selected)="\1?"/g, '$1')
          // clean various attributes that are set by component code
          .replace(/ (hidden|role|id|tabindex|aria-selected)=".*?"/g, '')
          // clean aria-labelledby attributes that are set by tabs component
          .replace(/ (aria-labelledby)="p-tab-item-\d"/g, '')
      );
    }

    private convertToAngular(markup: string): string {
      return (
        markup
          // transform to event binding syntax
          .replace(/\s(on.+?)="(.*?)"/g, (m, $key, $value) => {
            return ` (${$key.substring(2)})="${$value}"`;
          })
          // transform all keys of object values to camel case and surround them in brackets
          .replace(/\s(\S+)="{(.*?)}"/g, (m, $key, $value) => {
            return ` [${camelCase($key)}]="{${$value}}"`;
          })
          // transform all other keys to camel case, surround them in brackets and surround all values with ''
          .replace(/\s(\S*[a-z-]+)="(\D\w.*?)"/g, (m, $key, $value) => {
            return ` [${camelCase($key)}]="'${$value}'"`;
          })
          // transform all keys to camel case which have digits as a value
          .replace(/\s(\S*[a-z-]+)="(\d.*?)"/g, (m, $key, $value) => {
            return ` [${camelCase($key)}]="${$value}"`;
          })
          // remove single quotes from boolean values
          .replace(/\s\[(\S+)]="'(true|false)'"/g, (m, $key, $value) => {
            return ` [${camelCase($key)}]="${$value}"`;
          })
          // remove brackets from "class" attributes
          .replace(/\s\[class]="'(.*?)'"/g, (m, $value) => {
            return ` class="${$value}"`;
          })
          // remove brackets from "slot" attributes
          .replace(/\s\[slot]="'(.*?)'"/g, (m, $value) => {
            return ` slot="${$value}"`;
          })
      );
    }

    private convertToReact(markup: string): string {
      return (
        markup
          // remove quotes from object values but add double brackets and camelCase
          .replace(/\s(\S+)="{(.*?)}"/g, (m, $key, $value) => {
            return ` ${camelCase($key)}={{${$value}}}`;
          })
          // transform all standard attributes to camel case
          .replace(/\s(\S+)="(.*?)"/g, (m, $key, $value) => {
            return ` ${camelCase($key)}="${$value}"`;
          })
          // transform class attribute to JSX compatible one
          .replace(/\sclass="(.*?)"/g, (m, $value) => {
            return ` className="${$value}"`;
          })
          // transform to camelCase event binding syntax
          .replace(/\s(on.+?)="(.*?)"/g, (m, $key, $value) => {
            return ` on${upperFirst($key.substring(2))}={() => {${$value}}}`;
          })
          // transform boolean and number
          .replace(/\s(\S+)="(true|false|\d)"/g, (m, $key, $value) => {
            return ` ${$key}={${$value}}`;
          })
          // transform all keys to camel case which have digits as a value
          .replace(/\s(\S+)={"(\d.*?)"}/g, (m, $key, $value) => {
            return ` ${$key}={${$value}}`;
          })
          // transform custom element opening tags to pascal case
          .replace(/<(p-[\w-]+)(.*?)>/g, (m, $tag, $attributes) => {
            return `<${upperFirst(camelCase($tag))}${$attributes}>`;
          })
          // transform custom element closing tags to pascal case
          .replace(/<\/(p-[\w-]+)>/g, (m, $tag) => {
            return `</${upperFirst(camelCase($tag))}>`;
          })
      );
    }

    private beautify(markup: string): string {
      return html(markup, { indent_size: 2 });
    }

    private highlight(markup: string): string {
      return highlight(markup, languages[this.isReact ? 'jsx' : 'markup'], this.isReact ? 'language-jsx' : 'markup');
    }
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';
  @import '../styles/internal.variables';

  .code-block {
    &.light {
      code,
      pre {
        color: $p-color-theme-light-default;
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

    &.dark {
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
    margin-top: $p-spacing-16;

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
