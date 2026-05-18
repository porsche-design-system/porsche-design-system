<script setup lang="ts">
import {
  type InputPasswordInputEventDetail,
  PInputPassword,
  type PInputPasswordProps,
  PText,
} from '@porsche-design-system/components-vue';
import { computed, ref } from 'vue';

const value = ref<PInputPasswordProps['value']>('');

const onInput = (e: CustomEvent<InputPasswordInputEventDetail>) => {
  value.value = (e.target as HTMLInputElement).value;
};

const debugText = computed(() => {
  return `Value: ${value.value}`;
});
</script>

<template>
  <PInputPassword :name="'some-name'" :label="'Some Label'" :value="value" @input="onInput" />
  <PText>{{ debugText }}</PText>
</template>
