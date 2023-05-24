<script setup lang="ts">
  import type { TabsBarUpdateEvent } from '@porsche-design-system/components-vue';
  import { PTabsBar } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const tabIndex = ref<number>(0);
  const onUpdate = (e: TabsBarUpdateEvent): void => {
    tabIndex.value = e.activeTabIndex;
  };
</script>

<template>
  <PTabsBar :activeTabIndex="tabIndex" @update="onUpdate">
    <button type="button">Tab One</button>
    <button type="button">Tab Two</button>
    <button type="button">Tab Three</button>
  </PTabsBar>
</template>
