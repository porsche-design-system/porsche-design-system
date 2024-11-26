<script setup lang="ts">
import {
  PButton,
  PButtonGroup,
  PCheckbox,
  PFlyout,
  PHeading,
  PText,
  PTextarea,
} from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const isFlyoutOpen = ref(false);
const onOpen = (): void => {
  isFlyoutOpen.value = true;
};
const onDismiss = (): void => {
  isFlyoutOpen.value = false;
};
const lastSubmittedData = ref<string>('checkbox: none<br/>textarea: none');
const onSubmit = (e: Event) => {
  const formData = new FormData(e.target as HTMLFormElement);
  lastSubmittedData.value = `checkbox: ${formData.get('some-checkbox') || 'none'} <br/>textarea: ${formData.get('some-textarea') || 'none'}`;
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
    <PButtonGroup slot="footer">
      <PButton type="submit" form="some-form">Submit</PButton>
      <PButton type="reset" variant="secondary" form="some-form">Reset</PButton>
    </PButtonGroup>
    
    <PText slot="sub-footer" v-html="'Last submitted data:<br/><br/> ' + lastSubmittedData"></PText>
  </PFlyout>
</template>
