<template>
  <label>
    <select :value="value" :aria-label="name" @input="$emit('input', $event.target.value)">
      <option disabled>{{ `Select ${name}` }}</option>
      <!-- prettier-ignore -->
      <option v-for="option in processedValues" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';

  @Component
  export default class PlaygroundSelect extends Vue {
    @Prop({ default: 'prop' }) public name!: string;
    @Prop({ default: '' }) public value!: string;
    @Prop({ default: () => [] }) public values!: { label: string; value: string }[] | string[];

    get processedValues() {
      if (this.values.length && typeof this.values[0] === 'string') {
        return (this.values as string[]).map((value) => ({ label: value, value }));
      }
      return this.values as { label: string; value: string }[];
    }
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  label {
    display: inline-flex;
    flex-direction: column;
    gap: 2px;
    margin-inline-end: $pds-spacing-fluid-x-small;
  }

  select {
    @include pds-text-x-small();
    padding: 2px 4px;
  }
</style>
