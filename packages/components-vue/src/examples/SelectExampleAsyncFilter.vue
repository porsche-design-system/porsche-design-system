<script setup lang="ts">
  import { ref } from 'vue';
  import {
    PSelect,
    PSelectOption,
    PInputSearch,
    type InputSearchInputEventDetail,
  } from '@porsche-design-system/components-vue';

  const searchValue = ref('');
  const options = ref([
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
  ]);
  const loading = ref(false);
  const defaultOptions = [...options.value];
  const lastSubmittedData = ref<string>('none');

  let debounceTimer: number | undefined;

  const setOptions = (newOptions: { value: string; label: string }[]) => {
    options.value = newOptions;
  };

  const loadOptions = async (term: string) => {
    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));

    loading.value = false;
    const newOptions = Array.from({ length: 3 }, (_, i) => ({
      value: `${term}-${i + 1}`,
      label: `Result ${i + 1} for "${term}"`,
    }));
    setOptions(newOptions);
  };

  const onInput = (event: InputSearchInputEventDetail) => {
    const term = (event.target as HTMLInputElement).value;
    searchValue.value = term;

    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = window.setTimeout(() => {
      if (term.trim()) {
        loadOptions(term.trim());
      } else {
        setOptions(defaultOptions);
      }
    }, 400);
  };
</script>

<template>
  <p-select name="options" label="Async Search">
    <PInputSearch
      slot="filter"
      name="search"
      v-model:value="searchValue"
      :loading="loading"
      clear
      indicator
      compact
      autoComplete="off"
      @input="onInput"
    />

    <p-select-option v-for="opt in options" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </p-select-option>
  </p-select>
</template>
