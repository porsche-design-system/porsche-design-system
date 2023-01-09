<script setup lang="ts">
  import { load } from '@porsche-design-system/components-js';
  import { provide } from 'vue';
  import { prefixInjectionKey } from './utils';

  const props = withDefaults(defineProps<{ prefix?: string }>(), {
    prefix: '',
  });

  load({ prefix: props.prefix });
  provide(prefixInjectionKey, props.prefix);
</script>

<template><slot /></template>
