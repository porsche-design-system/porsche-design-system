<template>
  <PInputMonth v-model:value="myInputMonth" :name="'myInputMonth'" :label="'Some Label'" />

  <button type="button" @click="resetValue">Reset</button>

  <div>
    Value: <span data-field="value">{{ myInputMonth }}</span>
  </div>
</template>

<script setup lang="ts">
  import { PInputMonth, type PInputMonthProps } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const myInputMonth = ref<PInputMonthProps['value']>('');

  const resetValue = () => {
    myInputMonth.value = '';
  };
</script>
