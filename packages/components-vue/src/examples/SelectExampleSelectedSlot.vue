<template>
  <PSelect
    name="selected-slot-select"
    label="Selected Slot"
    :value="value"
    @change="onChange"
  >
    <span slot="selected" class="h-full flex items-center gap-fluid-sm grow">
      <PFlag v-if="selectedOption" :name="selectedOption.code"></PFlag>
      <p v-if="selectedOption" class="prose-text-sm truncate m-0">{{ selectedOption.label }}</p>
    </span>
    <POptgroup v-for="[continent, options] in Object.entries(optgroups)" :key="continent" :label="continent">
      <PSelectOption v-for="option in options" :key="option.code" :value="option.code">
        <div class="w-full flex items-center gap-fluid-sm">
          <PFlag :name="option.code"></PFlag>
          <p class="prose-text-sm m-0">{{ option.label }}</p>
        </div>
      </PSelectOption>
    </POptgroup>
  </PSelect>
</template>

<script setup lang="ts">
import {
  type FlagName,
  PFlag,
  POptgroup,
  PSelect,
  PSelectOption,
  type SelectChangeEventDetail,
} from '@porsche-design-system/components-vue';
import { ref } from 'vue';

type Option = { label: string; code: FlagName; continent: string };

const optionsData: Option[] = [
  {
    label: 'China',
    code: 'cn',
    continent: 'Asia',
  },
  {
    label: 'Japan',
    code: 'jp',
    continent: 'Asia',
  },
  {
    label: 'South Korea',
    code: 'kr',
    continent: 'Asia',
  },
  {
    label: 'Austria',
    code: 'at',
    continent: 'Europe',
  },
  {
    label: 'France',
    code: 'fr',
    continent: 'Europe',
  },
  {
    label: 'Germany',
    code: 'de',
    continent: 'Europe',
  },
  {
    label: 'Great Britain',
    code: 'gb',
    continent: 'Europe',
  },
  {
    label: 'Italy',
    code: 'it',
    continent: 'Europe',
  },
  {
    label: 'Portugal',
    code: 'pt',
    continent: 'Europe',
  },
  {
    label: 'Spain',
    code: 'es',
    continent: 'Europe',
  },

  {
    label: 'Canada',
    code: 'ca',
    continent: 'North America',
  },
  {
    label: 'USA',
    code: 'us',
    continent: 'North America',
  },
];

const value = ref<string | undefined>(undefined);
const options = ref<Option[]>(optionsData);
const selectedOption = ref<Option | undefined>(undefined);

const optgroups: Record<string, Option[]> = options.value.reduce(
  (acc, item) => {
    const key = item.continent;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  },
  {} as Record<string, Option[]>
);

function onChange(e: SelectChangeEventDetail) {
  value.value = e.value;
  selectedOption.value = options.value.find((option) => option.code === e.value);
}
</script>
