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
        <td v-html="formatDescription(value.description)"></td>
        <td>
          <code>{{ value.type }}</code>
        </td>
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
  import { getComponentMeta, type ComponentMeta } from '@porsche-design-system/component-meta';
  import type { TagName } from '@porsche-design-system/shared';

  @Component
  export default class PropsTable extends Vue {
    @Prop({ default: undefined }) public component?: TagName;

    paramCase = paramCase;

    public get propsMeta(): ComponentMeta['propsMeta'] {
      return this.component ? getComponentMeta(this.component).propsMeta : {};
    }

    public formatDescription(input?: string): string {
      return input
        ? input
            .replace(/@(deprecated)/, '<strong class="deprecated">$1</strong>') // deprecated annotation
            .replace(/`(.+?)`/g, '<code>$1</code>') // prop references in backticks
        : '';
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
