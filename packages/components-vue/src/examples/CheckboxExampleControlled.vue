<script setup lang="ts">
import { type CheckboxChangeEventDetail, PCheckbox, PText } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const state = ref<{ [key: string]: boolean }>({
  'some-name': true,
});

const onChange = (e: CustomEvent<CheckboxChangeEventDetail>) => {
  const { name, checked } = e.target as HTMLInputElement;
  state.value[name] = checked;
};
</script>

<template>
  <PCheckbox
    :name="'some-name'"
    :label="'Some Label'"
    :checked="state['some-name']"
    :value="'some-value'"
    @change="onChange"
  />
  <PText>some-name: {{ state['some-name'] }}</PText>
</template>
