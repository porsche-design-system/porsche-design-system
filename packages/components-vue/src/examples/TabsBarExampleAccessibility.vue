<script setup lang="ts">
  import { PTabsBar, PText, type TabsBarUpdateEventDetail } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const tabIndex = ref(0);
  const tabPanels: string[] = ['One', 'Two', 'Three'];

  const onUpdate = (e: TabsBarUpdateEventDetail): void => {
    tabIndex.value = e.activeTabIndex;
  };
</script>

<template>
  <PTabsBar :activeTabIndex="tabIndex" @update="onUpdate">
    <button
      v-for="(tabPanel, i) in tabPanels"
      :key="i"
      type="button"
      :id="`tab-item-${i}`"
      :aria-controls="`tab-panel-${i}`"
    >
      Tab {{ tabPanel }}
    </button>
  </PTabsBar>
  <div
    v-for="(content, i) in tabPanels"
    :key="i"
    :role="'tabpanel'"
    :id="`tab-panel-${i}`"
    :hidden="tabIndex !== i"
    :tabIndex="tabIndex === i ? 0 : -1"
    :aria-labelledby="`tab-item-${i}`"
  >
    <PText>Your content of Tab {{ i + 1 }}</PText>
  </div>
</template>

<style scoped>
  div[role='tabpanel'] {
    outline: 1px solid transparent;
    outline-offset: 2px;
    margin-top: 8px;
  }
  div[role='tabpanel']:focus {
    outline-color: #000;
  }
  div[role='tabpanel']:focus:not(:focus-visible) {
    outline-color: transparent;
  }
</style>
