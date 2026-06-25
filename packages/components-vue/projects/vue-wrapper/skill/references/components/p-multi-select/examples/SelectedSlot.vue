<template>
  <PMultiSelect
    name="selected-slot-select"
    label="Selected Slot"
    :value="value"
    @change="onChange"
  >
    <span slot="selected" class="h-full flex items-center">
      <span class="truncate">{{ selectedOptions.map(option => option.label).join(', ') }}</span>
    </span>
    <PMultiSelectOption v-for="option in options" :key="option.value" :value="option.value">
      <div class="w-full flex gap-fluid-sm">
        <img :src="option.imgSrc" alt="" class="h-[34px] w-auto self-center" />
        <div class="flex flex-col justify-center flex-1 min-w-0">
          <p class="prose-text-sm m-0">{{ option.label }}</p>
          <p class="prose-text-2xs m-0">{{ option.description }}</p>
        </div>
        <div class="self-center flex gap-fluid-sm">
          <PTag v-for="tag in option.tags" :key="tag" variant="info" :compact="true">
            {{ tag }}
          </PTag>
        </div>
      </div>
    </PMultiSelectOption>
  </PMultiSelect>
</template>

<script setup lang="ts">
import {
  type MultiSelectChangeEventDetail,
  PMultiSelect,
  PMultiSelectOption,
  type PMultiSelectProps,
  PTag,
} from '@porsche-design-system/components-vue';
import { ref } from 'vue';

type Option = { value: string; label: string; description: string; tags: string[]; imgSrc: string };

const optionsData: Option[] = [
  {
    value: '718',
    label: '718',
    description: 'Präziser Sportwagen mit Mittelmotor',
    tags: ['Benzin'],
    imgSrc: 'assets/718.png',
  },
  {
    value: '911',
    label: '911',
    description: 'Ikonischer Sportwagen mit Heckmotor',
    tags: ['Benzin'],
    imgSrc: 'assets/911.png',
  },
  {
    value: 'taycan',
    label: 'Taycan',
    description: 'Elektrischer Sportwagen',
    tags: ['Elektro'],
    imgSrc: 'assets/taycan.png',
  },
  {
    value: 'macan',
    label: 'Macan',
    tags: ['Elektro'],
    description: 'Sportlicher Kompakt-SUV',
    imgSrc: 'assets/macan.png',
  },
  {
    value: 'cayenne',
    label: 'Cayenne',
    tags: ['Hybrid', 'Benzin'],
    description: 'Vielseitiger SUV',
    imgSrc: 'assets/cayenne.png',
  },
  {
    value: 'panamera',
    label: 'Panamera',
    tags: ['Hybrid', 'Benzin'],
    description: 'Luxuslimousine mit hohem Komfort',
    imgSrc: 'assets/panamera.png',
  },
];

const value = ref<PMultiSelectProps['value']>([]);
const options = ref<Option[]>(optionsData);
const selectedOptions = ref<Option[]>([]);

function onChange(e: CustomEvent<MultiSelectChangeEventDetail>) {
  value.value = e.detail.value;
  selectedOptions.value = options.value.filter((option) => (e.detail.value as string[]).includes(option.value));
}
</script>
