<script setup lang="ts">
  import PButton from '../../projects/vue-wrapper/src/lib/components/button.wrapper.vue';
  import { ref } from 'vue';

  const tmp = ref(false);

  function log() {
    tmp.value = true;
  }
</script>

<template>
  <PButton @click="log" :loading="tmp" :style="{ fontSize: '26px' }" class="dark">Some label</PButton>
</template>
