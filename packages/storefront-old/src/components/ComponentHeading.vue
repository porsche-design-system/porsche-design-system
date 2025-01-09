<template>
  <!-- using h1 instead of p-heading for more stable navigation e2e test -->
  <!-- to prevent additional space characters within tags -->
  <!-- prettier-ignore -->
  <h1 tabindex="-1" ref="heading">{{ name }}<span
      v-if="getFlag('isDeprecated')"
      title="This component is deprecated and will be removed with the next major release."
    > 🚫</span
    ><span
      v-else-if="getFlag('isExperimental')"
      title="This component is experimental and might change in the future."
    > 🧪</span>
  </h1>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { paramCase } from 'change-case';
import { ComponentMeta, getComponentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';

@Component
export default class ComponentHeading extends Vue {
  @Prop({ default: '' }) public name!: string;

  public getFlag(flag: Extract<keyof ComponentMeta, 'isDeprecated' | 'isExperimental'>): boolean | undefined {
    return getComponentMeta(`p-${paramCase(this.name)}` as TagName)[flag];
  }
}
</script>
