<template>
  <PInputEmail
    v-model:value="myInputEmail"
    :name="'myInputEmail'"
    :label="'Some Label'"
  />

  <button type="button" @click="resetValue">Reset</button>

  <div>Value: <span data-field="value">{{ myInputEmail }}</span></div>
</template>

<script setup lang="ts">
import { PInputEmail } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const myInputEmail = ref('');

const resetValue = () => {
  myInputEmail.value = '';
};
</script>
