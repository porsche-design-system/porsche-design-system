<template>
  <form @submit.prevent="onSubmit" @reset.prevent="onReset" class="flex flex-col gap-fluid-sm">
    <PMultiSelect v-model:value="form.myMultiSelect" :name="'myMultiSelect'" :label="'Some Label'">
      <PMultiSelectOption :value="'a'">Option A</PMultiSelectOption>
      <PMultiSelectOption :value="'b'">Option B</PMultiSelectOption>
      <PMultiSelectOption :value="'c'">Option C</PMultiSelectOption>
      <PMultiSelectOption :value="'d'">Option D</PMultiSelectOption>
      <PMultiSelectOption :value="'e'">Option E</PMultiSelectOption>
      <PMultiSelectOption :value="'f'">Option F</PMultiSelectOption>
    </PMultiSelect>
    <div class="flex gap-fluid-sm">
      <PButton type="submit">Submit</PButton>
      <PButton type="reset">Reset</PButton>
    </div>
    <PText>Last submitted data: {{ submittedValue }}</PText>
  </form>
</template>

<script setup lang="ts">
import { PButton, PMultiSelect, PMultiSelectOption, PText } from '@porsche-design-system/components-vue';
import { reactive, ref } from 'vue';

const form = reactive({
  myMultiSelect: [],
});

const submittedValue = ref();

const onSubmit = () => {
  submittedValue.value = JSON.stringify(form);
};

const onReset = () => {
  form.myMultiSelect = [];
};
</script>


