<template>
  <div>
    <div style="display: flex; justify-content: space-between; margin: 0 0 1rem">
      <div>🚫 = deprecated<br />🛠 = breakpointCustomizable</div>
      <p-switch :theme="storefrontTheme" @update="toggleProps" :checked="isToggled">Show all prop values</p-switch>
    </div>

    <p-table :theme="storefrontTheme">
      <p-table-head>
        <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
        <p-table-head-row v-html="headRow"></p-table-head-row>
      </p-table-head>
      <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
      <p-table-body ref="body" @click="onClick" v-html="body"></p-table-body>
    </p-table>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
  import type { TagName } from '@porsche-design-system/shared';
  import { getComponentMeta } from '@porsche-design-system/component-meta';
  import type { ComponentMeta } from '@porsche-design-system/component-meta';
  import { type StorefrontTheme } from '@/models';

  const tagNames = TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x));

  @Component
  export default class ComponentMetaOverview extends Vue {
    public get storefrontTheme(): StorefrontTheme {
      return this.$store.getters.storefrontTheme;
    }

    get headRow(): string {
      return ['', ...tagNames]
        .map((tagName) => {
          const { isDeprecated } = getComponentMeta(tagName as TagName) || {};
          return `<p-table-head-cell>${tagName}${isDeprecated ? ' 🚫' : ''}</p-table-head-cell>`;
        })
        .join('');
    }

    get body(): string {
      const rowKeys: (keyof ComponentMeta)[] = [
        'isDelegatingFocus',
        'isThemeable',
        'props',
        'requiredProps',
        'eventNames',
        'namedSlots',
        'nestedComponents',
      ];

      const content = rowKeys
        .map((key) => {
          const cells = tagNames
            .map((tagName) => {
              const meta = getComponentMeta(tagName);
              let value = meta[key];

              if (value && (key === 'props' || key === 'eventNames')) {
                const {
                  deprecatedProps = [],
                  deprecatedEventNames = [],
                  breakpointCustomizableProps = [],
                  allowedPropValues = {},
                  deprecatedPropValues = {},
                } = meta;

                if (key === 'props') {
                  value = Object.keys(value);
                  value = value.map((val) => {
                    let allowedValues = allowedPropValues[val] as string;
                    if (Array.isArray(allowedValues)) {
                      // props that support certain values validated with oneOf
                      const deprecatedValues = deprecatedPropValues[val];
                      allowedValues = allowedValues
                        .map((x) => (x === null ? 'undefined' : x))
                        .map((x) => (deprecatedValues?.includes(x) ? x + ' 🚫' : x))
                        .map((x) => `– ${x}`)
                        .join('<br>');
                    } else if (typeof allowedValues === 'object') {
                      // props that take objects like aria, intl and sort
                      allowedValues = Object.entries(allowedValues)
                        .map(([key, val]) => {
                          // nested scenario like in p-table-head-cell
                          if (Array.isArray(val)) {
                            val = val.map((v) => (v === null ? 'undefined' : v)).join(' | ');
                          }
                          return `- ${key}: ${val}`;
                        })
                        .join('<br>');
                    } else {
                      // just string, boolean or number
                      allowedValues = `- ${allowedValues}`;
                    }

                    const propFlags = [
                      deprecatedProps.includes(val) && ' 🚫',
                      breakpointCustomizableProps.includes(val) && ' 🛠️',
                    ]
                      .filter((x) => x)
                      .join('');
                    return (
                      `<span class="prop">${val}${propFlags}</span>` +
                      (allowedValues ? `<div style="display: none;">${allowedValues}</div>` : '')
                    );
                  });
                } else if (key === 'eventNames') {
                  value = (value as string[]).map((val) => val + (deprecatedEventNames.includes(val) ? ' 🚫' : ''));
                }
              }

              let cellContent = value
                ? Array.isArray(value)
                  ? value
                      .sort()
                      .map((val) => (key === 'nestedComponents' ? val : `<code>${val}</code>`))
                      .join('<br>')
                  : value
                : '';
              cellContent = cellContent === true ? '✅' : cellContent;

              return `<p-table-cell>${cellContent}</p-table-cell>`;
            })
            .join('');

          return `<p-table-row>
    <p-table-cell>${key}</p-table-cell>
    ${cells}
  </p-table-row>`;
        })
        .join('');

      return content;
    }

    onClick({ target }: Event & { target: HTMLElement & { nextSibling: HTMLElement } }) {
      if (target.classList.value === 'prop') {
        target.nextSibling.style.display = target.nextSibling.style.display === 'block' ? 'none' : 'block';
      }
    }

    isToggled = false;
    toggleProps({ detail: { checked } }: CustomEvent) {
      this.isToggled = checked;
      (this.$refs.body as HTMLElement).querySelectorAll('.prop + div').forEach((el) => {
        (el as HTMLElement).style.display = checked ? 'block' : 'none';
      });
    }
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  p-table {
    max-width: none !important;
  }

  :deep(p-table-cell) {
    vertical-align: top;
  }

  /* TODO: align appearance with other code blocks */
  :deep(code) {
    display: inline-block;
    @include pds-text-x-small;
    font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
    padding: 2px $pds-spacing-static-small;
    border-radius: $pds-border-radius-small;
    background-color: var(--theme-custom-background-code);

    &:not(:first-child) {
      margin: $pds-spacing-static-small 0 0;
    }
  }

  :deep(.prop) {
    cursor: pointer;

    &:hover {
      color: var(--theme-contrast-medium);
    }
  }
</style>
