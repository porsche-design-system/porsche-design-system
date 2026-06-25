<script setup lang="ts">
  import { PFieldset, PInputText } from '@porsche-design-system/components-vue';
</script>

<template>
  <PFieldset label="Some legend label" :required="true">
    <PInputText label="Some label" name="some-name-1" :required="true"></PInputText>
    <PInputText label="Some label" name="some-name-2" :required="true" class="mt-fluid-sm"></PInputText>
  </PFieldset>
</template>
