<script setup lang="ts">
  import { ref } from 'vue';
  import { PTabsBar, type TabsBarUpdateEventDetail } from '@porsche-design-system/components-vue';

  const activeTabIndex = ref(0);

  const onUpdate = (e: CustomEvent<TabsBarUpdateEventDetail>) => {
    activeTabIndex.value = e.detail.activeTabIndex;
  }
</script>

<template>
  <PTabsBar :activeTabIndex="activeTabIndex" :aria="{'aria-label': 'Some label for the tablist', 'aria-description': 'Some description for the tablist'}" @update="onUpdate">
    <button type="button">
      Tab One
    </button>
    <button type="button">
      Tab Two
    </button>
    <button type="button">
      Tab Three
    </button>
  </PTabsBar>
</template>
