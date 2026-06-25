<script setup lang="ts">
import {
  PButton,
  PCheckbox,
  PSelect,
  PSelectOption,
  type PSelectProps,
  PText,
} from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const lastSubmittedData = ref<string>('none');
const isRequired = ref<PSelectProps['required']>(true);
const hasDeselection = ref<boolean>(false);

const onChangeRequired = () => {
  isRequired.value = !isRequired.value;
};

const onChangeDeselection = () => {
  hasDeselection.value = !hasDeselection.value;
};

const onSubmit = (e: Event) => {
  const formData = new FormData(e.target as HTMLFormElement);
  lastSubmittedData.value = formData.get('options')?.toString() || 'none';
};
</script>

<template>
  <div class="flex flex-col gap-static-sm">
    <PCheckbox label="Required" name="required" :checked="isRequired" @update="onChangeRequired" />
    <PCheckbox label="Allow deselection" name="deselection" :checked="hasDeselection" @update="onChangeDeselection" />
  </div>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-fluid-sm mt-fluid-sm">
    <p-select name="options" label="Some Label" :required="isRequired">
      <p-select-option v-if="hasDeselection"></p-select-option>
      <p-select-option value="1">Option 1</p-select-option>
      <p-select-option value="2">Option 2</p-select-option>
      <p-select-option value="3">Option 3</p-select-option>
    </p-select>
    <PButton type="submit">Submit</PButton>
  </form>

  <PText>Last submitted data: {{ lastSubmittedData }}</PText>
</template>
