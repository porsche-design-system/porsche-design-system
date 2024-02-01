<script setup lang="ts">
  import { PSelect, PSelectOption } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const lastSubmittedData = ref('none');
  const isRequired = ref(true);
  const hasDeselection = ref(false);

  const onChangeRequired = () => {
    isRequired.value = !isRequired.value;
  };

  const onChangeDeselection = () => {
    hasDeselection.value = !hasDeselection.value;
  };

  const handleSubmit = (e: Event) => {
    const formData = new FormData(e.target as HTMLFormElement);
    lastSubmittedData.value = formData.get('options')?.toString() || 'none';
  };
</script>

<template>
  <label>
    <input type="checkbox" name="required" :checked="isRequired" @change="onChangeRequired" />
    Required
  </label>
  <br />
  <label>
    <input type="checkbox" name="deselection" :checked="hasDeselection" @change="onChangeDeselection" />
    Allow deselection
  </label>
  <br />

  <form @submit.prevent="handleSubmit">
    <p-select name="options" label="Some Label" :required="true">
      <p-select-option v-if="hasDeselection"></p-select-option>
      <p-select-option value="1">Option 1</p-select-option>
      <p-select-option value="2">Option 2</p-select-option>
      <p-select-option value="3">Option 3</p-select-option>
    </p-select>
    <button type="submit">Submit</button>
  </form>

  <p>Last submitted data: {{ lastSubmittedData }}</p>
</template>
