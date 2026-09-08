<script setup lang="ts">
import {
  type InputUrlInputEventDetail,
  PInputUrl,
  type PInputUrlProps,
  PText,
} from '@porsche-design-system/components-vue';
import { computed, ref } from 'vue';

const value = ref<PInputUrlProps['value']>('');

const onInput = (e: CustomEvent<InputUrlInputEventDetail>) => {
  value.value = (e.target as HTMLInputElement).value;
};

const debugText = computed(() => {
  return `Value: ${value.value}`;
});
</script>

<template>
  <PInputUrl :name="'some-name'" :label="'Some Label'" :value="value" @input="onInput" />
  <PText>{{ debugText }}</PText>
</template>
