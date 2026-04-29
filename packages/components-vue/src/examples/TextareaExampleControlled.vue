<script setup lang="ts">
import { PText, PTextarea, type TextareaInputEventDetail } from '@porsche-design-system/components-vue';
import { computed, ref } from 'vue';

const value = ref<string>('');

const onInput = (e: CustomEvent<TextareaInputEventDetail>) => {
  value.value = (e.target as HTMLTextAreaElement).value;
};

const debugText = computed(() => {
  return `Value: ${value.value}`;
});
</script>

<template>
  <PTextarea :name="'some-name'" :label="'Some Label'" :value="value" @input="onInput" />
  <PText>{{ debugText }}</PText>
</template>
