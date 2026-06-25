<script setup lang="ts">
  import { ref } from 'vue';
  import { PBanner, PButton } from '@porsche-design-system/components-vue';

  const open = ref(false);

  const onClick = () => {
    open.value = true;
  }
  const onDismiss = () => {
    open.value = false;
  }
</script>

<template>
  <PButton type="button" @click="onClick">
    Open Banner
  </PButton>

  <PBanner :open="open" heading="Some Heading" headingTag="h3" description="Some Description" @dismiss="onDismiss"></PBanner>
</template>
