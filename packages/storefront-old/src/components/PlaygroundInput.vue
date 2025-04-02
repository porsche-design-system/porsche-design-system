<template>
  <label>
    <p-text :theme="theme">{{ name }}</p-text>
    <input :type="type" :value="value" :placeholder="placeholder" @input="$emit('input', $event.target.value)" />
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { PlaygroundTheme } from '@/models';

@Component
export default class PlaygroundInput extends Vue {
  @Prop({ default: 'prop' }) public name!: string;
  @Prop({ default: '' }) public value!: string;
  @Prop({ default: '' }) public placeholder!: string;
  @Prop({ default: 'text' }) public type!: 'text' | 'number';

  get theme(): PlaygroundTheme {
    return this.$store.getters.playgroundTheme;
  }
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  label {
    @include pds-text-x-small();
    display: inline-flex;
    flex-direction: column;
  }

  input {
    font: inherit;
    padding: 2px 4px;
    margin-inline-end: $pds-spacing-fluid-x-small;
  }
</style>
