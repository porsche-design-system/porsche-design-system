<script setup lang="ts">
  import { PText, PTextFieldWrapper } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const isLoading = ref(false);
  const value = ref('');

  const onAction = (): void => {
    isLoading.value = true;

    // simulate async request
    setTimeout(() => {
      value.value = 'Stuttgart, Baden-Württemberg';
      isLoading.value = false;
    }, 3000);
  };

  const onInput = (e: Event) => {
    value.value = (e.target as HTMLInputElement).value;
    if (isLoading.value) {
      isLoading.value = false;
    }
  };
</script>

<template>
  <PTextFieldWrapper
    :label="'Search location'"
    :hideLabel="true"
    :actionIcon="'locate'"
    :actionLoading="isLoading"
    @action="onAction"
  >
    <input type="search" :value="value" :placeholder="isLoading ? 'Locating...' : ''" @input="onInput" />
  </PTextFieldWrapper>
  <PText>Value: {{ value }}</PText>
</template>
