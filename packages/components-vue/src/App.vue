<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import '@porsche-design-system/shared/css/styles.css';
  import { PorscheDesignSystemProvider, type Theme } from '@porsche-design-system/components-vue';
  import { routes } from './router';

  const router = useRouter();
  const route = useRoute();

  // --- ROUTE SELECT LOGIC ---
  const selectedRoute = ref<string>('');
  onMounted(async () => {
    await router.isReady();
    selectedRoute.value = route.path;
  });
  watch(selectedRoute, (newPath) => {
    if (newPath && newPath !== route.path) {
      router.push(newPath).catch(() => {});
    }
  });
  watch(
    () => route.path,
    (newPath) => {
      if (selectedRoute.value !== newPath) {
        selectedRoute.value = newPath;
      }
    }
  );

  // --- THEME SELECT LOGIC ---
  const themes: Theme[] = ['light', 'dark', 'auto'];

  let initialTheme: Theme = 'light';
  const qTheme = route.query.theme;
  if (Array.isArray(qTheme)) {
    if (themes.includes(qTheme[0] as Theme)) {
      initialTheme = qTheme[0] as Theme;
    }
  } else if (typeof qTheme === 'string') {
    if (themes.includes(qTheme as Theme)) {
      initialTheme = qTheme as Theme;
    }
  }
  const theme = ref<Theme>(initialTheme);

  watch(theme, (newTheme) => {
    router
      .replace({
        query: {
          ...route.query,
          theme: newTheme,
        },
      })
      .catch(() => {
        // ignore navigation errors
      });
  });

  watch(
    () => route.query.theme,
    (newQ) => {
      let newTheme: Theme | null = null;
      if (Array.isArray(newQ)) {
        if (themes.includes(newQ[0] as Theme)) {
          newTheme = newQ[0] as Theme;
        }
      } else if (typeof newQ === 'string') {
        if (themes.includes(newQ as Theme)) {
          newTheme = newQ as Theme;
        }
      }
      if (newTheme && newTheme !== theme.value) {
        theme.value = newTheme;
      }
    }
  );

  // Determine if inside an iframe, to conditionally show selects
  const isWithinIFrame: boolean = window.location !== window.parent.location;
</script>

<template>
  <select v-if="!isWithinIFrame" name="route" v-model="selectedRoute">
    <option disabled value="">Select a page</option>
    <option v-for="(item, index) in routes" :key="index" :value="item.path" :disabled="item.isDisabled">
      {{ item.name }}
    </option>
  </select>

  <select v-if="!isWithinIFrame" name="theme" v-model="theme">
    <option v-for="(item, index) in themes" :key="index" :value="item">
      {{ item }}
    </option>
  </select>

  <div id="app">
    <PorscheDesignSystemProvider cdn="auto" :theme="theme">
      <RouterView />
    </PorscheDesignSystemProvider>
  </div>
</template>
