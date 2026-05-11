<template>
  <PInputWeek v-model:value="myInputWeek" :name="'myInputWeek'" :label="'Some Label'" />

  <button type="button" @click="resetValue">Reset</button>

  <div>
    Value: <span data-field="value">{{ myInputWeek }}</span>
  </div>
</template>

<script setup lang="ts">
  import { PInputWeek } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const myInputWeek = ref('');

  const resetValue = () => {
    myInputWeek.value = '';
  };
</script>
