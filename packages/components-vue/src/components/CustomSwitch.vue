<script setup lang="ts">
  import { onMounted, onUpdated, ref } from 'vue';
  import { addEventListenerToElementRef, syncProperties, usePrefix } from '../../projects/vue-wrapper/src/utils';
  import type { SwitchChangeEvent } from '@porsche-design-system/components-react';

  const WebComponentTag = usePrefix('p-switch');

  const props = withDefaults(defineProps(), {});
  const pdsComponentRef = ref<HTMLElement>({} as any);

  const emit = defineEmits<{ (e: 'switchChange', value: SwitchChangeEvent): void }>();

  onMounted(() => {
    syncProperties(props, pdsComponentRef.value);
    addEventListenerToElementRef(pdsComponentRef.value, 'switchChange', emit);
  });

  onUpdated(() => {
    syncProperties(props, pdsComponentRef.value);
  });
</script>

<template>
  <WebComponentTag ref="pdsComponentRef"><slot /></WebComponentTag>
</template>
