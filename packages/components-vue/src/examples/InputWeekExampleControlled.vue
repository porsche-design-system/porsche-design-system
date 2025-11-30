<script setup lang="ts">
  import { type InputWeekInputEventDetail, PInputWeek, PText } from '@porsche-design-system/components-vue';
  import { computed, ref } from 'vue';

  const value = ref<string>('');

  const onInput = (e: InputWeekInputEventDetail) => {
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
