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
    imgSrc: 'http://localhost:3002/718.png',
  },
  {
    value: '911',
    label: '911',
    description: 'Ikonischer Sportwagen mit Heckmotor',
    tags: ['Benzin'],
    imgSrc: 'http://localhost:3002/911.png',
  },
  {
    value: 'taycan',
    label: 'Taycan',
    description: 'Elektrischer Sportwagen',
    tags: ['Elektro'],
    imgSrc: 'http://localhost:3002/taycan.png',
  },
  {
    value: 'macan',
    label: 'Macan',
    tags: ['Elektro'],
    description: 'Sportlicher Kompakt-SUV',
    imgSrc: 'http://localhost:3002/macan.png',
  },
  {
    value: 'cayenne',
    label: 'Cayenne',
    tags: ['Hybrid', 'Benzin'],
    description: 'Vielseitiger SUV',
    imgSrc: 'http://localhost:3002/cayenne.png',
  },
  {
    value: 'panamera',
    label: 'Panamera',
    tags: ['Hybrid', 'Benzin'],
    description: 'Luxuslimousine mit hohem Komfort',
    imgSrc: 'http://localhost:3002/panamera.png',
  },
];

const value = ref<string[]>([]);
const options = ref<Option[]>(optionsData);
const selectedOptions = ref<Option[]>([]);

function onChange(e: CustomEvent<MultiSelectChangeEventDetail>) {
  value.value = e.detail.value;
  selectedOptions.value = options.value.filter((option) => e.detail.value.includes(option.value));
}
</script>
