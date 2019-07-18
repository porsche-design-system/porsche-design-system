<template>
  <pre><code v-html="formattedMarkup"></code></pre>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import Prism from 'prismjs';
  import {html} from 'js-beautify';

  @Component
  export default class CodeBlock extends Vue {

    @Prop({ default: '' }) public markup!: string;

    public get formattedMarkup(): string {
      return this.highlight(this.beautify(this.removeAttr(this.markup)));
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

  code,
  pre {
    background: transparent;
    font-family: Monaco, Menlo, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: .875rem;
    line-height: 1.5;
    color: #f8f8f2;
    tab-size: 2;
    text-shadow: 0 1px rgba(0, 0, 0, .3);
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    hyphens: none;
  }

  pre {
    padding: $p-spacing-32;
    overflow: auto;
    background: $p-color-surface-dark;
  }

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
</style>
