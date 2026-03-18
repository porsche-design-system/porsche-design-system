<script setup lang="ts">
import {
  PButton,
  PInputText,
  PSelect,
  PSelectOption,
  type SelectChangeEventDetail,
} from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const selectedValue = ref<string>('1');
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
  inputValue.value = e.detail.value;
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
  <div>
    <PInputText label="Value:" name="input-value" type="text" v-model="inputValue" placeholder="e.g. 1" />
    <PButton type="button" @click="onSetValue" :compact="true">Set Value</PButton>
    <PButton type="button" @click="onResetValue" :compact="true">Reset value</PButton>

    <PSelect :name="'options'" :label="'Some Label'" :value="selectedValue" @change="onChange">
      <PSelectOption v-for="idx in optionCount" :key="idx" :value="`${idx}`"> Option {{ idx }} </PSelectOption>
    </PSelect>

    <PButton type="button" @click="onAddOption" :compact="true">Add option</PButton>
    <PButton type="button" @click="onRemoveOption" :compact="true">Remove last option</PButton>
  </div>
</template>
