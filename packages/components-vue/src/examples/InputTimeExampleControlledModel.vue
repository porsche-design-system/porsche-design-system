<template>
  <PInputTime
    v-model:value="myInputTime"
    :name="'myInputTime'"
    :label="'Some Label'"
  />

  <button type="button" @click="resetValue">Reset</button>

  <div>Value: <span data-field="value">{{ myInputTime }}</span></div>
</template>

<script setup lang="ts">
import { PInputTime, type PInputTimeProps } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const myInputTime = ref<PInputTimeProps['value']>('');

const resetValue = () => {
  myInputTime.value = '';
};
</script>
