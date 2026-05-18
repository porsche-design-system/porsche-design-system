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
import { PInputUrl, type PInputUrlProps } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const myInputUrl = ref<PInputUrlProps['value']>('');

const resetValue = () => {
  myInputUrl.value = '';
};
</script>
