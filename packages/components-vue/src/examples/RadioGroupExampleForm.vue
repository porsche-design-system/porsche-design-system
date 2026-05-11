<template>
  <form @submit.prevent="onSubmit" @reset.prevent="onReset" class="flex flex-col gap-fluid-sm">
    <PRadioGroup v-model:value="form.myRadioGroup" :name="'myRadioGroup'" :label="'Some Label'">
      <PRadioGroupOption label="Option A" :value="'a'"></PRadioGroupOption>
      <PRadioGroupOption label="Option B" :value="'b'"></PRadioGroupOption>
      <PRadioGroupOption label="Option C" :value="'c'"></PRadioGroupOption>
      <PRadioGroupOption label="Option D" :value="'d'"></PRadioGroupOption>
      <PRadioGroupOption label="Option E" :value="'e'"></PRadioGroupOption>
      <PRadioGroupOption label="Option F" :value="'f'"></PRadioGroupOption>
    </PRadioGroup>
    <div class="flex gap-fluid-sm">
      <PButton type="submit">Submit</PButton>
      <PButton type="reset">Reset</PButton>
    </div>
    <PText>Last submitted data: {{ submittedValue }}</PText>
  </form>
</template>

<script setup lang="ts">
import { PButton, PRadioGroup, PRadioGroupOption, PText } from '@porsche-design-system/components-vue';
import { reactive, ref } from 'vue';

const form = reactive({
  myRadioGroup: '',
});

const submittedValue = ref();

const onSubmit = () => {
  submittedValue.value = JSON.stringify(form);
};

const onReset = () => {
  form.myRadioGroup = '';
};
</script>

