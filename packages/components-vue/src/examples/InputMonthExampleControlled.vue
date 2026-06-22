<script setup lang="ts">
import {
  type InputMonthInputEventDetail,
  PInputMonth,
  type PInputMonthProps,
  PText,
} from '@porsche-design-system/components-vue';
import { computed, ref } from 'vue';

const value = ref<PInputMonthProps['value']>('');

const onInput = (e: CustomEvent<InputMonthInputEventDetail>) => {
  value.value = (e.target as HTMLInputElement).value;
};

const debugText = computed(() => {
  return `Value: ${value.value}`;
});
</script>

<template>
  <PInputMonth :name="'some-name'" :label="'Some Label'" :value="value" @input="onInput" />
  <PText>{{ debugText }}</PText>
</template>
