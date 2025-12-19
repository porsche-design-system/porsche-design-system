<script setup lang="ts">
import { onMounted, provide, ref } from 'vue';
import { useRouter } from 'vue-router';
import '@porsche-design-system/shared/css/styles.css';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-vue';
import { type Theme, themeInjectionKey } from './main';
import { routes } from './router';

const router = useRouter();
const route = ref<string>('');
const theme = ref<Theme>('light');
const themes: Theme[] = ['light', 'dark', 'auto'];
const isWithinIFrame: boolean = window.location !== window.parent.location;

provide(themeInjectionKey, theme);

onMounted(async () => {
  await router.isReady();
  route.value = router.currentRoute.value.path;
});
</script>

<template>
  <select
    v-if="!isWithinIFrame"
    name="route"
    v-model="route"
    @change="router.push(($event.target as HTMLSelectElement).value)"
  >
    <option disabled value="/">Select a page</option>
    <option v-for="(item, index) in routes" :key="index" :value="item.path" :disabled="item.isDisabled">
      {{ item.name }}
    </option>
  </select>

  <select v-if="!isWithinIFrame" name="theme" v-model="theme">
    <option v-for="(item, index) in themes" :key="index" :value="item">{{ item }}</option>
  </select>

  <div id="app" :class="theme">
    <PorscheDesignSystemProvider cdn="auto">
      <RouterView />
    </PorscheDesignSystemProvider>
  </div>
</template>
