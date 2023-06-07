<script setup lang="ts">
  import { PHeading, PFlyout, PButton, PText } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const isFlyoutOpen = ref(false);
  const onOpen = (): void => {
    isFlyoutOpen.value = true;
  };
  const onDismiss = (): void => {
    isFlyoutOpen.value = false;
  };
</script>

<template>
  <PButton type="button" :aria="{ 'aria-haspopup': 'dialog' }" @click="onOpen">Open Flyout</PButton>
  <PFlyout :open="isFlyoutOpen" @dismiss="onDismiss" :aria="{ 'aria-label': 'Sticky Heading' }">
    <slot name="header">
      <PHeading :tag="'h5'" :size="'large'">Sticky Heading</PHeading>
      <PText size="small">Sticky header text</PText>
    </slot>
    <PText style="width: 50vw; height: 100vh">Some Content</PText>
    <slot name="footer">
      <PButton type="button">Footer Button</PButton>
    </slot>
    <slot name="sub-footer">
      <PText>Some Sub Footer Content</PText>
    </slot>
  </PFlyout>
</template>
