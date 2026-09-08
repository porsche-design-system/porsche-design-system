<template>
  <PInputSearch
    v-model:value="myInputSearch"
    :name="'myInputSearch'"
    :label="'Some Label'"
  />

  <button type="button" @click="resetValue">Reset</button>

  <div>Value: <span data-field="value">{{ myInputSearch }}</span></div>
</template>

<script setup lang="ts">
import { PInputSearch, type PInputSearchProps } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const myInputSearch = ref<PInputSearchProps['value']>('');

const resetValue = () => {
  myInputSearch.value = '';
};
</script>
