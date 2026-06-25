<script setup lang="ts">
  import { PSegmentedControl, PSegmentedControlItem } from '@porsche-design-system/components-vue';
</script>

<template>
  <PSegmentedControl value="1">
    <PSegmentedControlItem value="1" label="Label">
      Option 1
    </PSegmentedControlItem>
    <PSegmentedControlItem value="2" label="Label">
      Option 2
    </PSegmentedControlItem>
    <PSegmentedControlItem value="3" label="Label">
      Option 3
    </PSegmentedControlItem>
    <PSegmentedControlItem value="4" label="Label" :disabled="true">
      Option 4
    </PSegmentedControlItem>
    <PSegmentedControlItem value="5" label="Label">
      Option 5
    </PSegmentedControlItem>
  </PSegmentedControl>
</template>
