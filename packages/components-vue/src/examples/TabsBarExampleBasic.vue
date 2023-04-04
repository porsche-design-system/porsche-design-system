<script setup lang="ts">
  import type { TabsBarChangeEvent } from '@porsche-design-system/components-vue';
  import { PTabsBar } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const tabIndex = ref<number>();
  const onChange = (e: CustomEvent<TabsBarChangeEvent>): void => (tabIndex.value = e.activeTabIndex);
</script>

<template>
  <PTabsBar :activeTabIndex="tabIndex" @change="onChange">
    <button :type="'button'">Tab One</button>
    <button :type="'button'">Tab Two</button>
    <button :type="'button'">Tab Three</button>
  </PTabsBar>
</template>
