<script setup lang="ts">
  import { PCheckbox } from '@porsche-design-system/components-vue';
</script>

<template>
  <div class="flex flex-col gap-static-sm">
    <PCheckbox label="Some label" :indeterminate="true"></PCheckbox>
    <PCheckbox label="Some label" :indeterminate="true" :checked="true"></PCheckbox>
  </div>
</template>
