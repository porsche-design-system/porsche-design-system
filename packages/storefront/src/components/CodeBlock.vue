<template>
  <div class="code-block" :class="`code-block--${theme}`">
    <p-tabs-bar :theme="theme" :active-tab-index="activeTabIndex">
      <button type="button" v-for="(frameWork, index) in frameWorks" :key="index" @click="updateFramework(index)">
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
  import 'prismjs/components/prism-markup';
  import { camelCase, pascalCase } from 'change-case';
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
      return this.highlight(this.convert(this.markup));
    }

    public updateFramework(framework: Framework): void {
      this.$store.commit('setSelectedFramework', framework);
    }

    private convert(markup: string): string {
      markup = this.cleanup(markup);
      switch (this.framework) {
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
          // replace <br> tags with new line
          .replace(/<br[\s/]*>/g, '\n')
          // remove multiple new lines
          .replace(/\n{3,}/g, '\n\n')
      );
    }

    private convertToAngular(markup: string): string {
      return (
        markup
          // transform to event binding syntax
          .replace(/\son(.+?)="(.*?)"/g, (m, $key, $value) => {
            return ` (${$key})="${$value}"`;
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
        // // remove single quotes from boolean values
        // .replace(/\s\[(\S+)]="'(true|false)'"/g, (m, $key, $value) => {
        //   return ` [${camelCase($key)}]="${$value}"`;
        // })
        // // remove brackets from "class" attributes
        // .replace(/\s\[class]="'(.*?)'"/g, (m, $value) => {
        //   return ` class="${$value}"`;
        // })
        // // remove brackets from "slot" attributes
        // .replace(/\s\[slot]="'(.*?)'"/g, (m, $value) => {
        //   return ` slot="${$value}"`;
        // })
      );
    }

    private convertToReact(markup: string): string {
      return (
        markup
          // remove quotes from object values but add double brackets and camelCase
          .replace(/\s(\S+)="({.*?})"/g, (m, $key, $value) => {
            return ` ${camelCase($key)}={${$value}}`;
          })
          // transform all standard attributes to camel case
          .replace(/\s(\S+)="(.*?)"/g, (m, $key, $value) => {
            return ` ${camelCase($key)}="${$value}"`;
          })
          // transform class attribute to JSX compatible one
          .replace(/\sclass="(.*?)"/g, ' className="$1"')
          // transform to camelCase event binding syntax
          .replace(/\son(.+?)="(.*?)"/g, (m, $key, $value) => {
            return ` on${pascalCase($key)}={() => ${$value}}`;
          })
          // transform boolean and number
          .replace(/\s(\S+)="(true|false|\d)"/g, ' $1={$2}')
          // // transform all keys to camel case which have digits as a value
          // .replace(/\s(\S+)={"(\d.*?)"}/g, ' $1={$2}')
          // transform custom element tags to pascal case
          .replace(/<(\/?)(p-[\w-]+)(.*?)>/g, (m, $slash, $tag, $attributes) => {
            return `<${$slash}${pascalCase($tag)}${$attributes}>`;
          })
          // transform style attributes
          .replace(
            /style="(.*?)"/g,
            (m, $style: string) =>
              // TODO: camelCase for keys, remove px from px values, quotes around non px values
              `style={{ ${$style
                .replace(/;/g, ',') // transform semi colons to comma
                .replace(/,$/g, '')} }}` // remove last comma
          )
      );
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
