<script setup lang="ts">
  import { PLink } from '@porsche-design-system/components-vue';
  import { useRouter } from 'vue-router';

  // history replace / push
  // useLink to detect active https://router.vuejs.org/api/#Functions-useLink
  // https://github.com/vuejs/vue-router/blob/dev/src/components/link.js

  const router = useRouter();

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    router.push((e.target as any).href);
  };
</script>

<template>
  <PLink href="/">Link 1 default</PLink>
  <PLink href="/" @click="onClick">Link 2 click listener</PLink>
  <router-link to="/" v-slot="{ href, navigate, isActive }">
    <PLink :href="href" @click="navigate" :active="isActive">Link 3 wrapped in router-link (check markup)</PLink>
  </router-link>
  <PLink>
    <router-link to="/">Link 4 slotted router-link</router-link>
  </PLink>
</template>
