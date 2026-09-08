<script setup lang="ts">
import {
  type InputWeekInputEventDetail,
  PInputWeek,
  type PInputWeekProps,
  PText,
} from '@porsche-design-system/components-vue';
import { computed, ref } from 'vue';

const value = ref<PInputWeekProps['value']>('');

const onInput = (e: CustomEvent<InputWeekInputEventDetail>) => {
  value.value = (e.target as HTMLInputElement).value;
};

const debugText = computed(() => {
  return `Value: ${value.value}`;
});
</script>

<template>
  <PInputWeek :name="'some-name'" :label="'Some Label'" :value="value" @input="onInput" />
  <PText>{{ debugText }}</PText>
</template>
