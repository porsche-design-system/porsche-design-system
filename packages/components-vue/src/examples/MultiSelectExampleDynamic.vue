<script setup lang="ts">
import {
  type MultiSelectChangeEventDetail,
  PButton,
  PInputText,
  PMultiSelect,
  PMultiSelectOption,
} from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const selectedValues = ref<string[]>([]);
const inputValue = ref('');
const optionCount = ref(3);

const onSetValue = () => {
  selectedValues.value = inputValue.value.split(',');
};

const onResetValue = () => {
  selectedValues.value = [];
  inputValue.value = '';
};

const onChange = (e: CustomEvent<MultiSelectChangeEventDetail>) => {
  selectedValues.value = e.detail.value;
  inputValue.value = e.detail.value.join(',');
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
    <PInputText label="Value:" name="input-value" type="text" v-model="inputValue" placeholder="e.g. 1,2" />
    <PButton type="button" @click="onSetValue" :compact="true">Set Value</PButton>
    <PButton type="button" @click="onResetValue" :compact="true">Reset value</PButton>

    <PMultiSelect :name="'options'" :label="'Some Label'" :value="selectedValues" @change="onChange">
      <PMultiSelectOption v-for="idx in optionCount" :key="idx" :value="`${idx}`">
        Option {{ idx }}
      </PMultiSelectOption>
    </PMultiSelect>

    <PButton type="button" @click="onAddOption" :compact="true">Add option</PButton>
    <PButton type="button" @click="onRemoveOption" :compact="true">Remove last option</PButton>
  </div>
</template>
