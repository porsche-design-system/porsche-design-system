<template>
  <PTextarea v-model:value="myTextarea" :name="'myTextarea'" :label="'Some Label'" />

  <button type="button" @click="resetValue">Reset</button>

  <div>Value: <span data-field="value">{{ myTextarea }}</span></div>
</template>

<script setup lang="ts">
import { PTextarea } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const myTextarea = ref('');

const resetValue = () => {
  myTextarea.value = '';
};
</script>
