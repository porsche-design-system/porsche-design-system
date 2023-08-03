<script setup lang="ts">
  import { load } from '@porsche-design-system/components-js';
  import { provide } from 'vue';
  import { prefixInjectionKey } from './utils';

  type Props = {
    prefix?: string;
    cdn?: 'auto' | 'cn';
  };

  const props = withDefaults(defineProps<Props>(), {
    prefix: '',
  });

  load(props); // runtime prefix or cdn change is not supported
  provide(prefixInjectionKey, props.prefix);
</script>

<template><slot /></template>
