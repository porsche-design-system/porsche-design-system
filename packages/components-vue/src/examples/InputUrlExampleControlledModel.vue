<template>
  <PInputUrl
    v-model:value="myInputUrl"
    :name="'myInputUrl'"
    :label="'Some Label'"
  />

  <button type="button" @click="resetValue">Reset</button>

  <div>Value: <span data-field="value">{{ myInputUrl }}</span></div>
</template>

<script setup lang="ts">
import { PInputUrl } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const myInputUrl = ref('');

const resetValue = () => {
  myInputUrl.value = '';
};
</script>
