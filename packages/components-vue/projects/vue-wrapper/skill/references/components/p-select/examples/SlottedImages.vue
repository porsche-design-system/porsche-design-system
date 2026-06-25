<script setup lang="ts">
  import { PSelect, PSelectOption } from '@porsche-design-system/components-vue';
</script>

<template>
  <PSelect name="options" label="Some Label" description="Some description">
    <PSelectOption value="718">
      <img src="assets/718.png" />
      718
    </PSelectOption>
    <PSelectOption value="911">
      <img src="assets/911.png" />
      911
    </PSelectOption>
    <PSelectOption value="taycan">
      <img src="assets/taycan.png" />
      taycan
    </PSelectOption>
    <PSelectOption value="macan">
      <img src="assets/macan.png" />
      macan
    </PSelectOption>
    <PSelectOption value="cayenne">
      <img src="assets/cayenne.png" />
      cayenne
    </PSelectOption>
    <PSelectOption value="panamera">
      <img src="assets/panamera.png" />
      panamera
    </PSelectOption>
  </PSelect>
</template>
