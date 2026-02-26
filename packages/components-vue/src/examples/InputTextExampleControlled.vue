<script setup lang="ts">
import { type InputTextInputEventDetail, PInputText, PText } from '@porsche-design-system/components-vue';
import { computed, ref } from 'vue';

const value = ref<string>('');

const onInput = (e: CustomEvent<InputTextInputEventDetail>) => {
  const target = e.target as HTMLElement & { value: string };

  if (target.value.length > 3) {
    const newValue = target.value.slice(0, 3);
    value.value = newValue;
    // The web component doesn't prevent native input, so we must manually reset the input element's value.
    // Vue won't re-render since setState with the truncated value doesn't trigger a change when it's already set.
    target.value = newValue;
  }
};

const debugText = computed(() => {
  return `Value: ${value.value}`;
});
</script>

<template>
  <PInputText :name="'some-name'" :label="'Some Label'" :value="value" @input="onInput" />
  <PText>{{ debugText }}</PText>
</template>
