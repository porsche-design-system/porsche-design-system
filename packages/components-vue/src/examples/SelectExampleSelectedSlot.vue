<template>
  <PSelect
    name="selected-slot-select"
    label="Selected Slot"
    :value="value"
    @change="onChange"
  >
    <span slot="selected" class="h-full flex items-center gap-fluid-sm grow">
      <img :src="selectedOption?.imgSrc" alt="" class="h-full w-auto" />
      <p class="prose-text-md truncate m-0">{{ selectedOption?.label }}</p>
      <PTag v-for="tag in selectedOption?.tags" :key="tag" color="notification-info-soft" :compact="true">
        {{ tag }}
      </PTag>
    </span>
    <PSelectOption v-for="option in options" :key="option.value" :value="option.value">
      <div class="flex items-center gap-fluid-sm">
        <img :src="option.imgSrc" alt="" class="h-[34px] w-auto" />
        <div class="flex flex-col">
          <div class="flex items-center gap-fluid-sm">
            <p class="prose-text-md m-0">{{ option.label }}</p>
            <PTag v-for="tag in option.tags" :key="tag" color="notification-info-soft" :compact="true">
              {{ tag }}
            </PTag>
          </div>
          <p class="prose-text-2xs m-0">{{ option.description }}</p>
        </div>
      </div>
    </PSelectOption>
  </PSelect>
</template>

<script setup lang="ts">
import {
  PSelect,
  PSelectOption,
  PTag,
  PText,
  type SelectChangeEventDetail,
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

const value = ref<string | undefined>(undefined);
const options = ref<Option[]>(optionsData);
const selectedOption = ref<Option | undefined>(undefined);

function onChange(e: SelectChangeEventDetail) {
  value.value = e.value;
  selectedOption.value = options.value.find((option) => option.value === e.value);
}
</script>
