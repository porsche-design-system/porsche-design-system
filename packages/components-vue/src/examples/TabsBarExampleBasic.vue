<script setup lang="ts">
  import { PTabsBar, type TabsBarUpdateEventDetail } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const tabIndex = ref<number>(0);
  const onUpdate = (e: TabsBarUpdateEventDetail): void => {
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
