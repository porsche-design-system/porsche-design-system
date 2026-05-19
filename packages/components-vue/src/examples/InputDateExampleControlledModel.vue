<template>
  <PInputDate
    v-model:value="myInputDate"
    :name="'myInputDate'"
    :label="'Some Label'"
  />

  <button type="button" @click="resetValue">Reset</button>

  <div>Value: <span data-field="value">{{ myInputDate }}</span></div>
</template>

<script setup lang="ts">
import { PInputDate, type PInputDateProps } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const myInputDate = ref<PInputDateProps['value']>('');

const resetValue = () => {
  myInputDate.value = '';
};
</script>
