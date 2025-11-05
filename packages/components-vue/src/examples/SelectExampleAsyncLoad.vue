<script setup lang="ts">
  import { PInputSearch, PSelect, PSelectOption } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const options = ref<{ value: string; label: string }[]>([]);
  const loading = ref(false);
  const hasLoaded = ref(false);

  const onClick = (_: Event) => {
    if (!hasLoaded.value && options.value.length === 0) {
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
  <p-select name="options" label="Async Load on Open" @click="onClick">
    <PInputSearch slot="filter" name="search" :loading="loading" clear indicator compact autoComplete="off" />
    <p-select-option v-for="opt in options" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </p-select-option>
  </p-select>
</template>
