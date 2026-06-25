<script setup lang="ts">
  import { PLink } from '@porsche-design-system/components-vue';
</script>

<template>
  <div class="flex gap-static-sm">
    <PLink href="https://porsche.com" icon="phone">
      Some label
    </PLink>
    <PLink href="https://porsche.com" iconSource="assets/icon-custom-kaixin.svg" :hideLabel="true">
      Some label
    </PLink>
  </div>
</template>
