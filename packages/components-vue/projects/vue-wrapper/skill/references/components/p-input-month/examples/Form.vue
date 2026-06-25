<template>
  <form @submit.prevent="onSubmit" @reset.prevent="onReset" class="flex flex-col gap-fluid-sm">
    <PInputMonth v-model:value="form.myInputMonth" :name="'myInputMonth'" :label="'Some Label'" />
    <div class="flex gap-fluid-sm">
      <PButton type="submit">Submit</PButton>
      <PButton type="reset">Reset</PButton>
    </div>
    <PText>Last submitted data: {{ submittedValue }}</PText>
  </form>
</template>

<script setup lang="ts">
  import { PButton, PInputMonth, PText } from '@porsche-design-system/components-vue';
  import { reactive, ref } from 'vue';

  const form = reactive({
    myInputMonth: '',
  });

  const submittedValue = ref();

  const onSubmit = () => {
    submittedValue.value = JSON.stringify(form);
  };

  const onReset = () => {
    form.myInputMonth = '';
  };
</script>
