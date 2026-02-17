<script setup lang="ts">
import { type InputTelInputEventDetail, PInputTel, PText } from '@porsche-design-system/components-vue';
import { computed, ref } from 'vue';

const value = ref<string>('');

const onInput = (e: CustomEvent<InputTelInputEventDetail>) => {
  value.value = (e.target as HTMLInputElement).value;
};

const debugText = computed(() => {
  return `Value: ${value.value}`;
});
</script>

<template>
  <PInputTel :name="'some-name'" :label="'Some Label'" :value="value" @input="onInput" />
  <PText>{{ debugText }}</PText>
</template>
