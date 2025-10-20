<template>
  <PInputText
    v-model:value="myInputText"
    :name="'myInputText'"
    :label="'Some Label'"
  />

  <button type="button" @click="resetValue">Reset</button>

  <div>Value: <span data-field="value">{{ myInputText }}</span></div>
</template>

<script setup lang="ts">
import { PInputText } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const myInputText = ref('');

const resetValue = () => {
  myInputText.value = '';
};
</script>
