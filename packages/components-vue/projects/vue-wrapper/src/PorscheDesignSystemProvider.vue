<script setup lang="ts">
  import { onUpdated, provide, ref } from 'vue';
  import { load } from '@porsche-design-system/components-js';
  import { prefixInjectionKey, themeInjectionKey } from './utils';
  import type { Theme } from './lib/types';

  type Props = {
    prefix?: string;
    cdn?: 'auto' | 'cn';
    theme?: Theme;
  };

  const theme = ref<Theme>('light');

  const props = withDefaults(defineProps<Props>(), {
    prefix: '',
    theme: 'light',
  });

  onUpdated(() => {
    theme.value = props.theme;
  });

  // no need for reactivity to be in sync with Angular and React
  load(props); // runtime prefix or cdn change is not supported
  provide(prefixInjectionKey, props.prefix); // eslint-disable-line vue/no-setup-props-destructure
  provide(themeInjectionKey, theme); // eslint-disable-line vue/no-setup-props-destructure
</script>

<template><slot /></template>
