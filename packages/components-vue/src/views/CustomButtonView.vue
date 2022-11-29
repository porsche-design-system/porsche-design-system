<script setup lang="ts">
  import CustomButton from '../components/CustomButton.vue';
  import { ref } from 'vue';

  const tmp = ref(false);

  function log() {
    tmp.value = true;
  }
</script>

<template>
  <CustomButton :onClick="log" label="Some label" :loading="tmp" :style="{ fontSize: '26px' }" class="dark" />
</template>
