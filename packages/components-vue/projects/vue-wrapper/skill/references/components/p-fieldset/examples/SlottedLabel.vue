<script setup lang="ts">
  import { PFieldset, PInputText } from '@porsche-design-system/components-vue';
</script>

<template>
  <PFieldset>
    <span slot="label">
      Some legend label
    </span>
    <PInputText label="Some label" name="some-name"></PInputText>
  </PFieldset>
</template>
