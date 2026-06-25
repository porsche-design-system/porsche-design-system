<script setup lang="ts">
  import { PFieldset, PInputText } from '@porsche-design-system/components-vue';
</script>

<template>
  <PFieldset label="Some legend label" state="error">
    <PInputText label="Some label" name="some-name"></PInputText>
    <span slot="message">
      Some error message
    </span>
  </PFieldset>
</template>
