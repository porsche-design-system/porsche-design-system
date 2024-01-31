<script setup lang="ts">
  import { type SelectUpdateEventDetail, PSelect, PSelectOption } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const selectedValue = ref<string>('1');
  const inputValue = ref('');
  const optionCount = ref(3);

  const onSetValue = () => {
    selectedValue.value = inputValue.value;
  };

  const onResetValue = () => {
    selectedValue.value = '1';
    inputValue.value = '';
  };

  const handleUpdate = (e: SelectUpdateEventDetail) => {
    selectedValue.value = e.value;
    inputValue.value = e.value;
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
      <input name="input-value" type="text" v-model="inputValue" placeholder="e.g. 1" />
    </label>
    <button type="button" @click="onSetValue">Set Value</button>
    <button type="button" @click="onResetValue">Reset value</button>

    <PSelect :name="'options'" :label="'Some Label'" :value="selectedValue" @update="handleUpdate">
      <PSelectOption v-for="idx in optionCount" :key="idx" :value="`${idx}`"> Option {{ idx }} </PSelectOption>
    </PSelect>

    <button type="button" @click="onAddOption">Add option</button>
    <button type="button" @click="onRemoveOption">Remove last option</button>
  </div>
</template>
