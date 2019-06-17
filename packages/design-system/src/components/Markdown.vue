<template>
  <div class="markdown">
    <slot/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class Markdown extends Vue {}
</script>

<style scoped lang="scss">
  @import "~@porscheui/ui-kit-js/src/styles/utility/index";
  @import "~@porscheui/ui-kit-js/src/components/basic/typography/headline/headline.scss";
  @import "~@porscheui/ui-kit-js/src/components/basic/typography/text/text.scss";

  /* More information about ::v-deep selector can be found here: https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors
   * Child div selector is necessary because dynamic component loader vmark is using another <div> as component root element.
   */
  .markdown ::v-deep > .vmark {

    &:first-child > {
      :first-child {
        margin-top: 0 !important;
      }
    }

    &:last-child > {
      :last-child {
        margin-bottom: 0 !important;
      }
    }

    /* Child selectors for h1, h2, h3, etc. and in all possible nested combinations of themselves are necessary to be sure no style
     * is getting applied to our <playground> component or anything that is rendered within a <div> inside this component. Imagine
     * the usage of an <a> tag inside <h1> or <ul>/<li> where the style should be applied but not for `playground > a` or `div > a`.
     */
    & > {
      @at-root #{&},
      & h1,
      & h2,
      & h3,
      & h4,
      & h5,
      & h6,
      & p,
      & blockquote,
      & ul,
      & ol,
      & table,
      & hr,
      & b,
      & strong,
      & i,
      & em,
      & s,
      & strike,
      & del,
      & a,
      & img,
      & code,
      & pre {
        :not(div):not(pre):not(hr):not(table):not(img) {
          max-width: 800px;
        }

        // Typography
        h1 {
          @include p-headline-2;
          margin-top: $p-spacing-72;
        }

        h2 {
          @include p-headline-3;
          margin-top: $p-spacing-64;
        }

        h3 {
          @include p-headline-4;
          margin-top: $p-spacing-48;
        }

        h4 {
          @include p-headline-5;
          margin-top: $p-spacing-32;
        }

        h5,
        h6 {
          @include p-headline-5;
          margin-top: $p-spacing-24;
        }

        p {
          @include p-text-copy;
          margin-top: $p-spacing-24;
        }

        // Horizontal Rules
        hr {
          margin: {
            top: $p-spacing-56;
            bottom: $p-spacing-16;
          }
          border: 0;
          height: 1px;
          background-color: $p-color-neutral-grey-2;
        }

        // Emphasis
        b,
        strong {
          font-weight: $p-font-weight-bold;
        }

        i,
        em {
          font-style: italic;
        }

        s,
        strike,
        del {
          text-decoration: line-through;
        }

        // Blockquote
        blockquote {
          padding-left: $p-spacing-24;
          border-left: rem(5px) solid $p-color-neutral-grey-2;
        }

        // Lists
        ul,
        ol {
          @include p-text-copy;
          margin-top: $p-spacing-24;
          padding-left: $p-spacing-32;
          list-style-type: square;

          ul,
          ol {
            margin-top: 0;
          }
        }

        // Code
        code,
        pre {
          @include p-text-small;
          font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
        }

        :not(pre) > code {
          padding: 0.125rem $p-spacing-8;
          background-color: mix($p-color-porsche-red, $p-color-porsche-light, 10%);
          border-radius: 3px;
          color: $p-color-porsche-red;
        }

        pre {
          margin-top: $p-spacing-8;
          display: block;
          padding: $p-spacing-8 $p-spacing-24;
          word-break: break-all;
          word-wrap: break-word;
          background-color: $p-color-surface-light;
          color: $p-color-neutral-grey-7;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        // Tables
        table {
          margin-top: $p-spacing-24;
          width: 80%;
          text-align: left;
          border-collapse: collapse;

          thead {
            @include p-text-copy;
          }

          tbody {
            @include p-text-copy;
          }

          th {
            padding-bottom: $p-spacing-8;
            border-bottom: 1px solid $p-color-neutral-grey-1;
          }

          td {
            padding: {
              top: $p-spacing-8;
              bottom: $p-spacing-8;
            }
            border-bottom: 1px solid $p-color-neutral-grey-1;
            vertical-align: top;
            width: 10%;
          }

          th ~ th,
          td ~ td {
            padding-left: $p-spacing-24;
          }
        }

        // Links
        a {
          text-decoration: underline;
          color: $p-color-porsche-black;
          transition: color $p-animation-hover-duration $p-animation-hover-bezier;

          &:hover {
            text-decoration: none;
            color: $p-color-porsche-red;
          }
        }

        // Media
        img {
          max-width: 100%;
          vertical-align: top;
        }
      }
    }
  }
</style>
