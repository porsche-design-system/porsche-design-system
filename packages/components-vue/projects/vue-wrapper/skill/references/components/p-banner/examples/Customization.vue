<script setup lang="ts">
  import { ref } from 'vue';
  import { PBanner, PButton, PHeading, PLinkPure, PText } from '@porsche-design-system/components-vue';

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

  <PBanner :open="open" class="[--p-banner-top:8px] [--p-banner-bottom:8px] [--p-banner-inset-x:8px] [--p-banner-max-w:70ch]" @dismiss="onDismiss">
    <PHeading slot="heading" size="sm" weight="semibold">
      Some heading
    </PHeading>
    <PText slot="description">
      Some description. You can also add inline 
      <PLinkPure href="https://porsche.com" icon="none" :underline="true">
        links
      </PLinkPure>
       to route to another page.
    </PText>
  </PBanner>
</template>
