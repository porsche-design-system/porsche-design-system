<template>
  <label>
    {{ name }}
    <input :type="type" :value="value" :placeholder="placeholder" @input="$emit('input', $event.target.value)" />
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';

  @Component
  export default class PlaygroundButton extends Vue {
    @Prop({ default: 'prop' }) public name!: string;
    @Prop({ default: '' }) public value!: string;
    @Prop({ default: '' }) public placeholder!: string;
    @Prop({ default: 'text' }) public type!: 'text' | 'number';
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
