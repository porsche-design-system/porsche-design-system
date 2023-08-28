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

  // no need for reactivity to be in sync with Angular and React
  load(props); // runtime prefix or cdn change is not supported
  provide(prefixInjectionKey, props.prefix); // eslint-disable-line vue/no-setup-props-destructure
</script>

<template><slot /></template>
