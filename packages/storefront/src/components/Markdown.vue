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
      const href = (target as HTMLElement).getAttribute('href');
      const isDownload = (target as HTMLElement).hasAttribute('download');

      if (href && !href.startsWith('http') && !href.startsWith('sketch://') && !isDownload) {
        event.preventDefault();
        this.$router.push('/' + href);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/components-js/utilities/scss';
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
          @include pds-heading-large;
          margin-top: 4.5rem;
        }

        h2 {
          @include pds-heading-medium;
          margin-top: 4rem;

          // for anchor links with table of contents
          &[id] {
            p-link-pure {
              visibility: hidden;
              margin-left: $pds-spacing-small;
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
          @include pds-heading-small;
          margin-top: $pds-spacing-x-large;
        }

        h4 {
          @include pds-heading-small;
          margin-top: $pds-spacing-large;
        }

        h5,
        h6 {
          @include pds-heading-x-small;
          margin-top: 1.5rem;
        }

        p {
          @include pds-text-small;
          margin-top: 1.5rem;
        }

        p-inline-notification {
          margin-top: 1.5rem;
        }

        // Horizontal Rules
        hr {
          margin: {
            top: 3.5rem;
            bottom: $pds-spacing-medium;
          }
          border: 0;
          height: 1px;
          background-color: $pds-theme-light-contrast-low;
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
          padding-left: 1.5rem;
          border-left: 0.3125rem solid $pds-theme-light-contrast-low;
        }

        // Lists
        ul,
        ol {
          @include pds-text-small;
          margin-top: 1.5rem;
          padding-left: $pds-spacing-large;

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
          @include pds-text-x-small;
          font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
        }

        code.readonly {
          user-select: none;
        }

        :not(pre) > code {
          padding: 0.125rem $pds-spacing-small;
          background-color: mix($pds-theme-light-brand, $pds-theme-light-background-base, 10%);
          border-radius: 3px;
          color: $pds-theme-light-brand;
        }

        pre {
          margin-top: $pds-spacing-small;
          display: block;
          padding: $pds-spacing-small 1.5rem;
          word-break: break-all;
          word-wrap: break-word;
          background-color: $pds-theme-light-background-surface;
          color: $pds-theme-light-contrast-high;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        // Tables
        table {
          margin-top: 1.5rem;
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
            padding-bottom: $pds-spacing-small;
            border-bottom: 1px solid $pds-theme-light-contrast-low;
          }

          td {
            text-align: left;
            padding: {
              top: $pds-spacing-small;
              bottom: $pds-spacing-small;
            }
            border-bottom: 1px solid $pds-theme-light-contrast-low;
            vertical-align: top;
            width: 10%;
          }

          th ~ th,
          td ~ td {
            padding-left: 1.5rem;
          }
        }

        // Links
        a:not(.p-button):not(.p-link) {
          text-decoration: underline;
          color: $pds-theme-light-base;
          outline: transparent solid 1px;
          outline-offset: 1px;
          transition: color $p-animation-hover-duration $p-animation-hover-bezier;

          &:hover {
            color: $pds-theme-light-state-hover;
          }

          &:focus {
            outline-color: $pds-theme-light-state-focus;
          }
        }

        // Media
        img {
          max-width: 100%;
          vertical-align: top;
        }

        // Special
        .playground {
          margin-top: $pds-spacing-medium;
        }
      }
    }
  }
</style>
