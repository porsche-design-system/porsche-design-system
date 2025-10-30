<template>
  <form @submit.prevent="onSubmit" @reset.prevent="onReset" class="flex flex-col gap-fluid-sm">
    <PSegmentedControl v-model:value="form.mySegmentedControl" :name="'mySegmentedControl'" :label="'Some Label'">
      <PSegmentedControlItem :value="1">Option 1</PSegmentedControlItem>
      <PSegmentedControlItem :value="2">Option 2</PSegmentedControlItem>
      <PSegmentedControlItem :value="3">Option 3</PSegmentedControlItem>
      <PSegmentedControlItem :value="4">Option 4</PSegmentedControlItem>
      <PSegmentedControlItem :value="5">Option 5</PSegmentedControlItem>
    </PSegmentedControl>
    <div class="flex gap-fluid-sm">
      <PButton type="submit">Submit</PButton>
      <PButton type="reset">Reset</PButton>
    </div>
    <PText>Last submitted data: {{ submittedValue }}</PText>
  </form>
</template>

<script setup lang="ts">
import { PButton, PSegmentedControl, PSegmentedControlItem, PText } from '@porsche-design-system/components-vue';
import { reactive, ref } from 'vue';

const form = reactive({
  mySegmentedControl: undefined,
});

const submittedValue = ref();

const onSubmit = () => {
  submittedValue.value = JSON.stringify(form);
};

const onReset = () => {
  form.mySegmentedControl = undefined;
};
</script>


