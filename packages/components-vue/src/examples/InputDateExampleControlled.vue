<script setup lang="ts">
import {
  type InputDateInputEventDetail,
  PInputDate,
  type PInputDateProps,
  PText,
} from '@porsche-design-system/components-vue';
import { computed, ref } from 'vue';

const value = ref<PInputDateProps['value']>('');

const onInput = (e: CustomEvent<InputDateInputEventDetail>) => {
  value.value = (e.target as HTMLInputElement).value;
};

const debugText = computed(() => {
  return `Value: ${value.value}`;
});
</script>

<template>
  <PInputDate :name="'some-name'" :label="'Some Label'" :value="value" @input="onInput" />
  <PText>{{ debugText }}</PText>
</template>
