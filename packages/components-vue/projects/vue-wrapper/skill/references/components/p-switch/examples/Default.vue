<script setup lang="ts">
  import { ref } from 'vue';
  import { PSwitch, type SwitchUpdateEventDetail } from '@porsche-design-system/components-vue';

  const checked = ref(false);

  const onUpdate = (e: CustomEvent<SwitchUpdateEventDetail>) => {
    checked.value = e.detail.checked;
  }
</script>

<template>
  <PSwitch :checked="checked" @update="onUpdate">
    Some label
  </PSwitch>
</template>
