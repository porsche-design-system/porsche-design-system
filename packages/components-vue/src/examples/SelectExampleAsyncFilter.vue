<template>
  <PSelect
    name="async-search-select"
    label="Async Search"
    :value="value"
    @change="onChange"
    @toggle="onToggle"
  >
    <PInputSearch
      slot="filter"
      name="search"
      clear
      indicator
      compact
      autocomplete="off"
      :loading="loading"
      :value="searchValue"
      @input="onInput"
      @blur.stop
      @change.stop
    />

    <!-- Initial skeleton loading -->
    <template v-if="initialLoading && !error">
      <div v-for="i in 9" :key="i" slot="options-status" class="skeleton h-[40px]" />
    </template>

    <!-- Options -->
    <PSelectOption v-for="opt in options" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </PSelectOption>

    <!-- No filter results -->
    <div
      v-if="!initialLoading && options.length === 0 && !error"
      slot="options-status"
      class="text-contrast-medium cursor-not-allowed py-static-sm px-[12px]"
      role="alert"
    >
      <span aria-hidden="true">–</span>
      <span class="sr-only">No results found</span>
    </div>

    <!-- Error state -->
    <div
      v-if="error"
      slot="options-status"
      class="flex gap-static-sm py-static-sm px-[12px]"
      role="alert"
    >
      <PIcon name="information" color="error" />
      <span class="text-error">{{ error }}</span>
    </div>
  </PSelect>
</template>

<script setup lang="ts">
import {
  type InputSearchInputEventDetail,
  PIcon,
  PInputSearch,
  PSelect,
  PSelectOption,
  type SelectChangeEventDetail,
  type SelectToggleEventDetail,
} from '@porsche-design-system/components-vue';
import { ref } from 'vue';

function useDebounce<T>(callback: (value: T) => void, delay = 400) {
  let timer: number | undefined;
  return (value: T) => {
    if (timer) clearTimeout(timer);
    timer = window.setTimeout(() => callback(value), delay);
  };
}

const value = ref<string | undefined>(undefined);
const options = ref<{ value: string; label: string }[]>([]);
const searchValue = ref('');
const initialLoading = ref(false);
const loading = ref(false);
const error = ref<string | null>(null);

const hasLoadedOnce = ref(false);
let currentFetchId = 0;

// 💡 Consider using Vue Query or SWRV for data fetching.
async function fetchOptions(term?: string, isInitial?: boolean) {
  const fetchId = ++currentFetchId;
  if (isInitial) initialLoading.value = true;
  else loading.value = true;

  try {
    const url = term
      ? `https://jsonplaceholder.typicode.com/users?username_like=${term}`
      : `https://jsonplaceholder.typicode.com/users`;
    const res = await fetch(url);
    const data: { id: number; name: string; username: string }[] = await res.json();

    if (fetchId !== currentFetchId) return; // ignore stale fetch

    options.value = data.map((user) => ({
      value: user.id.toString(),
      label: `${user.name} (${user.username})`,
    }));
    error.value = null;
    hasLoadedOnce.value = true;
  } catch (err) {
    console.error('Failed to fetch options', err);
    options.value = [];
    error.value = 'Failed to load options';
  } finally {
    if (isInitial) initialLoading.value = false;
    else loading.value = false;
  }
}

const debouncedFetch = useDebounce((term?: string) => fetchOptions(term), 400);

function onInput(e: InputSearchInputEventDetail) {
  const term = (e.target as HTMLInputElement).value;
  searchValue.value = term;
  debouncedFetch(term.trim() || undefined);
}

function onChange(e: SelectChangeEventDetail) {
  // Can be called from bubbling onChange event of PInputSearch, ignore those
  if (e.name) {
    value.value = e.value;
  }
}

function onToggle(e: SelectToggleEventDetail) {
  if (e.open && !hasLoadedOnce.value) {
    fetchOptions(undefined, true);
  }
}
</script>
