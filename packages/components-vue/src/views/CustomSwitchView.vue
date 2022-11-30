<script setup lang="ts">
  import { ref } from 'vue';
  import CustomSwitch from '@/components/CustomSwitch.vue';

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
  <CustomSwitch :onSwitchChange="onSwitchClick">Some switch</CustomSwitch>
</template>
