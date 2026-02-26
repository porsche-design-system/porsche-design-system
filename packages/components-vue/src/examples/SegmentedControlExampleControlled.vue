<script setup lang="ts">
import {
  PSegmentedControl,
  PSegmentedControlItem,
  PText,
  type SegmentedControlChangeEventDetail,
} from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const currentValue = ref(1);
const onChange = (e: CustomEvent<SegmentedControlChangeEventDetail>): void => {
  currentValue.value = e.detail.value as number;
};
</script>

<template>
  <PSegmentedControl :value="currentValue" @change="onChange">
    <PSegmentedControlItem :value="1">Option 1</PSegmentedControlItem>
    <PSegmentedControlItem :value="2">Option 2</PSegmentedControlItem>
    <PSegmentedControlItem :value="3">Option 3</PSegmentedControlItem>
    <PSegmentedControlItem :value="4">Option 4</PSegmentedControlItem>
    <PSegmentedControlItem :value="5">Option 5</PSegmentedControlItem>
  </PSegmentedControl>
  <PText>Current value: {{ currentValue }}</PText>
</template>
