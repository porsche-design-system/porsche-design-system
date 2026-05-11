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
import { PInputNumber } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const myInputNumber = ref('');

const resetValue = () => {
  myInputNumber.value = '';
};
</script>
