<script setup lang="ts">
  import { PButton, PButtonGroup, PModal, PText } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const isModalOpen = ref(false);
  const onOpen = (): boolean => (isModalOpen.value = true);
  const onDismiss = (): boolean => (isModalOpen.value = false);
</script>

<template>
  <PButton :type="'button'" :aria="{ 'aria-haspopup': 'dialog' }" @click="onOpen"> Open Modal </PButton>
  <PModal :open="isModalOpen" @dismiss="onDismiss">
    <PText>Some Content</PText>
    <PButtonGroup :className="'footer'">
      <PButton>Save</PButton>
      <PButton :type="'button'" :variant="'tertiary'" :icon="'close'"> Close </PButton>
    </PButtonGroup>
  </PModal>
</template>
