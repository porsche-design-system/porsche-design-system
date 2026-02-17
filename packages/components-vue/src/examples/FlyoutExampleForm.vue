<script setup lang="ts">
import { PButton, PCheckbox, PFlyout, PHeading, PText, PTextarea } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const isFlyoutOpen = ref(false);
const onOpen = (): void => {
  isFlyoutOpen.value = true;
};
const onDismiss = (): void => {
  isFlyoutOpen.value = false;
};
const checkboxValue = ref<string>('none');
const textareaValue = ref<string>('none');
const onSubmit = (e: Event) => {
  const formData = new FormData(e.target as HTMLFormElement);
  checkboxValue.value = formData.get('some-checkbox')?.toString() || 'none';
  textareaValue.value = formData.get('some-textarea')?.toString() || 'none';
};
</script>

<template>
  <PButton type="button" :aria="{ 'aria-haspopup': 'dialog' }" @click="onOpen">Open Flyout</PButton>
  <PFlyout :open="isFlyoutOpen" :position="'end'" @dismiss="onDismiss">
    <PHeading slot="header" size="large" tag="h2">Some Heading</PHeading>
    <form id="some-form" @submit.prevent="onSubmit">
      <PCheckbox name="some-checkbox" label="Some Label"></PCheckbox>
      <PTextarea name="some-textarea" label="Some Label"></PTextarea>
    </form>
    <PButton slot="footer" type="submit" form="some-form">Submit</PButton>
    <PButton slot="footer" type="reset" variant="secondary" form="some-form">Reset</PButton>
    <PText slot="sub-footer">
      Last submitted data:
      <br />
      <br />
      checkbox: {{checkboxValue}}
      <br />
      textarea: {{textareaValue}}
    </PText>
  </PFlyout>
</template>
