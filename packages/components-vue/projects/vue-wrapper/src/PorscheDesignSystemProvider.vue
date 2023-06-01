<script setup lang="ts">
  import { load } from '@porsche-design-system/components-js';
  import { provide } from 'vue';
  import { prefixInjectionKey } from './utils';

  const { prefix } = withDefaults(defineProps<{ prefix?: string }>(), {
    prefix: '',
  });

  load({ prefix });
  provide(prefixInjectionKey, prefix);
</script>

<template><slot /></template>
