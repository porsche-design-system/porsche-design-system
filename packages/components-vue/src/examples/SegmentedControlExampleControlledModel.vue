<template>
  <PSegmentedControl v-model:value="mySegmentedControl" :name="'mySegmentedControl'" :label="'Some Label'">
    <PSegmentedControlItem :value="1">Option 1</PSegmentedControlItem>
    <PSegmentedControlItem :value="2">Option 2</PSegmentedControlItem>
    <PSegmentedControlItem :value="3">Option 3</PSegmentedControlItem>
    <PSegmentedControlItem :value="4">Option 4</PSegmentedControlItem>
    <PSegmentedControlItem :value="5">Option 5</PSegmentedControlItem>
  </PSegmentedControl>

  <button type="button" @click="resetValue">Reset</button>

  <div>Value: <span data-field="value">{{ mySegmentedControl }}</span></div>
</template>

<script setup lang="ts">
import { PSegmentedControl, PSegmentedControlItem } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const mySegmentedControl = ref();

const resetValue = () => {
  mySegmentedControl.value = undefined;
};
</script>
