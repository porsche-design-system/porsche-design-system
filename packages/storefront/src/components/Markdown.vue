<template>
  <article @click="onContentClick">
    <slot />
  </article>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Prism from 'prismjs';
  import 'prismjs/components/prism-diff';

  @Component
  export default class Markdown extends Vue {
    updated() {
      this.$el
        .querySelectorAll('pre[class*="diff"], code[class*="diff"]')
        .forEach((diff) => Prism.highlightElement(diff));
    }
    // handling for raw anchor links to prevent full reload and respect base tag
    onContentClick(event: MouseEvent): void {
      const { altKey, ctrlKey, metaKey, shiftKey, target } = event;
      if (metaKey || altKey || ctrlKey || shiftKey) {
        return;
      }
      const href = (target as HTMLElement).getAttribute('href');
      const isDownload = (target as HTMLElement).hasAttribute('download');

      if (href && !href.startsWith('http') && !isDownload) {
        event.preventDefault();
        this.$router.push('/' + href);
      }
    }
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  @import '../styles/internal.variables';

  /* More information about :deep selector can be found here: https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors
* Child div selector is necessary because dynamic component loader vmark is using another <div> as component root element.
*/
  article :deep(> .vmark) {
    .language-diff {
      & > {
        .inserted {
          color: var(--theme-notification-success);
        }

        .deleted {
          color: var(--theme-notification-error);
        }
      }
    }
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
          @include pds-heading-xx-large;
          margin-top: $pds-spacing-fluid-large;
        }

        h2 {
          @include pds-heading-x-large;
          margin-top: $pds-spacing-fluid-large;

          // for anchor links with table of contents
          &[id] {
            p-link-pure {
              visibility: hidden;
              margin-left: $pds-spacing-static-small;
            }

            &:hover {
              p-link-pure {
                visibility: visible;
              }
            }

            &:focus {
              outline: none;
            }
          }
        }

        h3 {
          @include pds-heading-large;
          margin-top: $pds-spacing-fluid-large;
        }

        h4 {
          @include pds-heading-medium;
          margin-top: $pds-spacing-fluid-medium;
        }

        h5,
        h6 {
          @include pds-heading-small;
          margin-top: $pds-spacing-fluid-medium;
        }

        p {
          @include pds-text-small;
          margin-top: $pds-spacing-fluid-small;
        }

        p-inline-notification {
          margin-top: $pds-spacing-fluid-small;
        }

        // Horizontal Rules
        hr {
          margin: {
            top: $pds-spacing-fluid-large;
            bottom: $pds-spacing-static-medium;
          }
          border: 0;
          height: 1px;
          background-color: var(--theme-contrast-low);
        }

        // Emphasis
        b,
        strong {
          font-weight: $pds-font-weight-bold;
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
          padding-left: $pds-spacing-static-medium;
          border-left: 5px solid var(--theme-contrast-low);
        }

        // Lists
        ul,
        ol {
          @include pds-text-small;
          margin-top: $pds-spacing-fluid-medium;
          padding-left: $pds-spacing-static-large;

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

        h3 + ul,
        h3 + ol,
        h4 + ul,
        h4 + ol,
        h5 + ul,
        h5 + ol,
        h6 + ul,
        h6 + ol {
          margin-top: $pds-spacing-fluid-x-small;
        }

        // Code
        code,
        pre {
          @include pds-text-x-small;
          font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
        }

        code.readonly {
          user-select: none;
        }

        :not(pre) > code {
          padding: 2px $pds-spacing-static-small;
          border-radius: $pds-border-radius-small;
          background-color: var(--theme-background-surface);
          color: var(--theme-primary);
        }

        pre {
          margin-top: $pds-spacing-static-small;
          display: block;
          padding: $pds-spacing-static-small $pds-spacing-static-medium;
          word-break: break-all;
          word-wrap: break-word;
          background-color: var(--theme-background-surface);
          color: var(--theme-primary);
          border-radius: $pds-border-radius-medium;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        // Tables
        table {
          margin-top: $pds-spacing-fluid-medium;
          border-collapse: collapse;

          code ~ code::before {
            content: '| ';
          }

          thead {
            @include pds-text-small;
          }

          tbody {
            @include pds-text-small;
          }

          th {
            text-align: left;
            padding-bottom: $pds-spacing-static-small;
            border-bottom: 1px solid var(--theme-contrast-low);
          }

          td {
            text-align: left;
            padding: {
              top: $pds-spacing-static-small;
              bottom: $pds-spacing-static-small;
            }
            border-bottom: 1px solid var(--theme-contrast-low);
            vertical-align: top;
            width: 10%;
          }

          th ~ th,
          td ~ td {
            padding-left: $pds-spacing-static-medium;
          }
        }

        // Links
        a {
          color: inherit;
          @include pds-hover;
          @include pds-focus('none');
        }

        // Media
        img {
          max-width: 100%;
          vertical-align: top;
          border-radius: $pds-border-radius-large;
        }

        // Special
        .playground {
          margin-top: $pds-spacing-static-medium;
        }
      }
    }
  }
</style>
