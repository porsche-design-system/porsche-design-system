<script setup lang="ts">
import {
  PButton,
  PInputText,
  PSelect,
  PSelectOption,
  type PSelectProps,
  type SelectChangeEventDetail,
} from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const selectedValue = ref<PSelectProps['value']>('1');
const inputValue = ref<string>('');
const optionCount = ref<number>(3);

const onSetValue = () => {
  selectedValue.value = inputValue.value;
};

const onResetValue = () => {
  selectedValue.value = '1';
  inputValue.value = '';
};

const onChange = (e: CustomEvent<SelectChangeEventDetail>) => {
  selectedValue.value = e.detail.value;
  inputValue.value = String(e.detail.value ?? '');
};

const onAddOption = () => {
  optionCount.value++;
};

const onRemoveOption = () => {
  if (optionCount.value > 0) {
    optionCount.value--;
  }
};
</script>

<template>
  <div class="flex flex-col gap-fluid-sm">
    <PInputText label="Value:" name="input-value" v-model:value="inputValue" placeholder="e.g. 1" />
    <div class="flex gap-fluid-sm">
      <PButton type="button" @click="onSetValue" :compact="true">Set Value</PButton>
      <PButton type="button" @click="onResetValue" :compact="true">Reset value</PButton>
    </div>
    <PSelect :name="'options'" :label="'Some Label'" :value="selectedValue" @change="onChange">
      <PSelectOption v-for="idx in optionCount" :key="idx" :value="`${idx}`"> Option {{ idx }} </PSelectOption>
    </PSelect>
    <div class="flex gap-fluid-sm">
      <PButton type="button" @click="onAddOption" :compact="true">Add option</PButton>
      <PButton type="button" @click="onRemoveOption" :compact="true">Remove last option</PButton>
    </div>
  </div>
</template>
