<script setup lang="ts">
import {
  type MultiSelectUpdateEventDetail,
  PButton,
  PMultiSelect,
  PMultiSelectOption,
  PTextFieldWrapper,
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

const onUpdate = (e: MultiSelectUpdateEventDetail) => {
  selectedValues.value = e.value;
  inputValue.value = e.value.join(',');
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
    <PTextFieldWrapper label="Value:">
      <input name="input-value" type="text" v-model="inputValue" placeholder="e.g. 1,2" />
    </PTextFieldWrapper>
    <PButton type="button" @click="onSetValue" :compact="true">Set Value</PButton>
    <PButton type="button" @click="onResetValue" :compact="true">Reset value</PButton>

    <PMultiSelect :name="'options'" :label="'Some Label'" :value="selectedValues" @update="onUpdate">
      <PMultiSelectOption v-for="idx in optionCount" :key="idx" :value="`${idx}`">
        Option {{ idx }}
      </PMultiSelectOption>
    </PMultiSelect>

    <PButton type="button" @click="onAddOption" :compact="true">Add option</PButton>
    <PButton type="button" @click="onRemoveOption" :compact="true">Remove last option</PButton>
  </div>
</template>
