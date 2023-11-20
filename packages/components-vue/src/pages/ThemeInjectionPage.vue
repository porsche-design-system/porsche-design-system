<script setup lang="ts">
  import { ref } from 'vue';
  import { PButton } from '@porsche-design-system/components-vue';

  const isVisible = ref(false);
</script>

<template>
  <div class="playground light">
    <PButton :theme="'light'">Light Button</PButton>
    <PButton :theme="'dark'">Dark Button</PButton>
    <br />
    <PButton @click="isVisible = !isVisible">Show/Hide Button</PButton>
    <PButton v-if="isVisible">Global Theme</PButton>
  </div>
</template>
