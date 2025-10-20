<template>
  <PSelect v-model:value="mySelect" :name="'mySelect'" :label="'Some Label'">
    <PSelectOption :value="'a'">Option A</PSelectOption>
    <PSelectOption :value="'b'">Option B</PSelectOption>
    <PSelectOption :value="'c'">Option C</PSelectOption>
    <PSelectOption :value="'d'">Option D</PSelectOption>
    <PSelectOption :value="'e'">Option E</PSelectOption>
    <PSelectOption :value="'f'">Option F</PSelectOption>
  </PSelect>

  <button type="button" @click="resetValue">Reset</button>

  <div>Value: <span data-field="value">{{ mySelect }}</span></div>
</template>

<script setup lang="ts">
import { PSelect, PSelectOption } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const mySelect = ref('');

const resetValue = () => {
  mySelect.value = '';
};
</script>
