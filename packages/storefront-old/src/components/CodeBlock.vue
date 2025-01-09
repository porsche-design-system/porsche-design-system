<template>
  <div class="code-block" :class="`code-block--${theme} code-block--${backgroundColor}`">
    <p-tabs-bar v-if="Object.keys(usedFrameworks).length > 1" :theme="theme" :active-tab-index="activeTabIndex">
      <!-- prettier-ignore -->
      <button type="button" v-for="(framework, index) in usedFrameworks" :key="index" @click="setFramework(index)">{{ framework }}</button>
    </p-tabs-bar>
    <pre dir="ltr" tabindex="0"><code v-html="highlightedMarkup"></code></pre>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import type { BackgroundColor, Framework, FrameworkMarkup, PlaygroundTheme } from '@/models';
import { convertMarkup, getHighlightedCode } from '@/utils';
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

  get highlightedMarkup(): string {
    const markup = this.convertMarkup ? convertMarkup(this.markup, this.framework) : this.markup;
    return getHighlightedCode(markup, this.framework);
  }
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  @use '../styles/internal.variables' as *;

  .code-block {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: $pds-spacing-static-medium;

    &--light,
    &--auto {
      --code-block-color: #{$pds-theme-light-primary};
      --code-block-background: #{$pds-theme-light-background-base};
      --code-block-token-comment: #696969;
      --code-block-token-punctuation: #545454;
      --code-block-token-property: #007299;
      --code-block-token-boolean: #008000;
      --code-block-token-selector: #aa5d00;
      --code-block-token-operator: #008000;
      --code-block-token-atrule: #418340;
      --code-block-token-keyword: #d91e18;
      --code-block-token-regex: #d91e18;

      &.code-block--background-surface {
        --code-block-background: #{$pds-theme-light-background-surface};
        --code-block-token-selector: #7e4603; // TODO: we should try to find a color which works on base and surface color at the same time
        --code-block-token-atrule: #30612f; // TODO: we should try to find a color which works on base and surface color at the same time
      }
    }

    &--dark {
      --code-block-color: #{$pds-theme-dark-primary};
      --code-block-background: #{$pds-theme-dark-background-base};
      --code-block-token-comment: #d4d0ab;
      --code-block-token-punctuation: #fefefe;
      --code-block-token-property: #ffa07a;
      --code-block-token-boolean: #00e0e0;
      --code-block-token-selector: #abe338;
      --code-block-token-operator: #00e0e0;
      --code-block-token-atrule: #ffd700;
      --code-block-token-keyword: #00e0e0;
      --code-block-token-regex: #ffd700;
      --code-block-token-selector-surface: #abe338;
      --code-block-token-selector-atrule: #ffd700;

      &.code-block--background-surface {
        --code-block-background: #{$pds-theme-dark-background-surface};
      }
    }

    &--auto {
      @media (prefers-color-scheme: dark) {
        --code-block-color: #{$pds-theme-dark-primary};
        --code-block-background: #{$pds-theme-dark-background-base};
        --code-block-token-comment: #d4d0ab;
        --code-block-token-punctuation: #fefefe;
        --code-block-token-property: #ffa07a;
        --code-block-token-boolean: #00e0e0;
        --code-block-token-selector: #abe338 !important;
        --code-block-token-operator: #00e0e0;
        --code-block-token-atrule: #ffd700 !important;
        --code-block-token-keyword: #00e0e0;
        --code-block-token-regex: #ffd700;
        --code-block-token-selector-surface: #abe338;
        --code-block-token-selector-atrule: #ffd700;

        &.code-block--background-surface {
          --code-block-background: #{$pds-theme-dark-background-surface};
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
      color: var(--code-block-color);
    }

    pre {
      @include pds-focus('small', 1px);
      & {
        max-height: 20rem;
        overflow: auto;
        background: var(--code-block-background); // to ensure scrollbar coloring is optimal for any theme
      }

      :deep(code) {
        // source: https://github.com/ericwbailey/a11y-syntax-highlighting/blob/main/dist/prism/a11y-light.css#L52-L107

        .token.important,
        .token.bold {
          font-weight: bold;
        }

        .token.italic {
          font-style: italic;
        }

        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: var(--code-block-token-comment);
        }

        .token.punctuation {
          color: var(--code-block-token-punctuation);
        }

        .token.property,
        .token.tag,
        .token.constant,
        .token.symbol,
        .token.deleted {
          color: var(--code-block-token-property);
        }

        .token.boolean,
        .token.number {
          color: var(--code-block-token-boolean);
        }

        .token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted {
          color: var(--code-block-token-selector);
        }

        .token.operator,
        .token.entity,
        .token.url,
        .language-css .token.string,
        .style .token.string,
        .token.variable {
          color: var(--code-block-token-operator);
        }

        .token.atrule,
        .token.attr-value,
        .token.function {
          color: var(--code-block-token-atrule); // NOTE: this is custom and not from the theme
        }

        .token.keyword {
          color: var(--code-block-token-keyword);
        }

        .token.regex,
        .token.important {
          color: var(--code-block-token-regex);
        }
      }
    }
  }
</style>
