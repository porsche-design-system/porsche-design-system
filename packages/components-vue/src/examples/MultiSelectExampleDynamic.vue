<script setup lang="ts">
  import {
    type MultiSelectUpdateEventDetail,
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
    <label>
      Value:
      <input name="input-value" type="text" v-model="inputValue" placeholder="e.g. 1,2" />
    </label>
    <button type="button" @click="onSetValue">Set Value</button>
    <button type="button" @click="onResetValue">Reset value</button>

    <PMultiSelect :name="'options'" :label="'Some Label'" :value="selectedValues" @update="onUpdate">
      <PMultiSelectOption v-for="idx in optionCount" :key="idx" :value="`${idx}`">
        Option {{ idx }}
      </PMultiSelectOption>
    </PMultiSelect>

    <button type="button" @click="onAddOption">Add option</button>
    <button type="button" @click="onRemoveOption">Remove last option</button>
  </div>
</template>
