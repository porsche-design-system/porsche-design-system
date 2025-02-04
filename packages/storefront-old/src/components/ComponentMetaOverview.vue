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
import type { TagName } from '@porsche-design-system/shared';
import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import type { ComponentMeta } from '@porsche-design-system/component-meta';
import { getComponentMeta, PropMeta } from '@porsche-design-system/component-meta';
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
        return `<p-table-head-cell ${!tagName ? 'aria-hidden="true"' : ''}>${tagName}${isDeprecated ? ' 🚫' : ''}${
          isExperimental ? ' 🧪' : ''
        }</p-table-head-cell>`;
      })
      .join('');
  }

  // TODO: Refactor
  get body(): string {
    const formatRow = (rowKey: string, tagNames: TagName[]): string => {
      const cells = tagNames.map((tagName) => formatCell(tagName, rowKey)).join('');
      return `<p-table-row>
    <p-table-cell>${rowKey}</p-table-cell>
    ${cells}
  </p-table-row>`;
    };

    const formatCell = (tagName: TagName, rowKey: string): string => {
      const meta = getComponentMeta(tagName);

      let value = rowKey in meta ? meta[rowKey as keyof ComponentMeta] : undefined;

      if (rowKey === 'props') {
        value = formatProps(meta.propsMeta);
      } else if (rowKey === 'eventNames') {
        value = formatEvents(meta.eventsMeta);
      } else if (rowKey === 'requiredProps') {
        value = formatRequiredProps(meta.propsMeta);
      } else if (rowKey === 'namedSlots') {
        value = formatNamedSlots(meta.slotsMeta);
      }
      const cellContent = formatCellContent(value, rowKey);
      return `<p-table-cell>${cellContent}</p-table-cell>`;
    };

    const formatProps = (propsMeta: ComponentMeta['propsMeta']): string[] | undefined =>
      propsMeta &&
      Object.entries(propsMeta).map(([propName, meta]) => {
        const propFlags = getFlags(meta);
        const formattedAllowedValues = formatAllowedValues(meta.allowedValues, !!meta.isDeprecated);
        return (
          `<span class="prop">${propName}${propFlags}</span>` +
          (formattedAllowedValues ? `<div style="display: none;">${formattedAllowedValues}</div>` : '')
        );
      });

    const getFlags = <
      T extends { isDeprecated?: boolean; isBreakpointCustomizable?: boolean; isExperimental?: boolean },
    >(
      meta: T
    ): string =>
      [meta.isDeprecated && ' 🚫', meta.isBreakpointCustomizable && ' 🛠️', meta.isExperimental && ' 🧪️']
        .filter(Boolean)
        .join('');

    const formatAllowedValues = (allowedValues: PropMeta['allowedValues'], isDeprecated: boolean): string => {
      if (Array.isArray(allowedValues)) {
        return allowedValues
          .map((value) => (value === null ? 'undefined' : value))
          .map((value) => (isDeprecated ? value + ' 🚫' : value))
          .map((value) => `– ${value}`)
          .join('<br>');
      } else if (typeof allowedValues === 'object') {
        return Object.entries(allowedValues)
          .map(([key, val]) => {
            if (Array.isArray(val)) {
              val = val.map((v) => (v === null ? 'undefined' : v)).join(' | ');
            }
            return `- ${key}: ${val}`;
          })
          .join('<br>');
      }
      return `- ${allowedValues}`;
    };

    const formatEvents = (eventsMeta: ComponentMeta['eventsMeta']): string[] | undefined =>
      eventsMeta && Object.entries(eventsMeta).map(([eventName, value]) => `${eventName}${getFlags(value)}`);

    const formatRequiredProps = (propsMeta: ComponentMeta['propsMeta']): string | undefined =>
      propsMeta &&
      Object.entries(propsMeta)
        .filter(([, { isRequired }]) => isRequired)
        .map(([propName]) => `<code>${propName}</code>`)
        .join('<br>');

    const formatNamedSlots = (slotsMeta: ComponentMeta['slotsMeta']): string | undefined =>
      slotsMeta &&
      Object.entries(slotsMeta)
        .filter(([slotName]) => slotName) // Filter out default slot with empty key ''
        .map(([slotName]) => `<code>${slotName}</code>`)
        .join('<br>');

    const formatCellContent = (value: boolean | string | string[] | TagName[] | undefined, rowKey: string): string => {
      if (!value) return '';
      if (value === true) return '✅';
      if (Array.isArray(value)) {
        return value
          .sort()
          .map((val) => (rowKey === 'nestedComponents' ? val : `<code>${val}</code>`))
          .join('<br>');
      }
      return value;
    };

    const rowKeys = [
      'isDelegatingFocus',
      'isThemeable',
      'props',
      'requiredProps',
      'eventNames',
      'namedSlots',
      'nestedComponents',
    ];

    return rowKeys.map((rowKey) => formatRow(rowKey, tagNames)).join('');
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
