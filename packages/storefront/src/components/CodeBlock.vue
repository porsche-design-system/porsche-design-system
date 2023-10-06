<template>
  <div class="code-block" :class="`code-block--${theme} code-block--${backgroundColor}`">
    <p-tabs-bar v-if="Object.keys(usedFrameworks).length > 1" :theme="theme" :active-tab-index="activeTabIndex">
      <!-- prettier-ignore -->
      <button type="button" v-for="(framework, index) in usedFrameworks" :key="index" @click="setFramework(index)">{{ framework }}</button>
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
  import type { BackgroundColor, Framework, FrameworkMarkup, PlaygroundTheme } from '@/models';
  import { convertMarkup, getHighlightedCode, getHighlightedLanguage } from '@/utils';
  import { frameworkNameMap } from '@/utils/frameworkNameMap';

  @Component
  export default class CodeBlock extends Vue {
    @Prop({ default: '' }) public markup!: string;
    @Prop({ default: 'light' }) public theme!: PlaygroundTheme;
    @Prop({ default: 'background-base' }) public backgroundColor!: BackgroundColor;
    @Prop({ default: false }) public convertMarkup!: boolean;
    @Prop({ default: () => ['vanilla-js', 'angular', 'react', 'vue'] }) public frameworks!: Framework[];

    frameworkBeforeShared = this.framework;

    private destroyed(): void {
      // reset framework to what is was before selecting "shared" since that one is usually not available
      if (this.framework === 'shared') {
        this.$store.commit('setSelectedFramework', this.frameworkBeforeShared);
      }
    }

    public get usedFrameworks(): FrameworkMarkup {
      return this.frameworks.reduce((prev, key) => {
        prev[key as Framework] = frameworkNameMap[key as Framework];
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
      const markup = this.convertMarkup ? convertMarkup(this.markup, this.framework) : this.markup;
      return getHighlightedCode(markup, this.framework);
    }
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  @import '../styles/internal.variables';

  .code-block {
    &--light {
      code,
      pre {
        color: $pds-theme-light-primary;
      }

      pre {
        background: $pds-theme-light-background-base; // to ensure scrollbar coloring is optimal for theme light

        :deep(code) {
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

      // the following are all custom based on above values
      // extracted from chrome dev tools contrast utility
      &.code-block--background-surface {
        pre {
          background: $pds-theme-light-background-surface; // to ensure scrollbar coloring is optimal for theme light

          :deep(code) {
            .token.selector,
            .token.attr-name,
            .token.string,
            .token.char,
            .token.builtin,
            .token.inserted {
              color: #7e4603;
            }

            .token.atrule,
            .token.attr-value,
            .token.function {
              color: #30612f;
            }
          }
        }
      }
    }

    &--dark {
      code,
      pre {
        color: $pds-theme-dark-primary;
      }

      pre {
        background: $pds-theme-dark-background-base; // to ensure scrollbar coloring is optimal for theme dark

        :deep(code) {
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

      &.code-block--background-surface {
        pre {
          background: $pds-theme-dark-background-surface; // to ensure scrollbar coloring is optimal for theme dark
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
    &:not(:first-child) {
      margin-top: $pds-spacing-static-medium;
    }
    @include pds-focus('small', 1px);

    :deep(code) {
      .token.important,
      .token.bold {
        font-weight: bold;
      }

      .token.italic {
        font-style: italic;
      }
    }
  }
</style>
