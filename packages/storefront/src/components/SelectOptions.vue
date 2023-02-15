<template>
  <label>
    <p-text :theme="theme">{{ name }}:</p-text>
    <select :value="value" aria-label="label" @input="$emit('input', $event.target.value)">
      <option disabled>{{ label }}</option>
      <option v-for="value in values" v-bind:key="value" :value="value">{{ value }}</option>
    </select>
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import type { Theme } from '@/models';

  @Component
  export default class SelectOptions extends Vue {
    @Prop({ default: 'prop' }) public name!: string;
    @Prop({ default: '' }) public value!: string;
    @Prop({ default: () => [] }) public values!: string[];

    get label(): string {
      return `Select ${this.name}`;
    }

    get theme(): Theme {
      return this.$store.getters.theme;
    }
  }
</script>
