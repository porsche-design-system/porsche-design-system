<script setup lang="ts">
  import { PLinkPure } from '@porsche-design-system/components-vue';
</script>

<template>
  <div class="flex gap-static-sm">
    <PLinkPure href="https://porsche.com" icon="phone">
      Some label
    </PLinkPure>
    <PLinkPure href="https://porsche.com" iconSource="assets/icon-custom-kaixin.svg" :hideLabel="true">
      Some label
    </PLinkPure>
  </div>
</template>
