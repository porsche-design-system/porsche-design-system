<template>
  <div>
    <code
      v-if="type === 'props' && hasBreakpointCustomizableProp"
      class="code-before-table"
      v-html="breakpointCustomizableGeneric"
    ></code>
    <p-table v-if="type === 'props'">
      <p-table-head>
        <p-table-head-row>
          <p-table-head-cell>Property</p-table-head-cell>
          <p-table-head-cell>Attribute</p-table-head-cell>
          <p-table-head-cell>Description</p-table-head-cell>
          <p-table-head-cell>Type</p-table-head-cell>
          <p-table-head-cell>Default</p-table-head-cell>
        </p-table-head-row>
      </p-table-head>
      <p-table-body>
        <p-table-row v-for="(value, name, index) in propsMeta" :key="index">
          <p-table-cell>
            <code>{{ name }}</code>
            <span v-if="value.isDeprecated" title="deprecated"> 🚫</span>
            <span v-else-if="value.isExperimental" title="experimental"> 🧪</span>
          </p-table-cell>
          <p-table-cell>
            <code>{{ paramCase(name) }}</code>
            <span v-if="value.isDeprecated" title="deprecated"> 🚫</span>
            <span v-else-if="value.isExperimental" title="experimental"> 🧪</span>
          </p-table-cell>
          <p-table-cell multiline="true" v-html="formatDescription(value)" style="min-width: 10rem"></p-table-cell>
          <p-table-cell v-html="formatPropType(value)"></p-table-cell>
          <p-table-cell v-html="formatPropDefaultValue(value)"></p-table-cell>
        </p-table-row>
      </p-table-body>
    </p-table>

    <p-table v-else-if="type === 'events'">
      <p-table-head>
        <p-table-head-row>
          <p-table-head-cell>Event</p-table-head-cell>
          <p-table-head-cell>Description</p-table-head-cell>
          <p-table-head-cell>Type</p-table-head-cell>
        </p-table-head-row>
      </p-table-head>
      <p-table-body>
        <p-table-row v-for="(value, name, index) in eventsMeta" :key="index">
          <p-table-cell>
            <code>{{ name }}</code>
            <span v-if="value.isDeprecated" title="deprecated"> 🚫</span>
          </p-table-cell>
          <p-table-cell multiline="true" v-html="formatDescription(value)" style="min-width: 10rem"></p-table-cell>
          <p-table-cell v-html="formatEventType(value)"></p-table-cell>
        </p-table-row>
      </p-table-body>
    </p-table>
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
      return this.propsMeta
        ? Object.values(this.propsMeta).some((propMeta) => propMeta.isBreakpointCustomizable)
        : false;
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
  @import '../styles/shared.styles';

  :deep(.deprecated) {
    color: var(--theme-notification-error);
    text-transform: uppercase;
  }

  p-table {
    margin-top: $pds-spacing-fluid-medium;
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
