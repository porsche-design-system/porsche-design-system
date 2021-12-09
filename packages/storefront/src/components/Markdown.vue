<template>
  <div class="markdown" @click="onContentClick">
    <slot />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Markdown extends Vue {
    // handling for raw anchor links to prevent full reload and respect base tag
    onContentClick(event: MouseEvent): void {
      const { altKey, ctrlKey, metaKey, shiftKey, target } = event;
      if (metaKey || altKey || ctrlKey || shiftKey) {
        return;
      }
      const href = (target as HTMLElement).getAttribute('href') || '';
      const isDownload = (target as HTMLElement).hasAttribute('download');

      if (href && !href.startsWith('http') && !href.startsWith('sketch://') && !isDownload) {
        event.preventDefault();
        this.$router.push('/' + href);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';
  @import '../styles/internal.variables';

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
          @include p-headline-4;
          margin-top: $p-spacing-32;
        }

        h5,
        h6 {
          @include p-headline-5;
          margin-top: $p-spacing-24;
        }

        p {
          @include p-text-small;
          margin-top: $p-spacing-24;
        }

        p-inline-notification {
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
          background-color: $p-color-neutral-contrast-low;
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
          border-left: p-px-to-rem(5px) solid $p-color-neutral-contrast-low;
        }

        // Lists
        ul,
        ol {
          @include p-text-small;
          margin-top: $p-spacing-24;
          padding-left: $p-spacing-32;

          ul,
          ol {
            margin-top: 0;
          }
        }

        ul {
          list-style-type: square;
        }

        ol {
          list-style-type: decimal;
        }

        // Code
        code,
        pre {
          @include p-text-x-small;
          font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
        }

        code.readonly {
          user-select: none;
        }

        :not(pre) > code {
          padding: 0.125rem $p-spacing-8;
          background-color: mix($p-color-brand, $p-color-background-default, 10%);
          border-radius: 3px;
          color: $p-color-brand;
        }

        pre {
          margin-top: $p-spacing-8;
          display: block;
          padding: $p-spacing-8 $p-spacing-24;
          word-break: break-all;
          word-wrap: break-word;
          background-color: $p-color-background-surface;
          color: $p-color-neutral-contrast-high;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        // Tables
        table {
          margin-top: $p-spacing-24;
          border-collapse: collapse;

          code ~ code::before {
            content: '| ';
          }

          thead {
            @include p-text-small;
          }

          tbody {
            @include p-text-small;
          }

          th {
            text-align: left;
            padding-bottom: $p-spacing-8;
            border-bottom: 1px solid $p-color-neutral-contrast-low;
          }

          td {
            text-align: left;
            padding: {
              top: $p-spacing-8;
              bottom: $p-spacing-8;
            }
            border-bottom: 1px solid $p-color-neutral-contrast-low;
            vertical-align: top;
            width: 10%;
          }

          th ~ th,
          td ~ td {
            padding-left: $p-spacing-24;
          }
        }

        // Links
        a:not(.p-button):not(.p-link) {
          text-decoration: underline;
          color: $p-color-default;
          outline: transparent solid 1px;
          outline-offset: 1px;
          transition: color $p-animation-hover-duration $p-animation-hover-bezier;

          &:hover {
            color: $p-color-state-hover;
          }

          &:focus {
            outline-color: $p-color-state-focus;
          }
        }

        // Media
        img {
          max-width: 100%;
          vertical-align: top;
        }

        // Special
        .playground {
          margin-top: $p-spacing-16;
        }
      }
    }
  }
</style>
