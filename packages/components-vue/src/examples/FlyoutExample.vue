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
  <PFlyout :open="isFlyoutOpen" :position="'right'" @dismiss="onDismiss">
    <PText>Some content that dynamically scales the width of the flyout.</PText>
  </PFlyout>
</template>
