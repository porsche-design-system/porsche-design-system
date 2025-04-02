<script setup lang="ts">
import {
  PButtonTile,
  PSelect,
  PSelectOption,
  type SelectUpdateEventDetail,
} from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const selectedValue = ref('auto');

const onUpdate = (e: SelectUpdateEventDetail) => {
  selectedValue.value = e.value;
};
</script>

<template>
  <PSelect label="Select hyphens" name="hyphens" :value="selectedValue" @update="onUpdate">
    <PSelectOption value="auto">style="hyphens: auto;"</PSelectOption>
    <PSelectOption value="manual">style="hyphens: manual;"</PSelectOption>
    <PSelectOption value="none">style="hyphens: none;"</PSelectOption>
  </PSelect>

  <PButtonTile
    label="Some label"
    description="An extra&shy;ordinarily Porsche"
    :compact="true"
    size="inherit"
    :style="{ maxWidth: '400px', fontSize: '45px', hyphens: selectedValue }"
  >
  <img src="assets/lights.jpg" alt="Some image description" />
  </PButtonTile>
</template>
