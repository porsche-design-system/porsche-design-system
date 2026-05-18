<template>
  <PInputNumber
    v-model:value="myInputNumber"
    :name="'myInputNumber'"
    :label="'Some Label'"
  />

  <button type="button" @click="resetValue">Reset</button>

  <div>Value: <span data-field="value">{{ myInputNumber }}</span></div>
</template>

<script setup lang="ts">
import { PInputNumber, type PInputNumberProps } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const myInputNumber = ref<PInputNumberProps['value']>('');

const resetValue = () => {
  myInputNumber.value = '';
};
</script>
