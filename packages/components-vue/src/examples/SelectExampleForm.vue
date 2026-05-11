<template>
  <form @submit.prevent="onSubmit" @reset.prevent="onReset" class="flex flex-col gap-fluid-sm">
    <PSelect v-model:value="form.mySelect" :name="'mySelect'" :label="'Some Label'">
      <PSelectOption :value="'a'">Option A</PSelectOption>
      <PSelectOption :value="'b'">Option B</PSelectOption>
      <PSelectOption :value="'c'">Option C</PSelectOption>
      <PSelectOption :value="'d'">Option D</PSelectOption>
      <PSelectOption :value="'e'">Option E</PSelectOption>
      <PSelectOption :value="'f'">Option F</PSelectOption>
    </PSelect>
    <div class="flex gap-fluid-sm">
      <PButton type="submit">Submit</PButton>
      <PButton type="reset">Reset</PButton>
    </div>
    <PText>Last submitted data: {{ submittedValue }}</PText>
  </form>
</template>

<script setup lang="ts">
import { PButton, PSelect, PSelectOption, PText } from '@porsche-design-system/components-vue';
import { reactive, ref } from 'vue';

const form = reactive({
  mySelect: undefined,
});

const submittedValue = ref();

const onSubmit = () => {
  submittedValue.value = JSON.stringify(form);
};

const onReset = () => {
  form.mySelect = undefined;
};
</script>


