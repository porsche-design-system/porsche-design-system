<template>
  <div style="display: flex; justify-content: space-between; margin: 0 0 1rem">
    <div>🚫 = deprecated<br>🛠 = breakpointCustomizable</div>
    <p-switch @change="toggleProps" :checked="isToggled">Show all prop values</p-switch>
  </div>

  <p-table>
    <p-table-head>
      <p-table-head-row v-html="headRow"></p-table-head-row>
    </p-table-head>
    <p-table-body ref="body" @click="onClick" v-html="body"></p-table-body>
  </p-table>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { TAG_NAMES } from '@porsche-design-system/shared';
import { ComponentMeta, getComponentMeta} from '@porsche-design-system/component-meta';

@Component
export default class Code extends Vue {
  get headRow(): string {
    return ['', ...TAG_NAMES].map((tagName) => {
      const { isDeprecated } = getComponentMeta(tagName) || {};
      return `<p-table-head-cell>${tagName}${isDeprecated ? ' 🚫' : ''}</p-table-head-cell>`;
    }).join('');
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

    const content = rowKeys.map(key => {
      const cells = TAG_NAMES.map(tagName => {
        const meta = getComponentMeta(tagName);
        let value = meta[key];

        if (value && (key === 'props' || key === 'eventNames')) {
          const { deprecatedProps = [], deprecatedEventNames = [], breakpointCustomizableProps = [], allowedPropValues = {} } = meta;

          if (key === 'props') {
            value = Object.keys(value);
            value = value.map(val => {
              let allowedValues = allowedPropValues[val];
              allowedValues = (Array.isArray(allowedValues) && allowedValues.map(x => x === null ? 'undefined' : x).join('<br>– ')) || allowedValues;
              return ('<span class="prop">' + val + [breakpointCustomizableProps.includes(val) && ' 🛠️' , deprecatedProps.includes(val) && ' 🚫'].filter(x => x).join('') + '</span>') +
              (allowedValues ? ('<div style="display: none">– ' + allowedValues + '</div>') : '')
            });
          } else if (key === 'eventNames') {
            value = value.map(val => val + (deprecatedEventNames.includes(val) ? ' 🚫' : ''));
          }
        }

        let cellContent = value 
          ? Array.isArray(value)
            ? value.sort().map(val => key === 'nestedComponents' ? val : `<code>${val}</code>`).join('<br>') 
            : value
          : '';
        cellContent = cellContent === true ? '✅' : cellContent;

        return `<p-table-cell>${cellContent}</p-table-cell>`;
      }).join('');

      return `<p-table-row>
  <p-table-cell>${key}</p-table-cell>
  ${cells}
</p-table-row>`;
    }).join('');
    
    return content;
  }

  onClick({ target }) {
    if (target.classList.value === 'prop') {
      target.nextSibling.style.display = target.nextSibling.style.display === 'block' ? 'none' : 'block';
    }
  }

  isToggled = false;
  toggleProps({ detail: { checked } }) {
    this.isToggled = checked;
    this.$refs.body.querySelectorAll('.prop + div').forEach(el => {
      el.style.display = checked ? 'block' : 'none';
    });
  }
}
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/components-js/styles/scss';

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
    padding: 0.125rem $pds-spacing-static-small;
    background: mix($pds-theme-light-primary, $pds-theme-light-background-base, 10%);
    border-radius: $pds-border-radius-small;

    &:not(:first-child) {
      margin: $pds-spacing-static-small 0 0;
    }
  }

  :deep(.prop) {
    cursor: pointer;

    &:hover {
      color: $pds-theme-light-contrast-medium;
    }
  }
</style>
