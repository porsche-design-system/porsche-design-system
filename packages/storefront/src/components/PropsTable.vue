<template>
  <table>
    <thead>
      <tr>
        <th>Property</th>
        <th>Attribute</th>
        <th>Description</th>
        <th>Type</th>
        <th>Default</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(value, name, index) in propsMeta" :key="index">
        <td>
          <code>{{ name }}</code>
          <span v-if="value.isDeprecated" title="deprecated"> 🚫</span>
        </td>
        <td>
          <code>{{ paramCase(name) }}</code>
          <span v-if="value.isDeprecated" title="deprecated"> 🚫</span>
        </td>
        <td v-html="formatDescription(value)"></td>
        <td v-html="formatType(value)"></td>
        <td>
          <code>{{ value.defaultValue ?? 'undefined' }}</code>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import { paramCase } from 'change-case';
  import { getComponentMeta, type ComponentMeta, type PropMeta } from '@porsche-design-system/component-meta';
  import type { TagName } from '@porsche-design-system/shared';

  const wrapInCodeCode = (input: string): string =>
    `<code>${input.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}</code>`;

  @Component
  export default class PropsTable extends Vue {
    @Prop({ default: undefined }) public component?: TagName;

    paramCase = paramCase;

    public get propsMeta(): ComponentMeta['propsMeta'] {
      return this.component ? getComponentMeta(this.component).propsMeta : {};
    }

    public formatDescription(meta: PropMeta): string {
      return meta.description
        ? meta.description
            .replace(/@(deprecated)/, '<strong class="deprecated">$1</strong>') // deprecated annotation
            .replace(/`(.+?)`/g, '<code>$1</code>') // prop references in backticks
        : '';
    }

    public formatType(meta: PropMeta): string {
      return Array.isArray(meta.allowedValues) || meta.isBreakpointCustomizable
        ? [
            meta.type !== 'string' && meta.type !== 'number' && meta.type !== 'boolean'
              ? `type ${meta.type} =` // literal types, etc.
              : meta.type, // simple type
            ...(Array.isArray(meta.allowedValues)
              ? meta.allowedValues.map(
                  (val) =>
                    wrapInCodeCode(`'${val}'`) +
                    (meta.deprecatedValues?.includes(val) ? '<span title="deprecated"> 🚫</span>' : '')
                )
              : []),
            ...(meta.isBreakpointCustomizable ? [`BreakpointCustomizable<${meta.type}>`] : []),
          ]
            .map((item) => (item.match(/<code>.+?<\/code>/) ? item : wrapInCodeCode(item)))
            .join('<br>\n')
        : meta.isAria && typeof meta.allowedValues === 'object'
          ? wrapInCodeCode(
              `type ${meta.type} = {\n` +
                Object.entries(meta.allowedValues)
                  .map(([key, val]) => `&nbsp;&nbsp;'${key}'?: ${val};`)
                  .join('\n') +
                '\n}'
            )
          : wrapInCodeCode(meta.type);
    }
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  :deep(.deprecated) {
    color: #d5001c;
    text-transform: uppercase;
  }
</style>
