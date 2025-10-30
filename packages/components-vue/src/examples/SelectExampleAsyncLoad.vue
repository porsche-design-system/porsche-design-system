<script setup lang="ts">
  import { ref } from 'vue';
  import {
    PSelect,
    PSelectOption,
    PInputSearch,
    type SelectToggleEventDetail,
  } from '@porsche-design-system/components-vue';

  const options = ref<{ value: string; label: string }[]>([]);
  const loading = ref(false);
  const hasLoaded = ref(false);

  const onToggle = (event: SelectToggleEventDetail) => {
    const isOpen = event.value;

    if (isOpen && !hasLoaded.value && options.value.length === 0) {
      loading.value = true;

      setTimeout(() => {
        options.value = [
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
          { value: 'c', label: 'Option C' },
        ];
        loading.value = false;
        hasLoaded.value = true;
      }, 1000);
    }
  };
</script>

<template>
  <p-select name="options" label="Async Load on Open" @toggle="onToggle">
    <PInputSearch slot="filter" name="search" :loading="loading" clear indicator compact autoComplete="off" />
    <p-select-option v-for="opt in options" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </p-select-option>
  </p-select>
</template>
