<template>
  <div>
    <div style="display: flex; justify-content: space-between; margin: 0 0 1rem">
      <div>🛠 = breakpointCustomizable<br />🚫 = deprecated<br />🧪 = experimental</div>
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
          const { isDeprecated, isExperimental } = getComponentMeta(tagName as TagName) || {};
          return `<p-table-head-cell>${tagName}${isDeprecated ? ' 🚫' : ''}${
            isExperimental ? ' 🧪' : ''
          }</p-table-head-cell>`;
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
        .map((rowKey) => {
          const cells = tagNames
            .map((tagName) => {
              const meta = getComponentMeta(tagName);
              let value = meta[rowKey];

              // here we need to do some mapping, all other rowKeys can be used as they are
              if (value && (rowKey === 'props' || rowKey === 'eventNames' || rowKey === 'requiredProps')) {
                const {
                  propsMeta = {}, // new format
                  eventsMeta = {}, // new format
                } = meta;

                if (rowKey === 'props') {
                  const propNames = Object.keys(propsMeta);
                  value = propNames.map((propName) => {
                    const { allowedValues, isBreakpointCustomizable, isDeprecated, isExperimental } =
                      propsMeta[propName];
                    let formattedAllowedValues: string;

                    if (Array.isArray(allowedValues)) {
                      // props that support certain values validated with oneOf
                      formattedAllowedValues = allowedValues
                        .map((allowedValue) => (allowedValue === null ? 'undefined' : allowedValue))
                        .map((allowedValue) => (isDeprecated ? allowedValue + ' 🚫' : allowedValue))
                        .map((allowedValue) => `– ${allowedValue}`)
                        .join('<br>');
                    } else if (typeof allowedValues === 'object') {
                      // props that take objects like aria, intl and sort
                      formattedAllowedValues = Object.entries(allowedValues)
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
                      formattedAllowedValues = `- ${allowedValues}`;
                    }

                    const propFlags = [
                      isDeprecated && ' 🚫',
                      isBreakpointCustomizable && ' 🛠️',
                      isExperimental && ' 🧪️',
                    ]
                      .filter(Boolean)
                      .join('');

                    return (
                      `<span class="prop">${propName}${propFlags}</span>` +
                      (formattedAllowedValues ? `<div style="display: none;">${formattedAllowedValues}</div>` : '')
                    );
                  });
                } else if (rowKey === 'eventNames') {
                  const eventNames = Object.keys(eventsMeta);
                  value = eventNames.map((eventName) => {
                    const { isDeprecated } = eventsMeta[eventName];
                    return `${eventName}${isDeprecated ? ' 🚫' : ''}`;
                  });
                } else if (rowKey === 'requiredProps') {
                  value = Object.entries(propsMeta)
                    .map(([propName, { isRequired }]) => isRequired && `<code>${propName}</code>`)
                    .filter(Boolean)
                    .join('<br>');
                }
              }

              let cellContent = value
                ? Array.isArray(value)
                  ? value
                      .sort()
                      .map((val) => (rowKey === 'nestedComponents' ? val : `<code>${val}</code>`))
                      .join('<br>')
                  : value
                : '';
              cellContent = cellContent === true ? '✅' : cellContent;

              return `<p-table-cell>${cellContent}</p-table-cell>`;
            })
            .join('');

          return `<p-table-row>
    <p-table-cell>${rowKey}</p-table-cell>
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
