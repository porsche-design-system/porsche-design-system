<script setup lang="ts">
  import { PSegmentedControl, PSegmentedControlItem, PText } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';
  import type { SegmentedControlChangeEvent } from '@porsche-design-system/components-vue';

  const currentValue = ref(1);
  const onChange = (e: CustomEvent<SegmentedControlChangeEvent>) => {
    currentValue.value = e.value as number;
  };
</script>

<template>
  <PSegmentedControl :value="currentValue" @change="onChange($event)">
    <PSegmentedControlItem :value="1">Option 1</PSegmentedControlItem>
    <PSegmentedControlItem :value="2">Option 2</PSegmentedControlItem>
    <PSegmentedControlItem :value="3">Option 3</PSegmentedControlItem>
    <PSegmentedControlItem :value="4">Option 4</PSegmentedControlItem>
    <PSegmentedControlItem :value="5">Option 5</PSegmentedControlItem>
  </PSegmentedControl>
  <PText>Current value: {{ currentValue }}</PText>
</template>
