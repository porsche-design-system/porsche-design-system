<script setup lang="ts">
import { type InputTextInputEventDetail, PInputText, PText } from '@porsche-design-system/components-vue';
import { computed, ref } from 'vue';

const value = ref<string>('');

const onInput = (e: InputTextInputEventDetail) => {
  console.log(e);
  value.value = (e.target as HTMLInputElement).value;
};

const debugText = computed(() => {
  return `Value: ${value.value}`;
});
</script>

<template>
  <PInputText :name="'some-name'" :label="'Some Label'" :value="value" @input="onInput" />
  <PText>{{ debugText }}</PText>
</template>
