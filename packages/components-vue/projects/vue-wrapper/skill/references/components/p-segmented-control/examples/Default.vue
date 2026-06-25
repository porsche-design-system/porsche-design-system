<script setup lang="ts">
  import { PSegmentedControl, PSegmentedControlItem } from '@porsche-design-system/components-vue';
</script>

<template>
  <PSegmentedControl label="Some Label" description="Some description">
    <PSegmentedControlItem value="1">
      Option 1
    </PSegmentedControlItem>
    <PSegmentedControlItem value="2">
      Option 2
    </PSegmentedControlItem>
    <PSegmentedControlItem value="3">
      Option 3
    </PSegmentedControlItem>
    <PSegmentedControlItem value="4">
      Option 4
    </PSegmentedControlItem>
    <PSegmentedControlItem value="5">
      Option 5
    </PSegmentedControlItem>
  </PSegmentedControl>
</template>
