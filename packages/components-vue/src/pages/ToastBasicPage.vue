<script setup lang="ts">
  import { ToastComponent } from '../components';
</script>

<template>
  <div class="playground light">
    <ToastComponent text="Some message" />
  </div>
</template>

<style scoped>
  .playground {
    height: 300px;
    padding: 0;
    transform: translateX(0);
    border: 1px solid deeppink;
  }
</style>
