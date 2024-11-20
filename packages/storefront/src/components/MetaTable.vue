<template>
  <div>
    <code
      v-if="type === 'props' && hasBreakpointCustomizableProp"
      class="code-before-table"
      v-html="breakpointCustomizableGeneric"
    ></code>
    <table v-if="type === 'props'">
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
            <span v-else-if="value.isExperimental" title="experimental"> 🧪</span>
          </td>
          <td>
            <code>{{ paramCase(name) }}</code>
            <span v-if="value.isDeprecated" title="deprecated"> 🚫</span>
            <span v-else-if="value.isExperimental" title="experimental"> 🧪</span>
          </td>
          <td v-html="formatDescription(value)"></td>
          <td v-html="formatPropType(value)"></td>
          <td v-html="formatPropDefaultValue(value)"></td>
        </tr>
      </tbody>
    </table>

    <table v-else-if="type === 'events'">
      <thead>
        <tr>
          <th>Event</th>
          <th>Description</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, name, index) in eventsMeta" :key="index">
          <td>
            <code>{{ name }}</code>
            <span v-if="value.isDeprecated" title="deprecated"> 🚫</span>
          </td>
          <td v-html="formatDescription(value)"></td>
          <td v-html="formatEventType(value)"></td>
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
import {
  getComponentMeta,
  type ComponentMeta,
  type EventMeta,
  type PropMeta,
} from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import { formatEventType, formatPropDefaultValue, formatPropDescription, formatPropType } from '@/utils';

const sortObjectByKey = <T extends object>(input?: T): T =>
  input
    ? (Object.keys(input) as (keyof T)[]).sort().reduce((result, key) => ({ ...result, [key]: input[key] }), {} as T)
    : ({} as T);

type MetaType = 'props' | 'events';

@Component
export default class MetaTable extends Vue {
  @Prop() public component!: TagName;
  @Prop({ default: 'props' }) public type!: MetaType;

  paramCase = paramCase;
  breakpointCustomizableGeneric = `type BreakpointCustomizable<T> = {
  base: T;
  xs?: T;
  s?: T;
  m?: T;
  l?: T;
  xl?: T;
  xxl?: T;
};`;

  public get propsMeta(): ComponentMeta['propsMeta'] {
    return sortObjectByKey(getComponentMeta(this.component)?.propsMeta);
  }

  public get eventsMeta(): ComponentMeta['eventsMeta'] {
    return sortObjectByKey(getComponentMeta(this.component)?.eventsMeta);
  }

  public get hasBreakpointCustomizableProp(): boolean {
    return this.propsMeta ? Object.values(this.propsMeta).some((propMeta) => propMeta.isBreakpointCustomizable) : false;
  }

  public formatDescription(meta: PropMeta | EventMeta): string {
    return formatPropDescription(meta);
  }

  public formatPropType(meta: PropMeta): string {
    return formatPropType(meta);
  }

  public formatPropDefaultValue(meta: PropMeta): string {
    return formatPropDefaultValue(meta);
  }

  public formatEventType(meta: EventMeta): string {
    return formatEventType(meta);
  }
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  @use '../styles/shared.styles' as *;

  :deep(.deprecated) {
    color: var(--theme-notification-error);
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
