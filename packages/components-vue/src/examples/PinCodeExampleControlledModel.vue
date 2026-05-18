<template>
  <PPinCode v-model:value="myPinCode" :name="'myPinCode'" :label="'Some Label'"></PPinCode>

  <button type="button" @click="resetValue">Reset</button>

  <div>Value: <span data-field="value">{{ myPinCode }}</span></div>
</template>

<script setup lang="ts">
import { PPinCode, type PPinCodeProps } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const myPinCode = ref<PPinCodeProps['value']>('');

const resetValue = () => {
  myPinCode.value = '';
};
</script>
