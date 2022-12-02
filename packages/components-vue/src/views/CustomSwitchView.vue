<script setup lang="ts">
  import { ref } from 'vue';
  import PSwitch from '../../projects/vue-wrapper/src/lib/components/switch.wrapper.vue';

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
  <PSwitch :onSwitchChange="onSwitchClick">Some switch</PSwitch>
</template>
