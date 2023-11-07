<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import '@porsche-design-system/shared/css/styles.css';
  import { PorscheDesignSystemProvider, type Theme } from '@porsche-design-system/components-vue';
  import { routes } from './router';

  const router = useRouter();
  const route = ref<string>('');
  const theme = ref<Theme>('light');

  onMounted(async () => {
    await router.isReady();
    route.value = router.currentRoute.value.path;
  });
</script>

<template>
  <PorscheDesignSystemProvider cdn="auto" :theme="theme">
    <select v-model="route" @change="router.push(($event.target as HTMLSelectElement).value)">
      <option disabled value="">Select a page</option>
      <option v-for="(item, index) in routes" v-bind:key="index" :value="item.path" :disabled="item.isDisabled">
        {{ item.name }}
      </option>
    </select>

    <select v-model="theme">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="auto">Auto</option>
    </select>

    <div id="app">
      <RouterView />
    </div>
  </PorscheDesignSystemProvider>
</template>
