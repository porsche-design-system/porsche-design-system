<template>
  <button @click="$emit('click', $event)" :type="type">{{ name }}</button>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class PlaygroundButton extends Vue {
  @Prop({ default: 'prop' }) public name!: string;
  @Prop({ default: 'button' }) public type!: 'submit' | 'button';
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  button {
    @include pds-text-x-small();
    padding: 2px 4px;
    margin-inline-end: $pds-spacing-fluid-x-small;
  }
</style>
