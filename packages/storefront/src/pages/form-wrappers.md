<template>
  <section>
    <p-checkbox-wrapper label="Wrapped in form">
      <input type="checkbox" v-model="isWrappedInForm" @change="isWrappedInForm = $event.target.checked" />
    </p-checkbox-wrapper>
    <p-checkbox-wrapper label="Has values">
      <input type="checkbox" v-model="hasValues" @change="hasValues = $event.target.checked" />
    </p-checkbox-wrapper>
  </section>

  <div class="overview" v-html="markup"></div>
</template>

<script lang="ts">
import Vue from 'vue';  
import Component from 'vue-class-component';
import type { TagName } from '@porsche-design-system/shared';

type Variation = { 
  tagName: TagName;
  child: string;
  attributes?: string;
};

const variations: Variation[] = [
  { tagName: 'p-checkbox-wrapper', child: '<input type="checkbox" />' },
  { tagName: 'p-radio-button-wrapper', child: '<input type="radio" />' },
  { tagName: 'p-select-wrapper', child: '<select><option>Option 1</option><option>Option 2</option></select>' },
  { tagName: 'p-select-wrapper', child: '<select><option>Option 1</option><option>Option 2</option></select>', attributes: 'native' },
  { tagName: 'p-text-field-wrapper', child: '<input type="text" />' },
  { tagName: 'p-text-field-wrapper', child: '<input type="password" />' },
  { tagName: 'p-text-field-wrapper', child: '<input type="search" />' },
  { tagName: 'p-text-field-wrapper', child: '<input type="search" />', attributes: 'action-icon="locate"'  },
  { tagName: 'p-textarea-wrapper', child: '<textarea></textarea>' },
];

const renderMarkupForVariation = ({ tagName, child, attributes }: Variation): string => {
  const childDisabled = child.replace(/((?: \/)?>)/, ' disabled$1');
  const childReadonly = child.replace(/((?: \/)?>)/, ' readonly$1');
  attributes = attributes ? ` ${attributes}` : '';
  const labelSuffix = child.match(/type="[^cr][a-z]+"/) ? ` ${child.slice(child.indexOf('type='), -3).replace(/"/g, '&quot;')}` : '';

  return `
<div>
  <${tagName}${attributes} label="Default${labelSuffix}">
    ${child}
  </${tagName}>
  <${tagName}${attributes} label="Readonly${labelSuffix}">
    ${childReadonly}
  </${tagName}>
  <${tagName}${attributes} label="Disabled${labelSuffix}">
    ${childDisabled}
  </${tagName}>
  <${tagName}${attributes} label="Error${labelSuffix}" state="error" message="Error">
    ${child}
  </${tagName}>
  <${tagName}${attributes} label="Success${labelSuffix}" state="success" message="Success">
    ${child}
  </${tagName}>
  <${tagName}${attributes} label="Disabled${labelSuffix}" state="success" message="Success">
    ${childDisabled}
  </${tagName}>
</div>`;
};

@Component
export default class Code extends Vue {
  isWrappedInForm = false;
  hasValues = false;

  get markup(): string {
    let content = variations.map(renderMarkupForVariation).join('\n');
    if (this.hasValues) {
      content = content
        .replace(/(<input type="(?:checkbox|radio)")/g, '$1 checked')
        .replace(/(<input type="[^cr][a-z]+")/g, '$1 value="Value"')
        .replace(/(<textarea.*?>)(<\/textarea>)/g, '$1Value$2');
    }
    return this.isWrappedInForm ? `<form onsubmit="return false">${content}</form>` : content;
  }
}
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/components-js/utilities/scss';

  section {
    display: flex;
    gap: 1rem;
    background: $pds-theme-light-contrast-low;
    margin: 0 0 2rem;
    padding: 1rem;
    max-width: none !important;
  }

  .overview,
  :deep(.overview form) {
    display: grid;
    grid-auto-flow: row;
    gap: 1rem;
  }

  :deep(div > div),
  :deep(div form > div) {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(0, 1fr);
    gap: 1rem;
    width: 100%;
  }

  :deep(textarea) {
    min-height: initial;
  }
</style>
