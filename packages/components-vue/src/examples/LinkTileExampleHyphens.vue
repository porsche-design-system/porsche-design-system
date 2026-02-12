<script setup lang="ts">
import { PLinkTile, PSelect, PSelectOption, type SelectChangeEventDetail } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const selectedValue = ref('auto');

const onUpdate = (e: SelectChangeEventDetail) => {
  selectedValue.value = e.value;
};
</script>

<template>
  <PSelect label="Select hyphens" name="hyphens" :value="selectedValue" @update="onUpdate">
    <PSelectOption value="auto">style="hyphens: auto;"</PSelectOption>
    <PSelectOption value="manual">style="hyphens: manual;"</PSelectOption>
    <PSelectOption value="none">style="hyphens: none;"</PSelectOption>
  </PSelect>

  <PLinkTile
    href="https://porsche.com"
    label="Some label"
    description="An extra&shy;ordinarily Porsche"
    :compact="true"
    size="inherit"
    :style="{ maxWidth: '400px', fontSize: '45px', hyphens: selectedValue }"
  >
  <img src="http://localhost:3002/lights.jpg" alt="Some image description" />
  </PLinkTile>
</template>
