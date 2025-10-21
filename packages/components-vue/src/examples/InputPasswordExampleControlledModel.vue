<template>
  <PInputPassword
    v-model:value="myInputPassword"
    :name="'myInputPassword'"
    :label="'Some Label'"
  />

  <button type="button" @click="resetValue">Reset</button>

  <div>Value: <span data-field="value">{{ myInputPassword }}</span></div>
</template>

<script setup lang="ts">
import { PInputPassword } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const myInputPassword = ref('');

const resetValue = () => {
  myInputPassword.value = '';
};
</script>
