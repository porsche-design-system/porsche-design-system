<template>
  <PInputWeek v-model:value="myInputWeek" :name="'myInputWeek'" :label="'Some Label'" />

  <button type="button" @click="resetValue">Reset</button>

  <div>
    Value: <span data-field="value">{{ myInputWeek }}</span>
  </div>
</template>

<script setup lang="ts">
  import { PInputWeek, type PInputWeekProps } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const myInputWeek = ref<PInputWeekProps['value']>('');

  const resetValue = () => {
    myInputWeek.value = '';
  };
</script>
