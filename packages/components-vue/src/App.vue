<script setup lang="ts">
  import router, { routes } from './router';
  import { ref } from 'vue';
  import '@porsche-design-system/shared/css/styles.css';
  import { PorscheDesignSystemProvider } from '@porsche-design-system/components-vue';

  const options = routes.map(({ path, name }) => ({ path, name }));
  const selected = ref();

  const onChange = (e: Event) => {
    const { value } = e.target as HTMLSelectElement;
    selected.value = value;
    router.push(value);
  };

  // global click handler for custom elements with href property
  const onContentClick = (e: MouseEvent) => {
    const { href } = e.target as any;
    if (href?.startsWith('/')) {
      e.preventDefault();
      router.push(href);
    }
  };
</script>

<template>
  <PorscheDesignSystemProvider>
    <select :value="selected" @change="onChange($event)">
      <option disabled value="">Select a page</option>
      <option v-for="(item, index) in options" v-bind:key="index" :value="item.path">
        {{ item.name }}
      </option>
    </select>

    <div id="app" @click="onContentClick">
      <RouterView />
    </div>
  </PorscheDesignSystemProvider>
</template>
