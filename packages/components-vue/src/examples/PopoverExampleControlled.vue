<script setup lang="ts">
import { PButtonPure, PPopover } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const isPopoverOpen = ref(false);
const onOpen = (): void => {
  isPopoverOpen.value = true;
};
const onDismiss = (): void => {
  isPopoverOpen.value = false;
};
</script>

<template>
  <PPopover :open="isPopoverOpen" @dismiss="onDismiss">
    <PButtonPure slot="button" :hideLabel="true" :aria="{ 'aria-expanded': 'false' }" @click="onOpen" icon="information">
    More information
    </PButtonPure>
    Some additional content with some <a href="#">link</a>.
  </PPopover>
</template>
