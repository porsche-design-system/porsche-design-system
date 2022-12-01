<script setup lang="ts">
  import PButton from '../../projects/vue-wrapper/src/lib/components/button.wrapper.vue';
  import { ref } from 'vue';

  const tmp = ref(false);
  const switchStatus = ref(false);

  function log() {
    tmp.value = true;
  }

  function onSwitchClick() {
    console.log('switch change');
    tmp.value = !tmp.value;
  }

  function onSwitchClick2() {
    console.log('switch change 2');
    tmp.value = !tmp.value;
  }
</script>

<template>
  <PButton @click="log" :loading="tmp" :style="{ fontSize: '26px' }" class="dark">Some label</PButton>
</template>
