<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import '@porsche-design-system/shared/css/styles.css';
  import { PorscheDesignSystemProvider, type Theme } from '@porsche-design-system/components-vue';
  import { routes } from './router';

  const router = useRouter();
  const route = ref<string>('');
  const theme = ref<Theme>('light');
  const themes: Theme[] = ['light', 'dark', 'auto'];

  onMounted(async () => {
    await router.isReady();
    route.value = router.currentRoute.value.path;
  });
</script>

<template>
  <PorscheDesignSystemProvider cdn="auto" :theme="theme">
    <select name="route" v-model="route" @change="router.push(($event.target as HTMLSelectElement).value)">
      <option disabled value="/">Select a page</option>
      <option v-for="(item, index) in routes" :key="index" :value="item.path" :disabled="item.isDisabled">
        {{ item.name }}
      </option>
    </select>

    <select name="theme" v-model="theme">
      <option v-for="(item, index) in themes" :key="index" :value="item">{{ item }}</option>
    </select>

    <div id="app">
      <RouterView />
    </div>
  </PorscheDesignSystemProvider>
</template>
