<script setup lang="ts">
  import router, { routes } from './router';
  import { ref } from 'vue';
  import '@porsche-design-system/shared/css/styles.css';
  import { PorscheDesignSystemProvider } from '../projects/vue-wrapper/src/public-api';

  const options = routes.map((item) => ({ path: item.path, name: item.name }));
  const selected = ref(options[0].path);

  const onChange = (e: Event) => {
    const { value } = e.target as HTMLSelectElement;
    selected.value = value;
    router.push(value);
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

    <div id="app">
      <RouterView />
    </div>
  </PorscheDesignSystemProvider>
</template>
