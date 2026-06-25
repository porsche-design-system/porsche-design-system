<script setup lang="ts">
  import { PMultiSelect, PMultiSelectOption } from '@porsche-design-system/components-vue';
</script>

<template>
  <PMultiSelect name="name" label="Some Label" description="Some description">
    <PMultiSelectOption value="a">
      Option A
    </PMultiSelectOption>
    <PMultiSelectOption value="b">
      Option B
    </PMultiSelectOption>
    <PMultiSelectOption value="c">
      Option C
    </PMultiSelectOption>
    <PMultiSelectOption value="d">
      Option D
    </PMultiSelectOption>
    <PMultiSelectOption value="e">
      Option E
    </PMultiSelectOption>
    <PMultiSelectOption value="f">
      Option F
    </PMultiSelectOption>
  </PMultiSelect>
</template>
