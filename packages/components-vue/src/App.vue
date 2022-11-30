<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router';
  import { porscheDesignSystemProvider } from '../projects/vue-wrapper/src/utils';
  porscheDesignSystemProvider();
</script>

<template>
  <header>
    <nav>
      <p-link-pure icon="none">
        <RouterLink to="/">Custom Button</RouterLink>
      </p-link-pure>
      <p-link-pure icon="none">
        <RouterLink to="/customSwitch">Custom Switch</RouterLink>
      </p-link-pure>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
  nav {
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
</style>
