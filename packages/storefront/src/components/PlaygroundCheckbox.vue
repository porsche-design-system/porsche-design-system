<template>
  <label>
    <input type="checkbox" :checked="checked" @change="$emit('change', $event)" />
    <p-text :theme="theme">{{ name }}</p-text>
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import type { PlaygroundTheme } from '../models';

@Component
export default class PlaygroundCheckbox extends Vue {
  @Prop({ default: 'prop' }) public name!: string;
  @Prop({ default: false }) public checked!: boolean;

  get theme(): PlaygroundTheme {
    return this.$store.getters.playgroundTheme;
  }
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  p-text {
    display: inline-block;
  }

  input {
    font: inherit;
    padding: 2px 4px;
    margin-inline-end: $pds-spacing-fluid-x-small;
  }
</style>
