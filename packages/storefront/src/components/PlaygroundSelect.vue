<template>
  <label>
    <select :value="value" :aria-label="name" @input="$emit('input', $event.target.value)">
      <option disabled>{{ `Select ${name}` }}</option>
      <!-- prettier-ignore -->
      <option v-for="value in values" v-bind:key="value" :value="`${value}`.replace(' (deprecated)', '')">{{ value }}</option>
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
    @Prop({ default: () => [] }) public values!: string[];
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
