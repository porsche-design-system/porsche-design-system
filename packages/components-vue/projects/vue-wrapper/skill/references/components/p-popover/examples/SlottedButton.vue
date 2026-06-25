<script setup lang="ts">
  import { PButtonPure, PPopover } from '@porsche-design-system/components-vue';
</script>

<template>
  <PPopover>
    <PButtonPure :hideLabel="true" icon="car" slot="button">
      More information
    </PButtonPure>
    Some additional content.
  </PPopover>
</template>
