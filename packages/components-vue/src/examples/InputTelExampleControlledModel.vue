<template>
  <PInputTel
    v-model:value="myInputTel"
    :name="'myInputTel'"
    :label="'Some Label'"
  />

  <button type="button" @click="resetValue">Reset</button>

  <div>Value: <span data-field="value">{{ myInputTel }}</span></div>
</template>

<script setup lang="ts">
import { PInputTel } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const myInputTel = ref('');

const resetValue = () => {
  myInputTel.value = '';
};
</script>
