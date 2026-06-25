<script setup lang="ts">
  import { PModelSignature } from '@porsche-design-system/components-vue';
</script>

<template>
  <PModelSignature :safeZone="false" class="[--p-model-signature-width:auto]">
    <video poster="assets/ocean.jpg" src="assets/ocean.mp4" :autoPlay="true" :playsInline="true" :loop="true" :muted="true"></video>
  </PModelSignature>
</template>
