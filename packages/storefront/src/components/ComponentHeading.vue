<template>
  <p-heading tag="h1"
    >{{ name
    }}<span v-if="isDeprecated" title="This component is deprecated and will be removed with the next major release.">
      🚫</span
    >
  </p-heading>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import { paramCase } from 'change-case';
  import { getComponentMeta } from '@porsche-design-system/component-meta';
  import type { TagName } from '@porsche-design-system/shared';

  @Component
  export default class ComponentHeading extends Vue {
    @Prop({ default: '' }) public name!: string;

    get isDeprecated(): string {
      return getComponentMeta(`p-${paramCase(this.name)}` as TagName).isDeprecated;
    }
  }
</script>
