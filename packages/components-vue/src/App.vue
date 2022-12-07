<script setup lang="ts">
  import router, { routes } from './router';
  import { ref } from 'vue';
  import '@porsche-design-system/shared/css/styles.css';
  import { porscheDesignSystemProvider } from '../projects/vue-wrapper/src/utils';

  // TODO: solve in a different way
  porscheDesignSystemProvider();

  const options = routes.map((item) => ({ path: item.path, name: item.name }));
  const selected = ref(options[0].path);

  const onChange = (e: Event & { target: HTMLSelectElement }) => {
    const { value } = e.target;
    selected.value = value;
    router.push(value);
  };
</script>

<template>
  <select :value="selected" @change="onChange($event)">
    <option disabled value="">Select a page</option>
    <option v-for="(item, index) in options" v-bind:key="index" :disabled="item.isDisabled" :value="item.path">
      {{ item.name }}
    </option>
  </select>

  <div id="app">
    <RouterView />
  </div>
</template>
