<template>
  <div>
    <code v-if="hasBreakpointCustomizableProp" class="code-before-table" v-html="breakpointCustomizableGeneric"></code>
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
          <td v-html="formatPropDescription(value)"></td>
          <td v-html="formatPropType(value)"></td>
          <td v-html="formatPropDefaultValue(value)"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import { paramCase } from 'change-case';
  import { getComponentMeta, type ComponentMeta, type PropMeta } from '@porsche-design-system/component-meta';
  import type { TagName } from '@porsche-design-system/shared';
  import { formatPropDefaultValue, formatPropDescription, formatPropType } from '@/utils';

  @Component
  export default class PropsTable extends Vue {
    @Prop() public component!: TagName;

    paramCase = paramCase;
    breakpointCustomizableGeneric = `type BreakpointCustomizable<T> = {
  base: T;
  xs?: T;
  s?: T;
  m?: T;
  l?: T;
  xl?: T;
  xxl?: T;
}`;

    public get propsMeta(): ComponentMeta['propsMeta'] {
      const unorderedPropsMeta = getComponentMeta(this.component)?.propsMeta;
      return unorderedPropsMeta
        ? Object.keys(unorderedPropsMeta)
            .sort()
            .reduce((result, key) => ({ ...result, [key]: unorderedPropsMeta[key] }), {})
        : {};
    }

    public get hasBreakpointCustomizableProp(): boolean {
      return this.propsMeta
        ? Object.values(this.propsMeta).some((propMeta) => propMeta.isBreakpointCustomizable)
        : false;
    }

    public formatPropDescription(meta: PropMeta): string {
      return formatPropDescription(meta);
    }

    public formatPropType(meta: PropMeta): string {
      return formatPropType(meta);
    }

    public formatPropDefaultValue(meta: PropMeta): string {
      return formatPropDefaultValue(meta);
    }
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  @import '../styles/shared.styles';

  :deep(.deprecated) {
    color: #d5001c;
    text-transform: uppercase;
  }

  table,
  :deep(table) {
    @include tableStyles;
  }

  code,
  :deep(code) {
    @include codeStyles;
    @include codeHighlightStyles;
  }

  .code-before-table {
    white-space: pre;
  }
</style>
