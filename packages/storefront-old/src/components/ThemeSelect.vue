<template>
  <p-select
    class="select"
    :value="theme"
    @update="$emit('update', $event)"
    :theme="$store.getters.storefrontTheme"
    :label="label"
    :hide-label="hideLabel"
  >
    <p-select-option disabled>Select theme</p-select-option>
    <p-select-option value="light">Light</p-select-option>
    <p-select-option value="dark">Dark</p-select-option>
    <p-select-option value="auto">Auto (sync with operating system)</p-select-option>
  </p-select>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';
import { PlaygroundTheme } from '@/models';
import Component from 'vue-class-component';

@Component
export default class ThemeSelect extends Vue {
  @Prop({ default: 'light' }) public theme!: PlaygroundTheme;
  @Prop({ default: 'Theme' }) public label!: string;
  @Prop({ default: false }) public hideLabel!: boolean;
}
</script>

<style scoped lang="scss">
  // can be removed once p-select has been changed to block element
  p-select {
    display: block;
  }
</style>
