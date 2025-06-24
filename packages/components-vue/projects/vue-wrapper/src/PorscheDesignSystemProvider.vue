<script setup lang="ts">
import {onMounted, provide, ref, watch} from 'vue';
import { load } from '@porsche-design-system/components-js';
import { prefixInjectionKey, themeInjectionKey } from './utils';
import type { Theme } from './lib/types';

type Props = {
  prefix?: string;
  cdn?: 'auto' | 'cn';
  theme?: Theme; // since theme exists on almost every component, it is defined here kind of like a global prop
  // other component configurations should probably go into a separate `components`, `componentProps` or `componentDefaults`
  // property similar to https://mui.com/material-ui/customization/theme-components/
};

const props = withDefaults(defineProps<Props>(), {
  prefix: '',
  theme: 'light',
});

const themeRef = ref<Theme>(props.theme);

onMounted(() => {
  load(props); // runtime prefix or cdn change is not supported
});

watch(() => props.theme, (newTheme) => {
  themeRef.value = newTheme;
});

provide(prefixInjectionKey, props.prefix);
provide(themeInjectionKey, themeRef);
</script>

<template><slot /></template>
