<script setup lang="ts">
  import { PStepperHorizontal, PStepperHorizontalItem } from '@porsche-design-system/components-vue';
</script>

<template>
  <PStepperHorizontal>
    <PStepperHorizontalItem state="complete">
      Step 1
    </PStepperHorizontalItem>
    <PStepperHorizontalItem state="warning">
      Step 2
    </PStepperHorizontalItem>
    <PStepperHorizontalItem state="current">
      Step 3
    </PStepperHorizontalItem>
    <PStepperHorizontalItem>
      Step 4
    </PStepperHorizontalItem>
  </PStepperHorizontal>
</template>
