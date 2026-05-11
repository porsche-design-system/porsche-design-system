<template>
  <PMultiSelect v-model:value="myMultiSelect" :name="'myMultiSelect'" :label="'Some Label'">
    <PMultiSelectOption :value="'a'">Option A</PMultiSelectOption>
    <PMultiSelectOption :value="'b'">Option B</PMultiSelectOption>
    <PMultiSelectOption :value="'c'">Option C</PMultiSelectOption>
    <PMultiSelectOption :value="'d'">Option D</PMultiSelectOption>
    <PMultiSelectOption :value="'e'">Option E</PMultiSelectOption>
    <PMultiSelectOption :value="'f'">Option F</PMultiSelectOption>
  </PMultiSelect>

  <button type="button" @click="resetValue">Reset</button>

  <div>Value: <span data-field="value">{{ myMultiSelect }}</span></div>
</template>

<script setup lang="ts">
import { PMultiSelect, PMultiSelectOption } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const myMultiSelect = ref([]);

const resetValue = () => {
  myMultiSelect.value = [];
};
</script>
