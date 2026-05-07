<script setup lang="ts">
import { PTabsBar, type PTabsBarProps, type TabsBarUpdateEventDetail } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const tabIndex = ref<PTabsBarProps['activeTabIndex']>(0);
const onUpdate = (e: CustomEvent<TabsBarUpdateEventDetail>): void => {
  tabIndex.value = e.detail.activeTabIndex;
};
</script>

<template>
  <PTabsBar :activeTabIndex="tabIndex" @update="onUpdate">
    <button type="button">Tab One</button>
    <button type="button">Tab Two</button>
    <button type="button">Tab Three</button>
  </PTabsBar>
</template>
