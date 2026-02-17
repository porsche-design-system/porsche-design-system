<script setup lang="ts">
import { type InputSearchInputEventDetail, PInputSearch, PText } from '@porsche-design-system/components-vue';
import { computed, ref } from 'vue';

const value = ref<string>('');

const onInput = (e: CustomEvent<InputSearchInputEventDetail>) => {
  value.value = (e.target as HTMLInputElement).value;
};

const debugText = computed(() => {
  return `Value: ${value.value}`;
});
</script>

<template>
  <PInputSearch :name="'some-name'" :label="'Some Label'" :value="value" :indicator="true" :clear="true" @input="onInput" />
  <PText>{{ debugText }}</PText>
</template>
